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
];
