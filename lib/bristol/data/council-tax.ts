/**
 * West of England council tax — Band D charges by authority, 2026/27.
 *
 * Figures are the TOTAL Band D charge for the financial year: the
 * authority's own element including its adult social care precept, plus
 * the Avon and Somerset Police and Crime Commissioner precept and the
 * Avon Fire Authority precept, both of which every household in all four
 * authorities pays at the same rate. They exclude parish and town
 * council precepts, which apply widely outside Bristol — Portishead,
 * Yate, Thornbury, Keynsham and Nailsea all levy one — and add a
 * meaningful amount where they exist.
 *
 * That last point matters more here than in most regions. Bristol has no
 * parishes at all, so its figure is complete; a Yate or Portishead bill
 * will run above the number below. Anyone comparing a Bristol address
 * with a South Gloucestershire one on these figures alone is comparing
 * a complete charge against an incomplete one, which is why the page
 * copy says so rather than leaving it to the footnote.
 *
 * Every figure was checked against two independent published comparison
 * tables of the 2026/27 charges, which agreed on all four authorities.
 * They remain secondary sources: confirm a specific address with the
 * council before budgeting against it.
 */

export const BRISTOL_COUNCIL_TAX_YEAR = "2026/27";

export const BRISTOL_COUNCIL_TAX_AS_OF = "2026-09-07";

/**
 * Combined Band D precepts every West of England household pays, on top
 * of its own council's element.
 */
export const AVON_PRECEPT_BAND_D = 355.68;

export const AVON_PRECEPT_BREAKDOWN = {
  /** Avon and Somerset Police and Crime Commissioner. */
  police: 285.24,
  /** Avon Fire Authority. */
  fire: 70.44,
} as const;

export const BRISTOL_COUNCIL_TAX_SOURCES = [
  "Published 2026/27 Band D comparison tables for the South West, cross-checked across two independent sources",
  "Avon and Somerset Police and Crime Commissioner and Avon Fire Authority precept resolutions for 2026/27",
] as const;

/**
 * Total Band D charge for 2026/27, excluding parish precepts.
 *
 * Bristol is the dearest of the four and by some distance the dearest
 * large city in the South West at Band D. Its housing stock also sits
 * higher up the bands than most English cities — a lot of Victorian
 * terraces in Clifton, Redland and Cotham are Band D or above — so
 * unlike the northern conurbations the headline figure here is close to
 * what a great many households actually pay.
 */
export const BRISTOL_BAND_D_BY_COUNCIL: Record<string, number> = {
  Bristol: 2713.68,
  "South Gloucestershire": 2550.59,
  "Bath and North East Somerset": 2383.42,
  "North Somerset": 2491.22,
};
