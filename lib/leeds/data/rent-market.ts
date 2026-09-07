import type { BedroomBaseline } from "@/lib/city-content";

/**
 * West Yorkshire rent baselines.
 *
 * Method, in short: take the published ONS borough average by bedroom
 * count as the anchor, then apply a reviewed neighbourhood premium or
 * discount against it. A borough average is a real, sourced number, but
 * nobody rents a borough — Roundhay and Harehills are both Leeds, and a
 * single Leeds figure describes neither.
 *
 * The shape of this market is unusual and worth stating plainly: the
 * spread between the five authorities is wide, and Leeds sits a long way
 * clear of the other four. A one-bed in Leeds averages more than a
 * three-bed in Calderdale. That is not a quirk of the sample; it is what
 * happens when one city captures almost all of a region's professional
 * employment growth and the mill towns around it do not.
 */

export const LEEDS_RENT_REVIEW_AS_OF = "2026-09-07";

/** The ONS reference month the borough baselines below are drawn from. */
export const LEEDS_RENT_REFERENCE_MONTH = "July 2026";

export const LEEDS_RENT_SOURCES = [
  "ONS Price Index of Private Rents, local authority averages by bedroom count, July 2026",
  "Rightmove, Zoopla, OpenRent and SpareRoom visible listing samples across West Yorkshire",
  "Manual neighbourhood review for the local premium or discount against the borough baseline",
] as const;

/**
 * ONS average monthly private rent by borough and bedroom count,
 * July 2026.
 */
export const LEEDS_COUNCIL_RENT_GBP: Record<string, BedroomBaseline> = {
  Leeds: { oneBed: 779, twoBed: 970, threeBed: 1133, allProperties: 1140 },
  Bradford: { oneBed: 604, twoBed: 748, threeBed: 889, allProperties: 826 },
  Wakefield: { oneBed: 646, twoBed: 806, threeBed: 949, allProperties: 889 },
  Kirklees: { oneBed: 631, twoBed: 785, threeBed: 934, allProperties: 869 },
  Calderdale: { oneBed: 546, twoBed: 681, threeBed: 813, allProperties: 753 },
};

/**
 * Postcode district groups used for room-in-a-share pricing.
 *
 * West Yorkshire has five separate postcode areas — LS, BD, WF, HD and
 * HX — and the LS one alone runs from the city centre out to Wetherby,
 * twenty kilometres and roughly £200 a month apart. Each area names the
 * district group it is sampled against instead of averaging across a
 * prefix.
 */
export type LeedsRoomDistrict =
  | "ls1-ls2"
  | "ls6"
  | "ls4-ls5"
  | "ls7-ls8"
  | "ls9-ls11"
  | "ls12-ls13"
  | "ls16-ls17"
  | "ls18-ls20"
  | "ls15-ls25"
  | "ls27"
  | "ls21-ls22"
  | "ls29"
  | "bd1-bd8"
  | "bd17-bd18"
  | "bd16"
  | "bd20-bd21"
  | "wf1-wf2"
  | "wf4"
  | "wf10"
  | "wf12-wf13"
  | "hd1-hd3"
  | "hd6"
  | "hd9"
  | "hx1-hx3"
  | "hx6-hx7";

export const LEEDS_ROOM_DISTRICT_LABELS: Record<LeedsRoomDistrict, string> = {
  "ls1-ls2": "LS1–LS2 Leeds city centre",
  ls6: "LS6 Headingley, Hyde Park and Woodhouse",
  "ls4-ls5": "LS4–LS5 Burley and Kirkstall",
  "ls7-ls8": "LS7–LS8 Chapel Allerton and Roundhay",
  "ls9-ls11": "LS9–LS11 Harehills, Hunslet and Beeston",
  "ls12-ls13": "LS12–LS13 Armley and Bramley",
  "ls16-ls17": "LS16–LS17 Meanwood and north Leeds",
  "ls18-ls20": "LS18–LS20 Horsforth, Guiseley and Yeadon",
  "ls15-ls25": "LS15–LS25 Cross Gates and Garforth",
  ls27: "LS27 Morley",
  "ls21-ls22": "LS21–LS22 Otley and Wetherby",
  ls29: "LS29 Ilkley",
  "bd1-bd8": "BD1–BD8 Bradford",
  "bd17-bd18": "BD17–BD18 Shipley and Saltaire",
  bd16: "BD16 Bingley",
  "bd20-bd21": "BD20–BD21 Keighley",
  "wf1-wf2": "WF1–WF2 Wakefield",
  wf4: "WF4 Horbury and Sandal",
  wf10: "WF10 Castleford",
  "wf12-wf13": "WF12–WF13 Dewsbury",
  "hd1-hd3": "HD1–HD3 Huddersfield",
  hd6: "HD6 Brighouse",
  hd9: "HD9 Holmfirth and the Holme Valley",
  "hx1-hx3": "HX1–HX3 Halifax",
  "hx6-hx7": "HX6–HX7 Sowerby Bridge and Hebden Bridge",
};

/**
 * Typical monthly cost of a room in a shared house or flat, by district
 * group. Drawn from visible listing samples rather than an official
 * series — no equivalent of the ONS bedroom breakdown exists for rooms.
 *
 * These are among the lowest room rents of any large English city
 * region. LS6 is the exception that proves the rule: Headingley and Hyde
 * Park hold one of the densest student populations in the country, and
 * the shared market there prices on demand rather than on the quality of
 * what is being let.
 */
export const LEEDS_ROOM_AVERAGE_GBP: Record<LeedsRoomDistrict, number> = {
  "ls1-ls2": 620,
  ls6: 520,
  "ls4-ls5": 495,
  "ls7-ls8": 530,
  "ls9-ls11": 450,
  "ls12-ls13": 440,
  "ls16-ls17": 550,
  "ls18-ls20": 525,
  "ls15-ls25": 480,
  ls27: 470,
  "ls21-ls22": 530,
  ls29: 540,
  "bd1-bd8": 400,
  "bd17-bd18": 470,
  bd16: 460,
  "bd20-bd21": 420,
  "wf1-wf2": 440,
  wf4: 450,
  wf10: 400,
  "wf12-wf13": 400,
  "hd1-hd3": 430,
  hd6: 440,
  hd9: 470,
  "hx1-hx3": 400,
  "hx6-hx7": 450,
};
