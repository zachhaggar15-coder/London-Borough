/**
 * Data helpers for the Manchester landing pages.
 *
 * Mirrors the role lib/seo-data.ts plays for London: pure, synchronous
 * functions that pages can call at build time inside generateStaticParams
 * and generateMetadata. It is a separate module rather than a
 * generalisation of the London one because the two differ in the things
 * that drive the copy — travel bands against tube zones, a ten-borough
 * conurbation against a city and its 32 boroughs — and threading a city
 * parameter through every London helper would have meant editing every
 * indexed London page to add an argument none of them need.
 */

import { SITE_URL } from "@/lib/seo-data";
import { CITIES } from "@/lib/cities";
import { GM_BOROUGHS, boroughSlug, type GmBorough } from "@/lib/manchester/boroughs";
import { MANCHESTER_NEIGHBOURHOODS } from "@/lib/manchester/data/neighbourhoods";
import { MANCHESTER_DESTINATIONS } from "@/lib/manchester/data/destinations";
import { commuteEstimate, commuteMinutes } from "@/lib/manchester/commute";
import {
  MANCHESTER_RENT_REVIEW_AS_OF,
  ONS_BOROUGH_RENT_GBP,
  ROOM_DISTRICT_AVERAGE_GBP,
} from "@/lib/manchester/data/rent-market";
import { MANCHESTER_COUNCIL_TAX_AS_OF, BAND_D_BY_BOROUGH } from "@/lib/manchester/data/council-tax";
import { travelBandRank, type TravelBand } from "@/lib/manchester/travel-band";
import { PERSONALITY_SCORERS } from "@/lib/personalities";
import type { ManchesterNeighbourhood } from "@/lib/manchester/types";
import type { LifestyleScores, PersonalityKey } from "@/lib/types";

const CITY = CITIES.manchester;

/**
 * Whether Manchester URLs are advertised in sitemap.xml.
 *
 * Off until the section is complete. Submitting a hundred and fifty
 * half-populated URLs to a site that has twice been through an AdSense
 * "low value content" review is a way to fail that review a third time;
 * the pages are crawlable meanwhile, just not pushed.
 */
export const MANCHESTER_IN_SITEMAP = false;

export function manchesterPath(path: string): string {
  return path === "/" ? CITY.basePath : `${CITY.basePath}${path}`;
}

export function manchesterUrl(path: string): string {
  return `${SITE_URL}${manchesterPath(path)}`;
}

export const MANCHESTER_CONTENT_REVIEW_DATES = {
  rent: MANCHESTER_RENT_REVIEW_AS_OF,
  councilTax: MANCHESTER_COUNCIL_TAX_AS_OF,
} as const;

// ──────────────────────────────────────────────────────────────────
// Neighbourhoods  →  /manchester/neighbourhoods/[slug]
// ──────────────────────────────────────────────────────────────────

export function getAllManchesterSlugs(): string[] {
  return MANCHESTER_NEIGHBOURHOODS.map((n) => n.id);
}

export function getManchesterNeighbourhood(
  slug: string,
): ManchesterNeighbourhood | null {
  return MANCHESTER_NEIGHBOURHOODS.find((n) => n.id === slug) ?? null;
}

/** Areas ordered centre-outwards, then alphabetically inside each band. */
export function neighbourhoodsByBand(): ManchesterNeighbourhood[] {
  return [...MANCHESTER_NEIGHBOURHOODS].sort(
    (a, b) =>
      travelBandRank(a.travelBand) - travelBandRank(b.travelBand) ||
      a.name.localeCompare(b.name),
  );
}

export function neighbourhoodsInBorough(
  borough: GmBorough,
): ManchesterNeighbourhood[] {
  return MANCHESTER_NEIGHBOURHOODS.filter((n) => n.borough === borough).sort(
    (a, b) => a.name.localeCompare(b.name),
  );
}

// ──────────────────────────────────────────────────────────────────
// Rent
// ──────────────────────────────────────────────────────────────────

/** Typical monthly cost of a room in a shared house or flat. */
export function manchesterRoomRentFor(n: ManchesterNeighbourhood): number {
  return ROOM_DISTRICT_AVERAGE_GBP[n.roomDistrict];
}

export function manchesterRentMedians(): {
  oneBed: number;
  twoBed: number;
  count: number;
} {
  const oneBeds = MANCHESTER_NEIGHBOURHOODS.map((n) => n.rent.oneBedMedianGbp).sort(
    (a, b) => a - b,
  );
  const twoBeds = MANCHESTER_NEIGHBOURHOODS.map((n) => n.rent.twoBedMedianGbp).sort(
    (a, b) => a - b,
  );
  return {
    oneBed: median(oneBeds),
    twoBed: median(twoBeds),
    count: MANCHESTER_NEIGHBOURHOODS.length,
  };
}

/** Where a one-bed figure sits among tracked areas, 0–100. Higher = pricier. */
export function oneBedRentPercentile(valueGbp: number): number {
  const values = MANCHESTER_NEIGHBOURHOODS.map((n) => n.rent.oneBedMedianGbp);
  const below = values.filter((v) => v < valueGbp).length;
  return Math.round((below / values.length) * 100);
}

/**
 * English ordinal suffix. Needed because the percentile reads back into
 * prose — "the 82th percentile" is the kind of detail that makes a page
 * look machine-written, which for a site under AdSense review is not a
 * cosmetic problem.
 */
export function ordinal(value: number): string {
  const lastTwo = value % 100;
  if (lastTwo >= 11 && lastTwo <= 13) return `${value}th`;
  switch (value % 10) {
    case 1:
      return `${value}st`;
    case 2:
      return `${value}nd`;
    case 3:
      return `${value}rd`;
    default:
      return `${value}th`;
  }
}

/**
 * How a neighbourhood's rent compares with the published ONS average for
 * its own borough — the honest way to express "is this expensive", since
 * the baseline is a sourced figure rather than our own estimate.
 */
export function rentVsBoroughBaseline(n: ManchesterNeighbourhood): {
  baseline: number;
  difference: number;
  percent: number;
} {
  const baseline = ONS_BOROUGH_RENT_GBP[n.borough].oneBed;
  const difference = n.rent.oneBedMedianGbp - baseline;
  return {
    baseline,
    difference,
    percent: Math.round((difference / baseline) * 100),
  };
}

// ──────────────────────────────────────────────────────────────────
// Similar areas
// ──────────────────────────────────────────────────────────────────

export type SimilarManchesterArea = {
  neighbourhood: ManchesterNeighbourhood;
  score: number;
  reason: string;
};

/**
 * Areas that feel like this one.
 *
 * Weighted towards lifestyle rather than geography on purpose. Greater
 * Manchester's genuinely comparable places are frequently nowhere near
 * each other — Monton and Chorlton are on opposite sides of the city and
 * are the same suggestion; Ordsall and Salford Quays share a postcode and
 * have nothing in common.
 */
export function similarManchesterAreas(
  target: ManchesterNeighbourhood,
  limit = 4,
): SimilarManchesterArea[] {
  return MANCHESTER_NEIGHBOURHOODS.filter((n) => n.id !== target.id)
    .map((n) => {
      const lifestyleDistance = averageAbsoluteDifference(n.lifestyle, target.lifestyle);
      const rentDistance =
        Math.abs(n.rent.oneBedMedianGbp - target.rent.oneBedMedianGbp) / 400;
      const bandDistance =
        Math.abs(travelBandRank(n.travelBand) - travelBandRank(target.travelBand)) / 2;

      const score = Math.max(
        0,
        1 - (lifestyleDistance / 10) * 0.6 - rentDistance * 0.25 - bandDistance * 0.15,
      );

      return { neighbourhood: n, score, reason: similarityReason(target, n) };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

function similarityReason(
  target: ManchesterNeighbourhood,
  other: ManchesterNeighbourhood,
): string {
  const rentGap = other.rent.oneBedMedianGbp - target.rent.oneBedMedianGbp;
  if (Math.abs(rentGap) < 60) {
    return `A similar feel at much the same rent`;
  }
  return rentGap < 0
    ? `A similar feel for about £${Math.abs(rentGap)} a month less`
    : `A similar feel, about £${rentGap} a month dearer`;
}

// ──────────────────────────────────────────────────────────────────
// Personality fit
// ──────────────────────────────────────────────────────────────────

export function topPersonalitiesFor(
  n: ManchesterNeighbourhood,
  limit = 2,
): PersonalityKey[] {
  return (Object.keys(PERSONALITY_SCORERS) as PersonalityKey[])
    .filter((key) => key !== "balanced")
    .map((key) => ({ key, score: PERSONALITY_SCORERS[key](n.lifestyle) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.key);
}

// ──────────────────────────────────────────────────────────────────
// Boroughs  →  /manchester/boroughs/[slug]
// ──────────────────────────────────────────────────────────────────

export type ManchesterBoroughPageData = {
  slug: string;
  name: GmBorough;
  neighbourhoods: ManchesterNeighbourhood[];
  onsOneBed: number;
  onsTwoBed: number;
  cheapest: ManchesterNeighbourhood;
  priciest: ManchesterNeighbourhood;
  bandD: number;
  bandDRank: number;
  transportLines: string[];
};

export function getAllManchesterBoroughSlugs(): string[] {
  return GM_BOROUGHS.map(boroughSlug);
}

export function getManchesterBoroughPageData(
  slug: string,
): ManchesterBoroughPageData | null {
  const name = GM_BOROUGHS.find((b) => boroughSlug(b) === slug);
  if (!name) return null;

  const neighbourhoods = neighbourhoodsInBorough(name);
  if (neighbourhoods.length === 0) return null;

  const byRent = [...neighbourhoods].sort(
    (a, b) => a.rent.oneBedMedianGbp - b.rent.oneBedMedianGbp,
  );
  const rankedBoroughs = [...GM_BOROUGHS].sort(
    (a, b) => BAND_D_BY_BOROUGH[a] - BAND_D_BY_BOROUGH[b],
  );

  return {
    slug,
    name,
    neighbourhoods,
    onsOneBed: ONS_BOROUGH_RENT_GBP[name].oneBed,
    onsTwoBed: ONS_BOROUGH_RENT_GBP[name].twoBed,
    cheapest: byRent[0],
    priciest: byRent[byRent.length - 1],
    bandD: BAND_D_BY_BOROUGH[name],
    bandDRank: rankedBoroughs.indexOf(name) + 1,
    transportLines: [
      ...new Set(neighbourhoods.flatMap((n) => n.mainStations.flatMap((s) => s.lines))),
    ],
  };
}

// ──────────────────────────────────────────────────────────────────
// Commute  →  /manchester/commute/[slug]
// ──────────────────────────────────────────────────────────────────

export type ManchesterCommutePageData = {
  destination: (typeof MANCHESTER_DESTINATIONS)[number];
  ranked: {
    neighbourhood: ManchesterNeighbourhood;
    minutes: number;
    source: string;
  }[];
};

export function getAllManchesterCommuteSlugs(): string[] {
  return MANCHESTER_DESTINATIONS.map((d) => d.id);
}

export function getManchesterCommutePageData(
  slug: string,
): ManchesterCommutePageData | null {
  const destination = MANCHESTER_DESTINATIONS.find((d) => d.id === slug);
  if (!destination) return null;

  const ranked = MANCHESTER_NEIGHBOURHOODS.map((n) => {
    const estimate = commuteEstimate(n, slug);
    return estimate
      ? { neighbourhood: n, minutes: estimate.minutes, source: estimate.source }
      : null;
  })
    .filter((row): row is NonNullable<typeof row> => row !== null)
    .sort(
      (a, b) =>
        a.minutes - b.minutes ||
        a.neighbourhood.rent.oneBedMedianGbp - b.neighbourhood.rent.oneBedMedianGbp,
    );

  return { destination, ranked };
}

/** Every destination this area can reach, fastest first. */
export function commuteTimesFor(
  n: ManchesterNeighbourhood,
): { id: string; label: string; minutes: number }[] {
  return MANCHESTER_DESTINATIONS.map((d) => ({
    id: d.id,
    label: d.label,
    minutes: commuteMinutes(n, d.id) ?? 0,
  }))
    .filter((row) => row.minutes > 0)
    .sort((a, b) => a.minutes - b.minutes);
}

// ──────────────────────────────────────────────────────────────────
// Lifestyle  →  /manchester/lifestyle/[slug]
// ──────────────────────────────────────────────────────────────────

export type ManchesterLifestylePage = {
  slug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  scoreFn: (s: LifestyleScores) => number;
};

/**
 * The lifestyle cuts are chosen for what Greater Manchester actually
 * offers rather than transplanted from the London set. "Closest to open
 * country" is a real question here and meaningless in London; "best for
 * commuting without a car" is a real question here in a way it is not
 * somewhere with a tube network.
 */
export const MANCHESTER_LIFESTYLE_PAGES: ManchesterLifestylePage[] = [
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
  },
];

export function getManchesterLifestylePage(
  slug: string,
): ManchesterLifestylePage | null {
  return MANCHESTER_LIFESTYLE_PAGES.find((p) => p.slug === slug) ?? null;
}

export function rankByLifestyle(
  page: ManchesterLifestylePage,
  limit = 15,
): { neighbourhood: ManchesterNeighbourhood; score: number }[] {
  const ranked = MANCHESTER_NEIGHBOURHOODS.map((n) => ({
    neighbourhood: n,
    score: page.scoreFn(n.lifestyle),
  })).sort((a, b) => b.score - a.score);

  // The value page is the one cut where rent belongs inside the ranking
  // rather than alongside it. The divisor is deliberately a square root:
  // dividing by rent outright just sorts by cheapest, which would put
  // Wigan and Rochdale at the top and make the page a duplicate of the
  // rent index. Damping it means a cheap area still has to offer
  // something to place.
  if (page.slug === "value") {
    return ranked
      .map((row) => ({
        ...row,
        score: row.score / Math.sqrt(row.neighbourhood.rent.oneBedMedianGbp / 900),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  return ranked.slice(0, limit);
}

// ──────────────────────────────────────────────────────────────────
// Compare  →  /manchester/compare/[slug]
// ──────────────────────────────────────────────────────────────────

export function comparisonSlugFor(a: string, b: string): string {
  return [a, b].sort().join("-vs-");
}

/**
 * How many comparison pages each area gets. Deliberately small.
 *
 * The naive rule — every pair that is close in rent, band and distance —
 * produced 491 pages off 57 areas, including "Altrincham vs Burnage",
 * a comparison nobody has ever made. Those pages would each carry the
 * same handful of numbers rearranged, which is the definition of thin
 * content and precisely what got this site's earlier clusters pulled.
 * Capping per area keeps the cluster to roughly a hundred pages that
 * each answer a question somebody is actually asking.
 */
const COMPARISONS_PER_AREA = 3;

/**
 * Comparison pages worth having.
 *
 * A pair qualifies when it is a genuine either/or: near enough to each
 * other that the same job is commutable from both, close enough in rent
 * that price alone does not decide it, and in the same or an adjacent
 * travel band. Each area then keeps only its closest few matches.
 */
export function getManchesterCompareSlugs(): string[] {
  const slugs = new Set<string>();

  for (const a of MANCHESTER_NEIGHBOURHOODS) {
    const candidates = MANCHESTER_NEIGHBOURHOODS.filter((b) => {
      if (b.id === a.id) return false;
      const rentGap = Math.abs(a.rent.oneBedMedianGbp - b.rent.oneBedMedianGbp);
      const bandGap = Math.abs(
        travelBandRank(a.travelBand) - travelBandRank(b.travelBand),
      );
      const kmApart = haversineKm(a.centroid, b.centroid);
      return rentGap <= 150 && bandGap <= 1 && kmApart <= 6;
    })
      .map((b) => ({ b, km: haversineKm(a.centroid, b.centroid) }))
      .sort((x, y) => x.km - y.km)
      .slice(0, COMPARISONS_PER_AREA);

    for (const { b } of candidates) {
      slugs.add(comparisonSlugFor(a.id, b.id));
    }
  }

  return [...slugs].sort();
}

export type ManchesterComparePageData = {
  slug: string;
  a: ManchesterNeighbourhood;
  b: ManchesterNeighbourhood;
  cheaper: ManchesterNeighbourhood;
  betterConnected: ManchesterNeighbourhood;
  greener: ManchesterNeighbourhood;
  livelier: ManchesterNeighbourhood;
};

export function getManchesterComparePageData(
  slug: string,
): ManchesterComparePageData | null {
  const [aId, bId] = slug.split("-vs-");
  const a = getManchesterNeighbourhood(aId);
  const b = getManchesterNeighbourhood(bId);
  if (!a || !b) return null;

  return {
    slug,
    a,
    b,
    cheaper: a.rent.oneBedMedianGbp <= b.rent.oneBedMedianGbp ? a : b,
    betterConnected: a.lifestyle.connectivity >= b.lifestyle.connectivity ? a : b,
    greener: a.lifestyle.greenSpace >= b.lifestyle.greenSpace ? a : b,
    livelier: a.lifestyle.livelyVsQuiet >= b.lifestyle.livelyVsQuiet ? a : b,
  };
}

export function relatedManchesterComparisons(id: string, limit = 4): string[] {
  const available = new Set(getManchesterCompareSlugs());
  return MANCHESTER_NEIGHBOURHOODS.filter((n) => n.id !== id)
    .map((n) => comparisonSlugFor(id, n.id))
    .filter((slug) => available.has(slug))
    .slice(0, limit);
}

// ──────────────────────────────────────────────────────────────────
// Sitemap
// ──────────────────────────────────────────────────────────────────

export type ManchesterRoute = {
  path: string;
  priority: number;
  changefreq: "weekly" | "monthly" | "yearly";
  lastmod: string;
};

export function getManchesterIndexableRoutes(): ManchesterRoute[] {
  if (!MANCHESTER_IN_SITEMAP) return [];

  const { rent, councilTax } = MANCHESTER_CONTENT_REVIEW_DATES;
  const borough = rent >= councilTax ? rent : councilTax;

  return [
    { path: manchesterPath("/"), priority: 0.9, changefreq: "weekly", lastmod: rent },
    { path: manchesterPath("/neighbourhoods"), priority: 0.85, changefreq: "weekly", lastmod: rent },
    { path: manchesterPath("/boroughs"), priority: 0.8, changefreq: "weekly", lastmod: borough },
    { path: manchesterPath("/commute"), priority: 0.8, changefreq: "weekly", lastmod: rent },
    { path: manchesterPath("/compare"), priority: 0.7, changefreq: "weekly", lastmod: rent },
    { path: manchesterPath("/lifestyle"), priority: 0.8, changefreq: "weekly", lastmod: rent },
    { path: manchesterPath("/rent-index"), priority: 0.7, changefreq: "monthly", lastmod: rent },
    { path: manchesterPath("/methodology"), priority: 0.6, changefreq: "monthly", lastmod: borough },
    ...getAllManchesterSlugs().map((slug) => ({
      path: manchesterPath(`/neighbourhoods/${slug}`),
      priority: 0.85,
      changefreq: "monthly" as const,
      lastmod: borough,
    })),
    ...getAllManchesterBoroughSlugs().map((slug) => ({
      path: manchesterPath(`/boroughs/${slug}`),
      priority: 0.75,
      changefreq: "monthly" as const,
      lastmod: borough,
    })),
    ...getAllManchesterCommuteSlugs().map((slug) => ({
      path: manchesterPath(`/commute/${slug}`),
      priority: 0.75,
      changefreq: "monthly" as const,
      lastmod: rent,
    })),
    ...MANCHESTER_LIFESTYLE_PAGES.map((p) => ({
      path: manchesterPath(`/lifestyle/${p.slug}`),
      priority: 0.7,
      changefreq: "monthly" as const,
      lastmod: rent,
    })),
    ...getManchesterCompareSlugs().map((slug) => ({
      path: manchesterPath(`/compare/${slug}`),
      priority: 0.6,
      changefreq: "monthly" as const,
      lastmod: rent,
    })),
  ];
}

// ──────────────────────────────────────────────────────────────────
// Internal helpers
// ──────────────────────────────────────────────────────────────────

function median(sorted: number[]): number {
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? Math.round((sorted[mid - 1] + sorted[mid]) / 2)
    : sorted[mid];
}

function averageAbsoluteDifference(a: LifestyleScores, b: LifestyleScores): number {
  const keys = Object.keys(a) as (keyof LifestyleScores)[];
  const total = keys.reduce((sum, key) => sum + Math.abs(a[key] - b[key]), 0);
  return total / keys.length;
}

function haversineKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}

export type { TravelBand };
