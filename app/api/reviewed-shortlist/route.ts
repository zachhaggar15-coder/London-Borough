import {
  REVIEWED_SHORTLIST_ENABLED,
  REVIEWED_SHORTLIST_PRICE_GBP,
  parseReviewedShortlistRequest,
} from "@/lib/commercial";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const startedAt = Date.now();
  const requestId = request.headers.get("x-vercel-id") ?? crypto.randomUUID();

  if (!REVIEWED_SHORTLIST_ENABLED) {
    return Response.json({ error: "This experiment is not available." }, { status: 404 });
  }

  const rateLimit = checkRateLimit(request.headers, {
    scope: "reviewed-shortlist",
    limit: 4,
    globalLimit: 80,
    windowMs: 60 * 60 * 1_000,
  });
  if (!rateLimit.ok) {
    return Response.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  const parsed = parseReviewedShortlistRequest(input);
  if (!parsed) {
    return Response.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  const webhookUrl = process.env.REVIEWED_SHORTLIST_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error(JSON.stringify({
      level: "error",
      message: "Reviewed shortlist receiver is not configured",
      route: "/api/reviewed-shortlist",
      requestId,
      duration_ms: Date.now() - startedAt,
    }));
    return Response.json(
      { error: "Requests are temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8_000);
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "reviewed_shortlist_request",
        priceGbp: REVIEWED_SHORTLIST_PRICE_GBP,
        submittedAt: new Date().toISOString(),
        requestId,
        ...parsed,
      }),
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));
    if (!response.ok) throw new Error(`Receiver returned ${response.status}`);

    console.log(JSON.stringify({
      level: "info",
      message: "Reviewed shortlist request delivered",
      route: "/api/reviewed-shortlist",
      requestId,
      duration_ms: Date.now() - startedAt,
    }));
    return Response.json({ ok: true, requestId });
  } catch (error) {
    console.error(JSON.stringify({
      level: "error",
      message: "Reviewed shortlist delivery failed",
      route: "/api/reviewed-shortlist",
      requestId,
      error: error instanceof Error ? error.message : "Unknown error",
      duration_ms: Date.now() - startedAt,
    }));
    return Response.json(
      { error: "We could not send the request. Please try again later." },
      { status: 502 },
    );
  }
}
