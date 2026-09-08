import { CITIES } from "@/lib/cities";
import { GBP } from "@/lib/currency";
import {
  ENGLAND_BAND_RATIOS,
  ENGLAND_BAND_VALUES,
  type CityInput,
} from "@/lib/city-content";
import { rukTakeHomeMonthly, TAX_REGIME_LABELS } from "@/lib/tax";
import { WEST_OF_ENGLAND_COUNCILS } from "@/lib/bristol/councils";
import { BRISTOL_NEIGHBOURHOODS } from "@/lib/bristol/data/neighbourhoods";
import { BRISTOL_DESTINATIONS } from "@/lib/bristol/data/destinations";
import { createDriveModel } from "@/lib/drive-time";
import {
  BRISTOL_COUNCIL_RENT_GBP,
  BRISTOL_RENT_REFERENCE_MONTH,
  BRISTOL_RENT_REVIEW_AS_OF,
  BRISTOL_RENT_SOURCES,
  BRISTOL_ROOM_AVERAGE_GBP,
  BRISTOL_ROOM_DISTRICT_LABELS,
} from "@/lib/bristol/data/rent-market";
import {
  AVON_PRECEPT_BAND_D,
  AVON_PRECEPT_BREAKDOWN,
  BRISTOL_BAND_D_BY_COUNCIL,
  BRISTOL_COUNCIL_TAX_AS_OF,
  BRISTOL_COUNCIL_TAX_SOURCES,
  BRISTOL_COUNCIL_TAX_YEAR,
} from "@/lib/bristol/data/council-tax";
import {
  BRISTOL_TRAVEL_BAND_DESCRIPTIONS,
  BRISTOL_TRAVEL_BAND_DISTANCE_KM,
  BRISTOL_TRAVEL_BAND_RATIONALE,
} from "@/lib/bristol/travel-band";
import {
  BRISTOL_COMMUTE_TIMES,
  WEST_OF_ENGLAND_TRANSIT_KMH,
} from "@/lib/bristol/commute";
import { BRISTOL_GUIDES } from "@/lib/bristol/data/guides";
import { BRISTOL_LIFESTYLE_PAGES } from "@/lib/bristol/lifestyle";

const AREAS = BRISTOL_NEIGHBOURHOODS;

/** England publishes rents by local authority, so each maps to its own row. */
const BASELINE_FOR_COUNCIL = Object.fromEntries(
  WEST_OF_ENGLAND_COUNCILS.map((c) => [c, c]),
);

const ROOM_DISTRICT_FOR_AREA = Object.fromEntries(
  AREAS.map((a) => [a.id, a.roomDistrict]),
);

/**
 * Driving in the West of England. The lowest average speed of the four
 * UK regions: Bristol has a medieval street plan on steep hills, the
 * Avon Gorge splits the north-west, and the M32 funnels everything into
 * one point. The exception is the M4/M5 corridor to the aerospace belt,
 * which is the one journey the car wins outright.
 */
const DRIVE_MODEL = createDriveModel(AREAS, BRISTOL_DESTINATIONS, {
  circuity: 1.38,
  peakKmh: 28,
  arrivalPenaltyMinutes: {
    default: 8,
    "temple-meads": 18,
    "city-centre": 22,
    "clifton-triangle": 20,
    southmead: 8,
    "bath-centre": 20,
    // Business parks and industrial estates park their own staff.
    "aztec-west": 5,
    "uwe-frenchay": 6,
    avonmouth: 5,
  },
  corridors: [
    // M5 and the Avon ring road: the aerospace belt is a motorway run
    // from most of the city and a bus odyssey by any other means.
    { destinationIds: ["aztec-west", "avonmouth", "uwe-frenchay"], kmh: 45 },
    // The A4 to Bath is congested for its whole length.
    { destinationIds: ["bath-centre"], kmh: 32 },
  ],
});

export const BRISTOL_INPUT: CityInput = {
  city: CITIES.bristol,
  currency: GBP,

  copy: {
    regionLabel: "the West of England",
    homeH1: "Where to live in Bristol and the West of England",
    homeIntro:
      "Bristol is a small city with a large gravitational field. Four unitary authorities, a Georgian spa city ten miles east, an aerospace belt to the north and thirty miles of estuary coast to the west, all of it feeding one labour market — and almost none of it connected by anything you could call a metro.",
    homeMetaDescription:
      "Find the right West of England neighbourhood by commute, rent and how you want to live — reviewed rents and journey times across Bristol, Bath, South Gloucestershire and North Somerset.",
    homeFaqs: [
      {
        question: "What is the best area to live in Bristol?",
        answer:
          "It depends what you are optimising for. For going out and walking home, Stokes Croft, Southville or the harbour. For a village feel with good food, Montpelier, Bishopston or Southville. For families and green space, Henleaze, Westbury-on-Trym or Bishopston. For the lowest rent with a usable commute, Easton, Bedminster or St George — all three sit minutes from Temple Meads on the train.",
      },
      {
        question: "Is Bristol or Bath better to live in?",
        answer:
          "They answer different questions. Bath is smaller, quieter, more expensive per square foot and entirely walkable; Bristol has the jobs, the nightlife and the range. The train between them takes thirteen minutes, which is why Keynsham — halfway along the line — is the standard answer for a household split between the two.",
      },
    ],

    commuteIntro:
      "The network here is radial and thin. There is no metro and no tram, one suburban rail line running north-west to Avonmouth, a handful of main-line stations and three MetroBus corridors — and nothing at all that runs around the city. The practical consequence is that where you work constrains where you can live more sharply than in most cities this size, so start from the destination.",
    commuteMethod: [
      "The figures are typical weekday-morning door-to-door times — walking to the stop, waiting, riding, and walking off at the other end. They are not timetable times. Bath Spa to Temple Meads is thirteen minutes on the train and twenty here, because nobody lives on the platform.",
      "Where a figure is missing the site falls back to straight-line distance at an assumed regional average speed and labels the result a distance estimate rather than a reviewed one. That speed is the lowest used anywhere on this site, deliberately: Bristol's peak bus congestion is among the worst of any large English city, and a more optimistic assumption would flatter exactly the journeys people most need warning about.",
    ],

    rentMethod: [
      "Nobody rents an authority, though. Clifton and Hartcliffe are both Bristol and a single Bristol figure describes neither, so each area carries a reviewed premium or discount against its authority baseline, set from visible listing samples on the major portals. That second step is an estimate, and it is the weakest link in the chain. Figures are rounded to the nearest £25 for exactly that reason.",
      "One thing worth knowing before reading the authority figures: Bath and North East Somerset is not a cheaper satellite of Bristol. Its three-bed average is the highest of the four, because the authority contains Bath itself plus a rural hinterland with very little small-flat stock.",
    ],
    roomMethod: [
      "No official series publishes room-level rents, so these come from visible listing samples keyed to explicit postcode district groups. The BS prefix alone covers everything from the Clifton triangle to Weston-super-Mare — thirty kilometres and roughly £280 a month apart — so a single BS-wide figure would describe nowhere.",
    ],

    councilTaxMethod: [
      `Band D charges for ${BRISTOL_COUNCIL_TAX_YEAR} are the total for the year: the authority's own element including its adult social care precept, plus the Avon and Somerset Police and Crime Commissioner precept and the Avon Fire Authority precept, together £${AVON_PRECEPT_BAND_D.toLocaleString()} at Band D. Both are charged identically across all four authorities, so any difference between them comes entirely from the council's own element.`,
      "The charges exclude parish and town council precepts, and in this region that exclusion matters more than usual. Bristol has no parishes at all, so its figure is complete. Portishead, Yate, Thornbury, Keynsham, Nailsea and Clevedon all levy one, typically £50 to £200 a year at Band D — so comparing a Bristol address with one outside the city on these headline figures alone compares a complete charge against an incomplete one.",
    ],

    councilsIntro:
      "Avon was abolished in 1996 and four unitary authorities took its place, each with its own tax base and its own housing market. Three of them sit inside the West of England Combined Authority; North Somerset does not, which is why regional transport schemes keep stopping at the Portishead boundary. What follows is what each costs to rent in and what each charges in council tax.",

    lifestyleIntro:
      "Eight cuts through the same ten lifestyle measures, each weighted for a different priority. They are chosen for what this region actually offers: with the Avon Gorge through the middle, Mendip to the south and the Severn estuary to the west, access to open country is a real question here — and with no metro and a great many hills, so is whether you can live somewhere without a car.",

    compareIntro:
      "Not every possible pair — only the ones that are a genuine either/or: near enough to each other that the same job is commutable from both, close enough in rent that price alone does not decide it, and in the same or an adjoining travel band. Pairing Clifton with Weston-super-Mare would produce a page, but not a decision anybody is making.",

    couplesIntro: [
      "This region makes the question unusually hard. There is no orbital route of any kind, so two people working on opposite sides of Bristol have very few places that suit them both — and if one of you works in Bath and the other in Bristol, the answer is almost always a town on the line between them rather than either city.",
      "Pick two workplaces, a commute cap each, a shared budget and a shared idea of the kind of area you want. The ranking favours fair compromises: an area where one of you has a fifteen-minute journey and the other an hour scores worse than one where you both have half an hour.",
    ],

    roomIncludesNote:
      "Rooms often include bills and council tax, which is worth £120 to £200 a month you are not separately paying.",
    rentExtrasNote:
      "bills and council tax for flats, which add roughly £220 to £320 a month",

    extraLimits: [
      {
        title: "Gradient.",
        body: "Nothing here scores hills, and in Bristol they decide things. Two areas the same distance from the centre can be a fifteen-minute walk and a forty-minute climb apart, and no figure on this site captures that.",
      },
      {
        title: "Parish precepts.",
        body: "Council tax figures exclude them, and outside Bristol almost every address has one. Check the specific parish before budgeting against a headline charge.",
      },
    ],
  },

  areas: AREAS,

  councils: WEST_OF_ENGLAND_COUNCILS,
  councilNoun: { singular: "council", plural: "councils" },
  regionName: "the West of England",

  destinations: BRISTOL_DESTINATIONS,

  travelBands: {
    descriptions: BRISTOL_TRAVEL_BAND_DESCRIPTIONS,
    distances: BRISTOL_TRAVEL_BAND_DISTANCE_KM,
    rationale: BRISTOL_TRAVEL_BAND_RATIONALE,
  },

  commuteTimes: BRISTOL_COMMUTE_TIMES,
  driveTimes: DRIVE_MODEL,
  transitKmh: WEST_OF_ENGLAND_TRANSIT_KMH,

  rent: {
    reviewedAsOf: BRISTOL_RENT_REVIEW_AS_OF,
    baselineLabel: "the ONS average",
    referenceMonth: BRISTOL_RENT_REFERENCE_MONTH,
    baselines: BRISTOL_COUNCIL_RENT_GBP,
    baselineForCouncil: BASELINE_FOR_COUNCIL,
    roomAverages: BRISTOL_ROOM_AVERAGE_GBP,
    roomLabels: BRISTOL_ROOM_DISTRICT_LABELS,
    roomDistrictForArea: ROOM_DISTRICT_FOR_AREA,
    sources: BRISTOL_RENT_SOURCES,
  },

  councilTax: {
    year: BRISTOL_COUNCIL_TAX_YEAR,
    asOf: BRISTOL_COUNCIL_TAX_AS_OF,
    bandD: BRISTOL_BAND_D_BY_COUNCIL,
    ratios: ENGLAND_BAND_RATIOS,
    bandValues: ENGLAND_BAND_VALUES,
    sources: BRISTOL_COUNCIL_TAX_SOURCES,
    precept: {
      label: "Avon and Somerset police and Avon fire precepts",
      bandD: AVON_PRECEPT_BAND_D,
      breakdown: { ...AVON_PRECEPT_BREAKDOWN },
    },
    notes: [
      "Bands are still based on what a property was worth on 1 April 1991, not on what it is worth now. Unlike much of England, that makes Band D broadly representative here rather than an overstatement: Bristol's Victorian and Georgian stock was already expensive in 1991, so a great deal of it sits at Band D or above.",
      "The figures exclude parish and town council precepts. Bristol has none; almost everywhere else in the region does, typically adding £50 to £200 a year at Band D.",
    ],
  },

  guides: BRISTOL_GUIDES,
  lifestylePages: BRISTOL_LIFESTYLE_PAGES,

  /**
   * Starts higher than Manchester's ladder and stops higher, because the
   * answers change at different points here. £22,000 buys no realistic
   * one-bed anywhere in this region, and the interesting threshold — the
   * salary at which the inner ring opens up — does not arrive until the
   * high fifties.
   */
  salaryLevels: [25000, 28000, 32000, 36000, 42000, 50000, 60000, 70000],

  takeHomeMonthly: rukTakeHomeMonthly,
  taxRegimeLabel: TAX_REGIME_LABELS.ruk,

  comparePairs: [
    {
      title: "The classic Bristol decisions",
      description:
        "Close calls in the inner ring, where the hill between two areas often matters more than the rent.",
      pairs: [
        ["clifton", "redland"],
        ["cotham", "montpelier"],
        ["southville", "bedminster"],
        ["bishopston", "redland"],
      ],
    },
    {
      title: "Value with a usable commute",
      description:
        "For anyone trying to stretch the rent while staying inside a sensible morning.",
      pairs: [
        ["easton", "st-george"],
        ["totterdown", "knowle"],
        ["fishponds", "kingswood"],
      ],
    },
    {
      title: "Quieter, greener and further out",
      description:
        "The separate towns and the north Bristol suburbs, weighed against each other.",
      pairs: [
        ["henleaze", "westbury-on-trym"],
        ["bath-central", "bathwick"],
        ["keynsham", "nailsea"],
        ["portishead", "clevedon"],
      ],
    },
  ],
};
