/**
 * Editorial guides.
 *
 * These are hand-written explainers, not generated from the neighbourhood
 * dataset. That distinction is the whole point of the cluster: the rest of
 * the site answers "which area", and this answers the questions people ask
 * before they have any idea which area — what things cost, how renting
 * works, what the law changed this year.
 *
 * Rules for anything added here:
 *  - Write it. Do not template it. Two guides should not share a skeleton.
 *  - Every checkable figure needs a source in `sources` and a review date.
 *  - Legal claims are England-only and must say so.
 *  - If a guide would just restate a neighbourhood page, don't write it.
 */

export type GuideSection = {
  heading: string;
  paragraphs: string[];
  list?: { title?: string; items: string[] };
  callout?: string;
  /** Renders a live table from site data beneath the prose. */
  dataBlock?:
    | "council-tax-bands"
    | "council-tax-boroughs"
    | "salary-ladder"
    | "rent-spread";
};

export type GuideFaq = { question: string; answer: string };

export type Guide = {
  slug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** One-liner for the hub grid and the ItemList schema. */
  summary: string;
  category: "Money" | "Renting" | "Transport" | "Moving";
  published: string;
  updated: string;
  readMinutes: number;
  intro: string[];
  sections: GuideSection[];
  faqs: GuideFaq[];
  related: { href: string; label: string }[];
  sources?: string[];
};

export const GUIDE_CATEGORIES = [
  "Money",
  "Renting",
  "Transport",
  "Moving",
] as const;

export const GUIDES: Guide[] = [
  // ────────────────────────────────────────────────────────────────
  {
    slug: "how-much-do-i-need-to-earn-to-live-in-london",
    h1: "How much do you need to earn to live in London?",
    metaTitle: "How much do you need to earn to live in London?",
    metaDescription:
      "What salary you actually need to live in London, worked from take-home pay to rent and bills. Honest figures for sharing and for living on your own.",
    summary:
      "The salary that supports a room in a share, and the very different salary that supports living alone.",
    category: "Money",
    published: "2026-09-04",
    updated: "2026-09-04",
    readMinutes: 8,
    intro: [
      "There is no single number, and anyone who gives you one is selling something. What you need depends almost entirely on one decision: whether you share a flat or live in one on your own. The gap between those two answers in London is roughly £30,000 of salary.",
      "This guide works the question backwards — from a monthly rent figure to the gross salary that supports it — so you can see where your own number lands rather than trusting a headline.",
    ],
    sections: [
      {
        heading: "Start with take-home pay, not salary",
        paragraphs: [
          "Gross salary is the wrong number to budget with. What matters is what reaches your account after income tax and National Insurance, and that is a smaller fraction than most people expect.",
          "On £35,000 you take home roughly £2,390 a month. On £50,000 it is about £3,290. On £70,000 — a salary that sounds comfortable — you are looking at roughly £4,260, because the 40% band starts biting at £50,270. Doubling your gross from £35k to £70k adds well under double to your take-home.",
          "If you have a student loan, subtract more. Plan 2 repayments are 9% of everything above the threshold, and they leave before the money is yours in any practical sense.",
        ],
        callout:
          "Budget against take-home. Every rent figure on this site is monthly, and every affordability rule below is a share of take-home, not of gross.",
      },
      {
        heading: "The 35% rule, and why it is a ceiling rather than a target",
        paragraphs: [
          "The common guidance is to keep rent under about a third of take-home pay. We use 35% as the default across this site because it is roughly where finances stop feeling merely disciplined and start feeling tight.",
          "It is a ceiling, not a goal. At 35% you can absorb a boiler failure, a dentist, or a month between jobs. At 45% you are one unexpected bill from a problem. Past 50% you are, in a real sense, working to pay a landlord.",
          "London routinely pushes people past that line, which is exactly why sharing remains normal here well into people's thirties in a way it is not in most of the country.",
        ],
      },
      {
        heading: "What you need to rent a room",
        paragraphs: [
          "A room in a house share across the areas we track generally runs from around £900 a month at the cheaper end of outer London to comfortably over £1,300 in central postcodes. Rooms usually include council tax and often bills, which is worth more than it sounds — call it £150 to £250 a month of costs you are not separately paying.",
          "Working backwards at 35%: a £950 room needs about £2,715 of take-home, which is roughly a £40,500 salary. A £1,100 room needs about £3,145 of take-home, or roughly £47,500.",
          "You can obviously do it on less, and plenty of people do. But you are then either spending a higher share of your income on rent, or living further out and paying the difference in commuting time and fares.",
        ],
        dataBlock: "salary-ladder",
      },
      {
        heading: "What you need to live alone",
        paragraphs: [
          "Here the number moves sharply. A one-bed flat in the cheaper areas we track starts around £1,400 a month, and the London-wide median sits well above that. Unlike a room, you then pay council tax, energy, water, broadband and every standing charge on top — realistically £250 to £350 a month more.",
          "So a £1,500 one-bed is really closer to £1,800 of committed monthly housing cost. At 35% of take-home that implies about £5,145 a month in the bank, which is north of an £88,000 salary.",
          "Relax the rule to 40% and the required salary drops to around £75,000. That is the honest range: living alone in London, without stretching uncomfortably, is a £75,000-plus proposition across most of the city. Below that, the 25% single-occupancy council tax discount helps a little, and moving to Zone 4 or beyond helps considerably more.",
        ],
      },
      {
        heading: "The costs people forget",
        paragraphs: [
          "Rent is the headline, but three other things reliably catch out people who have just arrived.",
        ],
        list: {
          items: [
            "Travel. The Zone 1–2 pay-as-you-go daily cap is £8.90, and commuting from further out five days a week adds up to a meaningful second rent. Check the zone before you sign, not after.",
            "Upfront cash. A deposit of up to five weeks' rent plus your first month, all due before you move in. On a £1,100 room that is roughly £2,370 in one go.",
            "Council tax, if you are not in a share that includes it. It varies enormously by borough — from about £1,028 a year at Band D in Wandsworth to £2,609 in Kingston upon Thames.",
          ],
        },
      },
      {
        heading: "So what is the number?",
        paragraphs: [
          "As a working answer: around £40,000 to share comfortably across most of London, around £30,000 to share if you go further out and accept a longer commute, and somewhere between £75,000 and £90,000 to live alone depending on how far from the centre you will go and how strictly you hold the 35% line.",
          "Those are starting points for your own arithmetic, not promises. The salary pages on this site run the same calculation for a specific figure and then show you which areas actually fit the result.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can you live in London on £30,000?",
        answer:
          "Yes, in a house share, and more comfortably in outer London than in a Zone 1 or 2 postcode. On £30,000 you take home roughly £2,090 a month, so a 35% rent budget is about £730. That will not reach most central rooms, but it does reach cheaper rooms further out — particularly where bills and council tax are included in the rent.",
      },
      {
        question: "What salary do you need to rent a one-bed flat in London?",
        answer:
          "Realistically £75,000 or more to do it without stretching. A one-bed at £1,500 a month plus roughly £300 of bills and council tax is £1,800 of committed housing cost. That is 35% of the take-home pay on about £88,000, and 40% of the take-home on about £75,000.",
      },
      {
        question: "Is 35% of take-home pay on rent too much?",
        answer:
          "It is at the upper end of comfortable rather than reckless. Below 30% you have real slack. At 35% you can still absorb an unexpected bill. Past 45%, most people find that saving stops entirely and any disruption to income becomes a genuine problem.",
      },
      {
        question: "Does London weighting make up the difference?",
        answer:
          "Rarely in full. Where an employer pays it at all, London weighting is typically a few thousand pounds. The rent gap between London and most of the UK is considerably larger than that, which is why the calculation is worth doing on your actual offer rather than assuming the uplift covers it.",
      },
    ],
    related: [
      { href: "/salary", label: "Work out your budget from your salary" },
      { href: "/london-rent-index", label: "Median rent by area" },
      {
        href: "/guides/london-council-tax-explained",
        label: "How council tax works in London",
      },
    ],
    sources: [
      "Take-home pay modelled on England and Wales income tax bands and Class 1 National Insurance rates — see the methodology page for the model and its limits.",
      "Rent figures from this site's reviewed neighbourhood dataset.",
      "Transport for London pay-as-you-go daily caps, 2026.",
      "Band D council tax figures for 2026/27.",
    ],
  },

  // ────────────────────────────────────────────────────────────────
  {
    slug: "renting-in-london-first-time",
    h1: "Renting in London for the first time",
    metaTitle: "Renting in London for the first time: the 2026 rules",
    metaDescription:
      "How renting in London works now — viewings, referencing, deposits, and what the Renters' Rights Act changed on 1 May 2026. A guide for first-time renters.",
    summary:
      "Viewings, referencing, deposits and the law — including everything that changed in May 2026.",
    category: "Renting",
    published: "2026-09-04",
    updated: "2026-09-04",
    readMinutes: 10,
    intro: [
      "Renting in London moves faster than most people expect, and 2026 is the first year it runs under substantially new rules. The Renters' Rights Act came into force on 1 May 2026 and changed the shape of a tenancy in England — no more fixed terms, no more no-fault evictions, and a ban on being asked for large sums of rent up front.",
      "This is what the process looks like now, in order, and where the traps are.",
    ],
    sections: [
      {
        heading: "What changed on 1 May 2026",
        paragraphs: [
          "If you are reading older advice, some of it is now wrong. Four changes matter to you as a tenant in England.",
        ],
        list: {
          items: [
            "Assured shorthold tenancies are gone. All private tenancies are now assured periodic — rolling — tenancies. There is no six or twelve month fixed term any more.",
            "Section 21 no-fault eviction is abolished. A landlord who wants possession must use the Section 8 process and give a legal ground, with evidence behind it.",
            "Rent increases are limited to once a year and must come via a formal Section 13 notice, which you are entitled to challenge.",
            "Requiring rent in advance before the tenancy is signed is banned. If an agent asks for six months up front to strengthen your application, that is no longer lawful.",
          ],
        },
        callout:
          "These rules apply to England. Scotland, Wales and Northern Ireland have their own separate regimes.",
      },
      {
        heading: "Before you start looking",
        paragraphs: [
          "Get three things ready, because the market will move faster than your paperwork if you don't.",
          "First, proof of income — usually three months of payslips, or a signed contract if you are starting a new job. Second, ID and proof of your right to rent in the UK, which a landlord is legally required to check. Third, the deposit money actually available, not theoretically available at the end of the month.",
          "Decide your area before you start booking viewings. Turning up to a flat you cannot realistically commute from wastes an evening you will want back, and in a fast market the decision often has to be made on the spot.",
        ],
      },
      {
        heading: "Viewings, and how fast you really have to move",
        paragraphs: [
          "Good properties in popular areas go within days, sometimes within hours of the first viewing block. Agents frequently run several viewings back to back and take offers at the end of the evening.",
          "That pace is real, but it is also a pressure tactic when exaggerated. The things worth checking do not take long: water pressure, and whether the hot water actually runs hot; mobile signal; damp in the corners of external walls and behind furniture; what the windows face and how much noise comes through them; and where the nearest station really is on foot rather than as the crow flies.",
          "Ask what the EPC rating is and what the last tenant's bills looked like. A cheap flat rated F is not cheap in January.",
        ],
      },
      {
        heading: "The money: holding deposit, deposit, first month",
        paragraphs: [
          "When you decide to take a place you will usually be asked for a holding deposit to take it off the market. In England this is capped at one week's rent and must be resolved within seven days — either refunded, or rolled into your first rent or deposit — unless you pull out or fail the right-to-rent check.",
          "The tenancy deposit itself is capped at five weeks' rent where the annual rent is under £50,000, and six weeks where it is £50,000 or more. Anything above that is unlawful. It must be protected in one of the three government-approved schemes within 30 days, and you should receive prescribed information telling you which one holds it.",
          "So on a £1,200 room, expect roughly £1,385 of deposit plus £1,200 of first month's rent — about £2,585 — with a separate £277 holding deposit earlier in the process that is absorbed into that total rather than added to it.",
        ],
      },
      {
        heading: "Referencing and guarantors",
        paragraphs: [
          "Referencing checks your income, your credit file and usually your previous landlord. Most agents want to see annual income of roughly thirty times the monthly rent — on a £1,200 room, about £36,000.",
          "If you do not meet that, or you are new to the UK with no credit history, you will be asked for a UK-based guarantor who does. Guarantor services exist and will do it for a fee, typically several weeks' rent, which is worth pricing against simply looking slightly cheaper.",
          "Be straight in referencing. It is checked, and a discrepancy discovered late costs you both the property and the time.",
        ],
      },
      {
        heading: "Before you sign, and on the day you move in",
        paragraphs: [
          "Read the tenancy agreement properly. You are looking for who is responsible for which repairs, any restrictions that matter to you, and — because tenancies are periodic now — the notice you must give to leave, which is generally two months.",
          "On move-in day, take the inventory seriously. Photograph everything, including what is already damaged, and date-stamp it. Take meter readings and send them to the supplier the same day. The overwhelming majority of deposit disputes are about wear that was already there and which nobody recorded.",
          "Then register for council tax if it is not included in your rent, and check whether you qualify for the 25% single-person discount.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much deposit can a landlord ask for in London?",
        answer:
          "In England, five weeks' rent where the annual rent is under £50,000 and six weeks' where it is £50,000 or more. A separate holding deposit is capped at one week's rent and must be returned or credited within seven days. Anything charged above these caps is unlawful under the Tenant Fees Act 2019.",
      },
      {
        question: "Can a landlord still evict me without giving a reason?",
        answer:
          "No. Section 21 no-fault evictions were abolished in England on 1 May 2026. A landlord must now use the Section 8 process and establish a legal ground for possession, with evidence, which you are entitled to contest.",
      },
      {
        question: "Can an agent ask me to pay six months' rent up front?",
        answer:
          "Not before the tenancy is signed. The Renters' Rights Act banned requiring rent in advance at that stage. It was previously common to ask this of tenants who failed referencing or had no UK credit history; the lawful route now is a guarantor.",
      },
      {
        question: "Do I still get a six or twelve month fixed term?",
        answer:
          "No. Fixed-term assured shorthold tenancies no longer exist in the private rented sector in England. All tenancies are periodic and roll month to month, and you generally give two months' notice to leave.",
      },
      {
        question: "What income do I need to pass referencing?",
        answer:
          "Most agents look for annual income of around thirty times the monthly rent, so roughly £36,000 for a £1,200 room. If you fall short, or have no UK credit history, expect to be asked for a UK-based guarantor.",
      },
    ],
    related: [
      {
        href: "/guides/deposits-and-upfront-costs-in-london",
        label: "What you pay before you get the keys",
      },
      {
        href: "/guides/london-council-tax-explained",
        label: "Council tax, explained",
      },
      { href: "/neighbourhoods", label: "Pick an area first" },
    ],
    sources: [
      "Renters' Rights Act, in force 1 May 2026 (England).",
      "Tenant Fees Act 2019 — deposit and holding deposit caps.",
      "Government-approved tenancy deposit protection schemes — 30-day protection requirement.",
    ],
  },

  // ────────────────────────────────────────────────────────────────
  {
    slug: "deposits-and-upfront-costs-in-london",
    h1: "What you actually pay before you get the keys",
    metaTitle: "London rent upfront costs: deposit, first month & the rest",
    metaDescription:
      "The real cash you need before moving into a London rental — holding deposit, tenancy deposit, first month's rent, and the fees agents cannot charge.",
    summary:
      "A worked breakdown of the lump sum you need before move-in, and which fees are actually illegal.",
    category: "Money",
    published: "2026-09-04",
    updated: "2026-09-04",
    readMinutes: 6,
    intro: [
      "The rent figure in the listing is not what you need in the bank. Moving into a London rental means finding a lump sum, usually between two and three months' worth of rent, at a point when you may also be paying rent somewhere else.",
      "Here is exactly what makes up that number, what it looks like at real London prices, and which charges an agent is not allowed to make.",
    ],
    sections: [
      {
        heading: "The three things you definitely pay",
        paragraphs: [
          "Nearly all of the upfront cost is these three items, and two of them are capped by law.",
        ],
        list: {
          items: [
            "Holding deposit — up to one week's rent, paid to take the property off the market. It is credited against your rent or deposit when you sign, so it is not an extra cost, just an earlier one.",
            "Tenancy deposit — up to five weeks' rent where the annual rent is under £50,000, or six weeks where it is £50,000 or more. Held in a government-approved protection scheme, not by the landlord.",
            "First month's rent — due before or on the day you move in.",
          ],
        },
      },
      {
        heading: "What that looks like in practice",
        paragraphs: [
          "For a £1,000 room, the deposit at five weeks is about £1,154 and the first month is £1,000 — roughly £2,154 in total, of which £231 will have been the holding deposit paid earlier.",
          "For a £1,400 one-bed, the deposit is about £1,615 and the first month £1,400 — roughly £3,015.",
          "For a £2,000 flat, the annual rent is £24,000, so the five-week cap still applies: about £2,308 of deposit plus £2,000, or roughly £4,308. The six-week cap only kicks in above £50,000 of annual rent, which means a monthly rent above about £4,167.",
        ],
        callout:
          "Rule of thumb: budget about 2.2 months' rent to get through the door, and slightly more if you are also paying notice somewhere else.",
      },
      {
        heading: "The costs nobody quotes you",
        paragraphs: [
          "These are not charged by the agent, but they land in the same fortnight and people routinely forget them.",
        ],
        list: {
          items: [
            "Moving the stuff — a van and two people across London is commonly £300 to £600 depending on distance, floor, and how much you own.",
            "The first energy bill and broadband setup, plus any standing charges that start the day you take over the meter.",
            "Council tax from your move-in date, unless it is included in a room rent. Depending on the borough, that is between about £86 and £217 a month at Band D.",
            "The furnishing gap — even a furnished flat rarely comes with anything in the kitchen you would want to cook with.",
          ],
        },
      },
      {
        heading: "What an agent cannot charge you",
        paragraphs: [
          "Since the Tenant Fees Act 2019, most of the fees that used to pad this process are banned in England. An agent or landlord cannot charge you for viewings, for referencing, for an inventory or check-in, for drawing up the tenancy agreement, or for simply renewing it.",
          "They can charge for a small, defined set of things: the rent itself, the two capped deposits, a change to the tenancy that you request (capped at £50 unless the landlord can show greater reasonable costs), early termination that you request, lost keys, and late rent beyond fourteen days.",
          "If you are asked for an 'admin fee', an 'application fee' or a 'referencing fee', it is unlawful. Say so, and ask for it to be removed in writing.",
        ],
      },
      {
        heading: "Getting the deposit back at the end",
        paragraphs: [
          "Your deposit must be protected in one of the three approved schemes within 30 days of being taken, and you should be told which. If it was never protected, you may be entitled to compensation of between one and three times the deposit.",
          "Most disputes are about pre-existing damage. The single most effective thing you can do is a thorough, date-stamped photographic inventory on the day you move in, including everything that is already worn, chipped or stained. Fair wear and tear is not deductible; damage is. The difference is decided on evidence, and the tenant with photographs almost always wins it.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much money do I need upfront to rent in London?",
        answer:
          "Budget about 2.2 months' rent. That is a tenancy deposit of up to five weeks plus the first month's rent, with the one-week holding deposit credited against it rather than added. On a £1,200 room that is roughly £2,585; on a £1,800 flat, roughly £3,877.",
      },
      {
        question: "Can a letting agent charge an admin or referencing fee?",
        answer:
          "No. In England, the Tenant Fees Act 2019 banned charging tenants for referencing, admin, inventories, check-in, drawing up the tenancy or renewing it. Only rent, the two capped deposits, tenant-requested changes, lost keys and late-rent interest are permitted.",
      },
      {
        question: "Is the holding deposit an extra cost on top of the deposit?",
        answer:
          "No. It is capped at one week's rent and is credited against your first rent or your tenancy deposit when you sign. You only lose it if you withdraw, provide false information, or fail the right-to-rent check.",
      },
      {
        question: "What happens if my deposit was not protected?",
        answer:
          "Your landlord must protect it in an approved scheme within 30 days and tell you which one. If they did not, you can apply to the county court, and the landlord may be ordered to repay the deposit plus compensation of one to three times its value.",
      },
    ],
    related: [
      {
        href: "/guides/renting-in-london-first-time",
        label: "The full first-time renting process",
      },
      { href: "/salary", label: "Check what monthly rent your salary supports" },
      {
        href: "/guides/london-council-tax-explained",
        label: "How much council tax you will pay",
      },
    ],
    sources: [
      "Tenant Fees Act 2019 — permitted payments and deposit caps (England).",
      "Government-approved tenancy deposit protection schemes.",
      "Band D council tax figures for 2026/27.",
    ],
  },
  // ────────────────────────────────────────────────────────────────
  {
    slug: "london-council-tax-explained",
    h1: "London council tax, explained",
    metaTitle: "London council tax 2026/27: bands, costs & discounts",
    metaDescription:
      "How council tax works in London — what the bands mean, what every borough charges at Band D in 2026/27, who pays, and the discounts most people miss.",
    summary:
      "What the bands mean, what all 32 boroughs charge, and the discounts people forget to claim.",
    category: "Money",
    published: "2026-09-04",
    updated: "2026-09-04",
    readMinutes: 9,
    intro: [
      "Council tax is the bill people budget for last and then get surprised by. In London it is also the cost that varies most sharply depending on which side of a borough boundary you live on — the gap between the cheapest and the most expensive borough is over £1,580 a year for an identical band.",
      "This explains what the bands actually mean, what each borough charges in 2026/27, and the reductions that a lot of people are entitled to and never claim.",
    ],
    sections: [
      {
        heading: "The bands are based on 1991 property values",
        paragraphs: [
          "This is the single most confusing thing about council tax, and it is worth getting straight. Your band is not based on what your home is worth now. It is based on what it was worth on 1 April 1991.",
          "Properties in England have never been revalued since. A flat built in 2020 is assigned the band it would have had if it had existed in 1991. This is why bands often feel disconnected from present-day prices, and why two similar flats on the same street can sit in different bands.",
          "There are eight bands, A to H. Band D is the reference point that councils quote and that every comparison uses, and every other band is a fixed statutory proportion of it — so if you know the Band D figure for a borough, you know all eight.",
        ],
        dataBlock: "council-tax-bands",
      },
      {
        heading: "What each London borough charges",
        paragraphs: [
          "Every bill has two parts: the borough's own charge, and the Greater London Authority precept, which is the same across London and funds the Mayor's office, Transport for London, the Metropolitan Police and the London Fire Brigade. For 2026/27 the GLA precept is £510.51 at Band D.",
          "The figures below are the total — borough element plus precept — at Band D for 2026/27.",
        ],
        dataBlock: "council-tax-boroughs",
      },
      {
        heading: "Why Wandsworth and Westminster are so much cheaper",
        paragraphs: [
          "It looks anomalous, and it is. Wandsworth at about £1,028 and Westminster at about £1,050 are less than half what most outer boroughs charge, and roughly 60% below Kingston upon Thames at £2,609.",
          "The reason is that both boroughs have historically funded an unusually large share of their services from sources other than council tax — commercial property income above all, which central and inner-west London has in abundance and outer boroughs largely do not. Outer boroughs have more residential area, fewer commercial ratepayers, and higher per-head social care costs, so more of the bill falls on households.",
          "It is a genuine saving rather than a trick, and on a Band D property the difference between Wandsworth and Kingston is over £130 a month. But do not choose a borough on council tax alone: the rent difference between areas is usually several times larger and moves in the opposite direction.",
        ],
      },
      {
        heading: "Who pays, and who does not",
        paragraphs: [
          "In a rented flat, the tenant normally pays. In a house share on a single joint tenancy, the tenants are jointly liable and it is often simplest for one person to hold the account. In a house in multiple occupation where everyone has their own separate agreement, the landlord is usually liable — which is why room rents so often include it.",
          "Several groups are disregarded entirely for council tax purposes, meaning they do not count as adults in the household.",
        ],
        list: {
          items: [
            "Full-time students. A household where everyone is a full-time student is exempt altogether.",
            "Under-18s, and 18- and 19-year-olds in full-time education.",
            "Apprentices on low pay, and some student nurses and trainees.",
            "People with a severe mental impairment, and live-in carers who are not close relatives of the person they care for.",
          ],
        },
      },
      {
        heading: "The discounts people miss",
        paragraphs: [
          "The single-person discount is 25% off the whole bill if you are the only adult in the property. On a Camden Band D bill that is worth about £552 a year. It is not applied automatically — you have to tell the council, and if you have been living alone without claiming it, ask about backdating.",
          "If everyone else in the household is disregarded, you can also get the 25% as the only counted adult. Council Tax Reduction is a separate, means-tested scheme that each borough runs on its own rules, so it is worth checking your specific council rather than assuming.",
          "You can also challenge your band, free, through the Valuation Office Agency. It is worth doing if similar neighbouring properties are banded lower — but be aware the review can move your band in either direction, so check the comparables first.",
        ],
        callout:
          "Bills are normally spread over 10 instalments by default, which is why the monthly figure looks higher than dividing by 12. You can usually ask to pay over 12 instead.",
      },
    ],
    faqs: [
      {
        question: "Which London borough has the cheapest council tax?",
        answer:
          "Wandsworth, at £1,028.21 at Band D for 2026/27, followed closely by Westminster at £1,049.55. Both fund an unusually large share of their services from commercial income rather than council tax. The most expensive is Kingston upon Thames at £2,609.20.",
      },
      {
        question: "Do students pay council tax in London?",
        answer:
          "Full-time students are disregarded for council tax, and a household where every occupant is a full-time student is exempt entirely. In a mixed household, the students are disregarded and the remaining adults may qualify for the 25% single-person discount.",
      },
      {
        question: "Is council tax included in London rent?",
        answer:
          "In a room in a house in multiple occupation it very often is, because the landlord is usually the liable party. In a self-contained flat on your own tenancy it almost never is — you register with the borough yourself and pay separately.",
      },
      {
        question: "How much is council tax per month in London?",
        answer:
          "At Band D in 2026/27, between about £103 a month in Wandsworth and about £261 in Kingston upon Thames, if you spread the bill over the default 10 instalments. Over 12 instalments the monthly figures are lower, at roughly £86 and £217.",
      },
      {
        question: "What is the GLA precept?",
        answer:
          "It is the part of every London council tax bill that goes to the Greater London Authority rather than your borough, funding the Mayor's office, Transport for London, the Metropolitan Police and the London Fire Brigade. For 2026/27 it is £510.51 at Band D and is included in every borough figure quoted here.",
      },
    ],
    related: [
      { href: "/boroughs", label: "Compare boroughs on rent and transport" },
      {
        href: "/guides/how-much-do-i-need-to-earn-to-live-in-london",
        label: "What salary London actually needs",
      },
      {
        href: "/guides/deposits-and-upfront-costs-in-london",
        label: "Upfront costs when you move in",
      },
    ],
    sources: [
      "Band D council tax figures for 2026/27, cross-checked across two independent published London-wide comparison tables.",
      "Greater London Authority precept for 2026/27.",
      "Statutory band ratios, Local Government Finance Act 1992.",
    ],
  },

  // ────────────────────────────────────────────────────────────────
  {
    slug: "london-tube-zones-explained",
    h1: "London tube zones, explained",
    metaTitle: "London tube zones explained: fares, caps & where to live",
    metaDescription:
      "What London's travel zones mean, what they cost in 2026, and how far out you can live before the commute stops being worth the cheaper rent.",
    summary:
      "What the zones cost, how capping works, and where the rent saving stops paying for the commute.",
    category: "Transport",
    published: "2026-09-04",
    updated: "2026-09-04",
    readMinutes: 7,
    intro: [
      "London's fare system is built on concentric zones numbered 1 to 9, with Zone 1 covering the centre. Almost every decision about where to live in London runs into them, because they set both what you pay to travel and, indirectly, what you pay in rent.",
      "This is how they work, what they cost in 2026, and how to judge whether moving a zone further out is actually saving you money.",
    ],
    sections: [
      {
        heading: "How the zones are laid out",
        paragraphs: [
          "Zone 1 is central London — roughly the area inside the main line termini, taking in the City, the West End, Westminster and Southwark's northern edge. Zone 2 is the ring around it, covering most of what people think of as inner London: Camden, Islington, Hackney, Brixton, Clapham, Shepherd's Bush.",
          "Zones 3 to 6 work outwards from there, with Zone 6 reaching the edge of Greater London and Heathrow. Zones 7 to 9 cover a handful of stations beyond the boundary on lines that run into Hertfordshire, Essex and Buckinghamshire.",
          "Some stations sit on a zone boundary and count as either — which is quietly useful, because it can make a journey cheaper than the map suggests.",
        ],
      },
      {
        heading: "What it costs in 2026",
        paragraphs: [
          "The fare you pay depends on which zones you travel through, whether you travel at peak time, and how you pay. Contactless and Oyster pay-as-you-go are always cheaper than a paper single, and there is no meaningful difference between contactless and Oyster for adult fares.",
          "The number that matters most for commuting is the daily cap: once your fares reach it, everything else that day is free. The Zone 1–2 cap is £8.90, and it is the same peak and off-peak. Caps run from 04:30 to 04:29 the following morning, so a late night out counts against the day it started.",
          "Buses are separate and much cheaper, with their own lower daily cap, and a bus journey does not count towards your Tube zone cap. If your commute can be done partly by bus, it often should be.",
        ],
        callout:
          "Weekly capping also applies on contactless if you use the same card all week — worth knowing if you commute five days, because it can beat buying a Travelcard outright.",
      },
      {
        heading: "The trade you are actually making",
        paragraphs: [
          "The standard advice is that moving out a zone saves you rent. It does — the rent gradient across London is steep, and moving from Zone 2 to Zone 3 in the same corridor commonly saves £150 to £250 a month on a room.",
          "But you pay for it twice: once in fares, and once in time. A Zone 1–3 daily cap is higher than Zone 1–2, so five days a week adds up over a month. And an extra fifteen minutes each way is two and a half hours a week, or roughly five full days a year spent on a train.",
          "The arithmetic usually still favours moving out, at least as far as Zone 3, because the rent saving is larger than the fare increase. Past Zone 4 it gets less clear, and the time cost starts to dominate the money.",
        ],
      },
      {
        heading: "Zone is not the same as journey time",
        paragraphs: [
          "This is where people go wrong. Zone measures distance from the centre, not how long it takes to get anywhere. A Zone 3 station on the Victoria line can be faster into the West End than a Zone 2 station with one slow line and a change.",
          "The Elizabeth line changed this substantially — it put parts of Zone 4 and 5 within genuinely quick reach of the City and the West End, and rents in those corridors have moved accordingly.",
          "So check the actual journey, on the actual line, at the actual time you would travel. Zone tells you what the ticket costs; only the route tells you what your morning looks like.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much is the Zone 1–2 daily cap in 2026?",
        answer:
          "£8.90 on contactless or Oyster pay as you go, the same at peak and off-peak times. Once your fares reach that figure in a single day, further journeys within those zones cost nothing until the cap window resets at 04:30.",
      },
      {
        question: "Is it cheaper to live in Zone 3 than Zone 2?",
        answer:
          "Usually yes, overall. The rent saving from moving out one zone in the same corridor commonly runs to £150–£250 a month on a room, which is comfortably more than the increase in fares. The real cost is time rather than money, and that becomes the binding constraint further out than Zone 3.",
      },
      {
        question: "Do buses count towards the Tube daily cap?",
        answer:
          "No. Buses and trams have their own separate, lower daily cap, and bus journeys do not count towards your Tube and rail zone cap. If part of your commute can be done by bus it is often noticeably cheaper.",
      },
      {
        question: "Which zone is central London?",
        answer:
          "Zone 1. It covers the City, the West End, Westminster and the area inside the main line termini. Zone 2 is the ring immediately around it and includes most of inner London — Camden, Islington, Hackney, Brixton and Clapham among others.",
      },
    ],
    related: [
      { href: "/commute", label: "Best areas for your commute" },
      { href: "/london-rent-index", label: "How rent varies by area" },
      { href: "/neighbourhoods", label: "Browse areas by zone" },
    ],
    sources: [
      "Transport for London fares and pay-as-you-go daily caps, 2026.",
      "Rent comparisons from this site's reviewed neighbourhood dataset.",
    ],
  },

  // ────────────────────────────────────────────────────────────────
  {
    slug: "moving-to-london-checklist",
    h1: "Moving to London: a checklist in the right order",
    metaTitle: "Moving to London checklist: what to do, in what order",
    metaDescription:
      "A sequenced checklist for moving to London: what to sort before you arrive, in week one, and in month one — in an order that will not get you stuck.",
    summary:
      "What to sort before you arrive, in week one, and in month one — sequenced so nothing blocks anything else.",
    category: "Moving",
    published: "2026-09-04",
    updated: "2026-09-04",
    readMinutes: 7,
    intro: [
      "Most moving-to-London checklists are a pile of tasks with no order to them, which is unhelpful, because several of these things block each other. You cannot open some bank accounts without an address, and you cannot rent without passing referencing, and referencing wants a bank account.",
      "This is the same list, sequenced so you do not get stuck.",
    ],
    sections: [
      {
        heading: "Before you arrive",
        paragraphs: [
          "The goal here is to unblock everything else. Two items matter far more than the rest: somewhere to stay for the first few weeks, and the paperwork that referencing will ask for.",
        ],
        list: {
          items: [
            "Book temporary accommodation for three to four weeks. Signing a tenancy on a flat you have only seen online is a genuinely bad idea in a city this varied — a month gives you time to view properly.",
            "Gather proof of income, ID and right-to-rent documents. Digital copies, in one folder, ready to send within the hour.",
            "Open a UK bank account if you can do it remotely. Several app-based banks will onboard you before you have a permanent address, which breaks the circular dependency neatly.",
            "Decide roughly which part of London you are aiming for, based on where you will actually be working. Everything downstream is easier once this is narrowed.",
          ],
        },
      },
      {
        heading: "Week one",
        paragraphs: [
          "This week is about getting mobile and starting viewings. Do not rush a tenancy — the market moves fast, but a bad twelve months is worse than a slow fortnight.",
        ],
        list: {
          items: [
            "Set up contactless travel on a bank card, or get an Oyster. Do not buy a Travelcard until you know your actual commute.",
            "Get a UK mobile number. Some referencing and bank verification steps still assume one.",
            "Register with a GP near where you expect to live. You need an NHS number before you urgently need one, not after.",
            "Start viewings. Aim to see several places in different areas before you form an opinion about any of them.",
            "Walk the commute you are considering, at the time you would actually do it. It is the single most informative hour you will spend.",
          ],
        },
      },
      {
        heading: "Month one",
        paragraphs: [
          "Once you have signed somewhere, there is a short admin tail. Doing it in the first fortnight rather than the first quarter saves a surprising amount of irritation.",
        ],
        list: {
          items: [
            "Do the inventory properly on move-in day — photographs, date-stamped, including everything already damaged. This is what protects your deposit.",
            "Take meter readings and send them to the energy supplier the same day.",
            "Register for council tax with your borough, and claim the 25% single-person discount if you live alone.",
            "Sort broadband early. Installation slots can run two to three weeks out, longer if the property needs an engineer visit.",
            "Register to vote at your new address. It also helps your credit file, which matters the next time you rent.",
            "Update your address with your bank, employer, and the DVLA if you drive.",
          ],
        },
        callout:
          "Check whether your street is inside the ULEZ and, if you are bringing a car, whether it is compliant. A non-compliant vehicle costs £12.50 a day, every day, across the whole of Greater London.",
      },
      {
        heading: "The part checklists leave out",
        paragraphs: [
          "London is easy to live in and hard to feel settled in, and the second thing takes deliberate effort in a way the first does not. People who move here and struggle usually have the admin sorted and no structure to their week.",
          "Join something that meets on a schedule — a gym class, a five-a-side team, a running club, a choir, anything recurring. Proximity plus repetition is how adult friendships actually form, and a city of nine million is otherwise perfectly capable of leaving you alone for months.",
          "Give it six months before you judge the place. Most people's first impression of London is formed while they are exhausted, broke from the move, and living somewhere temporary — which is not a fair test.",
        ],
      },
    ],
    faqs: [
      {
        question: "What should I sort before moving to London?",
        answer:
          "Temporary accommodation for the first three to four weeks, your referencing paperwork in digital form, and a UK bank account if you can open one remotely. Those three unblock nearly everything else, because renting requires paperwork and a bank account, and viewing properly requires already being here.",
      },
      {
        question: "Should I rent a flat before I arrive in London?",
        answer:
          "Ideally not. Areas vary enormously street by street, and a listing cannot tell you about noise, light, the walk from the station or what the neighbourhood is like at night. Book somewhere temporary for a month and view in person.",
      },
      {
        question: "How long does it take to get set up in London?",
        answer:
          "Roughly a month for the practical side — accommodation, bank, phone, GP, council tax, broadband. Feeling settled takes longer, and usually depends more on having a recurring weekly commitment than on finishing the admin.",
      },
      {
        question: "Do I need a car in London?",
        answer:
          "Almost certainly not, and it is an active liability in most of the city. Between the Congestion Charge, ULEZ at £12.50 a day for non-compliant vehicles, parking permits and insurance, running a car in inner London is expensive and slower than the Tube for most journeys.",
      },
    ],
    related: [
      {
        href: "/guides/renting-in-london-first-time",
        label: "How renting actually works here",
      },
      { href: "/", label: "Find areas that fit your commute and budget" },
      {
        href: "/guides/london-tube-zones-explained",
        label: "Understand the zones before you sign",
      },
    ],
    sources: [
      "Transport for London ULEZ daily charge and area.",
      "Tenancy deposit protection requirements (England).",
    ],
  },

  // ────────────────────────────────────────────────────────────────
  {
    slug: "house-share-or-live-alone-london",
    h1: "House share or live alone in London?",
    metaTitle: "House share vs living alone in London: the real cost gap",
    metaDescription:
      "What sharing and living alone actually cost in London once bills and council tax are counted, and how to decide which one your salary and temperament support.",
    summary:
      "The true cost gap once bills are counted, and an honest look at what each option is like.",
    category: "Money",
    published: "2026-09-04",
    updated: "2026-09-04",
    readMinutes: 7,
    intro: [
      "This is the biggest financial decision you make when you move to London, and it is usually made on instinct. The gap is larger than the rent difference suggests, because sharing bundles costs that living alone unbundles.",
      "Here is the real comparison, and the non-financial parts that people underweight in both directions.",
    ],
    sections: [
      {
        heading: "The headline rent gap",
        paragraphs: [
          "Across the areas we track, a room in a house share generally runs from around £900 to £1,350 a month depending on how central it is. A one-bed flat in the same area is typically £1,400 at the cheap end and well over £2,000 closer in.",
          "So on rent alone the gap is commonly £500 to £700 a month. That is the number people usually compare, and it understates the difference.",
        ],
        dataBlock: "rent-spread",
      },
      {
        heading: "What sharing quietly includes",
        paragraphs: [
          "Room rents very often include council tax, and frequently include energy, water and broadband too. In a house in multiple occupation the landlord is usually the party liable for council tax, which is why it is so commonly bundled.",
          "Living alone, you pay all of it: council tax at between about £86 and £217 a month at Band D depending on borough, energy at perhaps £70 to £120 for one person, water at £30 to £40, and broadband at £25 to £35. Call it £250 to £350 a month, less the 25% single-person council tax discount.",
          "So the real gap between a £1,100 room and a £1,600 one-bed is not £500. It is closer to £750 to £800 a month once bills are counted — roughly £9,000 a year, which is about £15,000 of gross salary.",
        ],
        callout:
          "Always compare all-in monthly cost, not headline rent. A room advertised at £1,200 including bills can be cheaper than one at £1,050 excluding them.",
      },
      {
        heading: "The case for sharing",
        paragraphs: [
          "Beyond cost, sharing solves a problem that people arriving in London consistently underestimate: it gives you a default social base. If you move to a city where you know nobody and then live alone, you have to manufacture every single social interaction from scratch, and that is genuinely hard for the first six months.",
          "Sharing also buys you flexibility. Rooms turn over faster, the commitment feels lighter, and it is far easier to try an area for a while and move on if it does not suit you.",
          "And it buys you location. The same money that gets you a one-bed in Zone 4 gets you a room in Zone 2, and for a lot of people the second is the better life.",
        ],
      },
      {
        heading: "The case for living alone",
        paragraphs: [
          "The obvious one is control — over noise, cleanliness, guests, temperature, and how your evenings go. If you work from home, this stops being a preference and becomes close to a requirement; a shared kitchen table is not an office, and a bedroom desk in a house share wears thin fast.",
          "It is also the difference between somewhere you live and somewhere you stay. People who share into their thirties often describe a point where the arrangement stops feeling temporary and starts feeling stuck, and that is a real cost even though it does not appear in a spreadsheet.",
          "If you can afford it comfortably — meaning the all-in cost stays under about 35% of your take-home — it is usually worth it. If affording it means going to 45% and never saving, it usually is not.",
        ],
      },
      {
        heading: "A reasonable way to decide",
        paragraphs: [
          "Work out your take-home pay, take 35% of it, and compare that with the all-in cost of a one-bed in the areas that suit your commute. If the number works, the decision is about what you want. If it does not, sharing is not a compromise — it is the option that leaves you able to enjoy the city you moved to.",
          "A middle path worth considering: sharing with one other person in a two-bed rather than a four-person house. You get most of the cost benefit and most of the control, and two-beds are often better-quality stock than large shares.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is it cheaper to house share or live alone in London?",
        answer:
          "Sharing, by considerably more than the rent difference suggests. A room typically costs £500 to £700 a month less than a one-bed in the same area, and because rooms usually include council tax and often bills, the true all-in gap is closer to £750 to £800 a month.",
      },
      {
        question: "What salary do you need to live alone in London?",
        answer:
          "Around £75,000 to £90,000 to do it without stretching, depending on how far out you go. A £1,500 one-bed plus roughly £300 of bills and council tax is £1,800 of committed monthly cost, which is 35% of the take-home on about £88,000 and 40% on about £75,000.",
      },
      {
        question: "Do house shares include bills in London?",
        answer:
          "Very often. Council tax is usually included because in a house in multiple occupation the landlord is the liable party, and energy, water and broadband are frequently bundled too. Always check what 'bills included' actually covers, and compare all-in figures rather than headline rent.",
      },
      {
        question: "Is a studio cheaper than a one-bed in London?",
        answer:
          "Usually yes, by perhaps £150 to £250 a month, and it is often the most realistic route to living alone on a mid-range salary. The trade is space — a studio with a desk in it stops feeling like a home fairly quickly if you also work from there.",
      },
    ],
    related: [
      { href: "/salary", label: "See what your salary supports" },
      { href: "/london-rent-index", label: "Compare rent across areas" },
      {
        href: "/guides/london-council-tax-explained",
        label: "What council tax adds if you live alone",
      },
    ],
    sources: [
      "Rent figures from this site's reviewed neighbourhood dataset.",
      "Band D council tax figures for 2026/27.",
      "Take-home pay modelled on England and Wales income tax and National Insurance rates.",
    ],
  },
];

/** Guides newest-updated first — the order the hub renders them in. */
export function guidesByRecency(): Guide[] {
  return [...GUIDES].sort((a, b) => b.updated.localeCompare(a.updated));
}

/** Most recent `updated` date across all guides, for the hub's sitemap entry. */
export function guidesLastUpdated(): string {
  return GUIDES.reduce(
    (latest, g) => (g.updated > latest ? g.updated : latest),
    GUIDES[0].updated,
  );
}

export function getGuide(slug: string): Guide | null {
  return GUIDES.find((g) => g.slug === slug) ?? null;
}

export function getAllGuideSlugs(): string[] {
  return GUIDES.map((g) => g.slug);
}
