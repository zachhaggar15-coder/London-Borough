import { CITIES } from "@/lib/cities";
import { GBP } from "@/lib/currency";
import {
  SCOTLAND_BAND_RATIOS,
  SCOTLAND_BAND_VALUES,
  type CityInput,
} from "@/lib/city-content";
import { scotlandTakeHomeMonthly, TAX_REGIME_LABELS } from "@/lib/tax";
import { LOTHIAN_COUNCILS } from "@/lib/edinburgh/councils";
import { EDINBURGH_NEIGHBOURHOODS } from "@/lib/edinburgh/data/neighbourhoods";
import { EDINBURGH_DESTINATIONS } from "@/lib/edinburgh/data/destinations";
import { createDriveModel } from "@/lib/drive-time";
import {
  EDINBURGH_BRMA_FOR_COUNCIL,
  EDINBURGH_BRMA_RENT_GBP,
  EDINBURGH_RENT_NOTE,
  EDINBURGH_RENT_REFERENCE_MONTH,
  EDINBURGH_RENT_REVIEW_AS_OF,
  EDINBURGH_RENT_SOURCES,
  EDINBURGH_ROOM_AVERAGE_GBP,
  EDINBURGH_ROOM_DISTRICT_LABELS,
} from "@/lib/edinburgh/data/rent-market";
import {
  EDINBURGH_BAND_D_BY_COUNCIL,
  EDINBURGH_COUNCIL_TAX_AS_OF,
  EDINBURGH_COUNCIL_TAX_SOURCES,
  EDINBURGH_COUNCIL_TAX_YEAR,
  SCOTTISH_WATER_BAND_D,
} from "@/lib/edinburgh/data/council-tax";
import {
  EDINBURGH_TRAVEL_BAND_DESCRIPTIONS,
  EDINBURGH_TRAVEL_BAND_DISTANCE_KM,
  EDINBURGH_TRAVEL_BAND_RATIONALE,
} from "@/lib/edinburgh/travel-band";
import {
  EDINBURGH_COMMUTE_TIMES,
  EDINBURGH_TRANSIT_KMH,
} from "@/lib/edinburgh/commute";
import { EDINBURGH_GUIDES } from "@/lib/edinburgh/data/guides";
import { EDINBURGH_LIFESTYLE_PAGES } from "@/lib/edinburgh/lifestyle";

const AREAS = EDINBURGH_NEIGHBOURHOODS;

const ROOM_DISTRICT_FOR_AREA = Object.fromEntries(
  AREAS.map((a) => [a.id, a.roomDistrict]),
);

/**
 * Driving in Edinburgh and the Lothians. Slow inside the bypass — a
 * World Heritage street plan, a great many bus lanes and a 20mph limit
 * across most of the city — and fast outside it on the A720 and M8. The
 * result is that driving loses to the bus for anything central and wins
 * comfortably from the Lothian towns.
 */
const DRIVE_MODEL = createDriveModel(AREAS, EDINBURGH_DESTINATIONS, {
  circuity: 1.3,
  peakKmh: 30,
  arrivalPenaltyMinutes: {
    default: 8,
    // The Old Town and New Town are the worst places to arrive by car in
    // Scotland: controlled parking, bus gates and very little of it.
    waverley: 25,
    "st-andrew-square": 25,
    "george-square": 22,
    haymarket: 18,
    "leith-shore": 14,
    // Out-of-town business parks and hospital sites.
    "edinburgh-park": 6,
    bioquarter: 8,
    "livingston-centre": 8,
  },
  corridors: [
    // The A720 bypass and the M8 west.
    { destinationIds: ["edinburgh-park", "livingston-centre"], kmh: 50 },
  ],
});

export const EDINBURGH_INPUT: CityInput = {
  city: CITIES.edinburgh,
  currency: GBP,

  copy: {
    regionLabel: "Edinburgh and the Lothians",
    homeH1: "Where to live in Edinburgh and the Lothians",
    homeIntro:
      "Edinburgh is small — the whole city fits inside a bypass about six kilometres across — and that single fact drives everything else. A tightly bounded city with two large universities, a substantial short-let sector and very little new supply produces the highest rents in Britain outside London and the South East, and pushes a great many people out to the Lothian towns beyond it.",
    homeMetaDescription:
      "Find the right Edinburgh or Lothian neighbourhood by commute, rent and how you want to live — reviewed rents and journey times across Edinburgh, East Lothian, Midlothian and West Lothian.",
    homeFaqs: [
      {
        question: "What is the best area to live in Edinburgh?",
        answer:
          "It depends what you are optimising for. For going out and eating well, Leith or Leith Walk. For a village feel with green space, Stockbridge, Morningside or Portobello. For families and schools, Cramond, Morningside or Corstorphine. For the lowest rent with a walkable commute, Gorgie and Dalry — the cheapest tenements inside the city, fifteen minutes from the West End on foot.",
      },
      {
        question: "Is renting in Scotland different from England?",
        answer:
          "Substantially. A Scottish private residential tenancy has no fixed term and no end date, the tenant can leave on 28 days' notice at any time, and there is no no-fault eviction — a landlord must prove a statutory ground to a tribunal. Letting agent fees to tenants have been illegal since 1984 and deposits are capped at two months. It is a materially stronger position than the English assured shorthold.",
      },
    ],

    commuteIntro:
      "Edinburgh is better served than its size suggests. Lothian Buses is municipally owned, runs at high frequency across the whole city on a single flat fare, and the tram links the airport, the West End, the New Town and Leith on its own alignment. The city's employment sits in two clusters that are not the same place — the New Town and West End financial and government quarter, and Edinburgh Park out on the western edge — so where you work still constrains where you can sensibly live.",
    commuteMethod: [
      "The figures are typical weekday-morning door-to-door times — walking to the stop, waiting, riding, and walking off at the other end. They are not timetable times. Musselburgh to Waverley is eight minutes on the train and twenty here, because nobody lives on the platform.",
      "Where a figure is missing the site falls back to straight-line distance at an assumed regional average speed and labels the result a distance estimate rather than a reviewed one. The speed used here is higher than for the English regions on this site, because Edinburgh's bus network genuinely is faster and denser — but it still understates the awkward journeys, and the western employment cluster is the clearest example: Portobello to Edinburgh Park is twelve kilometres and three-quarters of an hour, because the journey crosses the entire city centre to get there.",
    ],

    rentMethod: [
      "Two things about Scottish rent statistics differ from the English ones used elsewhere on this site, and both change what the numbers mean. Scotland publishes average rents by Broad Rental Market Area rather than by council, and the BRMAs do not follow council boundaries — Edinburgh, East Lothian and Midlothian all sit inside the single Lothian BRMA and share one published row. Keying the baselines to councils would have meant inventing three figures that do not exist.",
      "The Scottish series also measures newly advertised lets, where the English series measures the whole rented stock including sitting tenancies that have not been re-let for years. New lets run ahead of the stock average, particularly in a market moving as fast as Edinburgh's, so a Scottish figure and an English one are not directly comparable even where they look alike. Nothing on this site compares them.",
      "On top of that baseline, each area carries a reviewed premium or discount set from visible listing samples. That second step is an estimate and it is the weakest link in the chain, which is why figures are rounded to the nearest £25.",
    ],
    roomMethod: [
      "No official series publishes room-level rents, so these come from visible listing samples keyed to explicit postcode district groups. The EH prefix covers the whole of the Lothians, from the New Town out to Dunbar and Bathgate — fifty kilometres and roughly £250 a month apart — so averaging across it would describe nowhere.",
      "Edinburgh's room market also has a seasonal shape nowhere else on this site shares: a substantial part of the city's flat stock moves to short lets for August, and rooms advertised in July and August price accordingly. These figures are an annual average and will understate a summer search.",
    ],

    councilTaxMethod: [
      `Band D charges for ${EDINBURGH_COUNCIL_TAX_YEAR} are the council tax only. Scottish Water's water and waste-water charges are collected on the same bill and add roughly £${SCOTTISH_WATER_BAND_D.toLocaleString()} a year at Band D — so Edinburgh's actual Band D bill is around £2,278 rather than the £1,626 quoted here. Excluding them is the right basis for comparing one council's charge with another's, and the wrong basis for budgeting, which is why every page here says which it is showing.`,
      "There is no regional precept in these figures because there is no regional authority to levy one. Scotland has no combined authorities or regional mayors, and police and fire are funded nationally from the Scottish budget rather than through a local charge. Every pound of difference between these four councils is therefore the council's own.",
      "The band multipliers also differ from England's. Scotland increased the multipliers for bands E to H in 2017 and England did not, so a Scottish Band H property pays about 22.5% more relative to Band D than the English statutory ninths would give. Bands A to D are unchanged. The band tables on these pages use the Scottish ratios accordingly.",
    ],

    councilsIntro:
      "These are council areas, not boroughs — Scottish local government was reorganised into 32 single-tier councils in 1996, and the old Lothian Region was split into the four below. There is no upper tier above them and no combined authority beside them, so each sets its own council tax and runs its own services outright. What follows is what each costs to rent in and what each charges.",

    lifestyleIntro:
      "Eight cuts through the same ten lifestyle measures, each weighted for a different priority. One of them exists only here: Edinburgh's August is not a background fact about the city — for a month it roughly doubles in population, and where you live decides whether that is the best month of your year or the worst.",

    compareIntro:
      "Not every possible pair — only the ones that are a genuine either/or: near enough to each other that the same job is commutable from both, close enough in rent that price alone does not decide it, and in the same or an adjoining travel band. Pairing the New Town with Bathgate would produce a page, but not a decision anybody is making.",

    couplesIntro: [
      "Edinburgh makes this easier than most cities, because it is small enough that a great many areas are within half an hour of both the New Town and the university. The exception is the western employment cluster: if one of you works at Edinburgh Park or the Gyle and the other in Leith, the compromise is genuinely hard, and the tram corridor is usually the answer.",
      "Pick two workplaces, a commute cap each, a shared budget and a shared idea of the kind of area you want. The ranking favours fair compromises: an area where one of you has a fifteen-minute journey and the other an hour scores worse than one where you both have half an hour.",
    ],

    roomIncludesNote:
      "Rooms often include bills and council tax, which is worth £120 to £200 a month you are not separately paying.",
    rentExtrasNote:
      "bills and council tax for flats, which add roughly £220 to £320 a month",

    extraLimits: [
      {
        title: "The Festival.",
        body: "For one month a year the Old Town, Tollcross and Newington are transformed and anywhere beyond the bypass is not. Nothing on this site scores that, and for a lot of residents it is the largest single quality-of-life variable in the city.",
      },
      {
        title: "School catchments.",
        body: "Edinburgh catchment areas visibly move rents, more so than in the English regions covered here. Nothing on this site scores schools, and in this city that gap is wider than usual.",
      },
    ],
  },

  areas: AREAS,

  councils: LOTHIAN_COUNCILS,
  councilNoun: { singular: "council area", plural: "council areas" },
  regionName: "Edinburgh and the Lothians",

  destinations: EDINBURGH_DESTINATIONS,

  travelBands: {
    descriptions: EDINBURGH_TRAVEL_BAND_DESCRIPTIONS,
    distances: EDINBURGH_TRAVEL_BAND_DISTANCE_KM,
    rationale: EDINBURGH_TRAVEL_BAND_RATIONALE,
  },

  commuteTimes: EDINBURGH_COMMUTE_TIMES,
  driveTimes: DRIVE_MODEL,
  transitKmh: EDINBURGH_TRANSIT_KMH,

  rent: {
    reviewedAsOf: EDINBURGH_RENT_REVIEW_AS_OF,
    baselineLabel: "the ONS average",
    referenceMonth: EDINBURGH_RENT_REFERENCE_MONTH,
    // Keyed to Broad Rental Market Areas, not councils: Edinburgh, East
    // Lothian and Midlothian share the single Lothian row.
    baselines: EDINBURGH_BRMA_RENT_GBP,
    baselineForCouncil: EDINBURGH_BRMA_FOR_COUNCIL,
    roomAverages: EDINBURGH_ROOM_AVERAGE_GBP,
    roomLabels: EDINBURGH_ROOM_DISTRICT_LABELS,
    roomDistrictForArea: ROOM_DISTRICT_FOR_AREA,
    sources: EDINBURGH_RENT_SOURCES,
    note: EDINBURGH_RENT_NOTE,
  },

  councilTax: {
    year: EDINBURGH_COUNCIL_TAX_YEAR,
    asOf: EDINBURGH_COUNCIL_TAX_AS_OF,
    bandD: EDINBURGH_BAND_D_BY_COUNCIL,
    // Scotland uplifted bands E to H in 2017; the English ninths would
    // understate every large property in the region.
    ratios: SCOTLAND_BAND_RATIOS,
    bandValues: SCOTLAND_BAND_VALUES,
    sources: EDINBURGH_COUNCIL_TAX_SOURCES,
    notes: [
      `These figures are council tax only. Scottish Water's water and waste-water charges are collected on the same bill and add roughly £${SCOTTISH_WATER_BAND_D.toLocaleString()} a year at Band D — so budget for the bill rather than the charge.`,
      "Bands are still based on what a property was worth on 1 April 1991, and the Scottish 1991 value ranges differ from the English ones. Since 2017 the multipliers for bands E to H have also been higher in Scotland; bands A to D are unchanged.",
      "There is no police or fire precept in these figures because both are funded nationally from the Scottish budget rather than through a local charge.",
    ],
  },

  guides: EDINBURGH_GUIDES,
  lifestylePages: EDINBURGH_LIFESTYLE_PAGES,

  /**
   * The highest ladder on the site, because Edinburgh is the most
   * expensive place covered and the interesting thresholds arrive later.
   * £43,000 is on it deliberately: that is where Scotland's higher rate
   * begins, and the take-home column beside £40,000 is the clearest way
   * to show what that costs. It stops at £65,000, one rung past the
   * point where a one-bed fits everywhere and the answer stops changing.
   */
  salaryLevels: [25000, 30000, 35000, 40000, 43000, 50000, 58000, 65000],

  takeHomeMonthly: scotlandTakeHomeMonthly,
  taxRegimeLabel: TAX_REGIME_LABELS.scotland,

  comparisonsPerArea: 3,
};
