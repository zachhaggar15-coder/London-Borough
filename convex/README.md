# Convex (inactive in Stage 1)

This folder is here so the Stage 4 wiring is obvious. **Don't run `npx convex dev` until you're ready to add user accounts and saved shortlists.**

## When to activate

You'll know it's time when:
- Users ask to come back later and pick up their shortlist
- You want to add comparison views across saved areas
- You're ready to deep-link to Rightmove / Zoopla / OpenRent with a saved budget

## How to activate

```bash
npm install convex
npx convex dev
```

`npx convex dev` will prompt you to create a Convex project, then print a deployment URL. Paste it into `.env.local`:

```
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

Then read `schema.ts` in this folder and add `mutations` and `queries` files for `shortlists` and `users` as needed.

## Why not start with Convex on day 1?

Three reasons:
1. Stage 1 has no data that needs persistence — refreshes restart the session, which is fine for a prototype.
2. Convex requires a deployment, an account, and a service dependency. That's worth it once you're earning real persistence value, not before.
3. The Zustand store in `lib/store.ts` cleanly mirrors what Convex would replace. Migration is straightforward later.
