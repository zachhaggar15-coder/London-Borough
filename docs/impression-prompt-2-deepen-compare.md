# Prompt 2 — Deepen high-impression, low-ranking compare pages

> Run AFTER prompt 1 (internal-link rebalance) is merged.
> Lever: a handful of compare pages already earn real impressions but rank on page 4–9
> because they're thin/templated. Moving them up surfaces them for many more long-tail
> query variants, which raises impressions (and clicks).

## Context

- File: `app/compare/[slug]/page.tsx` (2,439 static pages, currently templated).
- Data: `lib/data/neighbourhoods.ts` (rent, lifestyle scores, strengths, tradeoffs,
  transportZones, mainStations, summary), `lib/data/rent-market.ts` (rent sources + as-of date).
- Page-data builder: `getComparePageData(slug)` in `lib/seo-data.ts`.

## Priority pages (highest impressions, worst positions)

| Slug | Impressions | Position |
|---|---|---|
| borough-vs-bermondsey | 99 | 48.8 |
| kentish-town-vs-camden | 59 | 42.6 |
| shoreditch-vs-hackney-wick | 35 | 36.0 |
| hackney-central-vs-hoxton | 23 | 56.2 |
| peckham-vs-camberwell | 19 | 38.3 |
| forest-gate-vs-stockwell | 18 | 43.7 |
| forest-hill-vs-twickenham | 18 | 49.2 |

Also apply to the next ~15 compare pages with >8 impressions and position >20 (read them
from `docs/../gsc` Pages.csv if available, else the list above is enough to start).

## Tasks

**1. Add a unique, data-driven intro paragraph per compare page.**
Currently the intro is formulaic. Generate a 60–90 word opening that references the *specific*
differences from the data: the actual rent gap (£X/month), which area wins on transport/green/
nightlife/safety, and the one-line "who each suits" verdict. Vary sentence structure by using
the computed winners (`rentWinner`, `connectivityWinner`, etc.) so no two pages read identically.

**2. Add a comparison-specific FAQ (3 Q&As) with matching JSON-LD.**
Questions must match real search phrasing, e.g.:
- "Is {A} or {B} cheaper to rent?"
- "Which is better for [transport / nightlife / families], {A} or {B}?"
- "Should I live in {A} or {B}?"
Answer from the data only. Extend the existing `FAQPage` schema block — do not add a second one.

**3. Add a short "How they compare on transport" section.**
Use `mainStations` / `transportZones` to write 2–3 sentences naming the actual lines and zones
for each area. This adds unique, crawlable content that thin competitors lack.

**4. Surface the rent as-of date and source.**
Render `RENT_MARKET_REVIEW_AS_OF` and a source line (from `RENT_MARKET_SOURCES`) near the rent
figures — signals freshness/E-E-A-T to Google.

## Constraints

- No invented numbers — everything derives from existing data fields.
- Keep it fully static; `npm run build` must pass with unchanged route counts.
- No two pages should have identical intro/FAQ text (drive variation from the data).

## Definition of done

- The 7 priority pages (and the next ~15) each have: unique intro, 3-item comparison FAQ in
  visible copy + JSON-LD, a transport comparison section, and a visible rent source/as-of line.
- Build passes; no type errors.

## After shipping

Request indexing in GSC for the 7 priority slugs; re-check their positions after ~3 weeks.
Target: move borough-vs-bermondsey and kentish-town-vs-camden from page 4–5 to page 1–2.
