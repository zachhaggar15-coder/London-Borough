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
  const region = content.copy.regionLabel;

  return {
    title: `Compare ${region} areas side by side`,
    description: `Side-by-side comparisons of ${region} areas on rent, commute, green space and how lively they are.`,
    alternates: { canonical: content.url("/compare") },
  };
}

export default async function CityCompareIndexPage({ params }: Props) {
  const { city } = await params;
  if (!isContentCityId(city)) notFound();
  const content = getCityContent(city);

  const comparisons = content
    .compareSlugs()
    .map((slug) => content.getComparePageData(slug))
    .filter((c): c is NonNullable<typeof c> => c !== null);

  return (
    <PageShell>
      <CityBreadcrumbs content={content} trail={[{ label: "Compare" }]} />

      <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
        Compare {content.copy.regionLabel} areas
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
        {comparisons.length} side-by-side comparisons. {content.copy.compareIntro}
      </p>

      <Section title="Every comparison">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {comparisons.map((c) => (
            <Link
              key={c.slug}
              href={content.path(`/compare/${c.slug}`)}
              className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 transition-colors hover:border-slate-600"
            >
              <p className="text-sm font-medium">
                {c.a.name} vs {c.b.name}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                £{c.a.rent.oneBedMedianGbp.toLocaleString()} vs £
                {c.b.rent.oneBedMedianGbp.toLocaleString()} for a one-bed
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <DataNote>
        Each comparison sets the same figures against each other: rent at three
        levels, journey times to every destination tracked here, and the ten
        lifestyle scores. Where the two are close, the page says so rather than
        manufacturing a winner.
      </DataNote>
    </PageShell>
  );
}
