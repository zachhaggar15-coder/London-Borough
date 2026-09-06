import type { Metadata } from "next";
import Link from "next/link";
import {
  getManchesterCompareSlugs,
  getManchesterComparePageData,
  manchesterPath,
  manchesterUrl,
} from "@/lib/manchester/seo-data";
import {
  Breadcrumbs,
  DataNote,
  PageShell,
  Section,
} from "@/components/manchester/Pieces";

export const metadata: Metadata = {
  title: "Compare Greater Manchester areas side by side",
  description:
    "Chorlton or Didsbury? Sale or Altrincham? Side-by-side comparisons of Greater Manchester areas on rent, commute, green space and how lively they are.",
  alternates: { canonical: manchesterUrl("/compare") },
};

export default function ManchesterCompareIndexPage() {
  const comparisons = getManchesterCompareSlugs()
    .map((slug) => getManchesterComparePageData(slug))
    .filter((c): c is NonNullable<typeof c> => c !== null);

  return (
    <PageShell>
      <Breadcrumbs
        trail={[
          { label: "Manchester", href: manchesterPath("/") },
          { label: "Compare" },
        ]}
      />

      <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
        Compare Greater Manchester areas
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
        {comparisons.length} side-by-side comparisons. Not every possible pair
        — only the ones that are a genuine either/or: near enough to each other
        that the same job is commutable from both, close enough in rent that
        price alone does not decide it, and in the same or an adjoining travel
        band. Pairing Hale with Leigh would produce a page, but not a decision
        anybody is making.
      </p>

      <Section title="Every comparison">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {comparisons.map((c) => (
            <Link
              key={c.slug}
              href={manchesterPath(`/compare/${c.slug}`)}
              className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 transition-colors hover:border-slate-600"
            >
              <p className="text-sm font-medium">
                {c.a.name} vs {c.b.name}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                £{c.a.rent.oneBedMedianGbp.toLocaleString()} vs £
                {c.b.rent.oneBedMedianGbp.toLocaleString()} for a one-bed
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <DataNote>
        Each comparison sets the same figures against each other: rent at three
        levels, journey times to ten destinations, and the ten lifestyle
        scores. Where the two are close, the page says so rather than
        manufacturing a winner.
      </DataNote>
    </PageShell>
  );
}
