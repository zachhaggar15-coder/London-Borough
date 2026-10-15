import { NextResponse } from "next/server";
import {
  retainedCommutePairCompareSlug,
} from "@/lib/seo-data";

/**
 * The /commute/route/[slug] cluster has been retired: it covered the same
 * curated neighbourhood pairs as /compare/[slug], and its journey-time content
 * now lives in the "Getting between X and Y" section of the compare page.
 *
 * A legacy route may only redirect when the receiving comparison is still a
 * curated, indexable page. Sending a retired pair through a generic hub (or
 * to a comparison that now 404s) is a poor replacement for a route query.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const compareSlug = retainedCommutePairCompareSlug(slug);
  if (!compareSlug) {
    return new NextResponse(null, { status: 410 });
  }

  // Resolve against the incoming request so preview deployments and local
  // runs redirect within their own origin rather than to the canonical host.
  return NextResponse.redirect(
    new URL(`/compare/${compareSlug}`, request.url),
    308,
  );
}
