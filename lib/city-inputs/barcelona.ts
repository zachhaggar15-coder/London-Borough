import { CITIES } from "@/lib/cities";
import { EUR } from "@/lib/currency";
import type { CityInput } from "@/lib/city-content";
import { cataloniaTakeHomeMonthly, INTERNATIONAL_TAX_LABELS } from "@/lib/tax";
import { createDriveModel } from "@/lib/drive-time";
import { BARCELONA_NEIGHBOURHOODS } from "@/lib/barcelona/data/neighbourhoods";
import {
  BARCELONA_COMMUTE_TIMES,
  BARCELONA_DESTINATIONS,
  BARCELONA_TRANSIT_KMH,
} from "@/lib/barcelona/commute";
import {
  BARCELONA_DISTRICTS,
  BARCELONA_LOCAL_COSTS,
  BARCELONA_LOCAL_COSTS_SOURCES,
  BARCELONA_RENT_EUR,
  BARCELONA_RENT_NOTE,
  BARCELONA_RENT_REFERENCE_MONTH,
  BARCELONA_RENT_REVIEW_AS_OF,
  BARCELONA_RENT_SOURCES,
  BARCELONA_ROOM_AVERAGE_EUR,
  BARCELONA_ROOM_DISTRICT_LABELS,
} from "@/lib/barcelona/data/market";
import {
  BARCELONA_LIFESTYLE_PAGES,
  BARCELONA_TRAVEL_BAND_DESCRIPTIONS,
  BARCELONA_TRAVEL_BAND_DISTANCE_KM,
  BARCELONA_TRAVEL_BAND_RATIONALE,
} from "@/lib/barcelona/travel-band";
import { BARCELONA_GUIDES } from "@/lib/barcelona/data/guides";

const AREAS = BARCELONA_NEIGHBOURHOODS;

const BASELINE_FOR_COUNCIL = Object.fromEntries(
  BARCELONA_DISTRICTS.map((d) => [d, d]),
);

const ROOM_DISTRICT_FOR_AREA = Object.fromEntries(
  AREAS.map((a) => [a.id, a.roomDistrict]),
);

/**
 * Driving in Barcelona. The grid is efficient and the ronda ring roads
 * are fast, so the peak speed is higher than Paris — but parking in the
 * Eixample and Ciutat Vella is scarce and the city has been steadily
 * removing it under the superilla programme, so the arrival penalties
 * in the centre are severe.
 *
 * Collserola is the geographic fact the model has to respect: Sant Cugat
 * is twelve kilometres away and on the far side of a mountain, so the
 * circuity here is higher than the flat coastal city suggests.
 */
const DRIVE_MODEL = createDriveModel(AREAS, BARCELONA_DESTINATIONS, {
  circuity: 1.33,
  peakKmh: 26,
  arrivalPenaltyMinutes: {
    default: 10,
    "placa-catalunya": 25,
    diagonal: 18,
    "hospital-clinic": 15,
    "sants-estacio": 15,
    // Purpose-built districts and out-of-town sites with parking.
    "22at": 10,
    "zona-franca": 5,
    aeroport: 8,
    "sant-cugat": 8,
  },
  corridors: [
    // The Ronda de Dalt through the Vallvidrera tunnels, and the C-32
    // and B-20 along the coast.
    { destinationIds: ["sant-cugat", "aeroport", "zona-franca"], kmh: 45 },
  ],
});

export const BARCELONA_INPUT: CityInput = {
  city: CITIES.barcelona,
  currency: EUR,

  copy: {
    regionLabel: "Barcelona",
    homeH1: "Where to live in Barcelona, for British arrivals",
    homeIntro:
      "Barcelona is compact, flat along the coast, exceptionally well served by its metro, and in the middle of a public argument about who its housing is for. Local salaries are low by northern European standards and rents are not — which is why the city has capped rents, capped tourist flats, and why an arriving foreigner on a foreign salary is a participant in that argument whether they intended to be or not.",
    homeMetaDescription:
      "Where to live in Barcelona if you are moving from the UK — rent, commute and cost of living by barri and district, with visas, the NIE, rent caps and Catalan tax explained.",
    homeFaqs: [
      {
        question: "Can British citizens still move to Barcelona after Brexit?",
        answer:
          "Yes, with a long-stay visa applied for from the UK before travelling. Spain offers more routes than most EU countries — work, digital nomad, non-lucrative, student and family reunification — and for remote workers the digital nomad visa is usually the most straightforward. Without a visa you are limited to 90 days in any rolling 180 across the whole Schengen area, counted automatically at the border since April 2026.",
      },
      {
        question: "Do tenants in Barcelona pay a council tax?",
        answer:
          "No. IBI, the Spanish property tax, falls on the owner, as do the comunidad building charges. The catch is that Spanish law allows a contract to shift either to the tenant in the gastos generales clause, and some do — so read that clause rather than assuming.",
      },
      {
        question: "Are Barcelona rents really capped?",
        answer:
          "Yes. Catalonia has declared Barcelona a stressed-market area, so a landlord setting a new contract must reference the INCASÒL price index and is capped accordingly. The index is built from registered deposits — contracts actually signed — so it sits below what the portals advertise. Look it up for the specific address before you sign.",
      },
    ],

    commuteIntro:
      "Barcelona's metro is one of the best in Europe for a city of its size — twelve lines, frequent, and a monthly pass covering the whole metropolitan area for less than a fifth of the London equivalent. The city is compact enough that the commute rarely decides where you live, with two exceptions: 22@ in Poblenou has pulled employment decisively east, and anything beyond Collserola depends on the FGC tunnel through the hill.",
    commuteMethod: [
      "The figures are typical weekday-morning door-to-door times — walking to the station, waiting, riding, and walking off at the other end. Metro headways of two to five minutes at peak keep the waiting term small.",
      "What the model does not capture is that Barcelona is often quicker on foot or by bike than the times suggest. The city is flat along the coast, the grid is walkable, and the bike lane network has expanded substantially — for journeys under about three kilometres the metro frequently loses.",
    ],

    rentMethod: [
      "The anchor is the INCASÒL índex de referència, published by the Generalitat from registered rental deposits — that is, from contracts that were actually signed rather than prices that were merely asked. It is a genuinely strong dataset and it underpins the rent cap, so it is both the statistical baseline and the legal one.",
      "It sits meaningfully below portal asking prices — roughly €15.90 per square metre against about €19 advertised — and both numbers are real. The index is what the law works from; the portal figure is what you will see first. The area-level figures here are reviewed estimates against the index at typical sizes.",
    ],
    roomMethod: [
      "Room shares are completely normal in Barcelona and the market is large, particularly in the Eixample and Gràcia where the flats are big enough to divide. The figures come from listing samples on Idealista and the room platforms rather than from the INCASÒL series, which covers whole-property contracts only.",
    ],

    councilTaxMethod: [
      "There is no council tax for a tenant in Spain. IBI, the property tax, is levied on the owner, and the comunidad building charges are normally the owner's too — so the default position is that you pay neither.",
      "The exception is one a British reader will not think to look for. Spanish law permits the parties to agree that the tenant bears IBI and the comunidad, and some contracts do exactly that in the gastos generales clause. If IBI is passed on it typically adds €40 to €90 a month, so the clause is worth reading before you sign.",
      "Barcelona has also introduced a separate household waste charge, collected with the water bill. It is modest, but it is recent enough that older guides do not mention it.",
    ],

    councilsIntro:
      "Barcelona has ten administrative districts; eight are here, with the two outer northern ones grouped and the metropolitan municipalities added as a ninth. Those last matter for the same reason the petite couronne matters in Paris — L'Hospitalet adjoins the city so directly that the boundary is invisible on the ground, and the metro crosses it without noticing.",

    lifestyleIntro:
      "Eight cuts through the same ten lifestyle measures. Two are shaped by things specific to this city: the beach, which changes what a neighbourhood is for in a way no British city has to consider, and tourism pressure, which makes quiet a question about short-let density as much as about traffic.",

    compareIntro:
      "Not every possible pair — only the ones that are a genuine either/or: near enough that the same job is commutable from both, close enough in rent that price alone does not decide it, and in the same or an adjoining travel band. In a city this compact and this well connected, that still leaves plenty of real decisions.",

    couplesIntro: [
      "Barcelona is small and its metro is dense, so two people working at opposite ends of the city are usually both within half an hour of a great many barris. The compromise that is painful in Bristol or Manchester is generally straightforward here.",
      "The exception is Collserola. If one of you works at Sant Cugat and the other in Poblenou you are on opposite sides of a mountain, and the FGC tunnel is the only quick way through — which makes the Zona Alta the answer far more often than the map suggests.",
    ],

    roomIncludesNote:
      "A room in a shared flat here usually includes bills and internet, and since IBI and comunidad fall on the owner by default there is no local tax to add — which makes sharing genuinely cheap relative to northern Europe.",
    rentExtrasNote:
      "utilities, the new municipal waste charge and — if the contract's gastos generales clause says so — IBI and comunidad, which are otherwise the owner's",

    extraLimits: [
      {
        title: "Immigration and tax residence.",
        body: "Nothing here is immigration or tax advice. Spanish procedure varies by consulate and changes often, and the 183-day tax-residence rule catches people who never intended to trigger it. The guides explain the shape of both and point at the official sources.",
      },
      {
        title: "Language of schooling.",
        body: "Not scored anywhere on this site, and in Catalonia it is a real decision rather than a detail: state schools teach in Catalan, not Spanish. For a child arriving with neither, that is a bigger adjustment than the neighbourhood.",
      },
      {
        title: "Tourist lets.",
        body: "Some of what is marketed as a long-term flat is a seasonal let that will not be available in June. Check that the contract is an arrendamiento de vivienda habitual rather than a temporada, because the legal protections are entirely different.",
      },
    ],
  },

  areas: AREAS,

  councils: BARCELONA_DISTRICTS,
  councilNoun: { singular: "district", plural: "districts" },
  regionName: "Barcelona",

  destinations: BARCELONA_DESTINATIONS,

  travelBands: {
    descriptions: BARCELONA_TRAVEL_BAND_DESCRIPTIONS,
    distances: BARCELONA_TRAVEL_BAND_DISTANCE_KM,
    rationale: BARCELONA_TRAVEL_BAND_RATIONALE,
  },

  commuteTimes: BARCELONA_COMMUTE_TIMES,
  driveTimes: DRIVE_MODEL,
  transitKmh: BARCELONA_TRANSIT_KMH,

  rent: {
    reviewedAsOf: BARCELONA_RENT_REVIEW_AS_OF,
    baselineLabel: "the INCASÒL index",
    referenceMonth: BARCELONA_RENT_REFERENCE_MONTH,
    baselines: BARCELONA_RENT_EUR,
    baselineForCouncil: BASELINE_FOR_COUNCIL,
    roomAverages: BARCELONA_ROOM_AVERAGE_EUR,
    roomLabels: BARCELONA_ROOM_DISTRICT_LABELS,
    roomDistrictForArea: ROOM_DISTRICT_FOR_AREA,
    sources: BARCELONA_RENT_SOURCES,
    note: BARCELONA_RENT_NOTE,
  },

  // No councilTax: IBI falls on the owner in Spain.
  localCosts: {
    heading: "What you pay beyond rent",
    intro:
      "There is no council tax for a tenant in Spain, and both of the charges a British reader might expect — IBI and the building comunidad — fall on the owner by default. The clause to read is gastos generales, which can lawfully shift either to you.",
    rows: BARCELONA_LOCAL_COSTS,
    sources: BARCELONA_LOCAL_COSTS_SOURCES,
  },

  guides: BARCELONA_GUIDES,
  lifestylePages: BARCELONA_LIFESTYLE_PAGES,

  /**
   * The lowest ladder on the site, and deliberately so. Spanish salaries
   * are low and Barcelona's rents are not, which is the central fact
   * about affordability here and the reason the city capped rents. A
   * ladder pitched at British levels would make the section useless to
   * anyone taking a local job.
   */
  salaryLevels: [22000, 28000, 34000, 40000, 48000, 58000, 70000, 85000],

  takeHomeMonthly: cataloniaTakeHomeMonthly,
  taxRegimeLabel: INTERNATIONAL_TAX_LABELS.barcelona,

  comparisonsPerArea: 3,
};
