# Prompt 3 — Activate the latent commute & valuation query clusters

> Run AFTER prompts 1–2.
> Lever: the query data shows steady demand the site has NO well-ranked page for —
> commute ("X to Y") and property-valuation ("property valuation in X") searches. These are
> whole new impression surfaces, not just re-ranking existing pages.

## Evidence from GSC

- Commute intent (many, all low/no rank): "kentish town to camden", "wapping to stratford",
  "vauxhall to camden", "finsbury park to mile end", "shepherds bush to brixton",
  "elephant and castle to tooting" …
- Valuation intent: "property valuation in forest gate", "rental valuation in forest gate",
  "free apartment valuation elephant and castle", "letting valuation in forest gate".

## Context

- `app/commute/[slug]/page.tsx` and `app/commute/page.tsx` already exist but are essentially
  unindexed. `getAllCommuteSlugs()` / commute data live in `lib/seo-data.ts` +
  `lib/data/destinations.ts`.
- There is currently **no** valuation page type.

## Tasks

**A. Get the commute cluster indexed and query-matched.**
1. Confirm `/commute/[slug]` slugs match the "{origin} to {destination}" search pattern; if the
   slug form differs, add human-readable H1/title in exactly that phrasing
   ("{A} to {B}: commute time, cost & route").
2. Apply the same internal-linking fix as prompt 1: link every commute page from the
   `/commute` hub, and link the hub from the global footer. Add commute links onto the relevant
   neighbourhood pages ("Commuting from {name}").
3. Ensure the `/commute` hub lists all commute pages grouped sensibly (by origin borough).
4. Add a `FAQ` ("How long is the commute from {A} to {B}?") with JSON-LD, answered from data.

**B. Decide on the valuation cluster (needs your product call — see note).**
Valuation queries are commercial and high-intent but imply a *service* (valuations), which the
site may not offer. Two options — implement whichever the owner confirms:
- **If offering valuations:** create `/valuation/[area]` pages ("Free property valuation in
  {area}") with a lead-capture form and local rent context from `rent-market.ts`.
- **If NOT offering valuations:** create informational `/rent-guide/[area]` pages
  ("What's my {area} flat worth to rent? — {area} rent guide") that answer the intent with data
  and internally link to the neighbourhood + compare pages. Avoid implying a service you don't run.

> ⚠️ Do not build the valuation cluster until the owner confirms which option. Ship part A first.

## Constraints

- Fully static; `npm run build` passes; unchanged existing route counts (new routes are additive).
- No fabricated commute times or valuations — derive from existing data or omit.

## Definition of done (part A)

- Every commute page reachable in ≤2 clicks from the homepage; `/commute` hub in the footer.
- Commute titles/H1s use the "{A} to {B}" phrasing; FAQ + JSON-LD present.
- Build passes.

## After shipping

Submit sitemap; request indexing for 5–10 commute slugs matching real queries above.
Bring the valuation/rent-guide decision back to the owner before building part B.
