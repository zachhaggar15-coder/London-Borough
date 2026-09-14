import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CONTENT_CITY_IDS,
  getCityContent,
  isContentCityId,
} from "@/lib/city-registry";
import { TRAVEL_BANDS, TRAVEL_BAND_LABELS } from "@/lib/travel-band";
import { spellNumber } from "@/lib/city-content";
import { money, moneyWithGbp } from "@/lib/currency";
import CityToolClient from "@/app/[city]/CityToolClient";
import {
  BandPill,
  DataNote,
  PageShell,
  Section,
} from "@/components/city/Pieces";

type Props = { params: Promise<{ city: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return CONTENT_CITY_IDS.map((city) => ({ city }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  if (!isContentCityId(city)) return {};
  const content = getCityContent(city);

  return {
    // `absolute` because a layout's title template applies to its child
    // segments and not to the page sitting alongside it. Without this the
    // hub would inherit the root template and name the wrong city.
    title: { absolute: `${content.copy.homeH1} | ${content.city.brand}` },
    description: content.copy.homeMetaDescription,
    alternates: { canonical: content.url("/") },
    openGraph: {
      title: content.copy.homeH1,
      description: content.copy.homeMetaDescription,
      url: content.url("/"),
    },
  };
}

export default async function CityHomePage({ params }: Props) {
  const { city } = await params;
  if (!isContentCityId(city)) notFound();
  const content = getCityContent(city);
  const { copy, input } = content;

  const areaCount = content.areas.length;
  const { oneBed, twoBed } = content.rentMedians();
  const councils = content.councils;
  const noun = input.councilNoun;

  const byRent = [...councils].sort(
    (a, b) =>
      input.rent.baselines[input.rent.baselineForCouncil[a]].oneBed -
      input.rent.baselines[input.rent.baselineForCouncil[b]].oneBed,
  );
  const cheapestCouncil = byRent[0];
  const priciestCouncil = byRent[byRent.length - 1];
  const rentOf = (c: string) =>
    input.rent.baselines[input.rent.baselineForCouncil[c]].oneBed;
  const lowestTaxCouncil = content.councilsByBandD[0];

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: copy.homeH1,
    url: content.url("/"),
    description: copy.homeMetaDescription,
    about: { "@type": "Place", name: input.regionName },
  };

  // The two questions every region gets asked are the same two, and both
  // answers are computed rather than written, so they cannot drift from
  // the tables further down the page.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      ...copy.homeFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
      {
        "@type": "Question",
        name: `How much is rent in ${input.regionName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Across the ${areaCount} areas covered here the median one-bed sits at around ${moneyWithGbp(oneBed, input.currency)} a month and the median two-bed at around ${money(twoBed, input.currency)}. The spread is wide: the published average one-bed runs from ${money(rentOf(cheapestCouncil), input.currency)} in ${cheapestCouncil} to ${money(rentOf(priciestCouncil), input.currency)} in ${priciestCouncil}.`,
        },
      },
      // Only asked where the city levies one. In Paris and Barcelona a
      // tenant pays no residence tax at all, and the local-costs table on
      // the council pages is the honest answer instead.
      ...(content.councilTax
        ? [
            {
              "@type": "Question",
              name: `Which ${input.regionName} ${noun.singular} has the lowest council tax?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `${lowestTaxCouncil}, at ${money(content.councilTax.bandD[lowestTaxCouncil], input.currency)} at Band D for ${content.councilTax.year}.`,
              },
            },
          ]
        : []),
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

      {/* ── Interactive tool ─────────────────────────────────────────── */}
      <div id="finder" className="h-[85vh] min-h-[560px] w-full overflow-hidden">
        <CityToolClient city={city} />
      </div>

      <PageShell>
        <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
          {copy.homeH1}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
          {copy.homeIntro} This section covers {areaCount} areas across all{" "}
          {spellNumber(councils.length)} {noun.plural}, with reviewed rents,
          door-to-door
          journey times and the trade-offs each one asks you to make.
        </p>

        <Section
          title="Before you pick an area"
          lead="What it costs, how renting works here, and how the transport actually behaves."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {content.guidesByRecency().map((guide) => (
              <Link
                key={guide.slug}
                href={content.path(`/guides/${guide.slug}`)}
                className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 transition-colors hover:border-slate-600"
              >
                <p className="text-sm font-medium">{guide.h1}</p>
                <p className="mt-1 text-xs text-slate-400">{guide.summary}</p>
              </Link>
            ))}
          </div>
        </Section>

        <Section
          title="How far out is far out?"
          lead="Centrality here is described directly — how far out you are, and what that costs you in journey time to the middle."
        >
          <dl className="space-y-4">
            {TRAVEL_BANDS.map((band) => (
              <div key={band} className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                <dt className="w-24 shrink-0 font-medium">
                  {TRAVEL_BAND_LABELS[band]}
                </dt>
                <dd className="max-w-2xl text-slate-400">
                  {input.travelBands.descriptions[band]}
                </dd>
              </div>
            ))}
          </dl>
          <DataNote>
            {input.travelBands.rationale} Read more in the{" "}
            <Link
              href={content.path("/methodology")}
              className="underline underline-offset-2 hover:text-slate-300"
            >
              methodology
            </Link>
            .
          </DataNote>
        </Section>

        {/*
          One page carrying every area's written summary, rather than one
          thin page per area. The per-area pages are switched off until
          each has writing of its own — see lib/city-sections.ts.
        */}
        <Section
          title={`All ${areaCount} areas at a glance`}
          lead={`Working outwards from the middle. Rents are typical one-bed asking rents; the ${noun.singular} is where council services and any local tax are set.`}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {content.areasByBand().map((n) => (
              <div
                key={n.id}
                className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-medium">{n.name}</h3>
                  <p className="shrink-0 text-sm tabular-nums text-slate-400">
                    {money(n.rent.oneBedMedianGbp, input.currency)}
                  </p>
                </div>
                <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span>{n.borough}</span>
                  <BandPill area={n} />
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {n.summary}
                </p>
              </div>
            ))}
          </div>
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
          {input.rent.referenceMonth}, with a reviewed neighbourhood premium or
          discount applied on top. Journey times are reviewed door-to-door
          estimates, not timetable times, and there is no live journey planner
          behind them — {content.city.transitAuthority} publishes no open
          journey planner. Everything here is for narrowing a shortlist, not
          for valuing a flat.
        </DataNote>
      </PageShell>
    </>
  );
}
