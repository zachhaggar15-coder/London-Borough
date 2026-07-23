import type { Metadata } from "next";
import Link from "next/link";
import { DESTINATIONS } from "@/lib/data/destinations";
import { NEIGHBOURHOODS } from "@/lib/data/neighbourhoods";
import { LONDON_BOROUGHS } from "@/lib/commute-details";
import { LONDON_TRANSIT_KMH } from "@/lib/isochrone";
import { LIFESTYLE_LABELS } from "@/lib/types";
import { londonRentMedians, SITE_URL } from "@/lib/seo-data";
import {
  RENT_MARKET_REVIEW_AS_OF,
  RENT_MARKET_SOURCES,
  ROOM_REGION_AVERAGE_GBP,
} from "@/lib/data/rent-market";

export const metadata: Metadata = {
  title: "Methodology — how our London rent & area data works",
  description:
    "How Where in London calculates commute estimates, rent estimates, affordability, lifestyle scores and neighbourhood rankings.",
  alternates: { canonical: `${SITE_URL}/methodology` },
  openGraph: {
    title: "Methodology — how our London rent & area data works",
    description:
      "Data sources, assumptions and limitations behind the Where in London neighbourhood finder.",
    url: `${SITE_URL}/methodology`,
    type: "article",
  },
};

export default function MethodologyPage() {
  const { oneBed, twoBed, count } = londonRentMedians();
  const roomRegionValues = Object.values(ROOM_REGION_AVERAGE_GBP);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Methodology",
        item: `${SITE_URL}/methodology`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-slate-950 text-slate-100">
        <nav className="border-b border-slate-800 px-6 py-4">
          <div className="mx-auto max-w-5xl flex items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              Where in London
            </Link>
            <span>/</span>
            <span className="text-slate-200">Methodology</span>
          </div>
        </nav>

        <main className="mx-auto max-w-5xl px-6 py-12">
          <header className="mb-12">
            <p className="mb-3 text-sm uppercase tracking-wide text-emerald-400">
              Data and assumptions
            </p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight">
              Methodology & data sources
            </h1>
            <p className="max-w-3xl text-lg text-slate-300">
              Where in London is a decision-support tool for choosing London
              areas. It combines public-transport estimates,
              neighbourhood-level rent estimates and lifestyle scores. It is
              not a live property portal, guaranteed route planner or financial
              advice.
            </p>
          </header>

          <div className="space-y-12">
            <MethodSection title="What is in the dataset">
              <p>
                The site covers {NEIGHBOURHOODS.length} London neighbourhoods
                across {LONDON_BOROUGHS.length} boroughs. Each area has a
                curated record: median one- and two-bed rents, transport zones
                and main stations, ten lifestyle scores, a centroid for route
                estimates, and a short editorial summary with strengths and
                trade-offs.
              </p>
              <p>
                Every comparison, ranking, commute estimate and rent guide is
                derived from this shared dataset so the public pages and the
                discovery tool stay consistent.
              </p>
            </MethodSection>

            <MethodSection title="Commute estimates">
              <p>
                The interactive finder sends the selected destination to{" "}
                <code>/api/commute</code>. Where available, the server requests
                public-transport durations from TfL Journey Planner and caches
                the origin/destination pair. If TfL cannot return a usable
                journey, the site falls back to a reviewed static matrix for
                common destinations or, where no reviewed pair exists, a
                distance-based estimate using {LONDON_TRANSIT_KMH} km/h as a
                typical London public-transport speed.
              </p>
              <p>
                Commute pages for {DESTINATIONS.length} common destinations use
                the same reviewed static matrix and label fallback estimates.
                Exact line-by-line instructions are not fabricated; users
                should verify precise door-to-door timings on TfL before
                arranging viewings.
              </p>
            </MethodSection>

            <MethodSection title="Rent data & review date">
              <p>
                One-bed and two-bed figures are median asking-rent estimates,
                reviewed as of{" "}
                <strong className="text-white">
                  <time dateTime={RENT_MARKET_REVIEW_AS_OF}>
                    {RENT_MARKET_REVIEW_AS_OF}
                  </time>
                </strong>
                . Across the {count} tracked areas, the current London-wide
                medians are about GBP {oneBed.toLocaleString()}/month for a
                one-bed and GBP {twoBed.toLocaleString()}/month for a two-bed.
              </p>
              <p>
                Room rents are derived from listing-sample regional averages
                and local overrides. Current regional average inputs range from
                GBP {Math.min(...roomRegionValues).toLocaleString("en-GB")} to
                GBP {Math.max(...roomRegionValues).toLocaleString("en-GB")} per
                month before neighbourhood adjustment.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                {RENT_MARKET_SOURCES.map((source) => (
                  <li key={source}>{source}</li>
                ))}
              </ul>
            </MethodSection>

            <MethodSection title="Salary and affordability">
              <p>
                Salary pages estimate England take-home pay from the personal
                allowance, income-tax bands and employee National Insurance
                rates, then show rent budgets at 33% and 35% of take-home pay.
                The calculation does not include pension contributions, student
                loans, benefits, council tax, utilities or the personal
                allowance taper above GBP 100,000.
              </p>
              <p>
                In the matching tool, an explicit monthly rent budget overrides
                salary-derived affordability. If a salary is used, the default
                rent budget is 35% of estimated monthly take-home pay.
              </p>
            </MethodSection>

            <MethodSection title="Lifestyle scores and rankings">
              <p>
                Each area is scored from 0 to 10 on{" "}
                {Object.values(LIFESTYLE_LABELS).join(", ").toLowerCase()}.
                These are relative ratings from manual review of each
                neighbourhood&apos;s amenities, open space, transport and
                character; they are directional decision signals, not official
                statistics.
              </p>
              <p>
                Rankings first exclude areas over the commute cap, then combine
                affordability and lifestyle. With default settings,
                affordability and lifestyle are weighted equally. If advanced
                lifestyle weights are set, affordability carries 60% and the
                selected lifestyle dimensions carry 40%, with weak matches
                demoted more strongly.
              </p>
            </MethodSection>

            <MethodSection title="Who is behind the site">
              <p>
                Where in London is an independent project, not affiliated with
                any estate agent, letting platform or local authority. Rankings
                are not influenced by listings or advertising; they come from
                the dataset and assumptions described on this page.
              </p>
            </MethodSection>

            <MethodSection title="Known limitations">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  A neighbourhood centroid cannot capture address-level walking
                  time or every station entrance.
                </li>
                <li>
                  TfL journey times vary by time of day, disruptions, closures,
                  access needs and walking speed.
                </li>
                <li>
                  Rent estimates compare areas, but individual listings vary by
                  exact street, condition, bills and tenancy terms.
                </li>
                <li>
                  Neighbourhood footprints are launch map polygons, not legal
                  or statistical boundaries.
                </li>
                <li>
                  Softer questions, such as whether an area feels expensive or
                  polished, use stated proxies rather than presenting them as
                  facts.
                </li>
              </ul>
            </MethodSection>

            <section className="rounded-xl border border-slate-700 bg-slate-900 p-8 text-center">
              <h2 className="mb-2 text-xl font-semibold">
                Use the data as a shortlist, then verify
              </h2>
              <p className="mb-6 text-slate-300">
                Compare a few candidate areas, check exact TfL routes for your
                commute and view actual listings before making a decision.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/"
                  className="rounded-lg bg-emerald-600 px-5 py-3 text-sm font-medium hover:bg-emerald-500 transition-colors"
                >
                  Open the finder
                </Link>
                <Link
                  href="/london-rent-index"
                  className="rounded-lg border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  London rent index
                </Link>
                <Link
                  href="/compare"
                  className="rounded-lg border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Compare areas
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

function MethodSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold tracking-tight">{title}</h2>
      <div className="space-y-4 text-slate-300">{children}</div>
    </section>
  );
}
