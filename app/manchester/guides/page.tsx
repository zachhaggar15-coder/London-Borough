import type { Metadata } from "next";
import Link from "next/link";
import { manchesterPath, manchesterUrl } from "@/lib/manchester/seo-data";
import {
  MANCHESTER_GUIDES,
  manchesterGuidesByRecency,
} from "@/lib/manchester/data/guides";
import {
  Breadcrumbs,
  DataNote,
  PageShell,
  Section,
} from "@/components/manchester/Pieces";

export const metadata: Metadata = {
  title: "Greater Manchester guides",
  description:
    "What Greater Manchester costs, how renting works here, how the transport actually behaves, and what to sort out in which order.",
  alternates: { canonical: manchesterUrl("/guides") },
};

export default function ManchesterGuidesPage() {
  const guides = manchesterGuidesByRecency();

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Greater Manchester guides",
    itemListElement: guides.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: guide.h1,
      url: manchesterUrl(`/guides/${guide.slug}`),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <PageShell>
        <Breadcrumbs
          trail={[
            { label: "Manchester", href: manchesterPath("/") },
            { label: "Guides" },
          ]}
        />

        <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
          Greater Manchester guides
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
          The rest of this section answers &ldquo;which area&rdquo;. These
          answer the questions that come before it: what things cost, how
          renting works here, how the transport network actually behaves, and
          what to sort out in which order.
        </p>

        <Section title={`${MANCHESTER_GUIDES.length} guides`}>
          <div className="grid gap-4 sm:grid-cols-2">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={manchesterPath(`/guides/${guide.slug}`)}
                className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-4 transition-colors hover:border-slate-600"
              >
                <p className="text-xs uppercase tracking-wide text-emerald-500">
                  {guide.category}
                </p>
                <p className="mt-1.5 font-medium">{guide.h1}</p>
                <p className="mt-1.5 text-sm text-slate-400">{guide.summary}</p>
                <p className="mt-2 text-xs text-slate-600">
                  {guide.readMinutes} min read
                </p>
              </Link>
            ))}
          </div>
        </Section>

        <DataNote>
          Every checkable figure in these guides carries a source and a review
          date, and the tables inside them read the same datasets as the rest
          of the site, so a rent revision updates the guides in the same deploy.
          Legal points are England-only and say so. Where a figure could not be
          corroborated against a source we were willing to publish, the guide
          says to check it rather than quoting it.
        </DataNote>
      </PageShell>
    </>
  );
}
