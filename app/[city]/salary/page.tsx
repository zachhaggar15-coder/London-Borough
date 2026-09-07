import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { money } from "@/lib/currency";
import {
  CONTENT_CITY_IDS,
  getCityContent,
  isContentCityId,
} from "@/lib/city-registry";
import {
  CityBreadcrumbs,
  DataNote,
  PageShell,
  ScrollTable,
  Section,
  TableHead,
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

  return {
    title: `What you can afford in ${content.copy.regionLabel} on your salary`,
    description: `Enter your salary and see what it actually rents in ${content.copy.regionLabel} — take-home pay, a realistic rent budget, and the areas that fit.`,
    alternates: { canonical: content.url("/salary") },
  };
}

export default async function CitySalaryIndexPage({ params }: Props) {
  const { city } = await params;
  if (!isContentCityId(city)) notFound();
  const content = getCityContent(city);
  const currency = content.input.currency;
  const { input, copy } = content;

  const levels = input.salaryLevels;
  const rows = levels.map((salary) => {
    const data = content.getSalaryPageData(salary);
    return {
      salary,
      takeHome: data.takeHomeMonthly,
      budget35: data.budget35,
      areasFitting: data.comfortable.length,
    };
  });

  const first = levels[0];
  const last = levels[levels.length - 1];

  return (
    <PageShell>
      <CityBreadcrumbs content={content} trail={[{ label: "Salary" }]} />

      <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
        What your salary rents in {copy.regionLabel}
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
        Worked backwards from gross pay to what you can actually sign for:
        income tax and National Insurance come off first, then a rent budget of
        35% of what is left, then the areas that fit inside it. The ladder
        starts at {money(first, currency)} and stops at{" "}
        {money(last, currency)}, because past that point every area in the
        region fits and the answer stops being interesting.
      </p>

      <Section title="Pick a salary">
        <ScrollTable minWidth="34rem">
          <TableHead
            cells={[
              "Salary",
              "Take-home / month",
              "Rent at 35%",
              "One-beds that fit",
            ]}
          />
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.salary}
                className="border-b border-slate-900 transition-colors hover:bg-slate-900/60"
              >
                <td className="py-2.5 pr-4">
                  <Link
                    href={content.path(`/salary/${row.salary}`)}
                    className="font-medium tabular-nums transition-colors hover:text-emerald-400"
                  >
                    {money(row.salary, currency)}
                  </Link>
                </td>
                <td className="py-2.5 pr-4 tabular-nums text-slate-300">
                  {money(row.takeHome, currency)}
                </td>
                <td className="py-2.5 pr-4 tabular-nums text-slate-300">
                  {money(row.budget35, currency)}
                </td>
                <td className="py-2.5 tabular-nums text-slate-400">
                  {row.areasFitting} of {content.areas.length}
                </td>
              </tr>
            ))}
          </tbody>
        </ScrollTable>
      </Section>

      <DataNote>
        {content.taxRegimeLabel} It excludes pension contributions, student
        loan repayments and salary sacrifice, all of which reduce it further.
        The 35% guideline is a ceiling rather than a target.
      </DataNote>
    </PageShell>
  );
}
