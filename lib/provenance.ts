import type { Neighbourhood, Provenance } from "@/lib/types";

export function dataQualityLabel(quality: Neighbourhood["dataQuality"]): string {
  switch (quality) {
    case "full":
      return "Verified";
    case "sourceBacked":
      return "Source-backed";
  }
}

export function dataQualityDescription(
  quality: Neighbourhood["dataQuality"],
): string {
  switch (quality) {
    case "full":
      return "Backed by live or curated real-world sources.";
    case "sourceBacked":
      return "Curated from public transport, rent, listings, and neighbourhood source checks.";
  }
}

export function provenanceLabel(p: Provenance): string {
  switch (p.source) {
    case "ons":
      return `ONS, ${p.asOf}`;
    case "osm":
      return `OpenStreetMap, ${p.asOf}`;
    case "police":
      return `Police data, ${p.asOf}`;
    case "census":
      return `Census, ${p.asOf}`;
    case "listing_sample":
      return `Listing sample, ${p.asOf}`;
    case "market_review":
      return `ONS baseline + market review, ${p.asOf}`;
    case "tfl":
      return `TfL Journey Planner, ${p.asOf}`;
    case "manual_review":
      return `Curated review, ${p.asOf}`;
  }
}
