import type { Metadata } from "next";
import Link from "next/link";
import { CITIES } from "@/lib/cities";
import {
  MANCHESTER_LIFESTYLE_PAGES,
  getAllManchesterSlugs,
  getManchesterCompareSlugs,
  manchesterPath,
  manchesterRentMedians,
  manchesterUrl,
  neighbourhoodsByBand,
} from "@/lib/manchester/seo-data";
import { GM_BOROUGHS, boroughSlug } from "@/lib/manchester/boroughs";
import { MANCHESTER_DESTINATIONS } from "@/lib/manchester/data/destinations";
import { ONS_BOROUGH_RENT_GBP, ONS_RENT_REFERENCE_MONTH } from "@/lib/manchester/data/rent-market";
import { BAND_D_BY_BOROUGH } from "@/lib/manchester/data/council-tax";
import {
  TRAVEL_BANDS,
  TRAVEL_BAND_DESCRIPTIONS,
  TRAVEL_BAND_LABELS,
} from "@/lib/manchester/travel-band";
import { manchesterGuidesByRecency } from "@/lib/manchester/data/guides";
import { AreaCard, DataNote, PageShell, Section } from "@/components/manchester/Pieces";

const CITY = CITIES.manchester;

export const metadata: Metadata = {
  // `absolute` because a layout's title template applies to its child
  // segments and not to the page sitting alongside it. Without this the
  // hub renders "Where to live in Greater Manchester | Where in London",
  // which is the one title on the whole section that would say London.
  title: { absolute: `Where to live in Greater Manchester | ${CITY.brand}` },
  description:
    "Find the right Greater Manchester neighbourhood by commute, rent and how you want to live. 57 areas across all ten boroughs, with reviewed rents and journey times.",
  alternates: { canonical: manchesterUrl("/") },
  openGraph: {
    title: "Where to live in Greater Manchester",
    description:
      "57 Greater Manchester areas compared on rent, commute and lifestyle — across all ten boroughs.",
    url: manchesterUrl("/"),
  },
};

export default function ManchesterHomePage() {
  const areaCount = getAllManchesterSlugs().length;
  const { oneBed, twoBed } = manchesterRentMedians();
  const featuredAreas = neighbourhoodsByBand().slice(0, 8);
  const compareCount = getManchesterCompareSlugs().length;

  const cheapestBorough = [...GM_BOROUGHS].sort(
    (a, b) => ONS_BOROUGH_RENT_GBP[a].oneBed - ONS_BOROUGH_RENT_GBP[b].oneBed,
  )[0];
  const priciestBorough = [...GM_BOROUGHS].sort(
    (a, b) => ONS_BOROUGH_RENT_GBP[b].oneBed - ONS_BOROUGH_RENT_GBP[a].oneBed,
  )[0];
  const lowestTaxBorough = [...GM_BOROUGHS].sort(
    (a, b) => BAND_D_BY_BOROUGH[a] - BAND_D_BY_BOROUGH[b],
  )[0];

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Where to live in Greater Manchester",
    url: manchesterUrl("/"),
    description:
      "Greater Manchester neighbourhood guide covering rent, commute times and lifestyle across all ten boroughs.",
    about: { "@type": "Place", name: "Greater Manchester" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the best area to live in Manchester?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It depends what you are optimising for. For nightlife and walking to work, the Northern Quarter and Ancoats. For a village feel with a tram, Chorlton, Didsbury or Prestwich. For schools and green space, Altrincham, Sale or Cheadle Hulme. For the lowest rent with a usable commute, Levenshulme, Stretford or Ashton-under-Lyne.",
        },
      },
      {
        "@type": "Question",
        name: "How much is rent in Greater Manchester?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Across the ${areaCount} areas covered here the median one-bed sits at around £${oneBed.toLocaleString()} a month and the median two-bed at around £${twoBed.toLocaleString()}. The spread by borough is wide: ONS puts the average one-bed at £${ONS_BOROUGH_RENT_GBP[cheapestBorough].oneBed} in ${cheapestBorough} and £${ONS_BOROUGH_RENT_GBP[priciestBorough].oneBed} in ${priciestBorough}.`,
        },
      },
      {
        "@type": "Question",
        name: "Is Manchester cheaper than London to rent in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Substantially, on rent. A one-bed in central Manchester costs roughly what a one-bed in an outer London zone does, and the gap widens the further out you go. Council tax runs the other way: every Greater Manchester borough charges more at Band D than several inner London boroughs do.",
        },
      },
      {
        "@type": "Question",
        name: "Which Greater Manchester borough has the lowest council tax?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `${lowestTaxBorough}, at £${BAND_D_BY_BOROUGH[lowestTaxBorough].toLocaleString()} at Band D for 2026/27 including the Mayoral precept. It is the only one of the ten below £2,200.`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageShell>
        <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
          Where to live in Greater Manchester
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
          Greater Manchester is not a city with suburbs. It is ten boroughs
          and a couple of dozen towns that grew into each other, and the
          practical consequence is that two places eight miles apart can
          differ by £400 a month in rent, forty minutes in commute and half a
          band in council tax. This section covers {areaCount} areas across
          all ten, with reviewed rents, door-to-door journey times and the
          trade-offs each one asks you to make.
        </p>

        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <Link
            href={manchesterPath("/neighbourhoods")}
            className="rounded-lg bg-emerald-600 px-4 py-2 font-medium transition-colors hover:bg-emerald-500"
          >
            Browse all {areaCount} areas
          </Link>
          <Link
            href={manchesterPath("/rent-index")}
            className="rounded-lg border border-slate-700 px-4 py-2 transition-colors hover:border-slate-500"
          >
            Rent by area
          </Link>
          <Link
            href={manchesterPath("/boroughs")}
            className="rounded-lg border border-slate-700 px-4 py-2 transition-colors hover:border-slate-500"
          >
            The ten boroughs
          </Link>
        </div>

        <Section
          title="How far out is far out?"
          lead="Greater Manchester has no equivalent of London's travel zones, so this site describes centrality directly."
        >
          <dl className="space-y-4">
            {TRAVEL_BANDS.map((band) => (
              <div key={band} className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                <dt className="w-24 shrink-0 font-medium">
                  {TRAVEL_BAND_LABELS[band]}
                </dt>
                <dd className="max-w-2xl text-slate-400">
                  {TRAVEL_BAND_DESCRIPTIONS[band]}
                </dd>
              </div>
            ))}
          </dl>
          <DataNote>
            Metrolink runs its own zones 1–4, but they cover only the tram.
            Heavy rail into Piccadilly and Victoria prices on a separate
            scheme and the bus network on a third, so a Metrolink zone
            describes nothing at all for a place like Heaton Moor or Urmston.
            Read more in the{" "}
            <Link
              href={manchesterPath("/methodology")}
              className="underline underline-offset-2 hover:text-slate-300"
            >
              methodology
            </Link>
            .
          </DataNote>
        </Section>

        <Section
          title="Start from where you work"
          lead="Ten employment centres, each with every area ranked by how long it actually takes to get there on a weekday morning."
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MANCHESTER_DESTINATIONS.map((d) => (
              <Link
                key={d.id}
                href={manchesterPath(`/commute/${d.id}`)}
                className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm transition-colors hover:border-slate-600"
              >
                Best areas for commuting to {d.label}
              </Link>
            ))}
          </div>
        </Section>

        <Section
          title="Start from how you want to live"
          lead="Eight cuts through the same data, weighted for different priorities."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {MANCHESTER_LIFESTYLE_PAGES.map((page) => (
              <Link
                key={page.slug}
                href={manchesterPath(`/lifestyle/${page.slug}`)}
                className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 transition-colors hover:border-slate-600"
              >
                <p className="text-sm font-medium">{page.h1}</p>
              </Link>
            ))}
          </div>
        </Section>

        <Section
          title="A few places to start"
          lead="Working outwards from the middle."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {featuredAreas.map((n) => (
              <AreaCard key={n.id} neighbourhood={n} />
            ))}
          </div>
          <Link
            href={manchesterPath("/neighbourhoods")}
            className="mt-6 inline-block text-sm text-emerald-400 transition-colors hover:text-emerald-300"
          >
            All {areaCount} areas →
          </Link>
        </Section>

        <Section
          title="Before you pick an area"
          lead="What it costs, how renting works here, how the transport actually behaves, and what changes if you are moving up from London."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {manchesterGuidesByRecency().map((guide) => (
              <Link
                key={guide.slug}
                href={manchesterPath(`/guides/${guide.slug}`)}
                className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 transition-colors hover:border-slate-600"
              >
                <p className="text-sm font-medium">{guide.h1}</p>
                <p className="mt-1 text-xs text-slate-400">{guide.summary}</p>
              </Link>
            ))}
          </div>
        </Section>

        <Section
          title="The ten boroughs"
          lead="Rents, council tax and the areas inside each one."
        >
          <div className="flex flex-wrap gap-3">
            {GM_BOROUGHS.map((borough) => (
              <Link
                key={borough}
                href={manchesterPath(`/boroughs/${boroughSlug(borough)}`)}
                className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-sm transition-colors hover:border-slate-600"
              >
                {borough}
              </Link>
            ))}
          </div>
        </Section>

        <Section
          title="Weighing up two areas"
          lead={`${compareCount} side-by-side comparisons, limited to pairs that are a genuine either/or rather than every possible combination.`}
        >
          <Link
            href={manchesterPath("/compare")}
            className="inline-block rounded-lg border border-slate-700 px-4 py-2 text-sm transition-colors hover:border-slate-500"
          >
            Browse comparisons →
          </Link>
        </Section>

        <Section title="Common questions">
          <div className="max-w-3xl space-y-8">
            {faqSchema.mainEntity.map((entry) => (
              <div key={entry.name}>
                <h3 className="mb-2 font-semibold text-white">{entry.name}</h3>
                <p className="text-slate-300">{entry.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </Section>

        <DataNote>
          Rent baselines come from the ONS Price Index of Private Rents for{" "}
          {ONS_RENT_REFERENCE_MONTH}, with a reviewed neighbourhood premium or
          discount applied on top. Journey times are reviewed door-to-door
          estimates, not timetable times, and there is no live journey planner
          behind them — {CITY.transitAuthority} publishes no open equivalent of
          the one London uses. Everything here is for narrowing a shortlist,
          not for valuing a flat.
        </DataNote>
      </PageShell>
    </>
  );
}
