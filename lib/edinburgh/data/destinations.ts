import type { Destination } from "@/lib/types";

/**
 * Where Edinburgh and the Lothians actually commute to.
 *
 * The city's employment is unusually concentrated in two places that are
 * not the same place: the financial and government quarter around St
 * Andrew Square and the West End, and Edinburgh Park and the Gyle out on
 * the western edge. The tram connects them, which is the single most
 * useful fact about commuting here.
 *
 * The BioQuarter at Little France is the third, and growing fastest —
 * the Royal Infirmary, the medical school and the research institutes
 * together employ more people than any other single site in the city.
 *
 * The centroids are the working centre of each district rather than a
 * station entrance, which is what someone asking "how long is my
 * commute" actually means.
 */
export const EDINBURGH_DESTINATIONS: Destination[] = [
  { id: "waverley",          label: "Waverley & the Old Town",       centroid: { lat: 55.9520, lng: -3.1883 } },
  { id: "st-andrew-square",  label: "St Andrew Square & the New Town", centroid: { lat: 55.9545, lng: -3.1925 } },
  { id: "haymarket",         label: "Haymarket & the West End",      centroid: { lat: 55.9455, lng: -3.2180 } },
  { id: "edinburgh-park",    label: "Edinburgh Park & the Gyle",     centroid: { lat: 55.9280, lng: -3.3070 } },
  { id: "bioquarter",        label: "Royal Infirmary & the BioQuarter", centroid: { lat: 55.9220, lng: -3.1380 } },
  { id: "george-square",     label: "University of Edinburgh",       centroid: { lat: 55.9440, lng: -3.1880 } },
  { id: "leith-shore",       label: "Leith Shore & Ocean Terminal",  centroid: { lat: 55.9790, lng: -3.1720 } },
  { id: "livingston-centre", label: "Livingston town centre",        centroid: { lat: 55.8840, lng: -3.5180 } },
];

export const EDINBURGH_DESTINATIONS_BY_ID: Record<string, Destination> =
  Object.fromEntries(EDINBURGH_DESTINATIONS.map((d) => [d.id, d]));
