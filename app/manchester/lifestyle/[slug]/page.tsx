import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MANCHESTER_LIFESTYLE_PAGES,
  getManchesterLifestylePage,
  manchesterPath,
  manchesterUrl,
  rankByLifestyle,
} from "@/lib/manchester/seo-data";
import { TRAVEL_BAND_LABELS } from "@/lib/travel-band";
import {
  Breadcrumbs,
  DataNote,
  PageShell,
  Section,
} from "@/components/manchester/Pieces";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return MANCHESTER_LIFESTYLE_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getManchesterLifestylePage(slug);
  if (!page) return {};

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: manchesterUrl(`/lifestyle/${slug}`) },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: manchesterUrl(`/lifestyle/${slug}`),
      type: "article",
    },
  };
}

export default async function ManchesterLifestylePage({ params }: Props) {
  const { slug } = await params;
  const page = getManchesterLifestylePage(slug);
  if (!page) notFound();

  const ranked = rankByLifestyle(page, 15);
  const others = MANCHESTER_LIFESTYLE_PAGES.filter((p) => p.slug !== slug);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: page.h1,
    itemListElement: ranked.slice(0, 10).map((row, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: row.neighbourhood.name,
      url: manchesterUrl(`/neighbourhoods/${row.neighbourhood.id}`),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <PageShell>
        <Breadcrumbs
          trail={[
            { label: "Manchester", href: manchesterPath("/") },
            { label: "Lifestyle", href: manchesterPath("/lifestyle") },
            { label: page.h1.replace(/^Best |^Quietest |^Greenest /, "") },
          ]}
        />

        <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
          {page.h1}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
          {page.intro}
        </p>

        <Section title="The ranking">
          <ol className="space-y-3">
            {ranked.map((row, index) => {
              const n = row.neighbourhood;
              return (
                <li key={n.id}>
                  <Link
                    href={manchesterPath(`/neighbourhoods/${n.id}`)}
                    className="flex gap-4 rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 transition-colors hover:border-slate-600"
                  >
                    <span className="w-6 shrink-0 pt-0.5 text-sm tabular-nums text-slate-500">
                      {index + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="font-medium">{n.name}</span>
                        <span className="shrink-0 text-sm text-slate-400">
                          £{n.rent.oneBedMedianGbp.toLocaleString()}
                        </span>
                      </span>
                      <span className="mt-1 block text-xs text-slate-500">
                        {n.borough} · {TRAVEL_BAND_LABELS[n.travelBand]}
                      </span>
                      <span className="mt-2 block text-sm text-slate-400">
                        {n.summary}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </Section>

        <Section title="Other ways to cut it">
          <div className="grid gap-3 sm:grid-cols-2">
            {others.map((p) => (
              <Link
                key={p.slug}
                href={manchesterPath(`/lifestyle/${p.slug}`)}
                className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm transition-colors hover:border-slate-600"
              >
                {p.h1}
              </Link>
            ))}
          </div>
        </Section>

        <Section title="Browse another way">
          <div className="flex flex-wrap gap-3 text-sm">
            <Link
              href={manchesterPath("/neighbourhoods")}
              className="rounded-lg border border-slate-700 px-4 py-2 transition-colors hover:border-slate-500"
            >
              All areas by travel band
            </Link>
            <Link
              href={manchesterPath("/rent-index")}
              className="rounded-lg border border-slate-700 px-4 py-2 transition-colors hover:border-slate-500"
            >
              Everything ranked by rent
            </Link>
            <Link
              href={manchesterPath("/commute")}
              className="rounded-lg border border-slate-700 px-4 py-2 transition-colors hover:border-slate-500"
            >
              Ranked by commute
            </Link>
          </div>
        </Section>

        <DataNote>
          {slug === "value"
            ? "Value here combines transport, food, green space, safety and café density, then damps the result by rent. It is deliberately not a straight score-per-pound: dividing by rent outright just sorts by cheapest, which would put Wigan and Rochdale at the top and make this page a duplicate of the rent index."
            : slug === "families"
              ? "This ranking captures safety, green space and walkability. It does not score schools, which for most families is the deciding factor — treat it as a shortlist to check catchments against rather than a ranking of schools."
              : "Derived from the ten lifestyle scores held against each area, weighted for this particular priority. The scores are editorial judgements informed by transport data, published crime and deprivation statistics and local knowledge, not survey results."}{" "}
          Rents are reviewed estimates against the ONS borough averages — see
          the{" "}
          <Link
            href={manchesterPath("/methodology")}
            className="underline underline-offset-2 hover:text-slate-300"
          >
            methodology
          </Link>
          .
        </DataNote>
      </PageShell>
    </>
  );
}
