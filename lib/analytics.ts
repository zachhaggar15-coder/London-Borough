"use client";

import { hasAnalyticsConsent } from "@/lib/consent";

export const ANALYTICS_EVENTS = {
  finderStarted: "finder_started",
  finderCompleted: "finder_completed",
  recommendationViewed: "recommendation_viewed",
  shortlistChanged: "shortlist_changed",
  shortlistViewed: "shortlist_viewed",
  resultsShared: "results_shared",
  commercialOfferViewed: "commercial_offer_viewed",
  commercialCtaClicked: "commercial_cta_clicked",
  shortlistRequestSubmitted: "shortlist_request_submitted",
} as const;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

type AnalyticsProperties = Record<
  string,
  string | number | boolean | null | undefined
>;

const ENTRY_KEY = "wil-analytics-entry-v1";
const INTERNAL_KEY = "wil-internal-visitor";
const FINDER_STARTED_PREFIX = "wil-finder-started:";

export function trackEvent(
  name: AnalyticsEventName,
  properties: AnalyticsProperties = {},
): boolean {
  if (
    typeof window === "undefined" ||
    !hasAnalyticsConsent() ||
    typeof window.gtag !== "function"
  ) {
    return false;
  }

  const payload = { ...analyticsContext(), ...scrubProperties(properties) };
  window.gtag("event", name, payload);
  if (process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true") {
    console.info("[analytics]", name, payload);
  }
  return true;
}

export function trackEventOnce(
  name: AnalyticsEventName,
  properties: AnalyticsProperties,
  dedupeKey: string,
): boolean {
  if (typeof window === "undefined") return false;
  const key = `wil-event:${dedupeKey}`;
  try {
    if (window.sessionStorage.getItem(key) === "1") return false;
    const sent = trackEvent(name, properties);
    if (sent) window.sessionStorage.setItem(key, "1");
    return sent;
  } catch {
    return trackEvent(name, properties);
  }
}

export function markFinderStarted(
  surface: string,
  properties: AnalyticsProperties = {},
): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(`${FINDER_STARTED_PREFIX}${surface}`, "1");
  } catch {
    // Analytics still works when session storage is unavailable.
  }
  trackEventOnce(
    ANALYTICS_EVENTS.finderStarted,
    { surface, ...properties },
    `finder-started:${surface}`,
  );
}

export function hasFinderStarted(surface: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(`${FINDER_STARTED_PREFIX}${surface}`) === "1";
  } catch {
    return false;
  }
}

export function analyticsContext(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const entry = readOrCreateEntry();
  return {
    entry_path: entry.path,
    entry_type: entry.type,
    city: cityFromPath(window.location.pathname),
    ...(isInternalVisitor() ? { traffic_type: "internal" } : {}),
  };
}

function readOrCreateEntry(): { path: string; type: string } {
  try {
    const internalParam = new URLSearchParams(window.location.search).get("internal");
    if (internalParam === "1") window.localStorage.setItem(INTERNAL_KEY, "1");
    if (internalParam === "0") window.localStorage.removeItem(INTERNAL_KEY);
    const saved = window.sessionStorage.getItem(ENTRY_KEY);
    if (saved) return JSON.parse(saved) as { path: string; type: string };
    const entry = { path: window.location.pathname, type: entryType(document.referrer) };
    window.sessionStorage.setItem(ENTRY_KEY, JSON.stringify(entry));
    return entry;
  } catch {
    return { path: window.location.pathname, type: entryType(document.referrer) };
  }
}

function isInternalVisitor(): boolean {
  try {
    return window.localStorage.getItem(INTERNAL_KEY) === "1";
  } catch {
    return false;
  }
}

function entryType(referrer: string): string {
  if (!referrer) return "direct";
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    if (host === window.location.hostname.toLowerCase()) return "internal";
    if (/google|bing|duckduckgo|yahoo/.test(host)) return "organic_search";
    if (/chatgpt|openai|perplexity|copilot|gemini/.test(host)) return "ai_assistant";
    return "referral";
  } catch {
    return "unknown";
  }
}

function cityFromPath(pathname: string): string {
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  return ["manchester", "bristol", "leeds", "edinburgh", "geneva", "paris", "barcelona"].includes(
    firstSegment ?? "",
  )
    ? firstSegment!
    : "london";
}

function scrubProperties(
  properties: AnalyticsProperties,
): Record<string, string | number | boolean> {
  return Object.fromEntries(
    Object.entries(properties).filter(
      (entry): entry is [string, string | number | boolean] =>
        entry[1] !== null && entry[1] !== undefined,
    ),
  );
}
