import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { money } from "@/lib/currency";
import {
  CONTENT_CITY_IDS,
  getCityContent,
  isContentCityId,
} from "@/lib/city-registry";
import { centralityLabel } from "@/lib/centrality";
import {
  CityBreadcrumbs,
  DataNote,
  PageShell,
  Section,
} from "@/components/city/Pieces";

type Props = { params: Promise<{ city: string; slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return CONTENT_CITY_IDS.flatMap((city) =>
    getCityContent(city).input.lifestylePages.map((p) => ({
      city,
      slug: p.slug,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, slug } = await params;
  if (!isContentCityId(city)) return {};
  const content = getCityContent(city);
  const page = content.getLifestylePage(slug);
  if (!page) return {};

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: content.url(`/lifestyle/${slug}`) },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: content.url(`/lifestyle/${slug}`),
      type: "article",
    },
  };
}

export default async function CityLifestylePage({ params }: Props) {
  const { city, slug } = await params;
  if (!isContentCityId(city)) notFound();
  const content = getCityContent(city);
  const currency = content.input.currency;
  const page = content.getLifestylePage(slug);
  if (!page) notFound();

  const ranked = content.rankByLifestyle(page, 15);
  const others = content.input.lifestylePages.filter((p) => p.slug !== slug);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: page.h1,
    itemListElement: ranked.slice(0, 10).map((row, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: row.area.name,
      url: content.url(`/neighbourhoods/${row.area.id}`),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <PageShell>
        <CityBreadcrumbs
          content={content}
          trail={[
            { label: "Lifestyle", href: content.path("/lifestyle") },
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
              const n = row.area;
              return (
                <li key={n.id}>
                  <Link
                    href={content.path(`/neighbourhoods/${n.id}`)}
                    className="flex gap-4 rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 transition-colors hover:border-slate-600"
                  >
                    <span className="w-6 shrink-0 pt-0.5 text-sm tabular-nums text-slate-500">
                      {index + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="font-medium">{n.name}</span>
                        <span className="shrink-0 text-sm text-slate-400">
                          {money(n.rent.oneBedMedianGbp, currency)}
                        </span>
                      </span>
                      <span className="mt-1 block text-xs text-slate-500">
                        {n.borough} · {centralityLabel(n)}
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
                href={content.path(`/lifestyle/${p.slug}`)}
                className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm transition-colors hover:border-slate-600"
              >
                {p.h1}
              </Link>
            ))}
          </div>
        </Section>

        <Section title="Browse another way">
          <div className="flex flex-wrap gap-3 text-sm">
            {[
              { href: "/neighbourhoods", label: "All areas by travel band" },
              { href: "/rent-index", label: "Everything ranked by rent" },
              { href: "/commute", label: "Ranked by commute" },
            ].map((link) => (
              <Link
                key={link.href}
                href={content.path(link.href)}
                className="rounded-lg border border-slate-700 px-4 py-2 transition-colors hover:border-slate-500"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </Section>

        <DataNote>
          {page.note ??
            "Derived from the ten lifestyle scores held against each area, weighted for this particular priority. The scores are editorial judgements informed by transport data, published crime and deprivation statistics and local knowledge, not survey results."}{" "}
          Rents are reviewed estimates against the ONS{" "}
          {content.input.councilNoun.singular} averages — see the{" "}
          <Link
            href={content.path("/methodology")}
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
