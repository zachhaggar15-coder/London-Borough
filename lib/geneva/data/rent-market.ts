import type { BedroomBaseline } from "@/lib/city-content";

/**
 * Geneva rent baselines, in Swiss francs.
 *
 * Two things about this market have no parallel in the UK sections and
 * both change how the numbers should be read.
 *
 * **There is no ONS.** OCSTAT publishes a cantonal rent survey, but it
 * measures the *whole stock* including tenancies decades old under a
 * regime where sitting rents barely move. The gap between that and what
 * is actually advertised is enormous — far wider than the equivalent gap
 * in England — so the figures below are advertised-market estimates from
 * listing samples, anchored on the published cantonal averages for
 * direction rather than level. They describe what you would pay to move
 * in now, which is the only figure a mover can use.
 *
 * **The border is the biggest variable in the table.** The French
 * communes are a different country with a different currency, and they
 * are roughly half the price. Every figure for "France voisine" below is
 * converted from euros at the stored rate in lib/currency.ts, which is
 * an approximation and is flagged as one wherever it appears.
 */

export const GENEVA_RENT_REVIEW_AS_OF = "2026-09-07";

export const GENEVA_RENT_REFERENCE_MONTH = "August 2026";

export const GENEVA_RENT_SOURCES = [
  "OCSTAT (Office cantonal de la statistique) cantonal rent survey, for direction and the whole-stock baseline",
  "Homegate, Immoscout24, Anibis and Glocals visible listing samples across the canton, August 2026",
  "SeLoger and Leboncoin listing samples for the Ain and Haute-Savoie border communes, converted from euros",
] as const;

export const GENEVA_RENT_NOTE =
  "These are advertised-market estimates, not the OCSTAT whole-stock average. Swiss sitting rents move very little, so the published cantonal average sits well below what a new arrival will actually be quoted — using it here would understate a real move by several hundred francs a month.";

/**
 * Advertised monthly rent by grouping and bedroom count, August 2026, in
 * Swiss francs. Note that Swiss listings count *rooms* (pièces), not
 * bedrooms: a "3 pièces" is a two-bedroom flat. These are converted to
 * the bedroom convention used across the site.
 */
export const GENEVA_RENT_CHF: Record<string, BedroomBaseline> = {
  "Ville de Genève": { oneBed: 2050, twoBed: 2750, threeBed: 3600, allProperties: 2900 },
  Carouge: { oneBed: 1900, twoBed: 2550, threeBed: 3300, allProperties: 2650 },
  Lancy: { oneBed: 1750, twoBed: 2300, threeBed: 2950, allProperties: 2400 },
  Vernier: { oneBed: 1650, twoBed: 2150, threeBed: 2750, allProperties: 2250 },
  Meyrin: { oneBed: 1700, twoBed: 2200, threeBed: 2850, allProperties: 2300 },
  "Chêne-Bougeries": { oneBed: 2000, twoBed: 2700, threeBed: 3550, allProperties: 2850 },
  "Le Grand-Saconnex": { oneBed: 1800, twoBed: 2400, threeBed: 3100, allProperties: 2500 },
  Versoix: { oneBed: 1700, twoBed: 2250, threeBed: 2900, allProperties: 2350 },
  // Converted from euros. Roughly half the cantonal level, which is the
  // single most important number on this page.
  "France voisine": { oneBed: 950, twoBed: 1250, threeBed: 1600, allProperties: 1300 },
  "Canton de Vaud": { oneBed: 1600, twoBed: 2100, threeBed: 2700, allProperties: 2200 },
};

/**
 * Room-in-a-share districts.
 *
 * Sharing is much less normal in Geneva than in Britain — the stock is
 * flats rather than houses and the standard lease does not contemplate
 * it — but it is how a great many arriving anglophones start, through
 * Glocals and the international-organisation networks. The figures are
 * accordingly thinner than the UK equivalents and are labelled as such.
 */
export type GenevaRoomDistrict =
  | "geneve-centre"
  | "geneve-rive-gauche"
  | "geneve-rive-droite"
  | "carouge-lancy"
  | "vernier-meyrin"
  | "chenes"
  | "versoix-saconnex"
  | "france-annemasse"
  | "france-gex"
  | "vaud-nyon";

export const GENEVA_ROOM_DISTRICT_LABELS: Record<GenevaRoomDistrict, string> = {
  "geneve-centre": "Geneva centre — Cité, Pâquis, Plainpalais",
  "geneve-rive-gauche": "Left bank — Eaux-Vives, Champel, Jonction",
  "geneve-rive-droite": "Right bank — Servette, Saint-Jean, Grottes",
  "carouge-lancy": "Carouge and Lancy",
  "vernier-meyrin": "Vernier and Meyrin",
  chenes: "Chêne-Bougeries, Thônex and Cologny",
  "versoix-saconnex": "Versoix and Le Grand-Saconnex",
  "france-annemasse": "Haute-Savoie — Annemasse and Saint-Julien",
  "france-gex": "Ain — Ferney-Voltaire and the Pays de Gex",
  "vaud-nyon": "Vaud — Nyon",
};

export const GENEVA_ROOM_AVERAGE_CHF: Record<GenevaRoomDistrict, number> = {
  "geneve-centre": 1300,
  "geneve-rive-gauche": 1250,
  "geneve-rive-droite": 1150,
  "carouge-lancy": 1100,
  "vernier-meyrin": 1000,
  chenes: 1200,
  "versoix-saconnex": 1050,
  "france-annemasse": 600,
  "france-gex": 650,
  "vaud-nyon": 950,
};
