import type { Metadata } from "next";
import Link from "next/link";
import { SALARY_LEVELS, getSalaryPageData, SITE_URL } from "@/lib/seo-data";
import { NEIGHBOURHOODS } from "@/lib/data/neighbourhoods";

const NEIGHBOURHOODS_TRACKED = NEIGHBOURHOODS.length;

export const metadata: Metadata = {
  title: "Where to live in London by salary — rent budgets from £25k to £150k",
  description:
    "What a London salary leaves you after tax, the rent that fits inside 35% of it, and which neighbourhoods are in range — every level from £25,000 to £150,000 in one table.",
  alternates: { canonical: `${SITE_URL}/salary` },
  openGraph: {
    title: "Where to live in London by salary",
    description:
      "Take-home pay, rent budgets and neighbourhood recommendations for London salary levels.",
    url: `${SITE_URL}/salary`,
    type: "website",
  },
};

export default function SalaryIndexPage() {
  const salaryData = SALARY_LEVELS.map((s) => {
    const d = getSalaryPageData(s);
    return {
      salary: s,
      takeHome: d.takeHomeMonthly,
      budget35: d.budget35,
      comfortableCount: d.comfortable.length,
      roomCount: d.roomShareWithinBudget.length,
      // The dearest areas still in range, not the cheapest: at £150k the
      // useful answer is Marylebone, not Romford.
      topInRange: d.comfortable.slice(-3).reverse(),
      cheapestRoom: d.roomShare[0] ?? null,
    };
  });

  // The salary at which a whole one-bed first becomes affordable anywhere —
  // the single most useful number on this page.
  const firstViable = salaryData.find((d) => d.comfortableCount > 0);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Salary guides",
        item: `${SITE_URL}/salary`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav className="border-b border-slate-800 px-6 py-4">
        <div className="mx-auto max-w-5xl flex items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">
            Where in London
          </Link>
          <span>/</span>
          <span className="text-slate-200">Salary guides</span>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Where to live in London by salary
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            What a London salary actually leaves you after tax, what that rents,
            and which neighbourhoods are realistically in range at each level.
          </p>
        </header>

        <section className="mb-10 max-w-3xl space-y-4 text-slate-300">
          <p>
            Every guide below starts from gross salary, applies UK income tax and
            National Insurance to get monthly take-home, then applies the
            conventional guideline that rent should stay at or below 33–35% of
            that figure. The result is a rent ceiling, and the areas we track are
            filtered against it.
          </p>
          <p>
            The honest headline:{" "}
            {firstViable ? (
              <>
                renting a whole one-bed anywhere in this dataset does not become
                viable within that guideline until around{" "}
                <strong className="text-white">
                  £{firstViable.salary.toLocaleString()}
                </strong>
                , which yields a £{firstViable.budget35.toLocaleString()}/month
                ceiling and {firstViable.comfortableCount} areas in range. Below
                that, sharing is not a compromise — it is the market.
              </>
            ) : (
              <>
                a whole one-bed sits outside the 33–35% guideline at every level
                shown here, so the lower guides lead with room-share costs
                instead.
              </>
            )}{" "}
            Below that threshold the table names the cheapest room in a share
            and the real percentage of take-home it would consume, rather than
            showing an empty row.
          </p>
          <p>
            Two things the percentages do not capture. Council tax and bills are
            frequently bundled into a room-share rent and almost never into a
            one-bed, which is worth £100–£150 a month in any honest comparison.
            And travel is a real cost: a cheaper Zone 4 room on a slow route can
            end up costing more per month, and considerably more per week in
            time, than a dearer Zone 2 one.
          </p>
        </section>

        {/*
          One table rather than a page per level. The per-level pages were
          the same template with a different number in (79% shared text),
          which is exactly what the AdSense review flagged.
        */}
        <h2 className="mb-2 text-xl font-semibold">Every salary level</h2>
        <p className="mb-4 max-w-3xl text-sm text-slate-400">
          Rent budget is 35% of monthly take-home. &ldquo;In range&rdquo;
          counts the {NEIGHBOURHOODS_TRACKED} tracked areas where a one-bed
          fits inside it; the named areas are the priciest of those, which is
          what the extra money actually buys.
        </p>
        <div className="-mx-6 overflow-x-auto px-6">
          <table className="w-full min-w-[44rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-wide text-slate-500">
                <th scope="col" className="py-2 pr-4 font-medium">Salary</th>
                <th scope="col" className="py-2 pr-4 font-medium">Take-home / mo</th>
                <th scope="col" className="py-2 pr-4 font-medium">Rent budget</th>
                <th scope="col" className="py-2 pr-4 font-medium">1-beds in range</th>
                <th scope="col" className="py-2 pr-4 font-medium">What it reaches</th>
              </tr>
            </thead>
            <tbody>
              {salaryData.map((row) => (
                <tr
                  key={row.salary}
                  id={`salary-${row.salary}`}
                  className="scroll-mt-24 border-b border-slate-900 align-top"
                >
                  <td className="py-3 pr-4 font-medium tabular-nums">
                    £{row.salary.toLocaleString()}
                  </td>
                  <td className="py-3 pr-4 tabular-nums text-slate-300">
                    £{row.takeHome.toLocaleString()}
                  </td>
                  <td className="py-3 pr-4 tabular-nums text-emerald-400">
                    £{row.budget35.toLocaleString()}
                  </td>
                  <td className="py-3 pr-4 tabular-nums">
                    {row.comfortableCount}
                  </td>
                  <td className="py-3 pr-4 text-slate-300">
                    {row.topInRange.length > 0 ? (
                      row.topInRange.map((area, index) => (
                        <span key={area.id}>
                          {index > 0 && ", "}
                          <Link
                            href={`/neighbourhoods/${area.id}`}
                            className="hover:text-emerald-400"
                          >
                            {area.name}
                          </Link>{" "}
                          <span className="text-slate-500">
                            £{area.oneBedRent.toLocaleString()}
                          </span>
                        </span>
                      ))
                    ) : row.cheapestRoom ? (
                      <>
                        No one-bed. Cheapest room:{" "}
                        <Link
                          href={`/neighbourhoods/${row.cheapestRoom.id}`}
                          className="hover:text-emerald-400"
                        >
                          {row.cheapestRoom.name}
                        </Link>{" "}
                        <span className="text-slate-500">
                          £{row.cheapestRoom.roomRent.toLocaleString()} (
                          {row.cheapestRoom.roomAsPct}% of take-home)
                        </span>
                      </>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="mt-12 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-3 text-lg font-semibold">
            How the take-home figures are calculated
          </h2>
          <p className="text-sm text-slate-300">
            Take-home applies the England and Wales personal allowance of
            £12,570, the 20% basic rate up to £50,270 and the 40% higher rate
            above it, plus Class 1 National Insurance at 8% and 2% across the
            same thresholds. Above £100,000 the personal allowance tapers away
            by £1 for every £2 earned, and the 45% additional rate starts at
            £125,140 — both are modelled, which is why take-home rises so
            slowly between £100,000 and £125,140. It assumes a standard tax
            code and no student loan repayments, pension contributions or
            salary sacrifice — all of which reduce take-home in practice, so
            treat these as a ceiling rather than a payslip. Scottish rates
            differ and are not modelled. Full detail is on the{" "}
            <Link
              href="/methodology"
              className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300"
            >
              methodology page
            </Link>
            .
          </p>
        </section>
      </main>
    </div>
  );
}
