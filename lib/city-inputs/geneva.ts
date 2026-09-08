import { CITIES } from "@/lib/cities";
import { CHF } from "@/lib/currency";
import type { CityInput } from "@/lib/city-content";
import { genevaTakeHomeMonthly, INTERNATIONAL_TAX_LABELS } from "@/lib/tax";
import { createDriveModel } from "@/lib/drive-time";
import { GENEVA_COMMUNES } from "@/lib/geneva/communes";
import { GENEVA_NEIGHBOURHOODS } from "@/lib/geneva/data/neighbourhoods";
import {
  GENEVA_COMMUTE_TIMES,
  GENEVA_DESTINATIONS,
  GENEVA_TRANSIT_KMH,
} from "@/lib/geneva/commute";
import {
  GENEVA_RENT_CHF,
  GENEVA_RENT_NOTE,
  GENEVA_RENT_REFERENCE_MONTH,
  GENEVA_RENT_REVIEW_AS_OF,
  GENEVA_RENT_SOURCES,
  GENEVA_ROOM_AVERAGE_CHF,
  GENEVA_ROOM_DISTRICT_LABELS,
} from "@/lib/geneva/data/rent-market";
import {
  GENEVA_LOCAL_COSTS,
  GENEVA_LOCAL_COSTS_SOURCES,
} from "@/lib/geneva/data/local-costs";
import {
  GENEVA_LIFESTYLE_PAGES,
  GENEVA_TRAVEL_BAND_DESCRIPTIONS,
  GENEVA_TRAVEL_BAND_DISTANCE_KM,
  GENEVA_TRAVEL_BAND_RATIONALE,
} from "@/lib/geneva/travel-band";
import { GENEVA_GUIDES } from "@/lib/geneva/data/guides";

const AREAS = GENEVA_NEIGHBOURHOODS;

/** Each grouping carries its own advertised-market baseline. */
const BASELINE_FOR_COUNCIL = Object.fromEntries(
  GENEVA_COMMUNES.map((c) => [c, c]),
);

const ROOM_DISTRICT_FOR_AREA = Object.fromEntries(
  AREAS.map((a) => [a.id, a.roomDistrict]),
);

/**
 * Driving around Geneva. Low circuity — the canton is compact and flat
 * along the lake — but a brutal arrival penalty in the centre, where
 * parking is scarce, metered and expensive by design. The border
 * crossings are the other big term: at peak they add fifteen to twenty
 * minutes that no distance model would otherwise predict, which is why
 * the French communes carry their own corridor speed.
 */
const DRIVE_MODEL = createDriveModel(AREAS, GENEVA_DESTINATIONS, {
  circuity: 1.28,
  peakKmh: 28,
  arrivalPenaltyMinutes: {
    default: 8,
    cornavin: 22,
    banking: 25,
    hug: 12,
    nations: 12,
    // Out-of-town sites with their own staff car parks.
    cern: 6,
    "plan-les-ouates": 6,
    airport: 10,
    "annemasse-centre": 10,
  },
  corridors: [
    // The A1 and the airport approach run freely off-peak.
    { destinationIds: ["cern", "airport"], kmh: 40 },
  ],
});

export const GENEVA_INPUT: CityInput = {
  city: CITIES.geneva,
  currency: CHF,

  copy: {
    regionLabel: "Geneva",
    homeH1: "Where to live in Geneva, for British arrivals",
    homeIntro:
      "Geneva is a city of two hundred thousand people with the housing market of one three times the size, and a border running through the middle of its commuter belt. The canton's vacancy rate has sat below half a percent for years, which is why roughly a hundred thousand people cross the French frontier to work here every day — a two-bed in Annemasse costs about half what the same flat costs fifteen minutes away in Eaux-Vives.",
    homeMetaDescription:
      "Where to live in Geneva if you are moving from the UK — rent, commute and cost of living across the canton and the French border communes, with permits, health insurance and tax explained.",
    homeFaqs: [
      {
        question: "Can British citizens still move to Geneva after Brexit?",
        answer:
          "Yes, but as third-country nationals. A Swiss employer must sponsor your work permit before you move — you cannot apply yourself or arrive and then job-hunt — and the permit is subject to an annual quota. Britons already resident before free movement ended are covered by the separate UK–Swiss Citizens' Rights Agreement.",
      },
      {
        question: "Should I live in Switzerland or across the border in France?",
        answer:
          "It is the biggest housing decision here and it turns on more than rent. France is roughly half the price for a fifteen-minute commute on the Léman Express, but you need a French residence permit as well as a Swiss cross-border G permit, you file tax in both countries, and you choose once between Swiss and French health cover. For many people the trade is clearly worth it; it is not a decision to make on the rent figure alone.",
      },
      {
        question: "What is the biggest cost British arrivals forget?",
        answer:
          "Health insurance. It is compulsory, private, charged per person rather than per household and not deducted from your salary — roughly CHF 460 a month per adult in Geneva, the most expensive canton in Switzerland. A family of four pays four premiums, and cover is backdated to your arrival date whether you signed up on time or not.",
      },
    ],

    commuteIntro:
      "Geneva's public transport is genuinely good — TPG runs at high frequency and the Léman Express opened in 2019 as a proper cross-border suburban railway — but the network was built to funnel everyone through the centre, and two of the canton's largest employers sit at opposite ends of it. CERN and the Plan-les-Ouates life-sciences cluster are both awkward to reach from the other's side, so start from where you will actually work.",
    commuteMethod: [
      "The figures are typical weekday-morning door-to-door times — walking to the stop, waiting, riding, and walking off at the other end. They are not timetable times.",
      "The assumed average speed behind the distance fallback is the highest used anywhere on this site, because Geneva earns it: the city is small, tram frequencies are high, and the Léman Express runs every fifteen minutes on the core. What the model does not capture is the border. A car crossing at Bardonnex or Moillesulaz at eight in the morning can lose twenty minutes to a queue that no distance calculation predicts, which is a large part of why the train is the right answer from France.",
    ],

    rentMethod: [
      "There is no ONS here. OCSTAT publishes a cantonal rent survey, but it measures the whole stock including tenancies decades old under a regime where sitting rents barely move — and the gap between that and what is actually advertised is far wider than the equivalent gap in England. The figures on these pages are advertised-market estimates from listing samples, anchored on the published averages for direction rather than level, because they describe what a new arrival will actually be quoted.",
      "The French communes are converted from euros at the stored rate in the currency module, which is an approximation with a review date rather than a live rate. Every page that shows a converted figure says so.",
    ],
    roomMethod: [
      "Sharing is markedly less normal in Geneva than in Britain: the stock is flats rather than houses, and the standard Swiss lease does not contemplate a rotating set of tenants. It is still how a great many arriving anglophones start, through Glocals and the international-organisation networks, so the figures are here — but they come from thinner samples than the UK equivalents and should be treated as indicative.",
    ],

    councilTaxMethod: [
      "There is no council tax in Switzerland, and nothing corresponds to it. A tenant pays no occupier property tax at all, which is genuinely good news and also the point at which a British reader should keep reading rather than stopping.",
      "What replaces it is larger. Compulsory private health insurance runs to roughly CHF 460 a month per adult in Geneva and is charged per person, not per household. Service charges are quoted separately from rent and add around CHF 250 a month. The Serafe broadcasting fee is CHF 335 a year per household and arrives automatically once you register your address. Together these come to more than a council tax bill and none of them is deducted from your salary.",
      "There is one genuine geographic tax variable here, and it is not on the property: Geneva's 45 communes each set their own multiplier on cantonal income tax, and the range across the canton is roughly a factor of two. On a high salary that difference can outweigh a moderate difference in rent — but it scales with what you earn rather than with where you live, so it is covered in the guides rather than shown as a per-commune table here.",
    ],

    councilsIntro:
      "Grouped the way the decision is actually made rather than by administrative tidiness. Canton Geneva has 45 communes, which is more granularity than anyone needs; what matters far more is which country you are in. France voisine and the canton of Vaud sit in this list alongside the Geneva communes because they are real options for someone working here — and they are separate tax jurisdictions, separate healthcare systems and, for a British passport holder, separate immigration regimes.",

    lifestyleIntro:
      "Eight cuts through the same ten lifestyle measures. Two of them exist only in this section: living on the French side is a live question for almost every arrival, and Geneva's international-organisation quarter creates a kind of neighbourhood — transient, anglophone, expensive, close to the airport — with needs no British city has.",

    compareIntro:
      "Not every possible pair — only the ones that are a genuine either/or: near enough that the same job is commutable from both, close enough in rent that price alone does not decide it, and in the same or an adjoining travel band. Several of these pairs cross the border, which is exactly the comparison most people arriving here are actually making.",

    couplesIntro: [
      "Geneva makes this easier than most cities on distance and harder than most on everything else. The canton is small enough that almost anywhere reaches almost anywhere in half an hour — but if one of you works at CERN and the other at Plan-les-Ouates, you are at opposite ends of it, and the network was not built to connect them.",
      "Pick two workplaces, a commute cap each, a shared budget and a shared idea of the kind of area you want. The ranking favours fair compromises: an area where one of you has a fifteen-minute journey and the other an hour scores worse than one where you both have half an hour.",
    ],

    roomIncludesNote:
      "Rooms here rarely include anything beyond utilities, and never health insurance — that follows the person, not the flat, and is charged separately whatever your housing arrangement.",
    rentExtrasNote:
      "the service charges, health insurance and broadcasting fee set out in the local costs table, which together run to well over CHF 700 a month for a single adult",

    extraLimits: [
      {
        title: "Immigration.",
        body: "Nothing on this site is immigration advice, and for Geneva that limit matters more than anywhere else covered here. Whether you can live in a given area may depend on a permit you do not yet have. The guides explain the shape of the system and point at the official sources; they are not a substitute for them.",
      },
      {
        title: "Which side of the border you can actually choose.",
        body: "The rankings treat French and Swiss areas as comparable options, because on rent and commute they are. Legally they are not interchangeable: living in France requires a French residence permit as well as a Swiss cross-border permit, and a job offer in Geneva gives you neither automatically.",
      },
      {
        title: "Schools.",
        body: "Not scored anywhere on this site, and in Geneva it is the largest financial variable after rent. The Swiss state system is free, excellent and taught in French; international school fees can exceed the annual cost of a flat.",
      },
    ],
  },

  areas: AREAS,

  councils: GENEVA_COMMUNES,
  councilNoun: { singular: "area", plural: "areas" },
  regionName: "Geneva",

  destinations: GENEVA_DESTINATIONS,

  travelBands: {
    descriptions: GENEVA_TRAVEL_BAND_DESCRIPTIONS,
    distances: GENEVA_TRAVEL_BAND_DISTANCE_KM,
    rationale: GENEVA_TRAVEL_BAND_RATIONALE,
  },

  commuteTimes: GENEVA_COMMUTE_TIMES,
  driveTimes: DRIVE_MODEL,
  transitKmh: GENEVA_TRANSIT_KMH,

  rent: {
    reviewedAsOf: GENEVA_RENT_REVIEW_AS_OF,
    baselineLabel: "the advertised-market average",
    referenceMonth: GENEVA_RENT_REFERENCE_MONTH,
    baselines: GENEVA_RENT_CHF,
    baselineForCouncil: BASELINE_FOR_COUNCIL,
    roomAverages: GENEVA_ROOM_AVERAGE_CHF,
    roomLabels: GENEVA_ROOM_DISTRICT_LABELS,
    roomDistrictForArea: ROOM_DISTRICT_FOR_AREA,
    sources: GENEVA_RENT_SOURCES,
    note: GENEVA_RENT_NOTE,
  },

  // No councilTax: Switzerland levies no occupier property tax at all.
  localCosts: {
    heading: "What you pay beyond rent",
    intro:
      "There is no council tax in Switzerland. What replaces it is larger, and almost none of it is deducted from your salary — which is why this table matters more to a British reader than any other on the site. Note that these are the Swiss-side figures: if you live in France on a cross-border permit you make a one-time choice between the Swiss and French health systems within three months, and the French option is usually substantially cheaper. The cross-border guide covers that decision.",
    rows: GENEVA_LOCAL_COSTS,
    sources: GENEVA_LOCAL_COSTS_SOURCES,
  },

  guides: GENEVA_GUIDES,
  lifestylePages: GENEVA_LIFESTYLE_PAGES,

  /**
   * In francs. It starts at CHF 45,000 — low for Geneva, and deliberately
   * so, because that is a real hospitality or retail salary here and the
   * page's honest answer at that level is that no flat in the canton
   * fits. It stops at CHF 120,000, one rung past the point where every
   * area does.
   *
   * Note that the landlords' three-times-annual-rent screening rule
   * bites well before the 35% guideline, so the number of areas that
   * "fit" overstates the number that would accept your file.
   */
  salaryLevels: [45000, 55000, 63000, 71000, 79000, 87000, 95000, 108000],

  takeHomeMonthly: genevaTakeHomeMonthly,
  taxRegimeLabel: INTERNATIONAL_TAX_LABELS.geneva,

  comparePairs: [
    {
      title: "The border decision",
      description:
        "The comparison almost everyone arriving here actually makes, and the one with a permit, a tax return and a healthcare election attached.",
      pairs: [
        ["annemasse", "vernier"],
        ["ferney-voltaire", "meyrin"],
        ["annemasse", "saint-julien"],
      ],
    },
    {
      title: "Inside the city",
      description:
        "Close calls within the Ville de Genève and the communes that run straight into it.",
      pairs: [
        ["eaux-vives", "champel"],
        ["paquis", "grottes"],
        ["carouge", "jonction"],
        ["lancy", "acacias"],
      ],
    },
    {
      title: "Out along the lake",
      description:
        "The Vaud and lakeside options, where a lower tax multiplier is often the real argument.",
      pairs: [
        ["nyon", "coppet"],
        ["versoix", "cologny"],
      ],
    },
  ],
};
