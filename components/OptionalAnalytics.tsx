"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import {
  getConsentServerSnapshot,
  getConsentSnapshot,
  parseConsentSnapshot,
  subscribeToConsent,
} from "@/lib/consent";
import { analyticsContext } from "@/lib/analytics";

type Props = { measurementId: string | null };

export default function OptionalAnalytics({ measurementId }: Props) {
  const rawConsent = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );
  const consent = parseConsentSnapshot(rawConsent);

  if (!measurementId || consent?.analytics !== true) return null;
  return <GoogleAnalytics measurementId={measurementId} />;
}

function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready || typeof window.gtag !== "function") return;
    window.gtag("config", measurementId, {
      page_path: pathname,
      page_location: window.location.href,
      send_page_view: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      ...analyticsContext(),
    });
  }, [measurementId, pathname, ready]);

  return (
    <Script
      id="wil-google-analytics"
      src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
        measurementId,
      )}`}
      strategy="afterInteractive"
      onReady={() => {
        window.dataLayer = window.dataLayer ?? [];
        window.gtag =
          window.gtag ??
          function gtag(...args: unknown[]) {
            window.dataLayer!.push(args);
          };
        window.gtag("js", new Date());
        setReady(true);
      }}
    />
  );
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
