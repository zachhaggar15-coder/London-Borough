import type { Destination } from "@/lib/types";

/**
 * Where West Yorkshire actually commutes to.
 *
 * Two of these are not in Leeds, and that is the point. Bradford and
 * Huddersfield are separate cities with their own employment bases, and
 * a great many people in this region commute to them rather than through
 * them. A destination list that treated Leeds as the only place anyone
 * works would misdescribe half the region.
 *
 * The centroids are the working centre of each district rather than a
 * station entrance, which is what someone asking "how long is my
 * commute" actually means.
 */
export const LEEDS_DESTINATIONS: Destination[] = [
  { id: "leeds-station",    label: "Leeds station & city core",     centroid: { lat: 53.7955, lng: -1.5480 } },
  { id: "wellington-place", label: "Wellington Place & the West End", centroid: { lat: 53.7975, lng: -1.5560 } },
  { id: "university-leeds", label: "University of Leeds & the LGI", centroid: { lat: 53.8060, lng: -1.5550 } },
  { id: "st-james",         label: "St James's University Hospital", centroid: { lat: 53.8080, lng: -1.5210 } },
  { id: "thorpe-park",      label: "Thorpe Park & east Leeds",      centroid: { lat: 53.8020, lng: -1.4340 } },
  { id: "white-rose",       label: "White Rose & south Leeds",      centroid: { lat: 53.7590, lng: -1.5750 } },
  { id: "bradford-centre",  label: "Bradford city centre",          centroid: { lat: 53.7930, lng: -1.7500 } },
  { id: "huddersfield",     label: "Huddersfield town centre",      centroid: { lat: 53.6458, lng: -1.7845 } },
];

export const LEEDS_DESTINATIONS_BY_ID: Record<string, Destination> =
  Object.fromEntries(LEEDS_DESTINATIONS.map((d) => [d.id, d]));
