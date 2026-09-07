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
    title: `Commuting in ${region}: where to live for each destination`,
    description: `Journey times from ${content.areas.length} ${region} areas to ${content.input.destinations.length} employment centres, ranked.`,
    alternates: { canonical: content.url("/commute") },
  };
}

export default async function CityCommuteIndexPage({ params }: Props) {
  const { city } = await params;
  if (!isContentCityId(city)) notFound();
  const content = getCityContent(city);
  const { input, copy } = content;

  const destinations = input.destinations.map((d) => {
    const data = content.getCommutePageData(d.id);
    return { destination: d, fastest: data?.ranked.slice(0, 3) ?? [] };
  });

  return (
    <PageShell>
      <CityBreadcrumbs content={content} trail={[{ label: "Commute" }]} />

      <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
        Commuting in {copy.regionLabel}
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
        {copy.commuteIntro}
      </p>

      <Section title={`${input.destinations.length} places people commute to`}>
        <div className="grid gap-3 sm:grid-cols-2">
          {destinations.map(({ destination, fastest }) => (
            <Link
              key={destination.id}
              href={content.path(`/commute/${destination.id}`)}
              className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 transition-colors hover:border-slate-600"
            >
              <p className="font-medium">{destination.label}</p>
              {fastest.length > 0 && (
                <p className="mt-1 text-xs text-slate-500">
                  Quickest:{" "}
                  {fastest
                    .map((r) => `${r.area.name} (${r.minutes} min)`)
                    .join(", ")}
                </p>
              )}
            </Link>
          ))}
        </div>
      </Section>

      <DataNote>
        Times are reviewed door-to-door estimates for a weekday morning:
        walking to the stop, waiting, riding, and walking off at the other end.
        They are not timetable times. There is no live journey planner behind
        these figures — {content.city.transitAuthority} publishes no open
        routing API, so every figure here comes from the reviewed matrix. See
        the{" "}
        <Link
          href={content.path("/methodology")}
          className="underline underline-offset-2 hover:text-slate-300"
        >
          methodology
        </Link>{" "}
        for how it is built and where it is weakest.
      </DataNote>
    </PageShell>
  );
}
