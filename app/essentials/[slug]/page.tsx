import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/seo-data";
import {
  AMAZON_ASSOCIATE_TAG,
  amazonUkProductUrl,
  getRenterEssentialPost,
  getRenterEssentialPosts,
  getRenterEssentialSlugs,
} from "@/lib/renter-essentials";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return getRenterEssentialSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getRenterEssentialPost(slug);
  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `${SITE_URL}/essentials/${slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `${SITE_URL}/essentials/${slug}`,
      type: "article",
    },
  };
}

export default async function EssentialPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getRenterEssentialPost(slug);
  if (!post) notFound();

  const related = getRenterEssentialPosts()
    .filter((item) => item.slug !== slug)
    .slice(0, 3);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Renter essentials",
        item: `${SITE_URL}/essentials`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/essentials/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-slate-950 text-slate-100">
        <nav className="border-b border-slate-800 px-6 py-4">
          <div className="mx-auto max-w-5xl flex items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              Where in London
            </Link>
            <span>/</span>
            <Link
              href="/essentials"
              className="hover:text-white transition-colors"
            >
              Renter essentials
            </Link>
            <span>/</span>
            <span className="text-slate-200">{post.shortTitle}</span>
          </div>
        </nav>

        <main className="mx-auto max-w-5xl px-6 py-12">
          <header className="mb-10">
            <p className="text-sm uppercase tracking-wide text-emerald-400 mb-3">
              Amazon UK renter guide
            </p>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl">{post.intro}</p>
            <p className="mt-4 text-xs text-slate-500">
              As an Amazon Associate I earn from qualifying purchases. All
              product links use the Amazon UK associate tag{" "}
              {AMAZON_ASSOCIATE_TAG}. Prices and stock can change on Amazon.
            </p>
          </header>

          <section className="mb-12 rounded-lg bg-slate-900 border border-slate-800 p-6">
            <h2 className="text-xl font-semibold mb-3">
              Why this fits Where in London
            </h2>
            <p className="text-slate-300 leading-relaxed">
              {post.whyItConverts}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-6">Recommended products</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {post.products.map((product) => (
                <article
                  key={product.asin}
                  className="rounded-lg bg-slate-900 border border-slate-800 p-5"
                >
                  <p className="text-xs text-slate-500 mb-2">
                    Amazon UK ASIN {product.asin}
                  </p>
                  <h3 className="font-semibold text-white mb-3">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-300 mb-3">{product.fit}</p>
                  <p className="text-sm text-slate-400 mb-5">
                    {product.reason}
                  </p>
                  <a
                    href={amazonUkProductUrl(product.asin)}
                    target="_blank"
                    rel="sponsored nofollow noopener noreferrer"
                    className="inline-flex rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 transition-colors"
                  >
                    Check on Amazon UK
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-12 grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold mb-4">How to use this</h2>
              <ul className="space-y-2">
                {post.checklist.map((item) => (
                  <li key={item} className="flex gap-2 text-slate-300">
                    <span className="text-emerald-400 mt-0.5 flex-shrink-0">
                      -
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Sensible site placement
              </h2>
              <ul className="space-y-2">
                {post.suggestedPlacements.map((item) => (
                  <li key={item} className="flex gap-2 text-slate-300">
                    <span className="text-emerald-400 mt-0.5 flex-shrink-0">
                      -
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4">
              Other renter essentials
            </h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/essentials/${item.slug}`}
                  className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-3 hover:border-slate-600 transition-colors"
                >
                  <p className="font-medium text-sm">{item.shortTitle}</p>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {item.metaDescription}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-xl bg-slate-900 border border-slate-700 p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">
              Still choosing where to live?
            </h2>
            <p className="text-slate-300 mb-6">
              Compare commute, rent and lifestyle first, then use these
              essentials once you have a shortlist.
            </p>
            <Link
              href="/"
              className="inline-block rounded-lg bg-emerald-600 hover:bg-emerald-500 px-6 py-3 font-medium transition-colors"
            >
              Open the discovery tool
            </Link>
          </section>
        </main>
      </div>
    </>
  );
}
