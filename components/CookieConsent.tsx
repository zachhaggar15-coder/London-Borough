"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { GOOGLE_ADSENSE_SCRIPT_URL } from "@/lib/monetisation";

const STORAGE_KEY = "wil-cookie-consent";
const ADSENSE_SCRIPT_ID = "wil-adsense";

/** Fired by the footer's "Cookie settings" link to reopen the banner. */
export const OPEN_COOKIE_SETTINGS_EVENT = "wil:open-cookie-settings";

type Choice = "accepted" | "declined";

// ──────────────────────────────────────────────────────────────────
// The stored choice lives in localStorage, which is an external store as far
// as React is concerned — so it is read through useSyncExternalStore rather
// than mirrored into state inside an effect.
// ──────────────────────────────────────────────────────────────────

const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  // Keep tabs in sync when the choice is changed in another one.
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getSnapshot(): Choice | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "accepted" || v === "declined" ? v : null;
  } catch {
    // Private mode / storage blocked: treat as "not yet answered".
    return null;
  }
}

/** No stored choice exists during SSR, so the banner is never in the HTML. */
function getServerSnapshot(): Choice | null {
  return null;
}

function storeChoice(choice: Choice): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Non-fatal: the banner will simply ask again next visit.
  }
  listeners.forEach((l) => l());
}

/**
 * Injects the Google AdSense tag. Only ever called once the visitor has
 * actively accepted advertising cookies — the script is deliberately NOT in
 * the server-rendered document, so declining (or ignoring) the banner means
 * it never loads at all.
 */
function loadAdSense(): void {
  if (document.getElementById(ADSENSE_SCRIPT_ID)) return;
  const s = document.createElement("script");
  s.id = ADSENSE_SCRIPT_ID;
  s.async = true;
  s.src = GOOGLE_ADSENSE_SCRIPT_URL;
  s.crossOrigin = "anonymous";
  document.head.appendChild(s);
}

export default function CookieConsent() {
  const choice = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [reopened, setReopened] = useState(false);

  // Synchronising an external system (the ad script) with the current choice.
  useEffect(() => {
    if (choice === "accepted") loadAdSense();
  }, [choice]);

  useEffect(() => {
    const onOpen = () => setReopened(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpen);
  }, []);

  const decide = useCallback((next: Choice) => {
    storeChoice(next);
    setReopened(false);
  }, []);

  const visible = reopened || choice === null;
  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-700 bg-slate-900/98 px-6 py-5 shadow-2xl backdrop-blur"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2
            id="cookie-consent-title"
            className="mb-1 text-sm font-semibold text-slate-100"
          >
            Cookies on Where in London
          </h2>
          <p className="text-sm text-slate-300">
            This site is free and funded by advertising. With your permission,
            Google would set cookies to show and measure ads. Analytics here are
            cookieless, and declining keeps the advertising scripts from loading
            at all — the site works exactly the same either way. See the{" "}
            <Link
              href="/privacy"
              className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300"
            >
              privacy policy
            </Link>
            .
          </p>
          {reopened && choice !== null && (
            <p className="mt-2 text-xs text-slate-400">
              You currently have advertising cookies{" "}
              <strong className="text-slate-200">
                {choice === "accepted" ? "accepted" : "declined"}
              </strong>
              .
            </p>
          )}
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <button
            type="button"
            onClick={() => decide("declined")}
            className="rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-slate-400 hover:text-white"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
          >
            Accept cookies
          </button>
        </div>
      </div>
    </div>
  );
}
