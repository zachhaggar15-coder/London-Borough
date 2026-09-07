/**
 * The four unitary authorities of the West of England.
 *
 * Not boroughs, and not a county: Avon was abolished in 1996 and the
 * four successors are each a unitary authority in its own right. Three of
 * them — Bristol, South Gloucestershire and Bath and North East Somerset
 * — sit inside the West of England Combined Authority; North Somerset
 * does not, which is why regional transport schemes keep stopping at the
 * Portishead boundary. Anyone comparing rents across the four is
 * comparing four separate councils with four separate tax bases.
 *
 * The names below are the ONS ones. "Bristol, City of" is how the
 * boundary layer spells it, and using anything else means the map's
 * outline never matches the council pages.
 */
export const WEST_OF_ENGLAND_COUNCILS = [
  "Bristol",
  "South Gloucestershire",
  "Bath and North East Somerset",
  "North Somerset",
] as const;

export type WestOfEnglandCouncil = (typeof WEST_OF_ENGLAND_COUNCILS)[number];

/** ONS local authority codes, kept beside the names so the rent
 *  baselines and the boundary layer cannot drift apart. */
export const WEST_OF_ENGLAND_ONS_CODES: Record<string, string> = {
  Bristol: "E06000023",
  "South Gloucestershire": "E06000025",
  "Bath and North East Somerset": "E06000022",
  "North Somerset": "E06000024",
};

/** How the ONS boundary layer spells each one, where it differs. */
export const WEST_OF_ENGLAND_BOUNDARY_NAMES: Record<string, string> = {
  Bristol: "Bristol, City of",
};
