import type { CityLifestylePage } from "@/lib/city-content";

/**
 * The lifestyle cuts chosen for what Edinburgh actually offers.
 *
 * One of these exists only here. Edinburgh's August is not a background
 * fact about the city — for a month it roughly doubles in population,
 * and where you live decides whether that is the best month of your year
 * or the worst. The quiet ranking carries that weight deliberately.
 */
export const EDINBURGH_LIFESTYLE_PAGES: CityLifestylePage[] = [
  {
    slug: "nightlife",
    h1: "Best areas in Edinburgh for nightlife",
    metaTitle: "Best areas in Edinburgh for nightlife",
    metaDescription:
      "Where to live in Edinburgh if you go out: areas ranked by nightlife, food and how walkable they are at midnight.",
    intro:
      "Edinburgh's nightlife divides cleanly in two. The Old Town and the Cowgate run late and loud and are dominated by students and visitors; Leith and Leith Walk are where people who live here go. Both are walkable from most of the inner city, which is the real advantage of a place this compact.",
    scoreFn: (s) =>
      (s.nightlife * 0.4 + s.foodScene * 0.25 + s.walkability * 0.2 + s.livelyVsQuiet * 0.15) / 10,
  },
  {
    slug: "food",
    h1: "Best areas in Edinburgh for food",
    metaTitle: "Best areas in Edinburgh for food and eating out",
    metaDescription:
      "From the Shore to Stockbridge and Bruntsfield — Edinburgh and Lothian areas ranked by the quality and range of what you can eat locally.",
    intro:
      "Leith holds more Michelin stars than the rest of Scotland combined, and the Shore is the reason. Beyond it, Stockbridge, Bruntsfield and Leith Walk each built something distinct, and all four are places you would live rather than visit.",
    scoreFn: (s) => (s.foodScene * 0.55 + s.cafeDensity * 0.3 + s.walkability * 0.15) / 10,
  },
  {
    slug: "green-space",
    h1: "Greenest areas in Edinburgh and the Lothians",
    metaTitle: "Greenest areas to live in Edinburgh and the Lothians",
    metaDescription:
      "Arthur's Seat, the Pentlands and the Forth coast — Edinburgh and Lothian areas with the best access to open space, ranked.",
    intro:
      "Edinburgh has an extinct volcano in the middle of it and a hill range on its southern edge, which is a combination no other British city can offer. Add the Forth shore to the north and the East Lothian coast beyond, and the question here is not whether you can reach open space but which kind you want.",
    scoreFn: (s) => (s.greenSpace * 0.6 + s.safety * 0.2 + s.walkability * 0.2) / 10,
  },
  {
    slug: "families",
    h1: "Best areas in Edinburgh and the Lothians for families",
    metaTitle: "Best areas in Edinburgh and the Lothians for families",
    metaDescription:
      "Safe streets, green space and settled communities — Edinburgh and Lothian areas ranked for families, with rents and council tax for each.",
    intro:
      "Schools are the usual deciding factor and they are not something this site scores — and in Edinburgh that gap matters more than usual, because catchment areas here move house prices and rents visibly. Treat what follows as a shortlist to check catchments against rather than a ranking of schools.",
    scoreFn: (s) => (s.safety * 0.4 + s.greenSpace * 0.3 + s.walkability * 0.2 + s.cafeDensity * 0.1) / 10,
    note: "This ranking captures safety, green space and walkability. It does not score schools, which in Edinburgh visibly moves rents through catchment areas — treat it as a shortlist to check catchments against rather than a ranking of schools.",
  },
  {
    slug: "young-professionals",
    h1: "Best areas in Edinburgh for young professionals",
    metaTitle: "Best areas in Edinburgh for young professionals",
    metaDescription:
      "Where graduates and young professionals actually live in Edinburgh — ranked by transport, social scene and who else is there.",
    intro:
      "Edinburgh keeps a high share of its graduates, and the financial, government and technology employers that hire them are concentrated in the New Town, the West End and Edinburgh Park. The living happens along a narrower band still: Leith, Leith Walk, Tollcross and the southern tenement ring.",
    scoreFn: (s) =>
      (s.youngProfessionalDensity * 0.35 + s.connectivity * 0.25 + s.cafeDensity * 0.2 + s.nightlife * 0.2) / 10,
  },
  {
    slug: "transport",
    h1: "Best-connected areas in Edinburgh and the Lothians",
    metaTitle: "Best areas in Edinburgh and the Lothians for transport links",
    metaDescription:
      "Tram, rail and one of Britain's best bus networks — Edinburgh and Lothian areas with the strongest connections, ranked.",
    intro:
      "Edinburgh is better served than its size suggests. Lothian Buses is municipally owned, runs at high frequency across the whole city on a flat fare, and the tram now links the airport, the West End, the New Town and Leith on its own alignment. Beyond the bypass, the question becomes which rail line you are on.",
    scoreFn: (s) => (s.connectivity * 0.7 + s.walkability * 0.3) / 10,
  },
  {
    slug: "quiet",
    h1: "Quietest areas to live in Edinburgh and the Lothians",
    metaTitle: "Quietest areas to live in Edinburgh and the Lothians",
    metaDescription:
      "Calm, low-crime, low-traffic parts of Edinburgh and the Lothians — including which areas escape the Festival in August.",
    intro:
      "Quiet in Edinburgh has a seasonal dimension nowhere else on this site shares. For most of the year the Old Town is loud and the outer suburbs are not; for the month of August the city roughly doubles in population and the difference between living inside the Festival and outside it becomes the largest quality-of-life variable in the city.",
    scoreFn: (s) =>
      ((10 - s.livelyVsQuiet) * 0.35 + s.safety * 0.35 + s.greenSpace * 0.3) / 10,
    note: "This ranking is annual rather than seasonal. For one month a year the Old Town, Tollcross and Newington are transformed by the Festival, and anywhere beyond the bypass is not — a difference no yearly score can express.",
  },
  {
    slug: "value",
    h1: "Best-value areas in Edinburgh and the Lothians",
    metaTitle: "Best-value areas to live in Edinburgh and the Lothians",
    metaDescription:
      "Where the rent buys the most in Edinburgh and the Lothians — areas ranked on lifestyle and transport against what a one-bed actually costs.",
    intro:
      "Value here means what you get for the rent, not simply the cheapest rent. Bathgate and Broxburn are the cheapest places covered here and neither tops this list, because the saving is paid back in journey time.",
    scoreFn: (s) =>
      (s.connectivity * 0.3 + s.foodScene * 0.2 + s.greenSpace * 0.2 + s.safety * 0.15 + s.cafeDensity * 0.15) / 10,
    dampByRent: true,
    note: "Value here combines transport, food, green space, safety and café density, then damps the result by rent. It is deliberately not a straight score-per-pound: dividing by rent outright just sorts by cheapest, which would put Bathgate and Broxburn at the top and make this page a duplicate of the rent index.",
  },
];
