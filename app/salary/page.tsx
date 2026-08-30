import type { Metadata } from "next";
import Link from "next/link";
import { SALARY_LEVELS, getSalaryPageData, SITE_URL } from "@/lib/seo-data";

export const metadata: Metadata = {
  title: "Where to live in London by salary — rent budget guides",
  description:
    "Find out where you can afford to live in London based on your salary. Take-home pay, rent budgets and neighbourhood recommendations for every income level.",
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
            Each guide below the threshold lists the cheapest room-share areas
            with the real percentage of take-home they would consume, rather
            than showing you an empty list.
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

        <h2 className="mb-4 text-xl font-semibold">Guides by salary</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {salaryData.map(({
            salary,
            takeHome,
            budget35,
            comfortableCount,
            roomCount,
          }) => (
            <Link
              key={salary}
              href={`/salary/${salary}`}
              className="rounded-lg bg-slate-900 border border-slate-800 p-5 hover:border-slate-600 transition-colors"
            >
              <h2 className="font-semibold text-white mb-3">
                £{salary.toLocaleString()} salary
              </h2>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-slate-400 text-xs mb-0.5">Take-home</p>
                  <p className="font-medium">
                    £{takeHome.toLocaleString()}/mo
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs mb-0.5">Rent budget</p>
                  <p className="font-medium">
                    £{budget35.toLocaleString()}/mo
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs mb-0.5">
                    {comfortableCount > 0 ? "1-beds in budget" : "Rooms in budget"}
                  </p>
                  <p className="font-medium text-emerald-400">
                    {comfortableCount > 0 ? comfortableCount : roomCount}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-400">
                {comfortableCount > 0
                  ? `${comfortableCount} tracked areas where a one-bed fits inside 35% of take-home.`
                  : roomCount > 0
                  ? `A one-bed is out of range at this level; ${roomCount} areas have room-shares that fit.`
                  : `Both a one-bed and a room sit above the 35% guideline here — the guide shows the cheapest options and the real gap.`}
              </p>
            </Link>
          ))}
        </div>

        <section className="mt-12 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-3 text-lg font-semibold">
            How the take-home figures are calculated
          </h2>
          <p className="text-sm text-slate-300">
            Take-home applies the England and Wales personal allowance of
            £12,570, the 20% basic rate up to £50,270 and the 40% higher rate
            above it, plus Class 1 National Insurance at 8% and 2% across the
            same thresholds. The guides stop at £100,000, below the point where
            the personal allowance starts tapering and the 45% additional rate
            begins, so neither is modelled. It assumes a standard tax code and
            no student loan repayments, pension contributions or salary
            sacrifice — all of which reduce take-home in practice, so treat
            these as a ceiling rather than a payslip. Scottish rates differ and
            are not modelled. Full detail is on the{" "}
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
