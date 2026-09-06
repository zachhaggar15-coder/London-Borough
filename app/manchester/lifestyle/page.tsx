import type { Metadata } from "next";
import Link from "next/link";
import {
  MANCHESTER_LIFESTYLE_PAGES,
  manchesterPath,
  manchesterUrl,
  rankByLifestyle,
} from "@/lib/manchester/seo-data";
import {
  Breadcrumbs,
  DataNote,
  PageShell,
  Section,
} from "@/components/manchester/Pieces";

export const metadata: Metadata = {
  title: "Greater Manchester by lifestyle",
  description:
    "Eight ways to rank Greater Manchester areas — nightlife, food, green space, families, transport, quiet, value and young professionals.",
  alternates: { canonical: manchesterUrl("/lifestyle") },
};

export default function ManchesterLifestyleIndexPage() {
  return (
    <PageShell>
      <Breadcrumbs
        trail={[
          { label: "Manchester", href: manchesterPath("/") },
          { label: "Lifestyle" },
        ]}
      />

      <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
        Greater Manchester by lifestyle
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
        Eight cuts through the same ten lifestyle measures, each weighted for a
        different priority. They are chosen for what this region actually
        offers: with moorland on three sides, how close you are to open country
        is a real question here, and with a radial network and no orbital
        routes, so is whether you can live somewhere without a car.
      </p>

      <Section title="Pick a priority">
        <div className="grid gap-4 sm:grid-cols-2">
          {MANCHESTER_LIFESTYLE_PAGES.map((page) => {
            const top = rankByLifestyle(page, 3);
            return (
              <Link
                key={page.slug}
                href={manchesterPath(`/lifestyle/${page.slug}`)}
                className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-4 transition-colors hover:border-slate-600"
              >
                <p className="font-medium">{page.h1}</p>
                <p className="mt-1 text-xs text-slate-500">
                  Top three: {top.map((r) => r.neighbourhood.name).join(", ")}
                </p>
              </Link>
            );
          })}
        </div>
      </Section>

      <DataNote>
        Every ranking is derived from the same ten 0–10 lifestyle scores held
        against each area, combined with different weights. The scores are
        editorial judgements informed by transport data, published crime and
        deprivation statistics and local knowledge — they are not survey
        results, and nothing here scores schools, which for the family ranking
        in particular is the gap worth knowing about.
      </DataNote>
    </PageShell>
  );
}
