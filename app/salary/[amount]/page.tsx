import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  SALARY_LEVELS,
  getSalaryPageData,
  SITE_URL,
} from "@/lib/seo-data";

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

  // On lower salaries a whole one-bed is out of reach everywhere we track, so
  // the page leads with room-shares rather than rendering an empty guide.
  const leadWithRooms = comfortable.length === 0;
  const cheapestRoom = roomShare[0] ?? null;
  const salaryDecisionGroups = [
    {
      label: "Keep rent conservative",
      description:
        "Areas at or below 33% of take-home, leaving more room for bills, savings and life outside rent.",
      areas: comfortable.filter((n) => n.rentAsPct <= 33).slice(0, 4),
    },
    {
      label: "Prioritise transport",
      description:
        "Within-budget areas with the most line variety in this dataset.",
      areas: [...comfortable]
        .sort(
          (a, b) =>
            b.lines.length - a.lines.length || a.oneBedRent - b.oneBedRent,
        )
        .slice(0, 4),
    },
    {
      label: "Central stretch picks",
      description:
        "More central options to consider only if the area genuinely improves your week.",
      areas: [...stretch]
        .sort(
          (a, b) =>
            Math.min(...a.zones) - Math.min(...b.zones) ||
            a.rentAsPct - b.rentAsPct,
        )
        .slice(0, 4),
    },
  ].filter((group) => group.areas.length > 0);

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

  // Single source for the FAQ so the visible copy and the JSON-LD stay in sync.
  const faqItems: { question: string; answer: string }[] = [
    {
      question: `What is the take-home pay for a ${formattedSalary} salary?`,
      answer: `On a ${formattedSalary} gross salary you take home approximately £${takeHomeMonthly.toLocaleString()} per month after income tax and National Insurance (2026/27 rates).`,
    },
    {
      question: `How much rent can I afford on ${formattedSalary}?`,
      answer: `Most financial guidance suggests spending no more than 33–35% of take-home pay on rent. On ${formattedSalary} that is approximately £${budget33.toLocaleString()}–£${budget35.toLocaleString()} per month.`,
    },
    {
      question: `Can I afford to live alone in London on ${formattedSalary}?`,
      answer:
        comfortable.length > 0
          ? `Yes, with careful budgeting. On ${formattedSalary} you have a rent budget of around £${budget35.toLocaleString()}/month, which gives you access to ${comfortable.length} tracked London neighbourhoods for a 1-bed flat — particularly in Zones 3–4.`
          : cheapestOneBed
          ? `Not within the 35% guideline. The cheapest one-bed across the areas we track is ${cheapestOneBed.name} at £${cheapestOneBed.oneBedRent.toLocaleString()}/month, which is ${cheapestOneBed.rentAsPct}% of your £${takeHomeMonthly.toLocaleString()} monthly take-home. On ${formattedSalary} a room in a shared flat is the realistic option.`
          : `On ${formattedSalary} a year, renting a 1-bed flat alone in London is very tight. House sharing significantly increases your options and quality of life.`,
    },
  ];

  if (cheapestRoom) {
    faqItems.push({
      question: `Where is the cheapest place to rent a room in London on ${formattedSalary}?`,
      answer: `Of the areas we track, the cheapest rooms in shared flats are in ${roomShare
        .slice(0, 3)
        .map((r) => `${r.name} (£${r.roomRent.toLocaleString()}/month)`)
        .join(
          ", ",
        )}. On ${formattedSalary} the cheapest of those takes ${cheapestRoom.roomAsPct}% of your take-home. Sharing with more housemates lowers this further, and room rents often include council tax where a one-bed does not.`,
    });
  }

  faqItems.push({
    question: `Should I house share or rent alone on ${formattedSalary}?`,
    answer:
      budget35 >= 1700
        ? `On ${formattedSalary} you have realistic options for renting alone in many Zone 2–3 areas of London. House sharing opens up more of Zone 1 and premium Zone 2, and frees up several hundred pounds a month if saving matters more than space.`
        : cheapestRoom
        ? `House share. On ${formattedSalary} a one-bed would take at least ${cheapestOneBed ? cheapestOneBed.rentAsPct : 50}% of your take-home, while a room starts around £${cheapestRoom.roomRent.toLocaleString()}/month in ${cheapestRoom.name}. Sharing also usually bundles council tax and bills, which a one-bed does not.`
        : `On ${formattedSalary}, house sharing will significantly expand your options and leave more of your salary for savings and quality of life.`,
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
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
                : cheapestOneBed
                ? `At £${budget35.toLocaleString()}/month, renting a 1-bed flat alone is out of reach across every area we track — the cheapest is ${cheapestOneBed.name} at £${cheapestOneBed.oneBedRent.toLocaleString()}/month, which would take ${cheapestOneBed.rentAsPct}% of your take-home. A room in a shared flat is the realistic route, and the areas below are where that costs least.`
                : `At £${budget35.toLocaleString()}/month, renting a 1-bed flat alone in London is challenging. House sharing is the realistic option for most areas.`}
            </p>
          </section>

          {/* Room-share options — the substantive answer whenever a whole
              one-bed is unaffordable, so no salary page is left with nothing. */}
          {leadWithRooms && cheapestRoom && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-2">
                Where a room in a shared flat costs least
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                {roomShareWithinBudget.length > 0
                  ? `${roomShareWithinBudget.length} of the areas we track have room rents inside your £${budget35.toLocaleString()}/month guideline. The cheapest are listed first.`
                  : `No area we track has room rents inside the 35% guideline on this salary — the cheapest room is £${cheapestRoom.roomRent.toLocaleString()}/month in ${cheapestRoom.name}, or ${cheapestRoom.roomAsPct}% of your take-home. These are the eight cheapest, so you can see the real gap rather than an empty list.`}
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 text-left text-slate-400">
                      <th className="pb-3 font-medium">Neighbourhood</th>
                      <th className="pb-3 font-medium">Borough</th>
                      <th className="pb-3 font-medium text-right">Room rent</th>
                      <th className="pb-3 font-medium text-right">
                        % of take-home
                      </th>
                      <th className="pb-3 font-medium hidden sm:table-cell">
                        Transport
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {roomShare.map((n) => (
                      <tr
                        key={n.id}
                        className="border-b border-slate-800/50 transition-colors hover:bg-slate-900/50"
                      >
                        <td className="py-3 font-medium">
                          <Link
                            href={`/neighbourhoods/${n.id}`}
                            className="hover:text-emerald-400 transition-colors"
                          >
                            {n.name}
                          </Link>
                        </td>
                        <td className="py-3 text-slate-400">{n.borough}</td>
                        <td className="py-3 text-right tabular-nums">
                          £{n.roomRent.toLocaleString()}
                        </td>
                        <td className="py-3 text-right tabular-nums">
                          <span
                            className={
                              n.roomAsPct <= 35
                                ? "text-emerald-400"
                                : n.roomAsPct <= 45
                                ? "text-amber-400"
                                : "text-rose-400"
                            }
                          >
                            {n.roomAsPct}%
                          </span>
                        </td>
                        <td className="py-3 text-slate-400 hidden sm:table-cell">
                          Zone {Math.min(...n.zones)}
                          {n.lines.length > 0 ? ` · ${n.lines[0]}` : ""}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 space-y-3 text-sm text-slate-300">
                <p>
                  <strong className="text-slate-100">
                    How to read these numbers.
                  </strong>{" "}
                  The 35% guideline is a rule of thumb, not a rule. Plenty of
                  people in London pay 40–50% of take-home on rent; it works,
                  but it leaves very little room for bills, travel and savings,
                  and it is worth going in with your eyes open rather than
                  discovering it in month three.
                </p>
                <p>
                  <strong className="text-slate-100">
                    What actually moves the number.
                  </strong>{" "}
                  On this salary the biggest lever is not the area — it is the
                  number of housemates. A room in a four-bed share typically
                  runs well below the figures above, which reflect a typical
                  two-to-three bed flat. Council tax is often included in
                  room-share rents but not in a one-bed, which is worth a real
                  £100–£150 a month in the comparison.
                </p>
                <p>
                  Zone 3–4 areas on a single fast line frequently beat a Zone 2
                  address on total monthly cost once travel is priced in, so
                  widen the search before ruling London out.
                </p>
              </div>
            </section>
          )}

          {salaryDecisionGroups.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-6">
                Choose your budget strategy
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                {salaryDecisionGroups.map((group) => (
                  <div
                    key={group.label}
                    className="rounded-lg bg-slate-900 border border-slate-800 p-5"
                  >
                    <h3 className="font-semibold text-white">{group.label}</h3>
                    <p className="mt-2 text-sm text-slate-400">
                      {group.description}
                    </p>
                    <div className="mt-4 space-y-3">
                      {group.areas.map((area) => (
                        <Link
                          key={area.id}
                          href={`/neighbourhoods/${area.id}`}
                          className="block rounded-md border border-slate-800 bg-slate-950 px-3 py-2 hover:border-slate-600 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-sm font-medium text-white">
                              {area.name}
                            </span>
                            <span className="text-xs text-slate-400 tabular-nums">
                              {area.rentAsPct}%
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-slate-400">
                            £{area.oneBedRent.toLocaleString()}/mo 1-bed
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

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
              {faqItems.map((item) => (
                <div key={item.question}>
                  <h3 className="font-medium text-white mb-2">
                    {item.question}
                  </h3>
                  <p className="text-slate-300">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

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
