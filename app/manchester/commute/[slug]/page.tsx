import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllManchesterCommuteSlugs,
  getManchesterCommutePageData,
  manchesterPath,
  manchesterUrl,
} from "@/lib/manchester/seo-data";
import { MANCHESTER_DESTINATIONS } from "@/lib/manchester/data/destinations";
import { boroughSlug } from "@/lib/manchester/boroughs";
import { TRAVEL_BAND_LABELS } from "@/lib/manchester/travel-band";
import { COMMUTE_SOURCE_LABELS } from "@/lib/manchester/commute";
import {
  Breadcrumbs,
  DataNote,
  PageShell,
  Section,
} from "@/components/manchester/Pieces";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllManchesterCommuteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getManchesterCommutePageData(slug);
  if (!data) return {};

  const { destination, ranked } = data;
  const title = `Best areas for commuting to ${destination.label}`;
  const description = `Where to live if you work at ${destination.label}: 57 Greater Manchester areas ranked by journey time, with rents. Quickest is ${ranked[0].neighbourhood.name} at about ${ranked[0].minutes} minutes.`;

  return {
    title,
    description,
    alternates: { canonical: manchesterUrl(`/commute/${slug}`) },
    openGraph: { title, description, url: manchesterUrl(`/commute/${slug}`), type: "article" },
  };
}

export default async function ManchesterCommutePage({ params }: Props) {
  const { slug } = await params;
  const data = getManchesterCommutePageData(slug);
  if (!data) notFound();

  const { destination, ranked } = data;
  const others = MANCHESTER_DESTINATIONS.filter((d) => d.id !== slug);

  const under30 = ranked.filter((r) => r.minutes <= 30);
  const cheapestUnder30 = [...under30].sort(
    (a, b) => a.neighbourhood.rent.oneBedMedianGbp - b.neighbourhood.rent.oneBedMedianGbp,
  )[0];

  // The pick worth making: cheapest area still inside half an hour. A pure
  // journey-time ranking always puts the city centre first, which is true
  // and useless — everyone already knows the centre is close to the centre.
  const valuePick = cheapestUnder30;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Manchester", item: manchesterUrl("/") },
      { "@type": "ListItem", position: 2, name: "Commute", item: manchesterUrl("/commute") },
      { "@type": "ListItem", position: 3, name: destination.label, item: manchesterUrl(`/commute/${slug}`) },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageShell>
        <Breadcrumbs
          trail={[
            { label: "Manchester", href: manchesterPath("/") },
            { label: "Commute", href: manchesterPath("/commute") },
            { label: destination.label },
          ]}
        />

        <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
          Best areas for commuting to {destination.label}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
          {ranked.length} Greater Manchester areas ranked by how long it takes
          to reach {destination.label} on a weekday morning, door to door.{" "}
          {under30.length} of them come in at half an hour or under.
          {valuePick && (
            <>
              {" "}
              The one worth a second look is {valuePick.neighbourhood.name}: about{" "}
              {valuePick.minutes} minutes, at £
              {valuePick.neighbourhood.rent.oneBedMedianGbp.toLocaleString()} a
              month for a one-bed — the cheapest area inside that window.
            </>
          )}
        </p>

        <Section
          title="Ranked by journey time"
          lead="Ties are broken by rent, so the cheaper of two equally quick areas comes first."
        >
          <div className="-mx-6 overflow-x-auto px-6">
            <table className="w-full min-w-[38rem] border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th scope="col" className="py-2 pr-4 font-medium">Area</th>
                  <th scope="col" className="py-2 pr-4 font-medium">Journey</th>
                  <th scope="col" className="py-2 pr-4 font-medium">1-bed</th>
                  <th scope="col" className="py-2 pr-4 font-medium">Borough</th>
                  <th scope="col" className="py-2 font-medium">Band</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((row) => (
                  <tr
                    key={row.neighbourhood.id}
                    className="border-b border-slate-900 transition-colors hover:bg-slate-900/60"
                  >
                    <td className="py-2.5 pr-4">
                      <Link
                        href={manchesterPath(`/neighbourhoods/${row.neighbourhood.id}`)}
                        className="font-medium transition-colors hover:text-emerald-400"
                      >
                        {row.neighbourhood.name}
                      </Link>
                    </td>
                    <td className="py-2.5 pr-4 tabular-nums text-slate-300">
                      {row.minutes} min
                    </td>
                    <td className="py-2.5 pr-4 tabular-nums text-slate-300">
                      £{row.neighbourhood.rent.oneBedMedianGbp.toLocaleString()}
                    </td>
                    <td className="py-2.5 pr-4 text-slate-400">
                      <Link
                        href={manchesterPath(`/boroughs/${boroughSlug(row.neighbourhood.borough)}`)}
                        className="transition-colors hover:text-slate-200"
                      >
                        {row.neighbourhood.borough}
                      </Link>
                    </td>
                    <td className="py-2.5 text-xs text-slate-500">
                      {TRAVEL_BAND_LABELS[row.neighbourhood.travelBand]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Other destinations">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((d) => (
              <Link
                key={d.id}
                href={manchesterPath(`/commute/${d.id}`)}
                className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm transition-colors hover:border-slate-600"
              >
                Commuting to {d.label}
              </Link>
            ))}
          </div>
        </Section>

        <DataNote>
          All {ranked.length} figures on this page are{" "}
          {COMMUTE_SOURCE_LABELS[ranked[0].source].toLowerCase()}s: typical
          weekday-morning door-to-door times including the walk at each end and
          a realistic wait, not timetable times. They will be wrong for you if
          you cycle, drive, or travel outside the peak. Treat a five-minute
          difference between two areas as noise.
        </DataNote>
      </PageShell>
    </>
  );
}
