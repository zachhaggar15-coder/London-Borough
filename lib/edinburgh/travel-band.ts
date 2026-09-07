import type { TravelBand } from "@/lib/travel-band";

/**
 * What each travel band means in Edinburgh and the Lothians.
 *
 * The bands are tighter here than in any other region on this site, and
 * that is not an editorial choice — Edinburgh is genuinely small. The
 * whole city fits inside a bypass with a radius of about six kilometres,
 * and a place four kilometres from the Castle is a proper outer suburb
 * rather than an inner one.
 */
export const EDINBURGH_TRAVEL_BAND_DESCRIPTIONS: Record<TravelBand, string> = {
  central:
    "The Old Town, the New Town and Tollcross — everything inside the World Heritage boundary and its immediate edges. You walk to work and most nights out, and you pay for it in rent rather than fares.",
  inner:
    "The tenement ring roughly one to three kilometres out: Leith, Marchmont, Stockbridge, Gorgie, Morningside. Fifteen to twenty-five minutes in on foot, by bus or on the tram.",
  outer:
    "Three to eight kilometres out, still inside the city bypass — Portobello, Corstorphine, Granton, Liberton, Colinton, and Musselburgh just beyond the boundary. Twenty to thirty-five minutes to the centre.",
  fringe:
    "The Lothian towns rather than suburbs of Edinburgh: Haddington, North Berwick, Dunbar, Dalkeith, Penicuik, Livingston, Linlithgow, Bathgate. Each has its own centre and its own history, and each is thirty-five minutes or more from Waverley.",
};

/** Approximate straight-line distance from Edinburgh Castle, in km. */
export const EDINBURGH_TRAVEL_BAND_DISTANCE_KM: Record<TravelBand, string> = {
  central: "0–1 km",
  inner: "1–3 km",
  outer: "3–8 km",
  fringe: "8 km+",
};

export const EDINBURGH_TRAVEL_BAND_RATIONALE =
  "Edinburgh has no zonal fare system to borrow. Lothian Buses charges a single flat fare for any journey of any length within the city, the tram prices in two bands that describe the airport rather than centrality, and ScotRail prices the Lothian lines as national rail. A flat fare is a perfectly sensible way to run a small city and a useless way to describe how far out you are, so centrality is described directly instead.";
