import type { TravelBand } from "@/lib/travel-band";

/**
 * What each travel band means in Greater Manchester specifically.
 *
 * The band names and ordering are shared across every city that uses
 * them (lib/travel-band.ts); only these descriptions are local, because
 * a fringe town here is Wigan or Ramsbottom and elsewhere it is not.
 */
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

