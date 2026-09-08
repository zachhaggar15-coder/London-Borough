import type { Destination } from "@/lib/types";

/**
 * Where Paris commutes to.
 *
 * The list is dominated by two things a British reader may not expect.
 * La Défense is the largest purpose-built business district in Europe
 * and employs around 180,000 people, none of them in Paris proper — it
 * sits outside the city boundary and is reached by RER A, which is the
 * busiest railway line in Europe. And Issy and the south-west arc hold
 * most of the media and telecoms employers.
 *
 * Central Paris itself is small enough that Châtelet, Opéra and
 * Saint-Lazare are all within a twenty-minute walk of each other, which
 * is why so many of these times converge.
 */
export const PARIS_DESTINATIONS: Destination[] = [
  { id: "la-defense",    label: "La Défense",                  centroid: { lat: 48.8920, lng: 2.2360 } },
  { id: "opera",         label: "Opéra & the 2e",              centroid: { lat: 48.8710, lng: 2.3320 } },
  { id: "chatelet",      label: "Châtelet & the centre",       centroid: { lat: 48.8580, lng: 2.3470 } },
  { id: "saint-lazare",  label: "Saint-Lazare & the 8e",       centroid: { lat: 48.8760, lng: 2.3250 } },
  { id: "gare-de-lyon",  label: "Gare de Lyon & Bercy",        centroid: { lat: 48.8450, lng: 2.3740 } },
  { id: "montparnasse",  label: "Montparnasse & the 15e",      centroid: { lat: 48.8420, lng: 2.3210 } },
  { id: "issy",          label: "Issy & the south-west",       centroid: { lat: 48.8240, lng: 2.2700 } },
  { id: "cdg",           label: "Charles de Gaulle airport",   centroid: { lat: 49.0100, lng: 2.5480 } },
];

export const PARIS_DESTINATIONS_BY_ID: Record<string, Destination> =
  Object.fromEntries(PARIS_DESTINATIONS.map((d) => [d.id, d]));

/**
 * Average effective public-transport speed, used only for the distance
 * fallback.
 *
 * The highest figure on this site by a wide margin, and Paris deserves
 * it: 308 métro stations inside 105 square kilometres, most of the
 * network running every two to four minutes at peak, and the RER
 * crossing the city underground at main-line speeds. No British city
 * outside London is remotely comparable, and even London's coverage is
 * thinner per square kilometre.
 */
export const PARIS_TRANSIT_KMH = 26;

/**
 * Reviewed door-to-door estimates, in minutes.
 *
 * Read across La Défense and the airport columns and the shape of
 * Île-de-France appears: the métro serves the city brilliantly and stops
 * at the boundary, and everything beyond it depends on the RER — which
 * is fast when it runs and the single biggest source of commuting misery
 * in the region when it does not.
 */
export const PARIS_COMMUTE_TIMES: Record<string, Record<string, number>> = {
  // ── Paris Centre ──
  marais:              { "la-defense": 35, opera: 15, chatelet: 10, "saint-lazare": 20, "gare-de-lyon": 15, montparnasse: 25, issy: 35, cdg: 50 },
  "les-halles":        { "la-defense": 25, opera: 12, chatelet: 5,  "saint-lazare": 15, "gare-de-lyon": 15, montparnasse: 20, issy: 30, cdg: 40 },

  // ── Latin Quarter & Saint-Germain ──
  "latin-quarter":     { "la-defense": 35, opera: 20, chatelet: 12, "saint-lazare": 25, "gare-de-lyon": 18, montparnasse: 15, issy: 30, cdg: 45 },
  "saint-germain":     { "la-defense": 32, opera: 18, chatelet: 12, "saint-lazare": 20, "gare-de-lyon": 22, montparnasse: 15, issy: 28, cdg: 48 },

  // ── The West ──
  passy:               { "la-defense": 20, opera: 22, chatelet: 25, "saint-lazare": 20, "gare-de-lyon": 35, montparnasse: 25, issy: 20, cdg: 55 },

  // ── Grands Boulevards & Canal ──
  "canal-saint-martin":{ "la-defense": 35, opera: 15, chatelet: 15, "saint-lazare": 20, "gare-de-lyon": 20, montparnasse: 30, issy: 40, cdg: 40 },
  "south-pigalle":     { "la-defense": 30, opera: 10, chatelet: 18, "saint-lazare": 12, "gare-de-lyon": 28, montparnasse: 28, issy: 38, cdg: 45 },

  // ── Bastille & Bercy ──
  oberkampf:           { "la-defense": 38, opera: 18, chatelet: 15, "saint-lazare": 25, "gare-de-lyon": 18, montparnasse: 30, issy: 40, cdg: 45 },
  bastille:            { "la-defense": 35, opera: 18, chatelet: 12, "saint-lazare": 25, "gare-de-lyon": 10, montparnasse: 25, issy: 35, cdg: 50 },

  // ── The South ──
  "butte-aux-cailles": { "la-defense": 45, opera: 28, chatelet: 22, "saint-lazare": 32, "gare-de-lyon": 20, montparnasse: 20, issy: 30, cdg: 55 },
  "montparnasse":      { "la-defense": 30, opera: 20, chatelet: 15, "saint-lazare": 18, "gare-de-lyon": 22, montparnasse: 5,  issy: 20, cdg: 55 },

  // ── Montmartre & Batignolles ──
  batignolles:         { "la-defense": 25, opera: 15, chatelet: 22, "saint-lazare": 12, "gare-de-lyon": 32, montparnasse: 30, issy: 40, cdg: 45 },
  montmartre:          { "la-defense": 35, opera: 15, chatelet: 22, "saint-lazare": 18, "gare-de-lyon": 32, montparnasse: 32, issy: 45, cdg: 45 },

  // ── The North-east ──
  belleville:          { "la-defense": 42, opera: 22, chatelet: 20, "saint-lazare": 28, "gare-de-lyon": 22, montparnasse: 35, issy: 45, cdg: 45 },
  "buttes-chaumont":   { "la-defense": 42, opera: 25, chatelet: 22, "saint-lazare": 30, "gare-de-lyon": 28, montparnasse: 38, issy: 48, cdg: 40 },

  nation:              { "la-defense": 40, opera: 22, chatelet: 18, "saint-lazare": 28, "gare-de-lyon": 12, montparnasse: 30, issy: 42, cdg: 50 },
  bercy:               { "la-defense": 30, opera: 18, chatelet: 15, "saint-lazare": 15, "gare-de-lyon": 8,  montparnasse: 25, issy: 38, cdg: 50 },
  gobelins:            { "la-defense": 42, opera: 25, chatelet: 18, "saint-lazare": 30, "gare-de-lyon": 18, montparnasse: 18, issy: 32, cdg: 50 },
  commerce:            { "la-defense": 25, opera: 25, chatelet: 25, "saint-lazare": 22, "gare-de-lyon": 35, montparnasse: 15, issy: 15, cdg: 60 },
  ternes:              { "la-defense": 15, opera: 15, chatelet: 25, "saint-lazare": 12, "gare-de-lyon": 35, montparnasse: 28, issy: 35, cdg: 45 },
  charonne:            { "la-defense": 45, opera: 25, chatelet: 22, "saint-lazare": 32, "gare-de-lyon": 20, montparnasse: 35, issy: 48, cdg: 50 },
  jourdain:            { "la-defense": 45, opera: 28, chatelet: 22, "saint-lazare": 32, "gare-de-lyon": 28, montparnasse: 40, issy: 50, cdg: 42 },

  // ── Petite couronne ──
  levallois:           { "la-defense": 15, opera: 22, chatelet: 30, "saint-lazare": 18, "gare-de-lyon": 40, montparnasse: 35, issy: 35, cdg: 50 },
  ivry:                { "la-defense": 48, opera: 32, chatelet: 25, "saint-lazare": 38, "gare-de-lyon": 25, montparnasse: 28, issy: 40, cdg: 60 },
  montreuil:           { "la-defense": 50, opera: 30, chatelet: 25, "saint-lazare": 35, "gare-de-lyon": 25, montparnasse: 40, issy: 50, cdg: 55 },
  "saint-ouen":        { "la-defense": 35, opera: 20, chatelet: 20, "saint-lazare": 12, "gare-de-lyon": 30, montparnasse: 30, issy: 45, cdg: 45 },
  boulogne:            { "la-defense": 20, opera: 30, chatelet: 32, "saint-lazare": 28, "gare-de-lyon": 42, montparnasse: 25, issy: 12, cdg: 65 },
  pantin:              { "la-defense": 48, opera: 28, chatelet: 25, "saint-lazare": 32, "gare-de-lyon": 30, montparnasse: 42, issy: 52, cdg: 35 },
  "saint-germain-en-laye": { "la-defense": 25, opera: 45, chatelet: 45, "saint-lazare": 40, "gare-de-lyon": 50, montparnasse: 50, issy: 45, cdg: 75 },
  vincennes:           { "la-defense": 40, opera: 25, chatelet: 20, "saint-lazare": 30, "gare-de-lyon": 15, montparnasse: 32, issy: 45, cdg: 55 },
};
