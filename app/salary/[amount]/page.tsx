import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  SALARY_LEVELS,
  getSalaryPageData,
  SITE_URL,
} from "@/lib/seo-data";
import EssentialsPreview from "@/components/EssentialsPreview";

type Props = { params: Promise<{ amount: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return SALARY_LEVELS.map((amount) => ({ amount: String(amount) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { amount } = await params;
  const salary = Number(amount);
  if (!SALARY_LEVELS.includes(salary as (typeof SALARY_LEVELS)[number])) return {};

  const data = getSalaryPageData(salary);
  const formattedSalary = `£${salary.toLocaleString()}`;

  const title = `Where to live in London on a ${formattedSalary} salary`;
  const description = `On ${formattedSalary} a year you take home roughly £${data.takeHomeMonthly.toLocaleString()}/month. Your rent budget is around £${data.budget35.toLocaleString()}/month. Here are the best London neighbourhoods that fit.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/salary/${amount}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/salary/${amount}`,
      type: "article",
    },
  };
}

export default async function SalaryPage({ params }: Props) {
  const { amount } = await params;
  const salary = Number(amount);
  if (!SALARY_LEVELS.includes(salary as (typeof SALARY_LEVELS)[number])) notFound();

  const data = getSalaryPageData(salary);
  const { takeHomeMonthly, budget33, budget35, comfortable, stretch } = data;

  const formattedSalary = `£${salary.toLocaleString()}`;

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
      {
        "@type": "ListItem",
        position: 3,
        name: `${formattedSalary} salary guide`,
        item: `${SITE_URL}/salary/${amount}`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the take-home pay for a ${formattedSalary} salary in London?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `On a ${formattedSalary} gross salary you take home approximately £${takeHomeMonthly.toLocaleString()} per month after income tax and National Insurance.`,
        },
      },
      {
        "@type": "Question",
        name: `What rent can I afford on a ${formattedSalary} salary in London?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `On ${formattedSalary} a year, most financial advice suggests spending no more than 33–35% of take-home pay on rent. That works out to approximately £${budget33.toLocaleString()}–£${budget35.toLocaleString()} per month on a 1-bed flat.`,
        },
      },
      {
        "@type": "Question",
        name: `Can I afford to live alone in London on ${formattedSalary}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            comfortable.length > 0
              ? `Yes, with careful budgeting. On ${formattedSalary} you have a rent budget of around £${budget35.toLocaleString()}/month, which gives you access to ${comfortable.length} tracked London neighbourhoods for a 1-bed flat — particularly in Zones 3–4.`
              : `On ${formattedSalary} a year, renting a 1-bed flat alone in London is very tight. House sharing significantly increases your options and quality of life.`,
        },
      },
    ],
  };

  const otherSalaries = SALARY_LEVELS.filter((s) => s !== salary).slice(0, 5);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-slate-950 text-slate-100">
        <nav className="border-b border-slate-800 px-6 py-4">
          <div className="mx-auto max-w-5xl flex items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              Where in London
            </Link>
            <span>/</span>
            <span className="text-slate-200">
              Living on {formattedSalary}
            </span>
          </div>
        </nav>

        <main className="mx-auto max-w-5xl px-6 py-12">
          <header className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Where to live in London on a {formattedSalary} salary
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl">
              On {formattedSalary} you take home roughly{" "}
              <strong className="text-white">
                £{takeHomeMonthly.toLocaleString()}/month
              </strong>{" "}
              after tax and NI. That gives you a rent budget of around{" "}
              <strong className="text-white">
                £{budget35.toLocaleString()}/month
              </strong>{" "}
              (35% of take-home). Here&apos;s where that actually gets you in
              London.
            </p>
          </header>

          {/* Budget snapshot */}
          <section className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-12">
            {[
              { label: "Gross salary", value: formattedSalary },
              {
                label: "Take-home (monthly)",
                value: `£${takeHomeMonthly.toLocaleString()}`,
              },
              { label: "Rent budget (33%)", value: `£${budget33.toLocaleString()}` },
              { label: "Rent budget (35%)", value: `£${budget35.toLocaleString()}` },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-lg bg-slate-900 border border-slate-800 p-4"
              >
                <p className="text-xs text-slate-400 mb-1">{label}</p>
                <p className="text-xl font-semibold">{value}</p>
              </div>
            ))}
          </section>

          {/* What that means */}
          <section className="mb-12 rounded-lg bg-slate-900 border border-slate-800 p-6">
            <h2 className="text-lg font-semibold mb-3">
              What £{budget35.toLocaleString()}/month buys in London
            </h2>
            <p className="text-slate-300 leading-relaxed">
              {budget35 >= 2200
                ? `At £${budget35.toLocaleString()}/month you have access to most of inner London — Zones 1 and 2. You can afford 1-bed flats in competitive areas like ${comfortable.slice(0, 2).map((n) => n.name).join(" and ")} without stretching.`
                : budget35 >= 1700
                ? `At £${budget35.toLocaleString()}/month you can comfortably rent a 1-bed flat in many Zone 2–3 areas. You'll need to look at areas like ${comfortable.slice(0, 3).map((n) => n.name).join(", ")} for decent options.`
                : budget35 >= 1400
                ? `At £${budget35.toLocaleString()}/month your 1-bed options are mostly in Zones 3–4. ${comfortable.slice(0, 2).map((n) => n.name).join(" and ")} are good starting points.`
                : `At £${budget35.toLocaleString()}/month, renting a 1-bed flat alone in London is challenging. House sharing is the realistic option for most areas.`}
            </p>
          </section>

          {/* Comfortable areas */}
          {comfortable.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-2">
                Areas within your budget
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                {comfortable.length} neighbourhoods where 1-bed rent is at or
                under £{budget35.toLocaleString()}/month (≤ 35% of take-home)
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 text-left text-slate-400">
                      <th className="pb-3 font-medium">Neighbourhood</th>
                      <th className="pb-3 font-medium">Borough</th>
                      <th className="pb-3 font-medium text-right">
                        1-bed rent
                      </th>
                      <th className="pb-3 font-medium text-right">
                        % of take-home
                      </th>
                      <th className="pb-3 font-medium hidden sm:table-cell">
                        Transport
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comfortable.map((n) => (
                      <tr
                        key={n.id}
                        className="border-b border-slate-800/50 hover:bg-slate-900/50 transition-colors"
                      >
                        <td className="py-3 font-medium">{n.name}</td>
                        <td className="py-3 text-slate-400">{n.borough}</td>
                        <td className="py-3 text-right tabular-nums">
                          £{n.oneBedRent.toLocaleString()}
                        </td>
                        <td className="py-3 text-right tabular-nums">
                          <span
                            className={
                              n.rentAsPct <= 33
                                ? "text-emerald-400"
                                : "text-amber-400"
                            }
                          >
                            {n.rentAsPct}%
                          </span>
                        </td>
                        <td className="py-3 hidden sm:table-cell">
                          <div className="flex gap-1">
                            {n.lines.slice(0, 2).map((l) => (
                              <span
                                key={l}
                                className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded"
                              >
                                {l}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Stretch areas */}
          {stretch.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-2">
                Areas that stretch your budget
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                35–42% of take-home — doable but tight. Worth it if the area
                is genuinely right for you.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {stretch.map((n) => (
                  <div
                    key={n.id}
                    className="rounded-lg bg-slate-900 border border-slate-800 p-4"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium text-white">{n.name}</h3>
                      <span className="text-amber-400 text-sm">
                        {n.rentAsPct}%
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mb-2">{n.borough}</p>
                    <p className="text-white font-medium">
                      £{n.oneBedRent.toLocaleString()}/mo
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-white mb-2">
                  What is the take-home pay for a {formattedSalary} salary?
                </h3>
                <p className="text-slate-300">
                  On a {formattedSalary} gross salary, you take home
                  approximately £{takeHomeMonthly.toLocaleString()} per month
                  after income tax and National Insurance (2025/26 rates).
                </p>
              </div>
              <div>
                <h3 className="font-medium text-white mb-2">
                  How much rent can I afford on {formattedSalary}?
                </h3>
                <p className="text-slate-300">
                  Most financial guidance suggests spending no more than 33–35%
                  of take-home pay on rent. On {formattedSalary} that&apos;s
                  approximately £{budget33.toLocaleString()}–£
                  {budget35.toLocaleString()}/month for a 1-bed flat.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-white mb-2">
                  Should I house share or rent alone on {formattedSalary}?
                </h3>
                <p className="text-slate-300">
                  {budget35 >= 1700
                    ? `On ${formattedSalary} you have realistic options for renting alone in many Zone 2–3 areas of London. House sharing opens up more of Zone 1 and premium Zone 2.`
                    : `On ${formattedSalary}, house sharing will significantly expand your options. Expect to pay £800–£1,100/month for a room in a shared house in Zone 2, which leaves more of your salary for savings and quality of life.`}
                </p>
              </div>
            </div>
          </section>

          <EssentialsPreview
            slugs={["small-flat-storage", "damp-laundry-kit"]}
            title="Useful kit once you have found a flat"
            description="Storage and indoor-laundry picks that fit the space trade-offs behind London rent budgets."
          />

          {/* Other salary guides */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4">
              Other salary guides
            </h2>
            <div className="flex flex-wrap gap-3">
              {otherSalaries.map((s) => (
                <Link
                  key={s}
                  href={`/salary/${s}`}
                  className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-2 text-sm hover:border-slate-600 transition-colors"
                >
                  £{s.toLocaleString()} salary
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-xl bg-slate-900 border border-slate-700 p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">
              Get your personalised neighbourhood match
            </h2>
            <p className="text-slate-300 mb-6">
              Enter your salary, commute destination and lifestyle to see which
              areas genuinely fit your situation.
            </p>
            <Link
              href="/"
              className="inline-block rounded-lg bg-emerald-600 hover:bg-emerald-500 px-6 py-3 font-medium transition-colors"
            >
              Open the discovery tool →
            </Link>
          </section>
        </main>
      </div>
    </>
  );
}
