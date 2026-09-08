import type { CityGuide } from "@/lib/city-content";

/**
 * West of England editorial guides.
 *
 * Same rules as everywhere else on the site: written, not templated;
 * every checkable figure carries a source and a review date; legal
 * claims are England-only and say so; and if a guide would only restate
 * a neighbourhood page, it does not get written.
 *
 * These guides explain this region on its own terms and never reach for
 * another city to do it. A reader here wants to know what Bristol costs
 * and how it works, not how it scores against somewhere they may never
 * have lived.
 */

const PUBLISHED = "2026-09-07";

export const BRISTOL_GUIDES: CityGuide[] = [
  {
    slug: "how-much-do-i-need-to-earn-to-live-in-bristol",
    h1: "How much do you need to earn to live in Bristol?",
    metaTitle: "How much do you need to earn to live in Bristol?",
    metaDescription:
      "What salary you actually need in Bristol and the West of England, worked backwards from rent to take-home pay. Honest figures for sharing and for living alone.",
    summary:
      "Worked backwards from rent to salary — for a room, and for the very different proposition of living on your own.",
    category: "Money",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 8,
    intro: [
      "Bristol has a problem that its size does not explain. It is the eighth-largest city in England and it has the rents of somewhere considerably bigger — a one-bed here costs more than one in Birmingham, Leeds, Sheffield or Newcastle, and the gap is not small.",
      "The reasons are structural rather than temporary: a tightly drawn city boundary with green belt on three sides, two large universities, a strong professional employment base and a decade in which very little was built. None of that is going to change quickly, so the honest starting point is that this is an expensive city and the numbers below say so.",
      "This guide works the question backwards — from a monthly rent figure to the gross salary that supports it — so you can see where your own number falls rather than trusting a round figure from a listicle.",
    ],
    sections: [
      {
        heading: "Start from the rent, not the salary",
        paragraphs: [
          "The usual advice is to spend no more than a third of your take-home pay on rent. That is a reasonable ceiling and a poor target: at a third you can still absorb a boiler failure or a month between jobs, and past 45% you are one unexpected bill away from a problem.",
          "So the question is not what you earn but what a given rent demands of you. Work from the rent you would actually pay, divide by 0.35, and gross it back up through income tax and National Insurance. The table below does that for the salary rungs used across this section.",
        ],
        dataBlock: "salary-ladder",
      },
      {
        heading: "What the region actually costs",
        paragraphs: [
          "Five points across the distribution of the areas covered here, from the cheapest to the dearest. The spread is the point: the same salary buys a very different life at each end of it, and the difference is measured in journey time.",
          "Rooms are the number most people should look at first. Bristol has an unusually large shared market for a city of its size, and a room very often includes bills and council tax — worth £120 to £200 a month you are not separately paying, which is a real difference the headline figures hide.",
        ],
        dataBlock: "rent-spread",
        callout:
          "A room in a share at £600 needs roughly £26,000 a year to sit inside the 35% guideline. A one-bed at £1,200 needs roughly £58,000. That gap is the single most important fact about renting in this city.",
      },
      {
        heading: "The things the rent figure leaves out",
        paragraphs: [
          "Council tax is the big one, and Bristol has the highest Band D charge of the four authorities covered here. On a flat in Band B or C you are looking at £180 to £200 a month on top of rent, and unlike much of northern England a great deal of Bristol's Victorian stock sits at Band D or above.",
          "Energy costs are worse here than the mild climate suggests. Clifton, Cotham, Montpelier and central Bath are full of large listed or conservation-area properties with single glazing that cannot legally be replaced, and heating a high-ceilinged Georgian flat in February is genuinely expensive.",
          "Transport is the one thing that can go either way. In the inner ring a bike replaces a bus pass entirely and the Railway Path makes the east of the city effectively free to reach. From Portishead, Thornbury or Midsomer Norton you will need a car, and running one costs more per month than most people's council tax.",
        ],
        list: {
          title: "Monthly costs beyond rent, for a single person in a one-bed",
          items: [
            "Council tax at Band B in Bristol: about £176 a month, before any single-person discount",
            "Single-person council tax discount: 25% off, so about £132 a month at Band B",
            "Energy in a period conversion: £90 to £160 a month depending on the season and the glazing",
            "Water: the South West has historically had the highest bills in England, budget £40 a month",
            "A bus pass if you cannot cycle: around £70 a month for a Bristol-wide ticket",
          ],
        },
      },
      {
        heading: "Where the salary rungs actually land",
        paragraphs: [
          "At £25,000 a room in a share is the realistic answer, and it is a perfectly normal one here — the shared market is large, well-established and not confined to students.",
          "Between £30,000 and £40,000 a one-bed becomes possible in the cheaper parts of the city and the outer towns, but not in the inner ring. This is the band where the commute-versus-rent trade actually bites.",
          "Past £50,000 most of the city opens up and the question stops being what you can afford and starts being where you want to be. That is a lower threshold than London and a higher one than most English cities of comparable size.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Bristol expensive to live in?",
        answer:
          "For its size, yes — noticeably so. Bristol's average rents are the highest of any English city outside London and the South East commuter belt, and its Band D council tax is the highest of the four West of England authorities. The offsetting factor is that the city is compact enough that a bike replaces most transport costs.",
      },
      {
        question: "What is a good salary in Bristol?",
        answer:
          "Around £30,000 makes a comfortable shared life straightforward. Around £45,000 to £50,000 makes living alone in a decent part of the city realistic without stretching. Below £25,000 the shared market is the only sensible route, and the outer towns are worth looking at seriously.",
      },
      {
        question: "Is it cheaper to live outside Bristol and commute in?",
        answer:
          "Usually yes on rent and often not on total cost. Weston-super-Mare, Yate and the Somerset coalfield are meaningfully cheaper, but the season ticket, or the car if there is no station, eats a large part of the saving — and the journey costs you time every day. Keynsham and Nailsea tend to work out best because both have fast, frequent trains.",
      },
    ],
    related: [
      { href: "/bristol/salary", label: "What your salary rents" },
      { href: "/bristol/rent-index", label: "Every area by rent" },
      { href: "/bristol/councils", label: "Council tax by authority" },
    ],
    sources: [
      "ONS Price Index of Private Rents, local authority averages by bedroom count, July 2026",
      "Published 2026/27 Band D council tax comparison tables for the South West",
      "HMRC income tax and Class 1 National Insurance thresholds for 2026/27",
    ],
  },

  {
    slug: "bristol-council-tax-explained",
    h1: "Council tax in Bristol and the West of England, explained",
    metaTitle: "Council tax in Bristol and the West of England explained",
    metaDescription:
      "What council tax actually costs across Bristol, South Gloucestershire, BANES and North Somerset — and why the headline figures do not compare like with like.",
    summary:
      "What each of the four authorities charges, what the precepts are for, and the parish trap that makes South Gloucestershire look cheaper than it is.",
    category: "Money",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 6,
    intro: [
      "Council tax is the second-largest housing cost most renters have and the one they most often forget to check before signing. In this region it is also the figure most likely to be quoted misleadingly, because the four authorities do not all bill the same things.",
      "This guide sets out what each charges, what is inside the number, and the one adjustment you need to make before comparing a Bristol address with one anywhere else in the region.",
    ],
    sections: [
      {
        heading: "What the four authorities charge",
        paragraphs: [
          "Band D charges for 2026/27, cheapest first. Each figure is the total for the year: the authority's own element including its adult social care precept, plus the Avon and Somerset Police and Crime Commissioner precept and the Avon Fire Authority precept, which every household in all four pays at the same rate.",
        ],
        dataBlock: "council-tax",
      },
      {
        heading: "The parish trap",
        paragraphs: [
          "Bristol has no parish or town councils at all. Every other authority in the region has plenty of them, and they levy their own precept on top of the figures above. Portishead, Yate, Thornbury, Keynsham, Nailsea and Clevedon all have one, and it typically adds somewhere between £50 and £200 a year at Band D.",
          "The practical consequence is that comparing Bristol's charge against South Gloucestershire's or North Somerset's on the headline figures is comparing a complete number against an incomplete one. Bristol still comes out dearest, but the gap is smaller than the table suggests — and in a few parishes it closes almost entirely.",
        ],
        callout:
          "Before you sign anywhere outside Bristol, look up the parish precept for that specific address. It is published on the council's council tax pages and it is the one line nobody mentions at a viewing.",
      },
      {
        heading: "Bands, and why 1991 still matters",
        paragraphs: [
          "Bands are based on what a property was worth on 1 April 1991, not on what it is worth now. This is the single most common point of confusion about the tax, and it has a specific consequence in this region: Bristol's Victorian and Georgian stock was already expensive in 1991, so a great deal of it sits at Band D or above.",
          "That makes Band D a much more representative figure here than it is in most of England. In the northern conurbations the majority of housing sits in bands A to C and the Band D headline overstates a typical bill; in Clifton, Redland, Cotham and central Bath it very often understates it.",
          "Every other band is a fixed statutory multiple of Band D — from six-ninths at Band A to eighteen-ninths at Band H — set nationally under the Local Government Finance Act 1992. Those ratios do not vary by authority, so the council pages here derive every band from the Band D figure rather than storing them.",
        ],
      },
      {
        heading: "Discounts worth knowing about",
        paragraphs: [
          "If you live alone you get 25% off, which on a Bristol Band C property is worth about £700 a year. Full-time students are disregarded entirely, and a household of only students pays nothing at all — which matters in Oldfield Park, Fishponds and around the Clifton Triangle more than anywhere.",
          "If a property is empty and unfurnished the rules changed recently and are now considerably less generous than they were; do not assume a void period is free. And if you think your band is wrong, the Valuation Office Agency will review it — but be aware the review can move the band either way.",
        ],
        list: {
          title: "The discounts most often missed",
          items: [
            "Single-person discount: 25% off, and it is not applied automatically — you have to claim it",
            "Full-time students: disregarded, and an all-student household pays nothing",
            "Apprentices and people under 20 in full-time education: disregarded",
            "Severe mental impairment: disregarded, and this one is very widely under-claimed",
            "Council Tax Reduction: means-tested, and each of the four authorities runs its own scheme with its own rules",
          ],
        },
      },
    ],
    faqs: [
      {
        question: "Which West of England authority has the lowest council tax?",
        answer:
          "Bath and North East Somerset has the lowest headline Band D charge of the four for 2026/27, and Bristol the highest. But BANES contains a great many parishes that levy their own precept on top, so for a specific address outside Bath itself the effective gap is smaller than the headline suggests.",
      },
      {
        question: "Do renters pay council tax in Bristol?",
        answer:
          "Usually yes. In a self-contained flat or house the tenant is liable, not the landlord. In a house in multiple occupation the landlord is normally liable and the cost is built into the rent, which is one reason a room in a share is better value than the headline rent difference implies.",
      },
      {
        question: "Why is Bristol's council tax so high?",
        answer:
          "Bristol is a unitary authority with a large city's service obligations, no county council to share costs with, and a comparatively small tax base relative to its population — the city boundary is tightly drawn and excludes much of the wealthier suburban fringe, which sits in South Gloucestershire and North Somerset instead.",
      },
    ],
    related: [
      { href: "/bristol/councils", label: "The four authorities compared" },
      { href: "/bristol/guides/how-much-do-i-need-to-earn-to-live-in-bristol", label: "What salary do you need?" },
      { href: "/bristol/methodology", label: "How these figures are worked out" },
    ],
    sources: [
      "Published 2026/27 Band D comparison tables for the South West, cross-checked across two independent sources",
      "Local Government Finance Act 1992, section 5, for the statutory band ratios",
      "Avon and Somerset Police and Crime Commissioner and Avon Fire Authority precept resolutions for 2026/27",
    ],
  },

  {
    slug: "getting-around-bristol-without-a-car",
    h1: "Getting around Bristol without a car",
    metaTitle: "Getting around Bristol without a car: what actually works",
    metaDescription:
      "Bristol has no metro and no tram. What that means in practice, which areas genuinely work car-free, and where the buses will let you down.",
    summary:
      "Which parts of the region genuinely work without a car, and an honest account of where the network fails.",
    category: "Transport",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 7,
    intro: [
      "Bristol is the largest city in England with no urban rail network worth the name. There is no metro, no tram, and until recently there was barely a bus lane. What there is instead is a suburban rail line running to Severn Beach, a handful of stations on the main lines, three MetroBus corridors and an extraordinary amount of cycling.",
      "That combination produces a city where being car-free is completely normal in some neighbourhoods and close to impossible in others, and the boundary between the two is sharper than in most places. This guide says where it falls.",
    ],
    sections: [
      {
        heading: "The bike is the real transport network",
        paragraphs: [
          "Bristol has the highest cycling share of any large English city, and it is not an accident of culture — it is the Bristol and Bath Railway Path. Thirteen miles of former railway, entirely traffic-free, running from the city centre through Easton, Fishponds and Kingswood and on to Bath. Nothing else in the region moves people as reliably at peak.",
          "If you live anywhere along it, a bike beats every other mode into the centre by a wide margin and does so at a fixed, predictable time. The catch is the hills. The Railway Path is flat because it was a railway; the rest of the city is emphatically not, and the climb from the centre up to Clifton, Kingsdown, Montpelier or Totterdown defeats a lot of people who arrive intending to cycle everywhere.",
        ],
        callout:
          "The single most useful question when viewing a flat in Bristol is not how far it is from the centre. It is whether the route home is uphill.",
      },
      {
        heading: "The rail lines, and their limits",
        paragraphs: [
          "The Severn Beach line is the closest thing Bristol has to a metro: Temple Meads out through Montpelier, Redland and Clifton Down to Sea Mills, Shirehampton and Avonmouth. It is genuinely useful and it is half-hourly, which is the problem. It also stops running early enough to shape your evenings.",
          "The main lines are better. Bedminster, Lawrence Hill, Stapleton Road, Keynsham, Nailsea and Backwell, Yate and Weston-super-Mare all sit on services that run several times an hour at peak, and the Bath Spa to Temple Meads run is thirteen minutes. If you work in Bath and live in Bristol, or the other way round, the train is not merely viable — it is faster than driving.",
          "What no line does is run around the city. There is no orbital rail at all, so a journey like Bedminster to Filton, eight kilometres in a straight line, means going into the centre and out again.",
        ],
        list: {
          title: "Areas that genuinely work without a car",
          items: [
            "Anywhere in BS1, BS2, BS3, BS5, BS6 or BS8 — the inner ring is walkable, cyclable and well bused",
            "Montpelier, Redland, Clifton Down, Sea Mills and Shirehampton, on the Severn Beach line",
            "Bedminster, Lawrence Hill and Stapleton Road, minutes from Temple Meads on the main line",
            "Keynsham and Nailsea, for anyone commuting to Bristol or Bath by train",
            "Central Bath, Oldfield Park and Bathwick — Bath is small enough to walk end to end",
          ],
        },
      },
      {
        heading: "Where the network lets you down",
        paragraphs: [
          "Aztec West and the Filton aerospace cluster is the region's largest single employment site and one of the hardest places to reach without a car. Tens of thousands of people work there and the public transport offer from most of Bristol is a slow bus or a train to Filton Abbey Wood followed by a walk.",
          "Portishead has twenty thousand residents and no station. The rail line is under construction and will change the picture substantially when it opens, but until then the A369 decides your morning and it queues badly.",
          "Thornbury, Midsomer Norton and Clevedon have no station either, and the bus journeys from all three are long enough that they are effectively car-dependent. Weston-super-Mare has two stations and good trains, but is fifty minutes from Bristol on the fastest of them.",
        ],
      },
      {
        heading: "What MetroBus actually is",
        paragraphs: [
          "MetroBus is not bus rapid transit in the sense the name implies. It is three routes with substantial stretches of dedicated lane, off-board ticketing and better shelters — a genuine improvement over an ordinary bus on the same road, and nothing like a tram.",
          "Where the segregated sections run, the m1 to Hengrove and Cribbs Causeway and the m2 to Long Ashton are reliable at peak in a way ordinary Bristol buses are not. Where they rejoin general traffic, they queue with everything else.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you need a car in Bristol?",
        answer:
          "Not if you live inside the inner ring or on one of the rail lines. Bristol's inner neighbourhoods are compact, well served by buses and unusually good for cycling, and parking is hard enough that a car is often a liability. Outside the city — Portishead, Thornbury, Clevedon, the Somerset coalfield — you will need one.",
      },
      {
        question: "Is Bristol good for cycling?",
        answer:
          "Yes, and it has the highest cycling share of any large English city. The Bristol and Bath Railway Path is the reason: thirteen traffic-free miles that make the east of the city and Bath itself reachable at a predictable time. The hills are the counterweight, and they are steeper than visitors expect.",
      },
      {
        question: "How long does it take to get from Bristol to Bath?",
        answer:
          "Thirteen minutes on the train between Bath Spa and Temple Meads, or about twenty minutes door to door from the centre of either city. By car on the A4 it is typically forty minutes at peak and can be much worse. The train is the obvious choice in both directions.",
      },
    ],
    related: [
      { href: "/bristol/commute", label: "Commute times by destination" },
      { href: "/bristol/lifestyle/transport", label: "Best-connected areas" },
      { href: "/bristol/neighbourhoods", label: "Every area by travel band" },
    ],
    sources: [
      "Published National Rail timetables for the Severn Beach line and the Bristol to Bath corridor, September 2026",
      "West of England Combined Authority MetroBus route and infrastructure documentation",
      "Department for Transport cycling and walking statistics by local authority",
    ],
  },

  {
    slug: "renting-in-bristol-first-time",
    h1: "Renting in Bristol for the first time",
    metaTitle: "Renting in Bristol for the first time: shares, viewings and deposits",
    metaDescription:
      "How Bristol's rental market actually works — the size of the shared sector, what a viewing looks like, deposit rules in England, and the traps in period stock.",
    summary:
      "A city with an unusually large shared market, an unusually old housing stock and a viewing culture that rewards being ready.",
    category: "Renting",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 7,
    intro: [
      "Bristol's rental market has two features that shape everything else about it. The shared sector is very large for a city of this size, extending well beyond students into people in their late twenties and thirties; and a great deal of the housing stock is Victorian or older, converted rather than purpose-built.",
      "Both facts have consequences for what you should look at, what you should ask, and what the flat will cost you to run once you are in it.",
      "This guide covers the practical side of finding and taking a tenancy here. The legal detail is England-only, and it assumes a private assured shorthold tenancy, which is what almost all of this market is.",
    ],
    sections: [
      {
        heading: "The shared market is the default, not the fallback",
        paragraphs: [
          "A room in a shared house is the normal entry point to this city and there is no stigma attached to it at any age. The stock is large, well-established, and spread right across the inner ring rather than confined to the student areas.",
          "Rooms very often include bills and council tax in the advertised rent. That is worth between £120 and £200 a month you are not separately paying, which makes a direct comparison with a one-bed rent misleading unless you adjust for it.",
          "Read the tenancy type carefully. Most shares are let on a joint tenancy where everyone is liable for the whole rent, which means a flatmate leaving becomes your problem. Individual room contracts exist, cost a little more, and remove that risk entirely.",
        ],
        dataBlock: "rent-spread",
      },
      {
        heading: "Viewings move quickly and reward preparation",
        paragraphs: [
          "Good properties in the inner ring are often let within days, sometimes at a block viewing where a dozen people see the place in an hour. Turning up with references, proof of income and a guarantor's details already assembled is the single largest advantage available.",
          "Agents will typically want to see identification, evidence of income at around thirty times the monthly rent annually, a previous landlord's reference and, for anyone whose income does not clear the threshold, a UK-based guarantor.",
          "Holding deposits are capped at one week's rent in England, and there are strict rules about when they may be kept. A request for more than that, or for a non-refundable administration fee, is not lawful.",
        ],
        callout:
          "Under the Tenant Fees Act 2019 a letting agent in England may not charge you for referencing, an inventory, a contract or admin. A holding deposit is capped at one week's rent and the tenancy deposit at five weeks' rent, where the annual rent is under £50,000.",
      },
      {
        heading: "What to check in Bristol's period stock",
        paragraphs: [
          "Heating and glazing are the questions that matter most here. Clifton, Cotham, Montpelier and central Bath are full of large listed or conservation-area properties where the windows cannot legally be replaced, and heating a high-ceilinged Georgian flat through February is genuinely expensive. Ask to see the EPC and take the rating seriously.",
          "Damp is the second. A lot of the city's Victorian terraces are cut into a hillside, and lower-ground-floor flats in particular are worth inspecting properly — look behind furniture, check the corners of external walls, and ask directly what has been done about it.",
          "The third is the hill itself. Bristol is much steeper than its reputation suggests, and a flat that looks fifteen minutes from town on a map can be a serious climb home. Walk the route before you sign, not after.",
        ],
      },
      {
        heading: "Deposits, inventories and getting the money back",
        paragraphs: [
          "Your deposit must be protected in one of the government-approved schemes within thirty days, and you must be given the prescribed information telling you which. Check this actively rather than assuming; it is the most common landlord failure and it carries a statutory penalty.",
          "The inventory is what decides the end of the tenancy. Go through it line by line on the day you move in, add everything the agent has not, photograph it all with dates, and email the lot so there is a record outside your own device.",
          "Fair wear and tear is not damage, and the deposit schemes' own adjudication guidance is clear about the distinction. If a deduction looks unreasonable, the scheme's free dispute resolution service is the route, and the burden is on the landlord to justify the claim.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much deposit can a landlord ask for in Bristol?",
        answer:
          "Five weeks' rent, where the annual rent is under £50,000, plus a holding deposit of no more than one week's rent while referencing is done. Anything above that is not lawful in England, and neither are separate charges for referencing, inventories or administration.",
      },
      {
        question: "Is house-sharing normal in Bristol beyond student age?",
        answer:
          "Very much so. The shared sector here is unusually large for the size of the city and extends well into people's thirties. Rooms frequently include bills and council tax, which makes them better value against a one-bed than the headline rents suggest.",
      },
      {
        question: "What should I check before renting a period flat in Bristol?",
        answer:
          "The EPC rating and the heating first — a lot of the inner ring is listed or in a conservation area where the single glazing cannot be replaced, and winter running costs are correspondingly high. Then damp, particularly in lower-ground-floor conversions, and finally the walk home, because the city is much hillier than it looks.",
      },
    ],
    related: [
      { href: "/bristol/guides/how-much-do-i-need-to-earn-to-live-in-bristol", label: "What you need to earn" },
      { href: "/bristol/guides/bristol-council-tax-explained", label: "Council tax explained" },
      { href: "/bristol/rent-index", label: "Every area by rent" },
    ],
    sources: [
      "Tenant Fees Act 2019, on permitted payments and deposit caps in England",
      "Housing Act 2004, sections 213 to 215, on tenancy deposit protection",
      "ONS Price Index of Private Rents, West of England local authority averages, July 2026",
    ],
  },

  {
    slug: "your-first-month-in-bristol",
    h1: "Your first month in Bristol: the checklist",
    metaTitle: "Your first month in Bristol: a practical checklist",
    metaDescription:
      "What to sort in your first four weeks in Bristol — deposit protection, council tax and the single-person discount, water, the GP, the bins and the bus.",
    summary:
      "The unglamorous list, in the order worth doing it. Two items are time-limited by law and one is worth 25% of your council tax.",
    category: "Moving",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 6,
    intro: [
      "The first month somewhere new is mostly administration, and it tends to get done in the wrong order. A couple of items have legal deadlines, one or two have real money attached, and the rest are simply cheaper to do early than late.",
      "This is that list. The legal detail is England-only, and it assumes you are renting privately from a landlord or agent.",
    ],
    sections: [
      {
        heading: "Week one: the paperwork with deadlines",
        paragraphs: [
          "Confirm your deposit has been protected. In England it must go into one of the government-approved schemes within thirty days, and the prescribed information must reach you in the same window. Ask for the certificate; do not assume.",
          "Take dated photographs of every room, the appliances and anything already marked, and email them to the agent so the record sits outside your phone. Add anything missing to the inventory before you sign it off.",
          "Read your tenancy for the break clause, the notice period and whether liability is joint and several. Those three answers determine what your options are if anything changes, and they are much easier to establish now than in a hurry later.",
        ],
      },
      {
        heading: "Council tax, and the discount nobody applies for you",
        paragraphs: [
          "Register with the right authority. Bristol, South Gloucestershire, Bath and North East Somerset and North Somerset each run their own online move-in form, and which one you need depends on the address rather than the postal town.",
          "Claim the single-person discount if you live alone. It is 25% off the entire bill and it is not applied automatically. Given Bristol has the highest Band D charge of the four authorities here, that is a substantial sum over a year.",
          "Full-time students are exempt, and an all-student household pays nothing — but the exemption needs a council tax certificate from the university, which is worth requesting at the start of term rather than when the bill arrives.",
        ],
        dataBlock: "council-tax",
        callout:
          "Check which authority your address actually falls under before you register. The Bristol boundary is drawn tightly and a good deal of what people call Bristol is billed by South Gloucestershire at a different rate.",
      },
      {
        heading: "Utilities, and the water bill that is bigger than you expect",
        paragraphs: [
          "Photograph the meters on the day you move in and send the readings to the existing supplier. That one action is what prevents you inheriting the previous tenant's usage, and it takes a minute.",
          "Water is worth singling out here. The South West has historically had among the highest water bills in England, it is billed separately from council tax in most rented homes, and you have no choice of supplier. Budget for it properly rather than treating it as a rounding error.",
          "Broadband takes the longest lead time of anything on this list, so order it in your first few days. Check what is available at the address first; parts of the city have full-fibre options that are both cheaper and faster than the incumbent network.",
        ],
      },
      {
        heading: "The rest of the month",
        paragraphs: [
          "Register with a GP practice near home. You do not need proof of address or immigration status to register with an NHS practice in England, whatever a receptionist may say, and the sooner it is done the less likely you are to be doing it while ill.",
          "Register to vote at the new address, which also helps your credit file settle — a small administrative thing with a disproportionate effect if you later need a credit check.",
          "Sort out how you are actually going to travel. Bristol is a city where a bike genuinely replaces a bus pass for a large share of journeys, and the Railway Path makes most of the east side effectively free to reach. If cycling is not for you, a monthly bus ticket is meaningfully cheaper than paying per journey.",
          "Find your bin day and the recycling rules for your authority, which differ across the four councils covered here more than you would expect.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which council do I pay council tax to in Bristol?",
        answer:
          "It depends on the exact address rather than the postal town. Bristol City Council covers the tightly drawn city boundary; a great deal of what people think of as Bristol — Filton, Bradley Stoke, Kingswood — is South Gloucestershire, and Keynsham is Bath and North East Somerset. The rates differ, so check before you budget.",
      },
      {
        question: "Is water billed separately from council tax in Bristol?",
        answer:
          "Yes, in almost all rented properties. The South West has historically had among the highest water bills in England, there is no supplier choice, and it is a real monthly cost rather than a rounding error. Budget around £40 a month for a single person unless you know otherwise.",
      },
      {
        question: "How quickly do I need to tell the council I have moved?",
        answer:
          "As soon as you can. Every authority here takes it online in a few minutes. Delaying does not reduce the bill — it just arrives later as a larger lump, and any discount you are entitled to starts later too.",
      },
    ],
    related: [
      { href: "/bristol/guides/bristol-council-tax-explained", label: "Council tax explained" },
      { href: "/bristol/guides/getting-around-bristol-without-a-car", label: "Getting around without a car" },
      { href: "/bristol/councils", label: "Council tax by authority" },
    ],
    sources: [
      "Housing Act 2004, sections 213 to 215, on tenancy deposit protection in England",
      "Local Government Finance Act 1992 and the statutory single-person discount",
      "NHS England primary medical care policy guidance on patient registration",
    ],
  },
];
