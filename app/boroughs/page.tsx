import type { Metadata } from "next";
import Link from "next/link";
import {
  getAllBoroughSlugs,
  getBoroughPageData,
  SITE_URL,
} from "@/lib/seo-data";

export const metadata: Metadata = {
  title: "London borough guide — rents, transport & neighbourhoods",
  description:
    "Rent prices, transport zones and neighbourhood guides for all 32 London boroughs. Find the right borough for your commute, budget and lifestyle.",
  alternates: { canonical: `${SITE_URL}/boroughs` },
};

export default function BoroughsIndexPage() {
  const slugs = getAllBoroughSlugs();
  const boroughs = slugs
    .map((slug) => getBoroughPageData(slug))
    .filter(Boolean)
    .sort((a, b) => a!.name.localeCompare(b!.name));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="border-b border-slate-800 px-6 py-4">
        <div className="mx-auto max-w-5xl flex items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">
            Where in London
          </Link>
          <span>/</span>
          <span className="text-slate-200">Boroughs</span>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            London borough guide
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            Rent prices, transport zones, lifestyle profiles and neighbourhood
            guides for every London borough.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {boroughs.map((b) => {
            if (!b) return null;
            return (
              <Link
                key={b.slug}
                href={`/boroughs/${b.slug}`}
                className="rounded-lg bg-slate-900 border border-slate-800 p-5 hover:border-slate-600 transition-colors"
              >
                <h2 className="font-semibold text-white mb-1">{b.name}</h2>
                <p className="text-xs text-slate-400 mb-3">
                  Zone{b.zoneRange.length > 1 ? "s" : ""}{" "}
                  {b.zoneRange.join("–")} ·{" "}
                  {b.neighbourhoods.length} neighbourhood
                  {b.neighbourhoods.length !== 1 ? "s" : ""}
                </p>
                <p className="text-sm text-slate-300">
                  Avg 1-bed:{" "}
                  <span className="text-white font-medium">
                    £{b.avgOneBedRent.toLocaleString()}/mo
                  </span>
                </p>
              </Link>
            );
          })}
        </div>

        <section className="mt-16 rounded-xl bg-slate-900 border border-slate-700 p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">
            Find neighbourhoods across all boroughs
          </h2>
          <p className="text-slate-300 mb-6">
            Enter your commute, salary and lifestyle preferences for a
            personalised neighbourhood match.
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
  );
}
