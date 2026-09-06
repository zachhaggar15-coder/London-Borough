import type { Provenance } from "@/lib/types";
import { GM_BOROUGHS, type GmBorough } from "@/lib/manchester/boroughs";

/**
 * Greater Manchester rent baselines.
 *
 * Method, in short: take the published ONS borough average by bedroom
 * count as the anchor, then apply a reviewed neighbourhood premium or
 * discount against it. That is the same two-step used for London, and for
 * the same reason — a borough average is a real, sourced number, but
 * nobody rents a borough. Didsbury and Wythenshawe are both Manchester,
 * and a single Manchester figure describes neither.
 *
 * The neighbourhood-level figures in data/neighbourhoods.ts are reviewed
 * market estimates for area discovery, not property-level pricing. They
 * are deliberately round: quoting £1,163 for a one-bed in Sale would imply
 * a precision the method does not have.
 */

export const MANCHESTER_RENT_REVIEW_AS_OF = "2026-09-06";

/** The ONS reference month the borough baselines below are drawn from. */
export const ONS_RENT_REFERENCE_MONTH = "July 2026";

export const MANCHESTER_ROOM_SOURCE: Provenance = {
  source: "listing_sample",
  asOf: MANCHESTER_RENT_REVIEW_AS_OF,
};

export const MANCHESTER_RENT_SOURCES = [
  "ONS Price Index of Private Rents, borough averages by bedroom count, July 2026",
  "Rightmove, Zoopla, OpenRent and SpareRoom visible listing samples across Greater Manchester",
  "Manual neighbourhood review for the local premium or discount against the borough baseline",
] as const;

/**
 * ONS average monthly private rent by borough and bedroom count, July 2026.
 *
 * These are the anchors. Read them side by side and the shape of the
 * Greater Manchester rental market is immediately visible: Manchester and
 * Trafford sit in one bracket, the old mill towns in another, and the gap
 * between the two ends — Wigan at £541 for a one-bed against Manchester at
 * £998 — is close to a factor of two across a conurbation you can cross
 * in under an hour.
 */
export const ONS_BOROUGH_RENT_GBP: Record<
  GmBorough,
  { oneBed: number; twoBed: number; threeBed: number; allProperties: number }
> = {
  Bolton:     { oneBed: 647,  twoBed: 806,  threeBed: 978,  allProperties: 884 },
  Bury:       { oneBed: 686,  twoBed: 888,  threeBed: 1064, allProperties: 969 },
  Manchester: { oneBed: 998,  twoBed: 1227, threeBed: 1425, allProperties: 1365 },
  Oldham:     { oneBed: 694,  twoBed: 868,  threeBed: 1054, allProperties: 931 },
  Rochdale:   { oneBed: 614,  twoBed: 789,  threeBed: 948,  allProperties: 844 },
  Salford:    { oneBed: 886,  twoBed: 1082, threeBed: 1284, allProperties: 1167 },
  Stockport:  { oneBed: 807,  twoBed: 1029, threeBed: 1257, allProperties: 1111 },
  Tameside:   { oneBed: 682,  twoBed: 881,  threeBed: 1058, allProperties: 927 },
  Trafford:   { oneBed: 943,  twoBed: 1200, threeBed: 1480, allProperties: 1367 },
  Wigan:      { oneBed: 541,  twoBed: 698,  threeBed: 836,  allProperties: 745 },
};

/**
 * Postcode district groups used for room-in-a-share pricing.
 *
 * London keys its room averages off the postcode region letter (E, SE,
 * SW …), which works there because the regions are large and internally
 * consistent. Greater Manchester's M districts are not: M1 and M18 are
 * eight kilometres and roughly £300 a month apart. So rooms are keyed to
 * explicit district groups instead, and each neighbourhood names the group
 * it belongs to — slower to write, but auditable, and it stops the model
 * from inventing a price for an area nobody sampled.
 */
export type RoomDistrictGroup =
  | "city-centre"
  | "salford-quays"
  | "salford-inner"
  | "north-manchester"
  | "east-manchester"
  | "south-central"
  | "student-belt"
  | "south-manchester"
  | "chorlton-didsbury"
  | "wythenshawe"
  | "bury-south"
  | "bury-north"
  | "salford-west"
  | "trafford-north"
  | "altrincham"
  | "stockport"
  | "bolton"
  | "oldham-rochdale"
  | "tameside"
  | "wigan";

export const ROOM_DISTRICT_LABELS: Record<RoomDistrictGroup, string> = {
  "city-centre": "M1–M4 city centre",
  "salford-quays": "M50 Salford Quays",
  "salford-inner": "M5–M6 inner Salford",
  "north-manchester": "M8–M9 north Manchester",
  "east-manchester": "M11–M18 east Manchester",
  "south-central": "M12–M13 Ardwick and Longsight",
  "student-belt": "M14 Fallowfield and Rusholme",
  "south-manchester": "M15–M16, M19 inner south",
  "chorlton-didsbury": "M20–M21 Chorlton and Didsbury",
  wythenshawe: "M22–M23 Wythenshawe",
  "bury-south": "M25, M45 Prestwich and Whitefield",
  "bury-north": "BL0, BL8-BL9 Bury and Ramsbottom",
  "salford-west": "M27–M30 Swinton, Worsley and Eccles",
  "trafford-north": "M32, M33, M41 Stretford, Sale and Urmston",
  altrincham: "WA14–WA15 Altrincham and Hale",
  stockport: "SK1–SK8 Stockport",
  bolton: "BL Bolton",
  "oldham-rochdale": "OL Oldham and Rochdale",
  tameside: "OL6–OL7, M34 Tameside",
  wigan: "WN Wigan",
};

/**
 * Typical monthly cost of a room in a shared house or flat, by district
 * group. Drawn from visible listing samples rather than an official
 * series — no equivalent of the ONS bedroom breakdown exists for rooms.
 *
 * For scale: the Greater Manchester average across all districts sits
 * around £680, roughly £250 below the London-wide equivalent.
 */
export const ROOM_DISTRICT_AVERAGE_GBP: Record<RoomDistrictGroup, number> = {
  "city-centre": 820,
  "salford-quays": 760,
  "salford-inner": 690,
  "north-manchester": 560,
  "east-manchester": 520,
  "south-central": 615,
  "student-belt": 590,
  "south-manchester": 645,
  "chorlton-didsbury": 685,
  wythenshawe: 540,
  "bury-south": 620,
  "bury-north": 520,
  "salford-west": 590,
  "trafford-north": 630,
  altrincham: 680,
  stockport: 610,
  bolton: 500,
  "oldham-rochdale": 490,
  tameside: 515,
  wigan: 470,
};

/** Borough-level ONS one-bed figures, cheapest first. */
export function boroughsByOneBedRent(): {
  borough: GmBorough;
  oneBed: number;
}[] {
  return GM_BOROUGHS.map((borough) => ({
    borough,
    oneBed: ONS_BOROUGH_RENT_GBP[borough].oneBed,
  })).sort((a, b) => a.oneBed - b.oneBed);
}
