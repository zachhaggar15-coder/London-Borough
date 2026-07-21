# SEO Audit — london-borough.vercel.app ("Where in London")

**Date:** 21 July 2026
**Data window:** 26 May – 19 July 2026 (Web search, Google Search Console export)
**Goal of this audit:** find the highest-leverage changes to grow **impressions**, validated against the actual codebase.

---

## 1. Headline numbers

| Metric | Value |
|---|---|
| Clicks | 47 |
| Impressions | 1,882 |
| CTR | 2.5% |
| Avg position | ~14–17 |
| Indexed pages with impressions | 301 |
| Built pages (compare) | 2,439 |
| Built pages (neighbourhood) | ~140 |

**Trend is healthy.** Daily impressions rose from ~3/day in early June to 55–86/day by mid-July — the site is being crawled and gaining traction. This is a young site (first impressions 2 June 2026), so the job now is to remove the ceiling on that growth.

**Traffic is lopsided.** 287 of the 301 pages earning impressions are `/compare/*`. Neighbourhood, lifestyle, commute, boroughs and salary pages are almost invisible in search. That is the central finding.

Devices: Mobile 1,044 imp (pos 9.7) ≫ Desktop 775 (pos 24.6) ≫ Tablet 23. Desktop ranks far worse than mobile. Geography: 97% United Kingdom — correctly targeted.

---

## 2. Technical foundation — strong, not the bottleneck

The codebase does the fundamentals well, so don't spend time here:

- **Metadata**: every page type has a unique `generateMetadata` with title, description, and self-referencing `canonical`. Good.
- **Sitemap** (`app/sitemap.xml/route.ts`): includes all route types; neighbourhood pages given priority 0.9 (higher than compare at 0.6). Good.
- **robots.txt**: allows all, disallows `/api/`, points to sitemap. Correct.
- **Structured data**: `FAQPage`, `BreadcrumbList`, `Place`/`GeoCoordinates`, `WebSite`+`SearchAction`, `ItemList` all present. Good coverage.
- `dynamicParams = false` + `generateStaticParams` → fully static, fast pages.

The `Search appearance.csv` is empty, meaning Google hasn't yet awarded any rich-result treatment (FAQ, breadcrumb). That's normal for a two-month-old site — the schema is in place and should activate as authority builds.

**Conclusion: technical SEO is not what's capping impressions. Site architecture and internal linking are.**

---

## 3. The core problem: a 2,439-page compare mesh is starving 140 neighbourhood pages

### What the query data shows

The searches driving impressions fall into clear intent buckets:

| Intent pattern | Example queries | Which page *should* win | What's actually ranking |
|---|---|---|---|
| Area comparison | "barnes vs richmond", "mayfair vs chelsea" | `/compare/*` | ✅ `/compare/*` (working) |
| **Living in an area** | "living in kentish town" (pos 87), "living in hoxton" (pos 70), "how is living in wapping" (pos 75) | `/neighbourhoods/[slug]` | ❌ a `/compare/*` page, ranking 50–90 |
| **Is X a nice place** | "is herne hill a nice place to live", "is archway a nice place to live" | `/neighbourhoods/[slug]` | ❌ barely visible |
| **Best places to live in X** | "best places to live in holloway" (pos 75) | `/neighbourhoods` / `/lifestyle` | ❌ pos 75 |
| Commute | "kentish town to camden", "wapping to stratford" | `/commute/[slug]` | ❌ compare page or nothing |
| Valuation | "property valuation in forest gate" | (no matching page) | ❌ compare page @ pos 59 |

The neighbourhood pages **exist** — I confirmed pages for kentish-town, hoxton, holloway, forest-gate, wapping, crouch-end, muswell-hill, finsbury-park, wood-green, herne-hill, archway and more. Their titles ("Living in X, Borough — rent, transport & area guide") are exactly right for the demand. **They just aren't ranking**, so Google falls back to a compare page for a "living in" query.

### Why — the internal link graph

- There are **2,439 `/compare/*` pages** and only **~140 `/neighbourhoods/*` pages** (17:1).
- Each compare page links to **4–8 *other compare pages*** (`relatedComparisons(a.id, 8)`) but only **2 neighbourhood pages** (the two areas being compared).
- Each neighbourhood page links **out to compare pages** (`relatedComparisonSlugs` → `/compare/*`).

Net effect: internal link equity flows **into** the compare cluster from every direction and the compare pages recirculate it among themselves. The neighbourhood pages — which target the highest-demand, most commercial "living in / is X nice / best places to live in X" queries — are comparatively orphaned. Google crawls and trusts the dense compare mesh and ranks it even for neighbourhood-intent queries.

**This is the #1 impression lever.** There are ~140 neighbourhood pages that could each rank for a family of high-volume queries ("living in X", "is X a nice place to live", "what is X like to live in", "X area guide"). Getting them properly linked and indexed multiplies the number of queries the site can appear for.

---

## 4. Secondary levers

**a) Deepen high-impression, low-rank compare pages.** A few compare pages already pull real impressions but rank on page 4–9, so they capture a fraction of available impressions:

| Page | Impressions | Position |
|---|---|---|
| /compare/borough-vs-bermondsey | 99 | 48.8 |
| /compare/kentish-town-vs-camden | 59 | 42.6 |
| /compare/shoreditch-vs-hackney-wick | 35 | 36.0 |
| /compare/hackney-central-vs-hoxton | 23 | 56.2 |

Moving these from page 5 to page 1–2 both lifts clicks and surfaces the page for many more long-tail variants (more impressions). These are almost certainly thin/templated — they need unique intro copy, an FAQ answering the specific comparison, and more supporting content.

**b) CTR on compare titles.** Neighbourhood and lifestyle titles carry a year hook ("(2025 guide)"); compare titles don't. Compare pages average pos ~10 but low CTR. Add a freshness/benefit hook and update the year to 2026.

**c) Latent clusters.** Commute ("X to Y") and valuation ("property valuation in X") queries appear in the data with zero matching well-ranked page. `/commute/[slug]` exists but is essentially unindexed — same internal-linking fix applies.

**d) Desktop underperformance.** Desktop ranks pos 24.6 vs mobile 9.7. Worth checking desktop layout/CLS/content parity, but mobile is 57% of impressions so this is lower priority.

---

## 5. Prioritised action list

1. **Rebalance internal linking toward neighbourhood pages** (biggest impression unlock).
2. **Add the exact query phrasings** ("is X a nice place to live", "what is X like to live in") as H2/FAQ on neighbourhood pages.
3. **Build hub pages** (`/neighbourhoods`, borough hubs) that link to every neighbourhood, and link them from the homepage/global nav.
4. **Deepen the top ~20 high-impression low-rank compare pages** with unique copy + FAQ.
5. **Refresh compare titles** with a 2026 hook to lift CTR.
6. Request indexing / submit sitemap in GSC after shipping.

---

## 6. Targeted prompt to improve impressions

Paste the prompt in `docs/impression-prompt.md` into your coding agent (Claude Code / Cursor) to implement levers 1–3, which are the highest-leverage and safe to automate.
