import { gbp } from "@/lib/affordability";
import { formatApproxMinutes } from "@/lib/format";
import { rentBasisShortLabel } from "@/lib/rent";
import type {
  LifestyleScores,
  ScoredNeighbourhood,
  UserQuery,
} from "@/lib/types";
import { LIFESTYLE_LABELS } from "@/lib/types";

export function strengthInsights(
  scored: ScoredNeighbourhood,
  query: UserQuery,
): string[] {
  const { neighbourhood: n, commuteMinutes, rentVsBudget, selectedRentGbp } = scored;
  const derived: string[] = [];

  if (commuteMinutes != null && commuteMinutes <= query.maxCommuteMinutes * 0.65) {
    derived.push(
      `${formatApproxMinutes(commuteMinutes)} commute estimate gives good headroom against your ${query.maxCommuteMinutes}-minute cap`,
    );
  }

  if (rentVsBudget != null && rentVsBudget <= 0.9) {
    derived.push(
      `${gbp(selectedRentGbp)}/mo ${rentBasisShortLabel(query.rentBasis)} estimate sits under your current budget`,
    );
  }

  const stationNames = n.mainStations.map((s) => s.name).slice(0, 2);
  const lineCount = new Set(n.mainStations.flatMap((s) => s.lines)).size;
  if (lineCount >= 3) {
    derived.push(
      `${lineCount} transport options across ${stationNames.join(" and ")} support flexible commuting`,
    );
  }

  derived.push(...topLifestyleStrengths(n.lifestyle, query));

  return unique([...n.strengths, ...derived]).slice(0, 7);
}

export function tradeoffInsights(
  scored: ScoredNeighbourhood,
  query: UserQuery,
): string[] {
  const { neighbourhood: n, commuteMinutes, rentVsBudget, selectedRentGbp } = scored;
  const derived: string[] = [];

  if (rentVsBudget != null && rentVsBudget > 1) {
    derived.push(
      `${gbp(selectedRentGbp)}/mo ${rentBasisShortLabel(query.rentBasis)} estimate is ${Math.round(
        (rentVsBudget - 1) * 100,
      )}% over your current budget`,
    );
  }

  if (commuteMinutes != null && commuteMinutes > query.maxCommuteMinutes * 0.85) {
    derived.push(
      `${formatApproxMinutes(commuteMinutes)} commute estimate leaves little margin against your ${query.maxCommuteMinutes}-minute cap`,
    );
  }

  derived.push(...lowestLifestyleTradeoffs(n.lifestyle, query));

  return unique([...n.tradeoffs, ...derived]).slice(0, 7);
}

function topLifestyleStrengths(
  scores: LifestyleScores,
  query: UserQuery,
): string[] {
  const active = activeWeightKeys(query);
  const keys = active.length > 0 ? active : scoreKeys(scores, "desc").slice(0, 3);

  return keys
    .filter((key) => scores[key] >= 7)
    .slice(0, 3)
    .map((key) => `${LIFESTYLE_LABELS[key]} is a clear strength here (${scores[key]}/10)`);
}

function lowestLifestyleTradeoffs(
  scores: LifestyleScores,
  query: UserQuery,
): string[] {
  const active = activeWeightKeys(query);
  const keys = active.length > 0 ? active : scoreKeys(scores, "asc").slice(0, 3);
  const threshold = active.length > 0 ? 7 : 5;

  return keys
    .filter((key) => scores[key] <= threshold)
    .slice(0, 3)
    .map((key) =>
      active.length > 0
        ? `${LIFESTYLE_LABELS[key]} is below a strong preference (${scores[key]}/10)`
        : `${LIFESTYLE_LABELS[key]} is one of the weaker lifestyle scores (${scores[key]}/10)`,
    );
}

function activeWeightKeys(query: UserQuery): (keyof LifestyleScores)[] {
  return (Object.entries(query.lifestyleWeights) as [
    keyof LifestyleScores,
    number,
  ][])
    .filter(([, weight]) => (weight ?? 0) > 0)
    .sort(([, a], [, b]) => b - a)
    .map(([key]) => key);
}

function scoreKeys(
  scores: LifestyleScores,
  direction: "asc" | "desc",
): (keyof LifestyleScores)[] {
  return (Object.keys(scores) as (keyof LifestyleScores)[]).sort((a, b) =>
    direction === "asc" ? scores[a] - scores[b] : scores[b] - scores[a],
  );
}

function unique(items: string[]): string[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
