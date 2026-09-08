import type { CityGuide } from "@/lib/city-content";

/**
 * Edinburgh and Lothian editorial guides.
 *
 * These carry more weight than the equivalents elsewhere on the site,
 * because more is genuinely different here. Scotland has its own income
 * tax bands, its own council tax multipliers, water charges on the
 * council tax bill and — most importantly for a renter — a completely
 * different tenancy regime with no fixed term and no no-fault eviction.
 * A guide written for England would be wrong on all four counts.
 */

const PUBLISHED = "2026-09-07";

export const EDINBURGH_GUIDES: CityGuide[] = [
  {
    slug: "renting-in-scotland-what-is-different",
    h1: "Renting in Scotland: what is different",
    metaTitle: "Renting in Scotland: how the private residential tenancy works",
    metaDescription:
      "Scottish tenancies have no fixed term, no no-fault eviction and a statutory rent-increase process. What that means for renters in Edinburgh and the Lothians.",
    summary:
      "No fixed term, no no-fault eviction, and a deposit scheme with teeth. The Scottish system genuinely favours tenants, and most people arriving do not know it.",
    category: "Renting",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 8,
    intro: [
      "Housing law is devolved, and Scotland's private rented sector has been on a different track from England's since 2017. The differences are not technicalities — they change what you can be asked to sign, how long you can stay, and what happens when the rent goes up.",
      "If you are moving from England, the single most important thing to know is this: your tenancy will have no end date. There is no six-month or twelve-month term, no break clause and no fixed period after which the landlord can simply ask you to leave. This guide sets out what replaced all of that.",
      "This is general information about how the regime works, not legal advice about your own tenancy. Shelter Scotland and your local Citizens Advice Bureau give free advice on specific situations.",
    ],
    sections: [
      {
        heading: "The private residential tenancy",
        paragraphs: [
          "Almost every private let in Scotland granted since 1 December 2017 is a private residential tenancy. It is open-ended: it runs until the tenant ends it or the landlord establishes one of a fixed list of statutory grounds before a tribunal.",
          "A tenant can leave at any time by giving 28 days' notice in writing. That is it — no penalty, no obligation to see out a term, no break clause to negotiate. It is a substantially stronger position than the English assured shorthold gives, and it makes moving on considerably easier.",
          "The landlord's route out is much narrower. There is no equivalent of the English section 21 no-fault notice; Scotland abolished it. A landlord must rely on one of the statutory eviction grounds — selling the property, moving in themselves or a family member, substantial rent arrears, breach of the tenancy, and a handful of others — and, if the tenant does not leave voluntarily, must prove that ground to the First-tier Tribunal.",
        ],
        callout:
          "There is no no-fault eviction in Scotland. A landlord who wants you out has to give a statutory reason and, if you do not agree, prove it to a tribunal. This is the largest single difference from renting in England.",
      },
      {
        heading: "Rent increases",
        paragraphs: [
          "Rent can be increased once in any twelve-month period, and only with at least three months' written notice on the prescribed form. If the landlord uses the wrong form or gives short notice, the increase is not valid.",
          "If you think the increase is above the market rate, you can refer it to a rent officer for adjudication before it takes effect. The Scottish system has been through several rounds of change on this point in recent years, and the exact adjudication rules have moved more than once — check the current position with Shelter Scotland or the Scottish Government's rent increase guidance rather than relying on what was true a year ago.",
        ],
        list: {
          title: "What a valid rent increase requires",
          items: [
            "At least three months' written notice",
            "The prescribed rent-increase notice form, not a letter or an email",
            "No more than one increase in any twelve-month period",
            "A right of referral to a rent officer before the increase takes effect",
          ],
        },
      },
      {
        heading: "Deposits, fees and the landlord register",
        paragraphs: [
          "Deposits are capped at two months' rent and must be lodged with one of three government-approved schemes within thirty working days. If your landlord fails to lodge it, the tribunal can order them to pay you up to three times the deposit — and this is enforced considerably more often than most tenants expect.",
          "Letting agent fees to tenants have been illegal in Scotland since 1984, decades before England caught up. If anyone asks you for an administration fee, a referencing fee or a renewal fee, it is unlawful and recoverable.",
          "Every private landlord in Scotland must be registered with the local council, and the register is public. Look up the address before you sign. An unregistered landlord is committing an offence and it is a reasonable signal about how the rest of the tenancy will be run.",
        ],
        callout:
          "Check the Scottish Landlord Register for the property before you sign anything. It is free, public and takes two minutes, and an unregistered landlord is a genuine red flag.",
      },
      {
        heading: "The Edinburgh-specific problems",
        paragraphs: [
          "Edinburgh's rental market is the tightest in Britain outside London, and two things specific to the city make it worse. The first is short lets: a substantial part of the city's flat stock moved to holiday letting over the last decade, and although the licensing scheme introduced in 2022 has pulled some of it back, the pressure on the long-term market is real and visible in the rents.",
          "The second is August. The Festival roughly doubles the city's population for a month, and lets that start or end in the summer are competing with a short-let market paying several times the monthly rate. If you can avoid moving in July or August, do.",
          "The practical consequence of a tight market is that viewings are crowded and decisions are fast. Have your references, proof of income and deposit ready before you start looking, because in Edinburgh the flat will be gone by the time you have assembled them.",
        ],
      },
      {
        heading: "Repairs and the repairing standard",
        paragraphs: [
          "Every private let in Scotland must meet the repairing standard, which covers the structure, the installations for water, gas and electricity, heating, fixtures and fittings, and — since 2024 — safe access to common parts and secure common doors.",
          "If your landlord will not carry out a repair, the route is the First-tier Tribunal's Housing and Property Chamber. It is free to apply and it does not require a solicitor. You cannot be evicted for making an application, and a landlord who tried would be relying on a ground they would have to prove.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can a landlord evict you without a reason in Scotland?",
        answer:
          "No. Scotland abolished no-fault eviction when the private residential tenancy was introduced in 2017. A landlord must give notice citing one of the statutory grounds and, if the tenant does not leave, must prove that ground to the First-tier Tribunal.",
      },
      {
        question: "How much notice do you have to give to leave a Scottish tenancy?",
        answer:
          "Twenty-eight days, in writing, at any point. There is no fixed term to see out and no penalty for leaving early, because a private residential tenancy has no end date to begin with.",
      },
      {
        question: "Can letting agents charge fees in Scotland?",
        answer:
          "No. Tenant fees have been unlawful in Scotland since 1984. Any administration, referencing or renewal fee charged to a tenant is illegal and recoverable, and the only money you should be asked for is rent and a deposit of no more than two months.",
      },
      {
        question: "How often can rent be increased in Scotland?",
        answer:
          "Once in any twelve-month period, with at least three months' written notice on the prescribed form. The tenant can refer the proposed increase to a rent officer before it takes effect. The adjudication rules have changed several times recently, so check the current position rather than relying on older guidance.",
      },
    ],
    related: [
      { href: "/edinburgh/neighbourhoods", label: "Every area by travel band" },
      { href: "/edinburgh/rent-index", label: "Every area by rent" },
      { href: "/edinburgh/guides/edinburgh-council-tax-and-water-charges", label: "Council tax and water charges" },
    ],
    sources: [
      "Private Housing (Tenancies) (Scotland) Act 2016, for the private residential tenancy and the statutory eviction grounds",
      "Housing (Scotland) Act 2006, for the repairing standard and the First-tier Tribunal route",
      "Scottish Government guidance on rent increases and tenancy deposit schemes",
      "Rent (Scotland) Act 1984, section 82, for the prohibition on tenant fees",
    ],
  },

  {
    slug: "how-much-do-i-need-to-earn-to-live-in-edinburgh",
    h1: "How much do you need to earn to live in Edinburgh?",
    metaTitle: "How much do you need to earn to live in Edinburgh?",
    metaDescription:
      "What salary you actually need in Edinburgh, worked backwards from rent to take-home pay — using Scottish income tax rather than the UK-wide bands.",
    summary:
      "Worked backwards from rent to salary, on the Scottish tax bands — which change the answer above about £43,000.",
    category: "Money",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 8,
    intro: [
      "Edinburgh is the most expensive place to rent in Britain outside London and the South East, and the gap has widened sharply over the last few years. A small, tightly bounded city with two large universities, a substantial short-let sector and very little new supply produces exactly that result.",
      "There is a second complication here that does not exist anywhere else on this site: income tax is devolved. Scotland has six bands rather than three, and the higher rate starts at £43,662 rather than £50,270. Below about £30,000 a Scottish taxpayer is marginally better off than an English one; above about £43,000 they are worse off, and by £60,000 the difference is around £1,750 a year.",
      "This guide works the question backwards — from a monthly rent figure to the gross salary that supports it, on the Scottish bands — so you can see where your own number falls.",
    ],
    sections: [
      {
        heading: "Start from the rent, not the salary",
        paragraphs: [
          "The usual advice is to spend no more than a third of your take-home pay on rent. That is a reasonable ceiling and a poor target: at a third you can still absorb a boiler failure or a month between jobs, and past 45% you are one unexpected bill away from a problem.",
          "The table below grosses that back up through Scottish income tax and National Insurance for the salary rungs used across this section. Compare any of these figures against a UK-wide take-home calculator and you will get a different answer — the calculators default to the English bands unless you tell them otherwise, and that is one of the most common budgeting mistakes people make when moving to Scotland.",
        ],
        dataBlock: "salary-ladder",
      },
      {
        heading: "Where the Scottish bands actually bite",
        paragraphs: [
          "Below around £30,000 the Scottish starter and basic rates leave you fractionally better off than you would be in England — about £40 a year, which is not a reason to do anything.",
          "The band between £43,662 and £50,270 is the one worth understanding. Scotland's higher rate of 42% starts at the bottom of it, and National Insurance does not drop from 8% to 2% until the top of it. For those seven thousand pounds of salary the combined marginal rate is 50%, which is the most heavily taxed stretch of an ordinary Scottish salary and something worth knowing before negotiating a raise into it.",
          "At £50,000 a Scottish taxpayer takes home about £1,500 a year less than an English one on the same salary. At £60,000 it is about £1,750, and at £100,000 about £3,300. Set against Edinburgh's council tax, which is roughly £1,100 a year below Bristol's at Band D, the two partially cancel — but not at the top end.",
        ],
        callout:
          "Between £43,662 and £50,270 a Scottish salary faces a 42% income tax rate and 8% National Insurance at the same time. That 50% marginal band is the single most useful thing to know about pay in Scotland.",
      },
      {
        heading: "What the city actually costs",
        paragraphs: [
          "Five points across the distribution of the areas covered here. The spread is narrower than in the English regions on this site, because Edinburgh is small and its cheap areas are not very cheap.",
          "Rooms are the number most people should look at first, and Edinburgh's room market is the tightest outside London. It also has a seasonal shape nowhere else shares: a substantial part of the flat stock moves to short lets for August, and rooms advertised in July and August price accordingly. If you can time a move for the winter, the same room is measurably cheaper.",
        ],
        dataBlock: "rent-spread",
      },
      {
        heading: "The things the rent figure leaves out",
        paragraphs: [
          "Council tax in Edinburgh is low by English standards — £1,626 at Band D against Bristol's £2,714 — but the bill you receive is not that number. Scottish Water's charges are collected on the same bill and add roughly £652 a year at Band D. Budget for the total, not the headline.",
          "Heating is the cost people underestimate. Edinburgh's tenement and Georgian stock is beautiful, cold and frequently listed, which means the windows cannot be replaced. A top-floor New Town flat in January is a genuinely expensive thing to keep warm.",
          "Transport is one thing the city gets right. Lothian Buses charges a flat fare for any journey within the city and is among the best-run networks in Britain; a monthly pass covers everything. Beyond the bypass you are on ScotRail, and a season ticket from Livingston or Dunbar is a real monthly cost.",
        ],
        list: {
          title: "Monthly costs beyond rent, for a single person in a one-bed",
          items: [
            "Council tax at Band B in Edinburgh: about £105 a month, before any discount",
            "Scottish Water charges at Band B: about £48 a month, collected on the same bill",
            "Single-person discount: 25% off both, so roughly £115 a month combined at Band B",
            "Energy in a tenement or Georgian flat: £100 to £180 a month depending on the season",
            "A Lothian Buses monthly pass: around £65, covering any journey in the city",
          ],
        },
      },
    ],
    faqs: [
      {
        question: "Is Edinburgh expensive to live in?",
        answer:
          "For rent, yes — it is the most expensive city in Britain outside London and the South East, and rents have risen faster here than almost anywhere. Council tax runs strongly the other way: Edinburgh's Band D charge including water is still well below any English city covered on this site.",
      },
      {
        question: "Do you pay more tax in Scotland?",
        answer:
          "It depends on the salary. Below about £30,000 a Scottish taxpayer pays marginally less than an English one. Above about £43,000 they pay more, and the gap widens — roughly £1,500 a year at £50,000, £1,750 at £60,000 and £3,300 at £100,000. National Insurance is reserved and identical across the UK.",
      },
      {
        question: "What is a good salary in Edinburgh?",
        answer:
          "Around £28,000 makes a comfortable shared life straightforward. Around £45,000 makes living alone in an inner suburb realistic. The city centre and the New Town start to open up past £55,000, which is a higher threshold than any English city covered on this site.",
      },
    ],
    related: [
      { href: "/edinburgh/salary", label: "What your salary rents" },
      { href: "/edinburgh/rent-index", label: "Every area by rent" },
      { href: "/edinburgh/guides/edinburgh-council-tax-and-water-charges", label: "Council tax and water charges" },
    ],
    sources: [
      "ONS Price Index of Private Rents, Broad Rental Market Area averages by bedroom count, July 2026",
      "Scottish Government income tax rates and bands for 2026/27",
      "HMRC Class 1 National Insurance thresholds for 2026/27",
      "Scottish Water published household charges for 2026/27",
    ],
  },

  {
    slug: "edinburgh-council-tax-and-water-charges",
    h1: "Council tax and water charges in Edinburgh and the Lothians",
    metaTitle: "Council tax and water charges in Edinburgh and the Lothians",
    metaDescription:
      "Why a Scottish council tax bill is two charges in one, how the band multipliers differ from England, and what each Lothian council actually charges.",
    summary:
      "Why the bill is bigger than the charge, why Scottish bands E to H cost more than the English ratios imply, and what the four councils charge.",
    category: "Money",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 6,
    intro: [
      "Scottish council tax works differently from English council tax in two ways that both change the number, and a third that changes who pays for what.",
      "The bill includes water and sewerage, which in England is a separate account with a separate company. The band multipliers above Band D were increased in 2017 and England's were not. And there is no police or fire precept, because both are funded nationally from the Scottish budget rather than through a local charge.",
      "This guide sets out what each of the four councils charges, what is inside the number, and what to actually budget for.",
    ],
    sections: [
      {
        heading: "What the four councils charge",
        paragraphs: [
          "Band D council tax for 2026/27, cheapest first. These figures are the council tax only — Scottish Water's charges are excluded so that one council's charge can be compared with another's.",
          "Note how low these are against the English regions covered elsewhere on this site. Edinburgh's £1,626 sits roughly £1,090 below Bristol's Band D charge. Part of that is a long run of council tax freezes in Scotland and part is that police and fire are funded nationally rather than locally.",
        ],
        dataBlock: "council-tax",
      },
      {
        heading: "The bill is not the charge",
        paragraphs: [
          "Scottish Water does not bill households directly. Its water and waste-water charges are collected by the council on the council tax bill, and at Band D they add roughly £652 a year. That is a substantial line and it is easy to miss when comparing a Scottish figure with an English one.",
          "So Edinburgh's actual Band D bill is around £2,278 rather than £1,626. It is still well below every English authority covered on this site, but the gap is £436 narrower than the council tax figure alone suggests. Every page here that quotes a Scottish council tax figure says which basis it is on.",
          "The single-person discount of 25% applies to the water charges as well as to the council tax, which is worth knowing — it makes the discount meaningfully larger in Scotland than in England.",
        ],
        callout:
          "The council tax figures on this site exclude water and sewerage so that councils can be compared with each other. Your actual bill will be roughly £652 a year higher at Band D. Budget for the bill, not the charge.",
      },
      {
        heading: "Why Scottish bands E to H cost more",
        paragraphs: [
          "In England every band is a fixed statutory fraction of Band D, running from six-ninths at Band A to eighteen-ninths at Band H. Scotland used the same ratios until 2017, when the multipliers for bands E to H were increased.",
          "The practical effect is at the top. A Scottish Band H property pays 882/360 of the Band D charge — about 22.5% more than the English eighteen-ninths would give. Bands A to D are unchanged, so for most renters this makes no difference at all; for anyone in a large flat or house it makes a considerable one.",
          "This is also why the band tables on this site use a separate set of ratios for Edinburgh. Applying the English ninths would understate every Scottish property above Band D.",
        ],
      },
      {
        heading: "Discounts and exemptions",
        paragraphs: [
          "The single-person discount is 25% and it applies to the water charges too. Full-time students are disregarded entirely, and a household of only students pays no council tax and no water charges — which in a city with two large universities is a substantial part of the rented stock.",
          "Scotland runs its own Council Tax Reduction scheme, which replaced council tax benefit and is more generous than most English local schemes. Each of the four councils administers it, but the rules are set nationally rather than locally, so unlike England the scheme does not vary from one council area to the next.",
        ],
        list: {
          title: "The discounts most often missed",
          items: [
            "Single-person discount: 25% off council tax and water, and you have to claim it",
            "Full-time students: disregarded for both charges, and an all-student household pays nothing",
            "Apprentices and people under 20 in full-time education: disregarded",
            "Severe mental impairment: disregarded, and very widely under-claimed",
            "Council Tax Reduction: means-tested and set nationally, so the rules are the same in all four councils",
          ],
        },
      },
    ],
    faqs: [
      {
        question: "Does council tax in Scotland include water?",
        answer:
          "Yes. Scottish Water's water and waste-water charges are collected on the council tax bill rather than billed separately, and at Band D they add roughly £652 a year. The council tax figures on this site exclude them so councils can be compared with each other, so your actual bill will be higher.",
      },
      {
        question: "Which Lothian council has the lowest council tax?",
        answer:
          "The City of Edinburgh, at £1,626 at Band D for 2026/27, with West Lothian a couple of pounds behind at £1,628. Midlothian is the most expensive at £1,816. All four are well below every English authority covered on this site, even after adding water charges.",
      },
      {
        question: "Are Scottish council tax bands the same as English ones?",
        answer:
          "The bands A to H are the same letters but the 1991 value ranges differ, and since 2017 the multipliers for bands E to H are higher in Scotland than in England. A Scottish Band H pays about 22.5% more relative to Band D than an English one. Bands A to D are unchanged.",
      },
    ],
    related: [
      { href: "/edinburgh/councils", label: "The four councils compared" },
      { href: "/edinburgh/guides/how-much-do-i-need-to-earn-to-live-in-edinburgh", label: "What salary do you need?" },
      { href: "/edinburgh/methodology", label: "How these figures are worked out" },
    ],
    sources: [
      "Published 2026/27 Band D comparison tables for Scottish councils, cross-checked across two independent sources",
      "Scottish Water published household charges for 2026/27",
      "Council Tax (Substitution of Proportion) (Scotland) Order 2016, for the band E to H multipliers",
    ],
  },

  {
    slug: "getting-around-edinburgh-without-a-car",
    h1: "Getting around Edinburgh without a car",
    metaTitle: "Getting around Edinburgh without a car: buses, the tram and ScotRail",
    metaDescription:
      "How Lothian Buses, the tram to Newhaven and the Lothian rail lines actually work, and which parts of Edinburgh genuinely do not need a car.",
    summary:
      "One of the best bus networks in Britain, one tram line, and a compact centre that makes both less necessary than you would think.",
    category: "Transport",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 7,
    intro: [
      "Edinburgh is a small city pretending to be a large one. The built-up area is compact, the centre is dense, and a great many journeys people expect to make by vehicle turn out to be a twenty-minute walk.",
      "What fills the gaps is a bus network that is genuinely among the best in the UK — municipally owned, frequent, and covering the city comprehensively rather than only the profitable corridors. The tram adds one high-capacity spine and the rail lines reach the Lothian towns.",
      "This guide covers what each layer is for, what it costs, and where the network stops working.",
    ],
    sections: [
      {
        heading: "The buses do most of the work",
        paragraphs: [
          "Lothian Buses is council-owned and runs the great majority of services in the city. Frequencies on the main corridors are high enough that timetables are largely irrelevant, coverage extends well beyond the bypass, and the night network is genuinely useful rather than nominal.",
          "Fares are flat rather than distance-based, which is unusual in Britain and means a long journey costs the same as a short one. Contactless capping means you cannot easily overpay in a day, and a season ticket is cheaper still if you travel most days.",
          "The practical consequence is that bus quality is not a strong argument between areas in Edinburgh the way it is in most English cities. Almost everywhere in the city is well served, so the real variable is journey time rather than availability.",
        ],
      },
      {
        heading: "One tram line, and what it changed",
        paragraphs: [
          "The tram runs from the airport through the west of the city, along Princes Street, down Leith Walk and on to Newhaven since the extension opened. It is one line, and it is the busiest transport corridor in the city.",
          "The Newhaven extension is the part that matters for where to live. It converted Leith Walk, Leith and the shore from bus-dependent to tram-served, and it is a substantial part of why that whole corridor has repriced over the last few years.",
          "For everyone not on that axis the tram is mostly an airport service. It is excellent for that — a fixed, frequent, luggage-friendly run into the centre — and largely irrelevant to a daily commute.",
        ],
        dataBlock: "rent-spread",
        callout:
          "Lothian's flat fare and daily cap make the city unusually cheap to move around in. The bus is rarely the reason to choose one Edinburgh area over another; the walk at each end usually is.",
      },
      {
        heading: "Rail, and the Lothian towns",
        paragraphs: [
          "ScotRail's Lothian services are what make Musselburgh, Dalkeith's neighbours, Linlithgow and Livingston work as places to live. Waverley and Haymarket are both central, and journey times from the nearer towns are short enough to compete with a cross-city bus.",
          "The Borders Railway reopened the line south through Midlothian, which changed the position of Newtongrange and Galashiels considerably and pulled the southern edge of the region into commuting range.",
          "The gap is orbital travel. Like most British networks this one is radial, so getting from one outer suburb to another without going through the centre is slow — and that is where a car starts to earn its keep.",
        ],
      },
      {
        heading: "Walking, cycling and the hills",
        paragraphs: [
          "The centre is small enough that walking beats everything for a large share of journeys. From the New Town you can reach most of the Old Town, Stockbridge, Bruntsfield and the West End on foot in under half an hour, and the buses are often no faster in traffic.",
          "Cycling is good on the off-road network and mixed on the roads. The city has an extensive set of former railway paths — the Innocent Railway, the North Edinburgh path network — which make several cross-city routes genuinely pleasant and traffic-free.",
          "The hills are real and they are not evenly distributed. Anything involving the Old Town, Arthur's Seat or the climb up to Morningside is harder work than the map suggests, and the wind off the Forth in winter is a factor people underestimate exactly once.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need a car in Edinburgh?",
        answer:
          "Almost certainly not inside the bypass. The bus network is comprehensive and flat-fared, the centre is walkable, and parking is scarce and expensive in most of the areas people want to live in. A car becomes useful for orbital journeys between outer suburbs, and for the Lothian villages that the rail lines miss.",
      },
      {
        question: "Is the Edinburgh tram worth living near?",
        answer:
          "On the Leith Walk and Newhaven section, yes — it is a genuine high-frequency commuting spine and the corridor has repriced accordingly. Elsewhere it is mainly an excellent airport link, which is worth something but not usually worth a rent premium.",
      },
      {
        question: "How much does public transport cost in Edinburgh?",
        answer:
          "Lothian Buses charges a flat fare regardless of distance, with a daily cap on contactless, and season tickets that reduce it further for regular travel. It is one of the cheaper city networks in Britain to use daily, and the flat fare means living further out costs no more in fares.",
      },
    ],
    related: [
      { href: "/edinburgh/commute", label: "Journey times to every destination" },
      { href: "/edinburgh/neighbourhoods", label: "Where to live, area by area" },
      { href: "/edinburgh/rent-index", label: "Every area by rent" },
    ],
    sources: [
      "Lothian Buses network and fare information, 2026",
      "Edinburgh Trams service pattern following the Newhaven extension",
      "ScotRail published timetables for the Lothian and Borders services, 2026",
    ],
  },

  {
    slug: "renting-in-edinburgh-during-the-festival",
    h1: "Edinburgh in August: what the Festival does to renting",
    metaTitle: "Edinburgh in August: what the Festival does to renting",
    metaDescription:
      "Why August distorts the Edinburgh rental market, what short-term let licensing changed, and how to time a move so the Festival does not cost you.",
    summary:
      "For one month a year a large part of the housing stock is worth more to a tourist than to you. Here is what that does, and what changed.",
    category: "Renting",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 6,
    intro: [
      "Every August Edinburgh's population swells by a substantial fraction and the city hosts the largest arts festival in the world. It is the best month to be here and the worst month to be looking for somewhere to live.",
      "The reason is straightforward economics: for four weeks a flat is worth far more to visitors than to a tenant, which historically pulled a real share of the long-term stock out of the market every summer and pushed it back in every September.",
      "Two things have changed that picture — short-term let licensing and a control area covering the whole city — and the effect is real but partial. This guide covers what actually happens, what the rules now are, and how to time a move around it.",
    ],
    sections: [
      {
        heading: "What August does to the market",
        paragraphs: [
          "The visible effect is on availability rather than headline rent. Long-term listings thin out through the early summer in the areas closest to the venues, and viewings become more competitive because the same stock is chased by students arriving for the academic year at the same time.",
          "The areas most affected are the ones nearest the main venue clusters: the Old Town, Newington, Marchmont, Bruntsfield and the West End. Leith, Gorgie and the outer suburbs feel it much less.",
          "September is the other pressure point, because the Festival stock returns to the market at the same moment as the university intake. If you can move in October or in the spring, you are shopping in a materially calmer market.",
        ],
        dataBlock: "rent-spread",
      },
      {
        heading: "What short-term let licensing changed",
        paragraphs: [
          "Scotland introduced a licensing scheme for short-term lets, and Edinburgh designated the whole council area as a short-term let control area — which means changing the use of a whole flat to a short-term let requires planning permission as well as a licence.",
          "The practical effect has been to reduce the number of whole-property holiday lets in the city and to push some of that stock back towards long-term renting. The market is still tight, but the annual August evacuation is less pronounced than it was.",
          "It has also made the sublet question sharper for tenants. Letting your flat out during the Festival is not the casual arrangement it once was: it will usually breach your tenancy, and it may require a licence you do not have.",
        ],
        callout:
          "If a landlord offers you a lease that conveniently ends in July, ask directly what happens in August. A tenancy shaped around the Festival calendar is a warning about how the property is really being used.",
      },
      {
        heading: "Your tenancy is more protected here than you may expect",
        paragraphs: [
          "Scotland abolished the fixed-term assured shorthold tenancy. A private residential tenancy is open-ended: there is no end date, no automatic expiry, and a landlord can only end it on one of the statutory grounds set out in the 2016 Act.",
          "That matters enormously in a Festival city, because it means a landlord cannot simply decline to renew you in July in order to let the flat to visitors in August. Ending the tenancy requires a ground and, if you do not leave, a First-tier Tribunal decision.",
          "Rent increases are also constrained: no more than once in twelve months, with formal notice, and a tenant can refer a proposed increase to Rent Service Scotland for adjudication. Neither of these protections exists in the same form in England.",
        ],
      },
      {
        heading: "Timing a move",
        paragraphs: [
          "The calmest windows are late autumn and the period from February to April. Stock is normal, competition is ordinary, and landlords who have had a property empty are more willing to negotiate.",
          "The hardest window is mid-August to late September, when the Festival tail and the student intake overlap. If you must move then, have your paperwork assembled in advance and expect to decide quickly.",
          "If you are arriving for a job with a fixed start date in the autumn, a short let for the first few weeks is often the cheaper mistake — it lets you view in person, in the right areas, without signing for a year on the strength of photographs.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do rents actually go up in Edinburgh during the Festival?",
        answer:
          "Long-term rents do not spike for a month; what changes is availability and competition. Stock near the main venues thins out over the summer and the September return of that stock collides with the student intake, so August and September are the hardest weeks of the year to find somewhere.",
      },
      {
        question: "Can my landlord evict me so they can let the flat during the Festival?",
        answer:
          "No. A Scottish private residential tenancy is open-ended and can only be ended on one of the statutory grounds, with notice, and ultimately by a First-tier Tribunal decision if you do not leave. Wanting to let the property to visitors is not among those grounds.",
      },
      {
        question: "Can I sublet my Edinburgh flat during the Festival?",
        answer:
          "Very probably not. Most tenancies prohibit subletting without written consent, and since Edinburgh became a short-term let control area, letting a whole property to visitors generally requires both a licence and planning permission. It is not the informal arrangement it used to be.",
      },
    ],
    related: [
      { href: "/edinburgh/guides/renting-in-scotland-what-is-different", label: "Renting in Scotland: what is different" },
      { href: "/edinburgh/guides/how-much-do-i-need-to-earn-to-live-in-edinburgh", label: "What you need to earn" },
      { href: "/edinburgh/rent-index", label: "Every area by rent" },
    ],
    sources: [
      "Private Housing (Tenancies) (Scotland) Act 2016, on private residential tenancies and grounds for eviction",
      "Civic Government (Scotland) Act 1982 (Licensing of Short-term Lets) Order 2022",
      "City of Edinburgh Council short-term let control area designation, in force since 2022",
    ],
  },
];
