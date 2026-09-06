/**
 * The ten metropolitan boroughs of Greater Manchester.
 *
 * Unlike London's 32 boroughs plus the City, this is a clean set of ten
 * with no anomalous authority sitting outside it. The city of Manchester
 * is one of the ten, not a container for the others — a distinction that
 * trips up almost every guide written from the outside, and the reason
 * this site treats "Manchester" the borough and "Greater Manchester" the
 * conurbation as different things throughout.
 */
export const GM_BOROUGHS = [
  "Bolton",
  "Bury",
  "Manchester",
  "Oldham",
  "Rochdale",
  "Salford",
  "Stockport",
  "Tameside",
  "Trafford",
  "Wigan",
] as const;

export type GmBorough = (typeof GM_BOROUGHS)[number];

/**
 * ONS local authority codes, kept alongside the names so the rent
 * baselines in data/rent-market.ts can be traced back to a specific
 * published series rather than an unattributed number.
 */
export const GM_BOROUGH_ONS_CODES: Record<GmBorough, string> = {
  Bolton: "E08000001",
  Bury: "E08000002",
  Manchester: "E08000003",
  Oldham: "E08000004",
  Rochdale: "E08000005",
  Salford: "E08000006",
  Stockport: "E08000007",
  Tameside: "E08000008",
  Trafford: "E08000009",
  Wigan: "E08000010",
};

export function boroughSlug(borough: string): string {
  return borough
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function boroughFromSlug(slug: string): GmBorough | null {
  return GM_BOROUGHS.find((b) => boroughSlug(b) === slug) ?? null;
}
