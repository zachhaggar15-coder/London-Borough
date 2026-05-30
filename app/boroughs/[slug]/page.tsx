import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllBoroughSlugs,
  getBoroughPageData,
  boroughSlug,
  SITE_URL,
} from "@/lib/seo-data";
import { LIFESTYLE_LABELS } from "@/lib/types";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllBoroughSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getBoroughPageData(slug);
  if (!data) return {};

  const title = `Living in ${data.name} — rents, transport & neighbourhood guide`;
  const description = `${data.name} average 1-bed rent £${data.avgOneBedRent.toLocaleString()}/month. Transport zones ${data.zoneRange.join("–")}. Neighbourhoods, commute access, lifestyle profile and who it suits.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/boroughs/${slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/boroughs/${slug}`,
      type: "article",
    },
  };
}

export default async function BoroughPage({ params }: Props) {
  const { slug } = await params;
  const data = getBoroughPageData(slug);
  if (!data) notFound();

  const {
    name,
    neighbourhoods,
    avgOneBedRent,
    minOneBedRent,
    maxOneBedRent,
    avgTwoBedRent,
    transportLines,
    avgLifestyle,
    topStrengths,
    topTradeoffs,
    zoneRange,
    nearbyBoroughs,
  } = data;

  const topLifestyleCategories = (
    Object.entries(avgLifestyle) as [keyof typeof LIFESTYLE_LABELS, number][]
  )
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Boroughs", item: `${SITE_URL}/boroughs` },
      { "@type": "ListItem", position: 3, name, item: `${SITE_URL}/boroughs/${slug}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the average rent in ${name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The average 1-bedroom flat in ${name} costs around £${avgOneBedRent.toLocaleString()} per month. Prices range from £${minOneBedRent.toLocaleString()} to £${maxOneBedRent.toLocaleString()} depending on the specific area.`,
        },
      },
      {
        "@type": "Question",
        name: `Which transport zones is ${name} in?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${name} covers transport ${zoneRange.length > 1 ? "zones" : "zone"} ${zoneRange.join(" to ")}.`,
        },
      },
      {
        "@type": "Question",
        name: `What are the best neighbourhoods in ${name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Popular neighbourhoods in ${name} include ${neighbourhoods.slice(0, 4).map((n) => n.name).join(", ")}.`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-slate-950 text-slate-100">
        {/* Nav */}
        <nav className="border-b border-slate-800 px-6 py-4">
          <div className="mx-auto max-w-5xl flex items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              Where in London
            </Link>
            <span>/</span>
            <Link href="/boroughs" className="hover:text-white transition-colors">
              Boroughs
            </Link>
            <span>/</span>
            <span className="text-slate-200">{name}</span>
          </div>
        </nav>

        <main className="mx-auto max-w-5xl px-6 py-12">
          {/* Header */}
          <header className="mb-10">
            <p className="text-sm text-slate-400 mb-2">
              Zone{zoneRange.length > 1 ? "s" : ""} {zoneRange.join(", ")} ·{" "}
              {transportLines.slice(0, 3).join(", ")}
            </p>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Living in {name}
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl">
              {name} has {neighbourhoods.length} tracked{" "}
              {neighbourhoods.length === 1 ? "neighbourhood" : "neighbourhoods"}.
              Average 1-bed rent is{" "}
              <strong className="text-white">
                £{avgOneBedRent.toLocaleString()}/month
              </strong>
              , with prices ranging from £{minOneBedRent.toLocaleString()} to £
              {maxOneBedRent.toLocaleString()} depending on where you look.
            </p>
          </header>

          {/* Rent + Transport snapshot */}
          <section className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-12">
            {[
              {
                label: "Avg 1-bed rent",
                value: `£${avgOneBedRent.toLocaleString()}/mo`,
              },
              {
                label: "Avg 2-bed rent",
                value: `£${avgTwoBedRent.toLocaleString()}/mo`,
              },
              {
                label: "Transport zones",
                value: zoneRange.join("–"),
              },
              {
                label: "Neighbourhoods",
                value: String(neighbourhoods.length),
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-lg bg-slate-900 border border-slate-800 p-4"
              >
                <p className="text-xs text-slate-400 mb-1">{label}</p>
                <p className="text-xl font-semibold">{value}</p>
              </div>
            ))}
          </section>

          {/* Transport */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Transport</h2>
            <p className="text-slate-300 mb-4">
              {name} is served by the{" "}
              {transportLines.slice(0, -1).join(", ")}
              {transportLines.length > 1 ? " and " : ""}
              {transportLines[transportLines.length - 1]} lines.
            </p>
            <div className="flex flex-wrap gap-2">
              {transportLines.map((line) => (
                <span
                  key={line}
                  className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300"
                >
                  {line}
                </span>
              ))}
            </div>
          </section>

          {/* Lifestyle profile */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4">
              {name} lifestyle profile
            </h2>
            <p className="text-slate-300 mb-6">
              Based on scores across all {neighbourhoods.length} tracked
              areas in {name}.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {(
                Object.entries(avgLifestyle) as [
                  keyof typeof LIFESTYLE_LABELS,
                  number,
                ][]
              ).map(([key, score]) => (
                <div
                  key={key}
                  className="rounded-lg bg-slate-900 border border-slate-800 p-3"
                >
                  <p className="text-xs text-slate-400 mb-2">
                    {LIFESTYLE_LABELS[key]}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${score * 10}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium tabular-nums">
                      {score}/10
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Strengths + Tradeoffs */}
          <section className="grid sm:grid-cols-2 gap-6 mb-12">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {name} strengths
              </h2>
              <ul className="space-y-2">
                {topStrengths.map((s) => (
                  <li key={s} className="flex gap-2 text-slate-300">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Trade-offs</h2>
              <ul className="space-y-2">
                {topTradeoffs.map((t) => (
                  <li key={t} className="flex gap-2 text-slate-300">
                    <span className="text-amber-400 mt-0.5">→</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Neighbourhoods */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-6">
              Neighbourhoods in {name}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {neighbourhoods
                .sort(
                  (a, b) =>
                    a.rent.oneBedMedianGbp - b.rent.oneBedMedianGbp,
                )
                .map((n) => (
                  <Link
                    key={n.id}
                    href={`/neighbourhoods/${n.id}`}
                    className="rounded-lg bg-slate-900 border border-slate-800 p-5 hover:border-slate-600 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-white">{n.name}</h3>
                      <span className="text-sm text-slate-400">
                        £{n.rent.oneBedMedianGbp.toLocaleString()}/mo
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mb-3 line-clamp-2">
                      {n.summary}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {n.mainStations
                        .flatMap((s) => s.lines)
                        .slice(0, 3)
                        .map((line) => (
                          <span
                            key={line}
                            className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded"
                          >
                            {line}
                          </span>
                        ))}
                    </div>
                  </Link>
                ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-white mb-2">
                  What is the average rent in {name}?
                </h3>
                <p className="text-slate-300">
                  The average 1-bedroom flat in {name} costs around £
                  {avgOneBedRent.toLocaleString()} per month. Prices range from
                  £{minOneBedRent.toLocaleString()} to £
                  {maxOneBedRent.toLocaleString()} depending on the specific
                  neighbourhood.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-white mb-2">
                  What transport zones is {name} in?
                </h3>
                <p className="text-slate-300">
                  {name} covers transport{" "}
                  {zoneRange.length > 1 ? "zones" : "zone"}{" "}
                  {zoneRange.join(" to ")}, served by the{" "}
                  {transportLines.slice(0, 3).join(", ")}.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-white mb-2">
                  What type of area is {name}?
                </h3>
                <p className="text-slate-300">
                  {name} scores highest for{" "}
                  {topLifestyleCategories
                    .slice(0, 2)
                    .map(([k]) => LIFESTYLE_LABELS[k].toLowerCase())
                    .join(" and ")}
                  . {topStrengths[0]}.
                </p>
              </div>
            </div>
          </section>

          {/* Nearby boroughs */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4">
              Compare with nearby boroughs
            </h2>
            <div className="flex flex-wrap gap-3">
              {nearbyBoroughs.map((s) => (
                <Link
                  key={s}
                  href={`/boroughs/${s}`}
                  className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-2 text-sm hover:border-slate-600 transition-colors capitalize"
                >
                  {s.replace(/-/g, " ")}
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-xl bg-slate-900 border border-slate-700 p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">
              Find your ideal neighbourhood in {name}
            </h2>
            <p className="text-slate-300 mb-6">
              Enter your commute destination, salary and lifestyle preferences to
              get personalised neighbourhood rankings.
            </p>
            <Link
              href="/"
              className="inline-block rounded-lg bg-emerald-600 hover:bg-emerald-500 px-6 py-3 font-medium transition-colors"
            >
              Open the discovery tool →
            </Link>
          </section>
        </main>
      </div>
    </>
  );
}
