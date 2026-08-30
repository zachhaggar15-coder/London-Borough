import { NextResponse } from "next/server";
import { getCommutePairPageData } from "@/lib/seo-data";

/**
 * The /commute/route/[slug] cluster has been retired: it covered the same
 * curated neighbourhood pairs as /compare/[slug], and its journey-time content
 * now lives in the "Getting between X and Y" section of the compare page.
 *
 * Everything here 308s to the equivalent compare page so existing links and
 * any indexed URLs land on the page that absorbed the content, rather than
 * 404ing or leaving a thin duplicate in the index.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const data = getCommutePairPageData(slug);
  const path = data ? `/compare/${data.compareSlug}` : "/compare";

  // Resolve against the incoming request so preview deployments and local
  // runs redirect within their own origin rather than to the canonical host.
  return NextResponse.redirect(new URL(path, request.url), 308);
}
