import { CITIES } from "@/lib/cities";
import { GBP } from "@/lib/currency";
import {
  ENGLAND_BAND_RATIOS,
  ENGLAND_BAND_VALUES,
  type CityInput,
} from "@/lib/city-content";
import { rukTakeHomeMonthly, TAX_REGIME_LABELS } from "@/lib/tax";
import { WEST_YORKSHIRE_COUNCILS } from "@/lib/leeds/councils";
import { LEEDS_NEIGHBOURHOODS } from "@/lib/leeds/data/neighbourhoods";
import { LEEDS_DESTINATIONS } from "@/lib/leeds/data/destinations";
import { createDriveModel } from "@/lib/drive-time";
import {
  LEEDS_COUNCIL_RENT_GBP,
  LEEDS_RENT_REFERENCE_MONTH,
  LEEDS_RENT_REVIEW_AS_OF,
  LEEDS_RENT_SOURCES,
  LEEDS_ROOM_AVERAGE_GBP,
  LEEDS_ROOM_DISTRICT_LABELS,
} from "@/lib/leeds/data/rent-market";
import {
  LEEDS_BAND_D_BY_COUNCIL,
  LEEDS_COUNCIL_TAX_AS_OF,
  LEEDS_COUNCIL_TAX_SOURCES,
  LEEDS_COUNCIL_TAX_YEAR,
  WEST_YORKSHIRE_PRECEPT_BAND_D,
  WEST_YORKSHIRE_PRECEPT_BREAKDOWN,
} from "@/lib/leeds/data/council-tax";
import {
  LEEDS_TRAVEL_BAND_DESCRIPTIONS,
  LEEDS_TRAVEL_BAND_DISTANCE_KM,
  LEEDS_TRAVEL_BAND_RATIONALE,
} from "@/lib/leeds/travel-band";
import {
  LEEDS_COMMUTE_TIMES,
  WEST_YORKSHIRE_TRANSIT_KMH,
} from "@/lib/leeds/commute";
import { LEEDS_GUIDES } from "@/lib/leeds/data/guides";
import { LEEDS_LIFESTYLE_PAGES } from "@/lib/leeds/lifestyle";

const AREAS = LEEDS_NEIGHBOURHOODS;

/** England publishes rents by local authority, so each maps to its own row. */
const BASELINE_FOR_COUNCIL = Object.fromEntries(
  WEST_YORKSHIRE_COUNCILS.map((c) => [c, c]),
);

const ROOM_DISTRICT_FOR_AREA = Object.fromEntries(
  AREAS.map((a) => [a.id, a.roomDistrict]),
);

/**
 * Driving in West Yorkshire. The M62, M1 and M621 make the inter-town
 * journeys fast and the intra-Leeds ones slow, which is the mirror image
 * of the rail network — the trains are excellent between town centres
 * and useless around the edges.
 */
const DRIVE_MODEL = createDriveModel(AREAS, LEEDS_DESTINATIONS, {
  circuity: 1.3,
  peakKmh: 32,
  arrivalPenaltyMinutes: {
    default: 8,
    "leeds-station": 20,
    "wellington-place": 20,
    "university-leeds": 18,
    "st-james": 12,
    "bradford-centre": 15,
    huddersfield: 14,
    // Out-of-town with their own parking.
    "thorpe-park": 5,
    "white-rose": 6,
  },
  corridors: [
    // The M62 and M621 corridors between the towns.
    { destinationIds: ["bradford-centre", "huddersfield", "white-rose"], kmh: 48 },
    { destinationIds: ["thorpe-park"], kmh: 45 },
  ],
});

export const LEEDS_INPUT: CityInput = {
  city: CITIES.leeds,
  currency: GBP,

  copy: {
    regionLabel: "West Yorkshire",
    homeH1: "Where to live in Leeds and West Yorkshire",
    homeIntro:
      "West Yorkshire is one commercial city and a ring of Victorian textile towns that were rich, then were not, and are now each doing something different about it. Bradford is a city of half a million in its own right; Huddersfield, Halifax and Wakefield have their own centres and their own economies. The rent gap between the ends of that spread is close to a factor of two.",
    homeMetaDescription:
      "Find the right West Yorkshire neighbourhood by commute, rent and how you want to live — reviewed rents and journey times across Leeds, Bradford, Wakefield, Kirklees and Calderdale.",
    homeFaqs: [
      {
        question: "What is the best area to live in Leeds?",
        answer:
          "It depends what you are optimising for. For walking to work and going out, the city centre or Holbeck. For a village feel with good food, Chapel Allerton or Meanwood. For families and green space, Roundhay, Horsforth or Horbury. For the lowest rent with a fast commute, Armley, Beeston or Cross Gates — the last of which reaches Leeds station in nine minutes.",
      },
      {
        question: "Is it worth living outside Leeds and commuting in?",
        answer:
          "Often, and more so here than in most regions. Halifax, Keighley, Dewsbury and Castleford are £300 to £450 a month cheaper for a one-bed than central Leeds, and all four have direct trains. The season ticket takes back part of that, so check the off-peak frequency of the line before committing — a fifteen-minute journey on an hourly train is a worse commute than a twenty-five-minute one every ten minutes.",
      },
    ],

    commuteIntro:
      "Leeds is the largest city in western Europe with no mass transit system. What the region has instead is a Victorian railway network built to move wool between mill towns, and it turns out to be unusually good at moving people — West Yorkshire has more stations than any English county outside London. The practical consequence is that where you live relative to a station matters more here than almost anywhere, so start from the destination.",
    commuteMethod: [
      "The figures are typical weekday-morning door-to-door times — walking to the stop, waiting, riding, and walking off at the other end. They are not timetable times. Cross Gates to Leeds is nine minutes on the train and fifteen here, because nobody lives on the platform.",
      "Where a figure is missing the site falls back to straight-line distance at an assumed regional average speed and labels the result a distance estimate rather than a reviewed one. Journey time is only half the story on this network: a great many of these lines run half-hourly and some hourly off-peak, which turns a fifteen-minute journey into a forty-minute one if you miss it. No single number can express that, and the guides say so at length.",
    ],

    rentMethod: [
      "Nobody rents a borough, though. Roundhay and Harehills are both Leeds and a single Leeds figure describes neither, so each area carries a reviewed premium or discount against its borough baseline, set from visible listing samples on the major portals. That second step is an estimate, and it is the weakest link in the chain. Figures are rounded to the nearest £25 for exactly that reason.",
      "The shape of this market is worth stating plainly before reading the borough figures: Leeds sits a long way clear of the other four. A one-bed in Leeds averages more than a three-bed in Calderdale. That is what happens when one city captures almost all of a region's professional employment growth and the mill towns around it do not.",
    ],
    roomMethod: [
      "No official series publishes room-level rents, so these come from visible listing samples keyed to explicit postcode district groups. West Yorkshire has five separate postcode areas, and LS alone runs from the city centre out to Wetherby — twenty kilometres and roughly £200 a month apart — so averaging across a prefix would describe nowhere.",
    ],

    councilTaxMethod: [
      `Band D charges for ${LEEDS_COUNCIL_TAX_YEAR} are the total for the year: the borough's own element including its adult social care precept, plus the West Yorkshire Mayor's policing precept and the Fire and Rescue Authority precept, together £${WEST_YORKSHIRE_PRECEPT_BAND_D.toLocaleString()} at Band D. Policing moved to the Mayor in 2021, replacing the Police and Crime Commissioner — the same arrangement Greater Manchester uses and different from most of England. Both precepts are charged identically across all five boroughs, so every pound of difference between them comes from the council's own element.`,
      "The charges exclude parish and town council precepts, which apply in a scattering of places — Otley, Wetherby, Horbury, Holmfirth and Todmorden among them — and add a modest amount where they exist.",
    ],

    councilsIntro:
      "Three of these five are cities in their own right, and Bradford is the seventh-largest local authority in England on its own. Kirklees and Calderdale are the two that people outside the region cannot place: Kirklees is Huddersfield, Dewsbury, Batley and the Holme Valley; Calderdale is Halifax, Brighouse, Todmorden and Hebden Bridge. What follows is what each costs to rent in and what each charges in council tax — and note that the two run in opposite directions.",

    lifestyleIntro:
      "Eight cuts through the same ten lifestyle measures, each weighted for a different priority. Two of them would make no sense elsewhere: in a county with more stations than any outside London and no other rapid transit, being on a good line is a real question — and green space here often means moorland you can walk onto from a town centre, which is not what it means in a city with parks.",

    compareIntro:
      "Not every possible pair — only the ones that are a genuine either/or: near enough to each other that the same job is commutable from both, close enough in rent that price alone does not decide it, and in the same or an adjoining travel band. Pairing Ilkley with Castleford would produce a page, but not a decision anybody is making.",

    couplesIntro: [
      "This region rewards the question more than most. Because so much of West Yorkshire sits on a railway, a household split between two of its towns usually has a real answer — Dewsbury for a Leeds and Huddersfield pairing, Brighouse for Leeds and Halifax, Shipley for Leeds and Bradford. The trick is finding the junction rather than splitting the difference on a map.",
      "Pick two workplaces, a commute cap each, a shared budget and a shared idea of the kind of area you want. The ranking favours fair compromises: an area where one of you has a fifteen-minute journey and the other an hour scores worse than one where you both have half an hour.",
    ],

    roomIncludesNote:
      "Rooms often include bills and council tax, which is worth £120 to £200 a month you are not separately paying.",
    rentExtrasNote:
      "bills and council tax for flats, which add roughly £220 to £320 a month",

    extraLimits: [
      {
        title: "Service frequency.",
        body: "Journey times here say nothing about how often the train runs, and on this network that is half the commute. A fifteen-minute journey on an hourly line is a worse daily proposition than a twenty-five-minute one every ten minutes, and nothing on this site captures the difference.",
      },
      {
        title: "Flood risk.",
        body: "The Calder and Aire valleys have flooded repeatedly and seriously, most of all at Hebden Bridge, Sowerby Bridge and along the Kirkstall corridor. Nothing here scores it. Check the Environment Agency flood map for any specific address on a valley floor.",
      },
    ],
  },

  areas: AREAS,

  councils: WEST_YORKSHIRE_COUNCILS,
  councilNoun: { singular: "borough", plural: "boroughs" },
  regionName: "West Yorkshire",

  destinations: LEEDS_DESTINATIONS,

  travelBands: {
    descriptions: LEEDS_TRAVEL_BAND_DESCRIPTIONS,
    distances: LEEDS_TRAVEL_BAND_DISTANCE_KM,
    rationale: LEEDS_TRAVEL_BAND_RATIONALE,
  },

  commuteTimes: LEEDS_COMMUTE_TIMES,
  driveTimes: DRIVE_MODEL,
  transitKmh: WEST_YORKSHIRE_TRANSIT_KMH,

  rent: {
    reviewedAsOf: LEEDS_RENT_REVIEW_AS_OF,
    baselineLabel: "the ONS average",
    referenceMonth: LEEDS_RENT_REFERENCE_MONTH,
    baselines: LEEDS_COUNCIL_RENT_GBP,
    baselineForCouncil: BASELINE_FOR_COUNCIL,
    roomAverages: LEEDS_ROOM_AVERAGE_GBP,
    roomLabels: LEEDS_ROOM_DISTRICT_LABELS,
    roomDistrictForArea: ROOM_DISTRICT_FOR_AREA,
    sources: LEEDS_RENT_SOURCES,
  },

  councilTax: {
    year: LEEDS_COUNCIL_TAX_YEAR,
    asOf: LEEDS_COUNCIL_TAX_AS_OF,
    bandD: LEEDS_BAND_D_BY_COUNCIL,
    ratios: ENGLAND_BAND_RATIOS,
    bandValues: ENGLAND_BAND_VALUES,
    sources: LEEDS_COUNCIL_TAX_SOURCES,
    precept: {
      label: "West Yorkshire Mayoral policing and fire precepts",
      bandD: WEST_YORKSHIRE_PRECEPT_BAND_D,
      breakdown: { ...WEST_YORKSHIRE_PRECEPT_BREAKDOWN },
    },
    notes: [
      "Bands are still based on what a property was worth on 1 April 1991, not on what it is worth now. In West Yorkshire that works strongly in renters' favour: the great majority of the region's housing sits in bands A to C, so the Band D headline substantially overstates a typical bill. A Band A property in Leeds pays about £760 a year less than the headline figure.",
      "Council tax does not follow rent here. Leeds has the region's highest rents and its lowest Band D charge, and Kirklees has neither the highest rents nor the lowest tax.",
    ],
  },

  guides: LEEDS_GUIDES,
  lifestylePages: LEEDS_LIFESTYLE_PAGES,

  /**
   * Starts at £20,000 and stops at £38,000 — by some distance the
   * lowest ladder on the site, because West Yorkshire is the cheapest
   * region on it. Past £38,000 a one-bed fits almost everywhere in the
   * county and the page has nothing left to tell you, which is exactly
   * the thin-page failure the salary cluster has to avoid.
   */
  salaryLevels: [20000, 22000, 24000, 26000, 28000, 30000, 33000, 38000],

  takeHomeMonthly: rukTakeHomeMonthly,
  taxRegimeLabel: TAX_REGIME_LABELS.ruk,

  comparisonsPerArea: 3,
};
