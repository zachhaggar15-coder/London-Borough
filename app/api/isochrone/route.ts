/**
 * POST /api/isochrone
 *
 * Body: { destinationLatLng, maxMinutes, fallbackReachable?: ReachableNeighbourhoodInfo[] }
 * Returns: { feature: GeoJSON.Feature<Polygon>, cached: boolean }
 *
 * Responsibilities:
 *   1. Receive the user-provided reachable list (neighbourhoods with
 *      TfL times) from the client.
 *   2. Also fetch TfL times for the static ~280-point London sample
 *      grid (cached aggressively via the TfL pair cache so this only
 *      pays the full cost on the very first hit for a given
 *      destination).
 *   3. Combine both into the reachable set, then build the polygon
 *      via the union-of-buffers + marching-squares algorithm in
 *      lib/isochrone.ts.
 *
 * Caches the final polygon for (destination, minutes) so repeat
 * slider values with the same shaping samples don't even re-rasterise.
 */

import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  getIsochroneProvider,
  type IsochroneFeature,
  type ReachableNeighbourhoodInfo,
} from "@/lib/isochrone";
import type { LatLng } from "@/lib/types";
import { TtlCache, coordKey } from "@/lib/cache";
import { getRoutingProvider, type RoutingOrigin } from "@/lib/commute";
import { londonSampleGrid } from "@/lib/sample-grid";
import {
  isCommuteMinuteCap,
  isLondonLatLng,
  parseFallbackReachable,
} from "@/lib/validation";
import { checkRateLimit } from "@/lib/rate-limit";

type Body = {
  destinationLatLng?: LatLng;
  maxMinutes?: number;
  /**
   * Neighbourhood-level reachables (id, centroid, commuteMinutes).
   * Sent by the client because it already has them from /api/commute
   * — saves the server a round-trip through the routing provider.
   */
  fallbackReachable?: ReachableNeighbourhoodInfo[];
};

const ONE_DAY = 24 * 60 * 60 * 1000;
const cache = new TtlCache<IsochroneFeature>(ONE_DAY, 400);
const gridReachablesCache = new TtlCache<ReachableNeighbourhoodInfo[]>(ONE_DAY, 300);
const gridReachablesInFlight = new Map<string, Promise<ReachableNeighbourhoodInfo[]>>();
const REACHABLE_DEDUPE_DEG = 0.001;
const RATE_LIMIT = {
  scope: "api:isochrone",
  limit: 30,
  globalLimit: 180,
  windowMs: 10 * 60 * 1000,
};
const GRID_MISS_RATE_LIMIT = {
  scope: "api:isochrone:grid-miss",
  limit: 6,
  globalLimit: 30,
  windowMs: 10 * 60 * 1000,
};

/**
 * Fetch TfL times for the static sample grid. Cached at the routing-
 * provider's pair-cache level — so the second call for the same
 * destination resolves instantly.
 */
async function gridSampleReachables(
  destination: LatLng,
): Promise<ReachableNeighbourhoodInfo[]> {
  const grid = londonSampleGrid();
  const origins: RoutingOrigin[] = grid.map((p, i) => ({
    id: `grid-${i}`,
    centroid: p,
  }));
  const matrix = await getRoutingProvider().commuteMatrixFrom(
    origins,
    destination,
  );
  const out: ReachableNeighbourhoodInfo[] = [];
  for (const o of origins) {
    const m = matrix[o.id];
    if (typeof m === "number") {
      out.push({ centroid: o.centroid, commuteMinutes: m });
    }
  }
  return out;
}

async function cachedGridSampleReachables(
  destination: LatLng,
  headers: Headers,
): Promise<ReachableNeighbourhoodInfo[]> {
  const key = coordKey(destination.lat, destination.lng);
  const cached = gridReachablesCache.get(key);
  if (cached) {
    return cached;
  }

  const inFlight = gridReachablesInFlight.get(key);
  if (inFlight) {
    return inFlight;
  }

  const rateLimit = checkRateLimit(headers, GRID_MISS_RATE_LIMIT);
  if (!rateLimit.ok) {
    throw new GridMissRateLimitError(rateLimit.retryAfterSeconds);
  }

  const promise = gridSampleReachables(destination)
    .then((reachable) => {
      gridReachablesCache.set(key, reachable);
      return reachable;
    })
    .finally(() => {
      gridReachablesInFlight.delete(key);
    });
  gridReachablesInFlight.set(key, promise);
  return promise;
}

class GridMissRateLimitError extends Error {
  constructor(readonly retryAfterSeconds: number) {
    super("Too many uncached isochrone destinations.");
    this.name = "GridMissRateLimitError";
  }
}

function reachableSampleKey(sample: ReachableNeighbourhoodInfo): string {
  return [
    Math.round(sample.centroid.lat / REACHABLE_DEDUPE_DEG),
    Math.round(sample.centroid.lng / REACHABLE_DEDUPE_DEG),
  ].join("|");
}

function mergeReachableSamples(
  ...groups: ReachableNeighbourhoodInfo[][]
): ReachableNeighbourhoodInfo[] {
  const byLocation = new Map<string, ReachableNeighbourhoodInfo>();
  for (const group of groups) {
    for (const sample of group) {
      const key = reachableSampleKey(sample);
      const existing = byLocation.get(key);
      if (!existing || sample.commuteMinutes < existing.commuteMinutes) {
        byLocation.set(key, sample);
      }
    }
  }
  return [...byLocation.values()];
}

function reachableFingerprint(samples: ReachableNeighbourhoodInfo[]): string {
  if (samples.length === 0) return "none";
  const canonical = samples
    .map((sample) => [
      Number(sample.centroid.lat.toFixed(5)),
      Number(sample.centroid.lng.toFixed(5)),
      Math.round(sample.commuteMinutes),
    ])
    .sort((a, b) => {
      if (a[0] !== b[0]) return a[0] - b[0];
      if (a[1] !== b[1]) return a[1] - b[1];
      return a[2] - b[2];
    });
  return createHash("sha256")
    .update(JSON.stringify(canonical))
    .digest("hex")
    .slice(0, 16);
}

export async function POST(req: NextRequest) {
  const rateLimit = checkRateLimit(req.headers, RATE_LIMIT);
  if (!rateLimit.ok) {
    return NextResponse.json(
      { error: "rate_limited", message: "Too many requests. Try again shortly." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!isLondonLatLng(body.destinationLatLng)) {
    return NextResponse.json(
      {
        error: "invalid_destination",
        message: "Destination must be a lat/lng inside Greater London.",
      },
      { status: 400 },
    );
  }

  if (!isCommuteMinuteCap(body.maxMinutes)) {
    return NextResponse.json(
      {
        error: "invalid_minutes",
        message: "Commute minutes must be an integer between 15 and 120.",
      },
      { status: 400 },
    );
  }

  const fromClient =
    body.fallbackReachable == null
      ? []
      : parseFallbackReachable(body.fallbackReachable);
  if (fromClient == null) {
    return NextResponse.json(
      { error: "invalid_reachable", message: "Reachable points are malformed." },
      { status: 400 },
    );
  }

  const key = `${coordKey(body.destinationLatLng.lat, body.destinationLatLng.lng)}:${body.maxMinutes}:${reachableFingerprint(fromClient)}`;
  const cached = cache.get(key);
  if (cached) {
    return NextResponse.json({ feature: cached, cached: true });
  }

  try {
    const fromGrid = await cachedGridSampleReachables(
      body.destinationLatLng,
      req.headers,
    );
    const reachable = mergeReachableSamples(fromClient, fromGrid);

    const provider = getIsochroneProvider();
    const feature = await provider.getIsochrone(
      body.destinationLatLng,
      body.maxMinutes,
      reachable,
    );
    cache.set(key, feature);
    return NextResponse.json({ feature, cached: false });
  } catch (err) {
    if (err instanceof GridMissRateLimitError) {
      return NextResponse.json(
        {
          error: "rate_limited",
          message: "Too many new destinations. Try again shortly.",
        },
        {
          status: 429,
          headers: { "Retry-After": String(err.retryAfterSeconds) },
        },
      );
    }

    console.error("Isochrone provider failed", err);
    return NextResponse.json(
      {
        error: "isochrone_failed",
        message: "Isochrone generation failed. Please try again shortly.",
      },
      { status: 502 },
    );
  }
}
