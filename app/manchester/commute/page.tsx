import type { Metadata } from "next";
import Link from "next/link";
import {
  getManchesterCommutePageData,
  manchesterPath,
  manchesterUrl,
} from "@/lib/manchester/seo-data";
import { MANCHESTER_DESTINATIONS } from "@/lib/manchester/data/destinations";
import { CITIES } from "@/lib/cities";
import {
  Breadcrumbs,
  DataNote,
  PageShell,
  Section,
} from "@/components/manchester/Pieces";

export const metadata: Metadata = {
  title: "Commuting in Greater Manchester: where to live for each destination",
  description:
    "Journey times from 57 Greater Manchester areas to Piccadilly, Spinningfields, MediaCityUK, Trafford Park, the airport and five more employment centres.",
  alternates: { canonical: manchesterUrl("/commute") },
};

export default function ManchesterCommuteIndexPage() {
  const destinations = MANCHESTER_DESTINATIONS.map((d) => {
    const data = getManchesterCommutePageData(d.id);
    return { destination: d, fastest: data?.ranked.slice(0, 3) ?? [] };
  });

  return (
    <PageShell>
      <Breadcrumbs
        trail={[
          { label: "Manchester", href: manchesterPath("/") },
          { label: "Commute" },
        ]}
      />

      <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
        Commuting in Greater Manchester
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
        The network here is strongly radial. Almost every area reaches
        Piccadilly and Victoria far more easily than it reaches anywhere else,
        and an orbital journey — Sale to Oldham, say — is frequently quicker by
        car than by any published public route. That makes where you work a
        much sharper constraint on where you can live than it is in a city with
        a dense rapid-transit network, so start from the destination.
      </p>

      <Section title="Ten places people commute to">
        <div className="grid gap-3 sm:grid-cols-2">
          {destinations.map(({ destination, fastest }) => (
            <Link
              key={destination.id}
              href={manchesterPath(`/commute/${destination.id}`)}
              className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 transition-colors hover:border-slate-600"
            >
              <p className="font-medium">{destination.label}</p>
              {fastest.length > 0 && (
                <p className="mt-1 text-xs text-slate-500">
                  Quickest:{" "}
                  {fastest
                    .map((r) => `${r.neighbourhood.name} (${r.minutes} min)`)
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
        They are not timetable times — a tram that runs Sale to St Peter&apos;s
        Square in 22 minutes is quoted here at 35, because nobody lives at the
        tram stop. There is no live journey planner behind these figures:{" "}
        {CITIES.manchester.transitAuthority} publishes no open routing API, so
        every figure here comes from the reviewed matrix. See the{" "}
        <Link
          href={manchesterPath("/methodology")}
          className="underline underline-offset-2 hover:text-slate-300"
        >
          methodology
        </Link>{" "}
        for how it is built and where it is weakest.
      </DataNote>
    </PageShell>
  );
}
