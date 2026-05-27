/**
 * Isochrone — the shaded "you can reach here" region on the map.
 *
 * Public transport only. Driving estimates are intentionally NOT
 * supported anywhere in this app.
 *
 * How the polygon is built (since the previous star-from-destination
 * approach couldn't represent corridor-following shapes):
 *
 *   1. The caller collects a dense set of sample points across London —
 *      the neighbourhood centroids PLUS a 3 km grid (~280 more) —
 *      each annotated with its real TfL public-transport time from the
 *      destination.
 *   2. For each sample with t ≤ maxCommuteMinutes, we compute a
 *      "walking buffer" radius — roughly how far you could comfortably
 *      walk past that point given remaining time budget, bounded
 *      between 1.5 km (so adjacent grid samples bridge into a continuous
 *      region) and 2.5 km (so a single point doesn't dominate).
 *   3. We rasterise the *signed-distance field* of the union of those
 *      buffers across a ~330 m fine grid, then run marching squares at
 *      threshold 0 to extract the boundary as a polygon.
 *
 * The result has visible spurs along corridors (where many samples are
 * reached) and dents in directions with no transit (where samples
 * remain unreached), and grows smoothly with the commute slider
 * because each sample only contributes a bounded local buffer.
 *
 * The IsochroneProvider interface stays open for future real-data
 * implementations (e.g. Mapbox Isochrone), but none ship by default.
 */

import type { LatLng } from "@/lib/types";
import { largestContourRing } from "@/lib/marching";
import { KM_PER_DEG_LAT, LONDON_BBOX, kmPerDegLngAtLat } from "@/lib/geo";

/**
 * Average door-to-door public-transport speed in London. Used by the
 * commute-time fallback heuristic in lib/commute.ts; kept exported
 * here so both files agree on the same number.
 */
export const LONDON_TRANSIT_KMH = 16;

type Coord = [number, number]; // [lng, lat] — GeoJSON order!

type IsochroneSource = "union-of-buffers" | "fallback-disc";
export type IsochroneFeature = GeoJSON.Feature<
  GeoJSON.Polygon,
  { source: IsochroneSource }
>;

/** Information about one reachable sample point. */
export type ReachableNeighbourhoodInfo = {
  centroid: LatLng;
  commuteMinutes: number;
};

/* ────────────────────────────────────────────────────────────────────
 * Tuning constants — change these to reshape the isochrone "feel".
 * ──────────────────────────────────────────────────────────────────── */

// Fine raster used for marching squares. ~330 m cells across London —
// gives the polygon enough vertices to read as a smooth curve and pick
// up small concavities. Rasterisation runs in <250 ms thanks to the
// far-sample skip optimisation in the inner loop.
const RASTER_BBOX = LONDON_BBOX;
const RASTER_STEP_LAT = 0.003; // ~330 m
const RASTER_STEP_LNG = 0.005; // ~340 m at London's latitude

// Buffer radius around each reached sample. Bounded so:
//  - the polygon stays connected (min ≥ half the 3 km sample spacing)
//  - a single far point doesn't blow up the polygon (max cap)
// Sharper than before (was 2.0 / 3.5) — spurs along transit corridors
// stay visible and isolated points don't smear.
const MIN_BUFFER_KM = 1.5;
const MAX_BUFFER_KM = 2.5;

// Walking speed for the "leftover budget → local reach" buffer.
// Dampened by 0.6 because not all directions from a point are walkable.
const WALK_KMH = 5;
const WALK_DAMPING = 0.6;

/* ────────────────────────────────────────────────────────────────────
 * Polygon construction
 * ──────────────────────────────────────────────────────────────────── */

function bufferKmFor(commuteMinutes: number, maxCommuteMinutes: number): number {
  const remaining = Math.max(0, maxCommuteMinutes - commuteMinutes);
  const r = remaining * (WALK_KMH / 60) * WALK_DAMPING;
  return Math.max(MIN_BUFFER_KM, Math.min(MAX_BUFFER_KM, r));
}

/**
 * Build an isochrone polygon by taking the boundary of the union of
 * walking buffers around every reachable sample point.
 */
export function approximateIsochrone(
  destination: LatLng,
  reachable: ReachableNeighbourhoodInfo[],
  maxCommuteMinutes: number,
): IsochroneFeature {
  // Precompute each sample's buffer radius (km) and convert sample
  // coords to local-projection km for fast field evaluation.
  const kmPerDegLngLocal = kmPerDegLngAtLat(destination.lat);
  const rasterCellDiagonalKm = Math.hypot(
    RASTER_STEP_LAT * KM_PER_DEG_LAT,
    RASTER_STEP_LNG * kmPerDegLngLocal,
  );
  const toSampleKm = (s: ReachableNeighbourhoodInfo) => {
    const radiusKm = bufferKmFor(s.commuteMinutes, maxCommuteMinutes);
    const searchRadiusKm = radiusKm + rasterCellDiagonalKm * 1.5;
    return {
      x: (s.centroid.lng - destination.lng) * kmPerDegLngLocal,
      y: (s.centroid.lat - destination.lat) * KM_PER_DEG_LAT,
      r: radiusKm,
      searchSq: searchRadiusKm * searchRadiusKm,
    };
  };

  // Always include the destination itself, so the polygon definitely
  // covers the immediate office area even if no sample point lands near it.
  const sampleKm = [
    toSampleKm({ centroid: destination, commuteMinutes: 0 }),
    ...reachable
      .filter((r) => r.commuteMinutes <= maxCommuteMinutes)
      .map(toSampleKm),
  ];

  // Build the field. Each grid vertex value = max(buffer_r - distance_to_sample),
  // i.e. the signed-distance-to-boundary of the union: positive inside, negative outside.
  const rows =
    Math.ceil((RASTER_BBOX.maxLat - RASTER_BBOX.minLat) / RASTER_STEP_LAT) + 1;
  const cols =
    Math.ceil((RASTER_BBOX.maxLng - RASTER_BBOX.minLng) / RASTER_STEP_LNG) + 1;

  const field: number[][] = new Array(rows);
  for (let r = 0; r < rows; r++) {
    const lat = RASTER_BBOX.minLat + r * RASTER_STEP_LAT;
    const y = (lat - destination.lat) * KM_PER_DEG_LAT;
    const row = new Array<number>(cols);
    for (let c = 0; c < cols; c++) {
      const lng = RASTER_BBOX.minLng + c * RASTER_STEP_LNG;
      const x = (lng - destination.lng) * kmPerDegLngLocal;
      let best = -rasterCellDiagonalKm * 2;
      for (let i = 0; i < sampleKm.length; i++) {
        const s = sampleKm[i];
        const dx = x - s.x;
        const dy = y - s.y;
        const dsq = dx * dx + dy * dy;
        // Skip samples that are too far away to affect this grid vertex
        // or any contour interpolation in the neighbouring cell.
        if (dsq > s.searchSq) continue;
        const v = s.r - Math.sqrt(dsq);
        if (v > best) best = v;
      }
      row[c] = best;
    }
    field[r] = row;
  }

  // Extract the largest connected contour.
  const ring = largestContourRing(field, 0);

  // Fall back to a small disc around the destination if nothing was
  // reachable — happens for impossibly tight commute thresholds.
  if (!ring) {
    const ringCoords = makeFallbackDisc(destination, MIN_BUFFER_KM);
    return {
      type: "Feature",
      geometry: { type: "Polygon", coordinates: [ringCoords] },
      properties: { source: "fallback-disc" },
    };
  }

  // Convert (row, col) → [lng, lat].
  const ringCoords: Coord[] = ring.map(([r, c]) => [
    RASTER_BBOX.minLng + c * RASTER_STEP_LNG,
    RASTER_BBOX.minLat + r * RASTER_STEP_LAT,
  ]);
  // Ensure closed.
  const first = ringCoords[0];
  const last = ringCoords[ringCoords.length - 1];
  if (first[0] !== last[0] || first[1] !== last[1]) ringCoords.push(first);

  return {
    type: "Feature",
    geometry: { type: "Polygon", coordinates: [ringCoords] },
    properties: { source: "union-of-buffers" },
  };
}

function makeFallbackDisc(center: LatLng, radiusKm: number): Coord[] {
  const kmPerDegLngLocal = kmPerDegLngAtLat(center.lat);
  const ring: Coord[] = [];
  const N = 32;
  for (let i = 0; i < N; i++) {
    const a = (i / N) * 2 * Math.PI;
    const dLng = (Math.cos(a) * radiusKm) / kmPerDegLngLocal;
    const dLat = (Math.sin(a) * radiusKm) / KM_PER_DEG_LAT;
    ring.push([center.lng + dLng, center.lat + dLat]);
  }
  ring.push(ring[0]);
  return ring;
}

/* ────────────────────────────────────────────────────────────────────
 * IsochroneProvider interface + implementations
 * ──────────────────────────────────────────────────────────────────── */

export interface IsochroneProvider {
  /**
   * Get the reachable polygon. `reachable` contains every sample point
   * (neighbourhoods + grid points) with its TfL public-transport time;
   * the sampled provider builds the polygon directly from those. External
   * providers can ignore it.
   */
  getIsochrone(
    centroid: LatLng,
    minutes: number,
    reachable?: ReachableNeighbourhoodInfo[],
  ): Promise<IsochroneFeature>;
}

class SampledIsochroneProvider implements IsochroneProvider {
  async getIsochrone(
    centroid: LatLng,
    minutes: number,
    reachable?: ReachableNeighbourhoodInfo[],
  ): Promise<IsochroneFeature> {
    return approximateIsochrone(centroid, reachable ?? [], minutes);
  }
}

/* ────────────────────────────────────────────────────────────────────
 * Provider factory
 * ──────────────────────────────────────────────────────────────────── */

let _isochroneProvider: IsochroneProvider | null = null;

export function getIsochroneProvider(): IsochroneProvider {
  if (_isochroneProvider) return _isochroneProvider;
  const choice = process.env.ISOCHRONE_PROVIDER ?? "sampled";
  switch (choice) {
    case "sampled":
    default:
      _isochroneProvider = new SampledIsochroneProvider();
  }
  return _isochroneProvider;
}
