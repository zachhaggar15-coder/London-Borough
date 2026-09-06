import type { Destination } from "@/lib/types";

/**
 * Where Greater Manchester actually commutes to.
 *
 * London's equivalent list is a set of terminus stations, because London
 * employment clusters around them. Manchester's does not work that way:
 * Piccadilly and Victoria are stations, but Spinningfields, MediaCityUK,
 * the Oxford Road corridor and Trafford Park are employment districts
 * that happen to sit near one. The centroids below are the working centre
 * of each district rather than a station entrance, which is what someone
 * asking "how long is my commute" actually means.
 */
export const MANCHESTER_DESTINATIONS: Destination[] = [
  { id: "piccadilly",    label: "Manchester Piccadilly",       centroid: { lat: 53.4774, lng: -2.2309 } },
  { id: "spinningfields", label: "Deansgate / Spinningfields", centroid: { lat: 53.4795, lng: -2.2515 } },
  { id: "mediacity",     label: "MediaCityUK",                 centroid: { lat: 53.4720, lng: -2.2986 } },
  { id: "oxford-road",   label: "Oxford Road corridor",        centroid: { lat: 53.4690, lng: -2.2350 } },
  { id: "ancoats",       label: "Ancoats / NOMA",              centroid: { lat: 53.4855, lng: -2.2320 } },
  { id: "trafford-park", label: "Trafford Park",               centroid: { lat: 53.4665, lng: -2.3200 } },
  { id: "airport",       label: "Manchester Airport",          centroid: { lat: 53.3654, lng: -2.2725 } },
  { id: "salford-central", label: "Salford Central",           centroid: { lat: 53.4830, lng: -2.2530 } },
  { id: "victoria",      label: "Manchester Victoria",         centroid: { lat: 53.4875, lng: -2.2425 } },
  { id: "stockport",     label: "Stockport",                   centroid: { lat: 53.4084, lng: -2.1594 } },
];

export const MANCHESTER_DESTINATIONS_BY_ID: Record<string, Destination> =
  Object.fromEntries(MANCHESTER_DESTINATIONS.map((d) => [d.id, d]));
