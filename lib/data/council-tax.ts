/**
 * London council tax — Band D charges by borough, 2026/27.
 *
 * Figures are the TOTAL Band D charge for the financial year, i.e. the
 * borough's own element plus the Greater London Authority precept. They
 * exclude any parish or special-expenses element, which applies to only a
 * handful of London areas and is small where it exists.
 *
 * Every figure below was cross-checked against two independent published
 * comparison tables of the 2026/27 London Band D charges, which agreed on
 * all 33 authorities. They are still secondary sources: a reader who needs
 * a figure to budget against should confirm it with their own council,
 * which is what the page copy tells them to do.
 *
 * Band multipliers are statutory (Local Government Finance Act 1992,
 * s.5) and fixed nationally, so every other band is derived exactly from
 * Band D rather than stored. Band D is the reference band at 9/9.
 */

export const COUNCIL_TAX_YEAR = "2026/27";

/** Last review of the figures in this file. */
export const COUNCIL_TAX_AS_OF = "2026-09-04";

/**
 * Greater London Authority precept at Band D for 2026/27. Included in every
 * borough total below. Funds the Mayor's office, TfL, the Metropolitan
 * Police and the London Fire Brigade.
 */
export const GLA_PRECEPT_BAND_D = 510.51;

export const COUNCIL_TAX_SOURCES = [
  "Published London-wide 2026/27 Band D comparison tables, cross-checked across two independent sources",
  "Greater London Authority precept for 2026/27",
] as const;

/**
 * Statutory council tax band ratios, expressed against Band D = 9/9.
 * These are set nationally and do not vary by borough.
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
 * 1991 property values each band covers in England. Council tax bands are
 * still based on what a property was worth on 1 April 1991, which is the
 * single most common point of confusion about the tax.
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
 * Total Band D charge for 2026/27, borough element + GLA precept.
 * Keys match LONDON_BOROUGHS in lib/commute-details.ts exactly.
 */
export const BAND_D_BY_BOROUGH: Record<string, number> = {
  "Barking and Dagenham": 2198.51,
  Barnet: 2132.6,
  Bexley: 2366.36,
  Brent: 2235.27,
  Bromley: 2140.04,
  Camden: 2207.55,
  Croydon: 2599.91,
  Ealing: 2138.53,
  Enfield: 2267.67,
  Greenwich: 2107.86,
  Hackney: 2060.3,
  "Hammersmith & Fulham": 1519.51,
  Haringey: 2313.78,
  Harrow: 2511.07,
  Havering: 2424.66,
  Hillingdon: 2045.46,
  Hounslow: 2185.56,
  Islington: 2108.15,
  "Kensington & Chelsea": 1666.65,
  "Kingston upon Thames": 2609.2,
  Lambeth: 2047.11,
  Lewisham: 2237.33,
  Merton: 2146.76,
  Newham: 1944.23,
  Redbridge: 2294.58,
  "Richmond upon Thames": 2486.1,
  Southwark: 1967.26,
  Sutton: 2378.64,
  "Tower Hamlets": 1837.78,
  "Waltham Forest": 2386.96,
  Wandsworth: 1028.21,
  Westminster: 1049.55,
};

/**
 * The City of London is a separate authority, not one of the 32 boroughs,
 * so it has no neighbourhood page. Kept here because it belongs in any
 * honest London-wide comparison.
 */
export const CITY_OF_LONDON_BAND_D = 1329.56;
