/**
 * Greater Manchester council tax — Band D charges by borough, 2026/27.
 *
 * Figures are the TOTAL Band D charge for the financial year: the
 * borough's own element (including its adult social care precept) plus
 * the Greater Manchester Mayoral precept, which every household in the
 * ten boroughs pays. They exclude parish and town council precepts,
 * which apply in a small number of places — Saddleworth in Oldham is the
 * best-known — and add a modest amount where they exist.
 *
 * Every figure below was checked against two independent published
 * comparison tables of the 2026/27 charges, which agreed on all ten
 * authorities. They remain secondary sources: anyone budgeting against a
 * specific address should confirm the figure with their own council,
 * which is what the page copy tells them to do.
 *
 * Band multipliers are statutory (Local Government Finance Act 1992,
 * s.5) and fixed nationally, so every other band is derived exactly from
 * Band D rather than stored.
 */

export const MANCHESTER_COUNCIL_TAX_YEAR = "2026/27";

/** Last review of the figures in this file. */
export const MANCHESTER_COUNCIL_TAX_AS_OF = "2026-09-06";

/**
 * The Greater Manchester Mayoral precept at Band D for 2026/27, included
 * in every borough total below.
 *
 * This is the structural difference from London. London has one Greater
 * London Authority precept covering the Mayor, TfL, the Met and the fire
 * service. Greater Manchester splits the same idea in two: a Mayoral
 * Police and Crime Commissioner precept, and a Mayoral General precept
 * that funds the fire and rescue service plus the Mayor's other
 * functions, transport among them.
 */
export const GM_MAYORAL_PRECEPT_BAND_D = 439.25;

export const GM_MAYORAL_PRECEPT_BREAKDOWN = {
  /** Mayoral Police and Crime Commissioner precept. */
  police: 285.3,
  /** Mayoral General precept — fire and rescue plus general functions. */
  general: 153.95,
} as const;

/** Portion of the Mayoral General precept that funds fire and rescue. */
export const GM_FIRE_ELEMENT_BAND_D = 92.2;

export const MANCHESTER_COUNCIL_TAX_SOURCES = [
  "Published 2026/27 Band D comparison tables for the North West, cross-checked across two independent sources",
  "Greater Manchester Combined Authority Mayoral precept proposals for 2026/27",
] as const;

/**
 * Statutory council tax band ratios, expressed against Band D = 9/9.
 * Set nationally; identical to the ratios used on the London pages.
 */
export const BAND_RATIOS = {
  A: 6 / 9,
  B: 7 / 9,
  C: 8 / 9,
  D: 9 / 9,
  E: 11 / 9,
  F: 13 / 9,
  G: 15 / 9,
  H: 18 / 9,
} as const;

export type CouncilTaxBand = keyof typeof BAND_RATIOS;

export const COUNCIL_TAX_BANDS = Object.keys(BAND_RATIOS) as CouncilTaxBand[];

/**
 * 1991 property values each band covers in England. Bands are still based
 * on what a property was worth on 1 April 1991 — the single most common
 * point of confusion about the tax, and worth restating on every page
 * that quotes a charge.
 */
export const BAND_VALUE_RANGES: Record<CouncilTaxBand, string> = {
  A: "Up to £40,000",
  B: "£40,001 – £52,000",
  C: "£52,001 – £68,000",
  D: "£68,001 – £88,000",
  E: "£88,001 – £120,000",
  F: "£120,001 – £160,000",
  G: "£160,001 – £320,000",
  H: "Over £320,000",
};

/**
 * Total Band D charge for 2026/27: borough element plus Mayoral precept.
 * Keys match GM_BOROUGHS in lib/manchester/boroughs.ts exactly.
 *
 * Worth knowing before reading these: Greater Manchester's spread is
 * narrow and its floor is high. Every one of the ten sits above £2,150,
 * where a third of London boroughs come in below that. Wigan is the
 * cheapest place in the conurbation and still costs more at Band D than
 * Westminster, Wandsworth, Hammersmith & Fulham or Kensington & Chelsea.
 * Band D also means far more here: most of Greater Manchester's housing
 * stock sits in bands A to C, so the typical bill is well below the Band
 * D headline, which is not true across much of inner London.
 */
export const BAND_D_BY_BOROUGH: Record<string, number> = {
  Bolton: 2399.74,
  Bury: 2555.15,
  Manchester: 2312.04,
  Oldham: 2602.23,
  Rochdale: 2600.83,
  Salford: 2594.45,
  Stockport: 2618.9,
  Tameside: 2447.21,
  Trafford: 2291.7,
  Wigan: 2152.68,
};

/** Charge for a given band, derived from the borough's Band D figure. */
export function bandChargeFor(
  borough: string,
  band: CouncilTaxBand,
): number | null {
  const bandD = BAND_D_BY_BOROUGH[borough];
  if (bandD == null) return null;
  return Math.round(bandD * BAND_RATIOS[band] * 100) / 100;
}

/** Boroughs ordered cheapest Band D first. */
export function boroughsByBandD(): { borough: string; bandD: number }[] {
  return Object.entries(BAND_D_BY_BOROUGH)
    .map(([borough, bandD]) => ({ borough, bandD }))
    .sort((a, b) => a.bandD - b.bandD);
}
