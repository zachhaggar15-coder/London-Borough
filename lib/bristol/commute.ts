/**
 * West of England commute estimates.
 *
 * The West of England Combined Authority publishes no open routing API,
 * so this region runs entirely on the reviewed static matrix below, with
 * a straight-line fallback for anything not in it. Nothing here calls
 * out to a live service, and nothing here claims to.
 *
 * The figures are typical weekday-morning door-to-door times using
 * public transport: walking to the stop, waiting, riding, and walking
 * off at the other end. They are not timetable times. Bath Spa to
 * Temple Meads is thirteen minutes on the train and twenty here, because
 * nobody lives on the platform.
 */

/**
 * Average effective public-transport speed across the West of England,
 * used only for the distance fallback.
 *
 * The lowest figure used anywhere on this site, and deliberately so.
 * Bristol has no metro, no tram and — outside the three MetroBus
 * corridors — no segregated bus running at all, on a medieval street
 * plan draped over a set of steep hills. The city has some of the worst
 * peak bus congestion of any large English city, and a more optimistic
 * assumption would produce confidently wrong numbers for exactly the
 * journeys people most need warning about.
 */
export const WEST_OF_ENGLAND_TRANSIT_KMH = 15;

/**
 * Reviewed door-to-door estimates, in minutes, from each area to each of
 * the eight destinations in data/destinations.ts.
 *
 * Read down the aztec-west column and the region's central problem shows
 * itself: the biggest employment site in the West of England is close to
 * unreachable by public transport from most of the city that supplies
 * its workforce. Bedminster to Aztec West is eleven kilometres and the
 * better part of an hour.
 */
export const BRISTOL_COMMUTE_TIMES: Record<string, Record<string, number>> = {
  // ── Bristol: central ──
  harbourside:        { "temple-meads": 12, "city-centre": 5,  "clifton-triangle": 15, "aztec-west": 40, "uwe-frenchay": 40, southmead: 30, "bath-centre": 45, avonmouth: 40 },
  "old-market":       { "temple-meads": 8,  "city-centre": 12, "clifton-triangle": 22, "aztec-west": 45, "uwe-frenchay": 38, southmead: 35, "bath-centre": 40, avonmouth: 45 },
  "stokes-croft":     { "temple-meads": 20, "city-centre": 12, "clifton-triangle": 18, "aztec-west": 40, "uwe-frenchay": 35, southmead: 28, "bath-centre": 50, avonmouth: 45 },

  // ── Bristol: inner ──
  clifton:            { "temple-meads": 25, "city-centre": 18, "clifton-triangle": 5,  "aztec-west": 45, "uwe-frenchay": 45, southmead: 30, "bath-centre": 55, avonmouth: 40 },
  cotham:             { "temple-meads": 22, "city-centre": 15, "clifton-triangle": 8,  "aztec-west": 42, "uwe-frenchay": 40, southmead: 28, "bath-centre": 52, avonmouth: 45 },
  redland:            { "temple-meads": 20, "city-centre": 18, "clifton-triangle": 12, "aztec-west": 38, "uwe-frenchay": 38, southmead: 25, "bath-centre": 50, avonmouth: 40 },
  montpelier:         { "temple-meads": 18, "city-centre": 15, "clifton-triangle": 15, "aztec-west": 38, "uwe-frenchay": 32, southmead: 28, "bath-centre": 48, avonmouth: 42 },
  bishopston:         { "temple-meads": 25, "city-centre": 20, "clifton-triangle": 18, "aztec-west": 35, "uwe-frenchay": 32, southmead: 22, "bath-centre": 55, avonmouth: 45 },
  easton:             { "temple-meads": 8,  "city-centre": 18, "clifton-triangle": 25, "aztec-west": 40, "uwe-frenchay": 28, southmead: 35, "bath-centre": 38, avonmouth: 42 },
  southville:         { "temple-meads": 20, "city-centre": 15, "clifton-triangle": 20, "aztec-west": 45, "uwe-frenchay": 45, southmead: 35, "bath-centre": 50, avonmouth: 45 },
  bedminster:         { "temple-meads": 12, "city-centre": 15, "clifton-triangle": 22, "aztec-west": 50, "uwe-frenchay": 45, southmead: 38, "bath-centre": 45, avonmouth: 48 },
  totterdown:         { "temple-meads": 15, "city-centre": 20, "clifton-triangle": 28, "aztec-west": 52, "uwe-frenchay": 45, southmead: 40, "bath-centre": 42, avonmouth: 52 },

  // ── Bristol: outer ──
  "st-george":        { "temple-meads": 15, "city-centre": 25, "clifton-triangle": 32, "aztec-west": 45, "uwe-frenchay": 30, southmead: 40, "bath-centre": 40, avonmouth: 52 },
  fishponds:          { "temple-meads": 25, "city-centre": 30, "clifton-triangle": 35, "aztec-west": 32, "uwe-frenchay": 12, southmead: 32, "bath-centre": 45, avonmouth: 55 },
  horfield:           { "temple-meads": 25, "city-centre": 25, "clifton-triangle": 22, "aztec-west": 25, "uwe-frenchay": 25, southmead: 15, "bath-centre": 55, avonmouth: 45 },
  henleaze:           { "temple-meads": 30, "city-centre": 25, "clifton-triangle": 20, "aztec-west": 30, "uwe-frenchay": 32, southmead: 15, "bath-centre": 58, avonmouth: 40 },
  "westbury-on-trym": { "temple-meads": 35, "city-centre": 30, "clifton-triangle": 22, "aztec-west": 30, "uwe-frenchay": 35, southmead: 12, "bath-centre": 62, avonmouth: 35 },
  knowle:             { "temple-meads": 20, "city-centre": 25, "clifton-triangle": 32, "aztec-west": 55, "uwe-frenchay": 48, southmead: 42, "bath-centre": 45, avonmouth: 55 },
  brislington:        { "temple-meads": 20, "city-centre": 22, "clifton-triangle": 32, "aztec-west": 50, "uwe-frenchay": 38, southmead: 45, "bath-centre": 30, avonmouth: 55 },
  hengrove:           { "temple-meads": 30, "city-centre": 30, "clifton-triangle": 38, "aztec-west": 60, "uwe-frenchay": 55, southmead: 48, "bath-centre": 50, avonmouth: 60 },
  shirehampton:       { "temple-meads": 35, "city-centre": 30, "clifton-triangle": 25, "aztec-west": 35, "uwe-frenchay": 45, southmead: 25, "bath-centre": 65, avonmouth: 8 },

  // ── South Gloucestershire ──
  filton:             { "temple-meads": 20, "city-centre": 28, "clifton-triangle": 28, "aztec-west": 12, "uwe-frenchay": 15, southmead: 15, "bath-centre": 50, avonmouth: 35 },
  "bradley-stoke":    { "temple-meads": 30, "city-centre": 38, "clifton-triangle": 38, "aztec-west": 8,  "uwe-frenchay": 15, southmead: 22, "bath-centre": 60, avonmouth: 35 },
  kingswood:          { "temple-meads": 30, "city-centre": 35, "clifton-triangle": 40, "aztec-west": 45, "uwe-frenchay": 30, southmead: 45, "bath-centre": 40, avonmouth: 60 },
  yate:               { "temple-meads": 30, "city-centre": 45, "clifton-triangle": 50, "aztec-west": 35, "uwe-frenchay": 35, southmead: 45, "bath-centre": 60, avonmouth: 60 },
  thornbury:          { "temple-meads": 55, "city-centre": 62, "clifton-triangle": 65, "aztec-west": 30, "uwe-frenchay": 40, southmead: 45, "bath-centre": 75, avonmouth: 45 },

  // ── Bath and North East Somerset ──
  "bath-central":     { "temple-meads": 20, "city-centre": 30, "clifton-triangle": 38, "aztec-west": 60, "uwe-frenchay": 55, southmead: 65, "bath-centre": 5,  avonmouth: 70 },
  "oldfield-park":    { "temple-meads": 25, "city-centre": 35, "clifton-triangle": 42, "aztec-west": 65, "uwe-frenchay": 60, southmead: 70, "bath-centre": 12, avonmouth: 75 },
  bathwick:           { "temple-meads": 20, "city-centre": 28, "clifton-triangle": 35, "aztec-west": 58, "uwe-frenchay": 55, southmead: 65, "bath-centre": 8,  avonmouth: 68 },
  keynsham:           { "temple-meads": 20, "city-centre": 30, "clifton-triangle": 38, "aztec-west": 48, "uwe-frenchay": 42, southmead: 52, "bath-centre": 18, avonmouth: 58 },
  "midsomer-norton":  { "temple-meads": 70, "city-centre": 78, "clifton-triangle": 82, "aztec-west": 85, "uwe-frenchay": 80, southmead: 85, "bath-centre": 50, avonmouth: 90 },

  // ── North Somerset ──
  portishead:         { "temple-meads": 45, "city-centre": 40, "clifton-triangle": 40, "aztec-west": 45, "uwe-frenchay": 55, southmead: 45, "bath-centre": 75, avonmouth: 25 },
  nailsea:            { "temple-meads": 25, "city-centre": 35, "clifton-triangle": 40, "aztec-west": 50, "uwe-frenchay": 55, southmead: 50, "bath-centre": 50, avonmouth: 50 },
  clevedon:           { "temple-meads": 45, "city-centre": 55, "clifton-triangle": 55, "aztec-west": 60, "uwe-frenchay": 65, southmead: 60, "bath-centre": 75, avonmouth: 40 },
  "weston-super-mare": { "temple-meads": 45, "city-centre": 55, "clifton-triangle": 58, "aztec-west": 68, "uwe-frenchay": 70, southmead: 68, "bath-centre": 65, avonmouth: 60 },
};
