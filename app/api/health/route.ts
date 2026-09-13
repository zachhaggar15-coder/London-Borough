export function GET() {
  return Response.json(
    {
      status: "ok",
      analytics: {
        provider: "ga4",
        configured: Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID),
      },
      reviewedShortlist: {
        enabled: process.env.NEXT_PUBLIC_REVIEWED_SHORTLIST_ENABLED === "true",
        receiverConfigured: Boolean(process.env.REVIEWED_SHORTLIST_WEBHOOK_URL),
      },
      routing: {
        provider: process.env.ROUTING_PROVIDER ?? "static",
      },
      deployment: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "local",
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
