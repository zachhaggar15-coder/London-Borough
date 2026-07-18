# London Neighbourhood Discovery

A neighbourhood **decision engine** for people moving to London. CommuteTimeMap shows where you *can* get to in N minutes — this app tells you which neighbourhoods inside that area you *should consider living in*.

> Read `STRATEGY.md` first — it explains the product framing, architecture, and staged roadmap. This README only covers running the code.

## What's in this repo

A working Next.js + TypeScript + MapLibre app with:
- A sampled public-transport isochrone overlay (the reachable-area shape, a la CommuteTimeMap)
- 95 London neighbourhoods with source-backed rent estimates, transport metadata, and static launch profiles
- A ranked sidebar that says *"why this is in your shortlist"* and *"who this suits"* for every area
- A detail drawer with affordability, transport route structure, lifestyle scores, strengths, tradeoffs, and commute estimate provenance

TfL Journey Planner is the default commute provider. Rent values are static neighbourhood-level estimates reviewed for discovery use, with room values derived from listing-sample regional averages and the same base rent model.

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. (Optional) Get a MapTiler API key for nicer map tiles
#    Sign up free at https://www.maptiler.com/cloud/
#    Then:
cp .env.local.example .env.local
# Edit .env.local and paste your key into NEXT_PUBLIC_MAPTILER_KEY.
# You CAN skip this — the app falls back to a no-key demo style.

# 3. Run the dev server
npm run dev

# 4. Open http://localhost:3000
```

## How the app works

- Pick a destination from the dropdown or search for a London place/postcode.
- Drag the commute slider. Neighbourhoods outside the threshold dim out.
- Set salary or rent budget. Affordability folds into the match score.
- Choose a rent type: lower-end house-share room, upper-end flat-share room, one-bed flat, or two-bed flat.
- Adjust lifestyle sliders. The ranked list and map colouring update live.
- Click any neighbourhood on the map or in the list for the detail drawer.

## Architecture in one diagram

```
[User inputs] ─┐
               ▼
       lib/store.ts (Zustand)
               │
               ├──▶ ControlPanel (left)
               ├──▶ NeighbourhoodList (left)
               ├──▶ Map (right)
               └──▶ DetailDrawer (bottom)

       lib/data/neighbourhoods.ts ──┐
       lib/data/destinations.ts ────┤
                                     ▼
                            lib/scoring.ts
                            lib/commute.ts (RoutingProvider)
                            lib/affordability.ts
```

For the full architecture rationale, see `STRATEGY.md` §3.

## Commute estimates

This app is public-transport-first. Driving estimates are intentionally not supported.

By default, /api/commute calls TfL Journey Planner through lib/tfl.ts and caches route-time pairs in memory. If TfL cannot route a pair, the server falls back to the reviewed static matrix or a distance-based estimate so every neighbourhood still receives a commute value with a visible source. Route summaries distinguish access, public transport, interchange and final walk; they do not invent exact line-by-line instructions where the system does not have reliable route legs. The sampled isochrone is built from the same reachable neighbourhood/grid points, which keeps the visual shape aligned with the ranked results.

For offline UI work, run `npm run dev:static`. It starts Next on port 3001 with the static routing provider, so the map and ranking can be tested without TfL network calls.

## Map boundaries

The map renders official London borough boundaries from ONS Local Authority Districts May 2024 ultra-generalised clipped boundaries. Borough search highlights the selected borough boundary on the satellite map.

Neighbourhoods use launch footprints from `lib/data/polygons.ts`. If a neighbourhood later gets a hand-drawn or LSOA-derived `Neighbourhood.polygon`, the map will use that explicit geometry first.

## Rent data maintenance

Rent assumptions are centralised in `lib/data/rent-market.ts`, with the review workflow in `docs/rent-data-maintenance.md`.

## Adding accounts and saved shortlists

1. Install Convex: `npm install convex`
2. Run `npx convex dev` — it prints a deployment URL.
3. Paste the URL into `NEXT_PUBLIC_CONVEX_URL` in `.env.local`.
4. The schema is already drafted in `convex/schema.ts`. See `convex/README.md` for next steps.

## Project structure

```
app/                  Next.js App Router pages and API routes
components/           React components (Map, ControlPanel, etc.)
lib/                  Domain logic — types, data, scoring, commute, affordability
lib/data/             Source-backed launch data (neighbourhoods, destinations)
convex/               Inactive until Stage 4
STRATEGY.md           Product spec, architecture, roadmap. READ FIRST.
```

## Deploying

The cleanest path is Vercel:
1. Push this repo to GitHub.
2. Import into Vercel.
3. Set the same env vars in the Vercel dashboard.
4. Vercel auto-detects Next.js and deploys.

## Note for beginners

This project is structured to be readable end-to-end. If a file is confusing, search for it in `STRATEGY.md` — most architectural choices are explained there with their rationale. When in doubt, **start at `app/page.tsx` and follow the imports.**
