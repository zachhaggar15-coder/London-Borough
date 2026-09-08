import type { Destination } from "@/lib/types";

/**
 * Where Barcelona commutes to.
 *
 * The list reflects a city whose employment has moved decisively in one
 * direction over twenty years. 22@ in Poblenou was industrial land in
 * 2000 and is now the largest technology cluster in southern Europe, and
 * it is where most anglophone arrivals will actually work. The Zona
 * Franca port and logistics area and the Sant Cugat business parks are
 * the two big out-of-town employers.
 */
export const BARCELONA_DESTINATIONS: Destination[] = [
  { id: "placa-catalunya", label: "Plaça de Catalunya & the centre", centroid: { lat: 41.3870, lng: 2.1700 } },
  { id: "22at",            label: "22@ Poblenou tech district",      centroid: { lat: 41.4030, lng: 2.1940 } },
  { id: "diagonal",        label: "Diagonal & the Zona Alta",        centroid: { lat: 41.3930, lng: 2.1400 } },
  { id: "sants-estacio",   label: "Sants Estació",                   centroid: { lat: 41.3790, lng: 2.1400 } },
  { id: "zona-franca",     label: "Zona Franca & the port",          centroid: { lat: 41.3450, lng: 2.1300 } },
  { id: "hospital-clinic", label: "Hospital Clínic & the university", centroid: { lat: 41.3890, lng: 2.1510 } },
  { id: "aeroport",        label: "El Prat airport",                 centroid: { lat: 41.2970, lng: 2.0830 } },
  { id: "sant-cugat",      label: "Sant Cugat business parks",       centroid: { lat: 41.4720, lng: 2.0850 } },
];

export const BARCELONA_DESTINATIONS_BY_ID: Record<string, Destination> =
  Object.fromEntries(BARCELONA_DESTINATIONS.map((d) => [d.id, d]));

/**
 * Average effective public-transport speed, used only for the distance
 * fallback.
 *
 * High, because Barcelona is compact and its metro is genuinely good —
 * twelve lines, frequent, fully automated on L9 and L10, and cheap. The
 * city is also flat along the coast and dense enough that walking often
 * beats waiting, which the model does not attempt to capture.
 */
export const BARCELONA_TRANSIT_KMH = 24;

/**
 * Reviewed door-to-door estimates, in minutes.
 *
 * The Sant Cugat column is the one worth reading. It sits on the far
 * side of Collserola, and the FGC tunnel through the hill is the only
 * quick way there — from the Zona Alta it is twenty minutes and from
 * Poblenou or Badalona it is closer to an hour, for a journey of about
 * twelve kilometres.
 */
export const BARCELONA_COMMUTE_TIMES: Record<string, Record<string, number>> = {
  // ── Ciutat Vella ──
  gotic:               { "placa-catalunya": 8,  "22at": 25, diagonal: 18, "sants-estacio": 20, "zona-franca": 35, "hospital-clinic": 20, aeroport: 35, "sant-cugat": 45 },
  born:                { "placa-catalunya": 10, "22at": 20, diagonal: 20, "sants-estacio": 22, "zona-franca": 38, "hospital-clinic": 22, aeroport: 38, "sant-cugat": 48 },
  raval:               { "placa-catalunya": 8,  "22at": 28, diagonal: 18, "sants-estacio": 15, "zona-franca": 30, "hospital-clinic": 18, aeroport: 32, "sant-cugat": 45 },

  // ── Eixample ──
  "eixample-dreta":    { "placa-catalunya": 8,  "22at": 20, diagonal: 10, "sants-estacio": 18, "zona-franca": 35, "hospital-clinic": 15, aeroport: 35, "sant-cugat": 38 },
  "esquerra-eixample": { "placa-catalunya": 10, "22at": 25, diagonal: 12, "sants-estacio": 15, "zona-franca": 30, "hospital-clinic": 8,  aeroport: 32, "sant-cugat": 38 },
  "sant-antoni":       { "placa-catalunya": 10, "22at": 28, diagonal: 15, "sants-estacio": 12, "zona-franca": 28, "hospital-clinic": 15, aeroport: 30, "sant-cugat": 40 },

  // ── Gràcia ──
  "vila-de-gracia":    { "placa-catalunya": 15, "22at": 28, diagonal: 12, "sants-estacio": 25, "zona-franca": 42, "hospital-clinic": 18, aeroport: 42, "sant-cugat": 35 },
  "camp-den-grassot":  { "placa-catalunya": 18, "22at": 25, diagonal: 15, "sants-estacio": 28, "zona-franca": 45, "hospital-clinic": 22, aeroport: 45, "sant-cugat": 40 },

  // ── Sants-Montjuïc ──
  "poble-sec":         { "placa-catalunya": 12, "22at": 30, diagonal: 20, "sants-estacio": 12, "zona-franca": 22, "hospital-clinic": 18, aeroport: 28, "sant-cugat": 42 },
  sants:               { "placa-catalunya": 15, "22at": 32, diagonal: 18, "sants-estacio": 5,  "zona-franca": 20, "hospital-clinic": 15, aeroport: 25, "sant-cugat": 35 },

  // ── Sarrià-Sant Gervasi ──
  "sant-gervasi":      { "placa-catalunya": 18, "22at": 35, diagonal: 10, "sants-estacio": 22, "zona-franca": 42, "hospital-clinic": 15, aeroport: 42, "sant-cugat": 25 },
  sarria:              { "placa-catalunya": 22, "22at": 40, diagonal: 15, "sants-estacio": 25, "zona-franca": 45, "hospital-clinic": 20, aeroport: 45, "sant-cugat": 20 },

  // ── Sant Martí ──
  poblenou:            { "placa-catalunya": 20, "22at": 8,  diagonal: 25, "sants-estacio": 30, "zona-franca": 45, "hospital-clinic": 28, aeroport: 45, "sant-cugat": 55 },
  "vila-olimpica":     { "placa-catalunya": 15, "22at": 12, diagonal: 22, "sants-estacio": 25, "zona-franca": 40, "hospital-clinic": 25, aeroport: 40, "sant-cugat": 52 },
  clot:                { "placa-catalunya": 18, "22at": 15, diagonal: 22, "sants-estacio": 28, "zona-franca": 45, "hospital-clinic": 28, aeroport: 45, "sant-cugat": 50 },

  // ── Horta & Nou Barris ──
  "gracia-guinardo":   { "placa-catalunya": 25, "22at": 30, diagonal: 22, "sants-estacio": 32, "zona-franca": 50, "hospital-clinic": 28, aeroport: 50, "sant-cugat": 45 },
  "nou-barris":        { "placa-catalunya": 32, "22at": 38, diagonal: 30, "sants-estacio": 38, "zona-franca": 55, "hospital-clinic": 35, aeroport: 55, "sant-cugat": 50 },

  // ── Les Corts and Sant Andreu ──
  "sagrada-familia":   { "placa-catalunya": 12, "22at": 20, diagonal: 15, "sants-estacio": 22, "zona-franca": 40, "hospital-clinic": 18, aeroport: 40, "sant-cugat": 40 },
  "les-corts":         { "placa-catalunya": 18, "22at": 35, diagonal: 8,  "sants-estacio": 15, "zona-franca": 30, "hospital-clinic": 12, aeroport: 30, "sant-cugat": 30 },
  pedralbes:           { "placa-catalunya": 25, "22at": 40, diagonal: 12, "sants-estacio": 22, "zona-franca": 35, "hospital-clinic": 18, aeroport: 25, "sant-cugat": 22 },
  barceloneta:         { "placa-catalunya": 12, "22at": 15, diagonal: 22, "sants-estacio": 25, "zona-franca": 35, "hospital-clinic": 25, aeroport: 35, "sant-cugat": 50 },
  vallcarca:           { "placa-catalunya": 22, "22at": 35, diagonal: 18, "sants-estacio": 30, "zona-franca": 48, "hospital-clinic": 25, aeroport: 48, "sant-cugat": 38 },
  "la-marina":         { "placa-catalunya": 30, "22at": 45, diagonal: 30, "sants-estacio": 20, "zona-franca": 8,  "hospital-clinic": 28, aeroport: 20, "sant-cugat": 45 },
  "sant-andreu":       { "placa-catalunya": 25, "22at": 22, diagonal: 30, "sants-estacio": 35, "zona-franca": 52, "hospital-clinic": 35, aeroport: 52, "sant-cugat": 50 },

  // ── Àrea metropolitana ──
  "sant-cugat":        { "placa-catalunya": 40, "22at": 55, diagonal: 25, "sants-estacio": 40, "zona-franca": 50, "hospital-clinic": 30, aeroport: 50, "sant-cugat": 5 },
  esplugues:           { "placa-catalunya": 30, "22at": 48, diagonal: 25, "sants-estacio": 20, "zona-franca": 25, "hospital-clinic": 25, aeroport: 25, "sant-cugat": 35 },
  hospitalet:          { "placa-catalunya": 25, "22at": 42, diagonal: 30, "sants-estacio": 15, "zona-franca": 20, "hospital-clinic": 25, aeroport: 20, "sant-cugat": 42 },
  badalona:            { "placa-catalunya": 35, "22at": 25, diagonal: 40, "sants-estacio": 45, "zona-franca": 60, "hospital-clinic": 42, aeroport: 60, "sant-cugat": 60 },
};
