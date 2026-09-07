import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CONTENT_CITY_IDS,
  getCityContent,
  isContentCityId,
} from "@/lib/city-registry";
import { TRAVEL_BANDS, TRAVEL_BAND_LABELS } from "@/lib/travel-band";
import { LIFESTYLE_KEYS, LIFESTYLE_LABELS } from "@/lib/types";
import { spellNumber } from "@/lib/city-content";
import {
  CityBreadcrumbs,
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
    title: `How the ${content.copy.regionLabel} figures are worked out`,
    description: `Sources and method behind the ${content.copy.regionLabel} rent, commute, council tax and lifestyle figures — including what the data cannot tell you.`,
    alternates: { canonical: content.url("/methodology") },
  };
}

/** The four limits that apply to every city, in the same words. */
const SHARED_LIMITS = [
  {
    title: "Schools.",
    body: "Nothing here scores them, which for families is usually the deciding factor. Check catchments directly.",
  },
  {
    title: "What is available right now.",
    body: "These are market estimates, not listings. Nothing here is live.",
  },
  {
    title: "Off-peak and non-public transport.",
    body: "Every journey time assumes weekday-morning public transport. Cycling changes the picture substantially close in, and driving changes it substantially everywhere else.",
  },
];

export default async function CityMethodologyPage({ params }: Props) {
  const { city } = await params;
  if (!isContentCityId(city)) notFound();
  const content = getCityContent(city);
  const { input, copy } = content;

  const areaCount = content.areas.length;
  const compareCount = content.compareSlugs().length;
  const destinationCount = input.destinations.length;
  const noun = input.councilNoun;

  const limits = [...SHARED_LIMITS, ...(copy.extraLimits ?? [])];

  return (
    <PageShell>
      <CityBreadcrumbs content={content} trail={[{ label: "Methodology" }]} />

      <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
        How the {copy.regionLabel} figures are worked out
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
        Every number on these pages comes from one of three places: a published
        statistic, a reviewed estimate built on top of one, or an editorial
        judgement. This page says which is which, and is as specific as it can
        be about where each is weakest — a decision-support figure that hides
        its own error bars is worse than no figure at all.
      </p>

      <Section title="What is covered">
        <p className="max-w-3xl text-slate-300">
          {areaCount} areas across all {spellNumber(input.councils.length)}{" "}
          {noun.plural},{" "}
          {destinationCount} employment destinations, and {compareCount}{" "}
          side-by-side comparisons. Coverage is deliberately uneven: the places
          where more people are choosing between neighbourhoods get more
          neighbourhoods, not because the rest matter less.
        </p>
      </Section>

      <Section title="Rent">
        <div className="max-w-3xl space-y-4 text-slate-300">
          <p>
            The anchor is the ONS Price Index of Private Rents, which publishes
            an average monthly rent by bedroom count. The figures used here are
            for {input.rent.referenceMonth}.
          </p>
          {copy.rentMethod.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {copy.roomMethod.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {input.rent.note && <p>{input.rent.note}</p>}
          <p className="text-slate-400">
            Sources: {input.rent.sources.join("; ")}. Last reviewed{" "}
            {input.rent.reviewedAsOf}.
          </p>
        </div>
      </Section>

      <Section title="Commute times">
        <div className="max-w-3xl space-y-4 text-slate-300">
          <p>
            {content.city.transitAuthority} publishes no open routing API, so
            there is no journey planner to query. Every time on these pages
            comes from a reviewed static matrix instead: one figure for each of
            the {areaCount} areas against each of the {destinationCount}{" "}
            destinations, {areaCount * destinationCount} in total. Nothing here
            calls out to a live service, and nothing claims to.
          </p>
          {copy.commuteMethod.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>Treat a five-minute difference between two areas as noise.</p>
        </div>
      </Section>

      <Section title="Travel bands, and why not a zone system">
        <div className="max-w-3xl space-y-4 text-slate-300">
          <p>{input.travelBands.rationale}</p>
          <p>
            So centrality is described directly, in the terms someone moving
            here actually reasons in:
          </p>
          <dl className="space-y-3">
            {TRAVEL_BANDS.map((band) => (
              <div key={band} className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                <dt className="w-40 shrink-0 font-medium text-slate-200">
                  {TRAVEL_BAND_LABELS[band]} ({input.travelBands.distances[band]}
                  )
                </dt>
                <dd className="text-slate-400">
                  {input.travelBands.descriptions[band]}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section title="Council tax">
        <div className="max-w-3xl space-y-4 text-slate-300">
          {copy.councilTaxMethod.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {input.councilTax.notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
          <p>
            Every other band is derived exactly from Band D using the statutory
            ratios, which do not vary by authority. Band D is a reference
            point, not a typical charge — that is the most common way these
            figures get misread.
          </p>
          <p className="text-slate-400">
            Sources: {input.councilTax.sources.join("; ")}. Every figure was
            cross-checked against two independent published comparison tables.
            They remain secondary sources: confirm the charge for a specific
            address with the council before budgeting against it. Last reviewed{" "}
            {input.councilTax.asOf}.
          </p>
        </div>
      </Section>

      <Section title="Take-home pay">
        <p className="max-w-3xl text-slate-300">{content.taxRegimeLabel}</p>
      </Section>

      <Section title="Lifestyle scores">
        <div className="max-w-3xl space-y-4 text-slate-300">
          <p>
            Each area carries {LIFESTYLE_KEYS.length} scores from 0 to 10:{" "}
            {LIFESTYLE_KEYS.map((k) => LIFESTYLE_LABELS[k].toLowerCase()).join(
              ", ",
            )}
            . They are comparable between the areas covered here and nowhere
            else: a 7 for nightlife means seventh-decile among these{" "}
            {areaCount} areas, not on any absolute scale.
          </p>
          <p>
            These are editorial judgements, informed by transport data,
            published crime and deprivation statistics and local knowledge.
            They are not survey results and they are not derived from a
            formula. The{" "}
            <Link
              href={content.path("/lifestyle")}
              className="underline underline-offset-2 hover:text-white"
            >
              lifestyle rankings
            </Link>{" "}
            combine them with different weights, which are stated on each page.
          </p>
        </div>
      </Section>

      <Section title="What this cannot tell you">
        <ul className="max-w-3xl space-y-3 text-slate-300">
          {limits.map((limit) => (
            <li key={limit.title} className="flex gap-3">
              <span aria-hidden="true" className="text-slate-600">—</span>
              <span>
                <strong className="font-medium text-white">{limit.title}</strong>{" "}
                {limit.body}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Corrections">
        <p className="max-w-3xl text-slate-300">
          If a figure here is wrong, it is worth telling us — particularly a
          rent estimate, which is the part most likely to drift.{" "}
          <Link
            href="/contact"
            className="underline underline-offset-2 hover:text-white"
          >
            Get in touch
          </Link>
          .
        </p>
      </Section>
    </PageShell>
  );
}
