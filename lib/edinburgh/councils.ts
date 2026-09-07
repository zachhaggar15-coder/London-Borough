/**
 * Edinburgh and the three Lothians.
 *
 * These are council areas, not boroughs and not districts — Scottish
 * local government was reorganised into 32 single-tier councils in 1996,
 * and the old Lothian Region was split into the four below. There is no
 * upper tier above them, so each sets its own council tax and runs its
 * own services outright.
 *
 * Two things follow from that and matter throughout this section. There
 * is no regional mayor and no combined authority, so there is no
 * region-wide precept of the kind Greater Manchester and West Yorkshire
 * levy — police and fire are funded nationally from the Scottish
 * budget rather than from a local charge. And water and sewerage are
 * collected on the council tax bill by Scottish Water, which makes a
 * Scottish "council tax bill" and a Scottish council tax charge two
 * different numbers.
 */
export const LOTHIAN_COUNCILS = [
  "City of Edinburgh",
  "East Lothian",
  "Midlothian",
  "West Lothian",
] as const;

export type LothianCouncil = (typeof LOTHIAN_COUNCILS)[number];

/** National Records of Scotland council area codes. */
export const LOTHIAN_ONS_CODES: Record<string, string> = {
  "City of Edinburgh": "S12000036",
  "East Lothian": "S12000010",
  Midlothian: "S12000019",
  "West Lothian": "S12000040",
};
