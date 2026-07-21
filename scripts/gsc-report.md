# GSC monthly measurement loop

Purpose: measure whether the SEO work (internal-link rebalance, deeper compare
pages, query-matched neighbourhood copy, CTR title/meta rewrites) actually grows
impressions and the number of indexed, ranking pages — not just rankings on the
handful of pages we already had.

Run this once a month and compare against the previous export.

## 1. Export the data from Google Search Console

1. Open [Search Console](https://search.google.com/search-console) → select the
   property.
2. Go to **Performance → Search results**.
3. Set the date range to **Last 28 days** (keep it consistent every month so
   months are comparable), and make sure **Impressions**, **Clicks**,
   **Average CTR** and **Average position** are all toggled on.
4. Export with the **Export** button (top right) → **Download CSV** (or
   "Google Sheets"). You get a zip with `Queries.csv`, `Pages.csv`,
   `Countries.csv`, `Devices.csv`, `Search appearance.csv`, `Dates.csv`.
5. Save the export in a dated folder, e.g. `docs/gsc/2026-08/`, so month-on-month
   diffs are easy.

Also worth capturing monthly:
- **Pages → Indexing** report: total indexed vs. not-indexed count.
- **Search appearance.csv**: confirms whether FAQ / breadcrumb rich results are
  being awarded (it was empty at baseline — a non-empty file is the signal that
  the schema work landed).

## 2. Slices to compare month-over-month

Compare these numbers against last month's export. All come from `Pages.csv`
(and the totals row in the Performance UI).

| Metric | Where | What good looks like |
| --- | --- | --- |
| **Total impressions** | Performance totals | Up month-over-month |
| **Total clicks** | Performance totals | Up, and ideally faster than impressions (CTR rising) |
| **Average CTR** | Performance totals | Trending up from the ~2.5% baseline |
| **Impressions by page-type** | `Pages.csv`, group by URL prefix | Growth spread across `/compare`, `/neighbourhoods`, `/commute` — not just the homepage |
| **Pages with >0 impressions** | `Pages.csv`, count of rows | Up — this is the "new surface area" metric; the whole point of the link + content work is to get more pages earning any impressions |
| **Rich result rows** | `Search appearance.csv` | Goes from empty → has FAQ / breadcrumb rows |
| **Desktop vs mobile position** | `Devices.csv` | Desktop position gap vs mobile narrowing |

### Page-type breakdown

`Pages.csv` has one row per URL. Bucket rows by prefix and sum impressions:

- `/compare/…`  → deeper compare pages (prompt 2)
- `/neighbourhoods/…` → query-matched area guides (prompt 1 + 4)
- `/commute/…` → commute cluster (prompt 3)
- `/boroughs/…`, `/lifestyle/…`, `/salary/…` → supporting hubs
- `/` (exact) → homepage

Quick way to bucket (from the export folder):

```bash
# Impressions by page-type prefix (column order: Page,Clicks,Impressions,CTR,Position)
awk -F, 'NR>1 {
  path=$1; sub(/^https?:\/\/[^\/]+/, "", path);
  split(path, seg, "/"); bucket="/" seg[2];
  imp[bucket]+=$3
} END { for (b in imp) printf "%-18s %d\n", b, imp[b] }' Pages.csv | sort -k2 -nr

# Count of pages earning at least 1 impression
awk -F, 'NR>1 && $3+0 > 0 {c++} END {print "pages with >0 impressions:", c}' Pages.csv
```

(If you exported to Google Sheets instead, a pivot table on a
`=REGEXEXTRACT(Page, "https?://[^/]+/([^/]+)")` helper column does the same.)

## 3. What to watch per prompt

- **Prompt 1 (internal links):** more `/neighbourhoods/*` pages with >0
  impressions; neighbourhood pages appearing for "is X a nice place to live" /
  "what is X like to live in" queries in `Queries.csv`.
- **Prompt 2 (deeper compare):** the 7 priority compare pages
  (`borough-vs-bermondsey`, `kentish-town-vs-camden`,
  `shoreditch-vs-hackney-wick`, `hackney-central-vs-hoxton`,
  `peckham-vs-camberwell`, `forest-gate-vs-stockwell`,
  `forest-hill-vs-twickenham`) moving up in average position, and impressions on
  more long-tail "A vs B" variants.
- **Prompt 3 (commute):** `/commute/*` rows appearing at all (baseline: near
  zero), and commute-intent queries in `Queries.csv`.
- **Prompt 4 (CTR):** rising CTR at a similar average position; non-empty
  `Search appearance.csv`; desktop position gap narrowing in `Devices.csv`.

## 4. Log

Keep a short running log (append one row per month) so the trend is legible at a
glance:

| Month | Total impr. | Total clicks | CTR | /compare impr. | /neighbourhoods impr. | /commute impr. | Pages >0 impr. |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-07 (baseline) | | | ~2.5% | | | ~0 | |
