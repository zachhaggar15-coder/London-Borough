import type { BedroomBaseline } from "@/lib/city-content";

/**
 * West of England rent baselines.
 *
 * Method, in short: take the published ONS authority average by bedroom
 * count as the anchor, then apply a reviewed neighbourhood premium or
 * discount against it. A council average is a real, sourced number, but
 * nobody rents a council — Clifton and Hartcliffe are both Bristol, and
 * a single Bristol figure describes neither.
 *
 * The one thing worth knowing before reading these: Bath is not a
 * cheaper satellite of Bristol. Bath and North East Somerset's three-bed
 * average is the highest of the four, because the authority contains
 * Bath itself plus a rural hinterland with very little small-flat stock.
 * Its one-bed figure sits just under Bristol's, which surprises people.
 */

export const BRISTOL_RENT_REVIEW_AS_OF = "2026-09-07";

/** The ONS reference month the authority baselines below are drawn from. */
export const BRISTOL_RENT_REFERENCE_MONTH = "July 2026";

export const BRISTOL_RENT_SOURCES = [
  "ONS Price Index of Private Rents, local authority averages by bedroom count, July 2026",
  "Rightmove, Zoopla, OpenRent and SpareRoom visible listing samples across the West of England",
  "Manual neighbourhood review for the local premium or discount against the authority baseline",
] as const;

/**
 * ONS average monthly private rent by authority and bedroom count,
 * July 2026.
 */
export const BRISTOL_COUNCIL_RENT_GBP: Record<string, BedroomBaseline> = {
  Bristol: { oneBed: 1223, twoBed: 1541, threeBed: 1755, allProperties: 1880 },
  "South Gloucestershire": {
    oneBed: 994,
    twoBed: 1267,
    threeBed: 1547,
    allProperties: 1456,
  },
  "Bath and North East Somerset": {
    oneBed: 1205,
    twoBed: 1520,
    threeBed: 1806,
    allProperties: 1881,
  },
  "North Somerset": {
    oneBed: 818,
    twoBed: 1075,
    threeBed: 1341,
    allProperties: 1205,
  },
};

/**
 * Postcode district groups used for room-in-a-share pricing.
 *
 * The BS prefix covers everything from the Clifton triangle to
 * Weston-super-Mare, thirty kilometres and roughly £280 a month apart,
 * so averaging across it would describe nowhere. Each area names the
 * group it is sampled against instead.
 */
export type BristolRoomDistrict =
  | "bs1-bs2"
  | "bs8"
  | "bs6-bs7"
  | "bs5"
  | "bs3"
  | "bs4"
  | "bs16"
  | "bs9-bs10"
  | "bs11"
  | "bs13-bs14"
  | "bs34-bs32"
  | "bs15"
  | "bs37"
  | "bs35"
  | "ba1-ba2"
  | "bs31"
  | "ba3"
  | "bs20"
  | "bs48"
  | "bs21"
  | "bs22-bs23";

export const BRISTOL_ROOM_DISTRICT_LABELS: Record<BristolRoomDistrict, string> = {
  "bs1-bs2": "BS1–BS2 centre and Old Market",
  bs8: "BS8 Clifton and the Triangle",
  "bs6-bs7": "BS6–BS7 Redland, Montpelier and Bishopston",
  bs5: "BS5 Easton and St George",
  bs3: "BS3 Bedminster and Southville",
  bs4: "BS4 Knowle, Totterdown and Brislington",
  bs16: "BS16 Fishponds and Frenchay",
  "bs9-bs10": "BS9–BS10 Henleaze and Westbury-on-Trym",
  bs11: "BS11 Shirehampton and Avonmouth",
  "bs13-bs14": "BS13–BS14 Hartcliffe and Hengrove",
  "bs34-bs32": "BS32–BS34 Filton and Bradley Stoke",
  bs15: "BS15 Kingswood",
  bs37: "BS37 Yate and Chipping Sodbury",
  bs35: "BS35 Thornbury",
  "ba1-ba2": "BA1–BA2 Bath",
  bs31: "BS31 Keynsham and Saltford",
  ba3: "BA3 Midsomer Norton and Radstock",
  bs20: "BS20 Portishead and Pill",
  bs48: "BS48 Nailsea and Backwell",
  bs21: "BS21 Clevedon",
  "bs22-bs23": "BS22–BS23 Weston-super-Mare",
};

/**
 * Typical monthly cost of a room in a shared house or flat, by district
 * group. Drawn from visible listing samples rather than an official
 * series — no equivalent of the ONS bedroom breakdown exists for rooms.
 *
 * Bristol's rooms are expensive for a city of its size. Two large
 * universities and a chronically tight supply of family houses mean the
 * shared market absorbs a lot of people who would rent alone elsewhere.
 */
export const BRISTOL_ROOM_AVERAGE_GBP: Record<BristolRoomDistrict, number> = {
  "bs1-bs2": 760,
  bs8: 790,
  "bs6-bs7": 715,
  bs5: 625,
  bs3: 680,
  bs4: 605,
  bs16: 615,
  "bs9-bs10": 645,
  bs11: 565,
  "bs13-bs14": 545,
  "bs34-bs32": 635,
  bs15: 590,
  bs37: 570,
  bs35: 575,
  "ba1-ba2": 700,
  bs31: 605,
  ba3: 520,
  bs20: 625,
  bs48: 590,
  bs21: 580,
  "bs22-bs23": 500,
};
