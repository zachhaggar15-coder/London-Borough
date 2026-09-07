import type { Destination } from "@/lib/types";

/**
 * Where Geneva commutes to, and how long it takes.
 *
 * The destination list is unlike a British one because Geneva's
 * employment is unlike a British city's. Two of the largest employers
 * are an international organisation quarter and a particle physics
 * laboratory; a third is a hospital; a fourth is a watchmaking and
 * life-sciences belt on the southern edge. Very little of it is in the
 * centre, and the tram network was built for a city that assumed it
 * would be.
 */
export const GENEVA_DESTINATIONS: Destination[] = [
  { id: "cornavin",        label: "Cornavin & the centre",          centroid: { lat: 46.2100, lng: 6.1420 } },
  { id: "banking",         label: "Rue du Rhône & the banks",       centroid: { lat: 46.2040, lng: 6.1500 } },
  { id: "nations",         label: "International Geneva & the UN",  centroid: { lat: 46.2270, lng: 6.1400 } },
  { id: "cern",            label: "CERN",                           centroid: { lat: 46.2340, lng: 6.0550 } },
  { id: "plan-les-ouates", label: "Plan-les-Ouates life sciences",  centroid: { lat: 46.1670, lng: 6.1200 } },
  { id: "hug",             label: "HUG university hospital",        centroid: { lat: 46.1920, lng: 6.1490 } },
  { id: "airport",         label: "Genève Aéroport",                centroid: { lat: 46.2380, lng: 6.1090 } },
  { id: "annemasse-centre",label: "Annemasse (France)",             centroid: { lat: 46.1940, lng: 6.2360 } },
];

export const GENEVA_DESTINATIONS_BY_ID: Record<string, Destination> =
  Object.fromEntries(GENEVA_DESTINATIONS.map((d) => [d.id, d]));

/**
 * Average effective public-transport speed, used only for the distance
 * fallback.
 *
 * Higher than any UK region on this site. Geneva is small, TPG runs at
 * genuinely high frequency, and the Léman Express opened in 2019 as a
 * proper cross-border suburban railway with fifteen-minute headways on
 * the core. Public transport here works in a way it does not in Bristol
 * or Leeds, and the model should not pretend otherwise.
 */
export const GENEVA_TRANSIT_KMH = 22;

/**
 * Reviewed door-to-door estimates, in minutes.
 *
 * Read across the CERN and Plan-les-Ouates columns and the shape of the
 * problem appears: the two biggest non-central employers sit at opposite
 * ends of the canton, and a network built to funnel everyone through
 * Bel-Air serves neither of them well from the other's side.
 */
export const GENEVA_COMMUTE_TIMES: Record<string, Record<string, number>> = {
  // ── Ville de Genève ──
  "cite-centre":      { cornavin: 10, banking: 5,  nations: 18, cern: 35, "plan-les-ouates": 30, hug: 15, airport: 25, "annemasse-centre": 30 },
  paquis:             { cornavin: 5,  banking: 12, nations: 15, cern: 32, "plan-les-ouates": 35, hug: 22, airport: 20, "annemasse-centre": 32 },
  "eaux-vives":       { cornavin: 15, banking: 8,  nations: 25, cern: 40, "plan-les-ouates": 28, hug: 15, airport: 22, "annemasse-centre": 15 },
  plainpalais:        { cornavin: 12, banking: 10, nations: 22, cern: 35, "plan-les-ouates": 25, hug: 10, airport: 28, "annemasse-centre": 28 },
  jonction:           { cornavin: 15, banking: 15, nations: 25, cern: 32, "plan-les-ouates": 22, hug: 15, airport: 28, "annemasse-centre": 32 },
  servette:           { cornavin: 10, banking: 18, nations: 12, cern: 28, "plan-les-ouates": 35, hug: 25, airport: 18, "annemasse-centre": 35 },
  champel:            { cornavin: 18, banking: 15, nations: 28, cern: 42, "plan-les-ouates": 22, hug: 5,  airport: 30, "annemasse-centre": 25 },
  "saint-jean":       { cornavin: 12, banking: 20, nations: 18, cern: 25, "plan-les-ouates": 30, hug: 25, airport: 20, "annemasse-centre": 35 },

  // ── Canton communes ──
  carouge:            { cornavin: 20, banking: 18, nations: 30, cern: 40, "plan-les-ouates": 15, hug: 15, airport: 35, "annemasse-centre": 32 },
  lancy:              { cornavin: 15, banking: 20, nations: 28, cern: 30, "plan-les-ouates": 15, hug: 20, airport: 25, "annemasse-centre": 30 },
  vernier:            { cornavin: 18, banking: 25, nations: 22, cern: 20, "plan-les-ouates": 35, hug: 32, airport: 15, "annemasse-centre": 42 },
  meyrin:             { cornavin: 25, banking: 30, nations: 20, cern: 10, "plan-les-ouates": 45, hug: 40, airport: 12, "annemasse-centre": 50 },
  "chene-bougeries":  { cornavin: 22, banking: 15, nations: 32, cern: 48, "plan-les-ouates": 30, hug: 20, airport: 35, "annemasse-centre": 15 },
  "grand-saconnex":   { cornavin: 18, banking: 25, nations: 8,  cern: 22, "plan-les-ouates": 42, hug: 35, airport: 8,  "annemasse-centre": 45 },
  versoix:            { cornavin: 20, banking: 28, nations: 25, cern: 35, "plan-les-ouates": 45, hug: 38, airport: 22, "annemasse-centre": 45 },

  // ── Canton de Vaud ──
  nyon:               { cornavin: 35, banking: 42, nations: 42, cern: 50, "plan-les-ouates": 58, hug: 52, airport: 32, "annemasse-centre": 60 },

  // ── France voisine ──
  annemasse:          { cornavin: 25, banking: 22, nations: 38, cern: 55, "plan-les-ouates": 45, hug: 32, airport: 40, "annemasse-centre": 5 },
  "saint-julien":     { cornavin: 35, banking: 38, nations: 45, cern: 50, "plan-les-ouates": 20, hug: 38, airport: 45, "annemasse-centre": 45 },
  "ferney-voltaire":  { cornavin: 30, banking: 35, nations: 20, cern: 15, "plan-les-ouates": 55, hug: 45, airport: 12, "annemasse-centre": 55 },
  thonon:             { cornavin: 55, banking: 52, nations: 65, cern: 80, "plan-les-ouates": 70, hug: 60, airport: 70, "annemasse-centre": 30 },
};
