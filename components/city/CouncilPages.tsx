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
import { money, moneyWithGbp } from "@/lib/currency";
import {
  AreaCard,
  CityBreadcrumbs,
  DataNote,
  LocalCostsTable,
  PageShell,
  ScrollTable,
  Section,
  TableHead,
} from "@/components/city/Pieces";

/**
 * The local-authority pages, written once.
 *
 * They are rendered from five different route folders — `/boroughs` for
 * the metropolitan regions, `/councils` for the unitary and Scottish
 * ones, and `/communes`, `/arrondissements` and `/districts` abroad —
 * because the URL segment has to match what the authorities are actually
 * called, and Manchester's `/boroughs` URLs are already indexed. The
 * route files are thin; everything is here.
 *
 * Two recurring-cost models coexist on these pages and the difference is
 * not decoration. The UK sections levy council tax on the occupier,
 * banded by 1991 property value. None of the international ones does:
 * Switzerland has no occupier property tax at all, France abolished
 * taxe d'habitation on main residences in 2023, and Spain's IBI falls on
 * the owner. Forcing the second group into the first would tell exactly
 * the wrong thing to exactly the reader this site exists for, so a city
 * without council tax shows what it actually pays instead.
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
    description: `Rent and local charges across the ${copy.regionLabel} ${plural} — ${input.councils.join(", ")}.`,
    alternates: {
      canonical: content.url(`/${content.city.councilSegment}`),
    },
  };
}

export function CouncilsIndexPage({ content }: { content: CityContent }) {
  const { input, copy } = content;
  const { councilTax } = content;
  const noun = input.councilNoun;
  const currency = input.currency;

  const rows = input.councils
    .map((council) => {
      const baseline =
        input.rent.baselines[input.rent.baselineForCouncil[council]];
      return {
        council,
        oneBed: baseline.oneBed,
        twoBed: baseline.twoBed,
        charge: councilTax?.bandD[council] ?? null,
        areas: content.areasInCouncil(council).length,
      };
    })
    .sort((a, b) => a.oneBed - b.oneBed);

  const cheapestRent = rows[0];
  const priciestRent = rows[rows.length - 1];

  const chargeColumn = councilTax ? "Band D" : null;

  // Only draw a "what the table shows" paragraph about the local charge
  // where there is one. In Paris and Barcelona a tenant pays nothing
  // equivalent, and inventing a comparison would be worse than silence.
  const byCharge = councilTax
    ? [...rows].filter((r) => r.charge != null).sort((a, b) => a.charge! - b.charge!)
    : [];

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
        title="Rent and local charges, side by side"
        lead={`Sorted cheapest to rent in. Rent figures are the published averages for the ${noun.singular} as a whole; individual areas inside each one vary widely.`}
      >
        <ScrollTable minWidth="40rem">
          <TableHead
            cells={[
              capitalise(noun.singular),
              "1-bed",
              "2-bed",
              ...(chargeColumn ? [chargeColumn] : []),
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
                  {money(row.oneBed, currency)}
                </td>
                <td className="py-2.5 pr-4 tabular-nums text-slate-300">
                  {money(row.twoBed, currency)}
                </td>
                {chargeColumn && (
                  <td className="py-2.5 pr-4 tabular-nums text-slate-300">
                    {row.charge != null ? money(row.charge, currency) : "—"}
                  </td>
                )}
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
            {priciestRent.council} averages{" "}
            {moneyWithGbp(priciestRent.oneBed, currency)} for a one-bed against{" "}
            {money(cheapestRent.oneBed, currency)} in {cheapestRent.council} — a
            gap of {money(priciestRent.oneBed - cheapestRent.oneBed, currency)} a
            month across a region you can cross in about an hour.
          </p>

          {councilTax && byCharge.length > 1 && (
            <p>
              Council tax does not follow rent.{" "}
              {byCharge[byCharge.length - 1].council} charges the most at Band D
              ({money(byCharge[byCharge.length - 1].charge!, currency)}) and{" "}
              {byCharge[0].council} the least (
              {money(byCharge[0].charge!, currency)}), a spread of{" "}
              {money(
                byCharge[byCharge.length - 1].charge! - byCharge[0].charge!,
                currency,
              )}{" "}
              a year. If you are weighing two {noun.plural} with similar rents,
              that difference is worth checking before you sign.
            </p>
          )}

          {(councilTax?.notes ?? []).map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      </Section>

      {content.localCosts && (
        <Section
          title={content.localCosts.heading}
          lead={content.localCosts.intro}
        >
          <LocalCostsTable content={content} />
        </Section>
      )}

      <DataNote>
        Rent figures are published averages for {input.rent.referenceMonth}
        {input.rent.note ? `. ${input.rent.note}` : "."}{" "}
        {councilTax
          ? `Council tax figures are the total Band D charge for ${councilTax.year}${
              councilTax.precept
                ? `, including the ${councilTax.precept.label} of ${money(councilTax.precept.bandD, currency)}`
                : ""
            }, cross-checked against two independent published comparison tables. Sources: ${councilTax.sources.join("; ")}.`
          : ""}
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
  const currency = content.input.currency;

  const title = `Living in ${data.name}: rent, local costs and where to look`;
  const description =
    `Renting in ${data.name}? One-bed rents average ${money(data.baseline.oneBed, currency)} a month` +
    (data.bandD != null
      ? ` and council tax is ${money(data.bandD, currency)} at Band D.`
      : ".") +
    ` ${data.areas.length} areas covered.`;

  return {
    title,
    description,
    alternates: {
      canonical: content.url(`/${content.city.councilSegment}/${slug}`),
    },
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
  const { councilTax } = content;
  const currency = input.currency;
  const noun = input.councilNoun;
  const { name, areas, baseline, cheapest, priciest, bandD, bandDRank } = data;
  const others = input.councils.filter((c) => c !== name);
  const bands = [...new Set(areas.map((a) => a.travelBand))].filter(Boolean);
  const total = input.councils.length;

  const rankPhrase =
    bandDRank == null
      ? null
      : bandDRank === 1
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
          {name} averages {moneyWithGbp(baseline.oneBed, currency)} a month for a
          one-bed and {money(baseline.twoBed, currency)} for a two-bed on the
          published figures.{" "}
          {bandD != null && rankPhrase
            ? `Council tax runs to ${money(bandD, currency)} at Band D, ${rankPhrase}. `
            : ""}
          Below are the {areas.length} areas covered here, and what separates
          them.
        </p>

        <Section
          title={`Areas in ${name}`}
          lead={
            areas.length > 1
              ? `Ranging from ${cheapest.name} at ${money(cheapest.rent.oneBedMedianGbp, currency)} for a one-bed to ${priciest.name} at ${money(priciest.rent.oneBedMedianGbp, currency)} — a spread of ${money(priciest.rent.oneBedMedianGbp - cheapest.rent.oneBedMedianGbp, currency)} a month inside a single ${noun.singular}.`
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

        {councilTax && bandD != null && (
          <Section
            title={`Council tax in ${name} for ${councilTax.year}`}
            lead="Every band derived from the Band D charge using the statutory ratios."
          >
            <ScrollTable minWidth="32rem">
              <TableHead
                cells={["Band", "1991 value", "Per year", "Per month"]}
              />
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
                        {councilTax.bandValues[band]}
                      </td>
                      <td className="py-2.5 pr-4 tabular-nums text-slate-300">
                        {currency.symbol}
                        {charge.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td className="py-2.5 tabular-nums text-slate-400">
                        {money(charge / 12, currency)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </ScrollTable>
            <div className="mt-5 max-w-3xl space-y-4 text-slate-300">
              {councilTax.notes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
          </Section>
        )}

        {content.localCosts && (
          <Section
            title={content.localCosts.heading}
            lead={content.localCosts.intro}
          >
            <LocalCostsTable content={content} />
          </Section>
        )}

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
          {capitalise(noun.singular)} rent figures are published averages for{" "}
          {input.rent.referenceMonth}; the area-level figures on the cards above
          are reviewed estimates against that baseline.{" "}
          {councilTax?.precept
            ? `The Band D charge includes the ${councilTax.precept.label} of ${money(councilTax.precept.bandD, currency)}. `
            : ""}
          {councilTax
            ? `Confirm the exact charge for a specific address with ${name} before budgeting against it. Sources: ${councilTax.sources.join("; ")}.`
            : ""}
        </DataNote>
      </PageShell>
    </>
  );
}
