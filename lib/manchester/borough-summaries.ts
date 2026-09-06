import { GM_BOROUGHS } from "@/lib/manchester/boroughs";
import type { BoroughSummary } from "@/lib/boroughs";
import type { LatLng, ScoredNeighbourhood } from "@/lib/types";

/**
 * Borough rollups for the map's borough search.
 *
 * Produces the same BoroughSummary shape the London map already consumes,
 * so the search box and the borough outline layer work unchanged. The one
 * behavioural difference: London throws if a borough has no scored areas,
 * because all 32 are covered. Greater Manchester's coverage is uneven by
 * design — Wigan has three areas and the city of Manchester sixteen — so
 * a borough with nothing scored is simply omitted rather than treated as
 * a data error.
 */
export function manchesterBoroughSummaries(
  scoredNeighbourhoods: ScoredNeighbourhood[],
): BoroughSummary[] {
  return GM_BOROUGHS.flatMap((borough) => {
    const scored = scoredNeighbourhoods
      .filter((item) => item.neighbourhood.borough === borough)
      .sort(compareMatches);

    if (scored.length === 0) return [];

    const rentValues = scored.map((s) => s.selectedRentGbp);
    const commuteValues = scored
      .map((s) => s.commuteMinutes)
      .filter((value): value is number => typeof value === "number");

    return [
      {
        id: slugify(borough),
        name: borough,
        centroid: averageCentroid(scored.map((s) => s.neighbourhood.centroid)),
        scored,
        bestMatch: scored[0],
        reachableCount: scored.filter((s) => !s.isExcluded).length,
        averageSelectedRentGbp: roundToNearest(average(rentValues), 25),
        minSelectedRentGbp: roundToNearest(Math.min(...rentValues), 25),
        maxSelectedRentGbp: roundToNearest(Math.max(...rentValues), 25),
        averageMatchScore: average(scored.map((s) => s.matchScore)),
        commuteRangeMinutes:
          commuteValues.length > 0
            ? { min: Math.min(...commuteValues), max: Math.max(...commuteValues) }
            : null,
        transportLines: Array.from(
          new Set(
            scored.flatMap((s) =>
              s.neighbourhood.mainStations.flatMap((st) => st.lines),
            ),
          ),
        ).slice(0, 5),
        topStrengths: unique(scored.flatMap((s) => s.neighbourhood.strengths)).slice(0, 3),
        topTradeoffs: unique(scored.flatMap((s) => s.neighbourhood.tradeoffs)).slice(0, 3),
      },
    ];
  }).sort((a, b) => a.name.localeCompare(b.name));
}

function compareMatches(a: ScoredNeighbourhood, b: ScoredNeighbourhood): number {
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

function unique(values: string[]): string[] {
  return Array.from(new Set(values.map((v) => v.trim())));
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
