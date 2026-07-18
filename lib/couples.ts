import { affordabilityScore } from "@/lib/affordability";
import { scoreLabel } from "@/lib/decision";
import { selectedRentGbp } from "@/lib/rent";
import { lifestyleScore } from "@/lib/scoring";
import type {
  Neighbourhood,
  RentBasis,
  ScoredNeighbourhood,
  UserQuery,
} from "@/lib/types";

export type CouplesInput = {
  commuteA: Record<string, number | undefined>;
  commuteB: Record<string, number | undefined>;
  maxCommuteA: number;
  maxCommuteB: number;
  monthlyRentBudgetGbp: number | null;
  rentBasis: RentBasis;
  sharedQuery: UserQuery;
};

export type CouplesRecommendation = {
  neighbourhood: Neighbourhood;
  commuteA: number | null;
  commuteB: number | null;
  selectedRentGbp: number;
  affordabilityScore: number;
  lifestyleScore: number;
  balanceScore: number;
  matchScore: number;
  isExcluded: boolean;
  explanation: string;
  tradeoff: string;
};

export function scoreCouplesNeighbourhood(
  neighbourhood: Neighbourhood,
  input: CouplesInput,
): CouplesRecommendation {
  const commuteA = input.commuteA[neighbourhood.id] ?? null;
  const commuteB = input.commuteB[neighbourhood.id] ?? null;
  const rent = selectedRentGbp(neighbourhood, input.rentBasis);
  const affordability =
    input.monthlyRentBudgetGbp == null
      ? 1
      : affordabilityScore(rent, input.monthlyRentBudgetGbp);
  const lifestyle = lifestyleScore(neighbourhood.lifestyle, input.sharedQuery);
  const fitA = individualCommuteFit(commuteA, input.maxCommuteA);
  const fitB = individualCommuteFit(commuteB, input.maxCommuteB);
  const worstFit = Math.min(fitA, fitB);
  const averageFit = (fitA + fitB) / 2;
  const imbalancePenalty =
    commuteA != null && commuteB != null
      ? Math.max(0.55, 1 - Math.abs(commuteA - commuteB) / 90)
      : 0.72;
  const balanceScore = worstFit * 0.55 + averageFit * 0.3 + imbalancePenalty * 0.15;
  const isExcluded =
    (commuteA != null && commuteA > input.maxCommuteA * 1.35) ||
    (commuteB != null && commuteB > input.maxCommuteB * 1.35) ||
    affordability <= 0.05;
  const base =
    Math.pow(Math.max(0.05, balanceScore), 0.48) *
    Math.pow(Math.max(0.05, affordability), 0.32) *
    Math.pow(Math.max(0.05, lifestyle), 0.2);
  const matchScore = isExcluded ? 0 : base;

  return {
    neighbourhood,
    commuteA,
    commuteB,
    selectedRentGbp: rent,
    affordabilityScore: affordability,
    lifestyleScore: lifestyle,
    balanceScore,
    matchScore,
    isExcluded,
    explanation: couplesExplanation(neighbourhood, commuteA, commuteB, input),
    tradeoff: couplesTradeoff(neighbourhood, commuteA, commuteB, input),
  };
}

export function rankCouplesNeighbourhoods(
  neighbourhoods: Neighbourhood[],
  input: CouplesInput,
): CouplesRecommendation[] {
  return neighbourhoods
    .map((area) => scoreCouplesNeighbourhood(area, input))
    .sort((a, b) => {
      if (a.isExcluded !== b.isExcluded) return a.isExcluded ? 1 : -1;
      return b.matchScore - a.matchScore;
    });
}

export function couplesScoredAdapter(
  recommendation: CouplesRecommendation,
  query: UserQuery,
): ScoredNeighbourhood {
  const worstCommute =
    recommendation.commuteA == null || recommendation.commuteB == null
      ? recommendation.commuteA ?? recommendation.commuteB
      : Math.max(recommendation.commuteA, recommendation.commuteB);
  return {
    neighbourhood: recommendation.neighbourhood,
    commuteMinutes: worstCommute,
    isExcluded: recommendation.isExcluded,
    affordabilityScore: recommendation.affordabilityScore,
    lifestyleScore: recommendation.lifestyleScore,
    matchScore: recommendation.matchScore,
    rentVsBudget:
      query.monthlyRentBudgetGbp == null
        ? null
        : recommendation.selectedRentGbp / query.monthlyRentBudgetGbp,
    selectedRentGbp: recommendation.selectedRentGbp,
  };
}

function individualCommuteFit(minutes: number | null, max: number): number {
  if (minutes == null) return 0.45;
  if (minutes > max * 1.35) return 0;
  if (minutes <= max * 0.7) return 1;
  if (minutes <= max) return 0.78;
  return Math.max(0.25, 1 - (minutes - max) / (max * 0.55));
}

function couplesExplanation(
  neighbourhood: Neighbourhood,
  commuteA: number | null,
  commuteB: number | null,
  input: CouplesInput,
): string {
  const a = commuteA == null ? "an unknown commute" : `about ${commuteA} minutes`;
  const b = commuteB == null ? "an unknown commute" : `about ${commuteB} minutes`;
  const budget =
    input.monthlyRentBudgetGbp == null
      ? "with no shared rent cap set"
      : `against a shared £${input.monthlyRentBudgetGbp.toLocaleString("en-GB")}/mo budget`;
  return `${neighbourhood.name} gives Person A ${a} and Person B ${b}, ${budget}.`;
}

function couplesTradeoff(
  neighbourhood: Neighbourhood,
  commuteA: number | null,
  commuteB: number | null,
  input: CouplesInput,
): string {
  const rent = selectedRentGbp(neighbourhood, input.rentBasis);
  if (
    input.monthlyRentBudgetGbp != null &&
    rent > input.monthlyRentBudgetGbp * 1.1
  ) {
    return `Estimated rent is materially over the shared £${input.monthlyRentBudgetGbp.toLocaleString("en-GB")}/mo budget.`;
  }
  if (commuteA != null && commuteB != null && Math.abs(commuteA - commuteB) >= 20) {
    return "Commute burden is uneven; check whether the longer journey is acceptable.";
  }
  if (neighbourhood.lifestyle.nightlife <= 5 && input.sharedQuery.personality === "lively") {
    return "Better on balance than late-night energy.";
  }
  return `${scoreLabel(
    lifestyleScore(neighbourhood.lifestyle, input.sharedQuery),
  )}. ${neighbourhood.tradeoffs[0] ?? "No dominant shared compromise in the current data."}`;
}
