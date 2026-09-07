import type { CityLifestylePage } from "@/lib/city-content";

/**
 * The lifestyle cuts are chosen for what the West of England actually
 * offers rather than transplanted from another city's set. "Best without
 * a car" is a sharper question here than almost anywhere, because the
 * region's hills and its bus-only network make the answer depend on
 * geography rather than on income. "Best for water" is a real category
 * in a region with a harbour, a gorge, a canal and thirty miles of
 * estuary coast.
 */
export const BRISTOL_LIFESTYLE_PAGES: CityLifestylePage[] = [
  {
    slug: "nightlife",
    h1: "Best areas in Bristol for nightlife",
    metaTitle: "Best areas in Bristol for nightlife",
    metaDescription:
      "Where to live in Bristol if you go out: areas ranked by nightlife, food and how walkable they are at midnight.",
    intro:
      "Bristol's nightlife is spread across three or four distinct patches rather than concentrated in one, and none of them is more than twenty minutes' walk from the others. The deciding factor is usually the hill between you and home — this is a city where the walk back is a genuine consideration.",
    scoreFn: (s) =>
      (s.nightlife * 0.4 + s.foodScene * 0.25 + s.walkability * 0.2 + s.livelyVsQuiet * 0.15) / 10,
  },
  {
    slug: "food",
    h1: "Best areas in Bristol for food",
    metaTitle: "Best areas in Bristol for food and eating out",
    metaDescription:
      "From St Mark's Road to North Street and Bath's centre — West of England areas ranked by the quality and range of what you can eat locally.",
    intro:
      "The best eating in this region is emphatically not in the middle. St Mark's Road in Easton, North Street in Southville, Cotham Hill and Gloucester Road each built something distinct, and all four are places you would live rather than visit.",
    scoreFn: (s) => (s.foodScene * 0.55 + s.cafeDensity * 0.3 + s.walkability * 0.15) / 10,
  },
  {
    slug: "green-space",
    h1: "Greenest areas in the West of England",
    metaTitle: "Greenest areas to live in Bristol and the West of England",
    metaDescription:
      "The Downs, the Avon Gorge, Mendip and the Severn coast — West of England areas with the best access to open space, ranked.",
    intro:
      "Few English cities have anything like the Avon Gorge cutting through them, and fewer still have four hundred acres of common a mile from the centre. Beyond the Downs, the region reaches Mendip in one direction and the Severn estuary in the other — the trade is usually journey time.",
    scoreFn: (s) => (s.greenSpace * 0.6 + s.safety * 0.2 + s.walkability * 0.2) / 10,
  },
  {
    slug: "families",
    h1: "Best areas in the West of England for families",
    metaTitle: "Best areas in Bristol and the West of England for families",
    metaDescription:
      "Safe streets, green space and settled communities — West of England areas ranked for families, with rents and council tax for each.",
    intro:
      "Schools are the usual deciding factor and they are not something this site scores, so treat what follows as a shortlist to check catchments against rather than a ranking of schools. What it does capture is safety, green space and whether a place has a centre worth walking to.",
    scoreFn: (s) => (s.safety * 0.4 + s.greenSpace * 0.3 + s.walkability * 0.2 + s.cafeDensity * 0.1) / 10,
    note: "This ranking captures safety, green space and walkability. It does not score schools, which for most families is the deciding factor — treat it as a shortlist to check catchments against rather than a ranking of schools.",
  },
  {
    slug: "young-professionals",
    h1: "Best areas in Bristol for young professionals",
    metaTitle: "Best areas in Bristol for young professionals",
    metaDescription:
      "Where graduates and young professionals actually live in Bristol — ranked by transport, social scene and who else is there.",
    intro:
      "Bristol retains an unusually high share of its graduates, and they concentrate in a narrow band running from the harbour up through Montpelier and out along Gloucester Road, with Southville and Bedminster as the southern counterweight. These are the areas where you will not be the only person in your twenties on the street.",
    scoreFn: (s) =>
      (s.youngProfessionalDensity * 0.35 + s.connectivity * 0.25 + s.cafeDensity * 0.2 + s.nightlife * 0.2) / 10,
  },
  {
    slug: "transport",
    h1: "Best-connected areas in the West of England",
    metaTitle: "Best areas in the West of England for transport links",
    metaDescription:
      "Rail, MetroBus and the Railway Path — West of England areas with the strongest connections, ranked by connectivity and journey time.",
    intro:
      "Connectivity here means one of three things: a station on a line that runs more than hourly, a MetroBus corridor with its own lane, or a flat route into town on the Railway Path. Very few places have more than one of them, which is why this list looks different from the rent index.",
    scoreFn: (s) => (s.connectivity * 0.7 + s.walkability * 0.3) / 10,
  },
  {
    slug: "quiet",
    h1: "Quietest areas to live in the West of England",
    metaTitle: "Quietest areas to live in Bristol and the West of England",
    metaDescription:
      "Calm, low-crime, low-traffic parts of the West of England — ranked for anyone who wants the city nearby but not audible.",
    intro:
      "Quiet in this region usually means one of two things: a north Bristol suburb designed that way in the 1930s, or a separate town that was never part of the city at all. They cost roughly the same and feel nothing alike.",
    scoreFn: (s) =>
      ((10 - s.livelyVsQuiet) * 0.35 + s.safety * 0.35 + s.greenSpace * 0.3) / 10,
  },
  {
    slug: "value",
    h1: "Best-value areas in the West of England",
    metaTitle: "Best-value areas to live in Bristol and the West of England",
    metaDescription:
      "Where the rent buys the most in the West of England — areas ranked on lifestyle and transport against what a one-bed actually costs.",
    intro:
      "Value here means what you get for the rent, not simply the cheapest rent. Weston-super-Mare and the Somerset coalfield are the cheapest places in the region; neither tops this list, because the saving is paid back in journey time.",
    scoreFn: (s) =>
      (s.connectivity * 0.3 + s.foodScene * 0.2 + s.greenSpace * 0.2 + s.safety * 0.15 + s.cafeDensity * 0.15) / 10,
    dampByRent: true,
    note: "Value here combines transport, food, green space, safety and café density, then damps the result by rent. It is deliberately not a straight score-per-pound: dividing by rent outright just sorts by cheapest, which would put Weston-super-Mare at the top and make this page a duplicate of the rent index.",
  },
];
