"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { GOOGLE_ADSENSE_SCRIPT_URL } from "@/lib/monetisation";
import {
  getConsentServerSnapshot,
  getConsentSnapshot,
  legacyAdvertisingConsent,
  OPEN_COOKIE_SETTINGS_EVENT,
  parseConsentSnapshot,
  storeConsent,
  subscribeToConsent,
  type ConsentPreferences,
} from "@/lib/consent";

const ADSENSE_SCRIPT_ID = "wil-adsense";

type AdSenseQueue = unknown[] & {
  requestNonPersonalizedAds?: number;
};

/**
 * Injects the Google AdSense tag. Only ever called once the visitor has
 * actively accepted advertising cookies — the script is deliberately NOT in
 * the server-rendered document, so declining (or ignoring) the banner means
 * it never loads at all.
 */
function loadAdSense(): void {
  if (document.getElementById(ADSENSE_SCRIPT_ID)) return;

  // This in-site consent control is deliberately limited to contextual,
  // non-personalised ads. Personalised ads for UK/EEA visitors require a
  // Google-certified TCF CMP configured in AdSense; this queue flag prevents
  // the custom banner from being mistaken for that certified signal.
  const adsWindow = window as Window & { adsbygoogle?: AdSenseQueue };
  const queue = (adsWindow.adsbygoogle ??= []);
  queue.requestNonPersonalizedAds = 1;

  const s = document.createElement("script");
  s.id = ADSENSE_SCRIPT_ID;
  s.async = true;
  s.src = GOOGLE_ADSENSE_SCRIPT_URL;
  s.crossOrigin = "anonymous";
  document.head.appendChild(s);
}

export default function CookieConsent() {
  const rawConsent = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );
  const preferences = parseConsentSnapshot(rawConsent);
  const [reopened, setReopened] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [draft, setDraft] = useState<ConsentPreferences>({
    analytics: false,
    advertising: false,
  });

  // Preserve the old advertising choice without silently opting anybody into
  // the newly introduced analytics category.
  useEffect(() => {
    if (preferences) return;
    const legacy = legacyAdvertisingConsent();
    if (legacy !== null) {
      storeConsent({ analytics: false, advertising: legacy });
    }
  }, [preferences]);

  // Synchronising an external system (the ad script) with the current choice.
  useEffect(() => {
    if (preferences?.advertising) loadAdSense();
  }, [preferences?.advertising]);

  useEffect(() => {
    const onOpen = () => {
      setDraft(preferences ?? { analytics: false, advertising: false });
      setShowSettings(true);
      setReopened(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpen);
  }, [preferences]);

  const decide = useCallback((next: ConsentPreferences) => {
    const shouldReload = preferences?.advertising === true && !next.advertising;
    storeConsent(next);
    setReopened(false);
    setShowSettings(false);
    // AdSense can inject its own frames after the script has loaded. A reload
    // is the only reliable way to make a withdrawal take effect immediately.
    if (shouldReload) window.location.reload();
  }, [preferences?.advertising]);

  const visible = reopened || preferences === null;
  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-700 bg-slate-900/98 px-4 py-3 shadow-2xl backdrop-blur sm:px-6 sm:py-4"
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
          {/*
            Deliberately unbranded. Consent is stored once and applies to
            both the London and Manchester sections, so naming either one
            here would misdescribe what the visitor is agreeing to.
          */}
          <h2
            id="cookie-consent-title"
            className="mb-1 text-sm font-semibold text-slate-100"
          >
            Cookies on this site
          </h2>
          <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
            Optional analytics help improve the finder. Advertising cookies
            may fund the free site. Nothing optional loads before you choose,
            and the finder works either way. See the{" "}
            <Link
              href="/privacy"
              className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300"
            >
              privacy policy
            </Link>
            .
          </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={() => decide({ analytics: false, advertising: false })}
            className="rounded-lg border border-slate-600 px-3 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-slate-400 hover:text-white sm:px-4 sm:text-sm"
          >
            Reject optional
          </button>
          <button
            type="button"
            onClick={() => decide({ analytics: true, advertising: false })}
            className="rounded-lg border border-emerald-700 px-3 py-2 text-xs font-medium text-emerald-200 transition-colors hover:border-emerald-500 sm:px-4 sm:text-sm"
          >
            Analytics only
          </button>
          <button
            type="button"
            onClick={() => decide({ analytics: true, advertising: true })}
            className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-emerald-500 sm:px-4 sm:text-sm"
          >
            Allow all
          </button>
          <button
            type="button"
            onClick={() => {
              setDraft(preferences ?? draft);
              setShowSettings((value) => !value);
            }}
            aria-expanded={showSettings}
            className="px-2 py-2 text-xs text-slate-400 underline hover:text-white"
          >
            Settings
          </button>
          </div>
        </div>

        {showSettings && (
          <div className="mt-3 grid gap-2 border-t border-slate-800 pt-3 text-xs sm:grid-cols-2">
            <label className="flex items-start gap-2 rounded-md bg-slate-950/50 p-3">
              <input
                type="checkbox"
                checked={draft.analytics}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    analytics: event.target.checked,
                  }))
                }
                className="mt-0.5"
              />
              <span>
                <strong className="block text-slate-200">Anonymous analytics</strong>
                <span className="text-slate-400">Finder and shortlist actions; never form answers or exact addresses.</span>
              </span>
            </label>
            <label className="flex items-start gap-2 rounded-md bg-slate-950/50 p-3">
              <input
                type="checkbox"
                checked={draft.advertising}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    advertising: event.target.checked,
                  }))
                }
                className="mt-0.5"
              />
              <span>
                <strong className="block text-slate-200">Contextual advertising</strong>
                <span className="text-slate-400">Loads Google AdSense in non-personalised mode.</span>
              </span>
            </label>
            <button
              type="button"
              onClick={() => decide(draft)}
              className="rounded-md bg-slate-700 px-4 py-2 font-medium text-white hover:bg-slate-600 sm:col-span-2 sm:justify-self-end"
            >
              Save choices
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
