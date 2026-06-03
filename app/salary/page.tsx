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
    };
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
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
            Take-home pay, rent budgets and neighbourhood recommendations for
            every income level.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          {salaryData.map(({ salary, takeHome, budget35, comfortableCount }) => (
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
                  <p className="text-slate-400 text-xs mb-0.5">Areas in budget</p>
                  <p className="font-medium text-emerald-400">
                    {comfortableCount}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
