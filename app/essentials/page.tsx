import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo-data";
import {
  AMAZON_ASSOCIATE_TAG,
  getRenterEssentialPosts,
} from "@/lib/renter-essentials";

export const metadata: Metadata = {
  title: "London renter essentials",
  description:
    "Practical Amazon UK product guides for viewing, moving into and living in London rentals.",
  alternates: { canonical: `${SITE_URL}/essentials` },
  openGraph: {
    title: "London renter essentials",
    description:
      "Practical Amazon UK product guides for viewing, moving into and living in London rentals.",
    url: `${SITE_URL}/essentials`,
    type: "website",
  },
};

export default function EssentialsIndexPage() {
  const posts = getRenterEssentialPosts();

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
            surviving the commute.
          </p>
          <p className="mt-4 text-xs text-slate-500">
            As an Amazon Associate I earn from qualifying purchases. Associate
            tag: {AMAZON_ASSOCIATE_TAG}.
          </p>
        </header>

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
