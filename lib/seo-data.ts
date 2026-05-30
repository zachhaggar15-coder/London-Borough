/**
 * Data helpers used exclusively by SEO landing pages.
 * All functions are pure / synchronous so pages can call them at
 * build time inside generateStaticParams and generateMetadata.
 */

import { NEIGHBOURHOODS } from "@/lib/data/neighbourhoods";
import { DESTINATIONS } from "@/lib/data/destinations";
import { LONDON_BOROUGHS } from "@/lib/commute-details";
import { STATIC_COMMUTE_TIMES } from "@/lib/commute";
import { PERSONALITY_SCORERS } from "@/lib/personalities";
import type { Neighbourhood, LifestyleScores } from "@/lib/types";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://whereinlondon.app";

// ──────────────────────────────────────────────────────────────────
// Shared helpers
// ──────────────────────────────────────────────────────────────────

export function boroughSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function avg(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
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

// ──────────────────────────────────────────────────────────────────
// Borough pages  →  /boroughs/[slug]
// ──────────────────────────────────────────────────────────────────

export type BoroughPageData = {
  slug: string;
  name: string;
  neighbourhoods: Neighbourhood[];
  avgOneBedRent: number;
  minOneBedRent: number;
  maxOneBedRent: number;
  avgTwoBedRent: number;
  transportLines: string[];
  avgLifestyle: LifestyleScores;
  topStrengths: string[];
  topTradeoffs: string[];
  zoneRange: number[];
  nearbyBoroughs: string[];
};

const LIFESTYLE_KEYS: (keyof LifestyleScores)[] = [
  "livelyVsQuiet",
  "greenSpace",
  "nightlife",
  "cafeDensity",
  "gymDensity",
  "walkability",
  "foodScene",
  "youngProfessionalDensity",
  "safety",
  "connectivity",
];

export function getAllBoroughSlugs(): string[] {
  return LONDON_BOROUGHS.map(boroughSlug);
}

export function getBoroughPageData(slug: string): BoroughPageData | null {
  const boroughName = LONDON_BOROUGHS.find((b) => boroughSlug(b) === slug);
  if (!boroughName) return null;

  const neighbourhoods = NEIGHBOURHOODS.filter((n) =>
    n.borough
      .split("/")
      .map((p) => p.trim())
      .includes(boroughName),
  );
  if (neighbourhoods.length === 0) return null;

  const oneBeds = neighbourhoods.map((n) => n.rent.oneBedMedianGbp);
  const twoBeds = neighbourhoods.map((n) => n.rent.twoBedMedianGbp);

  const avgLifestyle = Object.fromEntries(
    LIFESTYLE_KEYS.map((k) => [
      k,
      Math.round(avg(neighbourhoods.map((n) => n.lifestyle[k]))),
    ]),
  ) as LifestyleScores;

  const allStrengths = [
    ...new Set(neighbourhoods.flatMap((n) => n.strengths)),
  ].slice(0, 5);
  const allTradeoffs = [
    ...new Set(neighbourhoods.flatMap((n) => n.tradeoffs)),
  ].slice(0, 4);
  const transportLines = [
    ...new Set(
      neighbourhoods.flatMap((n) =>
        n.mainStations.flatMap((s) => s.lines),
      ),
    ),
  ].slice(0, 8);
  const allZones = [
    ...new Set(neighbourhoods.flatMap((n) => n.transportZones)),
  ].sort((a, b) => a - b);

  // Nearby boroughs: closest by centroid of the borough itself
  const boroughCentroid = {
    lat: avg(neighbourhoods.map((n) => n.centroid.lat)),
    lng: avg(neighbourhoods.map((n) => n.centroid.lng)),
  };
  const nearbyBoroughs = LONDON_BOROUGHS.filter((b) => b !== boroughName)
    .map((b) => {
      const bNeighbourhoods = NEIGHBOURHOODS.filter((n) =>
        n.borough
          .split("/")
          .map((p) => p.trim())
          .includes(b),
      );
      if (bNeighbourhoods.length === 0) return { name: b, dist: Infinity };
      const bCentroid = {
        lat: avg(bNeighbourhoods.map((n) => n.centroid.lat)),
        lng: avg(bNeighbourhoods.map((n) => n.centroid.lng)),
      };
      return { name: b, dist: haversineKm(boroughCentroid, bCentroid) };
    })
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 4)
    .map((b) => boroughSlug(b.name));

  return {
    slug,
    name: boroughName,
    neighbourhoods,
    avgOneBedRent: Math.round(avg(oneBeds) / 25) * 25,
    minOneBedRent: Math.min(...oneBeds),
    maxOneBedRent: Math.max(...oneBeds),
    avgTwoBedRent: Math.round(avg(twoBeds) / 25) * 25,
    transportLines,
    avgLifestyle,
    topStrengths: allStrengths,
    topTradeoffs: allTradeoffs,
    zoneRange: allZones,
    nearbyBoroughs,
  };
}

// ──────────────────────────────────────────────────────────────────
// Commute pages  →  /commute/[slug]
// ──────────────────────────────────────────────────────────────────

export type CommuteNeighbourhood = {
  id: string;
  name: string;
  borough: string;
  minutes: number;
  isEstimate: boolean;
  oneBedRent: number;
  transportLines: string[];
  summary: string;
};

export type CommuteBand = {
  label: string;
  maxMinutes: number;
  neighbourhoods: CommuteNeighbourhood[];
};

export type CommutePageData = {
  destinationId: string;
  destinationLabel: string;
  destinationCentroid: { lat: number; lng: number };
  bands: CommuteBand[];
  topPicks: CommuteNeighbourhood[];
};

export function getAllCommuteSlugs(): string[] {
  return DESTINATIONS.map((d) => d.id);
}

export function getCommutePageData(slug: string): CommutePageData | null {
  const destination = DESTINATIONS.find((d) => d.id === slug);
  if (!destination) return null;

  const TRANSIT_KMH = 25;
  const minPerKm = 60 / TRANSIT_KMH;

  const withTimes: CommuteNeighbourhood[] = NEIGHBOURHOODS.map((n) => {
    const staticTime = STATIC_COMMUTE_TIMES[n.id]?.[slug];
    const isEstimate = staticTime == null;
    const minutes = staticTime
      ?? Math.max(10, Math.round(haversineKm(n.centroid, destination.centroid) * minPerKm));

    return {
      id: n.id,
      name: n.name,
      borough: n.borough,
      minutes,
      isEstimate,
      oneBedRent: n.rent.oneBedMedianGbp,
      transportLines: n.mainStations.flatMap((s) => s.lines).slice(0, 3),
      summary: n.summary,
    };
  }).sort((a, b) => a.minutes - b.minutes);

  const BAND_DEFS: { label: string; maxMinutes: number }[] = [
    { label: "Under 20 minutes", maxMinutes: 20 },
    { label: "20–30 minutes", maxMinutes: 30 },
    { label: "30–45 minutes", maxMinutes: 45 },
    { label: "45–60 minutes", maxMinutes: 60 },
  ];

  let remaining = [...withTimes];
  const bands: CommuteBand[] = BAND_DEFS.map(({ label, maxMinutes }, i) => {
    const prevMax = i === 0 ? 0 : BAND_DEFS[i - 1].maxMinutes;
    const inBand = remaining.filter(
      (n) => n.minutes > prevMax && n.minutes <= maxMinutes,
    );
    remaining = remaining.filter((n) => n.minutes > maxMinutes);
    return { label, maxMinutes, neighbourhoods: inBand };
  }).filter((b) => b.neighbourhoods.length > 0);

  const topPicks = withTimes.slice(0, 6);

  return {
    destinationId: destination.id,
    destinationLabel: destination.label,
    destinationCentroid: destination.centroid,
    bands,
    topPicks,
  };
}

// ──────────────────────────────────────────────────────────────────
// Salary pages  →  /salary/[amount]
// ──────────────────────────────────────────────────────────────────

export const SALARY_LEVELS = [
  25000, 30000, 35000, 40000, 45000, 50000, 60000, 70000, 80000, 100000,
] as const;
export type SalaryLevel = (typeof SALARY_LEVELS)[number];

export function ukTakeHomeMonthly(grossAnnual: number): number {
  const pa = 12570;
  const basicCeiling = 50270;

  let tax = 0;
  if (grossAnnual > pa) {
    tax += (Math.min(grossAnnual, basicCeiling) - pa) * 0.2;
  }
  if (grossAnnual > basicCeiling) {
    tax += (grossAnnual - basicCeiling) * 0.4;
  }

  let ni = 0;
  if (grossAnnual > 12570) {
    ni += (Math.min(grossAnnual, basicCeiling) - 12570) * 0.08;
  }
  if (grossAnnual > basicCeiling) {
    ni += (grossAnnual - basicCeiling) * 0.02;
  }

  return Math.round((grossAnnual - tax - ni) / 12);
}

export type AffordableArea = {
  id: string;
  name: string;
  borough: string;
  oneBedRent: number;
  rentAsPct: number;
  zones: number[];
  lines: string[];
  summary: string;
};

export type SalaryPageData = {
  salary: number;
  takeHomeMonthly: number;
  budget33: number;
  budget35: number;
  comfortable: AffordableArea[];
  stretch: AffordableArea[];
};

export function getSalaryPageData(salary: number): SalaryPageData {
  const takeHome = ukTakeHomeMonthly(salary);
  const budget33 = Math.round(takeHome * 0.33);
  const budget35 = Math.round(takeHome * 0.35);

  const comfortable: AffordableArea[] = [];
  const stretch: AffordableArea[] = [];

  for (const n of NEIGHBOURHOODS) {
    const rent = n.rent.oneBedMedianGbp;
    const item: AffordableArea = {
      id: n.id,
      name: n.name,
      borough: n.borough,
      oneBedRent: rent,
      rentAsPct: Math.round((rent / takeHome) * 100),
      zones: n.transportZones,
      lines: n.mainStations.flatMap((s) => s.lines).slice(0, 3),
      summary: n.summary,
    };
    if (rent <= budget35) comfortable.push(item);
    else if (rent <= Math.round(takeHome * 0.42)) stretch.push(item);
  }

  comfortable.sort((a, b) => a.oneBedRent - b.oneBedRent);
  stretch.sort((a, b) => a.oneBedRent - b.oneBedRent);

  return {
    salary,
    takeHomeMonthly: takeHome,
    budget33,
    budget35,
    comfortable,
    stretch: stretch.slice(0, 12),
  };
}

// ──────────────────────────────────────────────────────────────────
// Lifestyle pages  →  /lifestyle/[slug]
// ──────────────────────────────────────────────────────────────────

export type LifestylePageDef = {
  slug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  scoreFn: (s: LifestyleScores) => number;
};

export const LIFESTYLE_PAGES: LifestylePageDef[] = [
  {
    slug: "runners",
    h1: "Best London neighbourhoods for runners",
    metaTitle: "Best London neighbourhoods for runners (2025 guide)",
    metaDescription:
      "Green space, parks and runnable streets — the best areas in London for runners, ranked by access to open space and walkability.",
    intro:
      "If you run regularly, where you live matters. The best neighbourhoods for runners combine easy access to parks, safe streets, and flat or interesting terrain. These areas score highest for green space, walkability, and safety.",
    scoreFn: (s) =>
      (s.greenSpace * 0.4 + s.walkability * 0.3 + s.gymDensity * 0.2 + s.safety * 0.1) / 10,
  },
  {
    slug: "young-professionals",
    h1: "Best London neighbourhoods for young professionals",
    metaTitle: "Best London neighbourhoods for young professionals (2025)",
    metaDescription:
      "Fast commutes, a professional crowd and a good social scene — the best London areas for young professionals, ranked.",
    intro:
      "Young professionals want proximity to their office, somewhere with other people like them, and enough going on after 6pm. These areas combine strong connectivity, a high professional density, and a solid food and café scene.",
    scoreFn: (s) =>
      (s.youngProfessionalDensity * 0.3 +
        s.connectivity * 0.25 +
        s.cafeDensity * 0.15 +
        s.foodScene * 0.15 +
        s.safety * 0.15) /
      10,
  },
  {
    slug: "nightlife",
    h1: "Best London neighbourhoods for nightlife",
    metaTitle: "Best London neighbourhoods for nightlife (2025 guide)",
    metaDescription:
      "Bars, clubs, live music and late-night food — the best areas in London for nightlife, ranked by scene quality.",
    intro:
      "These are the areas where the nights actually go somewhere. High nightlife scores mean a density of bars, clubs, and late-night restaurants — not just a Wetherspoons and a kebab shop.",
    scoreFn: (s) =>
      (s.nightlife * 0.4 + s.livelyVsQuiet * 0.25 + s.foodScene * 0.2 + s.cafeDensity * 0.15) /
      10,
  },
  {
    slug: "foodies",
    h1: "Best London neighbourhoods for food lovers",
    metaTitle: "Best London neighbourhoods for foodies (2025 guide)",
    metaDescription:
      "Independent restaurants, food markets, and café culture — the best areas in London for food lovers, ranked.",
    intro:
      "London has some of the best food in the world, but it's unevenly distributed. These neighbourhoods score highest for restaurant diversity, market culture, and café density — the areas where eating well is part of everyday life.",
    scoreFn: (s) =>
      (s.foodScene * 0.45 + s.cafeDensity * 0.3 + s.walkability * 0.15 + s.livelyVsQuiet * 0.1) /
      10,
  },
  {
    slug: "fitness",
    h1: "Best London neighbourhoods for fitness",
    metaTitle: "Best London neighbourhoods for fitness (2025 guide)",
    metaDescription:
      "Gyms, parks, green space and healthy infrastructure — the best areas in London for fitness-focused people.",
    intro:
      "Whether it's the daily gym session, the park run, or the weekend bike ride, these areas make staying active easy. They combine high gym density with access to green space and a community that prioritises health.",
    scoreFn: (s) =>
      (s.gymDensity * 0.4 + s.greenSpace * 0.3 + s.walkability * 0.2 + s.safety * 0.1) / 10,
  },
  {
    slug: "social",
    h1: "Best London neighbourhoods for a social life",
    metaTitle: "Best London neighbourhoods for a social life (2025)",
    metaDescription:
      "Cafés, bars, young professionals and things happening — the best London areas for people who value an active social life.",
    intro:
      "A good social life in London isn't just about the bars — it's about density of people, places to eat, things to do during the week, and running into the same faces. These areas deliver all of it.",
    scoreFn: PERSONALITY_SCORERS.social,
  },
  {
    slug: "chill",
    h1: "Best quiet London neighbourhoods",
    metaTitle: "Best quiet London neighbourhoods to live in (2025 guide)",
    metaDescription:
      "Green, safe and genuinely calm — the best quiet areas in London to live, for people who want peace after a long day.",
    intro:
      "Not everyone wants to live in the noise. These neighbourhoods trade the buzz for green space, safety, and a quieter rhythm — without necessarily sacrificing good commute access.",
    scoreFn: PERSONALITY_SCORERS.chill,
  },
  {
    slug: "balanced",
    h1: "Best all-round London neighbourhoods",
    metaTitle: "Best all-round London neighbourhoods (2025 guide)",
    metaDescription:
      "No extreme trade-offs — the most well-rounded places to live in London, scoring well across commute, green space, food, safety and social life.",
    intro:
      "Some people don't have a strong preference — they just want somewhere that does everything reasonably well. These are the most well-rounded neighbourhoods in London: decent on nightlife, good on green space, solid on commute, and not a nightmare on rent.",
    scoreFn: PERSONALITY_SCORERS.balanced,
  },
];

export type ScoredNeighbourhoodEntry = {
  neighbourhood: Neighbourhood;
  score: number;
  rank: number;
};

export function getLifestylePageData(slug: string): {
  page: LifestylePageDef;
  ranked: ScoredNeighbourhoodEntry[];
} | null {
  const page = LIFESTYLE_PAGES.find((p) => p.slug === slug);
  if (!page) return null;

  const ranked = NEIGHBOURHOODS.map((n) => ({
    neighbourhood: n,
    score: Math.round(page.scoreFn(n.lifestyle) * 100),
    rank: 0,
  }))
    .sort((a, b) => b.score - a.score)
    .map((e, i) => ({ ...e, rank: i + 1 }));

  return { page, ranked };
}

// ──────────────────────────────────────────────────────────────────
// Comparison pages  →  /compare/[slug]
// ──────────────────────────────────────────────────────────────────

export type ComparePageData = {
  slug: string;
  a: Neighbourhood;
  b: Neighbourhood;
  rentDiff: number;
  rentWinner: string;
  lifestyleWinner: string;
  connectivityWinner: string;
  safetyWinner: string;
  greenWinner: string;
  nightlifeWinner: string;
  overallRecommendation: string;
};

function lifestyleTotal(s: LifestyleScores): number {
  return Object.values(s).reduce((sum, v) => sum + v, 0);
}

export function getComparePageData(slug: string): ComparePageData | null {
  const vsIndex = slug.lastIndexOf("-vs-");
  if (vsIndex === -1) return null;

  const slugA = slug.slice(0, vsIndex);
  const slugB = slug.slice(vsIndex + 4);

  const a = NEIGHBOURHOODS.find((n) => n.id === slugA);
  const b = NEIGHBOURHOODS.find((n) => n.id === slugB);
  if (!a || !b) return null;

  const rentDiff = b.rent.oneBedMedianGbp - a.rent.oneBedMedianGbp;
  const rentWinner =
    a.rent.oneBedMedianGbp <= b.rent.oneBedMedianGbp ? a.id : b.id;
  const lifestyleWinner =
    lifestyleTotal(a.lifestyle) >= lifestyleTotal(b.lifestyle) ? a.id : b.id;
  const connectivityWinner =
    a.lifestyle.connectivity >= b.lifestyle.connectivity ? a.id : b.id;
  const safetyWinner =
    a.lifestyle.safety >= b.lifestyle.safety ? a.id : b.id;
  const greenWinner =
    a.lifestyle.greenSpace >= b.lifestyle.greenSpace ? a.id : b.id;
  const nightlifeWinner =
    a.lifestyle.nightlife >= b.lifestyle.nightlife ? a.id : b.id;

  // Simple overall recommendation
  const aScore =
    (a.lifestyle.connectivity + a.lifestyle.safety + a.lifestyle.youngProfessionalDensity) / 3;
  const bScore =
    (b.lifestyle.connectivity + b.lifestyle.safety + b.lifestyle.youngProfessionalDensity) / 3;

  let overallRecommendation: string;
  if (a.rent.oneBedMedianGbp <= b.rent.oneBedMedianGbp && aScore >= bScore - 0.5) {
    overallRecommendation = `${a.name} offers better value — similar or better scores at a lower rent.`;
  } else if (b.rent.oneBedMedianGbp <= a.rent.oneBedMedianGbp && bScore >= aScore - 0.5) {
    overallRecommendation = `${b.name} offers better value — similar or better scores at a lower rent.`;
  } else if (aScore > bScore) {
    overallRecommendation = `${a.name} scores higher overall, though it comes at a rent premium over ${b.name}.`;
  } else {
    overallRecommendation = `${b.name} scores higher overall, though ${a.name} may offer better affordability.`;
  }

  return {
    slug,
    a,
    b,
    rentDiff,
    rentWinner,
    lifestyleWinner,
    connectivityWinner,
    safetyWinner,
    greenWinner,
    nightlifeWinner,
    overallRecommendation,
  };
}

export function getCompareStaticParams(): string[] {
  const slugs = new Set<string>();

  // Same-borough pairs
  const byBorough = new Map<string, string[]>();
  for (const n of NEIGHBOURHOODS) {
    const boroughs = n.borough.split("/").map((p) => p.trim());
    for (const b of boroughs) {
      const arr = byBorough.get(b) ?? [];
      arr.push(n.id);
      byBorough.set(b, arr);
    }
  }
  for (const ids of byBorough.values()) {
    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        slugs.add(`${ids[i]}-vs-${ids[j]}`);
      }
    }
  }

  // Similar-rent pairs (within £300/month on 1-bed)
  for (let i = 0; i < NEIGHBOURHOODS.length; i++) {
    for (let j = i + 1; j < NEIGHBOURHOODS.length; j++) {
      const a = NEIGHBOURHOODS[i];
      const b = NEIGHBOURHOODS[j];
      if (Math.abs(a.rent.oneBedMedianGbp - b.rent.oneBedMedianGbp) <= 300) {
        slugs.add(`${a.id}-vs-${b.id}`);
      }
    }
  }

  return [...slugs];
}

// ──────────────────────────────────────────────────────────────────
// Internal link generation helpers
// ──────────────────────────────────────────────────────────────────

export function relatedComparisons(neighbourhoodId: string, limit = 4): string[] {
  return NEIGHBOURHOODS.filter((n) => n.id !== neighbourhoodId)
    .sort((a, b) => {
      const target = NEIGHBOURHOODS.find((n) => n.id === neighbourhoodId)!;
      const rentDiffA = Math.abs(a.rent.oneBedMedianGbp - target.rent.oneBedMedianGbp);
      const rentDiffB = Math.abs(b.rent.oneBedMedianGbp - target.rent.oneBedMedianGbp);
      return rentDiffA - rentDiffB;
    })
    .slice(0, limit)
    .map((n) => `${neighbourhoodId}-vs-${n.id}`);
}
