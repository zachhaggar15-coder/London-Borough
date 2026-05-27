# London Neighbourhood Discovery - Strategy & Architecture

A neighbourhood decision engine for people moving to London. This document is
the source of truth for the product vision, architecture, data model, commute
logic, UX, and data maintenance workflow.

---

## 0. Product Position

CommuteTimeMap is the infrastructure floor, not the product. The reachable
area is a visual primitive; the value here is the decision layer above it.

| Commute-time tools answer | This app answers |
|---|---|
| Where can I reach in 45 minutes? | Which reachable London neighbourhoods should I shortlist? |
| Is a point inside the commute area? | Is this area affordable, liveable, and aligned with my preferences? |
| Every reachable place is treated equally | Named neighbourhoods are scored, ranked, and explained |
| One query, one shape | Iterative decision support with rent, salary, route, and lifestyle tradeoffs |

### Product Rule

The map stays dominant. The isochrone must remain visible while the user
changes destination, commute tolerance, affordability, rent type, or lifestyle
weights. Cards and drawers explain the map; they do not replace it.

---

## 1. Product Specification

### One-Line Pitch

Enter where you commute to and what you can afford, and the app tells you
which London neighbourhoods are worth investigating first.

### Core User

Young professionals, graduates, and relocators who know their office location
and salary but do not yet have a mental map of London.

### Job To Be Done

Help the user reduce London to a shortlist of five neighbourhoods they should
actually go visit.

### Core Inputs

1. Destination: work address, station, postcode, or neighbourhood.
2. Maximum commute: public transport, door to door.
3. Salary or monthly rent budget.
4. Rent type: room in house share lower end, room in flat share upper end,
   one bed flat, or two bed flat.
5. Lifestyle preferences: lively, green space, nightlife, cafes, gyms,
   walkability, food, young professionals, safety, and transport.
6. Rent budget share of take-home pay, defaulting to 35%.

### Core Outputs

1. A sampled public-transport isochrone on the map.
2. Ranked neighbourhood cards coloured by match score.
3. A clear route summary for each shortlisted area.
4. Four rent views per neighbourhood: lower-end room, upper-end room, one bed,
   and two bed.
5. Strengths and tradeoffs that respond to the user's query.
6. A detail drawer with route, rent, lifestyle scores, strengths, tradeoffs,
   and source summary.

### Non-Goals

- Not a property portal. The app recommends areas, not individual listings.
- Not a travel guide. Area copy must be decision-focused and tied to commute,
  budget, and lifestyle.
- Not a driving commute planner. Public transport is the supported mode.

---

## 2. Current Architecture

```
Next.js App Router
  app/page.tsx                  map-first discovery screen
  app/api/commute/route.ts      server commute matrix endpoint
  app/api/isochrone/route.ts    sampled isochrone endpoint

React UI
  components/ControlPanel.tsx
  components/NeighbourhoodList.tsx
  components/NeighbourhoodCard.tsx
  components/Map.tsx
  components/DetailDrawer.tsx
  components/ShortlistPanel.tsx

Domain logic
  lib/types.ts
  lib/store.ts
  lib/scoring.ts
  lib/affordability.ts
  lib/rent.ts
  lib/commute.ts
  lib/commute-details.ts
  lib/isochrone.ts
  lib/insights.ts

Launch data
  lib/data/neighbourhoods.ts
  lib/data/destinations.ts
  lib/data/polygons.ts
```

### Stack Choices

| Concern | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 App Router | App shell, API routes, and easy Vercel deploy |
| Language | TypeScript strict | Keeps commute, rent, scoring, and profile shapes aligned |
| Styling | Tailwind CSS | Fast iteration with compact component-local styling |
| Map | MapLibre GL JS | Free map rendering with vector-tile path available |
| State | Zustand | Shared map/list/query state without heavy provider code |
| Routing | TfL Journey Planner plus static estimate fallback | London-specific timings with complete UI coverage |
| Rent | Source-backed static rent model | Fast local ranking and manually maintainable values |
| Boundaries | ONS borough boundaries plus launch neighbourhood footprints | Searchable borough context and complete map coverage |

---

## 3. Data Model

```ts
type Neighbourhood = {
  id: string;
  name: string;
  borough: string;
  centroid: { lat: number; lng: number };
  polygon?: GeoJSON.Polygon;
  transportZones: number[];
  rent: {
    oneBedMedianGbp: number;
    twoBedMedianGbp: number;
    source: "ons" | "listing_sample" | "market_review" | "manual_review";
    asOf: string;
  };
  mainStations: Array<{ name: string; lines: string[] }>;
  lifestyle: {
    livelyVsQuiet: number;
    greenSpace: number;
    nightlife: number;
    cafeDensity: number;
    gymDensity: number;
    walkability: number;
    foodScene: number;
    youngProfessionalDensity: number;
    safety: number;
    connectivity: number;
  };
  summary: string;
  strengths: string[];
  tradeoffs: string[];
  dataQuality: "sourceBacked" | "full";
};
```

### Current Coverage

- 95 London neighbourhood profiles.
- All 32 London boroughs represented.
- Official borough boundary source wired into the map layer.
- Every neighbourhood has a launch footprint for map rendering.
- Every broad-coverage area has its own static summary, strengths, tradeoffs,
  and lifestyle tuning.
- Rent records use the market review source and an `asOf` date.
- Room prices are derived from `lib/data/rent-market.ts` listing-sample regional
  averages plus the same neighbourhood rent baseline.

---

## 4. Commute Logic

The routing provider is server-side only.

1. `/api/commute` receives a destination.
2. `TflProvider` calls TfL Journey Planner for public-transport times.
3. Results are cached per origin/destination pair.
4. If TfL cannot route a pair, `StaticEstimateProvider` returns a complete
   estimate so every neighbourhood still has a commute value.
5. `commute-details.ts` builds a human-readable route summary from the
   neighbourhood station, line, interchange, and bus-access metadata.

The isochrone uses the same commute samples as the ranking layer. The user
sees one coherent map: reachable area, destination marker, and ranked
neighbourhoods.

---

## 5. Rent Logic

Users can score recommendations against four rent modes:

1. Room in house share lower end.
2. Room in flat share upper end.
3. One bed flat.
4. Two bed flat.

One-bed and two-bed values live on the neighbourhood record. Room values are
calculated from listing-sample regional averages and the neighbourhood's rent
position, then rounded to practical monthly values. Bills are intentionally
not included.

Salary uses a default 35% of post-tax income rule, and advanced controls let
the user change that percentage from 0 to 100.

---

## 6. Scoring Logic

Recommendations are scored from three pieces:

1. Commute: areas over the user's commute cap are excluded.
2. Affordability: selected rent type compared with the user's budget.
3. Lifestyle: weighted preference match across the ten lifestyle dimensions.

Affordability remains the key filter. Advanced lifestyle weights strongly
demote areas that miss a high-priority preference, so user choices materially
change the shortlist.

---

## 7. UX Principles

- Map first, always.
- Controls stay dense and practical, not marketing-led.
- Changing sliders should immediately recolour the map and reorder cards.
- Every card should answer: route, rent, why shortlisted, key tradeoff, who it
  suits.
- The drawer should provide enough detail to decide whether an area deserves a
  visit.
- Empty states should tell the user which constraint is binding.

---

## 8. Data Maintenance

When updating the launch dataset:

1. Update one-bed and two-bed rent values in `lib/data/neighbourhoods.ts`.
2. Update the `MARKET_REVIEW_AS_OF` date.
3. Refresh listing-sample room averages and overrides in `lib/rent.ts`.
4. Review station and line metadata against TfL.
5. Check every new profile has a summary, strengths, tradeoffs, and lifestyle
   tuning.
6. Run `npm run typecheck` and `npm test`.
7. Verify the map page visually at desktop width and check that no unknown
   commute or unfinished-data language appears.
