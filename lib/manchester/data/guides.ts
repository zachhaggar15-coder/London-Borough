/**
 * Greater Manchester editorial guides.
 *
 * Same rules as the guides in lib/data/guides.ts: written, not
 * templated; every checkable figure carries a source and a review date;
 * legal claims are England-only and say so; and if a guide would only
 * restate a neighbourhood page, it does not get written.
 *
 * The one addition for Manchester: these guides stand on their own and
 * do not reach for another city to explain this one. A reader here wants
 * to know what Greater Manchester costs and how it works, not how it
 * scores against somewhere they may never have lived. Explain the region
 * on its own terms or not at all.
 */

import type { CityGuide, CityGuideSection } from "@/lib/city-content";

/**
 * Kept as aliases so the existing imports across the Manchester data
 * modules keep working; the shapes themselves are now shared.
 */
export type ManchesterGuideSection = CityGuideSection;
export type ManchesterGuide = CityGuide;

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
          "The reason this rule is worth taking seriously here is that it is achievable. On a decent Greater Manchester salary, 35% is a constraint you can hold yourself to rather than a target you miss every month, which is what makes it useful as a planning number at all.",
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
          "This is where the number moves. A one-bed across the areas covered here ranges from about £550 in Wigan and Leigh to £1,250 in the city centre, with the median around £800.",
          "Unlike a room, you then pay council tax, energy, water, broadband and every standing charge yourself. Realistically that is £220 to £320 a month on top, and Greater Manchester council tax is not cheap — every borough charges above £2,150 at Band D, though most flats sit in bands A to C where the bill is meaningfully lower.",
          "So a £900 one-bed is really closer to £1,180 of committed monthly housing cost. At 35% of take-home that implies about £3,370 a month in the bank, which is roughly a £53,000 salary. Relax to 40% and it drops to about £45,000.",
          "For the city centre, a £1,250 one-bed plus bills is around £1,550 committed, implying roughly £4,430 of take-home at 35% — a salary north of £73,000. Living alone in the middle of the city is a genuinely expensive proposition, and the gap between that and a one-bed in Levenshulme is most of a second salary band.",
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
        dataBlock: "council-tax",
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
        question: "Is it cheaper to share or to live alone in Manchester?",
        answer:
          "Sharing, by more than the rent difference suggests. A room typically includes bills and often council tax — worth £120 to £200 a month you are not separately paying — where a one-bed adds £220 to £320 on top of the rent. The gap between a £600 room and an £800 one-bed is closer to £520 a month in practice than the £200 on the headline figures.",
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
      "Council tax is the cost people most reliably forget when they budget a move, and in Greater Manchester it is the one that most often surprises them. Every one of the ten boroughs charges over £2,150 at Band D, and the gap between the cheapest and the dearest runs to more than £460 a year.",
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
          "The precept is identical in all ten boroughs, so it is not what makes one dearer than another. Every pound of difference between Wigan and Stockport comes from the council’s own element and its adult social care precept, which is what makes comparing boroughs on the total a fair comparison.",
        ],
        dataBlock: "council-tax",
      },
      {
        heading: "Why the bills are high",
        paragraphs: [
          "Council tax income depends on the tax base — the number and value-band mix of properties in an area. Boroughs with a large share of low-band housing raise less per household at any given rate, and have to set a higher rate to fund the same services.",
          "That is most of the explanation for why the Greater Manchester figures sit where they do. Oldham and Rochdale have a housing stock weighted heavily towards the lower bands, so each household contributes less at any given rate and the rate has to be higher to fund the same services. Trafford, with far more high-band property, can charge less and raise more.",
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
        question: "Why is council tax higher in the cheaper boroughs?",
        answer:
          "Because council tax income depends on the value-band mix of the housing stock, not on what rents cost today. Boroughs with mostly band A to C property raise less per household at any given rate, so the rate is set higher. It is why Oldham and Rochdale charge more at Band D than Trafford does.",
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
      "Greater Manchester's public transport is better than its reputation in one direction and much worse in the other, and the reason for both is the same: it is a radial network with almost no orbital capacity.",
      "Getting into the middle from anywhere is straightforward. Getting from one suburb to another is frequently slower by public transport than by bicycle. Understanding that one fact is most of what you need to choose where to live.",
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
          "Greater Manchester brought its buses back under public control, and the network now runs as the Bee Network under a single brand, fare structure and ticketing system — one fare wherever you board, whoever operates the route.",
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
        question: "Is Metrolink an underground?",
        answer:
          "No. It is a tram: on its own alignment in the suburbs, but running on the street through the city centre, which makes journeys into town slower than the distance suggests. Its four zones also cover only the tram — heavy rail and buses price separately, which is why this site does not use Metrolink zones to describe how central an area is.",
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


  {
    slug: "how-metrolink-shapes-what-you-pay",
    h1: "How Metrolink shapes what you pay",
    metaTitle: "How Metrolink shapes Manchester rents, line by line",
    metaDescription:
      "The tram map is also a rent map. Which Metrolink lines carry a premium, which do not, and where the two have come apart.",
    summary:
      "Eight lines, ninety-nine stops, and a rent gradient that follows them closely enough to be worth reading deliberately.",
    category: "Transport",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 7,
    intro: [
      "Metrolink is the largest light rail network in the UK and the single biggest thing shaping where in Greater Manchester it makes sense to live. It runs to eight of the ten boroughs, and where it runs the rent tends to follow.",
      "That relationship is not uniform, though, and the places where it breaks down are the interesting ones. Some lines carry a clear premium at every stop; others reach places the market has not repriced at all.",
      "This guide reads the network as a rent map rather than a transport one, because for most people choosing an area that is what it actually is.",
    ],
    sections: [
      {
        heading: "The lines that carry a premium",
        paragraphs: [
          "The Altrincham line through south Manchester is the clearest case. Sale, Timperley and Altrincham all price at a level their distance from the centre does not explain on its own, and the tram is most of the reason — a fast, frequent, all-day service into the middle of town without a change.",
          "The Eccles and MediaCityUK branch works the same way for a different reason. Salford Quays repriced sharply when the BBC moved, and the tram is what makes the whole waterfront function as an extension of the city centre rather than a separate place.",
          "The Didsbury line has probably had the largest effect of any single extension. It converted a string of south Manchester suburbs from bus-dependent to tram-served, and rents across Withington, Didsbury and Burton Road moved in step.",
        ],
      },
      {
        heading: "The lines that have not repriced",
        paragraphs: [
          "The Oldham and Rochdale line is the outstanding example. It threads through the town centres of both boroughs on a genuinely useful service, and rents along it remain among the lowest in the conurbation. The journey is long — three-quarters of an hour or more from Rochdale — but it is direct, frequent and reliable.",
          "The Ashton line has a similar profile through Droylsden and Ashton-under-Lyne. East Manchester has seen a great deal of regeneration spending and comparatively little rent movement, which for a tenant is the useful direction for that gap to run.",
          "The Bury line sits somewhere between the two. Prestwich and Whitefield have repriced noticeably; Bury itself much less so, despite being on the same line with a decent journey time.",
        ],
        dataBlock: "rent-spread",
        callout:
          "The general rule in Greater Manchester is that the south and west of the tram network is priced and the north and east is not. If you are optimising for rent against journey time, that is where to start looking.",
      },
      {
        heading: "What the tram does not reach",
        paragraphs: [
          "Stockport is the significant gap. It is one of the largest towns in the conurbation, it has an excellent mainline station with fast trains into Piccadilly, and it has no tram at all. That combination has kept Heaton Moor, Heaton Chapel and Stockport centre well served and comparatively well priced.",
          "Wigan and Leigh are outside the network entirely, and it shows in both the rents and the journey times. Wigan has good mainline rail, Leigh has the guided busway, and neither is a substitute for the tram in frequency terms.",
          "Chorlton, Levenshulme and Fallowfield are all inside the city and off the network, and each behaves differently for it. Chorlton has repriced on character alone; Levenshulme sits on a train line that runs less often than its rent implies it should.",
        ],
      },
      {
        heading: "What a season ticket costs, and what it saves",
        paragraphs: [
          "Metrolink fares are zonal and a travelcard covering the zones you actually use is materially cheaper than daily tickets. Bee Network integration has brought bus and tram under one capped fare arrangement, which has made bus-plus-tram journeys considerably better value than they were.",
          "The comparison worth doing is against running a car. Once you add insurance, tax, fuel, servicing and — in the city centre — parking, an all-zone travelcard is a fraction of the cost. On the tram network that trade is usually clear-cut.",
          "Off the network it is not. From Wigan, Leigh, or the parts of Stockport and Bolton that the buses serve thinly, a car stops being an indulgence and becomes an operating requirement, and the monthly cost of that belongs in the rent calculation.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does living on a Metrolink line cost more?",
        answer:
          "In the south and west, usually yes — the Altrincham, Didsbury and Eccles lines all carry a visible premium. In the north and east it very often does not: the Oldham, Rochdale and Ashton lines run through some of the cheapest rents in the conurbation despite a direct service into the centre.",
      },
      {
        question: "Where is the best value on the tram network?",
        answer:
          "The Oldham and Rochdale line and the Ashton line, on the numbers. Both give you a direct, frequent, all-day service into the city centre at rents well below the south Manchester equivalent. The cost is journey time rather than reliability.",
      },
      {
        question: "Can I live in Greater Manchester without a car?",
        answer:
          "Comfortably, if you live on the tram network or on one of the better rail corridors such as Stockport. It becomes much harder in Wigan, Leigh and the outer parts of Bolton and Rochdale, where bus frequency drops away and a car turns into a running cost you should budget alongside rent.",
      },
    ],
    related: [
      { href: "/manchester/commute", label: "Journey times to every destination" },
      { href: "/manchester/guides/getting-around-greater-manchester-without-a-car", label: "Getting around without a car" },
      { href: "/manchester/rent-index", label: "Every area by rent" },
    ],
    sources: [
      "Transport for Greater Manchester Metrolink network map and Bee Network fare information, 2026",
      "ONS Price Index of Private Rents, Greater Manchester local authority averages, July 2026",
    ],
  },

  {
    slug: "your-first-month-in-manchester",
    h1: "Your first month in Manchester: the checklist",
    metaTitle: "Your first month in Manchester: a practical checklist",
    metaDescription:
      "What to sort in your first four weeks in Greater Manchester — the tenancy paperwork, council tax, the deposit scheme, GP registration and the bin round.",
    summary:
      "The unglamorous list. Most of it is quick, and the two or three items that are not will cost you if they slip.",
    category: "Moving",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 6,
    intro: [
      "Moving is mostly logistics, and the logistics of a first month have a habit of being handled in the wrong order. A few items are time-limited by law, a couple have real money attached, and the rest are simply easier done early.",
      "This is the list, in roughly the order it is worth doing. It is England-only in its legal detail, and it assumes you are renting privately, which is what the great majority of arrivals here are doing.",
    ],
    sections: [
      {
        heading: "The first week: money and paperwork",
        paragraphs: [
          "Check your deposit has been protected. In England a landlord must place a tenancy deposit in one of the government-approved schemes within thirty days of receiving it, and must give you the prescribed information about where it sits. If neither has happened by day thirty, that is a serious failure with a statutory penalty attached, and it also blocks the landlord from serving a section 21 notice.",
          "Read the tenancy agreement properly before you need it rather than after. The clauses that matter most are the break clause, whether the liability is joint and several, what the notice period is, and what you are responsible for maintaining.",
          "Take dated photographs of every room, including the things you would not think to photograph — the oven, the seals round the bath, any marks on the carpet. Send them to the letting agent by email so that there is a timestamped record outside your own phone.",
        ],
        list: {
          title: "Documents your landlord must give you in England",
          items: [
            "Deposit protection certificate and prescribed information, within 30 days",
            "A current gas safety certificate, where there is gas",
            "An Energy Performance Certificate for the property",
            "The government's How to Rent guide, in its current version",
            "An electrical installation condition report, on request",
          ],
        },
      },
      {
        heading: "Council tax, and the discount people forget",
        paragraphs: [
          "Tell the council you have moved in. Every Greater Manchester authority does this online and it takes a few minutes; leave it and the bill arrives later as a lump sum covering the period you did not pay.",
          "If you live alone, claim the single-person discount. It is 25% off the whole bill, it is not applied automatically, and across a year it is worth a meaningful amount at any band.",
          "Full-time students are exempt entirely, and a household of all full-time students pays nothing — but the exemption has to be evidenced with a certificate from the university, so ask for it early in the term rather than when the reminder arrives.",
        ],
        dataBlock: "council-tax",
        callout:
          "Register with the council in your first week and claim any discount at the same time. The single-person discount is the most commonly missed 25% in British household budgeting.",
      },
      {
        heading: "Utilities, and the meter reading that protects you",
        paragraphs: [
          "Take a meter reading on the day you move in — photograph the meter, note the date — and give it to whichever supplier the property is with. That single reading is what stops you being billed for the previous tenant's usage, and it is the cheapest insurance available.",
          "You are free to switch supplier from day one; you are not obliged to stay with whoever the landlord left in place. Water is different: in this region you have no choice of supplier, and in most rented properties it is billed separately from council tax.",
          "Broadband is the one to start early, because an engineer appointment can be two or three weeks out. Check what infrastructure the building has before you order — several parts of Greater Manchester have full-fibre alternatives to the incumbent network that are cheaper and faster.",
        ],
      },
      {
        heading: "The rest of the first month",
        paragraphs: [
          "Register with a GP practice near where you live. You do not need proof of address or immigration status to register with an NHS practice in England, though many practices ask for it anyway; if you are turned away for lack of documents, that is not the rule and it is worth pushing back politely.",
          "Register to vote, which also builds your credit file at the new address — a small thing that matters disproportionately if you later apply for anything requiring a credit check.",
          "Find out your bin day and which bin is which. Greater Manchester's collection arrangements vary by borough and the recycling rules are more specific than most people assume, so the leaflet is worth the two minutes.",
          "Get a travelcard rather than paying daily. Whatever your commute looks like, the capped and season options under the Bee Network are cheaper than buying as you go, and the saving compounds quietly all year.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long does my landlord have to protect my deposit?",
        answer:
          "Thirty days from receiving it, in England. Within that window the deposit must be placed in one of the government-approved schemes and you must be given the prescribed information about it. If that does not happen, you may be entitled to compensation and the landlord cannot serve a valid section 21 notice.",
      },
      {
        question: "Do I have to tell the council I have moved in?",
        answer:
          "Yes, and it is in your interest to do it promptly. Every Greater Manchester authority takes the notification online. Registering late does not reduce the bill, it just delays it, and it delays any discount you are entitled to as well.",
      },
      {
        question: "Can I register with a GP without proof of address?",
        answer:
          "Yes. NHS England guidance is clear that a practice cannot refuse registration because you lack proof of address, identification or immigration status. Practices often ask anyway, so it is worth knowing the position before you are turned away.",
      },
    ],
    related: [
      { href: "/manchester/guides/renting-in-greater-manchester-first-time", label: "Renting here for the first time" },
      { href: "/manchester/guides/greater-manchester-council-tax-explained", label: "Council tax explained" },
      { href: "/manchester/boroughs", label: "Council tax by borough" },
    ],
    sources: [
      "Housing Act 2004, sections 213 to 215, on tenancy deposit protection in England",
      "Local Government Finance Act 1992 and the statutory single-person discount",
      "NHS England primary medical care policy guidance on patient registration",
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
