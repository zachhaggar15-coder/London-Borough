import type { LatLng } from "@/lib/types";

/** St Peter's Square — the point every Metrolink line passes through. */
export const MANCHESTER_CENTRE: LatLng = {
  lat: 53.4779,
  lng: -2.2426,
};

/**
 * Greater Manchester bounding box, generous enough to include Wigan in
 * the west, Ramsbottom in the north, Marple in the south-east and the
 * airport in the south. Used to bound the map so panning cannot wander
 * off into the Irish Sea.
 */
export const MANCHESTER_BBOX = {
  minLat: 53.29,
  maxLat: 53.72,
  minLng: -2.78,
  maxLng: -1.91,
} as const;

export const MANCHESTER_BOUNDS: [[number, number], [number, number]] = [
  [MANCHESTER_BBOX.minLng, MANCHESTER_BBOX.minLat],
  [MANCHESTER_BBOX.maxLng, MANCHESTER_BBOX.maxLat],
];
