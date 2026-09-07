import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CONTENT_CITY_IDS,
  getCityContent,
  isContentCityId,
} from "@/lib/city-registry";
import {
  CityBreadcrumbs,
  DataNote,
  PageShell,
  Section,
} from "@/components/city/Pieces";

type Props = { params: Promise<{ city: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return CONTENT_CITY_IDS.map((city) => ({ city }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  if (!isContentCityId(city)) return {};
  const content = getCityContent(city);

  return {
    title: `${content.copy.regionLabel} guides`,
    description: `What ${content.copy.regionLabel} costs, how renting works here, how the transport actually behaves, and what to sort out in which order.`,
    alternates: { canonical: content.url("/guides") },
  };
}

export default async function CityGuidesPage({ params }: Props) {
  const { city } = await params;
  if (!isContentCityId(city)) notFound();
  const content = getCityContent(city);
  const guides = content.guidesByRecency();

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${content.copy.regionLabel} guides`,
    itemListElement: guides.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: guide.h1,
      url: content.url(`/guides/${guide.slug}`),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <PageShell>
        <CityBreadcrumbs content={content} trail={[{ label: "Guides" }]} />

        <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
          {content.copy.regionLabel} guides
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
          The rest of this section answers &ldquo;which area&rdquo;. These
          answer the questions that come before it: what things cost, how
          renting works here, how the transport network actually behaves, and
          what to sort out in which order.
        </p>

        <Section title={`${guides.length} guides`}>
          <div className="grid gap-4 sm:grid-cols-2">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={content.path(`/guides/${guide.slug}`)}
                className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-4 transition-colors hover:border-slate-600"
              >
                <p className="text-xs uppercase tracking-wide text-emerald-500">
                  {guide.category}
                </p>
                <p className="mt-1.5 font-medium">{guide.h1}</p>
                <p className="mt-1.5 text-sm text-slate-400">{guide.summary}</p>
                <p className="mt-2 text-xs text-slate-600">
                  {guide.readMinutes} min read
                </p>
              </Link>
            ))}
          </div>
        </Section>

        <DataNote>
          Every checkable figure in these guides carries a source and a review
          date, and the tables inside them read the same datasets as the rest
          of the site, so a rent revision updates the guides in the same
          deploy. Where a figure could not be corroborated against a source we
          were willing to publish, the guide says to check it rather than
          quoting it.
        </DataNote>
      </PageShell>
    </>
  );
}
