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
import { LIFESTYLE_KEYS, LIFESTYLE_LABELS } from "@/lib/types";
import type { Neighbourhood } from "@/lib/types";
import type { CityContent } from "@/lib/city-content";
import {
  CityBreadcrumbs,
  DataNote,
  PageShell,
  ScrollTable,
  Section,
  TableHead,
} from "@/components/city/Pieces";

type Props = { params: Promise<{ city: string; slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return CONTENT_CITY_IDS.flatMap((city) =>
    getCityContent(city)
      .compareSlugs()
      .map((slug) => ({ city, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, slug } = await params;
  if (!isContentCityId(city)) return {};
  const content = getCityContent(city);
  const data = content.getComparePageData(slug);
  if (!data) return {};
  const currency = content.input.currency;

  const title = `${data.a.name} or ${data.b.name}? A straight comparison`;
  const description = `${data.a.name} vs ${data.b.name} on rent, commute and lifestyle. One-beds run ${money(data.a.rent.oneBedMedianGbp, currency)} against ${money(data.b.rent.oneBedMedianGbp, currency)}.`;

  return {
    title,
    description,
    alternates: { canonical: content.url(`/compare/${slug}`) },
    openGraph: {
      title,
      description,
      url: content.url(`/compare/${slug}`),
      type: "article",
    },
  };
}

/** A one-line verdict per dimension, which says "level" when it is level. */
function verdict(
  a: Neighbourhood,
  b: Neighbourhood,
  read: (n: Neighbourhood) => number,
  wording: { higher: string; lower: string; level: string },
  tolerance = 1,
): { text: string; decisive: boolean } {
  const diff = read(a) - read(b);
  if (Math.abs(diff) <= tolerance) return { text: wording.level, decisive: false };
  return { text: diff > 0 ? wording.higher : wording.lower, decisive: true };
}

/**
 * The single measure the two differ on most.
 *
 * Needed because the three headline verdicts — transport, green space,
 * how lively — can all come out level on a genuinely close pair, leaving
 * an intro that says nothing three times over. Falling back to the
 * biggest real gap keeps the paragraph worth reading, and when even that
 * gap is small the page says so outright rather than inventing a
 * distinction.
 */
function sharpestDifference(a: Neighbourhood, b: Neighbourhood): string {
  const [top] = LIFESTYLE_KEYS.map((key) => ({
    key,
    diff: a.lifestyle[key] - b.lifestyle[key],
  })).sort((x, y) => Math.abs(y.diff) - Math.abs(x.diff));

  if (Math.abs(top.diff) < 2) {
    return "On the measures tracked here the two are close enough that the choice comes down to which streets you prefer.";
  }

  const ahead = top.diff > 0 ? a : b;
  const behind = top.diff > 0 ? b : a;
  return `Where they part company is ${LIFESTYLE_LABELS[top.key].toLowerCase()}: ${ahead.name} scores ${ahead.lifestyle[top.key]}/10 against ${behind.lifestyle[top.key]}/10 for ${behind.name}.`;
}

function AreaSummaryCard({
  content,
  n,
}: {
  content: CityContent;
  n: Neighbourhood;
}) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
      <h3 className="text-lg font-semibold">
        <Link
          href={content.path(`/neighbourhoods/${n.id}`)}
          className="transition-colors hover:text-emerald-400"
        >
          {n.name}
        </Link>
      </h3>
      <p className="mt-1 text-xs text-slate-500">
        <Link
          href={content.councilPath(n.borough)}
          className="transition-colors hover:text-slate-300"
        >
          {n.borough}
        </Link>{" "}
        · {centralityLabel(n)}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-slate-300">{n.summary}</p>
      <ul className="mt-4 space-y-1.5 text-sm text-slate-400">
        {n.strengths.slice(0, 3).map((s) => (
          <li key={s} className="flex gap-2">
            <span aria-hidden="true" className="text-emerald-500">+</span>
            <span>{s}</span>
          </li>
        ))}
        {n.tradeoffs.slice(0, 2).map((t) => (
          <li key={t} className="flex gap-2">
            <span aria-hidden="true" className="text-amber-500">−</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function CityComparePage({ params }: Props) {
  const { city, slug } = await params;
  if (!isContentCityId(city)) notFound();
  const content = getCityContent(city);
  const currency = content.input.currency;
  const data = content.getComparePageData(slug);
  if (!data) notFound();

  const { a, b } = data;
  const aCommutes = content.commuteTimesFor(a);
  const bCommutes = content.commuteTimesFor(b);
  const anyDrive = aCommutes.some((c) => c.driveMinutes != null);
  const rentGap = Math.abs(a.rent.oneBedMedianGbp - b.rent.oneBedMedianGbp);
  // "Inside the margin of the estimate" has to scale with the currency:
  // 50 francs and 50 pounds are not the same claim about precision.
  const rentNoiseFloor = Math.round(50 * currency.perGbp);
  const related = [
    ...content.relatedComparisons(a.id, 3),
    ...content.relatedComparisons(b.id, 3),
  ].filter((s) => s !== slug);

  const rentLine =
    rentGap < rentNoiseFloor
      ? `Rent will not decide this. A one-bed runs ${money(a.rent.oneBedMedianGbp, currency)} in ${a.name} against ${money(b.rent.oneBedMedianGbp, currency)} in ${b.name} — inside the margin of the estimate itself.`
      : `${data.cheaper.name} is the cheaper of the two by about ${money(rentGap, currency)} a month on a one-bed, or roughly ${money((rentGap * 12), currency)} a year.`;

  const connectivityLine = verdict(a, b, (n) => n.lifestyle.connectivity, {
    higher: `${a.name} has the better transport of the two.`,
    lower: `${b.name} has the better transport of the two.`,
    level: "Transport is much of a muchness between them.",
  });

  const greenLine = verdict(a, b, (n) => n.lifestyle.greenSpace, {
    higher: `${a.name} is the greener.`,
    lower: `${b.name} is the greener.`,
    level: "Both have similar access to open space.",
  });

  const livelyLine = verdict(a, b, (n) => n.lifestyle.livelyVsQuiet, {
    higher: `${a.name} is the livelier; ${b.name} the quieter.`,
    lower: `${b.name} is the livelier; ${a.name} the quieter.`,
    level: "Neither is noticeably livelier than the other.",
  });

  // Three "they're about the same" sentences in a row tell the reader
  // nothing, so when none of the headline measures separates the pair we
  // go looking for the one that does.
  const decisiveLines = [connectivityLine, greenLine, livelyLine].filter(
    (line) => line.decisive,
  );
  const summaryLines =
    decisiveLines.length > 0
      ? decisiveLines.map((line) => line.text)
      : [sharpestDifference(a, b)];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: content.city.name, item: content.url("/") },
      { "@type": "ListItem", position: 2, name: "Compare", item: content.url("/compare") },
      {
        "@type": "ListItem",
        position: 3,
        name: `${a.name} vs ${b.name}`,
        item: content.url(`/compare/${slug}`),
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
            { label: "Compare", href: content.path("/compare") },
            { label: `${a.name} vs ${b.name}` },
          ]}
        />

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {a.name} or {b.name}?
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
          {rentLine} {summaryLines.join(" ")}
        </p>

        <Section title="The two, in their own words">
          <div className="grid gap-6 sm:grid-cols-2">
            <AreaSummaryCard content={content} n={a} />
            <AreaSummaryCard content={content} n={b} />
          </div>
        </Section>

        <Section title="Rent">
          <ScrollTable minWidth="28rem">
            <TableHead cells={["Per month", a.name, b.name]} />
            <tbody>
              {[
                { label: "Room in a share", read: content.roomRentFor },
                {
                  label: "One-bed flat",
                  read: (n: Neighbourhood) => n.rent.oneBedMedianGbp,
                },
                {
                  label: "Two-bed flat",
                  read: (n: Neighbourhood) => n.rent.twoBedMedianGbp,
                },
              ].map((row) => (
                <tr key={row.label} className="border-b border-slate-900">
                  <td className="py-2.5 pr-4 text-slate-400">{row.label}</td>
                  <td className="py-2.5 pr-4 tabular-nums text-slate-200">
                    {money(row.read(a), currency)}
                  </td>
                  <td className="py-2.5 tabular-nums text-slate-200">
                    {money(row.read(b), currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </ScrollTable>
        </Section>

        <Section
          title="Commute"
          lead="Typical weekday-morning door-to-door times to each destination tracked here."
        >
          <ScrollTable minWidth={anyDrive ? "38rem" : "30rem"}>
            <TableHead
              cells={
                anyDrive
                  ? [
                      "Destination",
                      `${a.name} transit`,
                      `${a.name} car`,
                      `${b.name} transit`,
                      `${b.name} car`,
                    ]
                  : ["Destination", a.name, b.name]
              }
            />
            <tbody>
              {aCommutes.map((row) => {
                const other = bCommutes.find((c) => c.id === row.id);
                return (
                  <tr key={row.id} className="border-b border-slate-900">
                    <td className="py-2.5 pr-4">
                      <Link
                        href={content.path(`/commute/${row.id}`)}
                        className="text-slate-300 transition-colors hover:text-emerald-400"
                      >
                        {row.label}
                      </Link>
                    </td>
                    <td className="py-2.5 pr-4 tabular-nums text-slate-200">
                      {row.minutes} min
                    </td>
                    {anyDrive && (
                      <td className="py-2.5 pr-4 tabular-nums text-slate-400">
                        {row.driveMinutes != null
                          ? `${row.driveMinutes} min`
                          : "—"}
                      </td>
                    )}
                    <td className="py-2.5 pr-4 tabular-nums text-slate-200">
                      {other ? `${other.minutes} min` : "—"}
                    </td>
                    {anyDrive && (
                      <td className="py-2.5 tabular-nums text-slate-400">
                        {other?.driveMinutes != null
                          ? `${other.driveMinutes} min`
                          : "—"}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </ScrollTable>
        </Section>

        <Section title="Lifestyle scores">
          <ScrollTable minWidth="28rem">
            <TableHead cells={["Measure", a.name, b.name]} />
            <tbody>
              {LIFESTYLE_KEYS.map((key) => (
                <tr key={key} className="border-b border-slate-900">
                  <td className="py-2.5 pr-4 text-slate-400">
                    {LIFESTYLE_LABELS[key]}
                  </td>
                  <td className="py-2.5 pr-4 tabular-nums text-slate-200">
                    {a.lifestyle[key]}
                  </td>
                  <td className="py-2.5 tabular-nums text-slate-200">
                    {b.lifestyle[key]}
                  </td>
                </tr>
              ))}
            </tbody>
          </ScrollTable>
        </Section>

        {related.length > 0 && (
          <Section title="Other comparisons">
            <div className="flex flex-wrap gap-3">
              {[...new Set(related)].map((s) => (
                <Link
                  key={s}
                  href={content.path(`/compare/${s}`)}
                  className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-sm capitalize transition-colors hover:border-slate-600"
                >
                  {s.replace(/-vs-/g, " vs ").replace(/-/g, " ")}
                </Link>
              ))}
            </div>
          </Section>
        )}

        <DataNote>
          Rents are reviewed estimates anchored on the published ONS{" "}
          {content.input.councilNoun.singular} averages; journey times are
          reviewed door-to-door estimates for a weekday morning. A gap of under
          {money(rentNoiseFloor, currency)} a month or five minutes is inside
          the margin of the method and should be read as level, which is why
          this page says so rather than picking a winner on it.
        </DataNote>
      </PageShell>
    </>
  );
}
