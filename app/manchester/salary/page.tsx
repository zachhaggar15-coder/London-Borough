import type { Metadata } from "next";
import Link from "next/link";
import {
  MANCHESTER_SALARY_LEVELS,
  getManchesterSalaryPageData,
  manchesterPath,
  manchesterUrl,
} from "@/lib/manchester/seo-data";
import {
  Breadcrumbs,
  DataNote,
  PageShell,
  Section,
} from "@/components/manchester/Pieces";

export const metadata: Metadata = {
  title: "What you can afford in Greater Manchester on your salary",
  description:
    "Enter your salary and see what it actually rents in Greater Manchester — take-home pay, a realistic rent budget, and the areas that fit.",
  alternates: { canonical: manchesterUrl("/salary") },
};

export default function ManchesterSalaryIndexPage() {
  const rows = MANCHESTER_SALARY_LEVELS.map((salary) => {
    const data = getManchesterSalaryPageData(salary);
    return {
      salary,
      takeHome: data.takeHomeMonthly,
      budget35: data.budget35,
      areasFitting: data.comfortable.length,
    };
  });

  return (
    <PageShell>
      <Breadcrumbs
        trail={[
          { label: "Manchester", href: manchesterPath("/") },
          { label: "Salary" },
        ]}
      />

      <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
        What your salary rents in Greater Manchester
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
        Worked backwards from gross pay to what you can actually sign for:
        income tax and National Insurance come off first, then a rent budget
        of 35% of what is left, then the areas that fit inside it. The ladder
        starts at £22,000 and stops at £85,000, because past that point every
        area in the conurbation fits and the answer stops being interesting.
      </p>

      <Section title="Pick a salary">
        <div className="-mx-6 overflow-x-auto px-6">
          <table className="w-full min-w-[34rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-wide text-slate-500">
                <th scope="col" className="py-2 pr-4 font-medium">Salary</th>
                <th scope="col" className="py-2 pr-4 font-medium">Take-home / month</th>
                <th scope="col" className="py-2 pr-4 font-medium">Rent at 35%</th>
                <th scope="col" className="py-2 font-medium">One-beds that fit</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.salary}
                  className="border-b border-slate-900 transition-colors hover:bg-slate-900/60"
                >
                  <td className="py-2.5 pr-4">
                    <Link
                      href={manchesterPath(`/salary/${row.salary}`)}
                      className="font-medium tabular-nums transition-colors hover:text-emerald-400"
                    >
                      £{row.salary.toLocaleString()}
                    </Link>
                  </td>
                  <td className="py-2.5 pr-4 tabular-nums text-slate-300">
                    £{row.takeHome.toLocaleString()}
                  </td>
                  <td className="py-2.5 pr-4 tabular-nums text-slate-300">
                    £{row.budget35.toLocaleString()}
                  </td>
                  <td className="py-2.5 tabular-nums text-slate-400">
                    {row.areasFitting} of 57
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <DataNote>
        Take-home is modelled on England and Wales income tax and Class 1
        employee National Insurance for 2026/27, including the personal
        allowance taper above £100,000. It excludes pension contributions,
        student loan repayments, salary sacrifice and Scottish rates, all of
        which reduce it further. The 35% guideline is a ceiling rather than a
        target — see{" "}
        <Link
          href={manchesterPath("/guides/how-much-do-i-need-to-earn-to-live-in-manchester")}
          className="underline underline-offset-2 hover:text-slate-300"
        >
          how much you need to earn
        </Link>{" "}
        for why.
      </DataNote>
    </PageShell>
  );
}
