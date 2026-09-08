/**
 * The Geneva housing market, grouped the way a decision about it is
 * actually made.
 *
 * Canton Geneva has 45 communes, which is far more granularity than
 * anyone needs and far less signal than the grouping below. The single
 * largest housing decision here is not which commune — it is **which
 * country**. Roughly a hundred thousand people cross the French border
 * into Geneva every working day, because a flat in Annemasse costs
 * something like half what the same flat costs in Eaux-Vives, and the
 * canton has been in a housing shortage for two decades.
 *
 * So "France voisine" and "Canton de Vaud" sit in this list alongside
 * the Geneva communes. They are not communes of Geneva and the pages say
 * so repeatedly — they are separate tax jurisdictions, separate
 * healthcare systems and, for a British passport holder, separate
 * immigration regimes. That is the point: it is the most consequential
 * line on the map and burying it would be a disservice.
 */
export const GENEVA_COMMUNES = [
  "Ville de Genève",
  "Carouge",
  "Lancy",
  "Vernier",
  "Meyrin",
  "Chêne-Bougeries",
  "Cologny",
  "Onex",
  "Plan-les-Ouates",
  "Le Grand-Saconnex",
  "Versoix",
  "France voisine",
  "Canton de Vaud",
] as const;

export type GenevaCommune = (typeof GENEVA_COMMUNES)[number];

/**
 * Which of these are actually in Switzerland.
 *
 * Used by the pages that talk about permits, health insurance and tax,
 * all three of which work completely differently on the French side.
 */
export const SWISS_COMMUNES: readonly string[] = GENEVA_COMMUNES.filter(
  (c) => c !== "France voisine",
);

export const IS_FRENCH_SIDE = (council: string) => council === "France voisine";
