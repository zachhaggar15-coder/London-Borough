import type { Metadata } from "next";
import Link from "next/link";
import { NEIGHBOURHOODS } from "@/lib/data/neighbourhoods";
import { DESTINATIONS } from "@/lib/data/destinations";
import { SITE_URL } from "@/lib/seo-data";
import {
  CONTACT_EMAIL,
  PUBLISHER_DESCRIPTION,
  SITE_NAME,
} from "@/lib/site-config";
import {
  RENT_MARKET_REVIEW_AS_OF,
  RENT_MARKET_SOURCES,
} from "@/lib/data/rent-market";

export const metadata: Metadata = {
  title: "About Where in London — who makes this and why",
  description:
    "Who runs Where in London, why it exists, how it is funded, and what the data can and cannot tell you about choosing a London neighbourhood.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About Where in London — who makes this and why",
    description:
      "Who runs Where in London, why it exists, how it is funded, and what the data can and cannot tell you.",
    url: `${SITE_URL}/about`,
    type: "article",
  },
};

export default function AboutPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: `${SITE_URL}/about`,
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
              {SITE_NAME}
            </Link>
            <span>/</span>
            <span className="text-slate-200">About</span>
          </div>
        </nav>

        <main className="mx-auto max-w-3xl px-6 py-12">
          <header className="mb-12">
            <p className="mb-3 text-sm uppercase tracking-wide text-emerald-400">
              About this site
            </p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight">
              About {SITE_NAME}
            </h1>
            <p className="text-lg text-slate-300">
              {SITE_NAME} helps people work out which part of London actually
              suits them — by commute, by rent, and by what they want their week
              to look like — instead of guessing from property listings alone.
            </p>
          </header>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold">Why it exists</h2>
            <div className="space-y-4 text-slate-300">
              <p>
                Property portals are organised around individual flats. They are
                very good at telling you what a specific one-bed on a specific
                street costs, and almost useless at the question most people
                actually start with: which area should you be looking in at all?
              </p>
              <p>
                That question has three moving parts that interact — what you
                can afford, how long you are willing to travel, and what you want
                within walking distance. Change your rent ceiling by £150 a month
                and the realistic map of London shifts. Change your office from
                Canary Wharf to Paddington and it shifts again. This site exists
                to make those trade-offs visible before you start booking
                viewings.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold">Who runs it</h2>
            <div className="space-y-4 text-slate-300">
              <p>{PUBLISHER_DESCRIPTION}</p>
              <p>
                Every rent estimate, commute band and lifestyle score on the site
                was assembled and reviewed by hand rather than scraped and
                published unchecked. Where a figure is an estimate — and most of
                them are — the page says so, and the{" "}
                <Link
                  href="/methodology"
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                >
                  methodology page
                </Link>{" "}
                explains exactly how it was derived.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold">What the site covers</h2>
            <ul className="space-y-2 text-slate-300 list-disc pl-5">
              <li>
                <strong className="text-slate-100">
                  {NEIGHBOURHOODS.length} neighbourhood guides
                </strong>{" "}
                — rent, transport, lifestyle scores and an honest list of
                trade-offs for each area.
              </li>
              <li>
                <strong className="text-slate-100">
                  {DESTINATIONS.length} commute guides
                </strong>{" "}
                — where to live if you need to reach a given part of London
                regularly.
              </li>
              <li>
                <strong className="text-slate-100">Salary guides</strong> — what
                a given gross salary leaves you after UK tax and National
                Insurance, and what that realistically rents.
              </li>
              <li>
                <strong className="text-slate-100">Area comparisons</strong> —
                head-to-head write-ups for the pairs people genuinely weigh
                against each other.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold">
              Where the numbers come from
            </h2>
            <p className="mb-3 text-slate-300">
              Rent figures were last reviewed on{" "}
              <time dateTime={RENT_MARKET_REVIEW_AS_OF}>
                {RENT_MARKET_REVIEW_AS_OF}
              </time>
              , drawing on:
            </p>
            <ul className="space-y-2 text-slate-300 list-disc pl-5">
              {RENT_MARKET_SOURCES.map((source) => (
                <li key={source}>{source}</li>
              ))}
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold">What this site is not</h2>
            <div className="space-y-4 text-slate-300">
              <p>
                It is not a live property portal, and it does not list individual
                flats. It is not a guaranteed route planner — for live times and
                disruptions, use Transport for London. It is not financial, legal
                or mortgage advice, and the take-home pay calculations are
                illustrative rather than a substitute for proper tax advice.
              </p>
              <p>
                Rent estimates describe an area, not a property. Two flats on the
                same street can differ by hundreds of pounds a month on condition
                and size alone.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold">How it is funded</h2>
            <p className="text-slate-300">
              The site is free to use and is funded by advertising, which is why
              you may see ads on these pages. Advertising has no influence on
              which neighbourhoods rank where — the rankings are produced by the
              scoring functions described in the{" "}
              <Link
                href="/methodology"
                className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
              >
                methodology
              </Link>
              , and no area, agent or landlord can pay to be featured. See the{" "}
              <Link
                href="/privacy"
                className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
              >
                privacy policy
              </Link>{" "}
              for how advertising cookies are handled.
            </p>
          </section>

          <section className="rounded-xl border border-slate-700 bg-slate-900 p-8">
            <h2 className="mb-2 text-xl font-semibold">
              Spotted something wrong?
            </h2>
            <p className="mb-6 text-slate-300">
              Local knowledge beats a dataset. If a rent figure looks off, a
              station has changed, or an area description does not match how it
              actually feels to live there, please say so — corrections are
              genuinely welcome and get applied.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-emerald-500"
              >
                Get in touch
              </Link>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm text-slate-300 transition-colors hover:text-white"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
