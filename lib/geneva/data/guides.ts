import type { CityGuide } from "@/lib/city-content";

/**
 * Geneva guides, written for a British reader who has decided to move.
 *
 * These carry far more weight than the UK guides do, because far more is
 * different. A reader moving from Manchester to Leeds needs to know
 * about rent and council tax. A reader moving from Manchester to Geneva
 * needs a work permit they cannot apply for themselves, private health
 * insurance within three months, a blocked deposit account, and a
 * decision about which country to live in — and none of that is
 * discoverable from a neighbourhood page.
 *
 * Everything immigration-related here is orientation, not advice. Rules
 * change, individual circumstances dominate, and the guides say so and
 * point at the official source every time.
 */

const PUBLISHED = "2026-09-07";

export const GENEVA_GUIDES: CityGuide[] = [
  {
    slug: "moving-to-geneva-from-the-uk",
    h1: "Moving to Geneva from the UK: permits and the paperwork",
    metaTitle: "Moving to Geneva from the UK: permits, paperwork and the order to do it in",
    metaDescription:
      "British citizens are third-country nationals in Switzerland since Brexit. What permit you need, who applies for it, and what has to happen before you can sign a lease.",
    summary:
      "You cannot apply for your own Swiss work permit, and almost everything else waits on it. The order things happen in, and why.",
    category: "Moving",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 9,
    intro: [
      "The single most important thing to understand about moving to Switzerland from Britain is that free movement ended. Since Brexit, UK citizens are third-country nationals in Swiss law — the same category as Americans, Australians and Indians — and that changes the process completely from what it was before 2021.",
      "The practical consequence is that you cannot move to Geneva and then look for work. Your employer applies for your permit, from inside Switzerland, before you arrive, and the application has to clear a cantonal authority and a federal one. Nothing else in the move can be finalised until it does.",
      "This guide sets out the order things actually happen in. It is orientation rather than advice: rules change, quotas move, and the answer for a UN staff member, a CERN researcher and a bank employee are three different answers. Check the State Secretariat for Migration and your cantonal office before relying on anything here.",
    ],
    sections: [
      {
        heading: "The permit, and who applies for it",
        paragraphs: [
          "For most British arrivals the answer is a B permit, sponsored by a Swiss employer. Your employer applies to the Geneva cantonal migration office (OCPM); you do not apply yourself and you cannot start the process from the UK on your own. Expect six to twelve weeks, and expect it to be the long pole in the whole move.",
          "The employer has to show that the role could not reasonably be filled from Switzerland or the EU/EFTA, and that your qualifications and salary meet the threshold for a skilled third-country hire. In practice this means the route is open to specialists, and considerably harder for generalist or junior roles than it was when free movement applied.",
          "There are quotas. Britain has had its own annual allocation of L and B permits since Brexit, separate from the general third-country quota, and it has consistently been undersubscribed — over a thousand L and sixteen hundred B permits were still free late in the year. The direction of travel is towards folding the UK allocation into the general non-EU quota, which would make it tighter. Neither the quota nor its future is something you can influence; what you can do is not treat the permit as a formality.",
        ],
        callout:
          "You cannot self-apply. If a relocation service or a landlord asks for your permit before your employer has filed, the answer is that the sequence does not work that way — the job comes first, then the permit, then the flat.",
      },
      {
        heading: "The permits you will hear named",
        paragraphs: [
          "Four come up constantly in Geneva and they are not interchangeable.",
        ],
        list: {
          title: "What each one means",
          items: [
            "B permit — residence permit tied to employment, typically issued for one year and renewable. The standard outcome for a sponsored hire, and the one that makes you a Swiss resident for tax and health insurance.",
            "L permit — short-term, usually up to twelve months, for fixed-term assignments. Fewer rights attached and harder to convert.",
            "C permit — settlement, after five or ten years depending on nationality and integration criteria. Not something you arrive on.",
            "G permit — the cross-border commuter permit, for people who live in France or another EU state and work in Switzerland. This is the one that makes living in Annemasse or Ferney-Voltaire possible, and it is worth its own guide.",
            "Ci permit — for spouses and children of international civil servants, which in Geneva is a very large group. It carries the right to work, which an ordinary dependant permit may not.",
          ],
        },
      },
      {
        heading: "The order things have to happen in",
        paragraphs: [
          "Geneva's housing market is tight enough that this sequence matters. A landlord will ask for your permit, an employment contract, a recent salary slip and often a debt-collection extract before considering you, and you will be competing against dozens of applicants for a decent flat.",
          "That produces a well-known chicken-and-egg problem for new arrivals — no permit without a job, no flat without a permit, no address to put on the permit application. The usual resolution is a serviced flat or a sublet for the first two or three months, which is expensive and worth budgeting for from the start rather than discovering.",
        ],
        list: {
          title: "The realistic sequence",
          items: [
            "Secure the job offer. Nothing starts before this.",
            "Employer files the permit application with the cantonal office. Six to twelve weeks.",
            "Arrange temporary accommodation for the first two to three months. Budget for it.",
            "Arrive, then register with your commune within fourteen days. This is a legal obligation, not a formality.",
            "Take out LAMal health insurance within three months, backdated to your arrival date.",
            "Open a Swiss bank account — which is far easier once you have a permit and a registered address.",
            "Start looking for a permanent flat with permit, contract and salary slips in hand.",
          ],
        },
      },
      {
        heading: "What surprises British arrivals most",
        paragraphs: [
          "Health insurance is private, compulsory, per person and not deducted from your salary. It is the single largest budgeting error British arrivals make, because nothing in the UK experience prepares you for a household bill of over a thousand francs a month before anyone has been ill. It has its own guide here.",
          "The rental deposit is up to three months' rent, held in a blocked account, on top of the first month. On a modest two-bed that is a five-figure sum unavailable to you for the length of the tenancy.",
          "Registering with your commune within fourteen days of arrival is a legal requirement with a fine attached, and it is also the gate to almost everything else — the health insurance, the bank account, the residence permit card itself.",
          "And the flat market is genuinely difficult. Geneva's vacancy rate has sat below half a percent for years. Expect to lose several applications before one lands, and expect to be asked for documents that no British landlord would ask for.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can a British citizen still move to Switzerland after Brexit?",
        answer:
          "Yes, but as a third-country national rather than under free movement. In practice that means an employer must sponsor a work permit before you move, the role must meet a skilled-worker threshold, and the permit is subject to quota. Britons who were already resident before free movement ended are covered by the separate UK–Swiss Citizens' Rights Agreement.",
      },
      {
        question: "Can I move to Geneva and then look for a job?",
        answer:
          "Not on a work permit. Your employer applies for it on your behalf from inside Switzerland, so the job has to come first. You can visit visa-free for up to 90 days in any 180 under the Schengen rules, but that is a visit, not a job search with a right to start work.",
      },
      {
        question: "How long does a Swiss work permit take?",
        answer:
          "Typically six to twelve weeks from the employer filing to a decision, and it can run longer if the cantonal and federal stages both query the file. Plan the rest of the move around it rather than assuming it will land on time.",
      },
    ],
    related: [
      { href: "/geneva/guides/living-in-france-working-in-geneva", label: "Living in France, working in Geneva" },
      { href: "/geneva/guides/geneva-health-insurance-explained", label: "Health insurance explained" },
      { href: "/geneva/communes", label: "Where to live, commune by commune" },
    ],
    sources: [
      "Swiss State Secretariat for Migration (SEM) guidance on third-country nationals, 2026",
      "Office cantonal de la population et des migrations (OCPM), canton of Geneva",
      "UK–Swiss Citizens' Rights Agreement, for residents established before free movement ended",
      "UK Foreign, Commonwealth and Development Office living-in-Switzerland guidance",
    ],
  },

  {
    slug: "geneva-health-insurance-explained",
    h1: "Swiss health insurance, explained for someone arriving from the NHS",
    metaTitle: "Swiss health insurance (LAMal) explained for British arrivals in Geneva",
    metaDescription:
      "Compulsory, private, per person and not deducted from your salary. What LAMal actually costs in Geneva and the three-month rule that catches people out.",
    summary:
      "The largest cost British arrivals fail to budget for, and the deadline that backdates it whether you signed up or not.",
    category: "Money",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 7,
    intro: [
      "If you take one thing from this section, take this: Swiss healthcare is excellent, and you pay for it directly, monthly, per person, out of your net salary. There is no employer scheme, no payroll deduction and no household rate. A family of four pays four premiums.",
      "For someone arriving from the NHS this is the single biggest adjustment to the household budget, and it is the one most often discovered late — because unlike rent or tax, nothing about a job offer flags it.",
      "Geneva is also the most expensive canton in Switzerland for premiums, which does not help.",
    ],
    sections: [
      {
        heading: "What it costs, and what drives the number",
        paragraphs: [
          "Basic compulsory cover — LAMal — runs to roughly CHF 460 a month for an adult in Geneva on the highest deductible, and can approach CHF 560 on a lower one. The Swiss national average is closer to CHF 380, so Geneva carries a meaningful premium on top of an already high figure.",
          "Four things move it: your canton and premium region, your age, your insurer, and your chosen deductible. Children are cheaper but not free. The basic cover itself is identical by law whichever insurer you pick — they compete on price and service, not on what is covered — so shopping around is worth real money for no loss of cover.",
          "The federal government runs the only official comparison tool, priminfo.ch, and it is the one to use. Verify your own number there rather than relying on any figure quoted here or by a relocation agent.",
        ],
        dataBlock: "council-tax",
      },
      {
        heading: "The deductible, and the trap in it",
        paragraphs: [
          "You choose a franchise — an annual deductible — between CHF 300 and CHF 2,500. A high deductible cuts your monthly premium substantially; a low one raises it. Above the deductible you still pay a 10% co-payment up to an annual cap.",
          "The arithmetic is straightforward: if you expect to use very little healthcare, the CHF 2,500 deductible is cheaper overall. If you have a chronic condition, are pregnant, or have young children, the low deductible usually wins. The trap is choosing the high deductible for the low premium and then not having the CHF 2,500 available in the year you need it.",
          "You can normally only change your deductible or insurer at the end of a calendar year, with notice. Getting the first choice roughly right matters more than it would in a market you could leave next month.",
        ],
        callout:
          "You have three months from arriving to take out cover, and it is backdated to your arrival date. Missing the deadline does not save you money — it means paying several months of premiums at once, plus any medical costs you incurred meanwhile.",
      },
      {
        heading: "Subsidies, and who actually qualifies",
        paragraphs: [
          "Geneva runs a cantonal subsidy scheme — the subside d'assurance-maladie — for lower and middle incomes, and the thresholds are more generous than most arrivals assume. It is worth checking rather than dismissing, particularly for a single-income household with children.",
          "It is not automatic. You apply through the cantonal service, and the assessment is based on your taxable income, which for a new arrival may be estimated rather than known.",
        ],
      },
      {
        heading: "What about the French side?",
        paragraphs: [
          "If you live in France and work in Switzerland on a G permit, you get a choice — the droit d'option — between the Swiss LAMal system and the French one. You generally exercise it once, within three months, and it is difficult to reverse.",
          "The French option is usually substantially cheaper, because French social insurance is funded largely through payroll contributions rather than flat premiums. The Swiss option buys access to Swiss providers on Swiss terms. Which is better depends on where you want to be treated, whether your family is with you and how much you value continuity if you later move across the border.",
          "This is a genuinely consequential decision with a short deadline and it is worth paying for an hour of proper cross-border advice before making it.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Swiss health insurance compulsory?",
        answer:
          "Yes, for everyone resident in Switzerland, and you must arrange it within three months of arriving. Cover is backdated to your arrival date, so delaying does not avoid the cost. There is no state alternative and no opting out.",
      },
      {
        question: "How much is health insurance in Geneva?",
        answer:
          "Roughly CHF 460 a month for an adult on a CHF 2,500 deductible, rising towards CHF 560 on lower deductibles. Geneva is the most expensive canton; the Swiss average is nearer CHF 380. Children are charged at a reduced rate but are charged. Check your own figure on the federal priminfo.ch calculator.",
      },
      {
        question: "Does my employer pay for health insurance in Switzerland?",
        answer:
          "No. Unlike accident insurance, which employers do cover, health insurance is a private contract between you and an insurer, paid monthly from your net salary. Nothing about it appears on your payslip, which is why British arrivals so often fail to budget for it.",
      },
    ],
    related: [
      { href: "/geneva/guides/moving-to-geneva-from-the-uk", label: "Permits and the paperwork" },
      { href: "/geneva/salary", label: "What your salary actually clears" },
      { href: "/geneva/communes", label: "What else you pay, commune by commune" },
    ],
    sources: [
      "Federal Office of Public Health (OFSP) priminfo.ch premium comparison, canton of Geneva, 2026",
      "Federal Health Insurance Act (LAMal / KVG) on compulsory cover and the three-month deadline",
      "République et canton de Genève, subside d'assurance-maladie scheme",
    ],
  },

  {
    slug: "living-in-france-working-in-geneva",
    h1: "Living in France and working in Geneva",
    metaTitle: "Living in France, working in Geneva: the cross-border trade-off",
    metaDescription:
      "Roughly half the rent, fifteen minutes away, and a completely different set of obligations. What the G permit means and what it costs you in complexity.",
    summary:
      "The biggest housing decision in Geneva is which country to live in. What you gain, and what you take on.",
    category: "Moving",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 9,
    intro: [
      "Around a hundred thousand people cross the French border into Geneva to work every weekday. They do it because a two-bedroom flat in Annemasse costs roughly half what the same flat costs in Eaux-Vives, fifteen minutes away on the Léman Express.",
      "That arithmetic is real and it is the single largest lever available to anyone arriving here on a Geneva salary. It also comes attached to a permit, two tax systems, a healthcare election with a three-month deadline, and a border you will cross twice a day for the rest of your time here.",
      "This guide sets out both halves honestly. For a great many people the trade is clearly worth it. For some it clearly is not, and knowing which before you sign a French lease is the point.",
    ],
    sections: [
      {
        heading: "What the G permit is",
        paragraphs: [
          "The G permit is the cross-border commuter permit: it lets you live in France (or another neighbouring EU state) and work in Switzerland. Your Swiss employer applies for it, as with a B permit — you cannot self-apply — and it is typically valid for five years on a permanent contract.",
          "The critical wrinkle for a British reader is that the G permit does not, by itself, give you the right to live in France. That is a separate question answered by French immigration law, and since Brexit a British citizen needs a French long-stay visa or residence permit to be there for more than 90 days in any 180. Two permits, two countries, two processes.",
          "This catches people out. Being hired in Geneva does not make you legally resident in Annemasse. Plan both, and plan the French side early, because it is the one nobody tells you about.",
        ],
        callout:
          "A Swiss G permit and a French residence permit are separate things. A British citizen commuting from France needs both. This is the most common and most expensive misunderstanding on this page.",
      },
      {
        heading: "Where the tax actually lands",
        paragraphs: [
          "Geneva is unusual. Under the 1966 France–Switzerland treaty and its 1983 supplement covering the border cantons, cross-border workers employed in Geneva are taxed at source in Switzerland rather than in their country of residence — which is the opposite of the arrangement in most other Swiss cantons.",
          "You will still have French obligations: a French tax declaration, French wealth and property rules, and French social treatment depending on your health insurance election. Being taxed in Switzerland does not make you invisible to the French system.",
          "Since 1 January 2026 Geneva has clarified the remote-working position: a cross-border worker may work from home in France for up to 40% of annual working time without changing where the salary is taxed. Beyond that threshold the treatment changes. If your role is substantially remote, this is a number worth knowing precisely.",
        ],
      },
      {
        heading: "The honest ledger",
        paragraphs: [
          "What you gain is straightforward and large: roughly half the rent, French supermarket and restaurant prices, more space, and in the Pays de Gex or above Annemasse, mountains at the end of the road.",
          "What you take on is complexity and time. Two jurisdictions, an annual French declaration, a healthcare election you make once, a car that probably becomes necessary, and a border crossing at rush hour that on the wrong route can add half an hour each way.",
        ],
        list: {
          title: "Worth weighing before you commit",
          items: [
            "Rent and general prices roughly half the Geneva level — the reason anyone does this",
            "You need a French residence permit as well as a Swiss G permit, and the French one is your responsibility",
            "Taxed at source in Geneva under the border-canton treaty, but still filing in France",
            "A one-time choice between Swiss LAMal and French health cover, within three months and hard to reverse",
            "Remote work from France capped at 40% of annual working time before the tax treatment changes",
            "Léman Express journeys are quick and reliable; driving across the border at peak is neither",
            "Swiss schooling is not open to you; your children will be in the French system unless you pay for an international school",
          ],
        },
      },
      {
        heading: "Where people actually live",
        paragraphs: [
          "Annemasse is the default: forty thousand people, a real town centre, and the Léman Express straight into Eaux-Vives and Cornavin. It is the best-connected French option by a distance.",
          "Ferney-Voltaire and the Pays de Gex serve CERN, the airport and the international quarter, and hold the largest established anglophone community on the French side — which for a family arriving with no French matters more than the rent difference.",
          "Saint-Julien-en-Genevois suits the Plan-les-Ouates life-sciences cluster, with TPG buses running across the border on Swiss timetables. Thonon-les-Bains is the cheapest of the lot and the furthest, forty to fifty minutes each way along the lake.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can a British citizen live in France and work in Switzerland?",
        answer:
          "Yes, but it takes two permissions. A Swiss G cross-border permit, applied for by your Swiss employer, plus a French long-stay visa or residence permit, which is your own responsibility as a third-country national in France since Brexit. Neither substitutes for the other.",
      },
      {
        question: "Where do cross-border workers in Geneva pay tax?",
        answer:
          "In Switzerland, at source. Geneva is a border canton covered by the 1983 supplement to the France–Switzerland treaty, which reverses the usual rule that cross-border workers are taxed where they live. You will still file a French declaration.",
      },
      {
        question: "How much cheaper is living in France near Geneva?",
        answer:
          "Roughly half on rent — a one-bed averaging around CHF 950 equivalent in Annemasse against CHF 2,200 in Eaux-Vives — plus meaningfully lower prices for food, fuel and eating out. Against that, set the cost of a car, the border crossing, and the administrative overhead of two countries.",
      },
      {
        question: "How much can a cross-border worker work from home?",
        answer:
          "Up to 40% of annual working time from France, since the position was clarified on 1 January 2026, with the whole salary remaining taxable in Switzerland. Beyond that threshold the tax and social security treatment changes, so check before agreeing a remote pattern.",
      },
    ],
    related: [
      { href: "/geneva/guides/moving-to-geneva-from-the-uk", label: "Permits and the paperwork" },
      { href: "/geneva/guides/geneva-health-insurance-explained", label: "Health insurance explained" },
      { href: "/geneva/lifestyle/value", label: "Where the rent buys the most" },
    ],
    sources: [
      "France–Switzerland double taxation treaty 1966 and the 1983 supplementary agreement on border cantons",
      "Administration fiscale cantonale, canton of Geneva, guidance on cross-border remote working from 1 January 2026",
      "Swiss State Secretariat for Migration guidance on the G cross-border commuter permit",
      "French service-public.fr guidance on long-stay visas for British nationals",
    ],
  },

  {
    slug: "what-you-need-to-earn-in-geneva",
    h1: "What you need to earn in Geneva",
    metaTitle: "What salary do you need in Geneva? Worked from rent backwards",
    metaDescription:
      "Geneva salaries look enormous from Britain and buy less than you expect. What the numbers actually clear once tax, health insurance and rent are out.",
    summary:
      "Swiss salaries look transformative from the UK. What they clear after tax, insurance and a Geneva rent is a different figure.",
    category: "Money",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 8,
    intro: [
      "A Geneva job offer converted into pounds usually looks like a promotion of an implausible size. It is not an illusion — Swiss salaries genuinely are high — but the conversion is misleading, because almost every cost that follows is high too, and two of the largest do not appear on the payslip at all.",
      "This guide works the question backwards from what things cost, so you can see what a given offer actually clears rather than what it converts to.",
    ],
    sections: [
      {
        heading: "Start from the rent",
        paragraphs: [
          "The 35% guideline used across this site is a ceiling rather than a target, and in Geneva it is a demanding one: the canton has had a vacancy rate below half a percent for years, and landlords routinely apply a rule of thumb that your gross annual income should be at least three times the annual rent. On a CHF 2,500 flat that is CHF 90,000 before they will look at your file.",
          "That threshold is not a law, it is a screening convention, and it is the reason a well-paid new arrival can still lose flat after flat. It also means the practical constraint is often the landlord's arithmetic rather than your own.",
        ],
        dataBlock: "salary-ladder",
      },
      {
        heading: "What comes off before rent",
        paragraphs: [
          "Income tax in Geneva is levied at three levels — federal, cantonal and communal — and the communal share varies by roughly a factor of two across the canton's 45 communes. Two identical salaries in two communes fifteen minutes apart can differ by thousands of francs a year, which is a genuine reason to care where you live beyond the rent.",
          "On top of income tax come compulsory social contributions: old-age and disability insurance, unemployment insurance and an occupational pension, which together take something in the region of thirteen per cent of gross.",
          "And then health insurance, which is not a payroll deduction at all. Budget roughly CHF 460 a month per adult in Geneva, plus the deductible in any year you use it. For a couple that is over eleven thousand francs a year, paid from net income, before anyone is ill.",
        ],
        callout:
          "The two costs that most often break a British budget for Geneva are health insurance, because it is invisible on the payslip, and the three-month deposit, because it is unavailable for the length of the tenancy.",
      },
      {
        heading: "The spread across the basin",
        paragraphs: [
          "Five points across the areas covered here, from the cheapest to the dearest. The gap between the two ends is not a neighbourhood premium — it is the border.",
        ],
        dataBlock: "rent-spread",
      },
      {
        heading: "Where the salary rungs land",
        paragraphs: [
          "Below about CHF 80,000, living alone on the Swiss side of the border is genuinely hard, and both the shared market and the French communes become the realistic answers rather than compromises.",
          "Between CHF 100,000 and CHF 140,000 — which covers a great many professional roles here — the canton opens up for a one-bed and the question becomes commune and commute rather than affordability.",
          "Above that, the constraint stops being what you can pay and becomes what is available, because at any price the vacancy rate is the vacancy rate.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is a Geneva salary really as good as it looks from the UK?",
        answer:
          "Higher in real terms than the equivalent British salary, but by much less than the exchange rate suggests. Rent is roughly double a London figure per square metre, health insurance is an extra private bill of around CHF 460 per adult per month, and everyday prices are substantially higher. The gain is real; it is not the multiple the conversion implies.",
      },
      {
        question: "What salary do you need to rent a flat in Geneva?",
        answer:
          "Landlords commonly screen at gross annual income of at least three times the annual rent, so a CHF 2,500 a month flat implies around CHF 90,000. That is a market convention rather than a legal rule, but it is applied widely enough to be the binding constraint for many applicants.",
      },
      {
        question: "Does where I live in the canton change my tax bill?",
        answer:
          "Yes, and by more than most arrivals expect. Geneva's communes levy their own multiplier on top of cantonal tax and the range across the canton is roughly a factor of two. On a high salary the difference between the cheapest and dearest commune can outweigh a moderate difference in rent.",
      },
    ],
    related: [
      { href: "/geneva/salary", label: "What your salary rents" },
      { href: "/geneva/rent-index", label: "Every area by rent" },
      { href: "/geneva/guides/geneva-health-insurance-explained", label: "Health insurance explained" },
    ],
    sources: [
      "Administration fiscale cantonale, canton of Geneva, income tax scales and communal multipliers for 2026",
      "Federal Office of Public Health priminfo.ch premium data for canton Geneva, 2026",
      "OCSTAT cantonal housing vacancy statistics",
    ],
  },
];
