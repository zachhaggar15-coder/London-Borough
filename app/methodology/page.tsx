import type { Metadata } from "next";
import Link from "next/link";
import { DESTINATIONS } from "@/lib/data/destinations";
import {
  RENT_MARKET_REVIEW_AS_OF,
  RENT_MARKET_SOURCES,
  ROOM_REGION_AVERAGE_GBP,
} from "@/lib/data/rent-market";
import { NEIGHBOURHOODS } from "@/lib/data/neighbourhoods";
import { LONDON_TRANSIT_KMH } from "@/lib/isochrone";
import { SITE_URL } from "@/lib/seo-data";

export const metadata: Metadata = {
  title: "Where in London methodology",
  description:
    "How Where in London calculates commute estimates, rent estimates, affordability, lifestyle scores and neighbourhood rankings.",
  alternates: { canonical: `${SITE_URL}/methodology` },
  openGraph: {
    title: "Where in London methodology",
    description:
      "Data sources, assumptions and limitations behind the Where in London neighbourhood finder.",
    url: `${SITE_URL}/methodology`,
    type: "article",
  },
};

export default function MethodologyPage() {
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
              Where in London methodology
            </h1>
            <p className="max-w-3xl text-lg text-slate-300">
              The site is a decision-support tool for choosing London areas. It
              combines public-transport estimates, neighbourhood-level rent
              estimates and lifestyle scores. It is not a live property portal,
              a guaranteed route planner or financial advice.
            </p>
          </header>

          <div className="space-y-12">
            <MethodSection title="Commute estimates">
              <p>
                The interactive finder sends the selected destination to{" "}
                <code>/api/commute</code>. By default the server requests
                public-transport durations from TfL Journey Planner, then caches
                the origin/destination pair. If TfL cannot return a usable
                journey for a pair, the site falls back to a reviewed static
                matrix for common destinations or, where no reviewed pair
                exists, a distance-based estimate using{" "}
                {LONDON_TRANSIT_KMH} km/h as a typical London public-transport
                speed.
              </p>
              <p>
                Commute cards deliberately distinguish access, public transport,
                interchange and final walking. Exact line-by-line instructions
                are not fabricated. The route explainer only renders a named
                direct service when the origin station metadata and destination
                station metadata match a reviewed direct-service combination.
                Otherwise it shows a typical structure and tells users to verify
                the exact route on TfL before arranging viewings.
              </p>
              <p>
                Commute pages for {DESTINATIONS.length} common destinations use
                the same reviewed static matrix and label fallback estimates.
                They are useful for comparison, not for live disruption status.
              </p>
            </MethodSection>

            <MethodSection title="Neighbourhood geography">
              <p>
                Each of the {NEIGHBOURHOODS.length} neighbourhoods has a curated
                centroid used for routing, ranking and map positioning. The
                centroid is intended to represent the practical middle of the
                area for a renter, usually near the main station or local centre,
                not every possible address in the neighbourhood.
              </p>
              <p>
                Borough boundaries come from official London local-authority
                boundary data. Neighbourhood footprints are launch polygons for
                map display; they are not legal or statistical boundaries.
              </p>
            </MethodSection>

            <MethodSection title="Rent estimates">
              <p>
                One-bed and two-bed values are neighbourhood-level monthly
                market-review estimates. They are designed for comparing areas,
                not predicting the price of a specific listing. Rent data was
                last reviewed on{" "}
                <time dateTime={RENT_MARKET_REVIEW_AS_OF}>
                  {RENT_MARKET_REVIEW_AS_OF}
                </time>
                .
              </p>
              <p>
                Room rents are derived from listing-sample regional averages and
                local overrides. Current regional average inputs range from GBP{" "}
                {Math.min(...Object.values(ROOM_REGION_AVERAGE_GBP)).toLocaleString(
                  "en-GB",
                )}{" "}
                to GBP{" "}
                {Math.max(...Object.values(ROOM_REGION_AVERAGE_GBP)).toLocaleString(
                  "en-GB",
                )}{" "}
                per month before neighbourhood adjustment.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                {RENT_MARKET_SOURCES.map((source) => (
                  <li key={source}>{source}</li>
                ))}
              </ul>
            </MethodSection>

            <MethodSection title="Salary and affordability">
              <p>
                Salary pages estimate England take-home pay from current
                personal allowance, income-tax bands and employee National
                Insurance rates, then show rent budgets at 33% and 35% of
                take-home pay. The calculation does not include pension
                contributions, student loans, benefits, council tax, utilities
                or the personal-allowance taper above GBP 100,000.
              </p>
              <p>
                In the matching tool, an explicit monthly rent budget overrides
                salary-derived affordability. If a salary is used, the default
                rent budget is 35% of estimated monthly take-home pay.
              </p>
            </MethodSection>

            <MethodSection title="Lifestyle scores and rankings">
              <p>
                Lifestyle dimensions are scored from 0 to 10 for liveliness,
                green space, nightlife, cafes, gyms, walkability, food, young
                professional density, safety and connectivity. The scores are
                curated for relative comparison between London neighbourhoods.
              </p>
              <p>
                Rankings first exclude areas over the commute cap, then combine
                affordability and lifestyle. With default settings, affordability
                and lifestyle are weighted equally. If a user sets advanced
                lifestyle weights, affordability carries 60% and the selected
                lifestyle dimensions carry 40%, with weak matches demoted more
                strongly.
              </p>
            </MethodSection>

            <MethodSection title="Known limitations">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  A neighbourhood centroid cannot capture address-level walking
                  time or every station entrance.
                </li>
                <li>
                  TfL journey times can vary by time of day, disruptions,
                  closures, access needs and walking speed.
                </li>
                <li>
                  Static commute pages are comparative estimates and should not
                  be read as live routing.
                </li>
                <li>
                  Rent estimates use available public and visible-market data,
                  but individual listings can vary materially by condition,
                  exact street, bills and tenancy terms.
                </li>
                <li>
                  Lifestyle scores are directional decision signals, not
                  official statistics.
                </li>
              </ul>
            </MethodSection>

            <section className="rounded-xl border border-slate-700 bg-slate-900 p-8 text-center">
              <h2 className="mb-2 text-xl font-semibold">
                Use the data as a shortlist, then verify
              </h2>
              <p className="mb-6 text-slate-300">
                The best next step is to compare a few candidate areas, check
                exact TfL routes for your commute time and view actual listings.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/"
                  className="rounded-lg bg-emerald-600 px-5 py-3 text-sm font-medium hover:bg-emerald-500 transition-colors"
                >
                  Open the finder
                </Link>
                <Link
                  href="/compare"
                  className="rounded-lg border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Compare areas
                </Link>
              </div>
            </section>

            <section className="text-sm text-slate-500">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
                External references
              </h2>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://tfl.gov.uk/info-for/open-data-users/api-documentation"
                  className="hover:text-slate-300"
                >
                  TfL API documentation
                </a>
                <a
                  href="https://www.ons.gov.uk/peoplepopulationandcommunity/housing/methodologies/priceindexofprivaterentsqmi"
                  className="hover:text-slate-300"
                >
                  ONS private rent methodology
                </a>
                <a
                  href="https://www.gov.uk/income-tax-rates"
                  className="hover:text-slate-300"
                >
                  GOV.UK income tax rates
                </a>
                <a
                  href="https://www.gov.uk/national-insurance-rates-letters"
                  className="hover:text-slate-300"
                >
                  GOV.UK National Insurance rates
                </a>
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
