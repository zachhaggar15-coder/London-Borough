import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CONTENT_CITY_IDS,
  getCityContent,
  isContentCityId,
} from "@/lib/city-registry";
import type { CityContent, SalaryAreaFit } from "@/lib/city-content";
import { centralityLabel } from "@/lib/centrality";
import {
  CityBreadcrumbs,
  DataNote,
  PageShell,
  ScrollTable,
  Section,
  TableHead,
} from "@/components/city/Pieces";

type Props = { params: Promise<{ city: string; amount: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return CONTENT_CITY_IDS.flatMap((city) =>
    getCityContent(city).input.salaryLevels.map((amount) => ({
      city,
      amount: String(amount),
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, amount } = await params;
  if (!isContentCityId(city)) return {};
  const content = getCityContent(city);
  const salary = Number(amount);
  if (!content.isSalaryLevel(salary)) return {};

  const data = content.getSalaryPageData(salary);
  const formatted = `£${salary.toLocaleString()}`;
  const region = content.copy.regionLabel;
  const title = `Where to live in ${region} on a ${formatted} salary`;
  const description = `On ${formatted} you take home about £${data.takeHomeMonthly.toLocaleString()} a month, giving a rent budget near £${data.budget35.toLocaleString()}. ${data.comfortable.length} of ${content.areas.length} ${region} areas fit inside it.`;

  return {
    title,
    description,
    alternates: { canonical: content.url(`/salary/${amount}`) },
    openGraph: {
      title,
      description,
      url: content.url(`/salary/${amount}`),
      type: "article",
    },
  };
}

function FitTable({
  content,
  rows,
}: {
  content: CityContent;
  rows: SalaryAreaFit[];
}) {
  const councilHeading =
    content.input.councilNoun.singular.charAt(0).toUpperCase() +
    content.input.councilNoun.singular.slice(1);

  return (
    <ScrollTable minWidth="34rem">
      <TableHead
        cells={["Area", "Rent", "Share of take-home", councilHeading]}
      />
      <tbody>
        {rows.map((row) => (
          <tr
            key={row.area.id}
            className="border-b border-slate-900 transition-colors hover:bg-slate-900/60"
          >
            <td className="py-2.5 pr-4">
              <Link
                href={content.path(`/neighbourhoods/${row.area.id}`)}
                className="font-medium transition-colors hover:text-emerald-400"
              >
                {row.area.name}
              </Link>
              <span className="ml-2 text-xs text-slate-600">
                {centralityLabel(row.area)}
              </span>
            </td>
            <td className="py-2.5 pr-4 tabular-nums text-slate-300">
              £{row.rentGbp.toLocaleString()}
            </td>
            <td className="py-2.5 pr-4 tabular-nums text-slate-300">
              {Math.round(row.shareOfTakeHome * 100)}%
            </td>
            <td className="py-2.5 text-slate-400">
              <Link
                href={content.councilPath(row.area.borough)}
                className="transition-colors hover:text-slate-200"
              >
                {row.area.borough}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </ScrollTable>
  );
}

export default async function CitySalaryPage({ params }: Props) {
  const { city, amount } = await params;
  if (!isContentCityId(city)) notFound();
  const content = getCityContent(city);
  const salary = Number(amount);
  if (!content.isSalaryLevel(salary)) notFound();

  const { copy, input } = content;
  const region = copy.regionLabel;
  const total = content.areas.length;
  const data = content.getSalaryPageData(salary);
  const {
    takeHomeMonthly,
    budget33,
    budget35,
    comfortable,
    stretch,
    roomShare,
    roomShareWithinBudget,
    cheapestOneBed,
  } = data;

  const formatted = `£${salary.toLocaleString()}`;
  const others = input.salaryLevels.filter((s) => s !== salary);

  // The dearest areas now within reach, for the high-salary branch below.
  const topOfRange = comfortable[comfortable.length - 1] ?? cheapestOneBed;
  const secondFromTop = comfortable[comfortable.length - 2] ?? topOfRange;

  // The honest headline. On the lower rungs no one-bed fits, and the page
  // has to say so plainly rather than padding the list with places that
  // would take half your income.
  const verdict =
    comfortable.length === 0
      ? `On ${formatted} no one-bed in ${region} fits inside the 35% guideline. The cheapest anywhere is ${cheapestOneBed.area.name} at £${cheapestOneBed.rentGbp.toLocaleString()}, which would take ${Math.round(cheapestOneBed.shareOfTakeHome * 100)}% of your take-home. Sharing is the realistic route at this salary, and it is a perfectly normal one here.`
      : comfortable.length === 1
        ? `On ${formatted} exactly one area fits inside the guideline for a one-bed: ${comfortable[0].area.name}, at £${comfortable[0].rentGbp.toLocaleString()} a month. A room in a share opens up a great deal more.`
        : comfortable.length >= total * 0.85
          // Name what the salary newly unlocks, not the cheapest areas.
          // The London page made exactly this mistake and told a £150,000
          // reader they could afford Romford. At this level the useful
          // information is the top of the range, not the bottom.
          ? `On ${formatted} rent stops being the constraint: ${comfortable.length} of the ${total} areas fit a one-bed inside the guideline, ${topOfRange.area.name} at £${topOfRange.rentGbp.toLocaleString()} among them. The question becomes commute and character rather than affordability — this is the salary at which the centre, ${secondFromTop.area.name} and the rest of the inner ring are genuinely open to you.`
          : `On ${formatted}, ${comfortable.length} of the ${total} areas covered here fit a one-bed inside the 35% guideline, from ${comfortable[0].area.name} at £${comfortable[0].rentGbp.toLocaleString()} upwards.`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the take-home pay on ${formatted}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `About £${takeHomeMonthly.toLocaleString()} a month after income tax and National Insurance, before pension contributions or student loan repayments. That gives a rent budget of roughly £${budget33.toLocaleString()} at 33% or £${budget35.toLocaleString()} at 35%.`,
        },
      },
      {
        "@type": "Question",
        name: `Where can you afford to live in ${content.city.name} on ${formatted}?`,
        acceptedAnswer: { "@type": "Answer", text: verdict },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: content.city.name, item: content.url("/") },
      { "@type": "ListItem", position: 2, name: "Salary", item: content.url("/salary") },
      {
        "@type": "ListItem",
        position: 3,
        name: formatted,
        item: content.url(`/salary/${amount}`),
      },
    ],
  };

  return (
    <>
      {[faqSchema, breadcrumbSchema].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <PageShell>
        <CityBreadcrumbs
          content={content}
          trail={[
            { label: "Salary", href: content.path("/salary") },
            { label: formatted },
          ]}
        />

        <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
          Where to live in {region} on {formatted}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
          {verdict}
        </p>

        <Section title="What the salary is actually worth">
          <dl className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Take-home", value: takeHomeMonthly },
              { label: "Rent at 33%", value: budget33 },
              { label: "Rent at 35%", value: budget35 },
            ].map((row) => (
              <div
                key={row.label}
                className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3"
              >
                <dt className="text-xs uppercase tracking-wide text-slate-500">
                  {row.label}
                </dt>
                <dd className="mt-1 text-xl font-semibold tabular-nums">
                  £{row.value.toLocaleString()}
                  <span className="ml-1 text-sm font-normal text-slate-500">
                    /month
                  </span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 max-w-3xl text-slate-300">
            The 35% figure is a ceiling, not a target. At that level you can
            still absorb a boiler failure or a month between jobs; past 45% you
            are one unexpected bill from a problem.
          </p>
        </Section>

        {comfortable.length > 0 && (
          <Section
            title={`One-beds inside your budget (${comfortable.length})`}
            lead="Cheapest first. Every area here takes 35% or less of your take-home."
          >
            <FitTable content={content} rows={comfortable} />
          </Section>
        )}

        {stretch.length > 0 && (
          <Section
            title={`A stretch, but doable (${stretch.length})`}
            lead="Between 35% and 45% of take-home. Workable if you have no other commitments and a stable income, uncomfortable if you have either."
          >
            <FitTable content={content} rows={stretch} />
          </Section>
        )}

        <Section
          title="Rooms in a share"
          lead={
            roomShareWithinBudget.length > 0
              ? `${roomShareWithinBudget.length} areas have a typical room inside your budget. Rooms often include bills and council tax, which is worth £120 to £200 a month you are not separately paying.`
              : "Even sharing is tight at this salary. The cheapest rooms are below, but check carefully what is included."
          }
        >
          <FitTable
            content={content}
            rows={(roomShareWithinBudget.length > 0
              ? roomShareWithinBudget
              : roomShare
            ).slice(0, 15)}
          />
        </Section>

        <Section title="Other salaries">
          <div className="flex flex-wrap gap-3">
            {others.map((other) => (
              <Link
                key={other}
                href={content.path(`/salary/${other}`)}
                className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-sm tabular-nums transition-colors hover:border-slate-600"
              >
                £{other.toLocaleString()}
              </Link>
            ))}
          </div>
        </Section>

        <DataNote>
          {content.taxRegimeLabel} It excludes pension contributions, student
          loan repayments and salary sacrifice, each of which reduces it
          further. Rents are reviewed estimates anchored on the ONS{" "}
          {input.councilNoun.singular} averages and exclude bills and council
          tax for flats, which add roughly £220 to £320 a month — see the{" "}
          <Link
            href={content.path("/methodology")}
            className="underline underline-offset-2 hover:text-slate-300"
          >
            methodology
          </Link>
          .
        </DataNote>
      </PageShell>
    </>
  );
}
