/**
 * Travel bands — how far out an area is, for cities with no single zone
 * system covering every mode.
 *
 * London can lean on travel zones 1-6 because one fare geography spans
 * tube, rail, Overground and DLR. Nowhere else in the UK has that.
 * Manchester's Metrolink zones cover only the tram, Bristol has no zonal
 * system at all, West Yorkshire prices by operator, and Edinburgh runs a
 * flat bus fare. So the other cities describe centrality directly.
 *
 * The four names are shared; what each means in a given city is supplied
 * per city, because a fringe town outside Manchester and one outside
 * Bristol have nothing in common beyond the distance.
 */

export type TravelBand = "central" | "inner" | "outer" | "fringe";

export const TRAVEL_BANDS: TravelBand[] = ["central", "inner", "outer", "fringe"];

export const TRAVEL_BAND_LABELS: Record<TravelBand, string> = {
  central: "Central",
  inner: "Inner",
  outer: "Outer",
  fringe: "Fringe",
};

export function travelBandLabel(band: TravelBand): string {
  return TRAVEL_BAND_LABELS[band];
}

/** Sort key so listings run centre-outwards rather than alphabetically. */
export function travelBandRank(band: TravelBand): number {
  return TRAVEL_BANDS.indexOf(band);
}
