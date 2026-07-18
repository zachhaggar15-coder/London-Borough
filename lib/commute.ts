/**
 * Commute / routing.
 *
 * The app NEVER imports a concrete routing provider directly. It calls
 * `getRoutingProvider()` which returns the right impl based on the
 * ROUTING_PROVIDER env var.
 *
 * Two providers ship:
 *   - TflProvider (default) — hits the free public TfL Journey Planner
 *     API for durations. Falls back per-origin to a sourced estimate if
 *     TfL can't route a particular pair.
 *   - StaticEstimateProvider — source-backed static matrix + distance heuristic
 *     for unknown coords. No network, no keys. Useful for offline dev
 *     and as the per-origin fallback inside TflProvider.
 *
 * The interface is batch-shaped so callers don't need to know whether a
 * provider does one request or eighty.
 */

import type { CommuteEstimate, LatLng } from "@/lib/types";
import { DESTINATIONS_BY_ID } from "@/lib/data/destinations";
import { NEIGHBOURHOODS_BY_ID } from "@/lib/data/neighbourhoods";
import { LONDON_TRANSIT_KMH } from "@/lib/isochrone";
import { tflJourneyMinutes } from "@/lib/tfl";
import { TtlCache, coordKey } from "@/lib/cache";

export type RoutingOrigin = { id: string; centroid: LatLng };
export type CommuteEstimateMap = Record<string, CommuteEstimate>;
export type CommuteMinuteMap = Record<string, number>;

export interface RoutingProvider {
  /**
   * From `origins` to a single `destination`, return travel time in
   * minutes plus source metadata for each origin (keyed by origin.id).
   */
  commuteEstimatesFrom(
    origins: RoutingOrigin[],
    destination: LatLng,
  ): Promise<CommuteEstimateMap>;

  /**
   * Compatibility helper for callers that only need minute values.
   */
  commuteMatrixFrom(
    origins: RoutingOrigin[],
    destination: LatLng,
  ): Promise<CommuteMinuteMap>;
}

export function commuteMinutesFromEstimates(
  estimates: CommuteEstimateMap,
): CommuteMinuteMap {
  return Object.fromEntries(
    Object.entries(estimates).map(([id, estimate]) => [id, estimate.minutes]),
  );
}

/* ────────────────────────────────────────────────────────────────────
 * StaticEstimateProvider
 *
 * Looks up the pre-computed 25×10 matrix when origin AND destination
 * match a known pair; otherwise falls back to a straight-line transit
 * heuristic at LONDON_TRANSIT_KMH.
 * ──────────────────────────────────────────────────────────────────── */

/**
 * Pre-computed travel times (minutes) from each neighbourhood to each
 * pre-seeded destination, at peak hours. Numbers are realistic
 * estimates; they are NOT live and should not be presented as precise.
 */
export const STATIC_COMMUTE_TIMES: Record<string, Record<string, number>> = {
  // North
  "camden":          { "marylebone": 15, "kings-cross": 12, "liverpool-st": 22, "canary-wharf": 35, "bank": 22, "victoria": 22, "waterloo": 25, "oxford-circus": 12, "paddington": 22, "london-bridge": 25 },
  "islington":       { "marylebone": 22, "kings-cross": 10, "liverpool-st": 18, "canary-wharf": 30, "bank": 18, "victoria": 25, "waterloo": 22, "oxford-circus": 15, "paddington": 25, "london-bridge": 22 },
  "crouch-end":      { "marylebone": 35, "kings-cross": 28, "liverpool-st": 38, "canary-wharf": 50, "bank": 38, "victoria": 40, "waterloo": 38, "oxford-circus": 32, "paddington": 40, "london-bridge": 42 },
  "stoke-newington": { "marylebone": 30, "kings-cross": 22, "liverpool-st": 25, "canary-wharf": 35, "bank": 28, "victoria": 35, "waterloo": 32, "oxford-circus": 28, "paddington": 38, "london-bridge": 32 },
  "finsbury-park":   { "marylebone": 22, "kings-cross": 15, "liverpool-st": 22, "canary-wharf": 32, "bank": 25, "victoria": 30, "waterloo": 28, "oxford-circus": 22, "paddington": 30, "london-bridge": 30 },
  "kentish-town":    { "marylebone": 18, "kings-cross": 12, "liverpool-st": 25, "canary-wharf": 38, "bank": 25, "victoria": 28, "waterloo": 28, "oxford-circus": 18, "paddington": 22, "london-bridge": 28 },
  // East
  "hackney-central": { "marylebone": 30, "kings-cross": 20, "liverpool-st": 18, "canary-wharf": 25, "bank": 25, "victoria": 35, "waterloo": 32, "oxford-circus": 28, "paddington": 38, "london-bridge": 28 },
  "dalston":         { "marylebone": 28, "kings-cross": 18, "liverpool-st": 15, "canary-wharf": 28, "bank": 22, "victoria": 32, "waterloo": 30, "oxford-circus": 25, "paddington": 35, "london-bridge": 28 },
  "shoreditch":      { "marylebone": 22, "kings-cross": 15, "liverpool-st": 8,  "canary-wharf": 18, "bank": 10, "victoria": 25, "waterloo": 18, "oxford-circus": 15, "paddington": 28, "london-bridge": 12 },
  "bethnal-green":   { "marylebone": 25, "kings-cross": 18, "liverpool-st": 10, "canary-wharf": 18, "bank": 12, "victoria": 28, "waterloo": 22, "oxford-circus": 20, "paddington": 30, "london-bridge": 18 },
  "stratford":       { "marylebone": 28, "kings-cross": 22, "liverpool-st": 18, "canary-wharf": 12, "bank": 22, "victoria": 35, "waterloo": 32, "oxford-circus": 28, "paddington": 38, "london-bridge": 25 },
  "walthamstow":     { "marylebone": 35, "kings-cross": 22, "liverpool-st": 22, "canary-wharf": 35, "bank": 28, "victoria": 38, "waterloo": 35, "oxford-circus": 30, "paddington": 40, "london-bridge": 32 },
  // South
  "brixton":         { "marylebone": 32, "kings-cross": 25, "liverpool-st": 30, "canary-wharf": 35, "bank": 28, "victoria": 18, "waterloo": 18, "oxford-circus": 25, "paddington": 30, "london-bridge": 22 },
  "clapham":         { "marylebone": 32, "kings-cross": 28, "liverpool-st": 30, "canary-wharf": 35, "bank": 25, "victoria": 18, "waterloo": 15, "oxford-circus": 22, "paddington": 28, "london-bridge": 20 },
  "peckham":         { "marylebone": 38, "kings-cross": 28, "liverpool-st": 25, "canary-wharf": 25, "bank": 22, "victoria": 28, "waterloo": 18, "oxford-circus": 32, "paddington": 38, "london-bridge": 15 },
  "tooting":         { "marylebone": 38, "kings-cross": 32, "liverpool-st": 32, "canary-wharf": 42, "bank": 30, "victoria": 22, "waterloo": 22, "oxford-circus": 28, "paddington": 35, "london-bridge": 28 },
  "bermondsey":      { "marylebone": 25, "kings-cross": 22, "liverpool-st": 15, "canary-wharf": 12, "bank": 15, "victoria": 22, "waterloo": 12, "oxford-circus": 22, "paddington": 30, "london-bridge": 8  },
  "greenwich":       { "marylebone": 38, "kings-cross": 32, "liverpool-st": 25, "canary-wharf": 12, "bank": 25, "victoria": 38, "waterloo": 25, "oxford-circus": 35, "paddington": 42, "london-bridge": 20 },
  "battersea":       { "marylebone": 25, "kings-cross": 28, "liverpool-st": 28, "canary-wharf": 38, "bank": 25, "victoria": 8,  "waterloo": 15, "oxford-circus": 18, "paddington": 22, "london-bridge": 22 },
  "wimbledon":       { "marylebone": 42, "kings-cross": 38, "liverpool-st": 38, "canary-wharf": 45, "bank": 35, "victoria": 22, "waterloo": 25, "oxford-circus": 32, "paddington": 38, "london-bridge": 32 },
  // West
  "hammersmith":     { "marylebone": 22, "kings-cross": 28, "liverpool-st": 32, "canary-wharf": 42, "bank": 28, "victoria": 18, "waterloo": 22, "oxford-circus": 18, "paddington": 12, "london-bridge": 32 },
  "ealing":          { "marylebone": 30, "kings-cross": 35, "liverpool-st": 38, "canary-wharf": 50, "bank": 35, "victoria": 25, "waterloo": 30, "oxford-circus": 25, "paddington": 18, "london-bridge": 38 },
  "shepherds-bush":  { "marylebone": 18, "kings-cross": 22, "liverpool-st": 28, "canary-wharf": 38, "bank": 25, "victoria": 18, "waterloo": 22, "oxford-circus": 15, "paddington": 12, "london-bridge": 30 },
  "acton":           { "marylebone": 25, "kings-cross": 30, "liverpool-st": 35, "canary-wharf": 45, "bank": 32, "victoria": 25, "waterloo": 28, "oxford-circus": 22, "paddington": 18, "london-bridge": 35 },
  "putney":          { "marylebone": 32, "kings-cross": 35, "liverpool-st": 38, "canary-wharf": 48, "bank": 35, "victoria": 18, "waterloo": 22, "oxford-circus": 28, "paddington": 28, "london-bridge": 30 },
};

function findDestinationIdByCoord(coord: LatLng): string | null {
  for (const d of Object.values(DESTINATIONS_BY_ID)) {
    if (
      Math.abs(d.centroid.lat - coord.lat) < 0.005 &&
      Math.abs(d.centroid.lng - coord.lng) < 0.005
    ) {
      return d.id;
    }
  }
  return null;
}

function haversineKm(a: LatLng, b: LatLng): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}

class StaticEstimateProvider implements RoutingProvider {
  async commuteEstimatesFrom(
    origins: RoutingOrigin[],
    destination: LatLng,
  ): Promise<CommuteEstimateMap> {
    const dId = findDestinationIdByCoord(destination);
    const out: CommuteEstimateMap = {};
    const minPerKm = 60 / LONDON_TRANSIT_KMH;

    for (const o of origins) {
      // Try the pre-computed matrix first (origin is a known neighbourhood
      // AND destination is a pre-seeded office).
      if (dId && STATIC_COMMUTE_TIMES[o.id]?.[dId] != null) {
        out[o.id] = {
          minutes: STATIC_COMMUTE_TIMES[o.id][dId],
          source: "staticMatrix",
        };
        continue;
      }
      // Fallback heuristic: straight-line distance at LONDON_TRANSIT_KMH,
      // floored at 10 min. Honest about being an estimate.
      const km = haversineKm(o.centroid, destination);
      out[o.id] = {
        minutes: Math.max(10, Math.round(km * minPerKm)),
        source: "distanceHeuristic",
      };
    }
    return out;
  }

  async commuteMatrixFrom(
    origins: RoutingOrigin[],
    destination: LatLng,
  ): Promise<CommuteMinuteMap> {
    return commuteMinutesFromEstimates(
      await this.commuteEstimatesFrom(origins, destination),
    );
  }
}

/* ────────────────────────────────────────────────────────────────────
 * TflProvider
 *
 * Hits the public TfL Journey Planner for each origin → destination
 * pair. To stay snappy and polite, requests are issued in parallel
 * batches of TFL_BATCH_SIZE; the next batch starts when the current
 * one resolves.
 *
 * Per-pair caching is layered in front of the network call so that
 * sliding the commute slider, or switching back to a previously-tried
 * destination, doesn't re-hit TfL.
 *
 * Per-origin failure is tolerated: if TfL errors or can't route a
 * particular pair, we fall through to the StaticEstimateProvider's heuristic
 * for *that single origin* and continue. The overall request still
 * returns a complete matrix.
 * ──────────────────────────────────────────────────────────────────── */

const TFL_BATCH_SIZE = 20;
const TFL_CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const tflPairCache = new TtlCache<number | null>(TFL_CACHE_TTL_MS, 5_000);

function pairKey(origin: LatLng, destination: LatLng): string {
  return `${coordKey(origin.lat, origin.lng)}|${coordKey(destination.lat, destination.lng)}`;
}

class TflProvider implements RoutingProvider {
  /** Used as the per-origin fallback when TfL can't route a pair. */
  private readonly staticEstimate = new StaticEstimateProvider();

  async commuteEstimatesFrom(
    origins: RoutingOrigin[],
    destination: LatLng,
  ): Promise<CommuteEstimateMap> {
    // Pre-compute static fallback once so we have an estimate for every
    // origin without doing the work inline if TfL fails.
    const staticEstimates = await this.staticEstimate.commuteEstimatesFrom(
      origins,
      destination,
    );
    const out: CommuteEstimateMap = {};

    // Process origins in parallel batches.
    for (let i = 0; i < origins.length; i += TFL_BATCH_SIZE) {
      const batch = origins.slice(i, i + TFL_BATCH_SIZE);
      const results = await Promise.all(
        batch.map(async (o) => {
          const key = pairKey(o.centroid, destination);
          const cached = tflPairCache.get(key);
          if (cached !== undefined) {
            return {
              id: o.id,
              estimate:
                typeof cached === "number"
                  ? { minutes: cached, source: "tflJourneyPlanner" as const }
                  : null,
            };
          }
          try {
            const minutes = await tflJourneyMinutes(o.centroid, destination);
            tflPairCache.set(key, minutes);
            return {
              id: o.id,
              estimate:
                typeof minutes === "number"
                  ? { minutes, source: "tflJourneyPlanner" as const }
                  : null,
            };
          } catch (err) {
            // Don't poison the cache on network errors — let the next
            // request try again. Just fall back for this one.
            if (process.env.NODE_ENV !== "production") {
              console.warn(`TfL failed for ${o.id}:`, (err as Error).message);
            }
            return { id: o.id, estimate: null };
          }
        }),
      );

      for (const r of results) {
        if (r.estimate) {
          out[r.id] = r.estimate;
          continue;
        }

        const fallback = staticEstimates[r.id];
        if (fallback) {
          out[r.id] = fallback;
          continue;
        }

        const message = `No commute estimate available for origin "${r.id}".`;
        console.error(message);
        throw new Error(message);
      }
    }

    return out;
  }

  async commuteMatrixFrom(
    origins: RoutingOrigin[],
    destination: LatLng,
  ): Promise<CommuteMinuteMap> {
    return commuteMinutesFromEstimates(
      await this.commuteEstimatesFrom(origins, destination),
    );
  }
}

/* ────────────────────────────────────────────────────────────────────
 * Provider factory
 *
 * Default is `tfl` (free public API, no signup). Set ROUTING_PROVIDER=static
 * to force the offline heuristic — useful for tests or running without
 * a network.
 * ──────────────────────────────────────────────────────────────────── */

let _provider: RoutingProvider | null = null;

export function getRoutingProvider(): RoutingProvider {
  if (_provider) return _provider;
  const choice = process.env.ROUTING_PROVIDER ?? "tfl";
  switch (choice) {
    case "tfl":
      _provider = new TflProvider();
      break;
    case "static":
      _provider = new StaticEstimateProvider();
      break;
    default:
      console.warn(`Unknown ROUTING_PROVIDER "${choice}", falling back to tfl.`);
      _provider = new TflProvider();
  }
  return _provider;
}

/**
 * Compute travel times from a destination to all 25 neighbourhoods.
 * Used by the /api/commute route.
 */
export async function travelTimesFromDestination(
  destinationCentroid: LatLng,
): Promise<CommuteMinuteMap> {
  return commuteMinutesFromEstimates(
    await travelTimeEstimatesFromDestination(destinationCentroid),
  );
}

export async function travelTimeEstimatesFromDestination(
  destinationCentroid: LatLng,
): Promise<CommuteEstimateMap> {
  const provider = getRoutingProvider();
  const origins: RoutingOrigin[] = Object.values(NEIGHBOURHOODS_BY_ID).map((n) => ({
    id: n.id,
    centroid: n.centroid,
  }));
  return provider.commuteEstimatesFrom(origins, destinationCentroid);
}
