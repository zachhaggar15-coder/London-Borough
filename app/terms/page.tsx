import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo-data";
import {
  CONTACT_EMAIL,
  POLICY_LAST_UPDATED,
  SITE_NAME,
} from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of use",
  description:
    "The terms on which you may use Where in London, including the limits of the rent, commute and lifestyle estimates published on the site.",
  alternates: { canonical: `${SITE_URL}/terms` },
  openGraph: {
    title: "Terms of use | Where in London",
    description:
      "The terms on which you may use Where in London and the limits of its estimates.",
    url: `${SITE_URL}/terms`,
    type: "article",
  },
};

export default function TermsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Terms of use",
        item: `${SITE_URL}/terms`,
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
            <span className="text-slate-200">Terms of use</span>
          </div>
        </nav>

        <main className="mx-auto max-w-3xl px-6 py-12">
          <header className="mb-10">
            <h1 className="mb-4 text-4xl font-bold tracking-tight">
              Terms of use
            </h1>
            <p className="text-lg text-slate-300">
              By using {SITE_NAME} you agree to these terms. They are
              deliberately short.
            </p>
            <p className="mt-4 text-sm text-slate-500">
              Last updated{" "}
              <time dateTime={POLICY_LAST_UPDATED}>{POLICY_LAST_UPDATED}</time>
            </p>
          </header>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold">
              What this site provides
            </h2>
            <p className="text-slate-300">
              {SITE_NAME} publishes estimates and editorial commentary to help
              you narrow down which parts of London might suit you. It is a
              research and decision-support tool. It is not a property listing
              service, a letting agency, a route planner, or a provider of
              financial, legal, tax or mortgage advice.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold">
              Accuracy and limits of the data
            </h2>
            <div className="space-y-4 text-slate-300">
              <p>
                Rent figures are area-level estimates reviewed periodically, not
                live listings and not valuations of any particular property.
                Commute times are modelled estimates for a typical weekday and do
                not account for engineering works, strikes, disruption or time of
                day. Lifestyle scores are relative rankings derived from the
                inputs described in the{" "}
                <Link
                  href="/methodology"
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                >
                  methodology
                </Link>
                , not objective measures.
              </p>
              <p>
                The site is provided on an &ldquo;as is&rdquo; basis. While the
                data is compiled carefully and corrections are applied promptly,
                no warranty is given that it is accurate, complete or current.
                Verify anything that matters — rent against current listings,
                journeys against Transport for London, tax against HMRC — before
                relying on it.
              </p>
              <p>
                Decisions about where to live, what to pay and what to sign are
                yours. To the extent permitted by law, no liability is accepted
                for loss arising from reliance on the information here.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold">Acceptable use</h2>
            <p className="text-slate-300">
              You may read, link to and share these pages freely. You may not
              scrape the site at scale, republish its datasets or editorial
              content as your own, attempt to disrupt or overload it, or
              circumvent its rate limits. Automated access that degrades the
              service for others may be blocked.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold">
              Intellectual property
            </h2>
            <p className="text-slate-300">
              The editorial writing, scoring methodology, compiled datasets and
              design of this site belong to its operator. Station, line and
              borough names, and any third-party marks, belong to their
              respective owners and are used descriptively. Short quotations with
              a link back are welcome.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold">
              Advertising and external links
            </h2>
            <p className="text-slate-300">
              The site is funded by advertising served by third parties, as
              described in the{" "}
              <Link
                href="/privacy"
                className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
              >
                privacy policy
              </Link>
              . Advertisers have no influence over rankings or editorial content.
              Where pages link to external sites, those sites are not under this
              site&rsquo;s control and no responsibility is taken for their
              content or practices.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold">
              Changes and governing law
            </h2>
            <p className="text-slate-300">
              These terms may be updated; the date above shows the last revision,
              and continued use after a change means acceptance of it. They are
              governed by the laws of England and Wales, whose courts have
              exclusive jurisdiction.
            </p>
          </section>

          <section className="rounded-xl border border-slate-700 bg-slate-900 p-8">
            <h2 className="mb-2 text-xl font-semibold">Contact</h2>
            <p className="mb-6 text-slate-300">
              Questions about these terms, or a correction to report? Email{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-emerald-500"
            >
              Contact page
            </Link>
          </section>
        </main>
      </div>
    </>
  );
}
