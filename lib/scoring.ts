/**
 * Match-score computation.
 *
 * Combines affordability and lifestyle into a single 0..1 score per
 * neighbourhood, with a hard filter on commute time.
 *
 * Tweak the weights at the bottom of this file to change how the app
 * trades off cost vs lifestyle.
 */

import type {
  LifestyleScores,
  Neighbourhood,
  ScoredNeighbourhood,
  UserQuery,
} from "@/lib/types";
import { affordabilityScore, defaultMonthlyRentBudgetGbp } from "@/lib/affordability";
import { displayCommuteMinutes } from "@/lib/commute-details";
import { PERSONALITY_SCORERS } from "@/lib/personalities";
import { selectedRentGbp } from "@/lib/rent";

/** Final score = α * affordability + β * lifestyle (with α + β = 1). */
const DEFAULT_WEIGHTS = { affordability: 0.5, lifestyle: 0.5 };
const ADVANCED_WEIGHTS = { affordability: 0.6, lifestyle: 0.4 };

function activeLifestyleWeights(query: UserQuery): [
  keyof LifestyleScores,
  number,
][] {
  return (Object.entries(query.lifestyleWeights) as [
    keyof LifestyleScores,
    number,
  ][]).filter(([, w]) => (w ?? 0) > 0);
}

/**
 * Compute the lifestyle score for a neighbourhood.
 *
 * Priority order:
 *   1. If a personality is set, use its dedicated scorer (handles
 *      "less is better" cases like Chill wanting low nightlife).
 *   2. Else if any granular weights are set (advanced section), use those.
 *   3. Else plain average of all 10 dimensions.
 */
export function lifestyleScore(
  scores: LifestyleScores,
  query: UserQuery,
): number {
  const active = activeLifestyleWeights(query);

  if (active.length > 0) {
    const totalWeight = active.reduce((sum, [, w]) => sum + w, 0);
    const weighted = active.reduce((sum, [key, w]) => {
      const normalised = scores[key] / 10;
      return sum + Math.pow(normalised, 2.4) * w;
    }, 0);
    return weighted / totalWeight;
  }

  if (query.personality) {
    return PERSONALITY_SCORERS[query.personality](scores);
  }

  // Plain average of all 10 lifestyle dimensions.
  const vals = Object.values(scores);
  return vals.reduce((a, b) => a + b, 0) / vals.length / 10;
}

/**
 * Score one neighbourhood against the user's query.
 * `commuteMinutes` is null when we couldn't compute one.
 */
export function scoreNeighbourhood(
  neighbourhood: Neighbourhood,
  commuteMinutes: number | null,
  query: UserQuery,
): ScoredNeighbourhood {
  const effectiveCommute = displayCommuteMinutes(
    neighbourhood,
    commuteMinutes,
    query,
  );
  const isExcluded =
    effectiveCommute != null && effectiveCommute > query.maxCommuteMinutes;

  // Resolve budget: explicit budget wins, else derive from salary, else
  // treat as no budget (every neighbourhood = 1.0 affordability).
  const effectiveBudget =
    query.monthlyRentBudgetGbp ??
    (query.annualSalaryGbp != null
      ? defaultMonthlyRentBudgetGbp(
          query.annualSalaryGbp,
          query.rentBudgetShareOfTakeHome,
        )
      : null);
  const selectedRent = selectedRentGbp(neighbourhood, query.rentBasis);

  const aff =
    effectiveBudget == null
      ? 1
      : affordabilityScore(selectedRent, effectiveBudget);

  const life = lifestyleScore(neighbourhood.lifestyle, query);
  const weights =
    activeLifestyleWeights(query).length > 0 ? ADVANCED_WEIGHTS : DEFAULT_WEIGHTS;
  const matchScore = isExcluded
    ? 0
    : weights.affordability * aff + weights.lifestyle * life;

  return {
    neighbourhood,
    commuteMinutes: effectiveCommute,
    isExcluded,
    affordabilityScore: aff,
    lifestyleScore: life,
    matchScore,
    rentVsBudget:
      effectiveBudget == null
        ? null
        : selectedRent / effectiveBudget,
    selectedRentGbp: selectedRent,
  };
}

/** Score and sort every neighbourhood. Excluded ones drop to the bottom. */
export function scoreAll(
  neighbourhoods: Neighbourhood[],
  commuteByNeighbourhoodId: Record<string, number | undefined>,
  query: UserQuery,
): ScoredNeighbourhood[] {
  return neighbourhoods
    .map((n) =>
      scoreNeighbourhood(n, commuteByNeighbourhoodId[n.id] ?? null, query),
    )
    .sort((a, b) => {
      if (a.isExcluded !== b.isExcluded) return a.isExcluded ? 1 : -1;
      return b.matchScore - a.matchScore;
    });
}

/** Map a 0..1 score to a Tailwind `bg-match-N` colour class. */
export function matchScoreClass(score: number, excluded: boolean): string {
  if (excluded) return "bg-match-0";
  const bucket = Math.max(1, Math.min(10, Math.round(score * 10)));
  return `bg-match-${bucket}`;
}

/** Same as above but returns the hex colour — needed by MapLibre. */
export function matchScoreHex(score: number, excluded: boolean): string {
  if (excluded) return "#1f2937";
  const ramp = [
    "#7f1d1d", "#b91c1c", "#dc2626", "#ea580c", "#f59e0b",
    "#eab308", "#84cc16", "#22c55e", "#16a34a", "#15803d",
  ];
  const idx = Math.max(0, Math.min(9, Math.round(score * 10) - 1));
  return ramp[idx];
}

/**
 * "Who this area suits" — a short, human phrase derived from the lifestyle
 * scores. Avoids editorial copywriting; pulled deterministically from the
 * data so it stays in sync as scores change.
 */
export function suitsWho(neighbourhood: Neighbourhood): string {
  const s = neighbourhood.lifestyle;
  const tags: string[] = [];
  if (s.youngProfessionalDensity >= 9) tags.push("young professionals");
  else if (s.youngProfessionalDensity >= 8) tags.push("twenty-somethings");
  if (s.nightlife >= 9) tags.push("night-owls");
  if (s.greenSpace >= 9 && s.safety >= 7) tags.push("quiet livers");
  if (s.cafeDensity >= 8 && s.foodScene >= 8) tags.push("foodies");
  if (s.gymDensity >= 8 && s.youngProfessionalDensity >= 7) tags.push("fitness types");
  if (s.livelyVsQuiet <= 4 && s.safety >= 7) tags.push("calm-base seekers");
  if (s.connectivity >= 9) tags.push("travel-heavy commuters");
  if (tags.length === 0) return "broad mix of Londoners";
  return tags.slice(0, 2).join(" + ");
}

/**
 * "Why this is in your shortlist" — one short phrase explaining the
 * dominant reason this neighbourhood ranked where it did, given the
 * user's query. Used on cards and the drawer.
 */
export function shortlistReason(
  scored: ScoredNeighbourhood,
  query: UserQuery,
): string {
  if (scored.isExcluded) return "Outside your commute window";

  const reasons: string[] = [];

  if (
    scored.commuteMinutes != null &&
    scored.commuteMinutes <= query.maxCommuteMinutes * 0.6
  ) {
    reasons.push("very fast commute");
  } else if (
    scored.commuteMinutes != null &&
    scored.commuteMinutes <= query.maxCommuteMinutes * 0.8
  ) {
    reasons.push("comfortable commute");
  }

  if (scored.rentVsBudget != null) {
    if (scored.rentVsBudget <= 0.8) reasons.push("well under budget");
    else if (scored.rentVsBudget <= 1) reasons.push("within budget");
    else if (scored.rentVsBudget <= 1.15) reasons.push("slightly over budget");
  }

  if (scored.lifestyleScore >= 0.8) reasons.push("strong lifestyle fit");
  else if (scored.lifestyleScore >= 0.65) reasons.push("solid lifestyle fit");

  if (reasons.length === 0) {
    if (scored.matchScore >= 0.6) return "Balanced fit overall";
    return "Worth checking if you flex your filters";
  }
  // Capitalise the first reason
  const first = reasons[0].charAt(0).toUpperCase() + reasons[0].slice(1);
  return [first, ...reasons.slice(1)].join(" · ");
}
