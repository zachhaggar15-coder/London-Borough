import type { CityGuide } from "@/lib/city-content";

/**
 * Barcelona guides for British arrivals.
 *
 * The residency question dominates, as it does for Paris, but Spain
 * offers more routes than France does — the non-lucrative and digital
 * nomad visas have no real French equivalent — so the guide has more to
 * explain. The second theme is that Barcelona is in the middle of a
 * public argument about housing and tourism, and an arriving foreigner
 * is a participant in it whether they intend to be or not.
 */

const PUBLISHED = "2026-09-07";

export const BARCELONA_GUIDES: CityGuide[] = [
  {
    slug: "moving-to-barcelona-from-the-uk",
    h1: "Moving to Barcelona from the UK: which visa, and the NIE",
    metaTitle: "Moving to Barcelona from the UK: visas, the NIE and empadronamiento",
    metaDescription:
      "Five long-stay routes into Spain for British citizens, what the NIE is and why nothing works without it, and the 90/180 rule as it is now enforced.",
    summary:
      "Spain has more routes in than France does. Which one fits, and the two pieces of paper everything else waits on.",
    category: "Moving",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 9,
    intro: [
      "Since Brexit a British citizen may spend 90 days in any rolling 180-day period across the Schengen area — not per country — and since the EU Entry/Exit System came into operation in April 2026 those days are counted automatically from biometric records at the border. The informal tolerance people used to rely on has gone.",
      "To live in Barcelona you need a long-stay visa, applied for from the UK before you travel, and then two pieces of Spanish paperwork that everything else depends on: the NIE and the empadronamiento.",
      "This is orientation rather than advice. Spanish immigration procedure varies by consulate and changes often, so check the Spanish consulate in London and the Ministry of Foreign Affairs for your own circumstances.",
    ],
    sections: [
      {
        heading: "The five routes",
        paragraphs: [
          "Spain offers more ways in than most EU countries, which is genuinely useful if your situation does not fit a standard employment move.",
        ],
        list: {
          title: "Long-stay routes for British citizens",
          items: [
            "Work visa — requires a Spanish employer with an approved job offer. The standard employment route, and the hardest of the five because the employer must satisfy a labour-market test.",
            "Digital nomad visa — for remote workers employed or contracted outside Spain, with income thresholds tied to the minimum wage and a cap on the share of income from Spanish clients. Widely used by British remote workers and it comes with a favourable tax option.",
            "Non-lucrative visa — for people with sufficient passive income who will not work in Spain at all. Popular with retirees and the financially independent, and it genuinely does prohibit working.",
            "Student visa — for accredited study, with limited work rights attached.",
            "Family reunification — for the spouse or dependants of a legal resident.",
          ],
        },
        callout:
          "The digital nomad visa is the route that has changed the picture most for British arrivals since Brexit. If you work remotely for a non-Spanish employer, it is likely to be simpler and faster than any of the others.",
      },
      {
        heading: "The NIE and the empadronamiento",
        paragraphs: [
          "The NIE — Número de Identidad de Extranjero — is your foreigner's identification number and nothing works without it. You cannot open a bank account, sign a lease, get a phone contract, register with a doctor or be paid a salary until you have one. Apply as early as your route allows; the appointment system is the bottleneck and slots in Barcelona are chronically oversubscribed.",
          "The empadronamiento is registration with your local town hall, which records that you live at a specific address. It is the gateway to public healthcare, to a school place, and to a great deal else, and it requires a lease or a letter from the person you live with.",
          "The circularity is familiar: no bank account without an NIE, no flat without a bank account, no empadronamiento without a flat. The standard escape is a short-term rental with a landlord willing to register you, which is worth asking about explicitly before you sign anything.",
        ],
      },
      {
        heading: "Healthcare",
        paragraphs: [
          "Catalonia's public health service, CatSalut, is free at the point of use for legal residents who are registered and contributing to social security. Once you have your NIE, your empadronamiento and your social security number, you register at your local CAP and are assigned a doctor.",
          "The gap is the beginning. Most long-stay visa routes require proof of private health insurance covering you from day one, and the non-lucrative visa requires comprehensive private cover with no co-payments for its whole duration. Do not assume the public system covers you the moment you land.",
        ],
      },
      {
        heading: "Tax residence, and the 183-day rule",
        paragraphs: [
          "You become Spanish tax-resident if you spend more than 183 days in a calendar year in Spain, or if your main economic interests are here. That is a lower bar than people expect and it applies whether or not you intended it.",
          "Spanish tax residence means declaring worldwide income, and Spain also levies wealth tax — Catalonia's version starts at a relatively low threshold compared with most of the country. If you have UK property, investments or a pension, the interaction with the UK–Spain double taxation treaty is genuinely complicated and worth professional advice in your first year rather than your second.",
          "The Beckham Law regime and the digital nomad visa's associated flat-rate option can substantially change this, and both have conditions and deadlines. Ask before you arrive rather than after.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long can a British citizen stay in Spain without a visa?",
        answer:
          "Ninety days in any rolling 180-day period, shared across the whole Schengen area rather than counted per country. Since the EU Entry/Exit System started operating in April 2026 this is recorded biometrically at the border and counted automatically.",
      },
      {
        question: "What is the easiest visa for a Briton moving to Barcelona?",
        answer:
          "For someone working remotely for a non-Spanish employer, the digital nomad visa is usually the most straightforward and comes with a favourable tax option. For those with passive income and no intention of working, the non-lucrative visa. A conventional work visa is the hardest, because the employer must satisfy a labour-market test.",
      },
      {
        question: "What is an NIE and when do I need it?",
        answer:
          "The Número de Identidad de Extranjero, your foreigner's identification number. You need it before you can open a bank account, sign a lease, take a phone contract or be paid, so apply at the earliest point your route allows — appointment availability in Barcelona is the usual bottleneck.",
      },
      {
        question: "When do I become tax-resident in Spain?",
        answer:
          "If you spend more than 183 days in a calendar year in Spain, or if your main economic interests are here. That triggers a duty to declare worldwide income and brings Catalan wealth tax into scope, so take advice on the UK–Spain treaty before your first full tax year rather than during it.",
      },
    ],
    related: [
      { href: "/barcelona/guides/renting-in-barcelona", label: "Renting, and the rent cap" },
      { href: "/barcelona/guides/what-you-need-to-earn-in-barcelona", label: "What you need to earn" },
      { href: "/barcelona/districts", label: "Where to live, district by district" },
    ],
    sources: [
      "Ministerio de Asuntos Exteriores and the Spanish Consulate in London, visa route guidance",
      "Ley 28/2022 de fomento del ecosistema de empresas emergentes, for the digital nomad visa and its tax regime",
      "European Commission material on the Entry/Exit System, operational from April 2026",
      "Agencia Tributaria guidance on tax residence and the 183-day rule",
    ],
  },

  {
    slug: "renting-in-barcelona",
    h1: "Renting in Barcelona: the rent cap, the deposit and the tourist-flat argument",
    metaTitle: "Renting in Barcelona: rent caps, deposits and what your contract must say",
    metaDescription:
      "Catalonia caps rents in stressed-market areas covering most of Barcelona. How the INCASÒL index works, what a landlord may charge, and what to check.",
    summary:
      "Rents here are capped and referenced to a public index. What that means in practice, and the local argument you are walking into.",
    category: "Renting",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 8,
    intro: [
      "Barcelona is one of the few cities in Europe with a binding rent cap, and it applies to essentially all of it. Catalonia has declared the city a stressed-market area, which means a landlord setting a new contract must reference the INCASÒL price index and may not exceed the applicable cap.",
      "That is a genuine protection and most arriving foreigners do not know it exists. It is also the visible end of a much larger argument the city is having about tourism, short lets and who housing is for — and as a foreigner arriving on a foreign salary you are part of that argument whether you meant to be.",
    ],
    sections: [
      {
        heading: "How the cap works",
        paragraphs: [
          "INCASÒL, part of the Generalitat, publishes a reference index of rent per square metre for each neighbourhood, built from registered deposits — that is, from contracts that were actually signed rather than prices that were asked. It sits meaningfully below what the portals advertise, which tells you something useful about the gap between asking and achieved.",
          "In a declared stressed area, a new contract is capped by reference to that index and, where the previous tenant's rent is known, may not exceed it. There are exceptions and the rules have been amended more than once since the 2023 housing law, so check the current position on the Generalitat's housing pages rather than relying on a summary.",
          "The practical advice is simple: look up the index for the specific address before you sign, and ask the landlord what the previous contract's rent was. Both are things you are entitled to know.",
        ],
        dataBlock: "rent-spread",
      },
      {
        heading: "What you pay up front, and what is banned",
        paragraphs: [
          "The fianza is one month's rent, legally required and lodged with INCASÒL rather than held by the landlord. Landlords commonly ask for an additional guarantee on top — one or two months is normal, and for a foreigner without Spanish payslips they will often ask for more.",
          "Agency fees charged to tenants were banned outright by the 2023 housing law. If an agency asks you for a fee, that is unlawful, and it is a straightforward signal about who you are dealing with.",
          "Expect to be asked for your NIE, a work contract or proof of income, and recent payslips or bank statements. Without Spanish employment history, several months' rent paid in advance is a common alternative — which is legal, but check what happens to the money if the tenancy ends early.",
        ],
        dataBlock: "council-tax",
      },
      {
        heading: "What the rent does and does not include",
        paragraphs: [
          "There is no council tax equivalent for a tenant. The IBI property tax falls on the owner, as do the comunidad building charges. The catch a British reader will not think to look for is that Spanish law lets the parties agree otherwise, and some contracts pass IBI or comunidad to the tenant in the gastos generales clause. Read it.",
          "Utilities are yours and electricity is expensive in Spain by British standards. Air conditioning is not a luxury here for two months of the year, and a flat without it is a materially different proposition in August — check before assuming.",
        ],
      },
      {
        heading: "The tourist-flat problem",
        paragraphs: [
          "Barcelona has capped tourist apartment licences and announced an intention to phase them out entirely, after a decade in which short lets removed a great deal of stock from the long-term market in Ciutat Vella, the Barceloneta and increasingly Gràcia and Poblenou.",
          "Two things follow for an arriving renter. Some of what looks like a long-term flat is a licensed or unlicensed tourist let being marketed to you for the winter, and it will not be available in June — check the contract type, which should be an arrendamiento de vivienda habitual. And local feeling about foreigners outbidding residents is real and openly expressed in some barris; it is not directed at you personally, and it is worth understanding rather than dismissing.",
        ],
      },
    ],
    faqs: [
      {
        question: "Are rents actually capped in Barcelona?",
        answer:
          "Yes. Catalonia has declared Barcelona a stressed-market area, so a new contract must reference the INCASÒL index and is capped accordingly. The rules have been amended several times since the 2023 housing law, so check the Generalitat's current guidance for the specific address before signing.",
      },
      {
        question: "Do tenants pay IBI in Spain?",
        answer:
          "By default no — IBI is the owner's tax. But Spanish law allows the parties to agree that the tenant bears it, and some contracts do exactly that in the gastos generales clause. If it is passed on, expect €40 to €90 a month, so read the clause rather than assuming.",
      },
      {
        question: "How much deposit will I be asked for in Barcelona?",
        answer:
          "One month's fianza is the legal requirement and is lodged with INCASÒL. Landlords typically ask for an additional guarantee of one or two months, and often more from a tenant without Spanish employment history. Agency fees charged to tenants have been illegal since 2023.",
      },
    ],
    related: [
      { href: "/barcelona/guides/moving-to-barcelona-from-the-uk", label: "Visas, the NIE and tax residence" },
      { href: "/barcelona/rent-index", label: "Every area by rent" },
      { href: "/barcelona/districts", label: "What you pay beyond rent" },
    ],
    sources: [
      "INCASÒL índex de referència de preus de lloguer, Generalitat de Catalunya",
      "Ley 12/2023 por el derecho a la vivienda, on stressed-market areas and tenant agency fees",
      "Ley 29/1994 de Arrendamientos Urbanos, on the fianza and gastos generales",
      "Ajuntament de Barcelona policy on tourist apartment licences",
    ],
  },

  {
    slug: "what-you-need-to-earn-in-barcelona",
    h1: "What you need to earn in Barcelona",
    metaTitle: "What salary do you need in Barcelona? Worked from rent backwards",
    metaDescription:
      "Barcelona salaries are low and its rents are not. What the gap means in practice, and why remote workers change the arithmetic.",
    summary:
      "The hardest arithmetic of any city here: local salaries are low, rents are not, and a remote British salary changes everything.",
    category: "Money",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 7,
    intro: [
      "Barcelona has the most uncomfortable ratio of any city covered on this site. Local salaries are low by northern European standards and rents are not low at all, which is the root of the housing argument the city has been having with itself for a decade.",
      "For a British reader that has an awkward implication worth stating plainly: if you arrive on a remote British or international salary, you are comfortably placed in a market where local wages are not, and that is precisely the dynamic local housing policy is trying to address.",
    ],
    sections: [
      {
        heading: "The gap, in numbers",
        paragraphs: [
          "The salary ladder below is in euros and starts lower than any other city on this site, because Spanish salaries do. A middle professional salary in Barcelona goes a good deal less far against local rents than the equivalent does in Leeds or Manchester.",
          "Catalonia sets its own half of the income tax schedule and it is among the higher ones in Spain, so a take-home figure quoted for Madrid will overstate what you clear here.",
        ],
        dataBlock: "salary-ladder",
      },
      {
        heading: "What a landlord will want to see",
        paragraphs: [
          "The usual expectation is net monthly income of about three times the rent, plus a work contract and recent payslips. A foreigner without Spanish employment history is at a real disadvantage regardless of income, and the common workaround is several months' rent paid in advance — which is legal, and worth checking the exit terms on.",
          "If you are on a digital nomad visa, a foreign employment contract and bank statements generally do the job, but expect to explain the arrangement more than once.",
        ],
        callout:
          "Three times the rent in net income, plus an NIE, plus proof you can be paid. The NIE is usually the thing that holds people up, so start it early.",
      },
      {
        heading: "Where the money goes further",
        paragraphs: [
          "Transport is remarkable value: a T-usual monthly pass covers the entire city and much of the metropolitan area for a fraction of the London or Geneva equivalent. Public healthcare is free at the point of use once you are registered and contributing. Eating and drinking out is meaningfully cheaper than any British city, and the menú del día at lunchtime has no British equivalent at the price.",
          "There is no council tax for a tenant, which against a British bill is worth £1,500 to £2,500 a year.",
        ],
        dataBlock: "rent-spread",
      },
      {
        heading: "And where it does not",
        paragraphs: [
          "Electricity is expensive and summer air conditioning is not optional in most flats. Salaries are low enough that career progression in a local role will feel slow against a British trajectory. And if you become Spanish tax-resident with UK assets, the wealth tax and worldwide-income rules can cost more than any of the above — which is the single most under-considered line in most people's move.",
        ],
      },
    ],
    faqs: [
      {
        question: "What salary do you need to live in Barcelona?",
        answer:
          "Around €30,000 supports a comfortable shared life. Living alone in a central barri realistically starts around €40,000 to €45,000, and landlords generally want net monthly income of about three times the rent. Those figures are high relative to typical local salaries, which is the heart of the city's housing argument.",
      },
      {
        question: "Are salaries low in Barcelona?",
        answer:
          "Yes, by northern European standards, and notably low relative to the city's rents. That is why the remote-work routes have become so popular with foreign arrivals, and why local feeling about foreign salaries in the rental market is as strong as it is.",
      },
      {
        question: "Is income tax higher in Catalonia?",
        answer:
          "Catalonia sets its own half of the IRPF schedule and it is among the higher ones in Spain, so your take-home here is lower than the same salary in Madrid. Catalan wealth tax also starts at a relatively low threshold, which matters if you keep UK assets.",
      },
    ],
    related: [
      { href: "/barcelona/salary", label: "What your salary rents" },
      { href: "/barcelona/guides/renting-in-barcelona", label: "Renting and the rent cap" },
      { href: "/barcelona/rent-index", label: "Every area by rent" },
    ],
    sources: [
      "Agencia Tributaria and Generalitat de Catalunya IRPF schedules for 2026",
      "Tesorería General de la Seguridad Social employee contribution rates and the contribution ceiling",
      "INCASÒL índex de referència de preus de lloguer",
      "Autoritat del Transport Metropolità published T-usual tariff",
    ],
  },
];
