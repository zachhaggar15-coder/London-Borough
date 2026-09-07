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
    title: `${region} by lifestyle`,
    description: `${content.input.lifestylePages.length} ways to rank ${region} areas — nightlife, food, green space, families, transport, quiet, value and young professionals.`,
    alternates: { canonical: content.url("/lifestyle") },
  };
}

export default async function CityLifestyleIndexPage({ params }: Props) {
  const { city } = await params;
  if (!isContentCityId(city)) notFound();
  const content = getCityContent(city);

  return (
    <PageShell>
      <CityBreadcrumbs content={content} trail={[{ label: "Lifestyle" }]} />

      <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
        {content.copy.regionLabel} by lifestyle
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
        {content.copy.lifestyleIntro}
      </p>

      <Section title="Pick a priority">
        <div className="grid gap-4 sm:grid-cols-2">
          {content.input.lifestylePages.map((page) => {
            const top = content.rankByLifestyle(page, 3);
            return (
              <Link
                key={page.slug}
                href={content.path(`/lifestyle/${page.slug}`)}
                className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-4 transition-colors hover:border-slate-600"
              >
                <p className="font-medium">{page.h1}</p>
                <p className="mt-1 text-xs text-slate-500">
                  Top three: {top.map((r) => r.area.name).join(", ")}
                </p>
              </Link>
            );
          })}
        </div>
      </Section>

      <DataNote>
        Every ranking is derived from the same ten 0–10 lifestyle scores held
        against each area, combined with different weights. The scores are
        editorial judgements informed by transport data, published crime and
        deprivation statistics and local knowledge — they are not survey
        results, and nothing here scores schools, which for the family ranking
        in particular is the gap worth knowing about.
      </DataNote>
    </PageShell>
  );
}
