/**
 * POST /api/commute
 *
 * Body: { destinationId: string } | { destinationLatLng: { lat, lng } }
 * Returns: { commute: { [neighbourhoodId]: minutes } }
 *
 * The routing provider lives here so we never ship an API key to the browser.
 */

import { NextRequest, NextResponse } from "next/server";
import { DESTINATIONS_BY_ID } from "@/lib/data/destinations";
import { travelTimesFromDestination } from "@/lib/commute";
import { TtlCache, coordKey } from "@/lib/cache";
import { isLondonLatLng } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rate-limit";

type Body = {
  destinationId?: string;
  destinationLatLng?: { lat: number; lng: number };
};

// Module-scoped cache — survives across requests in the same Next.js
// server process. Commute matrices are stable so a long TTL is fine.
const ONE_DAY = 24 * 60 * 60 * 1000;
const cache = new TtlCache<Record<string, number>>(ONE_DAY, 200);
const RATE_LIMIT = {
  scope: "api:commute",
  limit: 40,
  globalLimit: 240,
  windowMs: 10 * 60 * 1000,
};

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

  let centroid: { lat: number; lng: number } | undefined;
  if (body.destinationId) {
    const dest = DESTINATIONS_BY_ID[body.destinationId];
    if (!dest) {
      return NextResponse.json(
        { error: "unknown_destination", id: body.destinationId },
        { status: 404 },
      );
    }
    centroid = dest.centroid;
  } else if (body.destinationLatLng) {
    if (!isLondonLatLng(body.destinationLatLng)) {
      return NextResponse.json(
        {
          error: "invalid_destination",
          message: "Destination must be a lat/lng inside Greater London.",
        },
        { status: 400 },
      );
    }
    centroid = body.destinationLatLng;
  } else {
    return NextResponse.json(
      { error: "missing_destination" },
      { status: 400 },
    );
  }

  const key = coordKey(centroid.lat, centroid.lng);
  const cached = cache.get(key);
  if (cached) {
    return NextResponse.json({ commute: cached, cached: true });
  }

  try {
    const commute = await travelTimesFromDestination(centroid);
    cache.set(key, commute);
    return NextResponse.json({ commute, cached: false });
  } catch (err) {
    console.error("travelTimesFromDestination failed", err);
    return NextResponse.json(
      { error: "routing_failed" },
      { status: 502 },
    );
  }
}
