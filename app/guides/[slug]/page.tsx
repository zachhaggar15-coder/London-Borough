import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  GUIDES,
  getAllGuideSlugs,
  getGuide,
  type Guide,
} from "@/lib/data/guides";
import { SITE_URL } from "@/lib/seo-data";
import { SITE_NAME } from "@/lib/site-config";
import GuideDataBlock from "@/components/GuideDataBlock";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: { canonical: `${SITE_URL}/guides/${slug}` },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: `${SITE_URL}/guides/${slug}`,
      type: "article",
      publishedTime: guide.published,
      modifiedTime: guide.updated,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Guides in the same category, for the "keep reading" block. */
function siblingGuides(guide: Guide): Guide[] {
  const sameCategory = GUIDES.filter(
    (g) => g.slug !== guide.slug && g.category === guide.category,
  );
  const others = GUIDES.filter(
    (g) => g.slug !== guide.slug && g.category !== guide.category,
  );
  return [...sameCategory, ...others].slice(0, 3);
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const url = `${SITE_URL}/guides/${slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: `${SITE_URL}/guides`,
      },
      { "@type": "ListItem", position: 3, name: guide.h1, item: url },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.h1,
    description: guide.metaDescription,
    url,
    datePublished: guide.published,
    dateModified: guide.updated,
    inLanguage: "en-GB",
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: guide.category,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const siblings = siblingGuides(guide);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-slate-950 text-slate-100">
        <nav className="border-b border-slate-800 px-6 py-4">
          <div className="mx-auto max-w-3xl flex items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              Where in London
            </Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-white transition-colors">
              Guides
            </Link>
            <span>/</span>
            <span className="text-slate-200 truncate">{guide.category}</span>
          </div>
        </nav>

        <main className="mx-auto max-w-3xl px-6 py-12">
          <header className="mb-10">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-emerald-400">
              {guide.category}
            </p>
            <h1 className="text-4xl font-bold tracking-tight mb-5">
              {guide.h1}
            </h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-400">
              <span>{guide.readMinutes} min read</span>
              <span aria-hidden>·</span>
              <span>
                Updated{" "}
                <time dateTime={guide.updated}>{formatDate(guide.updated)}</time>
              </span>
            </div>
          </header>

          <div className="space-y-5 text-lg leading-relaxed text-slate-300 mb-12">
            {guide.intro.map((p, i) => (
              <p key={i} className={i === 0 ? "text-slate-200" : undefined}>
                {p}
              </p>
            ))}
          </div>

          {guide.sections.map((section) => (
            <section key={section.heading} className="mb-12">
              <h2 className="text-2xl font-semibold tracking-tight mb-5">
                {section.heading}
              </h2>

              <div className="space-y-4 leading-relaxed text-slate-300">
                {section.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {section.list && (
                <ul className="mt-5 space-y-3">
                  {section.list.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-3 leading-relaxed text-slate-300"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.dataBlock && (
                <GuideDataBlock block={section.dataBlock} />
              )}

              {section.callout && (
                <aside className="mt-6 rounded-lg border-l-2 border-emerald-500 bg-slate-900 px-5 py-4 text-sm leading-relaxed text-slate-300">
                  {section.callout}
                </aside>
              )}
            </section>
          ))}

          <section className="mb-12">
            <h2 className="text-2xl font-semibold tracking-tight mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {guide.faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="font-semibold text-white mb-2">
                    {faq.question}
                  </h3>
                  <p className="leading-relaxed text-slate-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {guide.related.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4">Next steps</h2>
              <div className="flex flex-col gap-2">
                {guide.related.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm transition-colors hover:border-slate-600"
                  >
                    {link.label} <span aria-hidden>→</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {guide.sources && guide.sources.length > 0 && (
            <section className="mb-12 rounded-lg border border-slate-800 bg-slate-900/50 p-5">
              <h2 className="text-sm font-semibold text-slate-200 mb-3">
                Where these figures come from
              </h2>
              <ul className="space-y-2 text-xs leading-relaxed text-slate-400">
                {guide.sources.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">
                This guide is general information, not financial or legal
                advice. Rules described apply to England. Confirm anything you
                are relying on with the relevant council, scheme or a qualified
                adviser before acting on it.
              </p>
            </section>
          )}

          {siblings.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4">Keep reading</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {siblings.map((g) => (
                  <Link
                    key={g.slug}
                    href={`/guides/${g.slug}`}
                    className="rounded-lg border border-slate-800 bg-slate-900 p-4 transition-colors hover:border-slate-600"
                  >
                    <p className="mb-1 text-xs uppercase tracking-wider text-slate-500">
                      {g.category}
                    </p>
                    <p className="font-medium text-white mb-1">{g.h1}</p>
                    <p className="text-sm text-slate-400">{g.summary}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="rounded-xl border border-slate-700 bg-slate-900 p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">
              Now find the right area
            </h2>
            <p className="text-slate-300 mb-6">
              Add your commute destination, salary and lifestyle preferences to
              get a ranked shortlist of London neighbourhoods.
            </p>
            <Link
              href="/"
              className="inline-block rounded-lg bg-emerald-600 px-6 py-3 font-medium transition-colors hover:bg-emerald-500"
            >
              Open the discovery tool →
            </Link>
          </section>
        </main>
      </div>
    </>
  );
}
