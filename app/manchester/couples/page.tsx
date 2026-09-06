import type { Metadata } from "next";
import CouplesClient from "@/components/CouplesClient";
import { manchesterPath, manchesterUrl } from "@/lib/manchester/seo-data";
import {
  Breadcrumbs,
  DataNote,
  PageShell,
} from "@/components/manchester/Pieces";

export const metadata: Metadata = {
  title: "Where to live as a couple or flatmates in Greater Manchester",
  description:
    "Two people, two commutes, one shared budget. Compare Greater Manchester areas that work for both of you rather than only for whoever has the easier journey.",
  alternates: { canonical: manchesterUrl("/couples") },
  openGraph: {
    title: "Where to live as a couple or flatmates in Greater Manchester",
    description:
      "Find Greater Manchester areas that balance two commutes and a shared rent budget.",
    url: manchesterUrl("/couples"),
    type: "website",
  },
};

export default function ManchesterCouplesPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Manchester", item: manchesterUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Couples and flatmates",
        item: manchesterUrl("/couples"),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageShell>
        <Breadcrumbs
          trail={[
            { label: "Manchester", href: manchesterPath("/") },
            { label: "Couples and flatmates" },
          ]}
        />

        <p className="mb-3 text-sm uppercase tracking-wide text-emerald-400">
          Two commutes, one shortlist
        </p>
        <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
          Where should we live as a couple or flatmates?
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
          This is a harder question in Greater Manchester than it looks. The
          network runs into the centre and barely runs around it, so two people
          working on opposite sides of the conurbation have very few places that
          suit them both — and the obvious compromise, somewhere in the middle,
          is often the most expensive option on the list.
        </p>
        <p className="mt-4 max-w-3xl text-slate-300">
          Pick two workplaces, a commute cap each, a shared budget and a shared
          idea of the kind of area you want. The ranking favours fair
          compromises: an area where one of you has a fifteen-minute journey and
          the other an hour scores worse than one where you both have half an
          hour.
        </p>

        <div className="mt-10">
          <CouplesClient city="manchester" />
        </div>

        <DataNote>
          Journey times are reviewed door-to-door estimates for a weekday
          morning, drawn from the same matrix as the rest of this section — see
          the{" "}
          <a
            href={manchesterPath("/methodology")}
            className="underline underline-offset-2 hover:text-slate-300"
          >
            methodology
          </a>
          . The shared budget is the total for the household, and rents shown
          are for the rent type you pick rather than per person.
        </DataNote>
      </PageShell>
    </>
  );
}
