import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo-data";
import {
  AMAZON_ASSOCIATE_TAG,
  MEALPREP_ORG_URL,
  getRenterEssentialPosts,
} from "@/lib/renter-essentials";

export const metadata: Metadata = {
  title: "London renter essentials",
  description:
    "Practical Amazon UK product guides for viewing, moving into, meal prepping and living in London rentals.",
  alternates: { canonical: `${SITE_URL}/essentials` },
  openGraph: {
    title: "London renter essentials",
    description:
      "Practical Amazon UK product guides for viewing, moving into, meal prepping and living in London rentals.",
    url: `${SITE_URL}/essentials`,
    type: "website",
  },
};

export default function EssentialsIndexPage() {
  const posts = getRenterEssentialPosts();
  const mealPrepPosts = getRenterEssentialPosts([
    "meal-prep-before-moving-house",
    "first-week-meal-prep-new-flat",
    "work-lunch-meal-prep-new-commute",
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="border-b border-slate-800 px-6 py-4">
        <div className="mx-auto max-w-5xl flex items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">
            Where in London
          </Link>
          <span>/</span>
          <span className="text-slate-200">Renter essentials</span>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <header className="mb-10">
          <p className="text-sm uppercase tracking-wide text-emerald-400 mb-3">
            Amazon UK guides
          </p>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            London renter essentials
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            Product guides for the practical bit after choosing an area:
            viewing flats, moving in, drying laundry, storing things and
            meal prepping around a new commute.
          </p>
          <p className="mt-4 text-xs text-slate-500">
            As an Amazon Associate I earn from qualifying purchases. Associate
            tag: {AMAZON_ASSOCIATE_TAG}.
          </p>
        </header>

        <section className="mb-12 border-y border-slate-800 py-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-2">
                Meal prep when moving to a new location
              </h2>
              <p className="text-slate-300 max-w-2xl">
                Moving week, the first shop and the new commute all change what
                food needs to do. These guides target those high-intent moments
                with practical meal-prep products and a UK planning route.
              </p>
            </div>
            <a
              href={MEALPREP_ORG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 rounded-lg border border-emerald-700 px-4 py-2 text-sm font-medium text-emerald-200 hover:border-emerald-500 hover:text-white transition-colors"
            >
              Plan on MealPrep.org.uk
            </a>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {mealPrepPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/essentials/${post.slug}`}
                className="rounded-lg bg-slate-900 border border-slate-800 p-5 hover:border-slate-600 transition-colors"
              >
                <h3 className="font-semibold text-white mb-2">
                  {post.shortTitle}
                </h3>
                <p className="text-sm text-slate-400 line-clamp-3">
                  {post.metaDescription}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <h2 className="text-2xl font-bold tracking-tight mb-6">
          All renter essentials
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/essentials/${post.slug}`}
              className="rounded-lg bg-slate-900 border border-slate-800 p-6 hover:border-slate-600 transition-colors"
            >
              <h2 className="text-xl font-semibold text-white mb-3">
                {post.title}
              </h2>
              <p className="text-sm text-slate-300 mb-5">{post.intro}</p>
              <div className="flex flex-wrap gap-2">
                {post.products.map((product) => (
                  <span
                    key={product.asin}
                    className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
                  >
                    {product.shortName}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
