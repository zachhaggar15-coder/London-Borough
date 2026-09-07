import type { BedroomBaseline, LocalCost } from "@/lib/city-content";

/**
 * Barcelona districts, rents and local costs.
 *
 * Barcelona has ten administrative districts. Eight of them are here,
 * with the two outer northern ones grouped, plus the metropolitan
 * municipalities beyond the city boundary — which matter for the same
 * reason the petite couronne matters in Paris: the metro crosses the
 * boundary and the rent drops noticeably on the far side.
 */
export const BARCELONA_DISTRICTS = [
  "Ciutat Vella",
  "Eixample",
  "Gràcia",
  "Sants-Montjuïc",
  "Sarrià-Sant Gervasi",
  "Sant Martí",
  "Horta & Nou Barris",
  "Àrea metropolitana",
] as const;

export const BARCELONA_RENT_REVIEW_AS_OF = "2026-09-07";
export const BARCELONA_RENT_REFERENCE_MONTH = "July 2026";

export const BARCELONA_RENT_SOURCES = [
  "INCASÒL índex de referència de preus de lloguer, published by the Generalitat de Catalunya from registered deposits",
  "Ajuntament de Barcelona open data on average rent per square metre by district",
  "Idealista, Fotocasa and Habitaclia visible listing samples, July 2026",
] as const;

export const BARCELONA_RENT_NOTE =
  "Catalonia caps rents in declared stressed-market areas, which cover essentially all of Barcelona, and landlords must reference the INCASÒL index when setting a new contract. The index is built from registered deposits — actual signed contracts — so it sits meaningfully below what portals advertise. Both numbers are real: the index is what the law works from, and the portal figure is what you will see first.";

/**
 * Average monthly rent by district, in euros.
 *
 * Derived from the INCASÒL per-square-metre index at typical sizes —
 * around 55 m² for a one-bedroom and 75 m² for a two-bedroom, which are
 * larger than the Paris equivalents because Barcelona's stock is. The
 * city average sits around €15.90/m² on registered contracts against
 * roughly €19/m² on portal asking prices.
 */
export const BARCELONA_RENT_EUR: Record<string, BedroomBaseline> = {
  "Ciutat Vella": { oneBed: 1050, twoBed: 1350, threeBed: 1700, allProperties: 1300 },
  Eixample: { oneBed: 1150, twoBed: 1500, threeBed: 1900, allProperties: 1450 },
  Gràcia: { oneBed: 1100, twoBed: 1400, threeBed: 1750, allProperties: 1350 },
  "Sants-Montjuïc": { oneBed: 950, twoBed: 1250, threeBed: 1550, allProperties: 1200 },
  "Sarrià-Sant Gervasi": { oneBed: 1300, twoBed: 1700, threeBed: 2200, allProperties: 1750 },
  "Sant Martí": { oneBed: 1000, twoBed: 1300, threeBed: 1650, allProperties: 1250 },
  "Horta & Nou Barris": { oneBed: 850, twoBed: 1100, threeBed: 1400, allProperties: 1050 },
  "Àrea metropolitana": { oneBed: 800, twoBed: 1050, threeBed: 1300, allProperties: 1000 },
};

export type BarcelonaRoomDistrict =
  | "ciutat-vella"
  | "eixample"
  | "gracia"
  | "sants"
  | "poble-sec"
  | "sarria"
  | "poblenou"
  | "clot"
  | "horta"
  | "nou-barris"
  | "metropolitana";

export const BARCELONA_ROOM_DISTRICT_LABELS: Record<BarcelonaRoomDistrict, string> = {
  "ciutat-vella": "Ciutat Vella — Gòtic, Born, Raval",
  eixample: "Eixample — Dreta and Esquerra",
  gracia: "Gràcia and Vila de Gràcia",
  sants: "Sants and Hostafrancs",
  "poble-sec": "Poble-sec and Montjuïc",
  sarria: "Sarrià, Sant Gervasi and Gràcia Nova",
  poblenou: "Poblenou and the Vila Olímpica",
  clot: "El Clot and Sant Andreu",
  horta: "Horta-Guinardó",
  "nou-barris": "Nou Barris",
  metropolitana: "L'Hospitalet, Badalona and the metropolitan belt",
};

export const BARCELONA_ROOM_AVERAGE_EUR: Record<BarcelonaRoomDistrict, number> = {
  "ciutat-vella": 620,
  eixample: 650,
  gracia: 620,
  sants: 550,
  "poble-sec": 560,
  sarria: 680,
  poblenou: 580,
  clot: 520,
  horta: 490,
  "nou-barris": 450,
  metropolitana: 460,
};

/**
 * What a Barcelona tenant pays beyond rent.
 *
 * As in France, there is no occupier property tax: the IBI falls on the
 * owner. Unlike France, a Spanish lease may lawfully shift it to the
 * tenant if the contract says so in terms — which it sometimes does, and
 * which a British reader will not think to check.
 */
export const BARCELONA_LOCAL_COSTS: LocalCost[] = [
  {
    label: "IBI (property tax)",
    monthly: 0,
    note:
      "Levied on the owner, not the occupier, so by default a tenant pays nothing. The exception matters: Spanish law allows the parties to agree that the tenant bears it, and some contracts do exactly that. Read the clause on gastos generales before signing — if IBI is passed on it typically adds €40 to €90 a month.",
  },
  {
    label: "Comunidad (building charges)",
    monthly: 0,
    note:
      "Normally the owner's, unlike France. Again the contract can shift it, and in a building with a lift, a concierge or a pool it is worth checking, because those are the ones where it is substantial.",
  },
  {
    label: "Waste charge (taxa de residus)",
    monthly: 15,
    note:
      "Barcelona introduced a separate household waste charge collected with the water bill. It is modest but it is new enough that older guides do not mention it.",
  },
  {
    label: "Utilities and internet",
    monthly: 140,
    note:
      "Electricity is expensive in Spain by British standards and air conditioning in July and August is not optional in most flats. Budget higher in summer than you would at home, and check whether the flat has aire acondicionado before assuming it does.",
  },
  {
    label: "T-usual transport pass",
    monthly: 22,
    note:
      "Unlimited travel in zone 1, which covers the whole city and much of the metropolitan area. Among the cheapest urban transport of any city on this site, and a fraction of the London or Geneva equivalent.",
  },
  {
    label: "Deposit and guarantees",
    monthly: null,
    note:
      "One month's fianza is the legal minimum and is lodged with INCASÒL. Landlords commonly ask for an additional guarantee of one or two months on top, plus proof of income — and for a foreigner without a Spanish work history they often ask for more. Agency fees to tenants were banned in 2023.",
  },
];

export const BARCELONA_LOCAL_COSTS_SOURCES = [
  "Ley 29/1994 de Arrendamientos Urbanos, on IBI, gastos generales and the fianza",
  "Ley 12/2023 por el derecho a la vivienda, on stressed-market areas and the ban on tenant agency fees",
  "Ajuntament de Barcelona published waste charge for 2026",
  "Autoritat del Transport Metropolità published T-usual tariff for 2026",
] as const;
