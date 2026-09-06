import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { manchesterPath, manchesterUrl } from "@/lib/manchester/seo-data";
import {
  MANCHESTER_GUIDES,
  getManchesterGuide,
} from "@/lib/manchester/data/guides";
import GuideDataBlock from "@/components/manchester/GuideDataBlock";
import {
  Breadcrumbs,
  DataNote,
  PageShell,
} from "@/components/manchester/Pieces";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return MANCHESTER_GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getManchesterGuide(slug);
  if (!guide) return {};

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: { canonical: manchesterUrl(`/guides/${slug}`) },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: manchesterUrl(`/guides/${slug}`),
      type: "article",
      publishedTime: guide.published,
      modifiedTime: guide.updated,
    },
  };
}

export default async function ManchesterGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getManchesterGuide(slug);
  if (!guide) notFound();

  const others = MANCHESTER_GUIDES.filter((g) => g.slug !== slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.h1,
    description: guide.metaDescription,
    datePublished: guide.published,
    dateModified: guide.updated,
    url: manchesterUrl(`/guides/${slug}`),
    articleSection: guide.category,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Manchester", item: manchesterUrl("/") },
      { "@type": "ListItem", position: 2, name: "Guides", item: manchesterUrl("/guides") },
      { "@type": "ListItem", position: 3, name: guide.h1, item: manchesterUrl(`/guides/${slug}`) },
    ],
  };

  return (
    <>
      {[articleSchema, faqSchema, breadcrumbSchema].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <PageShell>
        <Breadcrumbs
          trail={[
            { label: "Manchester", href: manchesterPath("/") },
            { label: "Guides", href: manchesterPath("/guides") },
            { label: guide.category },
          ]}
        />

        <article>
          <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            {guide.h1}
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            {guide.category} · {guide.readMinutes} min read · Reviewed{" "}
            <time dateTime={guide.updated}>{guide.updated}</time>
          </p>

          <div className="mt-6 max-w-3xl space-y-4">
            {guide.intro.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-slate-200">
                {paragraph}
              </p>
            ))}
          </div>

          {guide.sections.map((section) => (
            <section
              key={section.heading}
              className="mt-12 border-t border-slate-800 pt-8"
            >
              <h2 className="text-2xl font-bold tracking-tight">
                {section.heading}
              </h2>
              <div className="mt-4 max-w-3xl space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="leading-relaxed text-slate-300">
                    {paragraph}
                  </p>
                ))}
              </div>

              {section.list && (
                <div className="mt-5 max-w-3xl">
                  {section.list.title && (
                    <h3 className="mb-2 font-semibold">{section.list.title}</h3>
                  )}
                  <ul className="space-y-3">
                    {section.list.items.map((item) => (
                      <li key={item} className="flex gap-3 text-slate-300">
                        <span aria-hidden="true" className="text-slate-600">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {section.callout && (
                <p className="mt-5 max-w-3xl rounded-lg border-l-2 border-emerald-500 bg-slate-900 px-4 py-3 text-slate-200">
                  {section.callout}
                </p>
              )}

              {section.dataBlock && <GuideDataBlock block={section.dataBlock} />}
            </section>
          ))}

          <section className="mt-12 border-t border-slate-800 pt-8">
            <h2 className="text-2xl font-bold tracking-tight">
              Common questions
            </h2>
            <div className="mt-6 max-w-3xl space-y-8">
              {guide.faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="mb-2 font-semibold text-white">
                    {faq.question}
                  </h3>
                  <p className="leading-relaxed text-slate-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </article>

        <section className="mt-12 border-t border-slate-800 pt-8">
          <h2 className="text-2xl font-bold tracking-tight">Related</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {guide.related.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-sm transition-colors hover:border-slate-600"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 border-t border-slate-800 pt-8">
          <h2 className="text-2xl font-bold tracking-tight">Other guides</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={manchesterPath(`/guides/${other.slug}`)}
                className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 transition-colors hover:border-slate-600"
              >
                <p className="text-sm font-medium">{other.h1}</p>
                <p className="mt-1 text-xs text-slate-500">{other.summary}</p>
              </Link>
            ))}
          </div>
        </section>

        {guide.sources && guide.sources.length > 0 && (
          <DataNote>
            Sources: {guide.sources.join("; ")}. Last reviewed {guide.updated}.
            Figures are for narrowing decisions rather than for making them —
            confirm anything you are relying on with the relevant authority.
          </DataNote>
        )}
      </PageShell>
    </>
  );
}
