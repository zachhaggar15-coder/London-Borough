"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ANALYTICS_EVENTS, trackEvent, trackEventOnce } from "@/lib/analytics";
import { REVIEWED_SHORTLIST_PRICE_GBP } from "@/lib/commercial";

type Props = {
  surface: "comparison" | "finder_shortlist";
  areas?: string[];
  compact?: boolean;
};

export default function CommercialOffer({ surface, areas = [], compact }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const areaKey = areas.slice(0, 4).join(",");
  const areaCount = areaKey ? areaKey.split(",").length : 0;
  const params = new URLSearchParams({ source: surface });
  if (areaKey) params.set("areas", areaKey);
  const href = `/reviewed-shortlist?${params.toString()}`;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        trackEventOnce(
          ANALYTICS_EVENTS.commercialOfferViewed,
          { surface, area_count: areaCount, price_gbp: REVIEWED_SHORTLIST_PRICE_GBP },
          `commercial-offer:${surface}:${areaKey || "none"}`,
        );
        observer.disconnect();
      },
      { threshold: 0.5 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [areaCount, areaKey, surface]);

  return (
    <div
      ref={ref}
      className={
        compact
          ? "mt-4 rounded-md border border-emerald-800/70 bg-emerald-950/20 p-3"
          : "mb-10 rounded-xl border border-emerald-700/50 bg-emerald-950/20 p-5 sm:p-6"
      }
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
        Human-reviewed London shortlist
      </p>
      <h2 className={`${compact ? "mt-1 text-sm" : "mt-2 text-xl"} font-semibold text-white`}>
        A manually checked 3–5 area shortlist for £{REVIEWED_SHORTLIST_PRICE_GBP}
      </h2>
      <p className={`${compact ? "mt-1 text-xs" : "mt-2 text-sm"} leading-relaxed text-slate-300`}>
        Fresh rent examples, commute checks at your travel times, honest trade-offs
        and alternatives. This is a request for review, not an automated score report.
      </p>
      <Link
        href={href}
        onClick={() =>
          trackEvent(ANALYTICS_EVENTS.commercialCtaClicked, {
            surface,
            area_count: areaCount,
            price_gbp: REVIEWED_SHORTLIST_PRICE_GBP,
          })
        }
        className="mt-3 inline-flex rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
      >
        See what the review includes
      </Link>
    </div>
  );
}
