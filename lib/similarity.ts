import { NEIGHBOURHOODS } from "@/lib/data/neighbourhoods";
import type { LifestyleScores, Neighbourhood } from "@/lib/types";
import { LIFESTYLE_LABELS } from "@/lib/types";

export type SimilarAreaCategory =
  | "mostSimilar"
  | "cheaper"
  | "livelier"
  | "quieter"
  | "greener"
  | "moreCentral";

export type SimilarArea = {
  category: SimilarAreaCategory;
  neighbourhood: Neighbourhood;
  score: number;
  reason: string;
};

export type SimilarAreaGroups = Record<SimilarAreaCategory, SimilarArea[]>;

const CENTRAL_LONDON = { lat: 51.5074, lng: -0.1278 };

export function similarityScore(
  a: Neighbourhood,
  b: Neighbourhood,
): number {
  const lifestyle = 1 - lifestyleDistance(a.lifestyle, b.lifestyle);
  const rent =
    1 -
    Math.min(
      1,
      Math.abs(a.rent.oneBedMedianGbp - b.rent.oneBedMedianGbp) / 1_200,
    );
  const centrality = 1 - Math.min(1, Math.abs(centralityScore(a) - centralityScore(b)));
  const transport =
    1 -
    Math.min(
      1,
      Math.abs(a.lifestyle.connectivity - b.lifestyle.connectivity) / 10,
    );

  return lifestyle * 0.55 + rent * 0.18 + centrality * 0.17 + transport * 0.1;
}

export function similarAreasFor(
  target: Neighbourhood,
  all: Neighbourhood[] = NEIGHBOURHOODS,
): SimilarAreaGroups {
  const candidates = all
    .filter((area) => area.id !== target.id)
    .map((area) => ({
      neighbourhood: area,
      score: similarityScore(target, area),
    }))
    .sort((a, b) => b.score - a.score);

  return {
    mostSimilar: candidates.slice(0, 4).map((item) => ({
      category: "mostSimilar",
      ...item,
      reason: sharedStrengthReason(target, item.neighbourhood),
    })),
    cheaper: candidates
      .filter(
        (item) =>
          item.neighbourhood.rent.oneBedMedianGbp <=
            target.rent.oneBedMedianGbp - 100 && item.score >= 0.58,
      )
      .slice(0, 4)
      .map((item) => ({
        category: "cheaper",
        ...item,
        reason: `${item.neighbourhood.name} is about £${(
          target.rent.oneBedMedianGbp - item.neighbourhood.rent.oneBedMedianGbp
        ).toLocaleString("en-GB")}/mo cheaper on a 1-bed while keeping a similar lifestyle profile.`,
      })),
    livelier: candidates
      .filter(
        (item) =>
          item.neighbourhood.lifestyle.livelyVsQuiet >=
            target.lifestyle.livelyVsQuiet + 1.5 ||
          item.neighbourhood.lifestyle.nightlife >= target.lifestyle.nightlife + 1.5,
      )
      .slice(0, 4)
      .map((item) => ({
        category: "livelier",
        ...item,
        reason: `${item.neighbourhood.name} has stronger nightlife/social scores than ${target.name}.`,
      })),
    quieter: candidates
      .filter(
        (item) =>
          item.neighbourhood.lifestyle.livelyVsQuiet <=
            target.lifestyle.livelyVsQuiet - 1.5 &&
          item.neighbourhood.lifestyle.safety >= target.lifestyle.safety - 1,
      )
      .slice(0, 4)
      .map((item) => ({
        category: "quieter",
        ...item,
        reason: `${item.neighbourhood.name} is calmer while staying broadly comparable on safety and amenities.`,
      })),
    greener: candidates
      .filter(
        (item) =>
          item.neighbourhood.lifestyle.greenSpace >=
            target.lifestyle.greenSpace + 1.5,
      )
      .slice(0, 4)
      .map((item) => ({
        category: "greener",
        ...item,
        reason: `${item.neighbourhood.name} gives more green-space upside (${item.neighbourhood.lifestyle.greenSpace}/10 vs ${target.lifestyle.greenSpace}/10).`,
      })),
    moreCentral: candidates
      .filter((item) => centralityScore(item.neighbourhood) >= centralityScore(target) + 0.08)
      .slice(0, 4)
      .map((item) => ({
        category: "moreCentral",
        ...item,
        reason: `${item.neighbourhood.name} is more central by zone, distance and connectivity signals.`,
      })),
  };
}

export function bestFeatureLabel(neighbourhood: Neighbourhood): string {
  const [key, value] = (Object.entries(neighbourhood.lifestyle) as [
    keyof LifestyleScores,
    number,
  ][]).sort(([, a], [, b]) => b - a)[0];
  return `${LIFESTYLE_LABELS[key]} (${value}/10)`;
}

export function centralityScore(neighbourhood: Neighbourhood): number {
  const minZone = Math.min(...neighbourhood.transportZones);
  const zoneScore = 1 - Math.min(1, (minZone - 1) / 5);
  const distanceKm = haversineKm(neighbourhood.centroid, CENTRAL_LONDON);
  const distanceScore = 1 - Math.min(1, distanceKm / 25);
  return zoneScore * 0.45 + distanceScore * 0.3 + (neighbourhood.lifestyle.connectivity / 10) * 0.25;
}

function lifestyleDistance(a: LifestyleScores, b: LifestyleScores): number {
  const values = (Object.keys(a) as (keyof LifestyleScores)[]).map((key) =>
    Math.abs(a[key] - b[key]) / 10,
  );
  return Math.sqrt(values.reduce((sum, value) => sum + value ** 2, 0) / values.length);
}

function sharedStrengthReason(a: Neighbourhood, b: Neighbourhood): string {
  const shared = (Object.keys(a.lifestyle) as (keyof LifestyleScores)[])
    .filter((key) => a.lifestyle[key] >= 7 && b.lifestyle[key] >= 7)
    .sort((left, right) => b.lifestyle[right] - b.lifestyle[left])
    .slice(0, 2)
    .map((key) => LIFESTYLE_LABELS[key].toLowerCase());

  if (shared.length > 0) {
    return `Similar strengths for ${shared.join(" and ")}.`;
  }
  return `Closest overall profile to ${a.name} across rent, lifestyle and centrality.`;
}

function haversineKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const radiusKm = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * radiusKm * Math.asin(Math.sqrt(x));
}
