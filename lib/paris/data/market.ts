import type { BedroomBaseline, LocalCost } from "@/lib/city-content";

/**
 * Paris arrondissement groupings, rents and local costs.
 *
 * The twenty arrondissements individually are too fine a grain to be
 * useful and too coarse to be accurate — the 18th contains both
 * Montmartre and the Goutte d'Or — so they are grouped here the way the
 * rent-control zones and the market itself group them, with the inner
 * suburbs as a ninth entry because for anyone priced out of the city
 * they are the real alternative.
 */
export const PARIS_ARRONDISSEMENTS = [
  "Paris Centre (1er–4e)",
  "Latin Quarter & Saint-Germain (5e–6e)",
  "The West (7e, 8e, 16e)",
  "Grands Boulevards & Canal (9e–10e)",
  "Bastille & Bercy (11e–12e)",
  "The South (13e, 14e, 15e)",
  "Batignolles & Montmartre (17e–18e)",
  "The North-east (19e–20e)",
  "Petite couronne (inner suburbs)",
] as const;

export const PARIS_RENT_REVIEW_AS_OF = "2026-09-07";
export const PARIS_RENT_REFERENCE_MONTH = "July 2026";

export const PARIS_RENT_SOURCES = [
  "Préfecture de Paris encadrement des loyers reference rents, arrêté of 12 June 2026, in force from 1 July 2026",
  "OLAP (Observatoire des loyers de l'agglomération parisienne) median rents by zone",
  "SeLoger, PAP and Leboncoin visible listing samples across the agglomeration, July 2026",
] as const;

export const PARIS_RENT_NOTE =
  "Paris rents are legally capped. The encadrement des loyers sets a binding maximum per square metre for each combination of zone, property type, number of rooms, construction period and whether the flat is furnished — so unlike anywhere else on this site, an advertised rent above the ceiling is unlawful and recoverable. Furnished lets carry their own higher ceiling, which is why so much of the market is furnished.";

/**
 * Median advertised rent by grouping, in euros per month.
 *
 * Derived from the published per-square-metre medians at typical
 * unfurnished sizes — around 38 m² for a one-bedroom and 60 m² for a
 * two-bedroom. Note the French convention counts rooms rather than
 * bedrooms: a "T2" is a one-bedroom flat, a "T3" a two-bedroom.
 */
export const PARIS_RENT_EUR: Record<string, BedroomBaseline> = {
  "Paris Centre (1er–4e)": { oneBed: 1450, twoBed: 2250, threeBed: 3100, allProperties: 2300 },
  "Latin Quarter & Saint-Germain (5e–6e)": { oneBed: 1350, twoBed: 2100, threeBed: 2900, allProperties: 2150 },
  "The West (7e, 8e, 16e)": { oneBed: 1300, twoBed: 2050, threeBed: 2900, allProperties: 2200 },
  "Grands Boulevards & Canal (9e–10e)": { oneBed: 1200, twoBed: 1850, threeBed: 2500, allProperties: 1900 },
  "Bastille & Bercy (11e–12e)": { oneBed: 1150, twoBed: 1800, threeBed: 2400, allProperties: 1800 },
  "The South (13e, 14e, 15e)": { oneBed: 1100, twoBed: 1700, threeBed: 2300, allProperties: 1750 },
  "Batignolles & Montmartre (17e–18e)": { oneBed: 1150, twoBed: 1780, threeBed: 2400, allProperties: 1800 },
  "The North-east (19e–20e)": { oneBed: 1000, twoBed: 1550, threeBed: 2050, allProperties: 1600 },
  "Petite couronne (inner suburbs)": { oneBed: 950, twoBed: 1450, threeBed: 1900, allProperties: 1500 },
};

export type ParisRoomDistrict =
  | "centre"
  | "rive-gauche"
  | "ouest"
  | "canal"
  | "bastille"
  | "sud"
  | "montmartre"
  | "nord-est"
  | "banlieue-nord"
  | "banlieue-est"
  | "banlieue-ouest";

export const PARIS_ROOM_DISTRICT_LABELS: Record<ParisRoomDistrict, string> = {
  centre: "1er–4e, Paris Centre",
  "rive-gauche": "5e–6e, the Latin Quarter and Saint-Germain",
  ouest: "7e, 8e and 16e, the west",
  canal: "9e–10e, Grands Boulevards and the Canal Saint-Martin",
  bastille: "11e–12e, Bastille and Bercy",
  sud: "13e, 14e and 15e, the south",
  montmartre: "17e–18e, Batignolles and Montmartre",
  "nord-est": "19e–20e, Belleville and Ménilmontant",
  "banlieue-nord": "Saint-Ouen, Saint-Denis and the near north",
  "banlieue-est": "Montreuil, Pantin and the near east",
  "banlieue-ouest": "Boulogne, Levallois and the near west",
};

export const PARIS_ROOM_AVERAGE_EUR: Record<ParisRoomDistrict, number> = {
  centre: 950,
  "rive-gauche": 900,
  ouest: 900,
  canal: 820,
  bastille: 790,
  sud: 760,
  montmartre: 780,
  "nord-est": 700,
  "banlieue-nord": 620,
  "banlieue-est": 650,
  "banlieue-ouest": 780,
};

/**
 * What a Paris tenant pays beyond rent.
 *
 * The headline is genuinely surprising to a British reader: since 2023
 * the taxe d'habitation has been abolished on main residences, so a
 * tenant in Paris pays no residence tax whatsoever. There is no council
 * tax equivalent. What there is instead is charges — the copropriété
 * service charge, quoted separately and often substantial — and the
 * taxe d'enlèvement des ordures ménagères, which the landlord may
 * lawfully pass on.
 */
export const PARIS_LOCAL_COSTS: LocalCost[] = [
  {
    label: "Taxe d'habitation",
    monthly: 0,
    note:
      "Abolished on main residences from 2023. A tenant in their main home pays nothing. It still applies to second homes, and Paris levies a substantial surcharge on those — so if you are keeping a pied-à-terre rather than living in it, this line does not apply to you.",
  },
  {
    label: "Charges (provision sur charges)",
    monthly: 120,
    note:
      "Quoted separately from rent and covering building upkeep, communal heating and hot water where they exist, the concierge and the lift. Reconciled annually against actual spend, so expect a balancing bill or refund. On an old Haussmannian building with a lift and a gardien this runs higher than the figure shown.",
  },
  {
    label: "Household waste tax (TEOM)",
    monthly: 25,
    note:
      "Levied on the owner but lawfully recoverable from the tenant as a charge récupérable, and most Paris leases do recover it. Check whether the quoted charges already include it.",
  },
  {
    label: "Home insurance (assurance habitation)",
    monthly: 18,
    note:
      "Legally compulsory for tenants in France, and your landlord will require proof each year. Failing to hold it is grounds for terminating the lease, so it is not optional in the way UK contents insurance is.",
  },
  {
    label: "Navigo transport pass",
    monthly: 88,
    note:
      "Covers all zones across Île-de-France, so a suburban commute costs the same as a trip across the 11th. Employers are legally required to reimburse at least 50%, which makes the effective cost around half the headline — one of the few costs here that is cheaper than the British equivalent.",
  },
  {
    label: "Rental deposit",
    monthly: null,
    note:
      "Capped by law at one month's rent for an unfurnished let and two months for a furnished one — considerably more tenant-friendly than the Swiss three-month blocked account. Agency fees charged to the tenant are also capped per square metre.",
  },
];

export const PARIS_LOCAL_COSTS_SOURCES = [
  "Loi de finances 2020 and subsequent, on the abolition of taxe d'habitation for main residences",
  "Décret n°87-713 on charges récupérables, for what a landlord may lawfully pass on",
  "Loi ALUR on deposit caps and tenant agency fees",
  "Île-de-France Mobilités published Navigo tariffs for 2026",
] as const;
