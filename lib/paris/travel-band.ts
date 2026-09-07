import type { TravelBand } from "@/lib/travel-band";
import type { CityLifestylePage } from "@/lib/city-content";

/**
 * Travel bands for Paris.
 *
 * Tighter than any other section, because Paris is. The whole city
 * inside the périphérique covers about 105 square kilometres — roughly
 * a sixth of Greater London — with 308 métro stations in it. "Outer"
 * here means outside the boundary, which is a five-kilometre radius from
 * Notre-Dame, and would be zone 2 in most British cities.
 */
export const PARIS_TRAVEL_BAND_DESCRIPTIONS: Record<TravelBand, string> = {
  central:
    "The first eleven arrondissements and the quartiers along the river. You walk to most things and take one métro to the rest, and you pay for it in floor area — a central Paris one-bedroom is smaller than a British studio.",
  inner:
    "The outer arrondissements: Montmartre, Belleville, Buttes-Chaumont, Butte-aux-Cailles, Batignolles, Passy. Fifteen to twenty-five minutes to the centre, still inside the boundary, and where most Parisians actually live.",
  outer:
    "Outside the périphérique but on the métro: Montreuil, Saint-Ouen, Pantin, Boulogne, Vincennes. Twenty-five to forty minutes in, materially cheaper, and functionally part of the city — Montreuil is routinely called the 21st arrondissement.",
  fringe:
    "The wider Île-de-France, reached on the RER and Transilien rather than the métro. Cheaper again and a different proposition: you are commuting into Paris rather than living in it.",
};

export const PARIS_TRAVEL_BAND_DISTANCE_KM: Record<TravelBand, string> = {
  central: "0–2 km",
  inner: "2–5 km",
  outer: "5–10 km",
  fringe: "10 km+",
};

export const PARIS_TRAVEL_BAND_RATIONALE =
  "Île-de-France used to price in five concentric zones and abolished them for the Navigo pass in 2015 — a monthly pass now costs the same whether you travel one stop or out to the edge of the region. That is excellent for commuters and useless as a description of centrality, because the fare no longer encodes distance at all. So centrality is described directly here, in terms of the périphérique and the métro network rather than a tariff.";

/**
 * Lifestyle cuts for Paris. Two are shaped by things no British city
 * has: a legally binding rent cap that makes "value" a question about
 * compliance as much as price, and a boundary road that divides the
 * housing market more sharply than any distance does.
 */
export const PARIS_LIFESTYLE_PAGES: CityLifestylePage[] = [
  {
    slug: "nightlife",
    h1: "Best areas in Paris for going out",
    metaTitle: "Best areas in Paris for nightlife and going out",
    metaDescription:
      "Where to live in Paris if you go out: quartiers ranked by nightlife, food and how walkable they are late.",
    intro:
      "Paris nightlife concentrates along a diagonal running from the Canal Saint-Martin through Oberkampf to Bastille, with Pigalle as the northern outlier. The métro stops around 1am on weeknights and runs later at weekends, so being able to walk home from that diagonal is worth more than it looks.",
    scoreFn: (s) =>
      (s.nightlife * 0.4 + s.foodScene * 0.25 + s.walkability * 0.2 + s.livelyVsQuiet * 0.15) / 10,
  },
  {
    slug: "food",
    h1: "Best areas in Paris for food",
    metaTitle: "Best areas in Paris for food, markets and eating out",
    metaDescription:
      "From Rue des Martyrs to Belleville and the Marché d'Aligre — Paris quartiers ranked by the quality and range of what you can eat and buy locally.",
    intro:
      "The question in Paris is less where the restaurants are — they are everywhere — than where you can shop properly. A neighbourhood with a real covered market and a good market street is a different daily experience from one without, and that is what this ranking weights.",
    scoreFn: (s) => (s.foodScene * 0.55 + s.cafeDensity * 0.3 + s.walkability * 0.15) / 10,
  },
  {
    slug: "green-space",
    h1: "Greenest areas in Paris",
    metaTitle: "Greenest areas to live in Paris and the inner suburbs",
    metaDescription:
      "The two Bois, the Buttes-Chaumont and the Coulée verte — Paris areas with the best access to open space, ranked.",
    intro:
      "Paris has far less green space per head than London and concentrates what it has at the edges: the Bois de Boulogne to the west and the Bois de Vincennes to the east, both enormous, with the Luxembourg and the Buttes-Chaumont as the serious inner-city exceptions. Living near one of them changes the city considerably.",
    scoreFn: (s) => (s.greenSpace * 0.6 + s.safety * 0.2 + s.walkability * 0.2) / 10,
  },
  {
    slug: "families",
    h1: "Best areas in Paris for families",
    metaTitle: "Best areas in Paris and the inner suburbs for families",
    metaDescription:
      "Space, green and safety — Paris areas ranked for families arriving from abroad, with rents and what schooling actually costs.",
    intro:
      "The hard constraint for a family in Paris is floor area, not neighbourhood: a three-bedroom flat inside the boundary is expensive and rare, which is why so many families with children end up in Vincennes, Boulogne or Montreuil. Schooling is the other, and it is covered properly in the guides.",
    scoreFn: (s) => (s.safety * 0.4 + s.greenSpace * 0.3 + s.walkability * 0.2 + s.cafeDensity * 0.1) / 10,
    note: "This ranking captures safety, green space and walkability. It does not score schools, and in Paris the choice between the French state system — free, rigorous and entirely in French — and international schooling at up to €30,000 a year is a bigger financial decision than the rent.",
  },
  {
    slug: "young-professionals",
    h1: "Best areas in Paris for young professionals",
    metaTitle: "Best areas in Paris for young professionals and new arrivals",
    metaDescription:
      "Where new arrivals and young professionals actually live in Paris — ranked by transport, social scene and who else is there.",
    intro:
      "The 11th and the canal are the default answer and have been for fifteen years. Belleville and the 20th are the value version of the same thing, and Montreuil across the boundary is where that crowd goes when the 11th prices them out.",
    scoreFn: (s) =>
      (s.youngProfessionalDensity * 0.35 + s.connectivity * 0.25 + s.cafeDensity * 0.2 + s.nightlife * 0.2) / 10,
  },
  {
    slug: "transport",
    h1: "Best-connected areas in Paris",
    metaTitle: "Best-connected areas in Paris and the inner suburbs",
    metaDescription:
      "Métro, RER and the new Grand Paris Express lines — Paris areas with the strongest connections, ranked.",
    intro:
      "Almost everywhere in Paris is well connected, so this ranking is really about the difference between good and exceptional — an RER interchange, several métro lines, or one of the new Grand Paris Express stations. Being on a single slow line like the 7bis or the 13 is the thing to avoid.",
    scoreFn: (s) => (s.connectivity * 0.7 + s.walkability * 0.3) / 10,
  },
  {
    slug: "quiet",
    h1: "Quietest areas in Paris",
    metaTitle: "Quietest areas to live in Paris and the inner suburbs",
    metaDescription:
      "Calm, low-traffic parts of Paris — ranked for anyone who wants the city on the doorstep but not through the window.",
    intro:
      "Paris is loud in a specific way: it is not nightlife so much as scooters, delivery vans and the fact that windows open onto narrow streets with hard surfaces on both sides. A courtyard-facing flat in a noisy quartier can be quieter than a street-facing one in a calm arrondissement, which no ranking can capture.",
    scoreFn: (s) =>
      ((10 - s.livelyVsQuiet) * 0.35 + s.safety * 0.35 + s.greenSpace * 0.3) / 10,
  },
  {
    slug: "value",
    h1: "Best-value areas in Paris",
    metaTitle: "Best-value areas to live in Paris and the inner suburbs",
    metaDescription:
      "Where the rent buys the most in Paris — quartiers ranked on lifestyle and transport against what a one-bed actually costs.",
    intro:
      "Value in Paris turns on the périphérique. The boundary is a road, the métro crosses it, and rents drop noticeably on the far side — which is why Montreuil, Pantin and Saint-Ouen dominate any honest value ranking, and why so much of the interesting new opening happens there.",
    scoreFn: (s) =>
      (s.connectivity * 0.3 + s.foodScene * 0.2 + s.greenSpace * 0.2 + s.safety * 0.15 + s.cafeDensity * 0.15) / 10,
    dampByRent: true,
    note: "Value here combines transport, food, green space, safety and café density, then damps the result by rent. One Paris-specific caveat: rents are legally capped by the encadrement des loyers, so a listing well above the ceiling for its zone and size is not a premium — it is unlawful, and the excess is recoverable. Check the ceiling before concluding an area is simply expensive.",
  },
];
