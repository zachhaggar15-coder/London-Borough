import type { CityLifestylePage } from "@/lib/city-content";

/**
 * The lifestyle cuts chosen for what West Yorkshire actually offers.
 *
 * Two of these would make no sense elsewhere. "Best on a train line" is
 * a real question in a county with more stations than any outside
 * London and almost no other rapid transit; and green space here means
 * moorland reachable on foot from a town centre, which is not what it
 * means in a city with parks.
 */
export const LEEDS_LIFESTYLE_PAGES: CityLifestylePage[] = [
  {
    slug: "nightlife",
    h1: "Best areas in West Yorkshire for nightlife",
    metaTitle: "Best areas in West Yorkshire for nightlife",
    metaDescription:
      "Where to live in Leeds and West Yorkshire if you go out: areas ranked by nightlife, food and how walkable they are at midnight.",
    intro:
      "Leeds concentrates almost all of the region's late nightlife inside about half a square mile, which makes how quickly you can get home the deciding factor as much as what is on your own doorstep. Outside the city the answer changes shape entirely: a good night in Hebden Bridge or Holmfirth is a different proposition, and a better one than its size suggests.",
    scoreFn: (s) =>
      (s.nightlife * 0.4 + s.foodScene * 0.25 + s.walkability * 0.2 + s.livelyVsQuiet * 0.15) / 10,
  },
  {
    slug: "food",
    h1: "Best areas in West Yorkshire for food",
    metaTitle: "Best areas in West Yorkshire for food and eating out",
    metaDescription:
      "From Bradford's curry houses to Chapel Allerton and Hebden Bridge — West Yorkshire areas ranked by the quality and range of what you can eat locally.",
    intro:
      "The single best thing to eat in this region is in Bradford, and it costs a third of what the equivalent costs in Leeds city centre. Beyond that, Chapel Allerton, Harehills and Hebden Bridge each built something distinct, and three of those four are places you would live rather than visit.",
    scoreFn: (s) => (s.foodScene * 0.55 + s.cafeDensity * 0.3 + s.walkability * 0.15) / 10,
  },
  {
    slug: "green-space",
    h1: "Greenest areas in West Yorkshire",
    metaTitle: "Greenest areas to live in Leeds and West Yorkshire",
    metaDescription:
      "Moorland, valleys and Roundhay Park — the West Yorkshire areas with the best access to open space, ranked.",
    intro:
      "Green space here means two different things. In Leeds it means Roundhay, Meanwood and the Aire valley — seven hundred acres of park within the city. Everywhere west of Bradford it means moorland you can walk onto from a town centre, which is rarer and, for the people who want it, not substitutable.",
    scoreFn: (s) => (s.greenSpace * 0.6 + s.safety * 0.2 + s.walkability * 0.2) / 10,
  },
  {
    slug: "families",
    h1: "Best areas in West Yorkshire for families",
    metaTitle: "Best areas in Leeds and West Yorkshire for families",
    metaDescription:
      "Safe streets, green space and settled communities — West Yorkshire areas ranked for families, with rents and council tax for each.",
    intro:
      "Schools are the usual deciding factor and they are not something this site scores, so treat what follows as a shortlist to check catchments against rather than a ranking of schools. What it does capture is safety, green space and whether a place has a centre worth walking to.",
    scoreFn: (s) => (s.safety * 0.4 + s.greenSpace * 0.3 + s.walkability * 0.2 + s.cafeDensity * 0.1) / 10,
    note: "This ranking captures safety, green space and walkability. It does not score schools, which for most families is the deciding factor — treat it as a shortlist to check catchments against rather than a ranking of schools.",
  },
  {
    slug: "young-professionals",
    h1: "Best areas in Leeds for young professionals",
    metaTitle: "Best areas in Leeds for young professionals",
    metaDescription:
      "Where graduates and young professionals actually live in Leeds — ranked by transport, social scene and who else is there.",
    intro:
      "Leeds keeps an unusually high share of the graduates its two large universities produce, and they concentrate in a narrow band: the city centre, Holbeck, Chapel Allerton and the north-western arc through Burley and Headingley. These are the areas where you will not be the only person in your twenties on the street.",
    scoreFn: (s) =>
      (s.youngProfessionalDensity * 0.35 + s.connectivity * 0.25 + s.cafeDensity * 0.2 + s.nightlife * 0.2) / 10,
  },
  {
    slug: "transport",
    h1: "Best-connected areas in West Yorkshire",
    metaTitle: "Best areas in West Yorkshire for transport links",
    metaDescription:
      "Rail above all — the West Yorkshire areas with the strongest connections, ranked by connectivity and journey time.",
    intro:
      "With no tram and no metro, connectivity in West Yorkshire means one thing above all others: a station on a line that runs more than twice an hour. The county has more stations than any outside London, and the difference between living near a good one and near a slow bus route is the single largest transport variable here.",
    scoreFn: (s) => (s.connectivity * 0.7 + s.walkability * 0.3) / 10,
  },
  {
    slug: "quiet",
    h1: "Quietest areas to live in West Yorkshire",
    metaTitle: "Quietest areas to live in Leeds and West Yorkshire",
    metaDescription:
      "Calm, low-crime, low-traffic parts of West Yorkshire — ranked for anyone who wants the city nearby but not audible.",
    intro:
      "Quiet here usually means a Pennine or Wharfedale town where the noise stops at the edge of the moor, or a north Leeds suburb that was designed that way. They cost very different amounts and feel nothing alike.",
    scoreFn: (s) =>
      ((10 - s.livelyVsQuiet) * 0.35 + s.safety * 0.35 + s.greenSpace * 0.3) / 10,
  },
  {
    slug: "value",
    h1: "Best-value areas in West Yorkshire",
    metaTitle: "Best-value areas to live in Leeds and West Yorkshire",
    metaDescription:
      "Where the rent buys the most in West Yorkshire — areas ranked on lifestyle and transport against what a one-bed actually costs.",
    intro:
      "Value here means what you get for the rent, not simply the cheapest rent. Halifax and Keighley are the cheapest places covered here and neither tops this list, because the saving is paid back in journey time.",
    scoreFn: (s) =>
      (s.connectivity * 0.3 + s.foodScene * 0.2 + s.greenSpace * 0.2 + s.safety * 0.15 + s.cafeDensity * 0.15) / 10,
    dampByRent: true,
    note: "Value here combines transport, food, green space, safety and café density, then damps the result by rent. It is deliberately not a straight score-per-pound: dividing by rent outright just sorts by cheapest, which would put Halifax and Keighley at the top and make this page a duplicate of the rent index.",
  },
];
