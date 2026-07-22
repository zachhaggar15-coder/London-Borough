# Refreshing the rent data

Rent figures drive almost everything on the site (compare pages, rent guides,
the rent index, the "is it expensive?" copy) and they are a freshness signal for
search. Stale rents quietly decay rankings, so refresh on a schedule —
**quarterly is a sensible cadence**.

Everything lives in [`lib/data/rent-market.ts`](../lib/data/rent-market.ts) and
[`lib/data/neighbourhoods.ts`](../lib/data/neighbourhoods.ts). No database, no
API — it's all static data compiled into the build.

## What to update

1. **Per-area medians** — in `lib/data/neighbourhoods.ts`, each area has a
   `rent: { oneBedMedianGbp, twoBedMedianGbp, ... }`. Update the one-bed and
   two-bed medians for any area that has moved. These are the fields listed in
   `RENT_REVIEW_FIELDS` in `rent-market.ts`.
2. **Room / region averages** — in `lib/data/rent-market.ts`:
   - `ROOM_REGION_AVERAGE_GBP` — average room (in a shared flat) rent by
     postcode region. Update if room rents have shifted.
   - `ROOM_AREA_OVERRIDES_GBP` — per-area room overrides for areas that differ
     markedly from their region average.
3. **Bump the as-of date** — set `RENT_MARKET_REVIEW_AS_OF` to the date you
   completed the review (ISO `YYYY-MM-DD`). This one change updates the visible
   "Rent data as of …" line on every neighbourhood, compare, rent-guide and
   rent-index page, the methodology page, and the `dateModified` on the rent
   index's Dataset schema. **Always bump it when you touch rents** — it's the
   freshness signal.
4. **Sources** — if where the figures come from changes, update
   `RENT_MARKET_SOURCES`. Don't list a source that wasn't actually used.

## Where the numbers come from

Use the same sources described on `/methodology` and captured in
`RENT_MARKET_SOURCES`:

- ONS Private Rental Market Statistics for borough-level baselines.
- Visible asking-rent listing samples (Rightmove, Zoopla, OpenRent, SpareRoom).
- Manual review for a local premium/discount vs. the borough baseline.

Take medians, not averages, and record asking rents (what the site shows), not
achieved rents. Don't invent precision — round to sensible increments.

## After editing

```bash
npm run build      # must pass; confirms types + regenerates all static pages
npx tsc --noEmit   # optional: types only, faster
```

Spot-check a couple of pages against the new figures:

- `/london-rent-index` — headline medians and the table update automatically.
- A `/rent-guide/<area>` and a `/neighbourhoods/<area>` you changed — confirm
  the figure and the "Rent data as of …" line show the new date.

Then commit with a message noting the review date, e.g.
`Refresh rent data (review 2026-08-xx)`.

## Optional: make it a recurring reminder

There's no automated fetch (the data is manually reviewed by design). To keep it
from slipping, add a recurring calendar/task reminder each quarter that points at
this file, or track it alongside the monthly GSC review in
[`scripts/gsc-report.md`](gsc-report.md).
