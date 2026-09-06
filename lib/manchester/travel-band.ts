/**
 * Greater Manchester travel bands.
 *
 * London's whole sense of "how central is this" rides on tube zones 1–6,
 * a single fare geography that covers tube, rail, Overground and DLR alike.
 * Greater Manchester has no equivalent. Metrolink runs zones 1–4, but they
 * cover only the tram — heavy rail into Piccadilly and Victoria prices on a
 * separate scheme, and the bus network on a third. Quoting a Metrolink zone
 * for somewhere like Heaton Moor, which has no tram at all, would be worse
 * than useless.
 *
 * So we describe centrality directly, in the terms a person moving here
 * actually reasons in: how far out you are, and what that costs you in
 * journey time to the middle of the city.
 */

export type TravelBand = "central" | "inner" | "outer" | "fringe";

export const TRAVEL_BANDS: TravelBand[] = ["central", "inner", "outer", "fringe"];

export const TRAVEL_BAND_LABELS: Record<TravelBand, string> = {
  central: "Central",
  inner: "Inner",
  outer: "Outer",
  fringe: "Fringe",
};

export const TRAVEL_BAND_DESCRIPTIONS: Record<TravelBand, string> = {
  central:
    "Inside the inner ring road. You walk to work and most nights out, and you pay for the privilege in rent rather than fares.",
  inner:
    "The ring of suburbs roughly two to five kilometres out — Chorlton, Levenshulme, Salford Quays. Ten to twenty minutes in by tram, bus or bike.",
  outer:
    "Five to twelve kilometres out, on a tram line or a commuter rail line: Sale, Prestwich, Stockport, Ashton. Twenty to thirty-five minutes to the centre.",
  fringe:
    "The Greater Manchester towns beyond the built-up core — Bolton, Wigan, Ramsbottom, Saddleworth. Cheaper and greener, at forty minutes or more each way.",
};

/** Approximate straight-line distance from Manchester city centre, in km. */
export const TRAVEL_BAND_DISTANCE_KM: Record<TravelBand, string> = {
  central: "0–2 km",
  inner: "2–5 km",
  outer: "5–12 km",
  fringe: "12 km+",
};

export function travelBandLabel(band: TravelBand): string {
  return TRAVEL_BAND_LABELS[band];
}

/** Sort key so listings run centre-outwards rather than alphabetically. */
export function travelBandRank(band: TravelBand): number {
  return TRAVEL_BANDS.indexOf(band);
}
