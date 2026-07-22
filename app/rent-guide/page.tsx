import type { Metadata } from "next";
import Link from "next/link";
import { NEIGHBOURHOODS } from "@/lib/data/neighbourhoods";
import { getNeighbourhoodsByBorough, SITE_URL } from "@/lib/seo-data";

export const metadata: Metadata = {
  title: "London rent guides — what's your flat worth to rent?",
  description:
    "Area-by-area London rent guides: typical room, one-bed and two-bed rents for 95 neighbourhoods, with how each compares to its borough average.",
  alternates: { canonical: `${SITE_URL}/rent-guide` },
  openGraph: {
    title: "London rent guides — what's your flat worth to rent?",
    description:
      "Typical room, one-bed and two-bed rents for 95 London neighbourhoods.",
    url: `${SITE_URL}/rent-guide`,
    type: "website",
  },
};

export default function RentGuideIndexPage() {
  const boroughGroups = getNeighbourhoodsByBorough();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="border-b border-slate-800 px-6 py-4">
        <div className="mx-auto max-w-5xl flex items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">
            Where in London
          </Link>
          <span>/</span>
          <span className="text-slate-200">Rent guides</span>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            London rent guides
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            What&apos;s a flat worth to rent across {NEIGHBOURHOODS.length}{" "}
            London neighbourhoods? Each guide covers typical room, one-bed and
            two-bed rents and how they compare to the borough average.
          </p>
        </header>

        <div className="space-y-12">
          {boroughGroups.map(({ borough, neighbourhoods }) => (
            <section key={borough}>
              <h2 className="text-xl font-semibold mb-5">{borough}</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {neighbourhoods.map((n) => (
                  <Link
                    key={n.id}
                    href={`/rent-guide/${n.id}`}
                    className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-3 hover:border-slate-600 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-white truncate">
                        {n.name} rent guide
                      </p>
                      <span className="flex-shrink-0 text-sm font-medium text-white">
                        £{n.rent.oneBedMedianGbp.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      1-bed median · Zone{n.transportZones.length > 1 ? "s" : ""}{" "}
                      {n.transportZones.join("/")}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-16 rounded-xl bg-slate-900 border border-slate-700 p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">
            See what you can actually afford
          </h2>
          <p className="text-slate-300 mb-6">
            Enter your salary and lifestyle to rank London areas by budget fit,
            commute and character.
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
