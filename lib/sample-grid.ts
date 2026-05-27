/**
 * London-wide grid of lat/lng sample points used to shape the isochrone.
 *
 * Why a grid: real public-transport isochrones are wildly anisotropic
 * (long fingers along tube/rail corridors, dents in directions with no
 * transit). Driving the polygon from neighbourhood centroids alone
 * gives an irregular but sparse picture. Adding a regular grid of
 * sample points across the whole bbox fills in the gaps so the
 * isochrone-extraction step has enough resolution to find spurs and
 * concavities.
 *
 * Spacing: ~3 km. Tight enough for walking buffers (≥1.5 km) around
 * adjacent samples to overlap, so the polygon stays connected, but
 * sharp enough that the polygon visibly follows tube/rail corridors
 * instead of reading as a smooth blob. ~280 points total. TfL pair
 * results are cached by the routing provider, and final isochrone
 * polygons are cached separately by the API route.
 */

import type { LatLng } from "@/lib/types";

const LONDON_GRID_BBOX = {
  minLat: 51.30,
  maxLat: 51.70,
  minLng: -0.50,
  maxLng: 0.30,
};

// ~3 km at London's latitude.
// 0.027° latitude = 3 km north–south.
// 0.043° longitude at 51.5°N = 3 km east–west.
const STEP_LAT = 0.027;
const STEP_LNG = 0.043;

let _cache: LatLng[] | null = null;

/**
 * Returns the static London sample grid. Roughly 280 points on a 3 km
 * spacing across the Greater London bbox. Memoised.
 */
export function londonSampleGrid(): LatLng[] {
  if (_cache) return _cache;
  const out: LatLng[] = [];
  const nLat =
    Math.floor((LONDON_GRID_BBOX.maxLat - LONDON_GRID_BBOX.minLat) / STEP_LAT) +
    1;
  const nLng =
    Math.floor((LONDON_GRID_BBOX.maxLng - LONDON_GRID_BBOX.minLng) / STEP_LNG) +
    1;

  for (let i = 0; i < nLat; i++) {
    const lat = LONDON_GRID_BBOX.minLat + i * STEP_LAT;
    for (let j = 0; j < nLng; j++) {
      const lng = LONDON_GRID_BBOX.minLng + j * STEP_LNG;
      out.push({
        lat: Number(lat.toFixed(5)),
        lng: Number(lng.toFixed(5)),
      });
    }
  }
  _cache = out;
  return out;
}
