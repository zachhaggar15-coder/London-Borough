import { CITIES } from "@/lib/cities";
import { GBP } from "@/lib/currency";
import {
  ENGLAND_BAND_RATIOS,
  ENGLAND_BAND_VALUES,
  type CityInput,
} from "@/lib/city-content";
import { rukTakeHomeMonthly, TAX_REGIME_LABELS } from "@/lib/tax";
import { GM_BOROUGHS } from "@/lib/manchester/boroughs";
import { MANCHESTER_NEIGHBOURHOODS } from "@/lib/manchester/data/neighbourhoods";
import { MANCHESTER_DESTINATIONS } from "@/lib/manchester/data/destinations";
import { createDriveModel } from "@/lib/drive-time";
import {
  MANCHESTER_RENT_REVIEW_AS_OF,
  MANCHESTER_RENT_SOURCES,
  ONS_BOROUGH_RENT_GBP,
  ONS_RENT_REFERENCE_MONTH,
  ROOM_DISTRICT_AVERAGE_GBP,
  ROOM_DISTRICT_LABELS,
} from "@/lib/manchester/data/rent-market";
import {
  BAND_D_BY_BOROUGH,
  GM_FIRE_ELEMENT_BAND_D,
  GM_MAYORAL_PRECEPT_BAND_D,
  GM_MAYORAL_PRECEPT_BREAKDOWN,
  MANCHESTER_COUNCIL_TAX_AS_OF,
  MANCHESTER_COUNCIL_TAX_SOURCES,
  MANCHESTER_COUNCIL_TAX_YEAR,
} from "@/lib/manchester/data/council-tax";
import {
  TRAVEL_BAND_DESCRIPTIONS,
  TRAVEL_BAND_DISTANCE_KM,
} from "@/lib/manchester/travel-band";
import { GM_TRANSIT_KMH, MANCHESTER_COMMUTE_TIMES } from "@/lib/manchester/commute";
import { MANCHESTER_GUIDES } from "@/lib/manchester/data/guides";
import { MANCHESTER_LIFESTYLE_PAGES } from "@/lib/manchester/lifestyle";

/**
 * Greater Manchester, expressed as a CityInput.
 *
 * The datasets themselves have not moved — they still live under
 * lib/manchester/ where they were written. What has changed is that the
 * forty Manchester-named helpers that used to sit on top of them are
 * gone, replaced by the shared factory. This file is the seam between
 * the two.
 */

const AREAS = MANCHESTER_NEIGHBOURHOODS;

/** Every borough maps to its own ONS row: England publishes by authority. */
const BASELINE_FOR_COUNCIL = Object.fromEntries(
  GM_BOROUGHS.map((b) => [b, b]),
);

const ROOM_DISTRICT_FOR_AREA = Object.fromEntries(
  AREAS.map((a) => [a.id, a.roomDistrict]),
);

/**
 * Driving in Greater Manchester. Circuity is high for an English
 * conurbation because the Ship Canal, the Irwell and the Mersey all
 * force detours, and the M60 orbital is the only sane cross-region
 * route — which is precisely why driving beats transit for the orbital
 * journeys the commute pages keep warning about.
 */
const DRIVE_MODEL = createDriveModel(AREAS, MANCHESTER_DESTINATIONS, {
  circuity: 1.32,
  peakKmh: 30,
  arrivalPenaltyMinutes: {
    default: 8,
    // City-centre arrival at 08:30 plus parking is the dominant term on
    // any short journey into the middle.
    piccadilly: 20,
    spinningfields: 22,
    "oxford-road": 20,
    ancoats: 16,
    victoria: 18,
    "salford-central": 16,
    // Out-of-town sites with their own car parks.
    "trafford-park": 6,
    airport: 10,
    mediacity: 12,
    stockport: 12,
  },
  corridors: [
    // The M60/M56 corridor to the airport and Trafford Park runs freely
    // outside the very peak.
    { destinationIds: ["airport", "trafford-park"], kmh: 45 },
  ],
});

export const MANCHESTER_INPUT: CityInput = {
  city: CITIES.manchester,
  currency: GBP,

  copy: {
    regionLabel: "Greater Manchester",
    homeH1: "Where to live in Greater Manchester",
    homeIntro:
      "Greater Manchester is not a city with suburbs. It is ten boroughs and a couple of dozen towns that grew into each other, and the practical consequence is that two places eight miles apart can differ by £400 a month in rent, forty minutes in commute and half a band in council tax.",
    homeMetaDescription:
      "Find the right Greater Manchester neighbourhood by commute, rent and how you want to live — reviewed rents and journey times across all ten boroughs.",
    homeFaqs: [
      {
        question: "What is the best area to live in Manchester?",
        answer:
          "It depends what you are optimising for. For nightlife and walking to work, the Northern Quarter and Ancoats. For a village feel with a tram, Chorlton, Didsbury or Prestwich. For schools and green space, Altrincham, Sale or Cheadle Hulme. For the lowest rent with a usable commute, Levenshulme, Stretford or Ashton-under-Lyne.",
      },
      {
        question: "Which part of Greater Manchester has the fastest commute?",
        answer:
          "The city centre, Ancoats and the Northern Quarter, where most people walk. Beyond the centre the quickest are the rail suburbs rather than the tram ones: Levenshulme reaches Piccadilly in about eight minutes and Heaton Moor in about ten, which no tram stop at a comparable distance matches.",
      },
    ],

    commuteIntro:
      "The network here is strongly radial. Almost every area reaches Piccadilly and Victoria far more easily than it reaches anywhere else, and an orbital journey — Sale to Oldham, say — is frequently quicker by car than by any published public route. That makes where you work a much sharper constraint on where you can live than it is in a city with a dense rapid-transit network, so start from the destination.",
    commuteMethod: [
      "The figures are typical weekday-morning door-to-door times — walking to the stop, waiting, riding, and walking off at the other end. They are not timetable times. A tram that runs Sale to St Peter's Square in 22 minutes is quoted here at 35, because nobody lives at the tram stop.",
      "Where a figure is missing the site falls back to straight-line distance at an assumed regional average speed and labels the result a distance estimate rather than a reviewed one. That speed is deliberately conservative, because straight-line distance flatters this network badly. There is no orbital rail, the tram runs on street through the city centre, and a journey like Sale to Oldham is frequently quicker by car than by any published public route.",
    ],

    rentMethod: [
      "The anchor is the ONS Price Index of Private Rents, which publishes an average monthly rent by bedroom count for each local authority. That part is a real, sourced statistic and it is what the borough pages quote.",
      "Nobody rents a borough, though. Didsbury and Wythenshawe are both Manchester and a single Manchester figure describes neither, so each area carries a reviewed premium or discount against its borough baseline, set from visible listing samples on the major portals. That second step is an estimate, and it is the weakest link in the chain. Figures are rounded to the nearest £25 for exactly that reason: quoting £1,163 for a one-bed in Sale would imply a precision the method does not have.",
    ],
    roomMethod: [
      "No official series publishes room-level rents, so these come from visible listing samples. They are keyed to explicit postcode district groups rather than to the M prefix as a whole, because that prefix covers far too much ground to average: M1 in the city centre and M18 in Gorton are eight kilometres and roughly £300 a month apart, and a single M figure would describe neither.",
    ],

    councilTaxMethod: [
      `Band D charges for ${MANCHESTER_COUNCIL_TAX_YEAR} are the total for the year: the borough's own element, including its adult social care precept, plus the Greater Manchester Mayoral precept of £${GM_MAYORAL_PRECEPT_BAND_D.toLocaleString()} that every household in the ten boroughs pays. That precept splits into £${GM_MAYORAL_PRECEPT_BREAKDOWN.police.toLocaleString()} for the Mayoral Police and Crime Commissioner and £${GM_MAYORAL_PRECEPT_BREAKDOWN.general.toLocaleString()} for general functions, of which about £${GM_FIRE_ELEMENT_BAND_D.toLocaleString()} funds fire and rescue. It is charged identically in all ten boroughs, so any difference between them comes entirely from the council's own element.`,
      "The charges exclude parish and town council precepts. Those apply in only a handful of Greater Manchester places — Saddleworth in Oldham is the best known — and add a modest amount where they exist.",
    ],

    councilsIntro:
      "Greater Manchester is ten metropolitan boroughs, and the city of Manchester is one of them rather than a container for the other nine — a distinction almost every guide written from outside the region gets wrong. What follows is what each one costs to rent in and what each one charges in council tax, which are the two numbers that most often decide the question.",

    lifestyleIntro:
      "Eight cuts through the same ten lifestyle measures, each weighted for a different priority. They are chosen for what this region actually offers: with moorland on three sides, how close you are to open country is a real question here, and with a radial network and no orbital routes, so is whether you can live somewhere without a car.",

    compareIntro:
      "Not every possible pair — only the ones that are a genuine either/or: near enough to each other that the same job is commutable from both, close enough in rent that price alone does not decide it, and in the same or an adjoining travel band. Pairing Hale with Leigh would produce a page, but not a decision anybody is making.",

    couplesIntro: [
      "This is a harder question in Greater Manchester than it looks. The network runs into the centre and barely runs around it, so two people working on opposite sides of the conurbation have very few places that suit them both — and the obvious compromise, somewhere in the middle, is often the most expensive option on the list.",
      "Pick two workplaces, a commute cap each, a shared budget and a shared idea of the kind of area you want. The ranking favours fair compromises: an area where one of you has a fifteen-minute journey and the other an hour scores worse than one where you both have half an hour.",
    ],

    roomIncludesNote:
      "Rooms often include bills and council tax, which is worth £120 to £200 a month you are not separately paying.",
    rentExtrasNote:
      "bills and council tax for flats, which add roughly £220 to £320 a month",

    extraLimits: [
      {
        title: "Street-level variation.",
        body: "An area is not uniform. Levenshulme and Ordsall in particular change character sharply from one street to the next, and a single set of scores cannot express that.",
      },
    ],
  },

  areas: AREAS,

  councils: GM_BOROUGHS,
  councilNoun: { singular: "borough", plural: "boroughs" },
  regionName: "Greater Manchester",

  destinations: MANCHESTER_DESTINATIONS,

  travelBands: {
    descriptions: TRAVEL_BAND_DESCRIPTIONS,
    distances: TRAVEL_BAND_DISTANCE_KM,
    rationale:
      "Metrolink runs its own zones 1–4, but they cover only the tram. Heavy rail into Piccadilly and Victoria prices on a separate scheme and the bus network on a third, so a Metrolink zone describes nothing at all for a place like Heaton Moor or Urmston, which have no tram stop.",
  },

  commuteTimes: MANCHESTER_COMMUTE_TIMES,
  driveTimes: DRIVE_MODEL,
  transitKmh: GM_TRANSIT_KMH,

  rent: {
    reviewedAsOf: MANCHESTER_RENT_REVIEW_AS_OF,
    baselineLabel: "the ONS average",
    referenceMonth: ONS_RENT_REFERENCE_MONTH,
    baselines: ONS_BOROUGH_RENT_GBP,
    baselineForCouncil: BASELINE_FOR_COUNCIL,
    roomAverages: ROOM_DISTRICT_AVERAGE_GBP,
    roomLabels: ROOM_DISTRICT_LABELS,
    roomDistrictForArea: ROOM_DISTRICT_FOR_AREA,
    sources: MANCHESTER_RENT_SOURCES,
  },

  councilTax: {
    year: MANCHESTER_COUNCIL_TAX_YEAR,
    asOf: MANCHESTER_COUNCIL_TAX_AS_OF,
    bandD: BAND_D_BY_BOROUGH,
    ratios: ENGLAND_BAND_RATIOS,
    bandValues: ENGLAND_BAND_VALUES,
    sources: MANCHESTER_COUNCIL_TAX_SOURCES,
    precept: {
      label: "Greater Manchester Mayoral precept",
      bandD: GM_MAYORAL_PRECEPT_BAND_D,
      breakdown: { ...GM_MAYORAL_PRECEPT_BREAKDOWN },
    },
    notes: [
      "Bands are still based on what a property was worth on 1 April 1991, not on what it is worth now. Most Greater Manchester housing sits in bands A to C, so a typical bill here comes in below the Band D figure.",
    ],
  },

  guides: MANCHESTER_GUIDES,
  lifestylePages: MANCHESTER_LIFESTYLE_PAGES,

  salaryLevels: [22000, 25000, 28000, 30000, 35000, 40000, 45000, 55000],

  takeHomeMonthly: rukTakeHomeMonthly,
  taxRegimeLabel: TAX_REGIME_LABELS.ruk,

  comparisonsPerArea: 3,
};
