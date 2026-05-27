import type { Destination } from "@/lib/types";

/**
 * Pre-seeded popular destinations (work locations). These are also the
 * lookup keys for the static commute-time estimate matrix.
 *
 * Coordinates are the station entrance / building centroid — accurate
 * enough for routing estimates and map centring.
 */
export const DESTINATIONS: Destination[] = [
  { id: "marylebone",      label: "Marylebone",                centroid: { lat: 51.5226, lng: -0.1631 } },
  { id: "kings-cross",     label: "King's Cross / St Pancras",  centroid: { lat: 51.5308, lng: -0.1238 } },
  { id: "liverpool-st",    label: "Liverpool Street",           centroid: { lat: 51.5180, lng: -0.0810 } },
  { id: "canary-wharf",    label: "Canary Wharf",               centroid: { lat: 51.5054, lng: -0.0235 } },
  { id: "bank",            label: "Bank / City",                centroid: { lat: 51.5133, lng: -0.0890 } },
  { id: "victoria",        label: "Victoria",                   centroid: { lat: 51.4952, lng: -0.1441 } },
  { id: "waterloo",        label: "Waterloo",                   centroid: { lat: 51.5031, lng: -0.1132 } },
  { id: "oxford-circus",   label: "Oxford Circus / Soho",       centroid: { lat: 51.5152, lng: -0.1418 } },
  { id: "paddington",      label: "Paddington",                 centroid: { lat: 51.5154, lng: -0.1755 } },
  { id: "london-bridge",   label: "London Bridge",              centroid: { lat: 51.5050, lng: -0.0865 } },
];

export const DESTINATIONS_BY_ID: Record<string, Destination> = Object.fromEntries(
  DESTINATIONS.map((d) => [d.id, d]),
);
