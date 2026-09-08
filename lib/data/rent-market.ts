import type { LatLng, Provenance } from "@/lib/types";

/** Date the London baseline was checked against the latest published ONS release. */
export const RENT_MARKET_REVIEW_AS_OF = "2026-08-19";

/** Reference period in the ONS Price Index of Private Rents release. */
export const ONS_RENT_REFERENCE_MONTH = "July 2026";

export const ROOM_SOURCE: Provenance = {
  source: "listing_sample",
  asOf: RENT_MARKET_REVIEW_AS_OF,
};

export const RENT_MARKET_SOURCES = [
  "ONS Price Index of Private Rents, borough averages by bedroom count, July 2026",
  "Rightmove, Zoopla, OpenRent, and SpareRoom visible listing samples",
  "Manual neighbourhood review for local premium or discount against the borough baseline",
] as const;

export const RENT_REVIEW_FIELDS = [
  "oneBedMedianGbp",
  "twoBedMedianGbp",
  "roomRegionAverageGbp",
  "roomAreaOverrideGbp",
] as const;

export const ROOM_REGION_AVERAGE_GBP = {
  E: 944,
  EC: 1214,
  N: 945,
  NW: 986,
  SE: 953,
  SW: 1020,
  W: 1040,
  WC: 1282,
} as const;

export type RentRegion = keyof typeof ROOM_REGION_AVERAGE_GBP;

export const ROOM_AREA_OVERRIDES_GBP: Record<string, number> = {
  aldgate: 1307,
  bloomsbury: 1243,
  chelsea: 1294,
  "holland-park": 1421,
  kensington: 1421,
  "kentish-town": 1082,
  mayfair: 1433,
  "notting-hill": 1250,
  soho: 1433,
};

const CENTRAL_WC_IDS = new Set([
  "soho",
  "mayfair",
  "marylebone",
  "fitzrovia",
  "bloomsbury",
  "holborn",
]);

const CENTRAL_EC_IDS = new Set([
  "aldgate",
  "clerkenwell",
  "shoreditch",
  "whitechapel",
  "borough",
]);

export function rentRegionForArea(id: string, centroid: LatLng): RentRegion {
  if (CENTRAL_EC_IDS.has(id)) return "EC";
  if (CENTRAL_WC_IDS.has(id)) return "WC";

  const { lat, lng } = centroid;
  if (lng < -0.16 && lat >= 51.53) return "NW";
  if (lng < -0.16) return "W";
  if (lat >= 51.535 && lng < -0.03) return "N";
  if (lng >= -0.03 && lat >= 51.48) return "E";
  if (lng < -0.1) return "SW";
  return "SE";
}
