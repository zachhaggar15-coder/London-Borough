import type { BedroomBaseline } from "@/lib/city-content";

/**
 * Edinburgh and Lothian rent baselines.
 *
 * Two things about Scottish rent statistics differ from the English ones
 * used everywhere else on this site, and both change what the numbers
 * mean rather than merely where they come from.
 *
 * First, the geography. England publishes average rents by local
 * authority. Scotland publishes them by Broad Rental Market Area — the
 * geography used to set Local Housing Allowance — and the BRMAs do not
 * follow council boundaries. Edinburgh, East Lothian and Midlothian all
 * sit inside the single Lothian BRMA and therefore share one published
 * row; West Lothian has its own. Keying these baselines to councils
 * would have meant inventing three figures that do not exist.
 *
 * Second, the basis. The Scottish series measures rents on newly
 * advertised lets. The English series measures the whole stock,
 * including sitting tenancies that have not been re-let for years. New
 * lets run ahead of the stock average, particularly in a market moving
 * as fast as Edinburgh's, so a Scottish figure and an English one are
 * not directly comparable even where they look alike. Nothing on this
 * site compares them, and the methodology page says why.
 */

export const EDINBURGH_RENT_REVIEW_AS_OF = "2026-09-07";

/** The reference month the BRMA baselines below are drawn from. */
export const EDINBURGH_RENT_REFERENCE_MONTH = "July 2026";

export const EDINBURGH_RENT_SOURCES = [
  "ONS Price Index of Private Rents, Broad Rental Market Area averages by bedroom count, July 2026",
  "Rightmove, Zoopla, Citylets and SpareRoom visible listing samples across Edinburgh and the Lothians",
  "Manual neighbourhood review for the local premium or discount against the BRMA baseline",
] as const;

/**
 * The caveat printed wherever these figures appear.
 */
export const EDINBURGH_RENT_NOTE =
  "Scottish rent statistics are published by Broad Rental Market Area rather than by council, so Edinburgh, East Lothian and Midlothian share the single Lothian figure; and they measure newly advertised lets rather than the whole rented stock, so they sit above what a long-standing tenant is likely to be paying.";

/**
 * Average monthly private rent by BRMA and bedroom count, July 2026.
 *
 * The Lothian figure is a long way above anything else covered on this
 * site outside London. Edinburgh has the tightest rental market of any
 * major British city outside the capital — a small, tightly bounded city
 * with two large universities, a substantial short-let sector and very
 * little new supply — and the West Lothian row, thirty minutes down the
 * line, is roughly 60% of it.
 */
export const EDINBURGH_BRMA_RENT_GBP: Record<string, BedroomBaseline> = {
  Lothian: { oneBed: 1034, twoBed: 1324, threeBed: 1700, allProperties: 1415 },
  "West Lothian": {
    oneBed: 618,
    twoBed: 837,
    threeBed: 1099,
    allProperties: 912,
  },
};

/** Which BRMA each council area's rents are published under. */
export const EDINBURGH_BRMA_FOR_COUNCIL: Record<string, string> = {
  "City of Edinburgh": "Lothian",
  "East Lothian": "Lothian",
  Midlothian: "Lothian",
  "West Lothian": "West Lothian",
};

/**
 * Postcode district groups used for room-in-a-share pricing.
 *
 * The EH prefix covers the whole of the Lothians, from the New Town out
 * to Dunbar and Bathgate — fifty kilometres and roughly £250 a month
 * apart — so each area names the district group it is sampled against
 * rather than averaging across the prefix.
 */
export type EdinburghRoomDistrict =
  | "eh1-eh3"
  | "eh4"
  | "eh5"
  | "eh6"
  | "eh7"
  | "eh8-eh9"
  | "eh10"
  | "eh11"
  | "eh11-west"
  | "eh12"
  | "eh13-eh14"
  | "eh15"
  | "eh16-eh17"
  | "eh21"
  | "eh32"
  | "eh39"
  | "eh41"
  | "eh42"
  | "eh19"
  | "eh22"
  | "eh26"
  | "eh48"
  | "eh49"
  | "eh52"
  | "eh54";

export const EDINBURGH_ROOM_DISTRICT_LABELS: Record<
  EdinburghRoomDistrict,
  string
> = {
  "eh1-eh3": "EH1–EH3 Old Town and New Town",
  eh4: "EH4 Stockbridge, Comely Bank and Cramond",
  eh5: "EH5 Granton and Newhaven",
  eh6: "EH6 Leith",
  eh7: "EH7 Leith Walk and Abbeyhill",
  "eh8-eh9": "EH8–EH9 Newington, Sciennes and Marchmont",
  eh10: "EH10 Morningside and Bruntsfield",
  eh11: "EH11 Gorgie and Dalry",
  "eh11-west": "EH11 west — Sighthill and Broomhouse",
  eh12: "EH12 Corstorphine",
  "eh13-eh14": "EH13–EH14 Colinton and Oxgangs",
  eh15: "EH15 Portobello and Joppa",
  "eh16-eh17": "EH16–EH17 Liberton, Gilmerton and Craigmillar",
  eh21: "EH21 Musselburgh",
  eh32: "EH32 Prestonpans and Cockenzie",
  eh39: "EH39 North Berwick",
  eh41: "EH41 Haddington",
  eh42: "EH42 Dunbar",
  eh19: "EH19 Bonnyrigg and Lasswade",
  eh22: "EH22 Dalkeith",
  eh26: "EH26 Penicuik",
  eh48: "EH48 Bathgate",
  eh49: "EH49 Linlithgow",
  eh52: "EH52 Broxburn and Uphall",
  eh54: "EH54 Livingston",
};

/**
 * Typical monthly cost of a room in a shared house or flat, by district
 * group. Drawn from visible listing samples rather than an official
 * series — no equivalent of the bedroom breakdown exists for rooms.
 *
 * Edinburgh's room market is the tightest outside London, and it has a
 * seasonal shape nowhere else on this site shares: a substantial part of
 * the city's flat stock moves to short lets for August, and rooms
 * advertised in July and August price accordingly.
 */
export const EDINBURGH_ROOM_AVERAGE_GBP: Record<EdinburghRoomDistrict, number> = {
  "eh1-eh3": 720,
  eh4: 680,
  eh5: 570,
  eh6: 640,
  eh7: 630,
  "eh8-eh9": 680,
  eh10: 670,
  eh11: 600,
  "eh11-west": 530,
  eh12: 590,
  "eh13-eh14": 560,
  eh15: 590,
  "eh16-eh17": 565,
  eh21: 560,
  eh32: 510,
  eh39: 580,
  eh41: 540,
  eh42: 520,
  eh19: 530,
  eh22: 520,
  eh26: 520,
  eh48: 470,
  eh49: 540,
  eh52: 470,
  eh54: 480,
};
