import type { CityLifestylePage } from "@/lib/city-content";

/**
 * The lifestyle cuts are chosen for what Greater Manchester actually
 * offers rather than transplanted from the London set. "Closest to open
 * country" is a real question here and meaningless in London; "best for
 * commuting without a car" is a real question here in a way it is not
 * somewhere with a tube network.
 */
export const MANCHESTER_LIFESTYLE_PAGES: CityLifestylePage[] = [
  {
    slug: "nightlife",
    h1: "Best areas in Greater Manchester for nightlife",
    metaTitle: "Best areas in Greater Manchester for nightlife",
    metaDescription:
      "Where to live in Greater Manchester if you go out: areas ranked by nightlife, food and how walkable they are at midnight.",
    intro:
      "Manchester's nightlife is unusually concentrated. Unlike London, where a dozen districts have their own scene, most of what happens after eleven happens inside about a square mile — which makes how quickly you can get home the deciding factor as much as what is on your own doorstep.",
    scoreFn: (s) =>
      (s.nightlife * 0.4 + s.foodScene * 0.25 + s.walkability * 0.2 + s.livelyVsQuiet * 0.15) / 10,
  },
  {
    slug: "food",
    h1: "Best areas in Greater Manchester for food",
    metaTitle: "Best areas in Greater Manchester for food and eating out",
    metaDescription:
      "From the Curry Mile to Ancoats and Ramsbottom — Greater Manchester areas ranked by the quality and range of what you can eat locally.",
    intro:
      "The best eating in Greater Manchester is not all in the middle. Rusholme, Ancoats, Altrincham's market and Ramsbottom each built something distinct, and three of those four are places you would actually live rather than visit.",
    scoreFn: (s) => (s.foodScene * 0.55 + s.cafeDensity * 0.3 + s.walkability * 0.15) / 10,
  },
  {
    slug: "green-space",
    h1: "Greenest areas in Greater Manchester",
    metaTitle: "Greenest areas to live in Greater Manchester",
    metaDescription:
      "Parks, moors and river valleys — the Greater Manchester areas with the best access to open space, ranked.",
    intro:
      "Greater Manchester is ringed by moorland on three sides, which means genuine countryside is closer here than in almost any other English conurbation. The trade is usually journey time: the greenest places are rarely the best connected.",
    scoreFn: (s) => (s.greenSpace * 0.6 + s.safety * 0.2 + s.walkability * 0.2) / 10,
  },
  {
    slug: "families",
    h1: "Best areas in Greater Manchester for families",
    metaTitle: "Best areas in Greater Manchester for families",
    metaDescription:
      "Safe streets, green space and settled communities — Greater Manchester areas ranked for families, with rents and council tax for each.",
    intro:
      "Schools are the usual deciding factor and they are not something this site scores, so treat what follows as a shortlist to check catchments against rather than a ranking of schools. What it does capture is safety, green space and whether a place has a centre worth walking to.",
    scoreFn: (s) => (s.safety * 0.4 + s.greenSpace * 0.3 + s.walkability * 0.2 + s.cafeDensity * 0.1) / 10,
    note:
      "This ranking captures safety, green space and walkability. It does not score schools, which for most families is the deciding factor — treat it as a shortlist to check catchments against rather than a ranking of schools.",
  },
  {
    slug: "young-professionals",
    h1: "Best areas in Greater Manchester for young professionals",
    metaTitle: "Best areas in Greater Manchester for young professionals",
    metaDescription:
      "Where graduates and young professionals actually live in Greater Manchester — ranked by transport, social scene and who else is there.",
    intro:
      "Manchester keeps a far higher share of its graduates than most British cities, and they concentrate in a fairly narrow ring: the centre, Ancoats, Chorlton, Didsbury and the Quays. These are the areas where you will not be the only person in your twenties on the street.",
    scoreFn: (s) =>
      (s.youngProfessionalDensity * 0.35 + s.connectivity * 0.25 + s.cafeDensity * 0.2 + s.nightlife * 0.2) / 10,
  },
  {
    slug: "transport",
    h1: "Best-connected areas in Greater Manchester",
    metaTitle: "Best areas in Greater Manchester for transport links",
    metaDescription:
      "Tram, rail and busway — the Greater Manchester areas with the strongest public transport, ranked by connectivity and journey time.",
    intro:
      "Greater Manchester's network is strongly radial: almost everywhere reaches the city centre far more easily than it reaches anywhere else. These are the areas where you can realistically live without a car.",
    scoreFn: (s) => (s.connectivity * 0.7 + s.walkability * 0.3) / 10,
  },
  {
    slug: "quiet",
    h1: "Quietest areas to live in Greater Manchester",
    metaTitle: "Quietest areas to live in Greater Manchester",
    metaDescription:
      "Calm, low-crime, low-traffic parts of Greater Manchester — ranked for anyone who wants the city nearby but not audible.",
    intro:
      "A quiet area in Greater Manchester usually means one of two things: a Pennine village where the noise stops at the edge of the moor, or a Trafford or Stockport suburb where it was designed out in the 1930s. They cost very different amounts.",
    scoreFn: (s) =>
      ((10 - s.livelyVsQuiet) * 0.35 + s.safety * 0.35 + s.greenSpace * 0.3) / 10,
  },
  {
    slug: "value",
    h1: "Best-value areas in Greater Manchester",
    metaTitle: "Best-value areas to live in Greater Manchester",
    metaDescription:
      "Where the rent buys the most in Greater Manchester — areas ranked on lifestyle and transport against what a one-bed actually costs.",
    intro:
      "Value here means what you get for the rent, not simply the cheapest rent. Wigan and Rochdale are the cheapest places in the conurbation; neither tops this list, because the saving is paid back in journey time.",
    scoreFn: (s) =>
      (s.connectivity * 0.3 + s.foodScene * 0.2 + s.greenSpace * 0.2 + s.safety * 0.15 + s.cafeDensity * 0.15) / 10,
    dampByRent: true,
    note:
      "Value here combines transport, food, green space, safety and café density, then damps the result by rent. It is deliberately not a straight score-per-pound: dividing by rent outright just sorts by cheapest, which would put Wigan and Rochdale at the top and make this page a duplicate of the rent index.",
  },
];
