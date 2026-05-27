import type { LatLng } from "@/lib/types";

export const KM_PER_DEG_LAT = 110.574;
export const KM_PER_DEG_LNG_AT_EQUATOR = 111.32;

export const LONDON_CENTRE: LatLng = {
  lat: 51.5074,
  lng: -0.1278,
};

export const LONDON_BBOX = {
  minLat: 51.28,
  maxLat: 51.72,
  minLng: -0.55,
  maxLng: 0.35,
} as const;

export function kmPerDegLngAtLat(lat: number): number {
  return KM_PER_DEG_LNG_AT_EQUATOR * Math.cos((lat * Math.PI) / 180);
}
