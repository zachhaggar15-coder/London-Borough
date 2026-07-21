# Prompt 4 — CTR uplift, desktop parity & a measurement loop

> Run AFTER prompts 1–3.
> Lever: by now more pages rank, so the job shifts to (a) earning more clicks per impression
> and (b) confirming impressions actually grew. Higher CTR also feeds back into rankings.

## Evidence from GSC

- Overall CTR 2.5% at avg position ~14–17 — low even for the position.
- Desktop ranks pos 24.6 vs mobile 9.7 (mobile = 57% of impressions).
- `Search appearance.csv` is empty → no FAQ/breadcrumb rich results awarded yet.

## Tasks

**1. Rewrite titles + meta descriptions across page types for CTR.**
- Compare: `${A} vs ${B} (2026): rent, transport & lifestyle` (year hook — already flagged in prompt 1; verify it shipped).
- Neighbourhood: front-load the benefit — `Living in ${name}: rent, transport & is it worth it? (2026)`.
- Keep titles ≤60 chars and descriptions 140–155 chars; ensure the primary query phrase appears in both.
- Make descriptions specific (real rent figure, the one-line verdict) so the snippet reads as an answer.

**2. Verify rich-result eligibility.**
- Validate the `FAQPage` and `BreadcrumbList` JSON-LD on a compare and a neighbourhood page
  against Google's Rich Results Test rules (valid nesting, question/answer text present in visible
  DOM). Fix any mismatch between schema and on-page text — Google ignores FAQ schema whose text
  isn't visible on the page.

**3. Desktop parity check.**
- Diff what renders on desktop vs mobile for a neighbourhood page. Confirm content parity (no
  desktop-only hidden sections, no layout pushing content below huge hero, no CLS). Fix anything
  that would make desktop look thinner to Googlebot. Run Lighthouse on desktop + mobile and
  address any failing Core Web Vitals.

**4. Add a lightweight measurement helper.**
- Create `scripts/gsc-report.md` documenting how to re-export GSC (Performance → Export) and
  which slices to compare month-over-month: total impressions, impressions by page-type prefix
  (`/compare`, `/neighbourhoods`, `/commute`), and count of pages with >0 impressions. This makes
  the impact of prompts 1–3 measurable.

## Constraints

- No fabricated data in titles/descriptions.
- `npm run build` passes; no type errors; no route changes.

## Definition of done

- Titles/descriptions updated across compare + neighbourhood (+ commute) with query phrase and
  2026 hook; all within length limits.
- FAQ/breadcrumb schema validates and matches visible text on sampled pages.
- Desktop content parity confirmed; Core Web Vitals pass on both form factors.
- `scripts/gsc-report.md` exists.

## After shipping — the loop

Re-export GSC ~3–4 weeks after each prompt ships and compare against this baseline
(26 May–19 Jul 2026): **47 clicks, 1,882 impressions, 2.5% CTR, ~301 pages with impressions.**
Success = impressions up materially and `/neighbourhoods` + `/commute` making up a rising share
of the page mix (they're near-zero today).
