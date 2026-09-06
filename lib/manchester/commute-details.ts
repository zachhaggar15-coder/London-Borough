import type {
  CommuteEstimateSource,
  Destination,
  Neighbourhood,
  UserQuery,
} from "@/lib/types";
import type {
  CommuteRouteLeg,
  CommuteRouteSummary,
} from "@/lib/commute-details";
import { GM_TRANSIT_KMH, haversineKm } from "@/lib/manchester/commute";

/**
 * Route descriptions for Greater Manchester.
 *
 * The London version builds a leg-by-leg route from a table of
 * destination anchors and tube-line knowledge. Nothing equivalent is
 * possible here without a journey planner to check it against, so this
 * deliberately describes the *shape* of a journey — which stop, which
 * mode, one change or two — rather than inventing a specific itinerary.
 *
 * That is the honest limit of a reviewed static matrix, and the warnings
 * below say so on the page rather than leaving the reader to assume more
 * precision than exists.
 */

/** Modes we can infer from a line name. */
function modeForLine(line: string): CommuteRouteLeg["mode"] {
  if (/metrolink/i.test(line)) return "tram";
  if (/bus|busway/i.test(line)) return "bus";
  if (/rail|northern|transpennine|avanti/i.test(line)) return "rail";
  return "public transport";
}

function describeMode(mode: CommuteRouteLeg["mode"]): string {
  switch (mode) {
    case "tram":
      return "tram";
    case "bus":
      return "bus";
    case "rail":
      return "train";
    default:
      return "public transport";
  }
}

/** Destinations you can reach without changing, by mode and line family. */
const DIRECT_HINTS: Record<string, RegExp> = {
  piccadilly: /metrolink (bury|altrincham|ashton|east didsbury)|northern rail|transpennine/i,
  victoria: /metrolink (bury|rochdale|eccles)|northern rail/i,
  spinningfields: /metrolink (altrincham|eccles|airport)/i,
  mediacity: /metrolink eccles/i,
  airport: /metrolink airport|northern rail|transpennine/i,
  stockport: /northern rail|transpennine|avanti/i,
};

export function manchesterCommuteRouteSummary(
  neighbourhood: Neighbourhood,
  query: UserQuery,
  source?: CommuteEstimateSource | null,
): CommuteRouteSummary {
  const station = neighbourhood.mainStations[0] ?? null;
  const destination = query.destination;
  const destinationLabel = destination?.label ?? "your destination";
  const lines = station?.lines ?? [];
  const primaryLine = lines[0] ?? "public transport";
  const mode = modeForLine(primaryLine);

  const direct = isProbablyDirect(destination, lines);

  const legs: CommuteRouteLeg[] = [
    {
      mode: "walk",
      instruction: station
        ? `Walk to ${station.name}`
        : "Walk to your nearest stop",
    },
    {
      mode,
      instruction: direct
        ? `${capitalise(describeMode(mode))} towards the city centre for ${destinationLabel}`
        : `${capitalise(describeMode(mode))} into the city centre`,
      line: primaryLine,
    },
  ];

  if (!direct) {
    legs.push({
      mode: "interchange",
      instruction: `Change in the centre for ${destinationLabel}`,
    });
  }

  legs.push({
    mode: "walk",
    instruction: `Walk to ${destinationLabel}`,
  });

  return {
    primary: station
      ? `${station.name} → ${destinationLabel}${direct ? "" : ", changing in the centre"}`
      : `${neighbourhood.name} → ${destinationLabel}`,
    legs,
    destinationLines: [],
    routeOptions: [{ label: "Typical shape of the journey", legs }],
    warnings: warningsFor(neighbourhood, destination, lines, direct),
    durationSourceLabel:
      source === "distanceHeuristic" ? "Distance estimate" : "Reviewed estimate",
    methodology:
      source === "distanceHeuristic"
        ? "Straight-line distance at an assumed average speed, because this pairing is not in the reviewed matrix. Treat it as a rough upper bound."
        : "A reviewed door-to-door estimate for a weekday morning: walking to the stop, waiting, riding, and walking off at the other end. Not a timetable time.",
    // Never claims a live-service confidence: there is no journey planner
    // behind any of these figures.
    confidence: "structured-estimate",
  };
}

function isProbablyDirect(
  destination: Destination | null,
  lines: string[],
): boolean {
  if (!destination) return false;
  const hint = DIRECT_HINTS[destination.id];
  if (!hint) return false;
  return lines.some((line) => hint.test(line));
}

function warningsFor(
  neighbourhood: Neighbourhood,
  destination: Destination | null,
  lines: string[],
  direct: boolean,
): string[] {
  const warnings: string[] = [];

  if (lines.length === 0) {
    warnings.push(
      "No station or tram stop is recorded for this area, so the journey starts with a bus.",
    );
  }

  if (lines.every((line) => /bus/i.test(line))) {
    warnings.push(
      "Bus only. Journey times here vary with traffic far more than tram or rail times do.",
    );
  }

  if (!direct && destination) {
    warnings.push(
      `Expect at least one change. Greater Manchester's network is radial, so a journey to ${destination.label} that does not pass through the centre is usually slower than the distance suggests.`,
    );
  }

  // Flag the orbital problem explicitly where it bites: the destination is
  // a long way from the centre and so is the area, in a different
  // direction. This is the single most common way these estimates
  // disappoint someone.
  if (destination) {
    const straightLineKm = haversineKm(neighbourhood.centroid, destination.centroid);
    const impliedMinutes = (straightLineKm / GM_TRANSIT_KMH) * 60;
    if (straightLineKm > 12 && impliedMinutes > 35) {
      warnings.push(
        "This is a cross-conurbation journey. Driving is often faster than any published public route for trips like this one.",
      );
    }
  }

  return warnings;
}

function capitalise(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
