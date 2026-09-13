import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReviewedShortlistForm from "@/components/ReviewedShortlistForm";
import {
  REVIEWED_SHORTLIST_ENABLED,
  REVIEWED_SHORTLIST_PRICE_GBP,
} from "@/lib/commercial";
import { NEIGHBOURHOODS } from "@/lib/data/neighbourhoods";
import { SITE_URL } from "@/lib/seo-data";

export const metadata: Metadata = {
  title: "Human-reviewed London shortlist",
  description: "Request a manually checked London neighbourhood shortlist with current rent examples, commute checks and explicit trade-offs.",
  alternates: { canonical: `${SITE_URL}/reviewed-shortlist` },
  robots: { index: false, follow: true },
};

type Props = { searchParams: Promise<{ areas?: string; source?: string }> };

export default async function ReviewedShortlistPage({ searchParams }: Props) {
  if (!REVIEWED_SHORTLIST_ENABLED) notFound();
  const { areas, source } = await searchParams;
  const validAreaIds = new Set(NEIGHBOURHOODS.map((area) => area.id));
  const shortlistedAreas = (areas ?? "")
    .split(",")
    .filter((area) => validAreaIds.has(area))
    .slice(0, 4);
  const sourcePath = source === "comparison" ? "/compare" : "/";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto max-w-3xl px-5 py-10 sm:px-6 sm:py-14">
        <Link href="/" className="text-sm text-slate-400 hover:text-white">← Back to the finder</Link>
        <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-emerald-300">Small manual experiment</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">A London shortlist checked by a person</h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-300">
          For £{REVIEWED_SHORTLIST_PRICE_GBP}, receive 3–5 areas with freshly checked rent examples, commute routes for your travel pattern, clear trade-offs and alternatives worth considering.
        </p>

        <div className="my-8 grid gap-3 sm:grid-cols-3">
          {[
            ["Fresh evidence", "Current rental examples and source dates."],
            ["Real commute checks", "Routes checked for your usual travel pattern."],
            ["An honest decision", "Why each area fits, what you give up, and alternatives."],
          ].map(([title, copy]) => (
            <div key={title} className="rounded-lg border border-slate-800 bg-slate-900 p-4">
              <h2 className="font-semibold text-white">{title}</h2>
              <p className="mt-1 text-sm text-slate-400">{copy}</p>
            </div>
          ))}
        </div>

        <div className="mb-8 rounded-lg border border-amber-800/50 bg-amber-950/20 p-4 text-sm text-amber-100">
          Submitting this form does not take payment. You will be contacted about availability and next steps first. This is neighbourhood research, not property, legal or financial advice.
        </div>

        <ReviewedShortlistForm shortlistedAreas={shortlistedAreas} sourcePath={sourcePath} />
      </main>
    </div>
  );
}
