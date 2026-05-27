import { LONDON_BOROUGHS } from "@/lib/commute-details";
import type { LatLng, ScoredNeighbourhood } from "@/lib/types";

export type BoroughSummary = {
  id: string;
  name: string;
  centroid: LatLng;
  scored: ScoredNeighbourhood[];
  bestMatch: ScoredNeighbourhood;
  reachableCount: number;
  averageSelectedRentGbp: number;
  minSelectedRentGbp: number;
  maxSelectedRentGbp: number;
  averageMatchScore: number;
  commuteRangeMinutes: { min: number; max: number } | null;
  transportLines: string[];
  topStrengths: string[];
  topTradeoffs: string[];
};

export function boroughSummaries(
  scoredNeighbourhoods: ScoredNeighbourhood[],
): BoroughSummary[] {
  return LONDON_BOROUGHS.map((borough) => {
    const scored = scoredNeighbourhoods
      .filter((item) =>
        boroughNamesFor(item.neighbourhood.borough).includes(borough),
      )
      .sort(compareBoroughMatches);

    if (scored.length === 0) {
      throw new Error(`No neighbourhood data for ${borough}`);
    }

    const bestMatch = [...scored].sort(compareBoroughMatches)[0];
    const centroid = averageCentroid(scored.map((s) => s.neighbourhood.centroid));
    const averageSelectedRentGbp = roundToNearest(
      average(scored.map((s) => s.selectedRentGbp)),
      25,
    );
    const rentValues = scored.map((s) => s.selectedRentGbp);
    const commuteValues = scored
      .map((s) => s.commuteMinutes)
      .filter((value): value is number => typeof value === "number");
    const averageMatchScore = average(scored.map((s) => s.matchScore));
    const transportLines = Array.from(
      new Set(scored.flatMap((s) => s.neighbourhood.mainStations.flatMap((st) => st.lines))),
    ).slice(0, 5);
    const topStrengths = uniqueText(
      scored.flatMap((s) => s.neighbourhood.strengths),
    ).slice(0, 3);
    const topTradeoffs = uniqueText(
      scored.flatMap((s) => s.neighbourhood.tradeoffs),
    ).slice(0, 3);

    return {
      id: slugify(borough),
      name: borough,
      centroid,
      scored,
      bestMatch,
      reachableCount: scored.filter((s) => !s.isExcluded).length,
      averageSelectedRentGbp,
      minSelectedRentGbp: roundToNearest(Math.min(...rentValues), 25),
      maxSelectedRentGbp: roundToNearest(Math.max(...rentValues), 25),
      averageMatchScore,
      commuteRangeMinutes:
        commuteValues.length > 0
          ? {
              min: Math.min(...commuteValues),
              max: Math.max(...commuteValues),
            }
          : null,
      transportLines,
      topStrengths,
      topTradeoffs,
    };
  }).sort((a, b) => a.name.localeCompare(b.name));
}

export function boroughNamesFor(raw: string): string[] {
  return raw.split("/").map((part) => part.trim()).filter(Boolean);
}

function compareBoroughMatches(
  a: ScoredNeighbourhood,
  b: ScoredNeighbourhood,
): number {
  if (a.isExcluded !== b.isExcluded) return a.isExcluded ? 1 : -1;
  return b.matchScore - a.matchScore;
}

function averageCentroid(points: LatLng[]): LatLng {
  return {
    lat: average(points.map((p) => p.lat)),
    lng: average(points.map((p) => p.lng)),
  };
}

function average(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function roundToNearest(value: number, nearest: number): number {
  return Math.round(value / nearest) * nearest;
}

function uniqueText(values: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const value of values) {
    const key = value.trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(value);
  }
  return out;
}

function slugify(value: string): string {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
