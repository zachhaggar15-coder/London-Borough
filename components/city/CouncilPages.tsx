import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  COUNCIL_TAX_BANDS,
  ordinal,
  spellNumber,
  type CityContent,
} from "@/lib/city-content";
import { centralityLabel } from "@/lib/centrality";
import {
  AreaCard,
  CityBreadcrumbs,
  DataNote,
  PageShell,
  ScrollTable,
  Section,
  TableHead,
} from "@/components/city/Pieces";

/**
 * The local-authority pages, written once.
 *
 * They are rendered from two different route folders — `/boroughs` for
 * the metropolitan regions and `/councils` for the unitary and Scottish
 * ones — because the URL segment has to match what the authorities are
 * actually called, and Manchester's `/boroughs` URLs are already indexed.
 * The route files are thin; everything is here.
 */

function capitalise(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

// ── Index ─────────────────────────────────────────────────────────

export function councilsIndexMetadata(content: CityContent): Metadata {
  const { input, copy } = content;
  const plural = input.councilNoun.plural;
  return {
    title: `The ${spellNumber(input.councils.length)} ${copy.regionLabel} ${plural} compared`,
    description: `Rent and council tax across the ${copy.regionLabel} ${plural} — ${input.councils.join(", ")}.`,
    alternates: {
      canonical: content.url(`/${content.city.councilSegment}`),
    },
  };
}

export function CouncilsIndexPage({ content }: { content: CityContent }) {
  const { input, copy } = content;
  const noun = input.councilNoun;

  const rows = input.councils
    .map((council) => {
      const baseline =
        input.rent.baselines[input.rent.baselineForCouncil[council]];
      return {
        council,
        oneBed: baseline.oneBed,
        twoBed: baseline.twoBed,
        bandD: input.councilTax.bandD[council],
        areas: content.areasInCouncil(council).length,
      };
    })
    .sort((a, b) => a.oneBed - b.oneBed);

  const cheapestRent = rows[0];
  const priciestRent = rows[rows.length - 1];
  const byTax = [...rows].sort((a, b) => a.bandD - b.bandD);
  const dearestTax = byTax[byTax.length - 1];
  const cheapestTax = byTax[0];
  const taxSpread = dearestTax.bandD - cheapestTax.bandD;

  return (
    <PageShell>
      <CityBreadcrumbs
        content={content}
        trail={[{ label: capitalise(noun.plural) }]}
      />

      <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
        The {spellNumber(input.councils.length)} {copy.regionLabel}{" "}
        {noun.plural}
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
        {copy.councilsIntro}
      </p>

      <Section
        title="Rent and council tax, side by side"
        lead={`Sorted cheapest to rent in. Rent figures are the published ONS averages for the ${noun.singular} as a whole; individual areas inside each one vary widely.`}
      >
        <ScrollTable minWidth="40rem">
          <TableHead
            cells={[
              capitalise(noun.singular),
              "1-bed (ONS)",
              "2-bed (ONS)",
              "Band D",
              "Areas covered",
            ]}
          />
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.council}
                className="border-b border-slate-900 transition-colors hover:bg-slate-900/60"
              >
                <td className="py-2.5 pr-4">
                  <Link
                    href={content.councilPath(row.council)}
                    className="font-medium transition-colors hover:text-emerald-400"
                  >
                    {row.council}
                  </Link>
                </td>
                <td className="py-2.5 pr-4 tabular-nums text-slate-300">
                  £{row.oneBed.toLocaleString()}
                </td>
                <td className="py-2.5 pr-4 tabular-nums text-slate-300">
                  £{row.twoBed.toLocaleString()}
                </td>
                <td className="py-2.5 pr-4 tabular-nums text-slate-300">
                  £{row.bandD.toLocaleString()}
                </td>
                <td className="py-2.5 tabular-nums text-slate-500">
                  {row.areas}
                </td>
              </tr>
            ))}
          </tbody>
        </ScrollTable>
      </Section>

      <Section title="What the table shows">
        <div className="max-w-3xl space-y-4 text-slate-300">
          <p>
            {priciestRent.council} averages £
            {priciestRent.oneBed.toLocaleString()} for a one-bed against £
            {cheapestRent.oneBed.toLocaleString()} in {cheapestRent.council} — a
            gap of £
            {(priciestRent.oneBed - cheapestRent.oneBed).toLocaleString()} a
            month across a region you can cross in about an hour.
          </p>
          <p>
            Council tax does not follow rent. {dearestTax.council} charges the
            most at Band D (£{dearestTax.bandD.toLocaleString()}) and{" "}
            {cheapestTax.council} the least (£
            {cheapestTax.bandD.toLocaleString()}), a spread of £
            {Math.round(taxSpread).toLocaleString()} a year. If you are
            weighing two {noun.plural} with similar rents, that difference is
            worth checking before you sign.
          </p>
          {input.councilTax.notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      </Section>

      <DataNote>
        Rent figures are ONS Price Index of Private Rents averages for{" "}
        {input.rent.referenceMonth}
        {input.rent.note ? ` ${input.rent.note}` : ""} Council tax figures are
        the total Band D charge for {input.councilTax.year}
        {input.councilTax.precept
          ? `, including the ${input.councilTax.precept.label} of £${input.councilTax.precept.bandD.toLocaleString()}`
          : ""}
        , cross-checked against two independent published comparison tables.
        Sources: {input.councilTax.sources.join("; ")}.
      </DataNote>
    </PageShell>
  );
}

// ── Detail ────────────────────────────────────────────────────────

export function councilDetailMetadata(
  content: CityContent,
  slug: string,
): Metadata {
  const data = content.getCouncilPageData(slug);
  if (!data) return {};

  const title = `Living in ${data.name}: rent, council tax and where to look`;
  const description = `Renting in ${data.name}? One-bed rents average £${data.baseline.oneBed.toLocaleString()} a month and council tax is £${data.bandD.toLocaleString()} at Band D. ${data.areas.length} areas covered.`;

  return {
    title,
    description,
    alternates: { canonical: content.url(`/${content.city.councilSegment}/${slug}`) },
    openGraph: {
      title,
      description,
      url: content.url(`/${content.city.councilSegment}/${slug}`),
      type: "article",
    },
  };
}

export function CouncilDetailPage({
  content,
  slug,
}: {
  content: CityContent;
  slug: string;
}) {
  const data = content.getCouncilPageData(slug);
  if (!data) notFound();

  const { input } = content;
  const noun = input.councilNoun;
  const { name, areas, baseline, cheapest, priciest, bandD, bandDRank } = data;
  const others = input.councils.filter((c) => c !== name);
  const bands = [...new Set(areas.map((a) => a.travelBand))].filter(Boolean);
  const total = input.councils.length;

  const rankPhrase =
    bandDRank === 1
      ? `the lowest of the ${spellNumber(total)}`
      : bandDRank === total
        ? `the highest of the ${spellNumber(total)}`
        : `${ordinal(bandDRank)} lowest of the ${spellNumber(total)}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: content.city.name, item: content.url("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: capitalise(noun.plural),
        item: content.url(`/${content.city.councilSegment}`),
      },
      {
        "@type": "ListItem",
        position: 3,
        name,
        item: content.url(`/${content.city.councilSegment}/${slug}`),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageShell>
        <CityBreadcrumbs
          content={content}
          trail={[
            {
              label: capitalise(noun.plural),
              href: content.path(`/${content.city.councilSegment}`),
            },
            { label: name },
          ]}
        />

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Living in {name}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
          {name} averages £{baseline.oneBed.toLocaleString()} a month for a
          one-bed and £{baseline.twoBed.toLocaleString()} for a two-bed on the
          published ONS figures. Council tax runs to £{bandD.toLocaleString()}{" "}
          at Band D, {rankPhrase}. Below are the {areas.length} areas covered
          here, and what separates them.
        </p>

        <Section
          title={`Areas in ${name}`}
          lead={
            areas.length > 1
              ? `Ranging from ${cheapest.name} at £${cheapest.rent.oneBedMedianGbp.toLocaleString()} for a one-bed to ${priciest.name} at £${priciest.rent.oneBedMedianGbp.toLocaleString()} — a spread of £${(priciest.rent.oneBedMedianGbp - cheapest.rent.oneBedMedianGbp).toLocaleString()} a month inside a single ${noun.singular}.`
              : undefined
          }
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {areas.map((n) => (
              <AreaCard
                key={n.id}
                content={content}
                area={n}
                // The card already shows the travel band on its pill, so
                // the note carries the station instead of repeating it.
                note={n.mainStations[0]?.name ?? undefined}
              />
            ))}
          </div>
        </Section>

        <Section
          title={`Council tax in ${name} for ${input.councilTax.year}`}
          lead="Every band derived from the Band D charge using the statutory ratios."
        >
          <ScrollTable minWidth="32rem">
            <TableHead cells={["Band", "1991 value", "Per year", "Per month"]} />
            <tbody>
              {COUNCIL_TAX_BANDS.map((band) => {
                const charge = content.bandCharge(name, band) ?? 0;
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
                      {input.councilTax.bandValues[band]}
                    </td>
                    <td className="py-2.5 pr-4 tabular-nums text-slate-300">
                      £
                      {charge.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="py-2.5 tabular-nums text-slate-400">
                      £{Math.round(charge / 12).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </ScrollTable>
          <div className="mt-5 max-w-3xl space-y-4 text-slate-300">
            {input.councilTax.notes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
        </Section>

        {bands.length > 1 && (
          <Section title={`How far out ${name} sits`}>
            <p className="max-w-3xl text-slate-300">
              {name} spans{" "}
              {areas
                .map((a) => centralityLabel(a).toLowerCase())
                .filter((v, i, arr) => arr.indexOf(v) === i)
                .join(", ")}{" "}
              on the travel bands used here, which is why a single{" "}
              {noun.singular} average tells you so little. Pick the area rather
              than the {noun.singular}.
            </p>
          </Section>
        )}

        <Section title={`The other ${spellNumber(others.length)}`}>
          <div className="flex flex-wrap gap-3">
            {others.map((council) => (
              <Link
                key={council}
                href={content.councilPath(council)}
                className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-sm transition-colors hover:border-slate-600"
              >
                {council}
              </Link>
            ))}
          </div>
        </Section>

        <DataNote>
          {capitalise(noun.singular)} rent figures are ONS Price Index of
          Private Rents averages for {input.rent.referenceMonth}; the
          area-level figures on the cards above are reviewed estimates against
          that baseline.{" "}
          {input.councilTax.precept
            ? `The Band D charge includes the ${input.councilTax.precept.label} of £${input.councilTax.precept.bandD.toLocaleString()}. `
            : ""}
          Confirm the exact charge for a specific address with {name} before
          budgeting against it. Sources: {input.councilTax.sources.join("; ")}.
        </DataNote>
      </PageShell>
    </>
  );
}
