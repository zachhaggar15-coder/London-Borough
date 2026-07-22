import type { Metadata } from "next";
import Link from "next/link";
import { NEIGHBOURHOODS } from "@/lib/data/neighbourhoods";
import { LONDON_BOROUGHS } from "@/lib/commute-details";
import { LIFESTYLE_LABELS } from "@/lib/types";
import { londonRentMedians, SITE_URL } from "@/lib/seo-data";
import {
  RENT_MARKET_REVIEW_AS_OF,
  RENT_MARKET_SOURCES,
} from "@/lib/data/rent-market";

export const metadata: Metadata = {
  title: "Methodology — how our London rent & area data works",
  description:
    "How Where in London sources rent data, derives lifestyle scores and estimates commute times — including the review date and the limits of the data.",
  alternates: { canonical: `${SITE_URL}/methodology` },
  openGraph: {
    title: "Methodology — how our London rent & area data works",
    description:
      "How Where in London sources rent data, derives lifestyle scores and estimates commute times.",
    url: `${SITE_URL}/methodology`,
    type: "article",
  },
};

export default function MethodologyPage() {
  const { oneBed, twoBed, count } = londonRentMedians();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="border-b border-slate-800 px-6 py-4">
        <div className="mx-auto max-w-3xl flex items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">
            Where in London
          </Link>
          <span>/</span>
          <span className="text-slate-200">Methodology</span>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Methodology & data sources
          </h1>
          <p className="text-lg text-slate-300">
            Where in London helps people choose a London neighbourhood by
            commute, rent and lifestyle. This page explains where the numbers
            come from, how the scores are built, and what the data can and
            can&apos;t tell you.
          </p>
        </header>

        <div className="space-y-10 text-slate-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              What&apos;s in the dataset
            </h2>
            <p>
              The site covers {NEIGHBOURHOODS.length} London neighbourhoods
              across {LONDON_BOROUGHS.length} boroughs. Each area has a curated
              record: median one- and two-bed rents, transport zones and main
              stations, ten lifestyle scores, and a short editorial summary with
              strengths and trade-offs. Everything shown on the site — every
              comparison, ranking, commute estimate and rent guide — is derived
              from this single dataset.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              Rent data & review date
            </h2>
            <p className="mb-3">
              Rent figures are median asking rents, reviewed as of{" "}
              <strong className="text-white">
                <time dateTime={RENT_MARKET_REVIEW_AS_OF}>
                  {RENT_MARKET_REVIEW_AS_OF}
                </time>
              </strong>
              . They are neighbourhood-level estimates for orientation, not
              property-level valuations. Across the {count} tracked areas the
              current London-wide medians are about £{oneBed.toLocaleString()}
              /month for a one-bed and £{twoBed.toLocaleString()}/month for a
              two-bed. Sources:
            </p>
            <ul className="space-y-2">
              {RENT_MARKET_SOURCES.map((source) => (
                <li key={source} className="flex gap-2">
                  <span className="text-emerald-400">-</span>
                  {source}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              How lifestyle scores are derived
            </h2>
            <p className="mb-3">
              Each area is scored 0–10 on ten dimensions:{" "}
              {Object.values(LIFESTYLE_LABELS).join(", ").toLowerCase()}. These
              are relative, comparable-across-areas ratings from manual review
              of each neighbourhood&apos;s amenities, open space, transport and
              character — not survey data. They power the lifestyle rankings and
              the &quot;who each area suits&quot; guidance.
            </p>
            <p>
              Where the site answers softer questions — for example &quot;is an
              area posh?&quot; — it says so transparently and uses a stated
              proxy (rent percentile plus relevant lifestyle scores) rather than
              presenting it as a fact.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              How commute times are estimated
            </h2>
            <p>
              Where a curated station-to-destination time exists, it is used
              directly. Otherwise commute times are estimated from the
              straight-line distance between area centroids at an average
              transit speed, and are labelled as estimates on the page. They are
              a planning guide — real journeys with interchanges can take
              longer. For a precise door-to-door time, always check a live
              journey planner.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              Who&apos;s behind the site
            </h2>
            <p>
              Where in London is an independent project, not affiliated with any
              estate agent, letting platform or local authority. It exists to
              make choosing a London area less overwhelming by putting rent,
              transport and lifestyle side by side. Because it&apos;s
              independent, the rankings aren&apos;t influenced by listings or
              advertising — they come straight from the dataset described above.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              Limits of the data
            </h2>
            <p>
              Rents move, and neighbourhoods vary street by street — a median
              can&apos;t capture that. Lifestyle scores are judgements, not
              measurements. Treat everything here as a well-informed starting
              point for your own research, not the final word.
            </p>
          </section>

          <section className="rounded-lg bg-slate-900 border border-slate-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-2">
              Explore the data
            </h2>
            <p className="mb-4 text-sm">
              See every area&apos;s median rents in one place, or start from the
              discovery tool.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/london-rent-index"
                className="rounded-lg bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-sm font-medium transition-colors"
              >
                London rent index →
              </Link>
              <Link
                href="/neighbourhoods"
                className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
              >
                All neighbourhoods
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
