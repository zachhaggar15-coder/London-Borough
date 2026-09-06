import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MANCHESTER_SALARY_LEVELS,
  getManchesterSalaryPageData,
  isManchesterSalaryLevel,
  manchesterPath,
  manchesterUrl,
  type SalaryAreaFit,
} from "@/lib/manchester/seo-data";
import { boroughSlug } from "@/lib/manchester/boroughs";
import { TRAVEL_BAND_LABELS } from "@/lib/travel-band";
import {
  Breadcrumbs,
  DataNote,
  PageShell,
  Section,
} from "@/components/manchester/Pieces";

type Props = { params: Promise<{ amount: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return MANCHESTER_SALARY_LEVELS.map((amount) => ({ amount: String(amount) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { amount } = await params;
  const salary = Number(amount);
  if (!isManchesterSalaryLevel(salary)) return {};

  const data = getManchesterSalaryPageData(salary);
  const formatted = `£${salary.toLocaleString()}`;
  const title = `Where to live in Greater Manchester on a ${formatted} salary`;
  const description = `On ${formatted} you take home about £${data.takeHomeMonthly.toLocaleString()} a month, giving a rent budget near £${data.budget35.toLocaleString()}. ${data.comfortable.length} of 57 Greater Manchester areas fit inside it.`;

  return {
    title,
    description,
    alternates: { canonical: manchesterUrl(`/salary/${amount}`) },
    openGraph: {
      title,
      description,
      url: manchesterUrl(`/salary/${amount}`),
      type: "article",
    },
  };
}

function FitTable({ rows }: { rows: SalaryAreaFit[] }) {
  return (
    <div className="-mx-6 overflow-x-auto px-6">
      <table className="w-full min-w-[34rem] border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-wide text-slate-500">
            <th scope="col" className="py-2 pr-4 font-medium">Area</th>
            <th scope="col" className="py-2 pr-4 font-medium">Rent</th>
            <th scope="col" className="py-2 pr-4 font-medium">Share of take-home</th>
            <th scope="col" className="py-2 font-medium">Borough</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
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
                <span className="ml-2 text-xs text-slate-600">
                  {TRAVEL_BAND_LABELS[row.neighbourhood.travelBand]}
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
                  href={manchesterPath(`/boroughs/${boroughSlug(row.neighbourhood.borough)}`)}
                  className="transition-colors hover:text-slate-200"
                >
                  {row.neighbourhood.borough}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function ManchesterSalaryPage({ params }: Props) {
  const { amount } = await params;
  const salary = Number(amount);
  if (!isManchesterSalaryLevel(salary)) notFound();

  const data = getManchesterSalaryPageData(salary);
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
  const others = MANCHESTER_SALARY_LEVELS.filter((s) => s !== salary);

  // The dearest areas now within reach, for the high-salary branch below.
  const topOfRange = comfortable[comfortable.length - 1] ?? cheapestOneBed;
  const secondFromTop = comfortable[comfortable.length - 2] ?? topOfRange;

  // The honest headline. On the lower rungs no one-bed fits, and the page
  // has to say so plainly rather than padding the list with places that
  // would take half your income.
  const verdict =
    comfortable.length === 0
      ? `On ${formatted} no one-bed in Greater Manchester fits inside the 35% guideline. The cheapest anywhere is ${cheapestOneBed.neighbourhood.name} at £${cheapestOneBed.rentGbp.toLocaleString()}, which would take ${Math.round(cheapestOneBed.shareOfTakeHome * 100)}% of your take-home. Sharing is the realistic route at this salary, and it is a perfectly normal one here.`
      : comfortable.length === 1
        ? `On ${formatted} exactly one area fits inside the guideline for a one-bed: ${comfortable[0].neighbourhood.name}, at £${comfortable[0].rentGbp.toLocaleString()} a month. A room in a share opens up a great deal more.`
        : comfortable.length >= 50
          // Name what the salary newly unlocks, not the cheapest areas.
          // The London page made exactly this mistake and told a £150,000
          // reader they could afford Romford. At this level the useful
          // information is the top of the range, not the bottom.
          ? `On ${formatted} rent stops being the constraint: ${comfortable.length} of the 57 areas fit a one-bed inside the guideline, ${topOfRange.neighbourhood.name} at £${topOfRange.rentGbp.toLocaleString()} among them. The question becomes commute and character rather than affordability — this is the salary at which the city centre, ${secondFromTop.neighbourhood.name} and the rest of the inner ring are genuinely open to you.`
          : `On ${formatted}, ${comfortable.length} of the 57 areas covered here fit a one-bed inside the 35% guideline, from ${comfortable[0].neighbourhood.name} at £${comfortable[0].rentGbp.toLocaleString()} upwards.`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the take-home pay on ${formatted} in the UK?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `About £${takeHomeMonthly.toLocaleString()} a month after income tax and National Insurance, before pension contributions or student loan repayments. That gives a rent budget of roughly £${budget33.toLocaleString()} at 33% or £${budget35.toLocaleString()} at 35%.`,
        },
      },
      {
        "@type": "Question",
        name: `Where can you afford to live in Manchester on ${formatted}?`,
        acceptedAnswer: { "@type": "Answer", text: verdict },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Manchester", item: manchesterUrl("/") },
      { "@type": "ListItem", position: 2, name: "Salary", item: manchesterUrl("/salary") },
      { "@type": "ListItem", position: 3, name: formatted, item: manchesterUrl(`/salary/${amount}`) },
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
        <Breadcrumbs
          trail={[
            { label: "Manchester", href: manchesterPath("/") },
            { label: "Salary", href: manchesterPath("/salary") },
            { label: formatted },
          ]}
        />

        <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
          Where to live in Greater Manchester on {formatted}
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
            are one unexpected bill from a problem. Greater Manchester is one
            of the few large British cities where holding to it is realistic
            rather than aspirational.
          </p>
        </Section>

        {comfortable.length > 0 && (
          <Section
            title={`One-beds inside your budget (${comfortable.length})`}
            lead="Cheapest first. Every area here takes 35% or less of your take-home."
          >
            <FitTable rows={comfortable} />
          </Section>
        )}

        {stretch.length > 0 && (
          <Section
            title={`A stretch, but doable (${stretch.length})`}
            lead="Between 35% and 45% of take-home. Workable if you have no other commitments and a stable income, uncomfortable if you have either."
          >
            <FitTable rows={stretch} />
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
                href={manchesterPath(`/salary/${other}`)}
                className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-sm tabular-nums transition-colors hover:border-slate-600"
              >
                £{other.toLocaleString()}
              </Link>
            ))}
          </div>
        </Section>

        <DataNote>
          Take-home is modelled on England and Wales income tax and Class 1
          employee National Insurance for 2026/27, including the personal
          allowance taper above £100,000. It excludes pension contributions,
          student loan repayments, salary sacrifice and Scottish rates, each of
          which reduces it further. Rents are reviewed estimates anchored on
          the ONS borough averages and exclude bills and council tax for flats,
          which add roughly £220 to £320 a month — see the{" "}
          <Link
            href={manchesterPath("/methodology")}
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
