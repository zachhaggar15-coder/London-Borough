/**
 * Personality archetypes — the simplified replacement for the granular
 * lifestyle sliders.
 *
 * Each archetype is a small recipe over the existing LifestyleScores.
 * Returning 0..1, where 1 = perfect match for that archetype.
 *
 * Why functions and not weight objects? Because some archetypes care
 * about LOW values (Chill wants low nightlife and low busyness). A
 * weighted average only handles "more is better"; an explicit function
 * lets us invert.
 *
 * Add a new archetype by:
 *   1. Adding the key to PersonalityKey in types.ts
 *   2. Adding an entry to PERSONALITIES below
 *   3. Adding the scorer to PERSONALITY_SCORERS
 */

import type { LifestyleScores, PersonalityKey } from "@/lib/types";

export type PersonalityDef = {
  key: PersonalityKey;
  label: string;
  blurb: string;          // shown under the chip when selected
};

export const PERSONALITIES: PersonalityDef[] = [
  {
    key: "lively",
    label: "Lively",
    blurb: "Bars, restaurants, nightlife — buzzy at all hours.",
  },
  {
    key: "chill",
    label: "Chill",
    blurb: "Green, quiet, safe — a calm base after work.",
  },
  {
    key: "sporty",
    label: "Sporty",
    blurb: "Gyms, parks, runs, weekend activity.",
  },
  {
    key: "social",
    label: "Social",
    blurb: "Cafés, food, and other young professionals around.",
  },
  {
    key: "professional",
    label: "Professional",
    blurb: "Practical commute, safe streets, good services.",
  },
  {
    key: "balanced",
    label: "Balanced",
    blurb: "A bit of everything — no strong tilt.",
  },
];

/**
 * Per-archetype scoring function. All return 0..1.
 * The internal weights inside each function sum to ~1.0 (or close enough);
 * we divide by 10 at the end because LifestyleScores are 0..10.
 */
export const PERSONALITY_SCORERS: Record<
  PersonalityKey,
  (s: LifestyleScores) => number
> = {
  lively: (s) =>
    (s.livelyVsQuiet * 0.20 +
      s.nightlife * 0.20 +
      s.foodScene * 0.20 +
      s.cafeDensity * 0.15 +
      s.connectivity * 0.15 +
      s.youngProfessionalDensity * 0.10) / 10,

  chill: (s) =>
    ((10 - s.livelyVsQuiet) * 0.20 +
      s.greenSpace * 0.30 +
      s.safety * 0.20 +
      s.walkability * 0.15 +
      (10 - s.nightlife) * 0.15) / 10,

  sporty: (s) =>
    (s.gymDensity * 0.35 +
      s.greenSpace * 0.30 +
      s.walkability * 0.20 +
      s.youngProfessionalDensity * 0.15) / 10,

  social: (s) =>
    (s.cafeDensity * 0.22 +
      s.foodScene * 0.22 +
      s.nightlife * 0.18 +
      s.youngProfessionalDensity * 0.20 +
      s.livelyVsQuiet * 0.13 +
      s.connectivity * 0.05) / 10,

  professional: (s) =>
    (s.connectivity * 0.30 +
      s.safety * 0.22 +
      s.youngProfessionalDensity * 0.18 +
      s.cafeDensity * 0.15 +
      s.walkability * 0.15) / 10,

  balanced: (s) => {
    const vals = Object.values(s);
    return vals.reduce((a, b) => a + b, 0) / vals.length / 10;
  },
};

/** Convenience: get the scorer for the user's current personality. */
export function scoreFor(
  personality: PersonalityKey | null,
): ((s: LifestyleScores) => number) | null {
  return personality ? PERSONALITY_SCORERS[personality] : null;
}
