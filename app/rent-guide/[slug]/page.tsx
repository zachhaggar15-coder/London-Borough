import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  boroughSlug,
  getAllNeighbourhoodSlugs,
  getRentGuidePageData,
  SITE_URL,
} from "@/lib/seo-data";
import {
  RENT_MARKET_REVIEW_AS_OF,
  RENT_MARKET_SOURCES,
} from "@/lib/data/rent-market";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllNeighbourhoodSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getRentGuidePageData(slug);
  if (!data) return {};

  const { neighbourhood: n, roomGbp, oneBedGbp, twoBedGbp } = data;
  const title = `${n.name} rent guide (2026): what's your flat worth?`;
  const description = `What's a flat in ${n.name} worth to rent? A room averages £${roomGbp.toLocaleString()}/mo, a one-bed £${oneBedGbp.toLocaleString()}/mo and a two-bed £${twoBedGbp.toLocaleString()}/mo. See what drives ${n.name} rents.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/rent-guide/${slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/rent-guide/${slug}`,
      type: "article",
    },
  };
}

export default async function RentGuidePage({ params }: Props) {
  const { slug } = await params;
  const data = getRentGuidePageData(slug);
  if (!data) notFound();

  const {
    neighbourhood: n,
    roomGbp,
    oneBedGbp,
    twoBedGbp,
    boroughName,
    boroughAvgOneBed,
    similarNeighbourhoods,
    relatedComparisonSlugs,
  } = data;

  const zoneStr =
    n.transportZones.length > 1
      ? `Zones ${n.transportZones.join(" & ")}`
      : `Zone ${n.transportZones[0]}`;

  const vsBorough = oneBedGbp - boroughAvgOneBed;
  const boroughComparison =
    vsBorough === 0
      ? `That's right in line with the ${boroughName} average of £${boroughAvgOneBed.toLocaleString()}/month.`
      : vsBorough > 0
      ? `That's about £${vsBorough.toLocaleString()}/month above the ${boroughName} average of £${boroughAvgOneBed.toLocaleString()}.`
      : `That's about £${Math.abs(vsBorough).toLocaleString()}/month below the ${boroughName} average of £${boroughAvgOneBed.toLocaleString()}.`;

  const rentRows: { label: string; value: number }[] = [
    { label: "Room in a shared flat", value: roomGbp },
    { label: "One-bed flat", value: oneBedGbp },
    { label: "Two-bed flat", value: twoBedGbp },
  ];

  // Single source for FAQ so visible copy and JSON-LD stay in sync.
  const faqItems: { question: string; answer: string }[] = [
    {
      question: `What's my ${n.name} flat worth to rent?`,
      answer: `In ${n.name} (${zoneStr}), a room in a shared flat rents for around £${roomGbp.toLocaleString()}/month, a one-bed flat for around £${oneBedGbp.toLocaleString()}/month, and a two-bed flat for around £${twoBedGbp.toLocaleString()}/month. ${boroughComparison}`,
    },
    {
      question: `How much is rent in ${n.name}?`,
      answer: `The average one-bed flat in ${n.name} costs about £${oneBedGbp.toLocaleString()}/month and a two-bed about £${twoBedGbp.toLocaleString()}/month. ${n.name} is in ${boroughName}, ${zoneStr}.`,
    },
    {
      question: `Is ${n.name} expensive to rent?`,
      answer:
        vsBorough > 0
          ? `${n.name} sits above its borough average — a one-bed runs about £${vsBorough.toLocaleString()}/month more than the ${boroughName} average of £${boroughAvgOneBed.toLocaleString()}.`
          : vsBorough < 0
          ? `${n.name} is relatively good value for ${boroughName} — a one-bed runs about £${Math.abs(vsBorough).toLocaleString()}/month below the borough average of £${boroughAvgOneBed.toLocaleString()}.`
          : `${n.name} is priced in line with the ${boroughName} average of £${boroughAvgOneBed.toLocaleString()}/month for a one-bed.`,
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Rent guides",
        item: `${SITE_URL}/rent-guide`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: n.name,
        item: `${SITE_URL}/rent-guide/${slug}`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
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
        <nav className="border-b border-slate-800 px-6 py-4">
          <div className="mx-auto max-w-5xl flex items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              Where in London
            </Link>
            <span>/</span>
            <Link
              href="/rent-guide"
              className="hover:text-white transition-colors"
            >
              Rent guides
            </Link>
            <span>/</span>
            <span className="text-slate-200">{n.name}</span>
          </div>
        </nav>

        <main className="mx-auto max-w-5xl px-6 py-12">
          {/* Header */}
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                {n.borough}
              </span>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                {zoneStr}
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              What&apos;s my {n.name} flat worth to rent?
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl">
              A quick, data-led {n.name} rent guide: typical asking rents for a
              room, a one-bed and a two-bed, how they compare to the{" "}
              {boroughName} average, and what pushes them up or down.
            </p>
          </header>

          {/* Rent table */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">
              Typical rents in {n.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {rentRows.map((row) => (
                <div
                  key={row.label}
                  className="rounded-lg bg-slate-900 border border-slate-800 p-5"
                >
                  <p className="text-xs text-slate-400 mb-1">{row.label}</p>
                  <p className="text-2xl font-semibold">
                    £{row.value.toLocaleString()}
                    <span className="text-sm text-slate-400 font-normal">
                      /mo
                    </span>
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-slate-300">{boroughComparison}</p>
            <p className="mt-2 text-xs text-slate-500">
              Median asking rents reviewed on{" "}
              <time dateTime={RENT_MARKET_REVIEW_AS_OF}>
                {RENT_MARKET_REVIEW_AS_OF}
              </time>{" "}
              from {RENT_MARKET_SOURCES[1]}. Figures are area estimates for
              guidance, not a property-level valuation.
            </p>
          </section>

          {/* Read next */}
          <section className="mb-12 flex flex-wrap gap-3">
            <Link
              href={`/neighbourhoods/${n.id}`}
              className="rounded-lg bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-sm font-medium transition-colors"
            >
              Full {n.name} area guide
            </Link>
            <Link
              href={`/boroughs/${boroughSlug(boroughName)}`}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
            >
              {boroughName} borough guide
            </Link>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {faqItems.map((item) => (
                <div key={item.question}>
                  <h3 className="font-medium text-white mb-2">
                    {item.question}
                  </h3>
                  <p className="text-slate-300">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Compare rents nearby */}
          {relatedComparisonSlugs.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4">
                Compare {n.name} rents with nearby areas
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {relatedComparisonSlugs.map((compSlug, i) => {
                  const other = similarNeighbourhoods[i];
                  if (!other) return null;
                  return (
                    <Link
                      key={compSlug}
                      href={`/compare/${compSlug}`}
                      className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-3 hover:border-slate-600 transition-colors"
                    >
                      <p className="font-medium text-sm">
                        {n.name} vs {other.name}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {other.borough} · £
                        {other.rent.oneBedMedianGbp.toLocaleString()}/mo 1-bed
                      </p>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="rounded-xl bg-slate-900 border border-slate-700 p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">
              Working out where you can afford?
            </h2>
            <p className="text-slate-300 mb-6">
              Enter your salary and lifestyle to see which London areas fit your
              budget — including {n.name}.
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
