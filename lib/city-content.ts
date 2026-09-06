/**
 * One city's content layer, built from its data.
 *
 * Manchester's version of this was `lib/manchester/seo-data.ts`: forty
 * exported helpers, every one of them named after Manchester and closed
 * over Manchester's data. Copying that per city would have meant four
 * near-identical modules drifting apart, so it is a factory now. Each
 * city supplies a CityInput; every page reads the CityContent that comes
 * back and never learns which city it is rendering.
 *
 * What genuinely varies between cities lives in CityInput and nowhere
 * else — the areas, the councils and what to call them, the rent and
 * council tax datasets, the commute matrix, and for Scotland the income
 * tax and band multipliers. Everything derived from those is shared.
 */

import { SITE_URL } from "@/lib/seo-data";
import type { City } from "@/lib/cities";
import { PERSONALITY_SCORERS } from "@/lib/personalities";
import { centralityRank } from "@/lib/centrality";
import type { TravelBand } from "@/lib/travel-band";
import type {
  Destination,
  LifestyleScores,
  Neighbourhood,
  PersonalityKey,
  RentBasis,
} from "@/lib/types";

// ──────────────────────────────────────────────────────────────────
// Input shapes
// ──────────────────────────────────────────────────────────────────

export type BedroomBaseline = {
  oneBed: number;
  twoBed: number;
  threeBed: number;
  allProperties: number;
};

export type CityGuideSection = {
  heading: string;
  paragraphs: string[];
  list?: { title?: string; items: string[] };
  callout?: string;
  dataBlock?: "council-tax" | "rent-spread" | "salary-ladder";
};

export type CityGuide = {
  slug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  category: "Money" | "Renting" | "Transport" | "Moving";
  published: string;
  updated: string;
  readMinutes: number;
  intro: string[];
  sections: CityGuideSection[];
  faqs: { question: string; answer: string }[];
  related: { href: string; label: string }[];
  sources?: string[];
};

export type CityLifestylePage = {
  slug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  scoreFn: (s: LifestyleScores) => number;
  /** Set on the value page so rent damps the ranking. */
  dampByRent?: boolean;
  /** Extra caveat printed in the page's data note. */
  note?: string;
};

/**
 * Council tax band ratios against Band D.
 *
 * England and Wales use the statutory ninths from the Local Government
 * Finance Act 1992. Scotland uplifted bands E to H in 2017, so its ratios
 * are materially higher at the top and a Scottish Band H bill is 22.5%
 * above what the English ratio would give. Getting this wrong would
 * understate every large Scottish property on the site.
 */
export const ENGLAND_BAND_RATIOS = {
  A: 6 / 9,
  B: 7 / 9,
  C: 8 / 9,
  D: 1,
  E: 11 / 9,
  F: 13 / 9,
  G: 15 / 9,
  H: 18 / 9,
} as const;

export const SCOTLAND_BAND_RATIOS = {
  A: 240 / 360,
  B: 280 / 360,
  C: 320 / 360,
  D: 1,
  E: 473 / 360,
  F: 585 / 360,
  G: 705 / 360,
  H: 882 / 360,
} as const;

export type CouncilTaxBand = keyof typeof ENGLAND_BAND_RATIOS;

export const COUNCIL_TAX_BANDS = Object.keys(
  ENGLAND_BAND_RATIOS,
) as CouncilTaxBand[];

/** 1991 values in England and Wales; 1991 values in Scotland differ. */
export const ENGLAND_BAND_VALUES: Record<CouncilTaxBand, string> = {
  A: "Up to £40,000",
  B: "£40,001 – £52,000",
  C: "£52,001 – £68,000",
  D: "£68,001 – £88,000",
  E: "£88,001 – £120,000",
  F: "£120,001 – £160,000",
  G: "£160,001 – £320,000",
  H: "Over £320,000",
};

export const SCOTLAND_BAND_VALUES: Record<CouncilTaxBand, string> = {
  A: "Up to £27,000",
  B: "£27,001 – £35,000",
  C: "£35,001 – £45,000",
  D: "£45,001 – £58,000",
  E: "£58,001 – £80,000",
  F: "£80,001 – £106,000",
  G: "£106,001 – £212,000",
  H: "Over £212,000",
};

export type CityInput = {
  city: City;

  /** Areas, each already carrying a travelBand. */
  areas: Neighbourhood[];

  /**
   * The local authorities covered, and what this city calls them.
   * Greater Manchester and West Yorkshire have boroughs; the West of
   * England has unitary authorities; the Lothians have council areas.
   * Using the wrong noun is the fastest way to sound like an outsider.
   */
  councils: readonly string[];
  councilNoun: { singular: string; plural: string };
  /** e.g. "Greater Manchester", "the West of England", "the Lothians". */
  regionName: string;

  destinations: Destination[];

  /**
   * What each travel band means here.
   *
   * The four band names are shared, but the distances and the character
   * behind them are not: Greater Manchester's fringe is Wigan and
   * Ramsbottom, the West of England's is Bath and Weston-super-Mare, and
   * those are not the same kind of place. The labels are per city so a
   * band description never reads as boilerplate.
   */
  travelBands: {
    descriptions: Record<TravelBand, string>;
    distances: Record<TravelBand, string>;
    /** One line on why this city does not use a zone system. */
    rationale: string;
  };

  /** Reviewed door-to-door minutes: area id → destination id → minutes. */
  commuteTimes: Record<string, Record<string, number>>;
  /** Assumed average public-transport speed for the distance fallback. */
  transitKmh: number;

  rent: {
    reviewedAsOf: string;
    referenceMonth: string;
    /**
     * Published averages keyed by whatever unit the statistics actually
     * use. England publishes by local authority; Scotland publishes by
     * Broad Rental Market Area, so several councils share one row.
     */
    baselines: Record<string, BedroomBaseline>;
    /** Which baseline key each council maps to. */
    baselineForCouncil: Record<string, string>;
    /** Room-in-a-share averages by postcode district group. */
    roomAverages: Record<string, number>;
    roomLabels: Record<string, string>;
    /** area id → room district group key. */
    roomDistrictForArea: Record<string, string>;
    sources: readonly string[];
    /** Any caveat specific to how this city's rents are published. */
    note?: string;
  };

  councilTax: {
    year: string;
    asOf: string;
    /** Council tax only. Scottish water and sewerage is billed on top. */
    bandD: Record<string, number>;
    ratios: Record<CouncilTaxBand, number>;
    bandValues: Record<CouncilTaxBand, string>;
    sources: readonly string[];
    /** Region-wide precept included in every figure, if there is one. */
    precept?: { label: string; bandD: number; breakdown?: Record<string, number> };
    /** Anything structural a reader has to know, e.g. Scottish water. */
    notes: string[];
  };

  guides: CityGuide[];
  lifestylePages: CityLifestylePage[];
  salaryLevels: readonly number[];

  /**
   * Monthly take-home after income tax and National Insurance.
   * Scotland has six income tax bands and its own thresholds, so this is
   * per-city rather than shared.
   */
  takeHomeMonthly: (grossAnnual: number) => number;
  /** Named on the salary pages so the model is not a black box. */
  taxRegimeLabel: string;

  /** How many comparison pages each area gets. Keeps the cluster small. */
  comparisonsPerArea?: number;
};

// ──────────────────────────────────────────────────────────────────
// Derived content
// ──────────────────────────────────────────────────────────────────

export type SimilarArea = {
  area: Neighbourhood;
  score: number;
  reason: string;
};

export type CouncilPageData = {
  slug: string;
  name: string;
  areas: Neighbourhood[];
  baselineKey: string;
  baseline: BedroomBaseline;
  cheapest: Neighbourhood;
  priciest: Neighbourhood;
  bandD: number;
  bandDRank: number;
  transportLines: string[];
};

export type CommutePageData = {
  destination: Destination;
  ranked: { area: Neighbourhood; minutes: number; reviewed: boolean }[];
};

export type ComparePageData = {
  slug: string;
  a: Neighbourhood;
  b: Neighbourhood;
  cheaper: Neighbourhood;
};

export type SalaryAreaFit = {
  area: Neighbourhood;
  rentGbp: number;
  shareOfTakeHome: number;
};

export type SalaryPageData = {
  salary: number;
  takeHomeMonthly: number;
  budget33: number;
  budget35: number;
  comfortable: SalaryAreaFit[];
  stretch: SalaryAreaFit[];
  roomShare: SalaryAreaFit[];
  roomShareWithinBudget: SalaryAreaFit[];
  cheapestOneBed: SalaryAreaFit;
};

export type IndexableRoute = {
  path: string;
  priority: number;
  changefreq: "weekly" | "monthly" | "yearly";
  lastmod: string;
};

export function createCityContent(input: CityInput) {
  const { city, areas, councils } = input;
  const areasById: Record<string, Neighbourhood> = Object.fromEntries(
    areas.map((a) => [a.id, a]),
  );
  const comparisonsPerArea = input.comparisonsPerArea ?? 3;

  const path = (p: string) => (p === "/" ? city.basePath : `${city.basePath}${p}`);
  const url = (p: string) => `${SITE_URL}${path(p)}`;

  // ── Rent ────────────────────────────────────────────────────────
  const roomRentFor = (a: Neighbourhood): number => {
    const group = input.rent.roomDistrictForArea[a.id];
    const value = group ? input.rent.roomAverages[group] : undefined;
    // Falling back to a share of the one-bed keeps a page rendering if a
    // new area is added without a district; the test suite catches it.
    return value ?? Math.round(a.rent.oneBedMedianGbp * 0.7);
  };

  const baselineForArea = (a: Neighbourhood): BedroomBaseline => {
    const key = input.rent.baselineForCouncil[a.borough];
    return input.rent.baselines[key];
  };

  const rentMedians = () => {
    const one = areas.map((a) => a.rent.oneBedMedianGbp).sort((x, y) => x - y);
    const two = areas.map((a) => a.rent.twoBedMedianGbp).sort((x, y) => x - y);
    return { oneBed: median(one), twoBed: median(two), count: areas.length };
  };

  const oneBedPercentile = (value: number): number => {
    const values = areas.map((a) => a.rent.oneBedMedianGbp);
    return Math.round(
      (values.filter((v) => v < value).length / values.length) * 100,
    );
  };

  const rentVsBaseline = (a: Neighbourhood) => {
    const baseline = baselineForArea(a).oneBed;
    const difference = a.rent.oneBedMedianGbp - baseline;
    return {
      baseline,
      difference,
      percent: Math.round((difference / baseline) * 100),
    };
  };

  const selectedRent = (a: Neighbourhood, basis: RentBasis): number => {
    const room = roomRentFor(a);
    switch (basis) {
      case "houseShareLowerEnd":
        return roundTo25(room * 0.85);
      case "flatShareUpperEnd":
        return roundTo25(room * 1.15);
      case "oneBedFlat":
        return a.rent.oneBedMedianGbp;
      case "twoBedFlat":
        return a.rent.twoBedMedianGbp;
    }
  };

  // ── Councils ────────────────────────────────────────────────────
  const councilsByBandD = [...councils].sort(
    (a, b) => input.councilTax.bandD[a] - input.councilTax.bandD[b],
  );

  const areasInCouncil = (council: string) =>
    areas
      .filter((a) => a.borough === council)
      .sort((a, b) => a.name.localeCompare(b.name));

  const getCouncilPageData = (slug: string): CouncilPageData | null => {
    const name = councils.find((c) => slugify(c) === slug);
    if (!name) return null;
    const within = areasInCouncil(name);
    if (within.length === 0) return null;
    const byRent = [...within].sort(
      (a, b) => a.rent.oneBedMedianGbp - b.rent.oneBedMedianGbp,
    );
    const baselineKey = input.rent.baselineForCouncil[name];
    return {
      slug,
      name,
      areas: within,
      baselineKey,
      baseline: input.rent.baselines[baselineKey],
      cheapest: byRent[0],
      priciest: byRent[byRent.length - 1],
      bandD: input.councilTax.bandD[name],
      bandDRank: councilsByBandD.indexOf(name) + 1,
      transportLines: [
        ...new Set(within.flatMap((a) => a.mainStations.flatMap((s) => s.lines))),
      ],
    };
  };

  const bandCharge = (council: string, band: CouncilTaxBand): number | null => {
    const bandD = input.councilTax.bandD[council];
    if (bandD == null) return null;
    return Math.round(bandD * input.councilTax.ratios[band] * 100) / 100;
  };

  // ── Commute ─────────────────────────────────────────────────────
  const commuteMinutes = (a: Neighbourhood, destinationId: string) => {
    const reviewed = input.commuteTimes[a.id]?.[destinationId];
    if (reviewed != null) return { minutes: reviewed, reviewed: true };
    const destination = input.destinations.find((d) => d.id === destinationId);
    if (!destination) return null;
    const km = haversineKm(a.centroid, destination.centroid);
    return {
      minutes: Math.max(10, Math.round(km * (60 / input.transitKmh))),
      reviewed: false,
    };
  };

  const getCommutePageData = (slug: string): CommutePageData | null => {
    const destination = input.destinations.find((d) => d.id === slug);
    if (!destination) return null;
    const ranked = areas
      .map((a) => {
        const estimate = commuteMinutes(a, slug);
        return estimate
          ? { area: a, minutes: estimate.minutes, reviewed: estimate.reviewed }
          : null;
      })
      .filter((r): r is NonNullable<typeof r> => r !== null)
      .sort(
        (x, y) =>
          x.minutes - y.minutes ||
          x.area.rent.oneBedMedianGbp - y.area.rent.oneBedMedianGbp,
      );
    return { destination, ranked };
  };

  const commuteTimesFor = (a: Neighbourhood) =>
    input.destinations
      .map((d) => ({
        id: d.id,
        label: d.label,
        minutes: commuteMinutes(a, d.id)?.minutes ?? 0,
      }))
      .filter((r) => r.minutes > 0)
      .sort((x, y) => x.minutes - y.minutes);

  // ── Similar areas ───────────────────────────────────────────────
  const similarAreas = (target: Neighbourhood, limit = 4): SimilarArea[] =>
    areas
      .filter((a) => a.id !== target.id)
      .map((a) => {
        const lifestyleDistance = averageAbsDiff(a.lifestyle, target.lifestyle);
        const rentDistance =
          Math.abs(a.rent.oneBedMedianGbp - target.rent.oneBedMedianGbp) / 400;
        const bandDistance =
          Math.abs(centralityRank(a) - centralityRank(target)) / 2;
        const score = Math.max(
          0,
          1 - (lifestyleDistance / 10) * 0.6 - rentDistance * 0.25 - bandDistance * 0.15,
        );
        const gap = a.rent.oneBedMedianGbp - target.rent.oneBedMedianGbp;
        const reason =
          Math.abs(gap) < 60
            ? "A similar feel at much the same rent"
            : gap < 0
              ? `A similar feel for about £${Math.abs(gap)} a month less`
              : `A similar feel, about £${gap} a month dearer`;
        return { area: a, score, reason };
      })
      .sort((x, y) => y.score - x.score)
      .slice(0, limit);

  const topPersonalities = (a: Neighbourhood, limit = 2): PersonalityKey[] =>
    (Object.keys(PERSONALITY_SCORERS) as PersonalityKey[])
      .filter((k) => k !== "balanced")
      .map((k) => ({ k, score: PERSONALITY_SCORERS[k](a.lifestyle) }))
      .sort((x, y) => y.score - x.score)
      .slice(0, limit)
      .map((e) => e.k);

  // ── Lifestyle ───────────────────────────────────────────────────
  const rankByLifestyle = (page: CityLifestylePage, limit = 15) => {
    const ranked = areas
      .map((a) => ({ area: a, score: page.scoreFn(a.lifestyle) }))
      .sort((x, y) => y.score - x.score);

    if (!page.dampByRent) return ranked.slice(0, limit);

    // Square root, not a straight divide: dividing by rent outright just
    // sorts by cheapest and turns the value page into the rent index.
    const pivot = rentMedians().oneBed;
    return ranked
      .map((row) => ({
        ...row,
        score: row.score / Math.sqrt(row.area.rent.oneBedMedianGbp / pivot),
      }))
      .sort((x, y) => y.score - x.score)
      .slice(0, limit);
  };

  // ── Compare ─────────────────────────────────────────────────────
  const compareSlugs = (): string[] => {
    const slugs = new Set<string>();
    for (const a of areas) {
      const candidates = areas
        .filter((b) => {
          if (b.id === a.id) return false;
          const rentGap = Math.abs(
            a.rent.oneBedMedianGbp - b.rent.oneBedMedianGbp,
          );
          const bandGap = Math.abs(centralityRank(a) - centralityRank(b));
          return rentGap <= 150 && bandGap <= 1 && haversineKm(a.centroid, b.centroid) <= 6;
        })
        .map((b) => ({ b, km: haversineKm(a.centroid, b.centroid) }))
        .sort((x, y) => x.km - y.km)
        .slice(0, comparisonsPerArea);
      for (const { b } of candidates) slugs.add(compareSlug(a.id, b.id));
    }
    return [...slugs].sort();
  };

  const getComparePageData = (slug: string): ComparePageData | null => {
    const [aId, bId] = slug.split("-vs-");
    const a = areasById[aId];
    const b = areasById[bId];
    if (!a || !b) return null;
    return {
      slug,
      a,
      b,
      cheaper: a.rent.oneBedMedianGbp <= b.rent.oneBedMedianGbp ? a : b,
    };
  };

  const relatedComparisons = (id: string, limit = 4): string[] => {
    const available = new Set(compareSlugs());
    return areas
      .filter((a) => a.id !== id)
      .map((a) => compareSlug(id, a.id))
      .filter((s) => available.has(s))
      .slice(0, limit);
  };

  // ── Salary ──────────────────────────────────────────────────────
  const getSalaryPageData = (salary: number): SalaryPageData => {
    const takeHomeMonthly = input.takeHomeMonthly(salary);
    const fit = (a: Neighbourhood, rentGbp: number): SalaryAreaFit => ({
      area: a,
      rentGbp,
      shareOfTakeHome: rentGbp / takeHomeMonthly,
    });
    const oneBeds = areas
      .map((a) => fit(a, a.rent.oneBedMedianGbp))
      .sort((x, y) => x.rentGbp - y.rentGbp);
    const rooms = areas
      .map((a) => fit(a, roomRentFor(a)))
      .sort((x, y) => x.rentGbp - y.rentGbp);
    return {
      salary,
      takeHomeMonthly,
      budget33: Math.round(takeHomeMonthly * 0.33),
      budget35: Math.round(takeHomeMonthly * 0.35),
      comfortable: oneBeds.filter((r) => r.shareOfTakeHome <= 0.35),
      stretch: oneBeds.filter(
        (r) => r.shareOfTakeHome > 0.35 && r.shareOfTakeHome <= 0.45,
      ),
      roomShare: rooms,
      roomShareWithinBudget: rooms.filter((r) => r.shareOfTakeHome <= 0.35),
      cheapestOneBed: oneBeds[0],
    };
  };

  // ── Sitemap ─────────────────────────────────────────────────────
  const guidesLastUpdated = () =>
    input.guides.reduce((latest, g) => (g.updated > latest ? g.updated : latest),
      input.guides[0]?.updated ?? input.rent.reviewedAsOf);

  const indexableRoutes = (): IndexableRoute[] => {
    const rent = input.rent.reviewedAsOf;
    const tax = input.councilTax.asOf;
    const council = rent >= tax ? rent : tax;
    return [
      { path: path("/"), priority: 0.9, changefreq: "weekly", lastmod: rent },
      { path: path("/neighbourhoods"), priority: 0.85, changefreq: "weekly", lastmod: rent },
      { path: path("/councils"), priority: 0.8, changefreq: "weekly", lastmod: council },
      { path: path("/commute"), priority: 0.8, changefreq: "weekly", lastmod: rent },
      { path: path("/compare"), priority: 0.7, changefreq: "weekly", lastmod: rent },
      { path: path("/lifestyle"), priority: 0.8, changefreq: "weekly", lastmod: rent },
      { path: path("/guides"), priority: 0.8, changefreq: "monthly", lastmod: guidesLastUpdated() },
      { path: path("/couples"), priority: 0.75, changefreq: "weekly", lastmod: rent },
      { path: path("/salary"), priority: 0.7, changefreq: "weekly", lastmod: rent },
      { path: path("/rent-index"), priority: 0.7, changefreq: "monthly", lastmod: rent },
      { path: path("/methodology"), priority: 0.6, changefreq: "monthly", lastmod: council },
      ...areas.map((a) => ({
        path: path(`/neighbourhoods/${a.id}`),
        priority: 0.85,
        changefreq: "monthly" as const,
        lastmod: council,
      })),
      ...councils.map((c) => ({
        path: path(`/councils/${slugify(c)}`),
        priority: 0.75,
        changefreq: "monthly" as const,
        lastmod: council,
      })),
      ...input.destinations.map((d) => ({
        path: path(`/commute/${d.id}`),
        priority: 0.75,
        changefreq: "monthly" as const,
        lastmod: rent,
      })),
      ...input.lifestylePages.map((p) => ({
        path: path(`/lifestyle/${p.slug}`),
        priority: 0.7,
        changefreq: "monthly" as const,
        lastmod: rent,
      })),
      ...compareSlugs().map((s) => ({
        path: path(`/compare/${s}`),
        priority: 0.6,
        changefreq: "monthly" as const,
        lastmod: rent,
      })),
      ...input.guides.map((g) => ({
        path: path(`/guides/${g.slug}`),
        priority: 0.8,
        changefreq: "monthly" as const,
        lastmod: g.updated,
      })),
      ...input.salaryLevels.map((s) => ({
        path: path(`/salary/${s}`),
        priority: 0.7,
        changefreq: "monthly" as const,
        lastmod: rent,
      })),
    ];
  };

  return {
    input,
    city,
    areas,
    areasById,
    councils,
    councilNoun: input.councilNoun,
    regionName: input.regionName,
    destinations: input.destinations,
    guides: input.guides,
    lifestylePages: input.lifestylePages,
    travelBands: input.travelBands,
    councilTax: input.councilTax,
    rent: input.rent,
    taxRegimeLabel: input.taxRegimeLabel,
    salaryLevels: input.salaryLevels,

    path,
    url,

    areaSlugs: () => areas.map((a) => a.id),
    getArea: (slug: string) => areasById[slug] ?? null,
    areasByBand: () =>
      [...areas].sort(
        (a, b) => centralityRank(a) - centralityRank(b) || a.name.localeCompare(b.name),
      ),
    areasInCouncil,

    roomRentFor,
    baselineForArea,
    rentMedians,
    oneBedPercentile,
    rentVsBaseline,
    selectedRent,

    councilSlugs: () => councils.map(slugify),
    getCouncilPageData,
    councilsByBandD,
    bandCharge,

    commuteMinutes,
    commuteSlugs: () => input.destinations.map((d) => d.id),
    getCommutePageData,
    commuteTimesFor,

    similarAreas,
    topPersonalities,

    getLifestylePage: (slug: string) =>
      input.lifestylePages.find((p) => p.slug === slug) ?? null,
    rankByLifestyle,

    compareSlugs,
    getComparePageData,
    relatedComparisons,

    isSalaryLevel: (value: number) =>
      (input.salaryLevels as readonly number[]).includes(value),
    getSalaryPageData,

    getGuide: (slug: string) => input.guides.find((g) => g.slug === slug) ?? null,
    guidesByRecency: () =>
      [...input.guides].sort((a, b) => b.updated.localeCompare(a.updated)),
    guidesLastUpdated,

    indexableRoutes,
  };
}

export type CityContent = ReturnType<typeof createCityContent>;

// ──────────────────────────────────────────────────────────────────
// Shared helpers
// ──────────────────────────────────────────────────────────────────

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function compareSlug(a: string, b: string): string {
  return [a, b].sort().join("-vs-");
}

/** English ordinal suffix — "82nd", not "82th". */
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

export function haversineKm(
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

function median(sorted: number[]): number {
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? Math.round((sorted[mid - 1] + sorted[mid]) / 2)
    : sorted[mid];
}

function averageAbsDiff(a: LifestyleScores, b: LifestyleScores): number {
  const keys = Object.keys(a) as (keyof LifestyleScores)[];
  return keys.reduce((sum, k) => sum + Math.abs(a[k] - b[k]), 0) / keys.length;
}

function roundTo25(value: number): number {
  return Math.round(value / 25) * 25;
}
