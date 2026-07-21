# Targeted prompt — grow search impressions for london-borough.vercel.app

> Paste everything below into your coding agent (Claude Code / Cursor) working in this repo.
> It is scoped to the single highest-leverage problem found in the SEO audit: the 140
> neighbourhood pages that target the site's highest-demand queries ("living in X",
> "is X a nice place to live") are being starved by a 2,439-page compare-page internal-link
> mesh, so Google ranks compare pages at position 50–90 for neighbourhood-intent queries
> instead of ranking the neighbourhood pages.

---

## Context you (the agent) need

- Next.js App Router. Key files:
  - `app/compare/[slug]/page.tsx` — 2,439 static pages, each links to 4–8 *other compare pages* via `relatedComparisons(a.id, 8)` and only 2 neighbourhood pages.
  - `app/neighbourhoods/[slug]/page.tsx` — ~140 pages; currently link *out* to compare pages via `relatedComparisonSlugs`.
  - `app/neighbourhoods/page.tsx` — the neighbourhood hub/index.
  - `lib/seo-data.ts` — page-data builders and `relatedComparisons`, `getAllNeighbourhoodSlugs`, etc.
  - `lib/data/neighbourhoods.ts` — 140 neighbourhoods with `id`, `name`, `borough`, `rent`, `lifestyle`, `summary`, `strengths`, `tradeoffs`, `transportZones`, `mainStations`, `centroid`.
- Do **not** change routing, canonicals, or the sitemap logic — those are correct.
- Keep all pages fully static (`dynamicParams = false`).

## Goal

Rebalance internal links **toward** neighbourhood pages and make each neighbourhood page
explicitly answer the query patterns people are searching, so those pages get crawled,
indexed and ranked for their intent — increasing the number of queries the site appears for.

## Tasks

**1. Add a prominent "Living in {A} and {B}" link block to every compare page.**
In `app/compare/[slug]/page.tsx`, near the top of the body (above the related-comparisons
block), add two clear internal links to `/neighbourhoods/{a.id}` and `/neighbourhoods/{b.id}`
with descriptive anchor text like `Living in {a.name} — full area guide`. This pushes equity
from the strong compare cluster into the neighbourhood pages.

**2. Reduce compare→compare link density slightly and add compare→neighbourhood links.**
Change `relatedComparisons(a.id, 8)` down to 4 related compare links, and in that same
"related" section add a short "Explore these areas" list linking to the individual
neighbourhood pages referenced by those comparisons. Net effect: fewer self-referential
compare links, more links into neighbourhood pages.

**3. Strengthen the neighbourhood hub (`app/neighbourhoods/page.tsx`).**
Ensure it links to **all** ~140 neighbourhood pages (grouped by borough, with borough
sub-headings). This gives every neighbourhood page a reliable internal link from a
high-priority (0.9) hub page. Add descriptive anchor text ("Living in {name}, {borough}").

**4. Link the neighbourhood hub from the homepage and add a global nav/footer.**
Add a site-wide footer component (rendered in `app/layout.tsx`) linking to the main hubs:
Neighbourhoods, Compare, Commute, Lifestyle, Boroughs. Every page should link to the
neighbourhood hub in ≤1 click.

**5. Add query-matched content to `app/neighbourhoods/[slug]/page.tsx`.**
- Add an `<h2>` and a short (40–60 word) paragraph answering **"Is {name} a nice place to live?"**
  built from existing data (`summary`, `strengths`, `tradeoffs`, `lifestyle` scores).
- Add a second `<h2>` **"What is {name} like to live in?"** summarising vibe + who it suits.
- Extend the existing `FAQPage` JSON-LD with these two Q&As (question text must match the
  search phrasing exactly: "Is {name} a nice place to live?" and "What is {name} like to live in?").
  Keep answers grounded in the data — no invented facts.

**6. Refresh compare-page titles for CTR.**
In `generateMetadata` in `app/compare/[slug]/page.tsx`, append a year hook, e.g.
`${a.name} vs ${b.name} (2026): rent, transport & lifestyle`. Match the neighbourhood/lifestyle
title style. Keep titles under ~60 characters where possible.

## Constraints

- No fabricated statistics — every new sentence must derive from existing fields in
  `lib/data/neighbourhoods.ts` / `rent-market.ts`.
- Keep the build fully static; run `npm run build` and confirm compare + neighbourhood
  page counts are unchanged and the build passes.
- Keep changes typed; no `any`.

## Definition of done

- Every compare page links to both of its neighbourhood pages above the fold of the body.
- Every neighbourhood page is reachable from the neighbourhood hub, and the hub is in the
  global footer on all pages.
- Each neighbourhood page has "Is X a nice place to live?" and "What is X like to live in?"
  as visible H2s **and** in FAQ JSON-LD.
- Compare titles include the 2026 hook.
- `npm run build` passes with no new type errors and unchanged route counts.

## After shipping

In Google Search Console: resubmit the sitemap and use **URL Inspection → Request indexing**
on 5–10 neighbourhood pages that currently rank 50–90 (e.g. kentish-town, hoxton, holloway,
wapping, herne-hill). Re-check impressions by page after 2–3 weeks.
