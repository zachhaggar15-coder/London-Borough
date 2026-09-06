/**
 * Homepage — server component wrapper.
 *
 * The interactive discovery tool runs client-side inside HomeClient.
 * This server component adds server-rendered above-fold and below-fold
 * content for search engine indexing.
 */

import type { Metadata } from "next";
import Link from "next/link";
import HomeClient from "./HomeClient";
import {
  getAllBoroughSlugs,
  getAllNeighbourhoodSlugs,
  getComparePageData,
  getFeaturedCompareSlugs,
  LIFESTYLE_PAGES,
  londonRentMedians,
  SALARY_LEVELS,
  SITE_URL,
} from "@/lib/seo-data";
import { DESTINATIONS } from "@/lib/data/destinations";
import { guidesByRecency } from "@/lib/data/guides";
import { MANCHESTER_NEIGHBOURHOODS } from "@/lib/manchester/data/neighbourhoods";
import { GM_BOROUGHS } from "@/lib/manchester/boroughs";
import { manchesterRentMedians } from "@/lib/manchester/seo-data";

export const metadata: Metadata = {
  title: "Where in London — find your neighbourhood",
  description:
    "Find London neighbourhoods that match your commute, salary and lifestyle. Compare areas, check rent budgets, and discover where to live in London.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Where in London — London neighbourhood discovery",
    description:
      "Enter your commute destination, salary and lifestyle to find the best London neighbourhoods for you.",
    url: SITE_URL,
  },
};

export default function HomePage() {
  const neighbourhoodCount = getAllNeighbourhoodSlugs().length;
  const boroughSlugs = getAllBoroughSlugs().slice(0, 12);
  const popularNeighbourhoods = getAllNeighbourhoodSlugs().slice(0, 12);
  const popularComparisons = getFeaturedCompareSlugs(6)
    .map((slug) => getComparePageData(slug))
    .filter(Boolean);
  const manchesterCount = MANCHESTER_NEIGHBOURHOODS.length;
  const manchesterMedianOneBed = manchesterRentMedians().oneBed;
  const londonMedianOneBed = londonRentMedians().oneBed;

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Where in London",
    url: SITE_URL,
    description:
      "London neighbourhood discovery for people moving to or relocating within London.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the best area to live in London?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The best area depends on your priorities. For nightlife and social life, look at Shoreditch, Dalston or Clapham. For green space and quiet, try Wimbledon, Blackheath or Hampstead. For fast commutes to the City, Bermondsey, Shoreditch or Islington work well. For value, explore Zone 3 options like Walthamstow, Tooting or Leyton.",
        },
      },
      {
        "@type": "Question",
        name: "How much rent can I afford in London?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most financial advisors recommend spending no more than 33–35% of your take-home pay on rent. On a £40,000 salary you take home around £2,693/month, giving you a rent budget of roughly £900–£940/month. On £60,000 that rises to around £1,270–£1,320/month.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best area in London for young professionals?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Clapham, Islington, Shoreditch and Battersea are consistently popular with young professionals — good transport, a social scene, and communities of similar people. Peckham and Hackney offer similar energy at lower rent.",
        },
      },
      {
        "@type": "Question",
        name: "Which London areas are cheapest to rent in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The cheapest areas for renting in London are typically in Zones 3–6. Walthamstow, Tottenham, Leyton, Streatham, Catford, and Croydon offer the lowest rents while still having usable public transport links.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Interactive tool ─────────────────────────────────────────── */}
      <div className="h-[85vh] min-h-[560px] w-full overflow-hidden">
        <HomeClient />
      </div>

      {/* ── Server-rendered hero ─────────────────────────────────────────
          Sits below the map so the tool is the first thing on the page, per
          the product rule in STRATEGY.md that the map is the dominant
          element. The H1 and the intro copy are still server-rendered, so
          the page keeps the crawlable answer it was missing when the tool
          was client-only — it is now below the fold rather than above it. */}
      <section className="border-y border-slate-800 bg-slate-950 px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            Where to live in London
          </h1>
          <p className="mb-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            London has no single best area — it has areas that fit your
            commute, your budget and how you want to spend a Saturday. This
            tool narrows {neighbourhoodCount} neighbourhoods down to a
            shortlist worth actually visiting, using estimated public-transport
            times, reviewed market rents and ten lifestyle measures.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link
              href="/neighbourhoods"
              className="rounded-lg border border-slate-700 px-4 py-2 transition-colors hover:border-slate-500"
            >
              Browse all {neighbourhoodCount} areas
            </Link>
            <Link
              href="/guides/how-much-do-i-need-to-earn-to-live-in-london"
              className="rounded-lg border border-slate-700 px-4 py-2 transition-colors hover:border-slate-500"
            >
              What salary do you need?
            </Link>
            <Link
              href="/london-rent-index"
              className="rounded-lg border border-slate-700 px-4 py-2 transition-colors hover:border-slate-500"
            >
              Rent by area
            </Link>
          </div>
        </div>
      </section>

      {/* ── Below-fold SEO content ───────────────────────────────────── */}
      <div className="bg-slate-950 text-slate-100 border-t border-slate-800">
        {/* How it works */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-2xl font-bold tracking-tight mb-8">
            How Where in London works
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Enter your commute",
                desc: "Type your workplace or select a major London destination. We estimate typical public-transport times to 95+ neighbourhoods.",
              },
              {
                step: "2",
                title: "Set your budget",
                desc: "Enter your salary or a monthly rent budget. We filter to areas that fit, and show what percentage of take-home each neighbourhood costs.",
              },
              {
                step: "3",
                title: "Match your lifestyle",
                desc: "Choose a personality profile — lively, chill, sporty, social — and we re-rank all areas to surface your best matches.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                  {step}
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{title}</h3>
                  <p className="text-slate-400 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Guides */}
        <section className="border-t border-slate-800 mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            Before you pick an area
          </h2>
          <p className="text-slate-400 mb-8">
            What London costs, how renting works under the 2026 rules, and what
            to sort out in which order.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {guidesByRecency()
              .slice(0, 6)
              .map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 transition-colors hover:border-slate-600"
                >
                  <p className="text-sm font-medium">{guide.h1}</p>
                  <p className="mt-1 text-xs text-slate-400">{guide.summary}</p>
                </Link>
              ))}
          </div>
          <Link
            href="/guides"
            className="mt-6 inline-block text-sm text-emerald-400 transition-colors hover:text-emerald-300"
          >
            All guides →
          </Link>
        </section>

        {/* Popular commutes */}
        <section className="border-t border-slate-800 mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            Popular commute guides
          </h2>
          <p className="text-slate-400 mb-8">
            Find the best neighbourhoods for commuting to major London
            destinations.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {DESTINATIONS.map((d) => (
              <Link
                key={d.id}
                href={`/commute/${d.id}`}
                className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-3 hover:border-slate-600 transition-colors"
              >
                <p className="font-medium text-sm">
                  Best areas for commuting to {d.label}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-slate-800 mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            Choosing as a couple or flatmates?
          </h2>
          <p className="text-slate-400 mb-6 max-w-3xl">
            Compare two commute destinations and a shared budget to find areas
            that work for both people, not just the person with the easiest
            journey.
          </p>
          <Link
            href="/couples"
            className="inline-block rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium hover:bg-emerald-500 transition-colors"
          >
            Try couples / flatmates mode
          </Link>
        </section>

        {/* Popular comparisons */}
        <section className="border-t border-slate-800 mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            Popular area comparisons
          </h2>
          <p className="text-slate-400 mb-8">
            Compare two London neighbourhoods side by side before you shortlist
            flats or viewings.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {popularComparisons.map((comparison) => {
              if (!comparison) return null;
              return (
                <Link
                  key={comparison.slug}
                  href={`/compare/${comparison.slug}`}
                  className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-3 hover:border-slate-600 transition-colors"
                >
                  <p className="font-medium text-sm">
                    {comparison.a.name} vs {comparison.b.name}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Rent, transport and lifestyle comparison
                  </p>
                </Link>
              );
            })}
          </div>
          <Link
            href="/compare"
            className="mt-6 inline-block rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
          >
            View all comparisons →
          </Link>
        </section>

        {/* Lifestyle guides */}
        <section className="border-t border-slate-800 mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            London by lifestyle
          </h2>
          <p className="text-slate-400 mb-8">
            Neighbourhoods ranked by what matters to you.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {LIFESTYLE_PAGES.map((p) => (
              <Link
                key={p.slug}
                href={`/lifestyle/${p.slug}`}
                className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-3 hover:border-slate-600 transition-colors"
              >
                <p className="font-medium text-sm">{p.h1}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Salary guides */}
        <section className="border-t border-slate-800 mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            London rent guides by salary
          </h2>
          <p className="text-slate-400 mb-8">
            Where to live in London based on what you earn.
          </p>
          <div className="flex flex-wrap gap-3">
            {SALARY_LEVELS.map((s) => (
              <Link
                key={s}
                href={`/salary/${s}`}
                className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-2 text-sm hover:border-slate-600 transition-colors"
              >
                £{s.toLocaleString()} salary
              </Link>
            ))}
          </div>
        </section>

        {/* Popular neighbourhoods */}
        <section className="border-t border-slate-800 mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            Popular neighbourhood guides
          </h2>
          <p className="text-slate-400 mb-8">
            Rent, transport and lifestyle profiles for every London
            neighbourhood.
          </p>
          <div className="flex flex-wrap gap-3">
            {popularNeighbourhoods.map((slug) => (
              <Link
                key={slug}
                href={`/neighbourhoods/${slug}`}
                className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-2 text-sm hover:border-slate-600 transition-colors capitalize"
              >
                {slug.replace(/-/g, " ")}
              </Link>
            ))}
            <Link
              href="/neighbourhoods"
              className="rounded-lg border border-slate-700 text-slate-400 px-4 py-2 text-sm hover:text-white transition-colors"
            >
              View all 95 neighbourhoods →
            </Link>
          </div>
        </section>

        {/* Borough directory */}
        <section className="border-t border-slate-800 mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            London borough directory
          </h2>
          <p className="text-slate-400 mb-8">
            Rent prices, transport and neighbourhood guides for every London
            borough.
          </p>
          <div className="flex flex-wrap gap-3">
            {boroughSlugs.map((slug) => (
              <Link
                key={slug}
                href={`/boroughs/${slug}`}
                className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-2 text-sm hover:border-slate-600 transition-colors capitalize"
              >
                {slug.replace(/-/g, " ")}
              </Link>
            ))}
            <Link
              href="/boroughs"
              className="rounded-lg border border-slate-700 text-slate-400 px-4 py-2 text-sm hover:text-white transition-colors"
            >
              View all boroughs →
            </Link>
          </div>
        </section>

        {/* ── Manchester cross-link ──────────────────────────────────
            The Manchester section launched with 183 URLs reachable only
            from the header and footer. Internal links are most of what
            decides whether a new section gets crawled and ranked or just
            sits in the sitemap, so it gets a real block here rather than
            a nav entry alone. Placed below the London clusters: this page
            ranks for London queries and should stay about London. */}
        <section className="border-t border-slate-800 mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            Not set on London?
          </h2>
          <p className="text-slate-400 mb-6 max-w-3xl">
            The same treatment now covers Greater Manchester —{" "}
            {manchesterCount} areas across all {GM_BOROUGHS.length} boroughs,
            with their own rent baseline, council tax and journey times. The
            median one-bed there is around £
            {manchesterMedianOneBed.toLocaleString()} a month, against £
            {londonMedianOneBed.toLocaleString()} across the London areas on
            this page.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link
              href="/manchester"
              className="rounded-lg bg-emerald-600 px-4 py-2 font-medium hover:bg-emerald-500 transition-colors"
            >
              Where to live in Greater Manchester
            </Link>
            <Link
              href="/manchester/guides/moving-to-manchester-from-london"
              className="rounded-lg border border-slate-700 px-4 py-2 hover:border-slate-500 transition-colors"
            >
              Moving to Manchester from London
            </Link>
            <Link
              href="/manchester/rent-index"
              className="rounded-lg border border-slate-700 px-4 py-2 hover:border-slate-500 transition-colors"
            >
              Manchester rent by area
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-slate-800 mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-2xl font-bold tracking-tight mb-8">
            Frequently asked questions
          </h2>
          <div className="space-y-8 max-w-3xl">
            {[
              {
                q: "What is the best area to live in London?",
                a: "It depends on your priorities. For nightlife and social life, Shoreditch, Dalston and Clapham are consistently popular. For green space and quiet, try Wimbledon, Blackheath or Hampstead. For fast City commutes, Bermondsey, Islington or Bethnal Green. For value, Walthamstow, Tooting or Leyton offer Zone 2–3 access at lower rents.",
              },
              {
                q: "How much should I spend on rent in London?",
                a: "Most financial advice suggests keeping rent below 33–35% of your take-home pay. On a £40,000 salary that's around £900/month. On £60,000 it's around £1,300/month. Use the tool above to enter your salary and see which areas fit your budget.",
              },
              {
                q: "What is the best area in London for young professionals?",
                a: "Clapham, Islington, Battersea and Shoreditch are popular with young professionals for their mix of transport, social scene, and community density. Peckham and Hackney offer a similar energy at lower rent.",
              },
              {
                q: "Which areas in London have the best transport links?",
                a: "Stratford has the best raw transport score — six different lines including the Elizabeth line, Central line and Jubilee. Shoreditch, Liverpool Street, Victoria and Waterloo also offer exceptional connectivity within Zone 1.",
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <h3 className="font-semibold text-white mb-2">{q}</h3>
                <p className="text-slate-300">{a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
