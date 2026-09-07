import type { TravelBand } from "@/lib/travel-band";

/**
 * What each travel band means in the West of England specifically.
 *
 * The band names and ordering are shared across every city that uses
 * them (lib/travel-band.ts); only these descriptions are local. A fringe
 * place here is Bath, Weston-super-Mare or the Somerset coalfield, none
 * of which is a suburb of anywhere.
 */
export const BRISTOL_TRAVEL_BAND_DESCRIPTIONS: Record<TravelBand, string> = {
  central:
    "The Old City, the harbour and Old Market — everything inside the ring road. You walk to work and most nights out, and you pay for it in rent rather than fares.",
  inner:
    "The ring of Victorian neighbourhoods roughly one to four kilometres out: Clifton, Montpelier, Easton, Southville. Fifteen to twenty-five minutes in on foot, by bike or on a bus.",
  outer:
    "Four to ten kilometres out, still inside the built-up city or on its immediate edge — Fishponds, Henleaze, Knowle, Filton, Keynsham. Twenty-five to forty minutes to the centre.",
  fringe:
    "The separate towns of the region rather than suburbs of Bristol: Bath, Portishead, Clevedon, Yate, Thornbury, Weston-super-Mare. Each has its own centre and its own labour market, and each is forty minutes or more from central Bristol.",
};

/** Approximate straight-line distance from the Bristol centre, in km. */
export const BRISTOL_TRAVEL_BAND_DISTANCE_KM: Record<TravelBand, string> = {
  central: "0–1.5 km",
  inner: "1.5–4 km",
  outer: "4–10 km",
  fringe: "10 km+",
};

export const BRISTOL_TRAVEL_BAND_RATIONALE =
  "There is no zonal fare system here to borrow. Bristol has no metro, no tram and no zonal ticketing at all: buses price by operator and route, the local rail lines price as national rail, and the three MetroBus corridors are simply bus routes with their own lane. Quoting a zone for Bedminster or Bradley Stoke would mean inventing one.";
