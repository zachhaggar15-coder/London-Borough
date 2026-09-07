import type { TravelBand } from "@/lib/travel-band";

/**
 * What each travel band means in West Yorkshire specifically.
 *
 * One honest caveat is built into the fringe description. The bands
 * measure distance and journey time from central Leeds, because that is
 * where most of the region's commuting converges — but Bradford,
 * Huddersfield, Wakefield and Halifax are cities and towns with their own
 * centres and their own labour markets, not outskirts of anywhere. A
 * "fringe" label here describes a journey time, not a status.
 */
export const LEEDS_TRAVEL_BAND_DESCRIPTIONS: Record<TravelBand, string> = {
  central:
    "Inside the Leeds loop road, plus Holbeck and the South Bank across the river. You walk to work and most nights out, and you pay for it in rent rather than fares.",
  inner:
    "The ring of Victorian and Edwardian neighbourhoods roughly one and a half to six kilometres from the middle of Leeds — Headingley, Chapel Allerton, Armley, Beeston. Fifteen to twenty-five minutes in by bus, bike or local train.",
  outer:
    "Six to fifteen kilometres out, on a station or a frequent bus into Leeds: Horsforth, Roundhay, Cross Gates, Morley, Garforth. Twenty to thirty-five minutes to the centre. Bradford sits in this band on journey time, though it is a city of half a million in its own right.",
  fringe:
    "The separate towns and cities of West Yorkshire rather than suburbs of Leeds — Huddersfield, Wakefield, Halifax, Keighley, Hebden Bridge, Ilkley, Otley. Each has its own centre, its own economy and its own housing market, and each is forty minutes or more from central Leeds.",
};

/** Approximate straight-line distance from central Leeds, in km. */
export const LEEDS_TRAVEL_BAND_DISTANCE_KM: Record<TravelBand, string> = {
  central: "0–1.5 km",
  inner: "1.5–6 km",
  outer: "6–15 km",
  fringe: "15 km+",
};

export const LEEDS_TRAVEL_BAND_RATIONALE =
  "There is no zonal fare system covering this region. West Yorkshire has no metro or tram at all — the Leeds Supertram was cancelled in 2005 and the trolleybus scheme after it — so the network is heavy rail plus buses, priced by operator and route rather than by zone. The MCard offers a flat multi-operator ticket across the county, which describes a boundary rather than a geography of centrality.";
