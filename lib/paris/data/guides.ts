import type { CityGuide } from "@/lib/city-content";

/**
 * Paris guides for British arrivals.
 *
 * Two things carry most of the weight. Since Brexit a Briton needs a
 * long-stay visa to live in France at all, and the 90/180 Schengen rule
 * is now counted automatically at the border — which catches out people
 * who assume a few months of "trying it out" is available to them. And
 * the French rental market runs on a dossier system that has no British
 * equivalent and defeats a great many applicants before they see a flat.
 *
 * Immigration content here is orientation, not advice. It points at
 * service-public.fr and the consulate every time.
 */

const PUBLISHED = "2026-09-07";

export const PARIS_GUIDES: CityGuide[] = [
  {
    slug: "moving-to-paris-from-the-uk",
    h1: "Moving to Paris from the UK: visas and the 90-day trap",
    metaTitle: "Moving to Paris from the UK: long-stay visas and the 90/180 rule",
    metaDescription:
      "Since Brexit a Briton needs a long-stay visa to live in France. What the 90/180 rule now means in practice, and which visa fits which situation.",
    summary:
      "Ninety days in any 180 is the hard limit, it is counted automatically now, and living here needs a visa applied for before you leave.",
    category: "Moving",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 8,
    intro: [
      "The rule that catches British people out is simple and unforgiving: you may spend 90 days in any rolling 180-day period in the Schengen area, and those days are shared across all 29 countries. Thirty days in France plus thirty in Spain plus thirty in Italy is ninety, not thirty.",
      "It used to be loosely policed. Since the EU Entry/Exit System came into operation in April 2026, entries and exits are recorded biometrically at the border and counted automatically, so the informal tolerance that some people relied on has gone.",
      "If you want to live in Paris, you need a long-stay visa applied for from the UK before you travel. This guide sets out which one, and what else has to happen. It is orientation rather than advice — check the French consulate and service-public.fr for your own circumstances.",
    ],
    sections: [
      {
        heading: "Which visa, for which situation",
        paragraphs: [
          "France distinguishes between a stay of up to a year and an intention to settle, and between working and not working. The four routes below cover almost every British arrival.",
        ],
        list: {
          title: "The long-stay routes that matter",
          items: [
            "VLS-TS salarié — the employee long-stay visa, valid a year and renewable, requiring a French employment contract. This is the standard route for a job move and it doubles as a residence permit once validated online after arrival.",
            "VLS-TS visiteur — for living in France without working, on proven means. Retirees and the financially independent. You sign an undertaking not to work.",
            "VLS-T — a temporary long-stay visa for 90 to 180 days a year, renewable annually. Useful for a second home or extended stays, and it does not lead to residency.",
            "Talent passport — a multi-year permit for qualifying skilled workers, founders, researchers and artists. Harder to get and considerably better once you have it, because it runs up to four years and covers your family.",
            "Student visa — its own route, with the right to work limited hours.",
          ],
        },
        callout:
          "A VLS-TS must be validated online within three months of arriving in France. Missing that step invalidates your residence right even though the visa itself is in your passport — it is the single most common administrative mistake British arrivals make.",
      },
      {
        heading: "ETIAS, and what it is not",
        paragraphs: [
          "ETIAS is the EU's pre-travel registration for visa-exempt visitors, expected to start in late 2026, costing around €20 and valid for three years. It applies to British citizens travelling to the Schengen area as visitors.",
          "It is not a visa and it does not give you any right to live in France. If you plan to move here, ETIAS is irrelevant to you — you need one of the long-stay routes above. The two get conflated constantly in press coverage and they are entirely different things.",
        ],
      },
      {
        heading: "The dossier, and why flats are the hard part",
        paragraphs: [
          "French landlords assess applicants on a dossier — a pack of documents — and they are considerably more demanding than a British referencing check. Expect to prove income of around three times the rent, provide three recent payslips, your last tax assessment, your employment contract and identity documents, all of them in French.",
          "The obstacle for a new arrival is that you have none of this French paperwork yet. The standard solutions are a garant — a guarantor resident in France who commits to cover unpaid rent — or Visale, the free state-backed guarantee scheme which exists precisely to substitute for one and which a great many landlords accept.",
          "Apply for Visale before you start looking. It takes days rather than minutes, and having the certificate in your dossier moves you ahead of applicants who do not.",
        ],
        list: {
          title: "What a Paris rental dossier needs",
          items: [
            "Passport and, once you have it, your validated VLS-TS or residence permit",
            "Employment contract and your three most recent payslips",
            "Your most recent avis d'imposition (tax assessment) once you have one",
            "A Visale guarantee certificate, or a French guarantor with their own full dossier",
            "Proof of your current address",
            "Deposit — capped at one month's rent unfurnished, two months furnished",
          ],
        },
      },
      {
        heading: "What else has to happen",
        paragraphs: [
          "Healthcare comes through PUMA, the universal cover scheme, once you have been resident and stable for three months. Until then you need private cover, and you should not skip it. Apply for your carte Vitale as soon as you are eligible because the process is slow.",
          "A French bank account is needed for essentially everything, including the rent, and opening one needs proof of address — which needs the flat, which needs the dossier. A digital bank with a French IBAN is the usual way out of the loop.",
          "And the French tax year is the calendar year, with a declaration due in spring. If you arrive part-way through a year you will still file, and if you keep UK income the double taxation treaty determines where it is taxed. That is worth an accountant in your first year.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long can a British citizen stay in France without a visa?",
        answer:
          "Ninety days in any rolling 180-day period, shared across the whole Schengen area rather than per country. Since the EU Entry/Exit System started operating in April 2026 this is counted automatically from biometric records at the border, so overstaying is now detected reliably.",
      },
      {
        question: "Can I move to Paris and look for work?",
        answer:
          "Not on a visitor entry. The employee long-stay visa requires a French employment contract before you apply, so the job comes first. The talent passport routes have their own criteria. You can visit for up to 90 days in 180, but that is a visit, not a right to take up work.",
      },
      {
        question: "Do I need a guarantor to rent in Paris?",
        answer:
          "In practice, usually yes, and a new arrival rarely has one. Visale is the free state-backed guarantee scheme designed for exactly this situation and is widely accepted — apply for it before you start viewing rather than after a landlord asks.",
      },
      {
        question: "Is ETIAS a visa?",
        answer:
          "No. It is a pre-travel registration for short visits, expected from late 2026 at around €20, and it confers no right to live or work in France. Anyone moving to Paris needs a long-stay visa instead, applied for from the UK before travelling.",
      },
    ],
    related: [
      { href: "/paris/guides/renting-in-paris-rent-control", label: "Rent control and what it means for you" },
      { href: "/paris/guides/what-you-need-to-earn-in-paris", label: "What you need to earn" },
      { href: "/paris/arrondissements", label: "Where to live, arrondissement by arrondissement" },
    ],
    sources: [
      "France-Visas and service-public.fr guidance on long-stay visas and VLS-TS validation",
      "European Commission material on the Entry/Exit System, operational from April 2026, and ETIAS",
      "Action Logement guidance on the Visale rental guarantee scheme",
      "UK Foreign, Commonwealth and Development Office living-in-France guidance",
    ],
  },

  {
    slug: "renting-in-paris-rent-control",
    h1: "Renting in Paris: rent control, charges and the things nobody warns you about",
    metaTitle: "Renting in Paris: how rent control works and what your rent excludes",
    metaDescription:
      "Paris rents are legally capped per square metre. How the encadrement des loyers works, how to check a listing against it, and what charges really cost.",
    summary:
      "An advertised rent above the legal ceiling is unlawful and recoverable. How to check, and what else is on the bill.",
    category: "Renting",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 7,
    intro: [
      "Paris caps rents by law. The encadrement des loyers sets a binding maximum per square metre for every combination of geographic zone, property type, number of rooms, construction period and whether the flat is furnished — and a rent advertised above it is not a premium, it is unlawful.",
      "Most British arrivals have never encountered a binding rent cap and do not check. That is worth money: if you are overcharged you can require the excess to be repaid, and the listing is required to state the reference rent in the first place.",
    ],
    sections: [
      {
        heading: "How the cap actually works",
        paragraphs: [
          "The prefecture publishes a table each year setting a loyer de référence for each combination. The landlord may charge up to the reference plus 20% — the loyer de référence majoré — and no more, unless the flat has an exceptional characteristic justifying a complément de loyer, which must be stated and justified in the lease.",
          "Ceilings across the city currently run from roughly €18 to €52 per square metre depending on the combination, and the current table applies from 1 July 2026. Median rents sit around €26.60/m², with the periphery around €22 and the historic centre around €38.",
          "Every listing is legally required to state the reference rent and the maximum. If it does not, that is itself a breach and a reasonable signal about the landlord.",
        ],
        dataBlock: "rent-spread",
        callout:
          "Furnished lets carry a higher ceiling than unfurnished ones, which is why so much of the Paris market is furnished. If you are bringing furniture, you are searching a smaller and cheaper pool than the listings suggest.",
      },
      {
        heading: "What the rent does not include",
        paragraphs: [
          "The good news first, and it genuinely is good news for a British reader: there is no council tax. The taxe d'habitation was abolished on main residences in 2023, so a tenant in their principal home pays no residence tax at all. Second homes still pay, and Paris levies a heavy surcharge on those.",
          "What you do pay is charges — the provision sur charges — quoted separately from rent and covering building upkeep, the lift, the concierge and communal heating where it exists. These are reconciled annually against actual spend, so budget for a balancing bill.",
          "The household waste tax is levied on the owner but lawfully recoverable from the tenant, and most Paris leases recover it. And home insurance is legally compulsory for tenants in France, with proof required annually — failing to hold it is grounds to terminate the lease, which is not the case in the UK.",
        ],
        dataBlock: "council-tax",
      },
      {
        heading: "Furnished or unfurnished, and why it matters",
        paragraphs: [
          "The two are different legal regimes, not just different listings. An unfurnished lease runs three years and the tenant may leave on three months' notice, reduced to one in a zone tendue — which Paris is. A furnished lease runs one year, or nine months for a student, with one month's notice throughout.",
          "Furnished is the flexible option and the more expensive one per square metre, and it is what most short-term arrivals take. Unfurnished is cheaper, more secure, and requires you to buy a kitchen — French unfurnished genuinely means unfurnished, frequently including light fittings.",
        ],
      },
      {
        heading: "The practical traps",
        paragraphs: [
          "The état des lieux — the inventory at check-in and check-out — is the document that decides whether you get your deposit back, and it is taken seriously. Photograph everything and be pedantic about the entry version; a French check-out inspection is more rigorous than a British one.",
          "Deposits are capped at one month unfurnished and two furnished, and must be returned within one month of check-out if the inventories match, two if they do not. That is considerably more tenant-friendly than the Swiss three-month blocked account.",
          "Agency fees charged to the tenant are capped per square metre and vary by zone. Anyone quoting a percentage of annual rent is not following the law.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is rent control in Paris actually enforced?",
        answer:
          "Yes. Listings must state the reference rent and the legal maximum, and a tenant charged above the ceiling can require the excess to be repaid. It is not a guideline: the ceiling is set by prefectural order and the current table applies from 1 July 2026.",
      },
      {
        question: "Do tenants in Paris pay council tax?",
        answer:
          "No. The taxe d'habitation was abolished on main residences in 2023, so a tenant in their principal home pays no residence tax. You will pay building charges and, in most leases, the household waste tax, and home insurance is legally compulsory — but there is no council tax equivalent.",
      },
      {
        question: "What deposit will I be asked for in Paris?",
        answer:
          "One month's rent for an unfurnished flat and two months for a furnished one, both capped by law. It must be returned within one month of check-out where the inventories match, and two months where they do not.",
      },
    ],
    related: [
      { href: "/paris/guides/moving-to-paris-from-the-uk", label: "Visas and the 90-day rule" },
      { href: "/paris/rent-index", label: "Every area by rent" },
      { href: "/paris/arrondissements", label: "What you pay beyond rent" },
    ],
    sources: [
      "Préfecture de Paris, arrêté of 12 June 2026 setting reference rents from 1 July 2026",
      "Loi ALUR and loi ELAN, on rent control, deposits and tenant agency fees",
      "Décret n°87-713 on charges récupérables",
      "Loi de finances provisions abolishing taxe d'habitation on main residences",
    ],
  },

  {
    slug: "what-you-need-to-earn-in-paris",
    h1: "What you need to earn in Paris",
    metaTitle: "What salary do you need in Paris? Worked from rent backwards",
    metaDescription:
      "French gross salaries look low against British ones and the comparison is misleading. What a Paris salary actually clears, and what a landlord will require.",
    summary:
      "A French gross is not a British gross. What the payslip clears, and the three-times-rent rule that decides whether you get the flat.",
    category: "Money",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 7,
    intro: [
      "French salaries look poor next to British ones and the comparison misleads in both directions. Social contributions are much higher, so the gap between gross and net is wider than a British reader expects — but a great deal more comes back as public service, and the household tax system treats families very differently from the UK's.",
      "The practical question for a mover is simpler than any of that: what does the payslip clear, and will a landlord accept it. This guide works both.",
    ],
    sections: [
      {
        heading: "Gross to net, and the quotient familial",
        paragraphs: [
          "Employee social contributions — health, pension, unemployment, CSG and CRDS — take roughly 22% of gross before income tax is calculated at all. Income tax is then deducted at source on the remainder.",
          "The figures on these pages assume one part fiscale: a single person with no children. That matters enormously, because French income tax is assessed on the household divided by the number of parts. A couple with two children has three parts, and pays dramatically less on the same total income than a single person would. If you are moving as a family, treat the salary pages here as a floor rather than an estimate.",
        ],
        dataBlock: "salary-ladder",
      },
      {
        heading: "What a landlord will require",
        paragraphs: [
          "The convention is a net monthly income of about three times the rent. On a €1,200 one-bedroom that is €3,600 a month net, which is a substantial French salary — and it is why the Visale guarantee scheme matters so much for anyone who does not clear it comfortably.",
          "The dossier requirement is as much of a constraint as the arithmetic. A landlord choosing between twenty applicants will take the one with French payslips and a French guarantor over a better-paid foreigner with neither, so the practical answer is often to fix the dossier rather than the salary.",
        ],
        callout:
          "Three times the rent in net income, and a complete dossier. A new arrival usually fails the second test rather than the first, and Visale exists to fix it — apply before you view.",
      },
      {
        heading: "The costs that are lower than you expect",
        paragraphs: [
          "No council tax on your main home, which is worth £1,500 to £2,500 a year against a British equivalent. A Navigo pass covering the entire Île-de-France region for a flat monthly fee, with your employer legally required to reimburse at least half. Healthcare through PUMA once you are established, with most costs reimbursed and a mutuelle covering the rest — often subsidised by the employer.",
          "Childcare is the one that surprises people most. The crèche system is heavily subsidised and means-tested, and a place costs a fraction of a British nursery. Getting a place is the difficulty, not paying for it.",
        ],
      },
      {
        heading: "And the ones that are higher",
        paragraphs: [
          "Floor area, above all. Paris rents are not far off London per month but they buy considerably less space, and a family-sized flat inside the boundary is both expensive and scarce.",
          "Eating out is dearer than most of Britain outside London. And if you choose international schooling rather than the French state system, that single decision can exceed your rent.",
        ],
        dataBlock: "rent-spread",
      },
    ],
    faqs: [
      {
        question: "What salary do you need to rent in Paris?",
        answer:
          "Landlords generally require net monthly income of about three times the rent, so a €1,200 flat implies around €3,600 net a month. A Visale guarantee can substitute for part of that requirement and is free, state-backed and widely accepted.",
      },
      {
        question: "Are French salaries lower than British ones?",
        answer:
          "Gross salaries are typically lower and social contributions higher, so the net gap looks wide. Against that, there is no council tax on a main residence, transport is capped and half-reimbursed by employers, healthcare is largely covered and childcare is heavily subsidised. The comparison is genuinely closer than the headline numbers suggest.",
      },
      {
        question: "How much of a French salary goes in tax and contributions?",
        answer:
          "Roughly 22% of gross in employee social contributions before income tax, which is then deducted at source. The effective total for a single person on a middle income lands somewhere around 26% to 33%, and materially less for a household with children under the quotient familial.",
      },
    ],
    related: [
      { href: "/paris/salary", label: "What your salary rents" },
      { href: "/paris/guides/renting-in-paris-rent-control", label: "Rent control and charges" },
      { href: "/paris/rent-index", label: "Every area by rent" },
    ],
    sources: [
      "URSSAF published employee contribution rates for 2026",
      "Direction générale des finances publiques income tax scale and quotient familial rules for 2026",
      "Action Logement Visale eligibility criteria",
      "Île-de-France Mobilités Navigo tariffs and the statutory employer reimbursement",
    ],
  },

  {
    slug: "the-paris-rental-dossier",
    h1: "The dossier and the guarantor: how to actually get a Paris flat",
    metaTitle: "The Paris rental dossier and guarantor, explained",
    metaDescription:
      "What a French landlord may ask for, why the guarantor rule blocks so many British arrivals, and how Visale, paid guarantors and the caution bancaire work.",
    summary:
      "The flat is rarely the hard part. The dossier is, and the guarantor rule is the single thing most likely to stop you.",
    category: "Renting",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 8,
    intro: [
      "Paris does not have Geneva's vacancy problem, but it has a paperwork problem that is at least as effective at keeping people out. Flats are let on the strength of a dossier, and the dossier carries one requirement that most people arriving from Britain cannot meet.",
      "That requirement is the garant: a French-resident third party who signs to cover the rent if you do not, and who is generally expected to earn three to four times it. Without one, a large share of the private market is closed to you regardless of what you earn.",
      "There are three real ways round it, and knowing which one applies to you before you start viewing is worth more than any amount of searching.",
    ],
    sections: [
      {
        heading: "What the dossier contains, and what may not be asked for",
        paragraphs: [
          "French law limits what a landlord may demand. The permitted list is set out in decree, and anything outside it — a bank statement, a photograph, a medical record, proof of a French bank account before signature — is not lawfully required, however routinely it is asked for.",
          "In practice you will be competing against files that include the extras anyway. The pragmatic position is to have a complete lawful dossier ready as a single PDF, and to decline the requests that go beyond it, which most agents drop when challenged.",
          "Income evidence is the part that decides it. Landlords look for roughly three times the rent in net monthly income, and they apply the same test to the guarantor.",
        ],
        list: {
          title: "What a landlord may lawfully ask for",
          items: [
            "One piece of photo identification",
            "Proof of your current address: a utility bill, or your last three rent receipts",
            "Proof of activity: an employment contract, a school or university certificate, or company registration",
            "Proof of income: your last three payslips, or your most recent tax assessment",
            "The same documents again for your guarantor, where you have one",
          ],
        },
        callout:
          "Charges are quoted separately from rent and they are not small. A flat advertised at €1,200 hors charges can cost €1,320 in practice once heating, water, building maintenance and the household waste charge are provisioned.",
      },
      {
        heading: "The guarantor problem, and the three ways round it",
        paragraphs: [
          "Visale is the state-backed free guarantee scheme run by Action Logement. It covers anyone aged 18 to 30 whatever their employment status, and older tenants in defined situations including a recent job change. It is free, landlords accept it, and it is the first thing to check — a great many British arrivals qualify on age alone and never find out.",
          "Paid guarantor services such as GarantMe and Unkle charge a percentage of the annual rent, typically in the region of three to five per cent, and issue a guarantee a landlord will take. It is a real cost, and a small one next to an extra month in temporary accommodation.",
          "The third route is a caution bancaire: a sum frozen in a French bank account as security. It works, it ties up a lot of money, and it requires a French bank account — which is its own small ordeal for someone who has just arrived.",
        ],
      },
      {
        heading: "Furnished, unfurnished and the mobility lease",
        paragraphs: [
          "The distinction matters more here than in Britain because it changes the length of the contract. An unfurnished lease runs three years; a furnished one runs a year, renewable. Furnished flats cost more per month and are far more common at the small end of the market.",
          "The bail mobilité is a furnished lease of one to ten months, non-renewable, aimed at people on a course, a secondment or a fixed assignment. It carries no deposit at all, and Visale covers it. For a first few months while you find something permanent it is often the cleanest option available.",
          "Deposits are capped: one month for unfurnished, two for furnished, nothing on a mobility lease. Agency fees charged to the tenant are capped by area too, so a Paris agent may not charge you an open-ended finder's fee.",
        ],
      },
      {
        heading: "The colocation route, and what it changes",
        paragraphs: [
          "Sharing is normal here well beyond student age, and it solves two problems at once: the rent per head falls, and several products aimed at sharers apply lighter guarantor requirements.",
          "Read the clause de solidarité. Most colocation leases make every tenant jointly liable for the whole rent, so if a flatmate leaves you carry their share until they are replaced. A lease with an individual contract per room avoids that, and is usually worth paying slightly more for.",
          "Charges in a share are generally pooled and settled annually against the building's real costs, so expect an adjustment in one direction or the other some months after the year ends.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I rent in Paris without a French guarantor?",
        answer:
          "Yes, but not by default. Check Visale first: it is free, state-backed, and covers everyone aged 18 to 30 whatever their job. Failing that, a paid guarantor service charges a few per cent of the annual rent, or you can freeze a sum in a French bank account as a caution bancaire.",
      },
      {
        question: "How much do I need to earn to be accepted for a Paris flat?",
        answer:
          "Landlords generally look for around three times the rent in net monthly income and apply the same test to a guarantor. That is a screening rule rather than an affordability one, so it is entirely possible to be turned down for a flat you could comfortably pay for.",
      },
      {
        question: "What is a bail mobilité?",
        answer:
          "A furnished lease of between one and ten months, non-renewable, for people on a course, a secondment or a temporary assignment. It requires no deposit, Visale covers it, and it is often the most realistic first contract for someone who has just arrived and cannot yet assemble a full dossier.",
      },
    ],
    related: [
      { href: "/paris/guides/renting-in-paris-rent-control", label: "Rent control and charges" },
      { href: "/paris/guides/moving-to-paris-from-the-uk", label: "Visas and the 90-day rule" },
      { href: "/paris/rent-index", label: "Every area by rent" },
    ],
    sources: [
      "Loi n° 89-462 du 6 juillet 1989 on residential tenancies, as amended by the loi ALUR and loi ÉLAN",
      "Décret n° 2015-1437 listing the documents a landlord may require of a tenant or guarantor",
      "Action Logement guidance on the Visale guarantee, 2026",
    ],
  },

  {
    slug: "getting-around-paris",
    h1: "Getting around Paris: Navigo, zones and the périphérique",
    metaTitle: "Getting around Paris: Navigo, zones and crossing the périphérique",
    metaDescription:
      "How the Navigo pass, the métro and the RER actually work, why the fare zones stopped mattering, and what the périphérique still costs you.",
    summary:
      "The flat-fare Navigo changed where it makes sense to live. The métro extensions are changing it again.",
    category: "Transport",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 7,
    intro: [
      "Paris has the densest urban rail network in Europe and a fare system to match. Understanding it properly is worth real money, because the biggest single decision — whether to live inside the boundary or outside it — turns almost entirely on how the network treats the crossing.",
      "Two changes matter more than anything else. In 2015 the Navigo season pass went flat-fare across every zone, which removed the financial penalty for living further out. And the Grand Paris Express and the métro extensions are steadily connecting the inner suburbs to each other rather than only to the centre.",
      "Together they mean the commuter calculation here looks nothing like it did a decade ago, and nothing like a British one.",
    ],
    sections: [
      {
        heading: "The network, in four layers",
        paragraphs: [
          "The métro is the dense inner layer: sixteen lines, stops every five hundred metres or so, and inside the boundary you are almost never more than a short walk from one. It is slow over distance and unbeatable over two miles.",
          "The RER is the fast layer — five lines running underneath central Paris and out into the suburbs with far wider stop spacing. An RER trip from the inner suburbs to the centre is often quicker than a métro trip across Paris, which is the fact that makes Vincennes, Boulogne and their equivalents work.",
          "Trams run mostly around the outside, including the T3 orbital along the boundary, and the Transilien network covers the wider Île-de-France. Above all of it sits a bus network that is genuinely useful outside the peaks and genuinely slow inside them.",
        ],
      },
      {
        heading: "Navigo is flat-fare, and that redraws the map",
        paragraphs: [
          "A monthly or annual Navigo pass costs the same whether you travel within Paris or from the outer edge of Île-de-France. There is no zonal ladder to climb, so unlike London or the South East, moving further out does not raise your travel cost at all.",
          "The consequence is that outer living is priced in time rather than money, which is a far more forgiving trade for anyone whose journey is genuinely fast. The suburbs sitting on a métro extension are the obvious winners, and Montreuil, Pantin and Saint-Ouen have all repriced accordingly.",
          "Employers are legally required to reimburse at least half the cost of a season ticket used for commuting, which puts the effective price of unlimited regional travel low enough that owning a car in Paris is very hard to justify.",
        ],
        callout:
          "There is no zone premium on a Navigo season ticket. Living twenty kilometres out costs the same in fares as living in the Marais, so the whole trade is journey time — which is why the commute figures on this site matter more here than the map does.",
      },
      {
        heading: "The périphérique is a road, not a wall",
        paragraphs: [
          "Rents inside the boundary and rents immediately outside it differ by considerably more than the transport difference justifies, and the métro crosses the ring in a dozen places. That gap is the most exploitable fact in the Paris market.",
          "Line 11 out to Rosny, line 12 to Aubervilliers, line 14 north to Saint-Denis and south towards Orly, line 4 to Bagneux: each extension has pulled a commune into the effective city. The pattern to look for is a place where a terminus opened recently and rents have not fully caught up.",
          "The counterpart is that the crossing is not uniform. A commune ten minutes' walk from a métro station is a different proposition from one on top of it, and a bus at each end turns a nominally short trip into a long one.",
        ],
      },
      {
        heading: "Cycling, and the thing that changed fastest",
        paragraphs: [
          "Paris has built protected cycle lanes at a pace few European cities have matched, and the rue de Rivoli axis and the north-south routes are now genuinely usable. Cycling has gone from a minority activity to a mainstream commute in about six years.",
          "Vélib' is the docked hire scheme, cheap on a subscription and useful precisely because you can ride one way and take the métro back. It is the standard answer to a journey the rail network handles badly.",
          "Car ownership has been made steadily harder on purpose: parking is expensive and scarce, low-emission rules keep tightening, and several central axes are closed to through traffic. If your plan involves a car in Paris, price the parking before you price the flat.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does it cost more to commute from the suburbs in Paris?",
        answer:
          "Not in fares. The Navigo season pass has been flat-fare across every zone since 2015, so a journey from the outer edge of Île-de-France costs exactly what a journey within Paris costs. The cost of living further out is journey time, and your employer must reimburse at least half the pass either way.",
      },
      {
        question: "Is it worth living just outside the périphérique?",
        answer:
          "Very often, yes. Rents drop sharply at the boundary while the métro crosses it in a dozen places, so a commune on a recent line extension can put you fifteen minutes from the centre at a materially lower rent. Check the walk to the station rather than the name of the commune.",
      },
      {
        question: "Do I need a car in Paris?",
        answer:
          "No, and the city has spent a decade making sure of it. Parking is scarce and expensive, low-emission rules keep tightening, and the rail network reaches almost everything. A car makes sense only for regular travel outside the region, and even then hiring usually beats owning.",
      },
    ],
    related: [
      { href: "/paris/commute", label: "Journey times to every destination" },
      { href: "/paris/arrondissements", label: "Where to live, arrondissement by arrondissement" },
      { href: "/paris/rent-index", label: "Every area by rent" },
    ],
    sources: [
      "Île-de-France Mobilités Navigo fare information and network maps, 2026",
      "Société du Grand Paris published opening dates for the Grand Paris Express and métro extensions",
      "Code du travail article R3261-1 on employer reimbursement of season tickets",
    ],
  },
];
