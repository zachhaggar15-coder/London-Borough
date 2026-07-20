# Compare-page affiliate segments

Compare pages are generated from one template (`app/compare/[slug]/page.tsx`)
across ~2,500 slugs, so products cannot be hand-picked per page. Each pair
resolves to exactly one segment, and that segment supplies the products.

Logic lives in `lib/compare-affiliates.ts`; the UI is
`components/CompareAffiliatePicks.tsx`.

## Segment rules

Evaluated in order, first match wins. The pair is judged on its combined
profile — the most expensive of the two areas decides `prime`, the liveliest
decides `central`, and so on.

| Order | Segment   | Condition                                        | Reader |
|-------|-----------|--------------------------------------------------|--------|
| 1 | `prime`   | `max(oneBedMedianGbp) >= 2400`                       | Top-of-market. No budget framing. |
| 2 | `central` | `max(nightlife) >= 8` or `max(youngProfessionalDensity) >= 9` | Busy, small flats, noise. |
| 3 | `leafy`   | `max(greenSpace) >= 8` and `max(nightlife) <= 5`     | Space over centrality. |
| 4 | `outer`   | `min(connectivity) <= 6` or `min(oneBedMedianGbp) <= 1500` | Longer commute, older stock. |
| 5 | `outer`   | fallback                                             | Mid-market, well connected. |

Section E (`UNIVERSAL_PICKS`) renders on every page as a small text row under
the segment cards — the "you're moving either way" layer.

Verified against live routes:

| Page | Segment |
|------|---------|
| `mayfair-vs-chelsea`, `kensington-vs-mayfair` | prime |
| `borough-vs-bermondsey` | central |
| `wimbledon-vs-richmond`, `barnes-vs-richmond` | leafy |
| `harrow-vs-uxbridge` | outer |

## Placement

One block, after "Which area suits which priorities?" — the reader has the
verdict and is in "what do I do next" mode. Six links per page (three segment,
three universal). No sticky bars, floats or interstitials. Measured at ~321px
on a 1274px viewport, roughly 2% of page height.

## Outstanding: swap search links for ASINs

Picks carry either `asin` (direct product link) or `search` (tagged Amazon UK
search). Search links carry the associate tag and never 404, so they are safe
to ship, but they convert worse than a direct product link.

These slots still need a confirmed ASIN. Replace the `search` field with
`asin` in `lib/compare-affiliates.ts`:

| Segment | Pick | Current search term |
|---------|------|---------------------|
| prime | Air purifier | `HEPA air purifier home` |
| prime | Smart video doorbell | `video doorbell wireless` |
| prime | Cabin luggage | `cabin suitcase hard shell` |
| central | Reusable earplugs | `reusable noise reduction earplugs sleep` |
| central | Blackout blind | `no drill blackout blind` |
| leafy | Waterproof walking boots | `waterproof walking boots` |
| leafy | Folding shopping trolley | `folding shopping trolley wheels` |
| outer | Noise-cancelling headphones | `noise cancelling headphones over ear` |
| universal | Damp meter | `digital humidity meter damp tester` |

Reused from `lib/renter-essentials.ts` (already have ASINs): vacuum storage
bags, dehumidifier, heated airer, Thermos flask, moving boxes, tape measure.

## Associate details

Tag, link code and link ID live in `lib/monetisation.ts` as the single source
of truth. All affiliate anchors render with
`rel="sponsored nofollow noopener noreferrer"` and carry the Amazon Associate
disclosure.
