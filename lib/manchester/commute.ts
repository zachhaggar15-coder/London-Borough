import type { CommuteEstimate, LatLng } from "@/lib/types";
import type { ManchesterNeighbourhood } from "@/lib/manchester/types";
import { MANCHESTER_DESTINATIONS_BY_ID } from "@/lib/manchester/data/destinations";

/**
 * Greater Manchester commute estimates.
 *
 * London's equivalent can fall back on the TfL Journey Planner, which is
 * a free public API that will route any two points in the capital.
 * Transport for Greater Manchester publishes no comparable open endpoint,
 * so Manchester runs entirely on the reviewed static matrix below, with a
 * straight-line fallback for anything not in it. Nothing here calls out to
 * a live service, and nothing here claims to.
 *
 * The figures are typical weekday-morning door-to-door times using public
 * transport: walking to the stop, waiting, riding, and walking off at the
 * other end. They are not timetable times. A tram that takes 22 minutes
 * from Sale to St Peter's Square is quoted at 35, because nobody lives at
 * the tram stop.
 */

/**
 * Average effective public-transport speed across Greater Manchester,
 * used only for the distance fallback.
 *
 * Lower than the London figure. Greater Manchester's network is radial to
 * a degree London's is not: there is no orbital rail, the tram runs on
 * street through the centre, and an orbital journey such as Sale to
 * Oldham is quicker by car than by any published public route. Using a
 * London-like speed here would produce confidently wrong numbers for
 * exactly the journeys people most need warning about.
 */
export const GM_TRANSIT_KMH = 18;

/**
 * Reviewed door-to-door estimates, in minutes, from each neighbourhood to
 * each of the ten destinations in data/destinations.ts.
 *
 * Read across a row and the shape of the network shows itself: almost
 * every area reaches Piccadilly and Victoria far faster than it reaches
 * Trafford Park or MediaCityUK, because the network was built to bring
 * people into the middle and never to move them around the edge.
 */
export const MANCHESTER_COMMUTE_TIMES: Record<string, Record<string, number>> = {
  // ── Manchester ──
  "city-centre":       { piccadilly: 10, spinningfields: 5,  mediacity: 20, "oxford-road": 10, ancoats: 12, "trafford-park": 20, airport: 30, "salford-central": 8,  victoria: 10, stockport: 25 },
  "northern-quarter":  { piccadilly: 5,  spinningfields: 12, mediacity: 28, "oxford-road": 15, ancoats: 8,  "trafford-park": 30, airport: 40, "salford-central": 15, victoria: 8,  stockport: 25 },
  ancoats:             { piccadilly: 8,  spinningfields: 18, mediacity: 32, "oxford-road": 20, ancoats: 5,  "trafford-park": 35, airport: 45, "salford-central": 20, victoria: 12, stockport: 28 },
  castlefield:         { piccadilly: 12, spinningfields: 6,  mediacity: 18, "oxford-road": 12, ancoats: 15, "trafford-park": 18, airport: 28, "salford-central": 10, victoria: 12, stockport: 25 },
  hulme:               { piccadilly: 20, spinningfields: 15, mediacity: 22, "oxford-road": 10, ancoats: 25, "trafford-park": 20, airport: 30, "salford-central": 18, victoria: 22, stockport: 30 },
  rusholme:            { piccadilly: 22, spinningfields: 25, mediacity: 40, "oxford-road": 8,  ancoats: 28, "trafford-park": 38, airport: 35, "salford-central": 30, victoria: 30, stockport: 30 },
  fallowfield:         { piccadilly: 28, spinningfields: 30, mediacity: 45, "oxford-road": 15, ancoats: 35, "trafford-park": 42, airport: 32, "salford-central": 35, victoria: 35, stockport: 32 },
  withington:          { piccadilly: 32, spinningfields: 32, mediacity: 45, "oxford-road": 22, ancoats: 38, "trafford-park": 40, airport: 28, "salford-central": 35, victoria: 35, stockport: 28 },
  didsbury:            { piccadilly: 35, spinningfields: 35, mediacity: 48, "oxford-road": 28, ancoats: 42, "trafford-park": 42, airport: 22, "salford-central": 38, victoria: 38, stockport: 22 },
  chorlton:            { piccadilly: 30, spinningfields: 28, mediacity: 35, "oxford-road": 25, ancoats: 35, "trafford-park": 25, airport: 30, "salford-central": 30, victoria: 32, stockport: 40 },
  "whalley-range":     { piccadilly: 30, spinningfields: 28, mediacity: 35, "oxford-road": 20, ancoats: 35, "trafford-park": 25, airport: 35, "salford-central": 30, victoria: 32, stockport: 40 },
  levenshulme:         { piccadilly: 10, spinningfields: 20, mediacity: 35, "oxford-road": 18, ancoats: 15, "trafford-park": 38, airport: 30, "salford-central": 22, victoria: 18, stockport: 12 },
  burnage:             { piccadilly: 15, spinningfields: 25, mediacity: 40, "oxford-road": 22, ancoats: 20, "trafford-park": 42, airport: 25, "salford-central": 28, victoria: 25, stockport: 10 },
  gorton:              { piccadilly: 12, spinningfields: 22, mediacity: 38, "oxford-road": 25, ancoats: 15, "trafford-park": 42, airport: 45, "salford-central": 25, victoria: 20, stockport: 25 },
  "cheetham-hill":     { piccadilly: 20, spinningfields: 18, mediacity: 30, "oxford-road": 28, ancoats: 20, "trafford-park": 35, airport: 50, "salford-central": 15, victoria: 10, stockport: 38 },
  wythenshawe:         { piccadilly: 45, spinningfields: 42, mediacity: 50, "oxford-road": 38, ancoats: 50, "trafford-park": 40, airport: 12, "salford-central": 45, victoria: 48, stockport: 30 },

  // ── Salford ──
  "salford-central":   { piccadilly: 15, spinningfields: 8,  mediacity: 15, "oxford-road": 18, ancoats: 20, "trafford-park": 18, airport: 35, "salford-central": 3,  victoria: 10, stockport: 30 },
  "salford-quays":     { piccadilly: 30, spinningfields: 22, mediacity: 5,  "oxford-road": 32, ancoats: 35, "trafford-park": 12, airport: 45, "salford-central": 20, victoria: 28, stockport: 45 },
  ordsall:             { piccadilly: 25, spinningfields: 15, mediacity: 10, "oxford-road": 25, ancoats: 30, "trafford-park": 12, airport: 40, "salford-central": 15, victoria: 25, stockport: 42 },
  eccles:              { piccadilly: 40, spinningfields: 32, mediacity: 15, "oxford-road": 42, ancoats: 45, "trafford-park": 20, airport: 55, "salford-central": 25, victoria: 35, stockport: 55 },
  monton:              { piccadilly: 45, spinningfields: 38, mediacity: 22, "oxford-road": 48, ancoats: 50, "trafford-park": 28, airport: 60, "salford-central": 32, victoria: 40, stockport: 60 },
  worsley:             { piccadilly: 45, spinningfields: 40, mediacity: 30, "oxford-road": 50, ancoats: 50, "trafford-park": 30, airport: 55, "salford-central": 35, victoria: 38, stockport: 60 },
  swinton:             { piccadilly: 35, spinningfields: 30, mediacity: 30, "oxford-road": 40, ancoats: 40, "trafford-park": 32, airport: 55, "salford-central": 25, victoria: 20, stockport: 50 },

  // ── Trafford ──
  "old-trafford":      { piccadilly: 22, spinningfields: 15, mediacity: 15, "oxford-road": 20, ancoats: 28, "trafford-park": 10, airport: 32, "salford-central": 20, victoria: 25, stockport: 40 },
  stretford:           { piccadilly: 28, spinningfields: 22, mediacity: 20, "oxford-road": 28, ancoats: 32, "trafford-park": 10, airport: 32, "salford-central": 25, victoria: 30, stockport: 45 },
  sale:                { piccadilly: 35, spinningfields: 28, mediacity: 30, "oxford-road": 35, ancoats: 40, "trafford-park": 18, airport: 25, "salford-central": 32, victoria: 38, stockport: 40 },
  urmston:             { piccadilly: 20, spinningfields: 15, mediacity: 22, "oxford-road": 25, ancoats: 28, "trafford-park": 12, airport: 35, "salford-central": 15, victoria: 25, stockport: 45 },
  timperley:           { piccadilly: 42, spinningfields: 35, mediacity: 38, "oxford-road": 42, ancoats: 45, "trafford-park": 25, airport: 20, "salford-central": 40, victoria: 45, stockport: 35 },
  altrincham:          { piccadilly: 40, spinningfields: 32, mediacity: 40, "oxford-road": 40, ancoats: 45, "trafford-park": 25, airport: 18, "salford-central": 38, victoria: 45, stockport: 32 },
  hale:                { piccadilly: 30, spinningfields: 35, mediacity: 45, "oxford-road": 35, ancoats: 38, "trafford-park": 30, airport: 15, "salford-central": 40, victoria: 40, stockport: 18 },

  // ── Stockport ──
  stockport:           { piccadilly: 12, spinningfields: 22, mediacity: 45, "oxford-road": 20, ancoats: 20, "trafford-park": 45, airport: 15, "salford-central": 25, victoria: 25, stockport: 3 },
  "heaton-moor":       { piccadilly: 12, spinningfields: 22, mediacity: 42, "oxford-road": 20, ancoats: 18, "trafford-park": 45, airport: 25, "salford-central": 25, victoria: 22, stockport: 8 },
  reddish:             { piccadilly: 20, spinningfields: 30, mediacity: 45, "oxford-road": 28, ancoats: 25, "trafford-park": 48, airport: 32, "salford-central": 32, victoria: 25, stockport: 10 },
  cheadle:             { piccadilly: 32, spinningfields: 38, mediacity: 50, "oxford-road": 32, ancoats: 40, "trafford-park": 45, airport: 15, "salford-central": 42, victoria: 42, stockport: 12 },
  "cheadle-hulme":     { piccadilly: 18, spinningfields: 28, mediacity: 50, "oxford-road": 25, ancoats: 25, "trafford-park": 50, airport: 12, "salford-central": 32, victoria: 30, stockport: 6 },
  bramhall:            { piccadilly: 25, spinningfields: 35, mediacity: 55, "oxford-road": 32, ancoats: 32, "trafford-park": 55, airport: 20, "salford-central": 38, victoria: 35, stockport: 10 },
  marple:              { piccadilly: 30, spinningfields: 40, mediacity: 60, "oxford-road": 38, ancoats: 38, "trafford-park": 60, airport: 45, "salford-central": 45, victoria: 42, stockport: 15 },

  // ── Bury ──
  prestwich:           { piccadilly: 25, spinningfields: 22, mediacity: 35, "oxford-road": 32, ancoats: 28, "trafford-park": 40, airport: 55, "salford-central": 20, victoria: 15, stockport: 42 },
  whitefield:          { piccadilly: 30, spinningfields: 28, mediacity: 40, "oxford-road": 38, ancoats: 32, "trafford-park": 45, airport: 60, "salford-central": 25, victoria: 20, stockport: 48 },
  bury:                { piccadilly: 45, spinningfields: 42, mediacity: 55, "oxford-road": 52, ancoats: 48, "trafford-park": 58, airport: 75, "salford-central": 40, victoria: 35, stockport: 60 },
  radcliffe:           { piccadilly: 40, spinningfields: 38, mediacity: 50, "oxford-road": 48, ancoats: 42, "trafford-park": 52, airport: 70, "salford-central": 35, victoria: 30, stockport: 55 },
  ramsbottom:          { piccadilly: 65, spinningfields: 62, mediacity: 75, "oxford-road": 70, ancoats: 68, "trafford-park": 78, airport: 90, "salford-central": 60, victoria: 55, stockport: 80 },

  // ── Bolton ──
  bolton:              { piccadilly: 35, spinningfields: 32, mediacity: 45, "oxford-road": 42, ancoats: 40, "trafford-park": 50, airport: 60, "salford-central": 25, victoria: 25, stockport: 50 },
  horwich:             { piccadilly: 45, spinningfields: 42, mediacity: 55, "oxford-road": 52, ancoats: 50, "trafford-park": 58, airport: 70, "salford-central": 35, victoria: 35, stockport: 60 },
  westhoughton:        { piccadilly: 45, spinningfields: 40, mediacity: 52, "oxford-road": 50, ancoats: 50, "trafford-park": 55, airport: 68, "salford-central": 33, victoria: 33, stockport: 58 },

  // ── Oldham ──
  oldham:              { piccadilly: 40, spinningfields: 42, mediacity: 60, "oxford-road": 45, ancoats: 38, "trafford-park": 62, airport: 70, "salford-central": 45, victoria: 35, stockport: 50 },
  chadderton:          { piccadilly: 38, spinningfields: 40, mediacity: 58, "oxford-road": 42, ancoats: 35, "trafford-park": 60, airport: 68, "salford-central": 42, victoria: 32, stockport: 48 },
  uppermill:           { piccadilly: 40, spinningfields: 48, mediacity: 65, "oxford-road": 48, ancoats: 45, "trafford-park": 68, airport: 70, "salford-central": 50, victoria: 45, stockport: 55 },

  // ── Rochdale ──
  rochdale:            { piccadilly: 45, spinningfields: 48, mediacity: 60, "oxford-road": 52, ancoats: 48, "trafford-park": 65, airport: 75, "salford-central": 40, victoria: 30, stockport: 60 },
  middleton:           { piccadilly: 40, spinningfields: 42, mediacity: 55, "oxford-road": 48, ancoats: 42, "trafford-park": 58, airport: 65, "salford-central": 38, victoria: 32, stockport: 50 },
  littleborough:       { piccadilly: 50, spinningfields: 52, mediacity: 65, "oxford-road": 58, ancoats: 52, "trafford-park": 70, airport: 80, "salford-central": 45, victoria: 35, stockport: 65 },

  // ── Tameside ──
  "ashton-under-lyne": { piccadilly: 30, spinningfields: 40, mediacity: 55, "oxford-road": 40, ancoats: 28, "trafford-park": 58, airport: 65, "salford-central": 42, victoria: 35, stockport: 40 },
  denton:              { piccadilly: 35, spinningfields: 42, mediacity: 58, "oxford-road": 42, ancoats: 35, "trafford-park": 60, airport: 50, "salford-central": 45, victoria: 42, stockport: 25 },
  stalybridge:         { piccadilly: 25, spinningfields: 35, mediacity: 55, "oxford-road": 35, ancoats: 30, "trafford-park": 55, airport: 60, "salford-central": 40, victoria: 35, stockport: 45 },

  // ── Wigan ──
  wigan:               { piccadilly: 40, spinningfields: 45, mediacity: 55, "oxford-road": 48, ancoats: 48, "trafford-park": 55, airport: 70, "salford-central": 32, victoria: 30, stockport: 60 },
  leigh:               { piccadilly: 60, spinningfields: 55, mediacity: 55, "oxford-road": 65, ancoats: 65, "trafford-park": 55, airport: 80, "salford-central": 48, victoria: 55, stockport: 80 },
  standish:            { piccadilly: 50, spinningfields: 55, mediacity: 65, "oxford-road": 58, ancoats: 58, "trafford-park": 65, airport: 80, "salford-central": 42, victoria: 40, stockport: 70 },
};

/** Great-circle distance in kilometres. */
export function haversineKm(a: LatLng, b: LatLng): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(h));
}

/**
 * Commute estimate from a neighbourhood to a destination id.
 *
 * Returns the reviewed matrix figure where one exists, and otherwise a
 * distance estimate that is explicitly labelled as such, so the page can
 * tell the reader which of the two they are looking at.
 */
export function commuteEstimate(
  neighbourhood: ManchesterNeighbourhood,
  destinationId: string,
): CommuteEstimate | null {
  const matrix = MANCHESTER_COMMUTE_TIMES[neighbourhood.id];
  const reviewed = matrix?.[destinationId];
  if (reviewed != null) {
    return { minutes: reviewed, source: "staticMatrix" };
  }

  const destination = MANCHESTER_DESTINATIONS_BY_ID[destinationId];
  if (!destination) return null;

  const km = haversineKm(neighbourhood.centroid, destination.centroid);
  const minutes = Math.max(10, Math.round(km * (60 / GM_TRANSIT_KMH)));
  return { minutes, source: "distanceHeuristic" };
}

export function commuteMinutes(
  neighbourhood: ManchesterNeighbourhood,
  destinationId: string,
): number | null {
  return commuteEstimate(neighbourhood, destinationId)?.minutes ?? null;
}

export const COMMUTE_SOURCE_LABELS: Record<string, string> = {
  staticMatrix: "Reviewed estimate",
  distanceHeuristic: "Distance estimate",
  tflJourneyPlanner: "Live journey planner",
};

/**
 * Coverage check, run by the dataset test. Every neighbourhood must have
 * a reviewed row covering every destination — a gap silently degrades to
 * a straight-line guess, which for an orbital Greater Manchester journey
 * can be wrong by half an hour.
 */
export function commuteMatrixGaps(
  neighbourhoods: ManchesterNeighbourhood[],
  destinationIds: string[],
): { id: string; missing: string[] }[] {
  return neighbourhoods
    .map((n) => {
      const row = MANCHESTER_COMMUTE_TIMES[n.id] ?? {};
      return { id: n.id, missing: destinationIds.filter((d) => row[d] == null) };
    })
    .filter((entry) => entry.missing.length > 0);
}
