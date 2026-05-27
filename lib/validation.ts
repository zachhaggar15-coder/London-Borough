/**
 * Server-side input validation for API route bodies.
 *
 * These predicates narrow incoming JSON to the strict shapes our
 * handlers expect. Each handler turns a `false` into a 400 with a
 * specific error code, so client bugs surface loudly rather than
 * silently producing weird outputs (e.g. an isochrone "computed" from
 * garbage coordinates).
 *
 * The Greater London rectangle lives in lib/geo.ts so validation and
 * raster code stay aligned.
 */

import type { LatLng } from "@/lib/types";
import type { ReachableNeighbourhoodInfo } from "@/lib/isochrone";
import { LONDON_BBOX } from "@/lib/geo";

// Commute caps accepted by the server. The UI slider is narrower, but
// direct API callers get a little controlled headroom.
export const MIN_COMMUTE_MINUTES = 15;
export const MAX_COMMUTE_MINUTES = 120;
export const MAX_REACHABLE_COMMUTE_MINUTES = 300;
export const MAX_FALLBACK_REACHABLE = 120;

/** Type predicate: `x` is a {lat, lng} inside the Greater London bbox. */
export function isLondonLatLng(x: unknown): x is LatLng {
  if (typeof x !== "object" || x === null) return false;
  const obj = x as Record<string, unknown>;
  const lat = obj.lat;
  const lng = obj.lng;
  if (typeof lat !== "number" || typeof lng !== "number") return false;
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return false;
  return (
    lat >= LONDON_BBOX.minLat &&
    lat <= LONDON_BBOX.maxLat &&
    lng >= LONDON_BBOX.minLng &&
    lng <= LONDON_BBOX.maxLng
  );
}

/**
 * Type predicate: `x` is an integer commute-time cap.
 *
 * The UI slider emits 15–90; we accept 15–120 so direct API callers
 * (e.g. someone hitting /api/isochrone in a script) have a little
 * headroom without bypassing the bound entirely.
 */
export function isCommuteMinuteCap(x: unknown): x is number {
  return (
    typeof x === "number" &&
    Number.isFinite(x) &&
    Number.isInteger(x) &&
    x >= MIN_COMMUTE_MINUTES &&
    x <= MAX_COMMUTE_MINUTES
  );
}

/**
 * Parse a client-supplied list of reachable neighbourhoods. Returns:
 *   - the cleaned array on success (each item validated)
 *   - `null` if the input is malformed or absent
 *
 * Each item must look like `{ centroid: LatLng-in-London,
 * commuteMinutes: finite non-negative number no larger than
 * MAX_REACHABLE_COMMUTE_MINUTES }`.
 *
 * Size cap: MAX_FALLBACK_REACHABLE items. The legitimate caller (the page)
 * sends the modelled neighbourhood list, currently fewer than 100.
 */
export function parseFallbackReachable(
  x: unknown,
): ReachableNeighbourhoodInfo[] | null {
  if (x == null) return null;
  if (!Array.isArray(x)) return null;
  if (x.length > MAX_FALLBACK_REACHABLE) return null;

  const out: ReachableNeighbourhoodInfo[] = [];
  for (const item of x) {
    if (typeof item !== "object" || item === null) return null;
    const r = item as Record<string, unknown>;
    if (!isLondonLatLng(r.centroid)) return null;
    const m = r.commuteMinutes;
    if (typeof m !== "number" || !Number.isFinite(m)) return null;
    if (m < 0 || m > MAX_REACHABLE_COMMUTE_MINUTES) return null;
    out.push({ centroid: r.centroid, commuteMinutes: m });
  }
  return out;
}
