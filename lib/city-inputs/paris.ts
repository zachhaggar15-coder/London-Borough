import { CITIES } from "@/lib/cities";
import { EUR } from "@/lib/currency";
import type { CityInput } from "@/lib/city-content";
import { franceTakeHomeMonthly, INTERNATIONAL_TAX_LABELS } from "@/lib/tax";
import { createDriveModel } from "@/lib/drive-time";
import { PARIS_NEIGHBOURHOODS } from "@/lib/paris/data/neighbourhoods";
import {
  PARIS_COMMUTE_TIMES,
  PARIS_DESTINATIONS,
  PARIS_TRANSIT_KMH,
} from "@/lib/paris/commute";
import {
  PARIS_ARRONDISSEMENTS,
  PARIS_LOCAL_COSTS,
  PARIS_LOCAL_COSTS_SOURCES,
  PARIS_RENT_EUR,
  PARIS_RENT_NOTE,
  PARIS_RENT_REFERENCE_MONTH,
  PARIS_RENT_REVIEW_AS_OF,
  PARIS_RENT_SOURCES,
  PARIS_ROOM_AVERAGE_EUR,
  PARIS_ROOM_DISTRICT_LABELS,
} from "@/lib/paris/data/market";
import {
  PARIS_LIFESTYLE_PAGES,
  PARIS_TRAVEL_BAND_DESCRIPTIONS,
  PARIS_TRAVEL_BAND_DISTANCE_KM,
  PARIS_TRAVEL_BAND_RATIONALE,
} from "@/lib/paris/travel-band";
import { PARIS_GUIDES } from "@/lib/paris/data/guides";

const AREAS = PARIS_NEIGHBOURHOODS;

const BASELINE_FOR_COUNCIL = Object.fromEntries(
  PARIS_ARRONDISSEMENTS.map((a) => [a, a]),
);

const ROOM_DISTRICT_FOR_AREA = Object.fromEntries(
  AREAS.map((a) => [a.id, a.roomDistrict]),
);

/**
 * Driving in Paris, which is mostly an argument against driving in
 * Paris. The city has removed tens of thousands of parking spaces,
 * pedestrianised the riverbanks, imposed a 30 km/h limit across almost
 * the whole city and charges non-residents heavily to park — so the
 * arrival penalties here are the largest on the site and the peak speed
 * the lowest.
 *
 * The exceptions are the périphérique and the routes to La Défense and
 * the airport, where the car is a real option and the RER is the
 * competition rather than the métro.
 */
const DRIVE_MODEL = createDriveModel(AREAS, PARIS_DESTINATIONS, {
  circuity: 1.35,
  peakKmh: 22,
  arrivalPenaltyMinutes: {
    default: 20,
    // Central arrondissements: parking is scarce, metered and expensive
    // by design, and a resident permit does not help a visitor.
    chatelet: 30,
    opera: 28,
    "saint-lazare": 26,
    "gare-de-lyon": 22,
    montparnasse: 22,
    // Purpose-built with underground car parks.
    "la-defense": 12,
    issy: 10,
    cdg: 10,
  },
  corridors: [
    // The périphérique and A1/A3 to the airport, and the A14 west.
    { destinationIds: ["cdg", "la-defense"], kmh: 40 },
  ],
});

export const PARIS_INPUT: CityInput = {
  city: CITIES.paris,
  currency: EUR,

  copy: {
    regionLabel: "Paris",
    homeH1: "Where to live in Paris, for British arrivals",
    homeIntro:
      "Paris inside the périphérique is about a sixth the size of Greater London with 308 métro stations in it, which makes it the most walkable and best-connected city covered anywhere on this site. It is also the one where a British reader is most likely to be caught out by the paperwork: since Brexit you need a long-stay visa to live here at all, and the rental market runs on a dossier system that defeats a great many applicants before they see a flat.",
    homeMetaDescription:
      "Where to live in Paris if you are moving from the UK — rent, commute and cost of living by arrondissement and inner suburb, with visas, rent control and the dossier explained.",
    homeFaqs: [
      {
        question: "Can British citizens still move to Paris after Brexit?",
        answer:
          "Yes, with a long-stay visa applied for from the UK before you travel — most often the VLS-TS employee visa, which requires a French employment contract, or the visiteur route for those not working. Without one you are limited to 90 days in any rolling 180 across the whole Schengen area, and since April 2026 that is counted automatically at the border.",
      },
      {
        question: "Do tenants in Paris pay council tax?",
        answer:
          "No. The taxe d'habitation was abolished on main residences in 2023, so a tenant in their principal home pays no residence tax at all. You will pay building charges, usually the household waste tax, and compulsory home insurance — but nothing corresponding to a council tax bill.",
      },
      {
        question: "Is it worth living just outside the Paris boundary?",
        answer:
          "Often, and more so than in most cities, because the boundary is a road rather than a distance. The métro crosses it freely: Montreuil is on line 9, Saint-Ouen is eight minutes from Saint-Lazare on line 14, and both are meaningfully cheaper than the arrondissements they adjoin. Montreuil is routinely called the 21st arrondissement for a reason.",
      },
    ],

    commuteIntro:
      "Paris has the densest urban rail network of any city on this site and it changes what the question means: almost everywhere inside the boundary is twenty minutes from almost everywhere else, so the commute rarely decides where you live. What does decide it is which side of the périphérique you are on, and whether your line is one of the good ones or one of the slow ones — the 13 and the 7bis are not the 1 and the 14.",
    commuteMethod: [
      "The figures are typical weekday-morning door-to-door times — walking to the station, waiting, riding, and walking off at the other end. Métro headways of two to four minutes at peak mean the waiting term is small here in a way it is not in any British city outside London.",
      "The assumed speed behind the distance fallback is the highest on this site, and Paris earns it. What the model does not capture is RER reliability: the A and B lines carry more passengers than the entire Manchester network and a bad morning on either adds half an hour that no timetable predicts. For anything relying on the RER, treat the figure as a good day.",
    ],

    rentMethod: [
      "Paris rents are legally capped, which makes this the only section on the site where the published reference figure is a binding maximum rather than an observation. The encadrement des loyers sets a ceiling per square metre for each combination of zone, property type, room count, construction period and furnishing, and a rent above it is unlawful and recoverable.",
      "The figures here are derived from the published per-square-metre medians at typical sizes — around 38 m² for a one-bedroom and 60 m² for a two-bedroom. Note that the French convention counts rooms rather than bedrooms: a T2 is a one-bedroom flat. Furnished lets carry a higher legal ceiling than unfurnished ones, which is why so much of the market is furnished.",
    ],
    roomMethod: [
      "Room shares are less established in Paris than in Britain — the colocation market exists but the stock is small flats rather than large houses, so a four-bedroom share is rare. The figures come from listing samples on the colocation platforms and are indicative rather than a published series.",
    ],

    councilTaxMethod: [
      "There is no council tax in France for a tenant in their main home. The taxe d'habitation was abolished on principal residences in 2023 and now applies only to second homes — on which Paris levies a substantial surcharge. For a British reader this is the single most pleasant surprise in the whole move.",
      "The taxe foncière, the other French property tax, falls on the owner and is not recoverable from the tenant. What you do pay is the provision sur charges, quoted separately from rent and reconciled annually, plus the household waste tax which landlords may lawfully pass on and generally do.",
      "One genuinely compulsory cost that has no British equivalent: home insurance. A French tenant must hold it and prove it annually, and failing to do so is grounds for terminating the lease.",
    ],

    councilsIntro:
      "Grouped the way the rent-control zones and the market itself group them, rather than one entry per arrondissement — the twenty individually are too fine a grain to be useful and too coarse to be accurate, since the 18th contains both Montmartre and the Goutte d'Or. The petite couronne is here as a ninth grouping because for anyone priced out of the city it is the real alternative, and the métro crosses the boundary as though it were not there.",

    lifestyleIntro:
      "Eight cuts through the same ten lifestyle measures. Two are shaped by things no British city has: a legally binding rent cap, which makes value a question about compliance as much as price, and a boundary road that divides the housing market more sharply than any distance does.",

    compareIntro:
      "Not every possible pair — only the ones that are a genuine either/or: near enough that the same job is commutable from both, close enough in rent that price alone does not decide it, and in the same or an adjoining travel band. In a city this compact that still leaves a great many real decisions.",

    couplesIntro: [
      "Paris makes this unusually easy. The city is small and the métro is dense, so two people working at opposite ends of it are still both within half an hour of most of the inner arrondissements — the compromise that is agonising in Manchester or Bristol is routine here.",
      "The exception is La Défense. It sits outside the city on the RER A, and pairing it with somewhere in the east of Paris produces genuinely awkward answers. Pick two workplaces, a commute cap each and a shared budget, and the ranking will favour fair compromises over ones that suit whoever has the easier journey.",
    ],

    roomIncludesNote:
      "A colocation here usually includes charges and often internet, but never the compulsory home insurance, which each tenant holds individually.",
    rentExtrasNote:
      "the building charges, waste tax and compulsory home insurance set out in the local costs table, which come to roughly €160 a month",

    extraLimits: [
      {
        title: "Immigration.",
        body: "Nothing here is immigration advice, and since Brexit the stakes are real: a British citizen without a long-stay visa has 90 days in any 180 across the whole Schengen area, counted automatically at the border since April 2026. The guides explain the shape of the system and point at the official sources.",
      },
      {
        title: "Floor area.",
        body: "Nothing on this site scores space, and in Paris it is the binding constraint. A one-bedroom here is typically 35 to 40 square metres — smaller than most British studios — and comparing monthly rents without comparing square metres will mislead you badly.",
      },
      {
        title: "Which floor, and which side.",
        body: "A courtyard-facing flat on the fifth floor with a lift is a different proposition from a street-facing second floor without one, in the same building at the same rent. No area-level score captures it, and in Paris it matters more than the arrondissement.",
      },
    ],
  },

  areas: AREAS,

  councils: PARIS_ARRONDISSEMENTS,
  councilNoun: { singular: "quarter", plural: "quarters" },
  regionName: "Paris",

  destinations: PARIS_DESTINATIONS,

  travelBands: {
    descriptions: PARIS_TRAVEL_BAND_DESCRIPTIONS,
    distances: PARIS_TRAVEL_BAND_DISTANCE_KM,
    rationale: PARIS_TRAVEL_BAND_RATIONALE,
  },

  commuteTimes: PARIS_COMMUTE_TIMES,
  driveTimes: DRIVE_MODEL,
  transitKmh: PARIS_TRANSIT_KMH,

  rent: {
    reviewedAsOf: PARIS_RENT_REVIEW_AS_OF,
    baselineLabel: "the published reference rent",
    referenceMonth: PARIS_RENT_REFERENCE_MONTH,
    baselines: PARIS_RENT_EUR,
    baselineForCouncil: BASELINE_FOR_COUNCIL,
    roomAverages: PARIS_ROOM_AVERAGE_EUR,
    roomLabels: PARIS_ROOM_DISTRICT_LABELS,
    roomDistrictForArea: ROOM_DISTRICT_FOR_AREA,
    sources: PARIS_RENT_SOURCES,
    note: PARIS_RENT_NOTE,
  },

  // No councilTax: taxe d'habitation was abolished on main residences.
  localCosts: {
    heading: "What you pay beyond rent",
    intro:
      "There is no council tax in France for a tenant in their main home — genuinely none. What replaces it is smaller than a British council tax bill but is not nothing, and one line of it is legally compulsory in a way no British equivalent is.",
    rows: PARIS_LOCAL_COSTS,
    sources: PARIS_LOCAL_COSTS_SOURCES,
  },

  guides: PARIS_GUIDES,
  lifestylePages: PARIS_LIFESTYLE_PAGES,

  /**
   * In euros, and lower than the Geneva ladder by a long way because
   * French gross salaries are lower — the comparison that misleads
   * British readers most. The landlord convention of three times the
   * rent in *net* income bites well before the 35% guideline.
   */
  salaryLevels: [30000, 36000, 42000, 48000, 55000, 62000, 70000, 82000],

  takeHomeMonthly: franceTakeHomeMonthly,
  taxRegimeLabel: INTERNATIONAL_TAX_LABELS.paris,

  comparePairs: [
    {
      title: "The classic Paris decisions",
      description:
        "Close calls inside the boundary, where the difference is usually floor area and which floor you are on.",
      pairs: [
        ["marais", "les-halles"],
        ["oberkampf", "bastille"],
        ["canal-saint-martin", "south-pigalle"],
        ["montmartre", "batignolles"],
      ],
    },
    {
      title: "Value in the east and south",
      description:
        "For anyone weighing the cheaper arrondissements against each other.",
      pairs: [
        ["belleville", "charonne"],
        ["butte-aux-cailles", "gobelins"],
        ["montparnasse", "commerce"],
      ],
    },
    {
      title: "Across the périphérique",
      description:
        "The boundary is a road and the métro crosses it, which makes these the most consequential comparisons on the page.",
      pairs: [
        ["montreuil", "pantin"],
        ["saint-ouen", "levallois"],
        ["vincennes", "boulogne"],
      ],
    },
  ],
};
