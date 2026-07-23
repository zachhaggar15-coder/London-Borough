import { gbp, defaultMonthlyRentBudgetGbp } from "@/lib/affordability";
import { formatApproxMinutes } from "@/lib/format";
import { rentBasisShortLabel } from "@/lib/rent";
import type {
  LifestyleScores,
  Neighbourhood,
  ScoredNeighbourhood,
  UserQuery,
} from "@/lib/types";
import { LIFESTYLE_LABELS } from "@/lib/types";

export type RecommendationExplanation = {
  scoreLabel: string;
  bestFeature: string;
  why: string[];
  tradeoff: string;
  betterIf: string | null;
};

export type ComparisonBestFor = {
  label: string;
  neighbourhood: Neighbourhood;
  reason: string;
};

export type ComparisonDecision = {
  bestFor: ComparisonBestFor[];
  tradeoffs: string[];
  recommendation: string;
};

export type ResultsSummary = {
  priorityBullets: string[];
  bestOverall: ScoredNeighbourhood | null;
  bestValue: ScoredNeighbourhood | null;
  bestLifestyle: ScoredNeighbourhood | null;
  surprisingAlternative: ScoredNeighbourhood | null;
  keyDecision: string | null;
};

const RENT_DIFF_THRESHOLD = 100;
const COMMUTE_DIFF_THRESHOLD = 5;
const LIFESTYLE_DIFF_THRESHOLD = 1.2;

export function effectiveBudgetGbp(query: UserQuery): number | null {
  return (
    query.monthlyRentBudgetGbp ??
    (query.annualSalaryGbp != null
      ? defaultMonthlyRentBudgetGbp(
          query.annualSalaryGbp,
          query.rentBudgetShareOfTakeHome,
        )
      : null)
  );
}

export function scoreLabel(score: number, excluded = false): string {
  if (excluded) return "Outside constraints";
  if (score >= 0.82) return "Strong match";
  if (score >= 0.68) return "Good match";
  if (score >= 0.52) return "Possible fit";
  return "Stretch fit";
}

export function commuteFitScore(
  commuteMinutes: number | null,
  query: UserQuery,
): number {
  if (commuteMinutes == null) return query.destination ? 0.5 : 0.75;
  if (commuteMinutes > query.maxCommuteMinutes) return 0;
  const ratio = commuteMinutes / query.maxCommuteMinutes;
  if (ratio <= 0.45) return 1;
  return clamp(1 - Math.pow(ratio, 1.7) * 0.55, 0.32, 1);
}

export function activePreferenceKeys(query: UserQuery): (keyof LifestyleScores)[] {
  return (Object.entries(query.lifestyleWeights) as [
    keyof LifestyleScores,
    number,
  ][])
    .filter(([, weight]) => (weight ?? 0) > 0)
    .sort(([, a], [, b]) => b - a)
    .map(([key]) => key);
}

export function bestFeatureFor(
  scored: ScoredNeighbourhood,
  query: UserQuery,
): string {
  const { neighbourhood: n } = scored;

  if (
    scored.commuteMinutes != null &&
    scored.commuteMinutes <= query.maxCommuteMinutes * 0.65
  ) {
    return `${formatApproxMinutes(scored.commuteMinutes)} commute estimate gives this area real headroom`;
  }

  if (scored.rentVsBudget != null && scored.rentVsBudget <= 0.85) {
    return `${gbp(scored.selectedRentGbp)}/mo ${rentBasisShortLabel(query.rentBasis)} is comfortably under budget`;
  }

  const priority = strongestLifestyleKey(n.lifestyle, query);
  return `${LIFESTYLE_LABELS[priority]} is one of the strongest signals here (${n.lifestyle[priority]}/10)`;
}

export function mainTradeoffFor(
  scored: ScoredNeighbourhood,
  query: UserQuery,
): string {
  const { neighbourhood: n } = scored;

  if (scored.isExcluded) {
    return `Commute exceeds your ${query.maxCommuteMinutes}-minute cap.`;
  }

  if (scored.rentVsBudget != null && scored.rentVsBudget > 1.1) {
    return `${gbp(scored.selectedRentGbp)}/mo is materially over your current ${rentBasisShortLabel(query.rentBasis)} budget.`;
  }

  if (
    scored.commuteMinutes != null &&
    scored.commuteMinutes >= query.maxCommuteMinutes * 0.85
  ) {
    return `${formatApproxMinutes(scored.commuteMinutes)} leaves little margin against your commute cap.`;
  }

  const weakPriority = weakestActivePreference(scored, query);
  if (weakPriority) {
    return `${LIFESTYLE_LABELS[weakPriority]} is weaker than your preference (${n.lifestyle[weakPriority]}/10).`;
  }

  if (n.lifestyle.nightlife >= 8 && n.lifestyle.livelyVsQuiet >= 8) {
    return "Strong social energy may mean less quiet at evenings and weekends.";
  }

  if (n.lifestyle.greenSpace >= 8 && n.lifestyle.nightlife <= 5) {
    return "Greener and calmer, but less spontaneous nightlife nearby.";
  }

  return n.tradeoffs[0] ?? "No single dominant compromise in the current data.";
}

export function betterIfFor(
  scored: ScoredNeighbourhood,
  alternatives: ScoredNeighbourhood[],
): string | null {
  const included = alternatives.filter(
    (item) => !item.isExcluded && item.neighbourhood.id !== scored.neighbourhood.id,
  );

  const cheaper = included
    .filter((item) => scored.selectedRentGbp - item.selectedRentGbp >= RENT_DIFF_THRESHOLD)
    .sort((a, b) => b.matchScore - a.matchScore)[0];
  if (cheaper) {
    const extraMinutes =
      cheaper.commuteMinutes != null && scored.commuteMinutes != null
        ? cheaper.commuteMinutes - scored.commuteMinutes
        : null;
    return `${cheaper.neighbourhood.name} is better if monthly cost matters more: about ${gbp(
      scored.selectedRentGbp - cheaper.selectedRentGbp,
    )}/mo cheaper${
      extraMinutes != null && extraMinutes > COMMUTE_DIFF_THRESHOLD
        ? ` for ${extraMinutes} extra commute minutes`
        : ""
    }.`;
  }

  const faster = included
    .filter(
      (item) =>
        item.commuteMinutes != null &&
        scored.commuteMinutes != null &&
        scored.commuteMinutes - item.commuteMinutes >= COMMUTE_DIFF_THRESHOLD,
    )
    .sort((a, b) => b.matchScore - a.matchScore)[0];
  if (faster && scored.commuteMinutes != null && faster.commuteMinutes != null) {
    return `${faster.neighbourhood.name} is better if commute is the priority: about ${
      scored.commuteMinutes - faster.commuteMinutes
    } minutes faster.`;
  }

  return null;
}

export function recommendationExplanation(
  scored: ScoredNeighbourhood,
  alternatives: ScoredNeighbourhood[],
  query: UserQuery,
): RecommendationExplanation {
  const why: string[] = [];

  if (scored.commuteMinutes != null && !scored.isExcluded) {
    why.push(
      `${formatApproxMinutes(scored.commuteMinutes)} commute estimate versus your ${query.maxCommuteMinutes}-minute cap`,
    );
  }

  if (scored.rentVsBudget != null) {
    why.push(
      scored.rentVsBudget <= 1
        ? `${gbp(scored.selectedRentGbp)}/mo sits within your ${rentBasisShortLabel(query.rentBasis)} budget`
        : `${gbp(scored.selectedRentGbp)}/mo is a stretch against your current budget`,
    );
  }

  const lifestyleKey = strongestLifestyleKey(scored.neighbourhood.lifestyle, query);
  why.push(
    `${LIFESTYLE_LABELS[lifestyleKey]} matches strongly (${scored.neighbourhood.lifestyle[lifestyleKey]}/10)`,
  );

  return {
    scoreLabel: scoreLabel(scored.matchScore, scored.isExcluded),
    bestFeature: bestFeatureFor(scored, query),
    why: why.slice(0, 3),
    tradeoff: mainTradeoffFor(scored, query),
    betterIf: betterIfFor(scored, alternatives),
  };
}

export function comparisonDecision(
  scored: ScoredNeighbourhood[],
  query: UserQuery,
): ComparisonDecision {
  const candidates = scored.filter((item) => !item.isExcluded);
  const pool = candidates.length > 0 ? candidates : scored;
  const bestFor: ComparisonBestFor[] = [];

  addBestFor(bestFor, "overall balance", maxBy(pool, (item) => item.matchScore), (item) =>
    `${scoreLabel(item.matchScore).toLowerCase()} at ${(item.matchScore * 10).toFixed(1)}/10`,
  );
  addBestFor(bestFor, "affordability", minBy(pool, (item) => item.selectedRentGbp), (item) =>
    `${gbp(item.selectedRentGbp)}/mo ${rentBasisShortLabel(query.rentBasis)}`,
  );
  addBestFor(bestFor, "commute", minBy(pool, (item) => item.commuteMinutes ?? Infinity), (item) =>
    `${formatApproxMinutes(item.commuteMinutes)} estimated commute`,
  );
  addBestFor(bestFor, "nightlife", maxBy(pool, (item) => item.neighbourhood.lifestyle.nightlife), (item) =>
    `${item.neighbourhood.lifestyle.nightlife}/10 nightlife`,
  );
  addBestFor(bestFor, "quiet living", minBy(pool, (item) => item.neighbourhood.lifestyle.livelyVsQuiet), (item) =>
    `${item.neighbourhood.lifestyle.livelyVsQuiet}/10 liveliness, with ${item.neighbourhood.lifestyle.greenSpace}/10 green space`,
  );

  const tradeoffs = pairwiseTradeoffs(pool);
  const top = maxBy(pool, (item) => item.matchScore);
  const recommendation = top
    ? `${top.neighbourhood.name} is probably the strongest overall choice because ${bestFeatureFor(
        top,
        query,
      ).toLowerCase()} The main compromise is: ${mainTradeoffFor(top, query).toLowerCase()}`
    : "Add at least two areas to compare the decision trade-offs.";

  return {
    bestFor: uniqueBestFor(bestFor).slice(0, 5),
    tradeoffs: tradeoffs.slice(0, 4),
    recommendation,
  };
}

export function personalResultsSummary(
  scored: ScoredNeighbourhood[],
  query: UserQuery,
): ResultsSummary {
  const included = scored.filter((item) => !item.isExcluded);
  const pool = included.length > 0 ? included : scored;
  const bestOverall = pool[0] ?? null;
  const bestValue = maxBy(pool, (item) =>
    item.affordabilityScore * 0.7 + item.matchScore * 0.3,
  );
  const bestLifestyle = maxBy(pool, (item) => item.lifestyleScore);
  const surprisingAlternative =
    pool
      .slice(3, 14)
      .filter(
        (item) =>
          bestOverall &&
          item.selectedRentGbp <= bestOverall.selectedRentGbp - RENT_DIFF_THRESHOLD &&
          item.matchScore >= bestOverall.matchScore - 0.12,
      )[0] ?? null;

  return {
    priorityBullets: preferenceSummary(query),
    bestOverall,
    bestValue,
    bestLifestyle,
    surprisingAlternative,
    keyDecision: keyDecisionSentence(bestOverall, bestValue, bestLifestyle),
  };
}

export function preferenceSummary(query: UserQuery): string[] {
  const items: string[] = [];
  if (query.destination) {
    items.push(
      `commute under ${query.maxCommuteMinutes} minutes to ${query.destination.label}`,
    );
  }
  const budget = effectiveBudgetGbp(query);
  if (budget != null) {
    items.push(`${gbp(budget)}/mo ${rentBasisShortLabel(query.rentBasis)} budget`);
  }
  const active = activePreferenceKeys(query);
  if (active.length > 0) {
    items.push(
      active
        .slice(0, 3)
        .map((key) => LIFESTYLE_LABELS[key].toLowerCase())
        .join(", "),
    );
  } else if (query.personality) {
    items.push(`${query.personality} area profile`);
  }
  return items;
}

function keyDecisionSentence(
  bestOverall: ScoredNeighbourhood | null,
  bestValue: ScoredNeighbourhood | null,
  bestLifestyle: ScoredNeighbourhood | null,
): string | null {
  if (!bestOverall) return null;
  if (bestValue && bestValue.neighbourhood.id !== bestOverall.neighbourhood.id) {
    const saving = bestOverall.selectedRentGbp - bestValue.selectedRentGbp;
    if (saving >= RENT_DIFF_THRESHOLD) {
      const commuteDelta =
        bestOverall.commuteMinutes != null && bestValue.commuteMinutes != null
          ? bestValue.commuteMinutes - bestOverall.commuteMinutes
          : null;
      return `${bestOverall.neighbourhood.name} gives the strongest balance. ${bestValue.neighbourhood.name} saves about ${gbp(
        saving,
      )}/mo${
        commuteDelta != null && commuteDelta > 0
          ? ` but adds ${commuteDelta} commute minutes`
          : ""
      }.`;
    }
  }
  if (bestLifestyle && bestLifestyle.neighbourhood.id !== bestOverall.neighbourhood.id) {
    return `${bestOverall.neighbourhood.name} is the balanced pick; ${bestLifestyle.neighbourhood.name} is the purer lifestyle match if you can flex cost or commute.`;
  }
  return `${bestOverall.neighbourhood.name} is the clearest fit across your commute, budget and lifestyle signals.`;
}

function pairwiseTradeoffs(scored: ScoredNeighbourhood[]): string[] {
  const out: string[] = [];
  for (let i = 0; i < scored.length; i++) {
    for (let j = i + 1; j < scored.length; j++) {
      const a = scored[i];
      const b = scored[j];
      const rentDiff = a.selectedRentGbp - b.selectedRentGbp;
      const commuteDiff =
        a.commuteMinutes != null && b.commuteMinutes != null
          ? a.commuteMinutes - b.commuteMinutes
          : null;

      if (Math.abs(rentDiff) >= RENT_DIFF_THRESHOLD) {
        const cheaper = rentDiff > 0 ? b : a;
        const pricier = rentDiff > 0 ? a : b;
        const cheaperCommute =
          cheaper.commuteMinutes != null && pricier.commuteMinutes != null
            ? cheaper.commuteMinutes - pricier.commuteMinutes
            : null;
        out.push(
          `Choose ${cheaper.neighbourhood.name} over ${pricier.neighbourhood.name} to save about ${gbp(
            Math.abs(rentDiff),
          )}/mo${
            cheaperCommute != null && Math.abs(cheaperCommute) >= COMMUTE_DIFF_THRESHOLD
              ? cheaperCommute > 0
                ? ` for ${cheaperCommute} extra commute minutes`
                : ` and a ${Math.abs(cheaperCommute)} minute faster commute`
              : ""
          }.`,
        );
      }

      if (commuteDiff != null && Math.abs(commuteDiff) >= COMMUTE_DIFF_THRESHOLD) {
        const faster = commuteDiff > 0 ? b : a;
        const slower = commuteDiff > 0 ? a : b;
        out.push(
          `${faster.neighbourhood.name} is the commute-first choice versus ${slower.neighbourhood.name}, saving about ${Math.abs(
            commuteDiff,
          )} minutes.`,
        );
      }

      const nightlifeDiff =
        a.neighbourhood.lifestyle.nightlife - b.neighbourhood.lifestyle.nightlife;
      if (Math.abs(nightlifeDiff) >= LIFESTYLE_DIFF_THRESHOLD) {
        const livelier = nightlifeDiff > 0 ? a : b;
        const quieter = nightlifeDiff > 0 ? b : a;
        out.push(
          `${livelier.neighbourhood.name} is stronger for nightlife, while ${quieter.neighbourhood.name} is the calmer option.`,
        );
      }
    }
  }
  return unique(out);
}

function addBestFor(
  list: ComparisonBestFor[],
  label: string,
  item: ScoredNeighbourhood | null,
  reason: (item: ScoredNeighbourhood) => string,
) {
  if (!item) return;
  list.push({ label, neighbourhood: item.neighbourhood, reason: reason(item) });
}

function strongestLifestyleKey(
  scores: LifestyleScores,
  query: UserQuery,
): keyof LifestyleScores {
  const active = activePreferenceKeys(query);
  const keys = active.length > 0 ? active : (Object.keys(scores) as (keyof LifestyleScores)[]);
  return keys.sort((a, b) => scores[b] - scores[a])[0];
}

function weakestActivePreference(
  scored: ScoredNeighbourhood,
  query: UserQuery,
): keyof LifestyleScores | null {
  const active = activePreferenceKeys(query);
  return (
    active.find((key) => scored.neighbourhood.lifestyle[key] <= 6) ?? null
  );
}

function maxBy<T>(items: T[], score: (item: T) => number): T | null {
  return items.reduce<T | null>(
    (best, item) => (best == null || score(item) > score(best) ? item : best),
    null,
  );
}

function minBy<T>(items: T[], score: (item: T) => number): T | null {
  return items.reduce<T | null>(
    (best, item) => (best == null || score(item) < score(best) ? item : best),
    null,
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

function uniqueBestFor(items: ComparisonBestFor[]): ComparisonBestFor[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = `${item.label}:${item.neighbourhood.id}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
