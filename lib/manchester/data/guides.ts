/**
 * Greater Manchester editorial guides.
 *
 * Same rules as the London set in lib/data/guides.ts: written, not
 * templated; every checkable figure carries a source and a review date;
 * legal claims are England-only and say so; and if a guide would only
 * restate a neighbourhood page, it does not get written.
 *
 * The one addition for Manchester is a rule about comparison. A great
 * many people arriving here are arriving from London, and the honest
 * comparison is not "everything is cheaper" — rent is dramatically
 * cheaper, council tax is dearer, and the transport network is a
 * different shape rather than a smaller version of the same shape.
 * Where a guide makes that comparison it makes all three points.
 */

export type ManchesterGuideSection = {
  heading: string;
  paragraphs: string[];
  list?: { title?: string; items: string[] };
  callout?: string;
  dataBlock?: "council-tax-boroughs" | "rent-spread" | "salary-ladder";
};

export type ManchesterGuide = {
  slug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  category: "Money" | "Renting" | "Transport" | "Moving";
  published: string;
  updated: string;
  readMinutes: number;
  intro: string[];
  sections: ManchesterGuideSection[];
  faqs: { question: string; answer: string }[];
  related: { href: string; label: string }[];
  sources?: string[];
};

const PUBLISHED = "2026-09-06";

export const MANCHESTER_GUIDES: ManchesterGuide[] = [
  // ────────────────────────────────────────────────────────────────
  {
    slug: "how-much-do-i-need-to-earn-to-live-in-manchester",
    h1: "How much do you need to earn to live in Manchester?",
    metaTitle: "How much do you need to earn to live in Manchester?",
    metaDescription:
      "What salary you actually need in Greater Manchester, worked backwards from rent to take-home pay. Honest figures for sharing and for living alone.",
    summary:
      "Worked backwards from rent to salary — for a room, and for the very different proposition of living on your own.",
    category: "Money",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 8,
    intro: [
      "The honest answer is that Greater Manchester is one of the few large British cities where a single person on a median graduate salary can still rent a one-bed flat without either sharing or commuting an hour. That is the headline, and it is genuinely true. It is also less true every year.",
      "This guide works the question backwards — from a monthly rent figure to the gross salary that supports it — so you can see where your own number falls rather than trusting a round figure from a listicle.",
    ],
    sections: [
      {
        heading: "Budget against take-home, not salary",
        paragraphs: [
          "Gross salary is the wrong number to plan with. What matters is what lands in your account after income tax and National Insurance, and that is a smaller share than most people expect.",
          "On £30,000 you take home roughly £2,090 a month. On £40,000 it is about £2,650. On £55,000 — where the 40% band has been biting for a while — you are looking at around £3,470. Note what happens between those last two: adding £15,000 of gross adds about £820 a month, because well over a third of it never reaches you.",
          "If you are repaying a student loan, subtract more again. Plan 2 takes 9% of everything above the threshold, and in any practical sense that money was never yours.",
        ],
        callout:
          "Every rent figure on this site is monthly, and every affordability rule below is a share of take-home pay rather than of gross.",
      },
      {
        heading: "The 35% rule, and why it is a ceiling",
        paragraphs: [
          "The usual guidance is to keep rent under about a third of take-home. This site uses 35% as its default, which is roughly the point where finances stop feeling disciplined and start feeling tight.",
          "It is a ceiling, not a target. At 35% you can absorb a boiler failure, a dentist or a month between jobs. At 45% you are one unexpected bill away from a problem.",
          "The reason this rule is worth taking seriously in Greater Manchester specifically is that it is achievable here. In London it functions as an aspiration most renters cannot meet; here, on a decent salary, it is a genuine constraint you can hold yourself to.",
        ],
      },
      {
        heading: "What you need for a room in a share",
        paragraphs: [
          "Rooms across the areas covered here run from around £470 a month in Wigan to around £820 in the city centre, with most of the inner suburbs sitting between £590 and £690. Rooms very often include bills and council tax, which is worth more than it sounds — call it £120 to £200 a month you are not separately paying.",
          "Working backwards at 35%: a £600 room needs about £1,715 of take-home, which is roughly a £24,000 salary. A £750 room needs about £2,145 of take-home, or roughly £31,000.",
          "In practice this means a room in a good part of south Manchester is within reach on a starting graduate salary, which is not a sentence you can write about most of southern England.",
        ],
        dataBlock: "salary-ladder",
      },
      {
        heading: "What you need to live alone",
        paragraphs: [
          "This is where the number moves, though less brutally than it does in London. A one-bed across the areas covered here ranges from about £550 in Wigan and Leigh to £1,250 in the city centre, with the median around £800.",
          "Unlike a room, you then pay council tax, energy, water, broadband and every standing charge yourself. Realistically that is £220 to £320 a month on top, and Greater Manchester council tax is not cheap — every borough charges above £2,150 at Band D, though most flats sit in bands A to C where the bill is meaningfully lower.",
          "So a £900 one-bed is really closer to £1,180 of committed monthly housing cost. At 35% of take-home that implies about £3,370 a month in the bank, which is roughly a £53,000 salary. Relax to 40% and it drops to about £45,000.",
          "For the city centre, a £1,250 one-bed plus bills is around £1,550 committed, implying roughly £4,430 of take-home at 35% — a salary north of £73,000. Central Manchester is not cheap. It is cheaper than central London by a wide margin, which is a different claim.",
        ],
      },
      {
        heading: "The costs people forget",
        paragraphs: [
          "Rent is the headline. Three other things reliably catch out people who have just arrived.",
        ],
        list: {
          items: [
            "Travel, if you are not walking. A £2 single bus fare cap has held for four years and an all-day bus ticket is £5, but tram fares are zonal and a daily tram commute from the outer boroughs is a meaningful second cost. Work it out before you sign, not after.",
            "Upfront cash. A deposit of up to five weeks' rent plus your first month, all due before you move in. On an £800 flat that is roughly £1,720 in one go.",
            "Council tax, unless you are in a share that includes it. It varies by several hundred pounds a year across the ten boroughs, and — unlike rent — it does not fall as you move away from the centre. Wigan is the cheapest of the ten; Stockport, Oldham and Rochdale the dearest.",
          ],
        },
        dataBlock: "council-tax-boroughs",
      },
      {
        heading: "Where the money goes furthest",
        paragraphs: [
          "If the salary is fixed and the question is where it stretches, the answer is rarely the cheapest place. Wigan and Rochdale have the lowest rents in the conurbation and repay the saving in journey time — forty minutes or more each way, five days a week, is roughly two hundred hours a year.",
          "The areas that genuinely do well on this trade are the ones with a fast rail link and a town centre of their own: Levenshulme, Stretford, Ashton-under-Lyne, Prestwich and Stockport all put you inside half an hour of the middle for well under city-centre rent.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can you live in Manchester on £30,000?",
        answer:
          "Comfortably, if you share. A £600 room at 35% of take-home needs about £24,000, so £30,000 leaves real headroom. Living alone on £30,000 is possible in the outer boroughs — a £650 flat in Bolton or Oldham — but it will be tight once bills and council tax are counted.",
      },
      {
        question: "What salary do you need to live alone in Manchester?",
        answer:
          "Around £45,000 to £53,000 for a typical one-bed outside the centre, depending on whether you hold to 35% or 40% of take-home. For a city-centre one-bed at around £1,250 a month, closer to £73,000.",
      },
      {
        question: "Is Manchester cheaper than London?",
        answer:
          "On rent, substantially — a one-bed in central Manchester costs roughly what an outer-zone London one-bed does. On council tax, no: every Greater Manchester borough charges more at Band D than several inner London boroughs. On transport, it depends entirely on whether you can live somewhere you can walk or bus from.",
      },
    ],
    related: [
      { href: "/manchester/rent-index", label: "Every area ranked by rent" },
      { href: "/manchester/lifestyle/value", label: "Best-value areas" },
      { href: "/manchester/boroughs", label: "Council tax by borough" },
    ],
    sources: [
      "ONS Price Index of Private Rents, borough averages by bedroom count, July 2026",
      "UK income tax and National Insurance thresholds for 2026/27",
      "Published Greater Manchester Band D council tax figures for 2026/27",
    ],
  },

  // ────────────────────────────────────────────────────────────────
  {
    slug: "renting-in-greater-manchester-first-time",
    h1: "Renting in Greater Manchester for the first time",
    metaTitle: "Renting in Greater Manchester for the first time",
    metaDescription:
      "Deposits, referencing, upfront costs and your rights as a renter in Greater Manchester — what to expect and what a landlord cannot ask you for.",
    summary:
      "What the process actually involves, what it costs upfront, and the things a landlord is not allowed to charge you.",
    category: "Renting",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 9,
    intro: [
      "The mechanics of renting are the same across England, so most of what follows applies whether you are looking in Chorlton or in Chelsea. Two things are different about doing it in Greater Manchester, and both are worth knowing before you start.",
      "The first is pace. Good flats in the inner suburbs move in days, sometimes hours, and the market runs on a September cycle driven by the student intake. The second is the licensing regime: several Greater Manchester boroughs operate selective licensing in specific wards, which is a genuine quality signal you can check for free.",
    ],
    sections: [
      {
        heading: "What you will pay before you get the keys",
        paragraphs: [
          "The Tenant Fees Act 2019 caps what a landlord or agent in England can charge. For most tenancies the deposit is capped at five weeks' rent where the annual rent is under £50,000, and a holding deposit at one week's rent.",
          "So on a £900 flat, expect roughly £1,038 of deposit plus £900 of first month's rent — about £1,940 due before you move in. Budget for it as a lump, because it lands as one.",
          "Your deposit must be protected in a government-approved scheme within 30 days, and you must be told which one. If that has not happened, something has gone wrong.",
        ],
        callout:
          "Letting agents in England cannot legally charge you for referencing, for drawing up the tenancy agreement, for an inventory, or an admin fee of any kind. If you are asked for one, it is not a negotiation — it is unlawful.",
      },
      {
        heading: "Referencing, and what to do if you fail it",
        paragraphs: [
          "Most agents want to see that you earn around thirty times the monthly rent annually — £27,000 for a £900 flat — plus a credit check, employer confirmation and a previous landlord reference.",
          "If you do not clear that bar, the usual options are a UK-based guarantor, paying several months up front, or a rent guarantee product. Students and recent arrivals from abroad hit this most often, and in Manchester the student-heavy market means agents deal with it constantly and have a process for it.",
          "Being upfront about it early is much better than discovering the problem after you have paid a holding deposit.",
        ],
      },
      {
        heading: "Selective licensing, and why you should check it",
        paragraphs: [
          "Several Greater Manchester councils run selective licensing schemes covering specific wards, under which landlords in those areas must hold a licence and meet conditions on management and property condition.",
          "Councils publish a public register of licensed properties. Checking an address against it takes a minute and tells you something no listing photograph will: whether the landlord is engaged with the regime that applies to them.",
          "Schemes change and are ward-specific rather than borough-wide, so check the current position with the relevant council rather than relying on any secondary summary, this one included.",
        ],
      },
      {
        heading: "The September problem",
        paragraphs: [
          "Greater Manchester has one of the largest student populations in Europe, and the rental market moves to its rhythm. Supply in Fallowfield, Withington, Rusholme and increasingly Levenshulme tightens sharply from June and stays tight through September.",
          "If you are not a student, this cuts both ways. Looking in that window means competing with people who signed months earlier; looking in January or February means far less competition and more willingness to negotiate.",
          "It also means that in the student belt specifically, a great deal of stock is let on a fixed twelve-month academic cycle. If you want a February start in Fallowfield, you will find the choice narrow.",
        ],
      },
      {
        heading: "Viewings: what to actually check",
        paragraphs: [
          "Photographs conceal the two things that make a Manchester flat unpleasant to live in, and both are checkable in ten minutes.",
        ],
        list: {
          items: [
            "Damp and ventilation. Look behind furniture and at the top corners of external walls, and check whether the bathroom has a working extractor. This is the single most common complaint in the region's older terraced stock, and it is not a cosmetic problem.",
            "Heating and glazing. Ask what the heating system is and how old the boiler is, and check the EPC rating — it is on the listing by law. A poorly insulated Victorian terrace can cost £80 a month more to heat than a comparable modern flat.",
            "Noise. Visit at the time you will actually be there. A flat on a tram route or near a bar strip is a different proposition at eleven on a Friday than at two on a Tuesday.",
            "Parking. In Chorlton, Didsbury, Levenshulme and much of the inner ring this is a genuine daily friction. Ask whether the street is permit-controlled and whether the flat comes with one.",
          ],
        },
      },
      {
        heading: "Your rights once you are in",
        paragraphs: [
          "In England your landlord must give at least 24 hours' notice in writing before entering, keep the structure and installations in repair, and provide a valid gas safety certificate annually and an EPC.",
          "Repairs are the landlord's responsibility for anything structural or to do with heating, water, gas, electricity or sanitation. Report problems in writing and keep the thread — a paper trail is what makes a council complaint effective if it comes to that.",
          "If a repair is not dealt with, every Greater Manchester council has a housing standards team that can inspect and serve notice on the landlord. That route is free and it works, but it works much better with dated written evidence behind it.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much deposit can a landlord ask for in Greater Manchester?",
        answer:
          "Five weeks' rent, where the annual rent is under £50,000. That is the England-wide cap under the Tenant Fees Act 2019 and it applies in every Greater Manchester borough. A holding deposit is capped separately at one week's rent.",
      },
      {
        question: "Can a letting agent charge me an admin fee?",
        answer:
          "No. In England, agents cannot charge tenants for referencing, contracts, inventories or administration. The permitted payments are rent, a capped deposit, a capped holding deposit, and specific charges such as replacing a lost key or late rent.",
      },
      {
        question: "When is the best time to look for a flat in Manchester?",
        answer:
          "January and February, if you have the choice. The market is tightest from June through September because of the student intake, particularly in Fallowfield, Withington and Rusholme.",
      },
    ],
    related: [
      { href: "/manchester/neighbourhoods", label: "Every area covered" },
      { href: "/manchester/guides/greater-manchester-council-tax-explained", label: "Council tax explained" },
      { href: "/manchester/methodology", label: "How our figures are worked out" },
    ],
    sources: [
      "Tenant Fees Act 2019 (England)",
      "Housing Act 2004, Part 3 (selective licensing)",
      "Landlord and Tenant Act 1985, s.11 (repairing obligations)",
    ],
  },

  // ────────────────────────────────────────────────────────────────
  {
    slug: "greater-manchester-council-tax-explained",
    h1: "Greater Manchester council tax explained",
    metaTitle: "Greater Manchester council tax explained",
    metaDescription:
      "How council tax works across the ten Greater Manchester boroughs — Band D charges, the Mayoral precept, discounts, and why the bills are higher than people expect.",
    summary:
      "Why every borough charges over £2,150 at Band D, what the Mayoral precept pays for, and the discounts people miss.",
    category: "Money",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 7,
    intro: [
      "Council tax is the cost people most reliably forget when they budget a move, and in Greater Manchester it is the one that most often surprises them. The rent is dramatically lower than in London or the South East. The council tax is not lower at all — on a Band D comparison it is higher than a good deal of inner London.",
      "This guide explains where the number comes from, what the Greater Manchester element pays for, and the reliefs that go unclaimed.",
    ],
    sections: [
      {
        heading: "The bands are based on 1991 values",
        paragraphs: [
          "Every property in England sits in one of eight bands, A to H, based on what it was worth on 1 April 1991 — not on what it is worth now. This is the single most common point of confusion about the tax, and it means a new-build flat and a Victorian terrace on the same street can sit in different bands for reasons that have nothing to do with either building today.",
          "Band D is the statutory reference band. Every other band is a fixed national multiple of it, set by the Local Government Finance Act 1992: Band A is six-ninths of Band D, Band H is eighteen-ninths. Those ratios are identical in every authority in England, which is why comparing councils on Band D is meaningful.",
          "It also means the Band D headline overstates most people's actual bill in Greater Manchester, where a large majority of housing sits in bands A to C.",
        ],
      },
      {
        heading: "What the Greater Manchester element pays for",
        paragraphs: [
          "Every household in the ten boroughs pays a Mayoral precept on top of their council's own charge. For 2026/27 it is £439.25 at Band D, and it splits into two parts: £285.30 for the Mayoral Police and Crime Commissioner, and £153.95 for general functions, of which roughly £92.20 funds Greater Manchester Fire and Rescue and the rest covers the Mayor's other responsibilities including transport.",
          "London handles the same idea differently, as a single Greater London Authority precept covering the Mayor, TfL, the Met and the fire service. The practical effect is the same — a region-wide charge on top of a borough charge — but the two are not directly comparable line by line, which is worth knowing if you are trying to work out whether you will be better or worse off after a move.",
        ],
        dataBlock: "council-tax-boroughs",
      },
      {
        heading: "Why the bills are high",
        paragraphs: [
          "Council tax income depends on the tax base — the number and value-band mix of properties in an area. Boroughs with a large share of low-band housing raise less per household at any given rate, and have to set a higher rate to fund the same services.",
          "That is most of the explanation for why the Greater Manchester figures sit where they do, and why the pattern is close to the inverse of London's. Westminster and Wandsworth can charge around £1,000 at Band D because they sit on enormous high-band tax bases. Oldham and Rochdale cannot.",
          "The practical consequence for anyone moving: the borough with the cheapest rent is not necessarily the cheapest place to live once the bill arrives, and the gap between the highest and lowest of the ten runs to well over £400 a year at Band D.",
        ],
      },
      {
        heading: "Discounts and reliefs people miss",
        paragraphs: [
          "Several substantial reductions are not applied automatically. You have to claim them.",
        ],
        list: {
          items: [
            "Single person discount: 25% off, if you are the only adult in the property. This is the big one and it is very commonly unclaimed after a housemate moves out.",
            "Full-time students: a property occupied entirely by full-time students is exempt. A mixed household of one non-student and any number of students gets the 25% single person discount.",
            "Severe mental impairment: a person medically certified as severely mentally impaired is disregarded for council tax purposes, which can mean a 25% discount or full exemption. This is very widely unclaimed.",
            "Empty and unfurnished property: some boroughs offer a short exemption between tenancies. Terms vary by council, and several have reduced or removed it.",
            "Council Tax Support: means-tested help administered by each borough separately, with different rules in each. If your income is low, apply to your own council rather than assuming the answer.",
          ],
        },
      },
      {
        heading: "Challenging your band",
        paragraphs: [
          "If you think your property is in the wrong band you can ask the Valuation Office Agency to review it, free of charge. The usual evidence is that comparable neighbouring properties sit in a lower band.",
          "Be aware that a review can move a band up as well as down, and that it applies to the property rather than to you. It is worth doing when you have a genuine comparison, and not worth doing on a hunch.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which Greater Manchester borough has the cheapest council tax?",
        answer:
          "Wigan, at £2,152.68 at Band D for 2026/27 including the Mayoral precept. It is the only one of the ten below £2,200. Stockport is the most expensive at £2,618.90.",
      },
      {
        question: "What is the Greater Manchester Mayoral precept?",
        answer:
          "A region-wide charge every household in the ten boroughs pays on top of their council's own element. For 2026/27 it is £439.25 at Band D — £285.30 for policing and £153.95 for general functions including fire and rescue and transport.",
      },
      {
        question: "Is council tax cheaper in Manchester than London?",
        answer:
          "No. Every Greater Manchester borough charges more at Band D than Westminster, Wandsworth, Hammersmith & Fulham or Kensington & Chelsea. The rent saving on a move north is large and real; the council tax saving does not exist.",
      },
      {
        question: "Do I pay council tax if I live in a house share?",
        answer:
          "It depends on the tenancy. Many Manchester room lets include council tax in the rent, in which case the landlord handles it. On a joint tenancy the tenants are jointly liable. Check which arrangement applies before you sign — it is worth £100 or more a month.",
      },
    ],
    related: [
      { href: "/manchester/boroughs", label: "All ten boroughs compared" },
      { href: "/manchester/guides/how-much-do-i-need-to-earn-to-live-in-manchester", label: "What salary you need" },
      { href: "/manchester/rent-index", label: "Rent by area" },
    ],
    sources: [
      "Local Government Finance Act 1992, s.5 (statutory band ratios)",
      "Greater Manchester Combined Authority Mayoral precept proposals for 2026/27",
      "Published 2026/27 Band D comparison tables, cross-checked across two independent sources",
    ],
  },

  // ────────────────────────────────────────────────────────────────
  {
    slug: "getting-around-greater-manchester-without-a-car",
    h1: "Getting around Greater Manchester without a car",
    metaTitle: "Getting around Greater Manchester without a car",
    metaDescription:
      "Metrolink, the Bee Network, heavy rail and the guided busway — how Greater Manchester's transport actually works, and where it does not.",
    summary:
      "What the network does well, what it does badly, and the areas where living car-free genuinely works.",
    category: "Transport",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 8,
    intro: [
      "Greater Manchester's public transport is better than its reputation and worse than a newcomer from London expects, and the reason for both is the same: it is a radial network with almost no orbital capacity.",
      "Getting into the middle from anywhere is straightforward. Getting from one suburb to another suburb is frequently slower by public transport than by bicycle, and sometimes slower than walking. Understanding that one fact is most of what you need to choose where to live.",
    ],
    sections: [
      {
        heading: "Metrolink is a tram, not an underground",
        paragraphs: [
          "Metrolink is the largest light rail network in the UK, running eight lines out to Altrincham, Ashton, Bury, East Didsbury, Eccles, the Trafford Centre, Rochdale and the airport. It is frequent, it is reliable, and through the city centre it runs on the street.",
          "That last point matters more than the map suggests. A tram from Sale to St Peter's Square covers most of its distance quickly and then crawls the final stretch through traffic lights. Journey times into town from the outer terminals are therefore longer than the distance implies — half an hour from Altrincham, closer to forty-five from Rochdale.",
          "Fares are zonal across four Metrolink zones, and tram fares have been frozen for several consecutive years. Check the current price with TfGM before you budget a daily commute on it: the tram, not the bus, is the part of the network that costs real money.",
        ],
      },
      {
        heading: "Heavy rail is the underrated option",
        paragraphs: [
          "The thing most newcomers miss is that Greater Manchester has an extensive suburban rail network alongside the tram, running into Piccadilly, Victoria and Oxford Road.",
          "It is often much faster. Levenshulme to Piccadilly is eight minutes by train. Heaton Moor is about ten. Urmston into Deansgate is fifteen. Those are journeys the tram cannot match from a comparable distance, and they are the reason several rail-only suburbs are better connected than their lack of a tram stop suggests.",
          "The trade is frequency and reliability. Some lines run two trains an hour, some stations are served far more thinly than their position implies, and a handful — Denton and Reddish South most notoriously — run a token weekly service that is no use to anybody. Check the actual timetable for the specific station, not the presence of a station on a map.",
        ],
      },
      {
        heading: "The Bee Network and the £2 bus fare",
        paragraphs: [
          "Greater Manchester brought its buses back under public control, the first English city region outside London to do so, and the network now runs as the Bee Network under a single brand, fare structure and ticketing system.",
          "The practical result for a renter is a £2 cap on a single bus fare, held for a fourth year, and an all-day bus ticket at £5. That is a genuinely cheap way to move around, and it makes bus-only areas more viable than they would otherwise be.",
          "The Wilmslow Road corridor through Rusholme, Fallowfield and Withington is among the busiest bus routes in Europe, with a service frequent enough that you do not check a timetable. Several otherwise poorly connected places — Middleton, Denton, Leigh — depend on buses entirely.",
        ],
        callout:
          "Fares change. The £2 single cap and £5 day ticket were in force at the time of writing and were confirmed frozen for 2026, but check TfGM for the current position before budgeting a commute against them.",
      },
      {
        heading: "The orbital problem",
        paragraphs: [
          "Every mode above runs into town. Almost nothing runs around it.",
          "Sale to Oldham is about twenty kilometres. By car it is around forty minutes. By public transport it means a tram into the centre, a walk across it, and a second tram out, which takes well over an hour. The same is true of Bolton to Stockport, Wigan to Ashton, and most other cross-conurbation pairs.",
          "This is why the commute pages on this site rank by destination rather than by distance, and why an area's connectivity score here reflects where it can actually reach rather than how many lines pass through it. If you and a partner work on opposite sides of Greater Manchester, the honest answer is often that one of you drives.",
        ],
      },
      {
        heading: "Where car-free genuinely works",
        paragraphs: [
          "Living without a car is comfortable, rather than merely possible, in a fairly specific set of places.",
        ],
        list: {
          items: [
            "The city centre, Ancoats, the Northern Quarter and Castlefield, where you walk to most of what you need and the whole tram network is at your door.",
            "The Wilmslow Road corridor — Rusholme, Fallowfield, Withington — on bus frequency alone.",
            "Rail suburbs with a fast, frequent service: Levenshulme, Heaton Moor, Urmston, Stockport.",
            "Tram towns with a real high street of their own: Altrincham, Sale, Prestwich, Chorlton, Ashton-under-Lyne.",
          ],
        },
      },
      {
        heading: "Cycling, briefly",
        paragraphs: [
          "Greater Manchester is flat across most of its inner ring and has built a substantial amount of segregated infrastructure over the past decade, including the Fallowfield Loop, a traffic-free route running several miles across south Manchester.",
          "For inner-ring journeys a bicycle frequently beats the tram outright, and it solves the orbital problem for anything under about eight kilometres. It is the single biggest upgrade available to someone living in Hulme, Chorlton, Levenshulme or Whalley Range.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you need a car in Manchester?",
        answer:
          "Not in the city centre, the inner suburbs on the Wilmslow Road corridor, or the tram and rail towns with a high street of their own. You very likely do in Worsley, Bramhall, Standish, Marple and much of the outer boroughs, and you probably do if you and a partner work on opposite sides of the conurbation.",
      },
      {
        question: "How much is a bus fare in Manchester?",
        answer:
          "A single is capped at £2 and an all-day bus ticket is £5, under the publicly controlled Bee Network. Those fares were confirmed frozen for 2026. Tram fares are separate and zonal across four Metrolink zones.",
      },
      {
        question: "Is Metrolink the same as the London Underground?",
        answer:
          "No. It is a tram network that runs on the street through the city centre, which makes journeys into town slower than the distance suggests. Its four zones also cover only the tram — heavy rail and buses price separately, which is why this site does not use Metrolink zones to describe how central an area is.",
      },
    ],
    related: [
      { href: "/manchester/commute", label: "Commute times by destination" },
      { href: "/manchester/lifestyle/transport", label: "Best-connected areas" },
      { href: "/manchester/methodology", label: "How journey times are estimated" },
    ],
    sources: [
      "Transport for Greater Manchester published fares and network information, reviewed September 2026",
      "Greater Manchester Combined Authority announcements on Bee Network fares for 2026",
    ],
  },

  // ────────────────────────────────────────────────────────────────
  {
    slug: "moving-to-manchester-from-london",
    h1: "Moving to Manchester from London",
    metaTitle: "Moving to Manchester from London: an honest comparison",
    metaDescription:
      "What actually changes when you move from London to Greater Manchester — rent, council tax, transport, salary and the things nobody warns you about.",
    summary:
      "What gets cheaper, what does not, and the differences that catch Londoners out.",
    category: "Moving",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 9,
    intro: [
      "The version of this comparison you usually get is that everything is half price. That is true of rent, roughly, and of almost nothing else.",
      "This guide sets out what genuinely changes, using the same figures the rest of this site runs on, and is deliberately specific about the things that do not improve — because those are what people regret not knowing.",
    ],
    sections: [
      {
        heading: "Rent: the saving is real and large",
        paragraphs: [
          "This is the part that lives up to the billing. A one-bed in central Manchester runs around £1,250 a month. A one-bed in the Northern Quarter or Ancoats is similar. Those figures buy you an outer-zone flat in London, not a central one.",
          "Move out of the middle and the gap widens sharply. Chorlton at £1,000 and Didsbury at £1,050 are the kind of desirable, well-connected suburbs that in London would be well north of £1,800. Levenshulme at £850 and Stretford at £850 have no real London equivalent at that price within half an hour of the centre.",
          "The median one-bed across every area covered here is about £800 a month.",
        ],
        dataBlock: "rent-spread",
      },
      {
        heading: "Council tax: the saving does not exist",
        paragraphs: [
          "Every one of the ten Greater Manchester boroughs charges more than £2,150 at Band D for 2026/27. Westminster charges around £1,050, Wandsworth around £1,028, Kensington & Chelsea around £1,667, Hammersmith & Fulham around £1,520.",
          "So a Londoner moving from one of those boroughs to anywhere in Greater Manchester will see their council tax roughly double, and should expect a bill of several hundred pounds a year more than they are used to. It does not come close to offsetting the rent saving, but it is a real and permanent line in the budget that catches people out in year one.",
          "The mitigating detail: most Greater Manchester housing sits in bands A to C rather than D, so the actual bill on a typical flat is lower than the Band D comparison implies.",
        ],
        dataBlock: "council-tax-boroughs",
      },
      {
        heading: "Transport: a different shape, not a smaller version",
        paragraphs: [
          "The instinct to read Metrolink as a smaller Tube is the single most expensive mistake a Londoner makes here, and it usually shows up as choosing a flat on a tram line because the map looks reassuring.",
          "Metrolink runs on the street through the city centre, so journeys into town take longer than the distance implies. Its four zones cover only the tram, so they tell you nothing about a place served by heavy rail. And there is effectively no orbital network at all: a suburb-to-suburb journey that would be a single Overground ride in London is, here, two trams and a walk across the middle.",
          "The compensations are genuine. Bus fares are capped at £2 a single, an all-day bus ticket is £5, and the suburban rail network is fast — Levenshulme to Piccadilly is eight minutes, which no comparable London journey matches for the money.",
        ],
      },
      {
        heading: "Salary: expect a cut, and check the maths",
        paragraphs: [
          "Most roles pay less here. The gap varies enormously by sector — it is narrow in tech and much wider in law and finance — but a 10 to 20 per cent reduction on a like-for-like London role is a reasonable planning assumption, and London weighting disappears entirely.",
          "The maths still usually works, because rent falls by far more than salary does. Someone on £55,000 in London paying £1,800 for a one-bed is committing about £21,600 a year to rent. The same person on £47,000 in Manchester paying £1,000 in Chorlton commits £12,000. They are meaningfully better off despite earning less.",
          "Do the calculation with your own numbers rather than the averages, particularly if you are near a tax threshold, and count the council tax difference in.",
        ],
        dataBlock: "salary-ladder",
      },
      {
        heading: "The things nobody warns you about",
        paragraphs: [
          "Four differences come up repeatedly from people who have made the move.",
        ],
        list: {
          items: [
            "Distances feel bigger than they are because orbital journeys are slow. Somewhere eight miles away can be genuinely awkward to reach, which is not how London trains you to think.",
            "The city centre is small. You can walk across it in twenty minutes, which is a real pleasure and also means the range of what is on your doorstep is narrower than in any given London district.",
            "The housing stock is older and colder. Victorian and interwar terraces dominate the inner suburbs, and heating a poorly insulated one costs meaningfully more than a modern flat. Check the EPC rating, which is on every listing by law.",
            "The countryside is genuinely close. The Peak District is forty minutes from most of the eastern boroughs and the West Pennine Moors sit directly behind Bolton. This is the upside people underrate most.",
          ],
        },
      },
      {
        heading: "Where Londoners tend to land",
        paragraphs: [
          "The pattern is fairly consistent. People who valued the walkability of a Hackney or a Peckham tend towards Ancoats, the Northern Quarter or Chorlton. People who came from a Zone 3 family suburb tend towards Sale, Urmston, Prestwich or Heaton Moor.",
          "The move that most often disappoints is choosing a cheap outer-borough town for the rent saving alone. The saving over an inner suburb is a few hundred pounds a month; the cost is forty minutes each way, and the inner Manchester suburbs are already cheap by the standards you are arriving with.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Manchester cheaper than London?",
        answer:
          "On rent, substantially — roughly half for a comparable area, and the gap widens outside the centre. On council tax, no: every Greater Manchester borough charges more at Band D than several inner London boroughs. On buses it is cheaper; on trams it is comparable.",
      },
      {
        question: "How much less will I earn in Manchester?",
        answer:
          "Plan for 10 to 20 per cent below a like-for-like London salary, with London weighting gone entirely. The gap is narrower in tech and wider in law and finance. Rent typically falls by considerably more than salary does, so most people come out ahead.",
      },
      {
        question: "Where should I live in Manchester if I am moving from London?",
        answer:
          "If you valued walkable inner London, look at Ancoats, the Northern Quarter and Chorlton. If you are coming from a family suburb, look at Sale, Urmston, Prestwich or Heaton Moor. Avoid choosing an outer-borough town purely on rent — the inner suburbs are already cheap by London standards and the commute difference is large.",
      },
    ],
    related: [
      { href: "/manchester/neighbourhoods", label: "Every Greater Manchester area" },
      { href: "/manchester/guides/getting-around-greater-manchester-without-a-car", label: "How the transport works" },
      { href: "/neighbourhoods", label: "The London side of this site" },
    ],
    sources: [
      "ONS Price Index of Private Rents, borough averages by bedroom count, July 2026",
      "Published 2026/27 Band D council tax figures for Greater Manchester and London",
      "Transport for Greater Manchester published fares, reviewed September 2026",
    ],
  },
];

export function getManchesterGuide(slug: string): ManchesterGuide | null {
  return MANCHESTER_GUIDES.find((g) => g.slug === slug) ?? null;
}

export function manchesterGuidesByRecency(): ManchesterGuide[] {
  return [...MANCHESTER_GUIDES].sort((a, b) => b.updated.localeCompare(a.updated));
}

export function manchesterGuidesLastUpdated(): string {
  return MANCHESTER_GUIDES.reduce(
    (latest, guide) => (guide.updated > latest ? guide.updated : latest),
    MANCHESTER_GUIDES[0].updated,
  );
}
