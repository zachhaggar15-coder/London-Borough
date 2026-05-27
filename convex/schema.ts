/**
 * Convex schema — INACTIVE in Stage 1.
 *
 * To activate (Stage 4):
 *   1. npm install convex
 *   2. npx convex dev            (prints a deployment URL)
 *   3. Paste the URL into NEXT_PUBLIC_CONVEX_URL in .env.local
 *
 * This file describes the shape we'll use when persistence comes online.
 * It's safe to leave here in Stage 1 — Convex only reads it after `npx
 * convex dev` is run.
 */

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Each user (anonymous by default in Stage 4, optional sign-in later).
  users: defineTable({
    handle: v.string(),
    createdAt: v.number(), // epoch ms
  }).index("by_handle", ["handle"]),

  // A user's shortlist of neighbourhoods. Multiple shortlists per user
  // (e.g. "London for £50k" vs "London for £80k").
  shortlists: defineTable({
    userId: v.id("users"),
    name: v.string(),
    destinationId: v.string(),
    maxCommuteMinutes: v.number(),
    monthlyRentBudgetGbp: v.optional(v.number()),
    annualSalaryGbp: v.optional(v.number()),
    neighbourhoodIds: v.array(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),

  // Cache for routing-provider responses. TTL handled in code.
  // Keyed by (provider, fromLatLng, toLatLng, departureBucket).
  commuteCache: defineTable({
    cacheKey: v.string(),
    minutes: v.number(),
    provider: v.string(),     // "google", "tfl", "here", ...
    expiresAt: v.number(),    // epoch ms
  }).index("by_key", ["cacheKey"]),
});
