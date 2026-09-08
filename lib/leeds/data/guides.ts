import type { CityGuide } from "@/lib/city-content";

/**
 * West Yorkshire editorial guides.
 *
 * Same rules as everywhere else on the site: written, not templated;
 * every checkable figure carries a source and a review date; legal
 * claims are England-only and say so; and if a guide would only restate
 * a neighbourhood page, it does not get written.
 */

const PUBLISHED = "2026-09-07";

export const LEEDS_GUIDES: CityGuide[] = [
  {
    slug: "how-much-do-i-need-to-earn-to-live-in-leeds",
    h1: "How much do you need to earn to live in Leeds?",
    metaTitle: "How much do you need to earn to live in Leeds?",
    metaDescription:
      "What salary you actually need in Leeds and West Yorkshire, worked backwards from rent to take-home pay. Honest figures for sharing and for living alone.",
    summary:
      "Worked backwards from rent to salary — for a room, and for the very different proposition of living on your own.",
    category: "Money",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 7,
    intro: [
      "Leeds is one of the few large British cities where a single person on a median graduate salary can still rent a one-bed flat alone, close in, without either sharing or commuting for an hour. That is genuinely true and it is the most useful thing anyone can tell you about the city's cost of living.",
      "It is also becoming less true. Leeds has had the fastest rent growth of any major English city outside London over the last few years, driven by a city-centre building boom that sold to investors and a professional employment base that keeps expanding. The gap between Leeds and the rest of West Yorkshire has widened accordingly.",
      "This guide works the question backwards — from a monthly rent figure to the gross salary that supports it — so you can see where your own number falls.",
    ],
    sections: [
      {
        heading: "Start from the rent, not the salary",
        paragraphs: [
          "The usual advice is to spend no more than a third of your take-home pay on rent. That is a reasonable ceiling and a poor target: at a third you can still absorb a boiler failure or a month between jobs, and past 45% you are one unexpected bill away from a problem.",
          "Work from the rent you would actually pay, divide by 0.35, and gross it back up through income tax and National Insurance. The table below does that for the salary rungs used across this section.",
        ],
        dataBlock: "salary-ladder",
      },
      {
        heading: "The Leeds premium, and how to avoid it",
        paragraphs: [
          "Five points across the distribution of the areas covered here. What the spread shows is that the expensive decision in West Yorkshire is not which neighbourhood you pick — it is whether you live in Leeds at all.",
          "A one-bed in Leeds city centre and a one-bed in Halifax differ by nearly £500 a month. Halifax is forty minutes away on a direct train. For a great many people that trade is worth making, and for people whose work is in Leeds five days a week it usually is not — but it deserves to be an actual decision rather than an assumption.",
        ],
        dataBlock: "rent-spread",
        callout:
          "A room in a share at £450 needs roughly £20,000 a year to sit inside the 35% guideline. A one-bed in Leeds city centre at £1,025 needs roughly £49,000. Almost the entire range of West Yorkshire housing sits between those two numbers.",
      },
      {
        heading: "The things the rent figure leaves out",
        paragraphs: [
          "Council tax is the big one and West Yorkshire's is comparatively modest — every one of the five boroughs sits below £2,450 at Band D. More usefully, most of the region's housing stock sits in bands A to C, so the bill on a typical flat comes in well below the Band D headline. Budget £110 to £150 a month rather than the £190 the headline implies.",
          "Heating is the cost people underestimate here. West Yorkshire's Victorian back-to-backs and stone terraces are cold, and a stone-built house on a Pennine hillside in January is a genuinely expensive thing to keep warm. Anywhere above Halifax or Huddersfield, add to whatever number you had in mind.",
          "Transport can go either way. Inside Leeds a bus pass or a bike covers it. From Halifax, Huddersfield or Keighley a season ticket into Leeds runs to a meaningful monthly sum, and it eats a good part of the rent saving that took you there.",
        ],
        list: {
          title: "Monthly costs beyond rent, for a single person in a one-bed",
          items: [
            "Council tax at Band A in Leeds: about £127 a month, before any discount",
            "Single-person council tax discount: 25% off, so about £95 a month at Band A in Leeds",
            "Energy in a stone terrace or back-to-back: £100 to £170 a month depending on the season",
            "A Leeds bus pass: around £65 a month",
            "A rail season ticket from Halifax or Huddersfield into Leeds: budget £180 to £230 a month",
          ],
        },
      },
      {
        heading: "Where the salary rungs actually land",
        paragraphs: [
          "At £22,000 to £25,000 a room in a share is the sensible answer in Leeds, but a one-bed becomes realistic almost immediately if you look at Bradford, Halifax, Huddersfield or Dewsbury — all of which have direct trains into Leeds.",
          "Between £28,000 and £36,000 most of Leeds outside the very centre opens up for a one-bed. This is the band where the region is genuinely comfortable in a way that few English cities still are.",
          "Past £45,000 the question stops being affordability and starts being where you want to be, which in this region means choosing between a city centre flat, a Victorian suburb and a Pennine town — three very different lives at broadly similar prices.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Leeds expensive to live in?",
        answer:
          "By national standards, no — Leeds sits well below the English average for rent and its council tax is the lowest of the five West Yorkshire boroughs. By regional standards it is comfortably the most expensive place in West Yorkshire, and the gap between it and Bradford, Calderdale or Kirklees is large enough to be worth planning around.",
      },
      {
        question: "What is a good salary in Leeds?",
        answer:
          "Around £25,000 makes a comfortable shared life straightforward. Around £32,000 to £36,000 makes living alone in a decent inner suburb realistic without stretching. Past £45,000 the city centre and the better parts of north Leeds are genuinely open to you.",
      },
      {
        question: "Is it cheaper to live outside Leeds and commute in?",
        answer:
          "On rent, substantially — Halifax, Keighley, Dewsbury and Castleford are £300 to £450 a month cheaper for a one-bed than central Leeds. The season ticket takes back £180 to £230 of that, so the saving is real but smaller than the headline. Wakefield, Dewsbury and Morley tend to work out best, because all three have fast trains and short journeys.",
      },
    ],
    related: [
      { href: "/leeds/salary", label: "What your salary rents" },
      { href: "/leeds/rent-index", label: "Every area by rent" },
      { href: "/leeds/boroughs", label: "Council tax by borough" },
    ],
    sources: [
      "ONS Price Index of Private Rents, local authority averages by bedroom count, July 2026",
      "Published 2026/27 Band D council tax comparison tables for Yorkshire and the Humber",
      "HMRC income tax and Class 1 National Insurance thresholds for 2026/27",
    ],
  },

  {
    slug: "west-yorkshire-council-tax-explained",
    h1: "Council tax in West Yorkshire, explained",
    metaTitle: "Council tax in Leeds and West Yorkshire explained",
    metaDescription:
      "What council tax actually costs across Leeds, Bradford, Wakefield, Kirklees and Calderdale — and why the ordering has nothing to do with rent.",
    summary:
      "What each of the five boroughs charges, what the Mayoral precept pays for, and why Leeds is both the dearest to rent in and the cheapest to be taxed in.",
    category: "Money",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 5,
    intro: [
      "Council tax is the second-largest housing cost most renters have and the one they most often forget to check before signing. In West Yorkshire it also runs in the opposite direction to rent, which catches people out.",
      "Leeds has the region's highest rents and its lowest Band D charge. Kirklees has neither the highest rents nor the lowest tax. If you are weighing two boroughs on rent alone you are missing a difference of a few hundred pounds a year running the other way.",
    ],
    sections: [
      {
        heading: "What the five boroughs charge",
        paragraphs: [
          "Band D charges for 2026/27, cheapest first. Each figure is the total for the year: the borough's own element including its adult social care precept, plus the West Yorkshire Mayor's policing precept and the Fire and Rescue Authority precept, which every household in the five pays at the same rate.",
        ],
        dataBlock: "council-tax",
      },
      {
        heading: "What the Mayoral precept is",
        paragraphs: [
          "Policing in West Yorkshire has been funded through the Mayor since 2021, when the office absorbed the Police and Crime Commissioner. That is the same arrangement Greater Manchester uses and it differs from most of England, where a separate PCC still levies the charge.",
          "The fire and rescue element is levied separately by the West Yorkshire Fire and Rescue Authority. Both are charged identically across all five boroughs, so every pound of difference between them comes from the council's own element and nowhere else.",
        ],
      },
      {
        heading: "Bands, and why 1991 still matters",
        paragraphs: [
          "Bands are based on what a property was worth on 1 April 1991, not on what it is worth now — the single most common point of confusion about the tax. In West Yorkshire this works strongly in renters' favour: the great majority of the region's housing sits in bands A to C, so the Band D headline substantially overstates a typical bill.",
          "A Band A property pays six-ninths of the Band D charge. In Leeds that is about £1,520 a year against the £2,284 headline — a difference of £760 that nobody mentions when quoting the figure.",
          "Every other band is a fixed statutory multiple of Band D, set nationally under the Local Government Finance Act 1992. Those ratios do not vary by authority, so the council pages here derive every band from the Band D figure rather than storing them.",
        ],
        callout:
          "Before you sign, ask which band the specific property is in. In West Yorkshire the gap between the Band D headline and an actual Band A bill is the largest of any region covered on this site.",
      },
      {
        heading: "Discounts worth knowing about",
        paragraphs: [
          "If you live alone you get 25% off. Full-time students are disregarded entirely, and a household of only students pays nothing at all — which matters in Headingley, Hyde Park and central Huddersfield more than anywhere.",
          "If you think your band is wrong, the Valuation Office Agency will review it, but be aware the review can move the band either way. Each of the five boroughs also runs its own Council Tax Reduction scheme with its own means test.",
        ],
        list: {
          title: "The discounts most often missed",
          items: [
            "Single-person discount: 25% off, and it is not applied automatically — you have to claim it",
            "Full-time students: disregarded, and an all-student household pays nothing",
            "Apprentices and people under 20 in full-time education: disregarded",
            "Severe mental impairment: disregarded, and this one is very widely under-claimed",
            "Council Tax Reduction: means-tested, with a different scheme in each of the five boroughs",
          ],
        },
      },
    ],
    faqs: [
      {
        question: "Which West Yorkshire borough has the lowest council tax?",
        answer:
          "Leeds, at £2,283.73 at Band D for 2026/27 — which is also the borough with the region's highest rents. Kirklees is the most expensive at £2,441.07. The spread across the five is under £160 a year, so it is a smaller factor here than the rent difference.",
      },
      {
        question: "Do renters pay council tax in West Yorkshire?",
        answer:
          "Usually yes. In a self-contained flat or house the tenant is liable, not the landlord. In a house in multiple occupation the landlord is normally liable and the cost is built into the rent, which is one reason a room in a share is better value than the headline rent difference implies.",
      },
      {
        question: "Why is the Band D figure higher than what people actually pay?",
        answer:
          "Because Band D is a statutory reference point rather than a typical property. Most West Yorkshire housing sits in bands A to C, which pay six-ninths, seven-ninths and eight-ninths of the Band D charge respectively. A Band A bill in Leeds is about £760 a year below the headline.",
      },
    ],
    related: [
      { href: "/leeds/boroughs", label: "The five boroughs compared" },
      { href: "/leeds/guides/how-much-do-i-need-to-earn-to-live-in-leeds", label: "What salary do you need?" },
      { href: "/leeds/methodology", label: "How these figures are worked out" },
    ],
    sources: [
      "Published 2026/27 Band D comparison tables for Yorkshire and the Humber, cross-checked across two independent sources",
      "Local Government Finance Act 1992, section 5, for the statutory band ratios",
      "West Yorkshire Mayoral policing precept and Fire and Rescue Authority precept resolutions for 2026/27",
    ],
  },

  {
    slug: "commuting-in-west-yorkshire",
    h1: "Commuting in West Yorkshire: the train is the whole story",
    metaTitle: "Commuting in West Yorkshire: which lines actually work",
    metaDescription:
      "West Yorkshire has no tram and no metro. What that means in practice, which lines genuinely work, and where the network will let you down.",
    summary:
      "Which lines carry the region, where the frequencies fall away, and why living near a good station matters more here than almost anywhere.",
    category: "Transport",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 6,
    intro: [
      "Leeds is the largest city in western Europe without a mass transit system. The Supertram was cancelled in 2005 after twenty years of planning, the trolleybus scheme that replaced it was refused in 2016, and what the region has instead is a Victorian railway network built to move wool between mill towns.",
      "That network turns out to be unusually good at moving people, largely by accident. West Yorkshire has more stations than any English county outside London, and the practical consequence is that where you live relative to a station matters more here than in almost any comparable region.",
    ],
    sections: [
      {
        heading: "The lines that carry the region",
        paragraphs: [
          "Four corridors do most of the work. The Airedale line runs Leeds–Shipley–Bingley–Keighley–Skipton and is fast, frequent and electrified. The Wharfedale line branches off it to Guiseley and Ilkley. The Calder Valley line runs Leeds–Bradford–Halifax–Hebden Bridge and on to Manchester. The TransPennine main line runs Leeds–Dewsbury–Huddersfield–Manchester.",
          "Add the Wakefield lines to the south and the York and Selby lines to the east, and most of the region's population lives within a few minutes of a station. Cross Gates reaches Leeds in nine minutes; Morley in ten; Dewsbury in fifteen.",
        ],
        list: {
          title: "The strongest journeys in the region",
          items: [
            "Cross Gates to Leeds: nine minutes, several times an hour",
            "Morley to Leeds: ten minutes on a rebuilt station",
            "Garforth to Leeds: twelve minutes, and thirty on to York",
            "Wakefield Westgate to Leeds: fourteen minutes, plus direct LNER trains to London",
            "Dewsbury to Leeds: fifteen minutes, and twenty to Huddersfield the other way",
            "Bradford Forster Square to Leeds: twenty minutes",
          ],
        },
      },
      {
        heading: "Where it lets you down",
        paragraphs: [
          "Frequency is the first problem. A great many of these lines run half-hourly, and some hourly off-peak, which turns a fifteen-minute journey into a forty-minute one if you miss it. This is the single most common way a West Yorkshire commute disappoints someone who moved for the journey time on paper.",
          "Reliability is the second. The TransPennine route through Huddersfield has been among the worst-performing in the country for years, and the ongoing upgrade work means closures and replacement buses that are not going away soon.",
          "The third is Bradford. Two stations, four hundred metres apart, that do not connect to each other — Forster Square serves the Airedale line north and Interchange serves the Calder Valley line west, and to change between them you walk. For a city of half a million this is an extraordinary piece of Victorian inheritance, and the proposed new through station has been discussed for decades.",
        ],
        callout:
          "Check the off-peak frequency of the line, not just the journey time. A fifteen-minute journey on an hourly train is a worse commute than a twenty-five-minute one every ten minutes.",
      },
      {
        heading: "Buses, and where they are the answer",
        paragraphs: [
          "Large parts of inner Leeds have no station at all — Chapel Allerton, Meanwood, Roundhay and Armley are all bus-only, and all four are places a great many people want to live. The buses are frequent and the journeys are short, but they queue with everything else on the arterial roads at peak.",
          "The MCard is the region's flat multi-operator ticket and it is genuinely useful if you mix operators. Franchising is being introduced across West Yorkshire, which should change fares and coordination over the next few years, but it will not build any new track.",
        ],
      },
      {
        heading: "The mass transit question",
        paragraphs: [
          "A new tram network for Leeds and Bradford is in development, with the first lines proposed to run from Leeds city centre to St James's Hospital and out to south Leeds. It has funding commitments and a delivery timetable measured in years rather than months.",
          "It is worth knowing about and worth not planning around. The region has been here before, twice, and neither previous scheme was built. Choose an area on the transport that exists today.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you need a car in Leeds?",
        answer:
          "Not in the city centre, the inner suburbs or anywhere near a station on a frequent line. Leeds is compact and the bus network inside the city is dense. Outside the rail corridors — Otley and Wetherby in particular — a car becomes close to essential.",
      },
      {
        question: "How long does it take to get from Bradford to Leeds?",
        answer:
          "About twenty minutes on the train from Forster Square, or twenty-five from Interchange on the Calder Valley line, giving roughly twenty-five to thirty minutes door to door. It is one of the better-value commutes in England: Bradford's rents are around three-quarters of Leeds's.",
      },
      {
        question: "Is West Yorkshire getting a tram?",
        answer:
          "A Leeds–Bradford mass transit scheme is in development with funding committed, but nothing is running yet and the region has had two previous schemes cancelled at a late stage. Pick an area on the transport that exists today rather than on the one that is planned.",
      },
    ],
    related: [
      { href: "/leeds/commute", label: "Commute times by destination" },
      { href: "/leeds/lifestyle/transport", label: "Best-connected areas" },
      { href: "/leeds/neighbourhoods", label: "Every area by travel band" },
    ],
    sources: [
      "Published National Rail timetables for the Airedale, Wharfedale, Calder Valley and TransPennine routes, September 2026",
      "Office of Rail and Road station usage estimates for West Yorkshire",
      "West Yorkshire Combined Authority mass transit and bus franchising programme documentation",
    ],
  },

  {
    slug: "renting-in-leeds-first-time",
    h1: "Renting in Leeds for the first time",
    metaTitle: "Renting in Leeds for the first time: shares, city-centre flats and deposits",
    metaDescription:
      "How the Leeds rental market works — the student effect on the north-west corridor, the city-centre new-build boom, deposit rules and what to check at a viewing.",
    summary:
      "Two very different markets in one city: a large student-shaped share sector to the north-west, and a new-build city centre that behaves nothing like it.",
    category: "Renting",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 7,
    intro: [
      "Leeds has one of the largest student populations in the country and one of the fastest-growing city-centre residential markets, and those two things have produced a rental market that is really two markets with very little in common.",
      "The north-western corridor — Hyde Park, Headingley, Burley, Woodhouse — is shaped almost entirely by the academic year. The city centre is shaped by a decade of build-to-rent development and behaves like a different city: professionally managed, furnished, expensive per square foot, and available all year round.",
      "Knowing which of the two you are shopping in changes what you should look for and when you should look. The legal detail below is England-only and assumes a private assured shorthold tenancy.",
    ],
    sections: [
      {
        heading: "The student cycle sets the calendar",
        paragraphs: [
          "In the north-west corridor the letting year runs well ahead of itself. A large share of the stock for the following September is signed in the winter before, which means that if you look in July you are looking at what is left.",
          "That has an upside for anyone not tied to the academic year. Outside the corridor — and in the corridor itself in late spring — landlords who have missed the cycle are considerably more willing to negotiate on rent and on terms.",
          "It also means the shared market is huge and cheap by national standards. Rooms very often include bills, which is worth £100 to £180 a month you are not separately paying, and is the reason the shared route dominates at lower salaries.",
        ],
        dataBlock: "rent-spread",
      },
      {
        heading: "The city centre is a different product",
        paragraphs: [
          "A decade of build-to-rent has given central Leeds a large stock of professionally managed apartments with concierges, gyms and on-site maintenance. They are furnished, they let all year, and the process is more corporate and less negotiable than dealing with a small landlord.",
          "Check what the service charge and amenities actually add. A rent quoted inclusive of a gym you will not use is still a rent you are paying, and parking in a central block is usually a separate monthly charge on top.",
          "The other thing to check is the council tax band, because a new-build one-bed in the centre is frequently banded higher than an older and larger flat a mile out. That difference runs to well over a hundred pounds a month at the top end.",
        ],
        callout:
          "Under the Tenant Fees Act 2019 an agent in England may not charge you for referencing, inventories, contracts or admin. Holding deposits are capped at one week's rent, tenancy deposits at five weeks' where the annual rent is under £50,000.",
      },
      {
        heading: "What to check at a viewing",
        paragraphs: [
          "In the older terraced stock, ask about heating and insulation before anything else. A great deal of West Yorkshire's back-to-back and through-terrace housing is solid-walled, and the winter running cost of a poorly insulated one is the difference between two areas' rents several times over. The EPC is the first document to ask for.",
          "In the corridor specifically, ask whether the property is licensed. Leeds operates selective and mandatory HMO licensing across parts of the city, and a licensed property has been inspected against standards an unlicensed one has not.",
          "Everywhere, check the tenancy type. Most shares are joint and several, which means a departing flatmate's rent becomes yours until they are replaced. Individual room contracts remove that risk and are worth a small premium.",
        ],
      },
      {
        heading: "Deposits and the end of the tenancy",
        paragraphs: [
          "Your deposit must be protected in an approved scheme within thirty days and you must be given the prescribed information. This is the most commonly missed landlord obligation, and failing it carries a statutory penalty and blocks a section 21 notice.",
          "Do the inventory carefully on day one. Photograph everything with a date, add whatever the agent left off, and email it in so there is a record you do not control alone. This is what decides the deposit return a year or two later.",
          "Fair wear and tear is not damage. If a deduction looks unreasonable, the deposit scheme's free adjudication service is the route, and it is the landlord who has to evidence the claim rather than you who has to disprove it.",
        ],
      },
    ],
    faqs: [
      {
        question: "When should I start looking for a flat in Leeds?",
        answer:
          "It depends which market you are in. In the north-western student corridor the following September's stock is largely signed by the previous winter, so looking in summer means looking at leftovers. City-centre apartments and most of the rest of the city let all year round, and late spring is often the best time to negotiate.",
      },
      {
        question: "Are bills usually included in a Leeds house share?",
        answer:
          "Very often, yes — it is much more common here than in many English cities. That is worth roughly £100 to £180 a month you are not separately paying, so a room advertised at £500 all-in is not comparable with a £500 room where bills are extra.",
      },
      {
        question: "Is a city-centre flat in Leeds better value than an older flat further out?",
        answer:
          "Rarely on price per square foot, and the council tax band on a new-build is often higher than on a larger older flat a mile away. What you buy is management quality, insulation and a walk to work. Whether that is worth it depends mostly on how much you would otherwise spend on travel.",
      },
    ],
    related: [
      { href: "/leeds/guides/how-much-do-i-need-to-earn-to-live-in-leeds", label: "What you need to earn" },
      { href: "/leeds/guides/west-yorkshire-council-tax-explained", label: "Council tax explained" },
      { href: "/leeds/rent-index", label: "Every area by rent" },
    ],
    sources: [
      "Tenant Fees Act 2019, on permitted payments and deposit caps in England",
      "Housing Act 2004, sections 213 to 215, on tenancy deposit protection",
      "Leeds City Council selective and HMO licensing designations, 2026",
    ],
  },

  {
    slug: "your-first-month-in-leeds",
    h1: "Your first month in Leeds: the checklist",
    metaTitle: "Your first month in Leeds: a practical checklist",
    metaDescription:
      "What to sort in your first four weeks in Leeds and West Yorkshire — deposit protection, council tax and the single-person discount, meters, the GP and the bus.",
    summary:
      "The unglamorous list, in the order worth doing it. Two items have legal deadlines and one is worth a quarter of your council tax.",
    category: "Moving",
    published: PUBLISHED,
    updated: PUBLISHED,
    readMinutes: 6,
    intro: [
      "A first month somewhere new is mostly administration, and it usually gets done in the wrong order. A couple of items are time-limited by law, one or two have real money attached, and the rest simply cost less trouble if you do them early.",
      "This is that list. The legal detail is England-only and it assumes you are renting privately, which covers most people arriving here.",
    ],
    sections: [
      {
        heading: "Week one: the things with deadlines",
        paragraphs: [
          "Check the deposit is protected. In England it must be placed in one of the government-approved schemes within thirty days of the landlord receiving it, and the prescribed information must reach you inside the same window. Ask for the certificate rather than assuming it exists.",
          "Photograph every room, appliance and existing mark, with dates, and email the set to the agent. That record is what decides the deposit argument at the end, and it is worth twenty minutes now.",
          "Read the tenancy for the break clause, the notice period and whether liability is joint and several. Those three answers set your options if anything changes, and they are far easier to find out calmly than urgently.",
        ],
      },
      {
        heading: "Council tax, and the discount that is not automatic",
        paragraphs: [
          "Register with the right authority. West Yorkshire is five councils — Leeds, Bradford, Kirklees, Calderdale and Wakefield — and each runs its own move-in form. Which one you need depends on the address, not on how people describe the area.",
          "Claim the single-person discount if you live alone: 25% off the whole bill, never applied for you, and worth a few hundred pounds a year at any band.",
          "Students are exempt, and an all-student household pays nothing, but the exemption needs a certificate from the university. Ask for it at the start of term rather than when the reminder arrives.",
        ],
        dataBlock: "council-tax",
        callout:
          "The five West Yorkshire authorities charge materially different amounts at the same band. If you are choosing between two addresses on either side of a boundary, that difference belongs in the comparison alongside the rent.",
      },
      {
        heading: "Utilities and the meter reading",
        paragraphs: [
          "Photograph the meters on move-in day and send the readings to whichever supplier the property is with. It is the cheapest protection available against inheriting the last tenant's usage.",
          "You can switch supplier immediately; you are not obliged to stay with whoever the landlord left in place. Water is different — there is no supplier choice, and in most rented properties it is billed separately from council tax.",
          "Order broadband early, because the engineer appointment is the long pole. Check what infrastructure the building has first; several parts of Leeds have full-fibre alternatives that beat the incumbent network on both price and speed.",
        ],
      },
      {
        heading: "The rest of the month",
        paragraphs: [
          "Register with a GP near home. You do not need proof of address or immigration status to register with an NHS practice in England, whatever you may be told at the desk, and it is much better done before you need one.",
          "Register to vote at the new address, which also helps settle your credit file — small, quick and disproportionately useful later.",
          "Work out your actual travel arrangement. Leeds has no tram and no metro, so this is buses and heavy rail, and both reward a season or capped ticket over paying per journey. If your commute is a West Yorkshire rail line, price the season ticket against the flexible option before you assume.",
          "Find your bin day and the recycling rules for your authority, which vary across the five councils more than most people expect.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which council do I pay in West Yorkshire?",
        answer:
          "Whichever authority the address itself sits in — Leeds, Bradford, Kirklees, Calderdale or Wakefield. Their Band D charges differ noticeably, so on an address near a boundary the council tax difference is a real part of the comparison rather than a detail.",
      },
      {
        question: "How long does my landlord have to protect my deposit?",
        answer:
          "Thirty days from receipt, in England, along with giving you the prescribed information about which scheme holds it. If that does not happen you may be entitled to compensation, and the landlord cannot serve a valid section 21 notice until it is put right.",
      },
      {
        question: "Do I need a car in Leeds?",
        answer:
          "Not in the city itself, where buses are frequent and much of the inner ring is walkable. Further out it depends entirely on whether you are on a rail corridor — the West Yorkshire lines are good where they run and sparse where they do not, and the gaps are where a car stops being optional.",
      },
    ],
    related: [
      { href: "/leeds/guides/west-yorkshire-council-tax-explained", label: "Council tax explained" },
      { href: "/leeds/guides/commuting-in-west-yorkshire", label: "Commuting in West Yorkshire" },
      { href: "/leeds/boroughs", label: "Council tax by authority" },
    ],
    sources: [
      "Housing Act 2004, sections 213 to 215, on tenancy deposit protection in England",
      "Local Government Finance Act 1992 and the statutory single-person discount",
      "NHS England primary medical care policy guidance on patient registration",
    ],
  },
];
