/**
 * Edinburgh and Lothian council tax — Band D charges, 2026/27.
 *
 * Three things about Scottish council tax differ from the English
 * treatment used elsewhere on this site, and all three change the number
 * rather than merely its provenance.
 *
 * 1. Water and sewerage. Scottish Water's charges are collected on the
 *    council tax bill, and at Band D they add roughly £652 a year. The
 *    figures below are the COUNCIL TAX ONLY, excluding them. That is the
 *    right basis for comparing a council's charge with another council's
 *    — but it means the number on this site is not the number on the
 *    bill, and every page that quotes it says so.
 *
 * 2. The band multipliers. Scotland uplifted bands E to H in 2017 and
 *    England did not, so the statutory English ninths do not apply here.
 *    A Scottish Band H is 22.5% above what the English ratio would give,
 *    and using the English ratios would understate every large property
 *    in the region. See SCOTLAND_BAND_RATIOS in lib/city-content.ts.
 *
 * 3. No regional precept. There is no combined authority and no regional
 *    mayor; police and fire are funded nationally from the Scottish
 *    budget rather than from a local charge. So unlike Greater
 *    Manchester or West Yorkshire, every pound of difference between
 *    these four councils is the council's own.
 *
 * Every figure was checked against two independent published comparison
 * tables of the 2026/27 charges, which agreed on all four councils.
 */

export const EDINBURGH_COUNCIL_TAX_YEAR = "2026/27";

export const EDINBURGH_COUNCIL_TAX_AS_OF = "2026-09-07";

/**
 * Scottish Water's combined water and waste-water charge at Band D,
 * collected on the council tax bill and excluded from the figures below.
 */
export const SCOTTISH_WATER_BAND_D = 652;

export const EDINBURGH_COUNCIL_TAX_SOURCES = [
  "Published 2026/27 Band D comparison tables for Scottish councils, cross-checked across two independent sources",
  "Scottish Water published household charges for 2026/27",
  "Council Tax (Substitution of Proportion) (Scotland) Order 2016 for the band E to H multipliers",
] as const;

/**
 * Total Band D council tax for 2026/27, EXCLUDING water and sewerage.
 *
 * These are strikingly low by the standards of the English regions
 * covered on this site — Edinburgh's £1,626 against Bristol's £2,714 for
 * the same nominal band. Part of that is a decade of council tax freeze
 * in Scotland and part is that police and fire are funded nationally
 * rather than through a local precept. Add Scottish Water's £652 and the
 * gap narrows but does not close.
 */
export const EDINBURGH_BAND_D_BY_COUNCIL: Record<string, number> = {
  "City of Edinburgh": 1626,
  "East Lothian": 1698,
  Midlothian: 1816,
  "West Lothian": 1628,
};
