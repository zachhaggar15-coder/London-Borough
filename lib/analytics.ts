import { track } from "@vercel/analytics";

export const ANALYTICS_EVENTS = {
  finderStarted: "finder_started",
  finderCompleted: "finder_completed",
  recommendationClicked: "recommendation_clicked",
  neighbourhoodShortlisted: "neighbourhood_shortlisted",
  comparisonStarted: "comparison_started",
  comparisonCompleted: "comparison_completed",
  resultsShared: "results_shared",
  filtersChanged: "filters_changed",
  rankChanged: "recommendation_rank_changed",
} as const;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export function trackEvent(
  name: AnalyticsEventName,
  properties: Record<string, string | number | boolean | null | undefined> = {},
) {
  if (typeof window === "undefined") return;
  track(name, scrubProperties(properties));
}

function scrubProperties(
  properties: Record<string, string | number | boolean | null | undefined>,
): Record<string, string | number | boolean> {
  return Object.fromEntries(
    Object.entries(properties).filter(
      (entry): entry is [string, string | number | boolean] =>
        entry[1] !== null && entry[1] !== undefined,
    ),
  );
}
