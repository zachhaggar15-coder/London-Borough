import type { Destination } from "@/lib/types";

/**
 * Where the West of England actually commutes to.
 *
 * Two things shape this list and make it unlike a list of terminus
 * stations. First, the region's largest single employment cluster is not
 * in Bristol at all — it is the aerospace and defence belt at Filton and
 * Aztec West, which employs tens of thousands of people and is reached
 * by almost nobody on a train into the centre. Second, Bath is a
 * separate labour market ten miles away that a great many people in this
 * region commute into rather than out of.
 *
 * The centroids are the working centre of each district rather than a
 * station entrance, which is what someone asking "how long is my
 * commute" actually means.
 */
export const BRISTOL_DESTINATIONS: Destination[] = [
  { id: "temple-meads",     label: "Bristol Temple Meads",      centroid: { lat: 51.4492, lng: -2.5813 } },
  { id: "city-centre",      label: "City centre & Harbourside", centroid: { lat: 51.4535, lng: -2.5966 } },
  { id: "clifton-triangle", label: "University & Clifton Triangle", centroid: { lat: 51.4553, lng: -2.6045 } },
  { id: "aztec-west",       label: "Aztec West & Filton aerospace", centroid: { lat: 51.5320, lng: -2.5730 } },
  { id: "uwe-frenchay",     label: "UWE Frenchay campus",       centroid: { lat: 51.5000, lng: -2.5470 } },
  { id: "southmead",        label: "Southmead Hospital",        centroid: { lat: 51.4967, lng: -2.5941 } },
  { id: "bath-centre",      label: "Bath city centre",          centroid: { lat: 51.3800, lng: -2.3590 } },
  { id: "avonmouth",        label: "Avonmouth & Severnside",    centroid: { lat: 51.5040, lng: -2.6990 } },
];

export const BRISTOL_DESTINATIONS_BY_ID: Record<string, Destination> =
  Object.fromEntries(BRISTOL_DESTINATIONS.map((d) => [d.id, d]));
