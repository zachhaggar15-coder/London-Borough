import type { LocalCost } from "@/lib/city-content";

/**
 * What a Geneva household pays beyond rent.
 *
 * This table replaces council tax, and for a British reader it is the
 * most important page on the section. Switzerland has no occupier
 * property tax at all — nothing corresponds to a council tax bill — and
 * a reader who notices that and stops reading will have missed the point
 * entirely, because compulsory health insurance costs more per month
 * than council tax does per quarter in most of England.
 *
 * The health insurance figure is the one that catches people. It is
 * private, it is per person rather than per household, children are
 * charged too, it is not deducted at source, and it starts the month you
 * arrive. A couple with two children can be paying CHF 1,200 a month
 * before anyone has seen a doctor.
 */
export const GENEVA_LOCAL_COSTS: LocalCost[] = [
  {
    label: "Health insurance (LAMal), per adult",
    monthly: 460,
    note:
      "Compulsory, private, and per person rather than per household — children are charged too, at a lower rate. You must take out a policy within three months of arriving and it is backdated to your arrival date. The figure shown is a Geneva adult on a CHF 2,500 deductible; a low deductible costs meaningfully more. Geneva is the most expensive canton in Switzerland for this. Cantonal subsidies exist for lower incomes and are worth checking.",
  },
  {
    label: "Health insurance deductible, spread monthly",
    monthly: 210,
    note:
      "The franchise is what you pay before the policy pays anything, up to CHF 2,500 a year on the cheapest premiums, plus a 10% co-payment above it. Budget for it as a running cost rather than a surprise, because in a year when you need healthcare you will spend it.",
  },
  {
    label: "Serafe (broadcasting fee)",
    monthly: 28,
    note:
      "CHF 335 a year per household, billed automatically once you register your address. It is not optional and not connected to whether you own a television.",
  },
  {
    label: "Charges (service charges)",
    monthly: 250,
    note:
      "Quoted separately from rent in Swiss listings and typically covering heating, hot water, building maintenance and sometimes a caretaker. A rent advertised at CHF 2,000 'plus charges' is really CHF 2,250. Reconciled annually, so expect a balancing bill or credit.",
  },
  {
    label: "Rental deposit (guarantee)",
    monthly: null,
    note:
      "Up to three months' rent, held in a blocked bank account in your name. On a CHF 2,000 flat that is CHF 6,000 you cannot touch, on top of the first month. Deposit-insurance products exist as an alternative but cost more overall.",
  },
  {
    label: "Third-party liability insurance",
    monthly: 12,
    note:
      "Not legally compulsory but demanded by essentially every landlord as a condition of the lease, so treat it as compulsory. Usually bundled with household contents cover.",
  },
];

export const GENEVA_LOCAL_COSTS_SOURCES = [
  "Federal Office of Public Health (OFSP) priminfo premium calculator for canton Geneva, 2026",
  "Serafe AG published household fee for 2026",
  "Swiss Code of Obligations, articles 257e and 269, on rental deposits and charges",
] as const;
