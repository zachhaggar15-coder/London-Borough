# Measurement and reviewed-shortlist experiment

This runbook keeps the product funnel measurable without sending form answers,
email addresses, precise destinations, or other personal data to analytics.

## Default state

- Vercel Web Analytics remains the cookieless page-view baseline.
- GA4 is disabled unless NEXT_PUBLIC_GA_MEASUREMENT_ID is configured and the
  visitor accepts optional analytics.
- The reviewed-shortlist offer is disabled unless
  NEXT_PUBLIC_REVIEWED_SHORTLIST_ENABLED=true.
- The request endpoint also needs REVIEWED_SHORTLIST_WEBHOOK_URL. There is no
  checkout, card collection, subscription, or automatic charge.
- Referral providers stay inactive until a programme is approved and its terms,
  disclosure, destination URL, and placement have been reviewed.

## Funnel events

The stable GA4 event names are:

1. finder_started
2. finder_completed
3. recommendation_viewed
4. shortlist_changed
5. shortlist_viewed
6. results_shared
7. commercial_offer_viewed
8. commercial_cta_clicked
9. shortlist_request_submitted

Events include only low-risk context such as city, surface, result count, area
slug, shortlist count, entry type, and price. The submission event is emitted
only after the private receiver accepts the request. Never add email, workplace,
budget, form text, exact address, postcode, or query text to analytics.

## Safe GA4 setup and checking

1. Create a GA4 web data stream and set NEXT_PUBLIC_GA_MEASUREMENT_ID.
2. In a local or preview environment, set
   NEXT_PUBLIC_ANALYTICS_DEBUG=true.
3. Open the site with ?internal=1, accept analytics, and complete the finder,
   shortlist, share, and offer paths. This adds traffic_type=internal.
4. Confirm the events and allowed properties in GA4 DebugView.
5. Create an internal-traffic data filter in GA4 using the traffic_type
   dimension, first in testing mode.
6. Remove the debug flag before production. Visit with ?internal=0 to clear
   the browser's internal marker.

The public /api/health endpoint reports only whether analytics, routing, and
the experiment receiver are configured. It never exposes secret values.

## Experiment launch gate

Before enabling the public flag:

- Use a private HTTPS receiver controlled by the operator.
- Confirm the receiver authenticates or verifies requests at its boundary.
- Confirm access is limited to the person fulfilling requests.
- Test success, invalid input, receiver failure, and rate limiting in preview.
- Confirm the privacy and terms pages still match the actual handling.
- Confirm a human can deliver a checked 3–5 area shortlist consistently.
- Confirm the production hosting plan permits commercial activity.

The request payload includes contact and moving details, so it must not be sent
to logs or analytics. The API logs only request ID, route, duration, outcome,
and a receiver status on failure. Delete non-proceeding requests after 90 days,
as stated in the privacy policy.

## Weekly review

Check:

- /api/health for unexpected configuration drift.
- Finder-start to finder-complete conversion.
- Recommendation-to-shortlist and shortlist-to-share conversion.
- Offer impressions, CTA clicks, and accepted requests.
- Receiver failures, rate-limit spikes, and stale-data review dates.
- Search Console clicks, impressions, CTR, and average position for the top
  neighbourhood and comparison pages.

Do not interpret missing GA4 events as zero usage until consent acceptance and
the measurement ID have both been verified.

## Referral guardrails

Keep referrals downstream of the area decision, such as after a shortlist or on
a moving checklist. Activate only a directly useful rental search, broadband,
removals, or utilities provider. Each active link needs a plain-English
commercial disclosure, a current destination, and a manual click-through check.
Do not activate a provider just because an affiliate programme exists.
