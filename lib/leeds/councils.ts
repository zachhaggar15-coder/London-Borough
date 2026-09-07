/**
 * The five metropolitan boroughs of West Yorkshire.
 *
 * Unlike Greater Manchester's ten, three of these are cities in their own
 * right — Leeds, Bradford and Wakefield — and Bradford is the seventh
 * largest local authority in England on its own. Treating them as
 * suburbs of Leeds would be both wrong and insulting; they are separate
 * places with separate centres, separate labour markets and, in
 * Bradford's case, a rental market roughly two-thirds of Leeds's.
 *
 * Kirklees and Calderdale are the two that people outside the region
 * cannot place. Kirklees is Huddersfield, Dewsbury, Batley and the
 * Holme Valley; Calderdale is Halifax, Brighouse, Todmorden and Hebden
 * Bridge. Neither is named after its own largest town, which is why the
 * council pages give the towns rather than only the authority.
 */
export const WEST_YORKSHIRE_COUNCILS = [
  "Leeds",
  "Bradford",
  "Wakefield",
  "Kirklees",
  "Calderdale",
] as const;

export type WestYorkshireCouncil = (typeof WEST_YORKSHIRE_COUNCILS)[number];

/** ONS local authority codes, kept beside the names so the rent
 *  baselines and the boundary layer cannot drift apart. */
export const WEST_YORKSHIRE_ONS_CODES: Record<string, string> = {
  Leeds: "E08000035",
  Bradford: "E08000032",
  Wakefield: "E08000036",
  Kirklees: "E08000034",
  Calderdale: "E08000033",
};
