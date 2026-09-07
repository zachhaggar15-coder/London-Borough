/**
 * West Yorkshire council tax — Band D charges by borough, 2026/27.
 *
 * Figures are the TOTAL Band D charge for the financial year: the
 * borough's own element including its adult social care precept, plus
 * the West Yorkshire Mayor's policing precept and the West Yorkshire
 * Fire and Rescue Authority precept, both of which every household in
 * the five boroughs pays at the same rate. They exclude parish and town
 * council precepts, which apply in a scattering of places — Otley,
 * Wetherby, Horbury, Holmfirth and Todmorden among them — and add a
 * modest amount where they exist.
 *
 * Every figure was checked against two independent published comparison
 * tables of the 2026/27 charges, which agreed on all five authorities.
 * They remain secondary sources: confirm a specific address with the
 * council before budgeting against it.
 */

export const LEEDS_COUNCIL_TAX_YEAR = "2026/27";

export const LEEDS_COUNCIL_TAX_AS_OF = "2026-09-07";

/**
 * Combined Band D precepts every West Yorkshire household pays on top of
 * its own borough's element.
 *
 * The policing precept moved to the Mayor of West Yorkshire in 2021,
 * replacing the Police and Crime Commissioner — the same arrangement
 * Greater Manchester uses, and different from most of England, where the
 * PCC still levies it separately.
 */
export const WEST_YORKSHIRE_PRECEPT_BAND_D = 367.49;

export const WEST_YORKSHIRE_PRECEPT_BREAKDOWN = {
  /** West Yorkshire Mayor's policing precept. */
  police: 278.0,
  /** West Yorkshire Fire and Rescue Authority. */
  fire: 89.49,
} as const;

export const LEEDS_COUNCIL_TAX_SOURCES = [
  "Published 2026/27 Band D comparison tables for Yorkshire and the Humber, cross-checked across two independent sources",
  "West Yorkshire Mayoral policing precept and West Yorkshire Fire and Rescue Authority precept resolutions for 2026/27",
] as const;

/**
 * Total Band D charge for 2026/27, excluding parish precepts.
 *
 * The spread here is narrow — under £160 between cheapest and dearest —
 * and the ordering does not follow rent at all. Leeds has the region's
 * highest rents and its lowest council tax; Kirklees has neither.
 * Anyone weighing two boroughs on rent alone is missing a difference of
 * a few hundred pounds a year running the other way.
 */
export const LEEDS_BAND_D_BY_COUNCIL: Record<string, number> = {
  Leeds: 2283.73,
  Bradford: 2360.73,
  Wakefield: 2296.89,
  Kirklees: 2441.07,
  Calderdale: 2420.15,
};
