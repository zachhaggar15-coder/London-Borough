import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllManchesterBoroughSlugs,
  getManchesterBoroughPageData,
  manchesterPath,
  manchesterUrl,
} from "@/lib/manchester/seo-data";
import { GM_BOROUGHS, boroughSlug } from "@/lib/manchester/boroughs";
import { ONS_RENT_REFERENCE_MONTH } from "@/lib/manchester/data/rent-market";
import {
  BAND_RATIOS,
  COUNCIL_TAX_BANDS,
  BAND_VALUE_RANGES,
  GM_MAYORAL_PRECEPT_BAND_D,
  MANCHESTER_COUNCIL_TAX_YEAR,
  bandChargeFor,
} from "@/lib/manchester/data/council-tax";
import { TRAVEL_BAND_LABELS } from "@/lib/travel-band";
import {
  AreaCard,
  Breadcrumbs,
  DataNote,
  PageShell,
  Section,
} from "@/components/manchester/Pieces";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllManchesterBoroughSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getManchesterBoroughPageData(slug);
  if (!data) return {};

  const title = `Living in ${data.name}: rent, council tax and where to look`;
  const description = `Renting in ${data.name}? One-bed rents average £${data.onsOneBed.toLocaleString()} a month and council tax is £${data.bandD.toLocaleString()} at Band D. ${data.neighbourhoods.length} areas covered.`;

  return {
    title,
    description,
    alternates: { canonical: manchesterUrl(`/boroughs/${slug}`) },
    openGraph: { title, description, url: manchesterUrl(`/boroughs/${slug}`), type: "article" },
  };
}

export default async function ManchesterBoroughPage({ params }: Props) {
  const { slug } = await params;
  const data = getManchesterBoroughPageData(slug);
  if (!data) notFound();

  const { name, neighbourhoods, onsOneBed, onsTwoBed, cheapest, priciest, bandD, bandDRank } = data;
  const others = GM_BOROUGHS.filter((b) => b !== name);
  const bands = [...new Set(neighbourhoods.map((n) => n.travelBand))];

  const rankPhrase =
    bandDRank === 1
      ? "the lowest of the ten"
      : bandDRank === 10
        ? "the highest of the ten"
        : `${bandDRank}th lowest of the ten`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Manchester", item: manchesterUrl("/") },
      { "@type": "ListItem", position: 2, name: "Boroughs", item: manchesterUrl("/boroughs") },
      { "@type": "ListItem", position: 3, name, item: manchesterUrl(`/boroughs/${slug}`) },
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
            { label: "Boroughs", href: manchesterPath("/boroughs") },
            { label: name },
          ]}
        />

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Living in {name}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
          {name} averages £{onsOneBed.toLocaleString()} a month for a one-bed
          and £{onsTwoBed.toLocaleString()} for a two-bed on the published ONS
          figures. Council tax runs to £{bandD.toLocaleString()} at Band D,{" "}
          {rankPhrase}. Below are the {neighbourhoods.length} areas of the
          borough covered here, and what separates them.
        </p>

        <Section
          title="Areas in the borough"
          lead={
            neighbourhoods.length > 1
              ? `Ranging from ${cheapest.name} at £${cheapest.rent.oneBedMedianGbp.toLocaleString()} for a one-bed to ${priciest.name} at £${priciest.rent.oneBedMedianGbp.toLocaleString()} — a spread of £${(priciest.rent.oneBedMedianGbp - cheapest.rent.oneBedMedianGbp).toLocaleString()} a month inside a single borough.`
              : undefined
          }
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {neighbourhoods.map((n) => (
              <AreaCard
                key={n.id}
                neighbourhood={n}
                note={`${TRAVEL_BAND_LABELS[n.travelBand]} · ${n.mainStations[0].name}`}
              />
            ))}
          </div>
        </Section>

        <Section
          title={`Council tax in ${name} for ${MANCHESTER_COUNCIL_TAX_YEAR}`}
          lead="Every band derived from the Band D charge using the statutory national ratios."
        >
          <div className="-mx-6 overflow-x-auto px-6">
            <table className="w-full min-w-[32rem] border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th scope="col" className="py-2 pr-4 font-medium">Band</th>
                  <th scope="col" className="py-2 pr-4 font-medium">1991 value</th>
                  <th scope="col" className="py-2 pr-4 font-medium">Per year</th>
                  <th scope="col" className="py-2 font-medium">Per month</th>
                </tr>
              </thead>
              <tbody>
                {COUNCIL_TAX_BANDS.map((band) => {
                  const charge = bandChargeFor(name, band) ?? 0;
                  return (
                    <tr
                      key={band}
                      className={
                        band === "D"
                          ? "border-b border-slate-900 bg-slate-900/60"
                          : "border-b border-slate-900"
                      }
                    >
                      <td className="py-2.5 pr-4 font-medium">Band {band}</td>
                      <td className="py-2.5 pr-4 text-slate-500">
                        {BAND_VALUE_RANGES[band]}
                      </td>
                      <td className="py-2.5 pr-4 tabular-nums text-slate-300">
                        £{charge.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-2.5 tabular-nums text-slate-400">
                        £{Math.round(charge / 12).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-5 max-w-3xl text-slate-300">
            Bands are still based on what a property was worth on 1 April 1991,
            not on what it is worth now — the single most common point of
            confusion about the tax. Band D is the statutory reference band at
            9/9; every other band is a fixed national multiple of it, so the
            ratios above hold in every borough. Most Greater Manchester housing
            sits in bands A to C, so a typical bill here comes in below the
            Band D figure.
          </p>
        </Section>

        {bands.length > 1 && (
          <Section title="How far out the borough sits">
            <p className="max-w-3xl text-slate-300">
              {name} spans {bands.map((b) => TRAVEL_BAND_LABELS[b].toLowerCase()).join(", ")}{" "}
              on the travel bands used here, which is why a single borough
              average tells you so little. Pick the area rather than the
              borough.
            </p>
          </Section>
        )}

        <Section title="The other nine">
          <div className="flex flex-wrap gap-3">
            {others.map((borough) => (
              <Link
                key={borough}
                href={manchesterPath(`/boroughs/${boroughSlug(borough)}`)}
                className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-sm transition-colors hover:border-slate-600"
              >
                {borough}
              </Link>
            ))}
          </div>
        </Section>

        <DataNote>
          Borough rent figures are ONS Price Index of Private Rents averages for{" "}
          {ONS_RENT_REFERENCE_MONTH}; the area-level figures on the cards above
          are reviewed estimates against that baseline. The Band D charge
          includes the Greater Manchester Mayoral precept of £
          {GM_MAYORAL_PRECEPT_BAND_D.toLocaleString()} and excludes any parish
          or town council precept. Confirm the exact charge for a specific
          address with {name} Council before budgeting against it. Band
          multipliers are statutory (Local Government Finance Act 1992, s.5),
          ranging from {(BAND_RATIOS.A * 9).toFixed(0)}/9 at Band A to{" "}
          {(BAND_RATIOS.H * 9).toFixed(0)}/9 at Band H.
        </DataNote>
      </PageShell>
    </>
  );
}
