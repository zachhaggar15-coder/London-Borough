import type { Metadata } from "next";
import Link from "next/link";
import { LIFESTYLE_PAGES, SITE_URL } from "@/lib/seo-data";

export const metadata: Metadata = {
  title: "London neighbourhoods by lifestyle — guides for every type of person",
  description:
    "Whether you're a runner, foodie, night-owl or professional, find the London neighbourhoods that match your lifestyle.",
  alternates: { canonical: `${SITE_URL}/lifestyle` },
  openGraph: {
    title: "London neighbourhoods by lifestyle",
    description:
      "Find London neighbourhoods that match your lifestyle, from runners and foodies to night-owls and young professionals.",
    url: `${SITE_URL}/lifestyle`,
    type: "website",
  },
};

export default function LifestyleIndexPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="border-b border-slate-800 px-6 py-4">
        <div className="mx-auto max-w-5xl flex items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">
            Where in London
          </Link>
          <span>/</span>
          <span className="text-slate-200">Lifestyle guides</span>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            London neighbourhoods by lifestyle
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            Find areas that match how you actually want to live — not just the
            nearest tube station.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4">
          {LIFESTYLE_PAGES.map((p) => (
            <Link
              key={p.slug}
              href={`/lifestyle/${p.slug}`}
              className="rounded-lg bg-slate-900 border border-slate-800 p-5 hover:border-slate-600 transition-colors"
            >
              <h2 className="font-semibold text-white mb-2">{p.h1}</h2>
              <p className="text-sm text-slate-400 line-clamp-2">{p.intro}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
