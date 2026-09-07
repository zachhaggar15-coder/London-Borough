import type { TravelBand } from "@/lib/travel-band";
import type { CityLifestylePage } from "@/lib/city-content";

/**
 * Travel bands for Geneva.
 *
 * The unusual thing here is that the "outer" band crosses an
 * international frontier. Annemasse is fifteen minutes from Eaux-Vives
 * on the Léman Express — closer in journey time than Versoix, which is
 * in the same canton — so on any honest measure of centrality it is an
 * outer suburb. It is also another country, and the band descriptions
 * say so rather than quietly flattening the difference.
 */
export const GENEVA_TRAVEL_BAND_DESCRIPTIONS: Record<TravelBand, string> = {
  central:
    "The Ville de Genève inside the old fortifications: Cité, Pâquis, Eaux-Vives, Plainpalais. You walk or take one tram to everything, and you pay for it in rent per square metre rather than in fares.",
  inner:
    "The rest of the city and the communes that run straight into it — Jonction, Servette, Champel, Carouge, Lancy, Chêne-Bougeries. Ten to twenty minutes in by tram, and still comfortably inside Swiss residency.",
  outer:
    "Five to fifteen kilometres out. On the Swiss side that is Vernier, Meyrin and Versoix; on the French side it is Annemasse, Saint-Julien and Ferney-Voltaire, which are closer in journey time than several Swiss communes and roughly half the rent. The border is not a distance, it is a jurisdiction.",
  fringe:
    "Thonon-les-Bains along the French lakeshore and Nyon up the Swiss one — separate towns in separate cantons or departments, forty minutes or more each way, chosen for price, for a lower tax bill or for the lake.",
};

export const GENEVA_TRAVEL_BAND_DISTANCE_KM: Record<TravelBand, string> = {
  central: "0–1.5 km",
  inner: "1.5–5 km",
  outer: "5–15 km",
  fringe: "15 km+",
};

export const GENEVA_TRAVEL_BAND_RATIONALE =
  "Geneva has a zonal fare system — the Unireso zones — but it describes tariff areas rather than centrality, and the one thing it genuinely encodes is the border: a Swiss ticket stops at it, and the cross-border Léman Express and TPG routes price separately. A zone number would tell a new arrival nothing about how far out they are and everything about which ticket to buy, so centrality is described directly instead.";

/**
 * Lifestyle cuts for Geneva, chosen for what the place actually offers
 * and who is actually reading. Two of these exist nowhere else on the
 * site: living on the French side is a live question for almost every
 * arrival here, and Geneva's international-organisation quarter creates
 * a distinct kind of neighbourhood with distinct needs.
 */
export const GENEVA_LIFESTYLE_PAGES: CityLifestylePage[] = [
  {
    slug: "nightlife",
    h1: "Best areas in Geneva for going out",
    metaTitle: "Best areas in Geneva for nightlife and going out",
    metaDescription:
      "Where to live in Geneva if you go out: areas ranked by nightlife, food and how walkable they are late.",
    intro:
      "Geneva's reputation for closing early is largely deserved, and the exceptions are concentrated in three places: Pâquis, Carouge and the Jonction. If going out matters to you, being able to walk home from one of those is worth more here than in a city with a night bus network.",
    scoreFn: (s) =>
      (s.nightlife * 0.4 + s.foodScene * 0.25 + s.walkability * 0.2 + s.livelyVsQuiet * 0.15) / 10,
  },
  {
    slug: "food",
    h1: "Best areas in Geneva for food",
    metaTitle: "Best areas in Geneva for food and eating out",
    metaDescription:
      "From Pâquis to Carouge and across the border — Geneva areas ranked by the quality, range and price of what you can eat locally.",
    intro:
      "Two things shape eating in Geneva: it is extremely expensive, and Pâquis is the exception. The immigrant quarter behind the station will feed you properly for a third of what the lakefront charges, and Carouge has the canton's best concentration of places worth booking. The French communes are cheaper again.",
    scoreFn: (s) => (s.foodScene * 0.55 + s.cafeDensity * 0.3 + s.walkability * 0.15) / 10,
  },
  {
    slug: "green-space",
    h1: "Greenest areas around Geneva",
    metaTitle: "Greenest areas to live in Geneva and the Lake Geneva basin",
    metaDescription:
      "The lake, the Salève, the Jura and the Alps — Geneva areas with the best access to open space, ranked.",
    intro:
      "Geneva's real green space is not in the city, it is the ring around it: the Salève rising straight out of the French side, the Jura behind Ferney, the lake itself and the Alps an hour beyond. What varies by neighbourhood is how quickly you can reach them without a car.",
    scoreFn: (s) => (s.greenSpace * 0.6 + s.safety * 0.2 + s.walkability * 0.2) / 10,
  },
  {
    slug: "families",
    h1: "Best areas around Geneva for families",
    metaTitle: "Best areas around Geneva for families and schools",
    metaDescription:
      "Safe streets, green space and school access — Geneva and cross-border areas ranked for families arriving from abroad.",
    intro:
      "Schools decide this more than anything else here, and the choice is unusually consequential: the Swiss state system is free, excellent and taught in French, while the international schools are among the most expensive in the world. Where you live constrains which is realistic, and the guides cover the decision properly.",
    scoreFn: (s) => (s.safety * 0.4 + s.greenSpace * 0.3 + s.walkability * 0.2 + s.cafeDensity * 0.1) / 10,
    note: "This ranking captures safety, green space and walkability. It does not score schools, which in Geneva is the deciding factor for most arriving families and a far larger financial question than rent — an international school place can cost more per year than a flat.",
  },
  {
    slug: "young-professionals",
    h1: "Best areas in Geneva for young professionals",
    metaTitle: "Best areas in Geneva for young professionals and new arrivals",
    metaDescription:
      "Where new arrivals and young professionals actually live in Geneva — ranked by transport, social scene and who else is there.",
    intro:
      "Geneva has an unusually transient professional population — the international organisations, the banks and CERN all cycle people through on two- and three-year contracts — which concentrates arrivals in a narrow band around Pâquis, Plainpalais, Eaux-Vives and Carouge. Those are the places where being new is normal.",
    scoreFn: (s) =>
      (s.youngProfessionalDensity * 0.35 + s.connectivity * 0.25 + s.cafeDensity * 0.2 + s.nightlife * 0.2) / 10,
  },
  {
    slug: "transport",
    h1: "Best-connected areas around Geneva",
    metaTitle: "Best-connected areas in Geneva and the cross-border basin",
    metaDescription:
      "Tram, Léman Express and cross-border buses — Geneva areas with the strongest connections, ranked.",
    intro:
      "The Léman Express changed this question completely when it opened in 2019. A cross-border suburban railway with fifteen-minute headways means several French towns are now better connected to central Geneva than Swiss communes five kilometres closer, which is why this ranking looks nothing like a map of the canton.",
    scoreFn: (s) => (s.connectivity * 0.7 + s.walkability * 0.3) / 10,
  },
  {
    slug: "quiet",
    h1: "Quietest areas around Geneva",
    metaTitle: "Quietest areas to live in Geneva and the surrounding communes",
    metaDescription:
      "Calm, safe, low-traffic parts of the Geneva basin — ranked for anyone who wants the city nearby but not audible.",
    intro:
      "Quiet is Geneva's default rather than its exception — the city is famously still by ten on a weeknight. What varies is aircraft noise, which is severe across the whole right bank and around Meyrin and Le Grand-Saconnex, and traffic on the arterial routes.",
    scoreFn: (s) =>
      ((10 - s.livelyVsQuiet) * 0.35 + s.safety * 0.35 + s.greenSpace * 0.3) / 10,
  },
  {
    slug: "value",
    h1: "Best-value areas around Geneva",
    metaTitle: "Best-value areas to live in and around Geneva",
    metaDescription:
      "Where the rent buys the most around Geneva — areas ranked on lifestyle and transport against what a one-bed actually costs, on both sides of the border.",
    intro:
      "Value in Geneva has one dominant term and it is the border. A flat in Annemasse costs roughly half what the same flat costs in Eaux-Vives for a fifteen-minute commute, and no amount of neighbourhood preference outweighs that arithmetic — which is exactly why a hundred thousand people cross the frontier to work every day.",
    scoreFn: (s) =>
      (s.connectivity * 0.3 + s.foodScene * 0.2 + s.greenSpace * 0.2 + s.safety * 0.15 + s.cafeDensity * 0.15) / 10,
    dampByRent: true,
    note: "Value here combines transport, food, green space, safety and café density, then damps the result by rent. Because the French communes are roughly half the price of the Swiss ones, they dominate the top of this list — which is the honest answer, but it is an answer with a permit, a tax return and a border queue attached. Read the cross-border guide before treating it as a recommendation.",
  },
];
