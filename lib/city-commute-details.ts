import type {
  CommuteEstimateSource,
  Destination,
  Neighbourhood,
  UserQuery,
} from "@/lib/types";
import type { CommuteRouteLeg, CommuteRouteSummary } from "@/lib/commute-details";
import { haversineKm } from "@/lib/city-content";

/**
 * Route descriptions for cities with no journey planner behind them.
 *
 * The London version builds a leg-by-leg route from a table of
 * destination anchors and tube-line knowledge. Nothing equivalent is
 * possible in a city whose transit authority publishes no open routing
 * API, so this deliberately describes the *shape* of a journey — which
 * stop, which mode, one change or two — rather than inventing a specific
 * itinerary it cannot check.
 *
 * That is the honest limit of a reviewed static matrix, and the warnings
 * say so on the page rather than leaving the reader to assume more
 * precision than exists.
 */

export type CommuteNarrativeConfig = {
  /** Line-name patterns that identify a mode, most specific first. */
  modePatterns: { pattern: RegExp; mode: CommuteRouteLeg["mode"] }[];
  /**
   * Destinations reachable without changing, keyed by destination id.
   * A line at the area's main stop matching the pattern means direct.
   */
  directHints: Record<string, RegExp>;
  /** Assumed average speed, used only to spot cross-region journeys. */
  transitKmh: number;
  /** How the region's network is shaped, named in the change warning. */
  networkShape: string;
  /** Threshold beyond which a journey is flagged as cross-region. */
  longJourneyKm?: number;
};

function modeForLine(
  line: string,
  config: CommuteNarrativeConfig,
): CommuteRouteLeg["mode"] {
  for (const { pattern, mode } of config.modePatterns) {
    if (pattern.test(line)) return mode;
  }
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

export function createCommuteRouteSummary(config: CommuteNarrativeConfig) {
  const longJourneyKm = config.longJourneyKm ?? 12;

  return function commuteRouteSummary(
    neighbourhood: Neighbourhood,
    query: UserQuery,
    source?: CommuteEstimateSource | null,
  ): CommuteRouteSummary {
    const station = neighbourhood.mainStations[0] ?? null;
    const destination = query.destination;
    const destinationLabel = destination?.label ?? "your destination";
    const lines = station?.lines ?? [];
    const primaryLine = lines[0] ?? "public transport";
    const mode = modeForLine(primaryLine, config);

    const direct = isProbablyDirect(destination, lines, config);

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
          ? `${capitalise(describeMode(mode))} towards the centre for ${destinationLabel}`
          : `${capitalise(describeMode(mode))} into the centre`,
        line: primaryLine,
      },
    ];

    if (!direct) {
      legs.push({
        mode: "interchange",
        instruction: `Change in the centre for ${destinationLabel}`,
      });
    }

    legs.push({ mode: "walk", instruction: `Walk to ${destinationLabel}` });

    return {
      primary: station
        ? `${station.name} → ${destinationLabel}${direct ? "" : ", changing in the centre"}`
        : `${neighbourhood.name} → ${destinationLabel}`,
      legs,
      destinationLines: [],
      routeOptions: [{ label: "Typical shape of the journey", legs }],
      warnings: warningsFor(
        neighbourhood,
        destination,
        lines,
        direct,
        config,
        longJourneyKm,
      ),
      durationSourceLabel:
        source === "distanceHeuristic" ? "Distance estimate" : "Reviewed estimate",
      methodology:
        source === "distanceHeuristic"
          ? "Straight-line distance at an assumed average speed, because this pairing is not in the reviewed matrix. Treat it as a rough upper bound."
          : "A reviewed door-to-door estimate for a weekday morning: walking to the stop, waiting, riding, and walking off at the other end. Not a timetable time.",
      // Never claims a live-service confidence: there is no journey
      // planner behind any of these figures.
      confidence: "structured-estimate",
    };
  };
}

function isProbablyDirect(
  destination: Destination | null,
  lines: string[],
  config: CommuteNarrativeConfig,
): boolean {
  if (!destination) return false;
  const hint = config.directHints[destination.id];
  if (!hint) return false;
  return lines.some((line) => hint.test(line));
}

function warningsFor(
  neighbourhood: Neighbourhood,
  destination: Destination | null,
  lines: string[],
  direct: boolean,
  config: CommuteNarrativeConfig,
  longJourneyKm: number,
): string[] {
  const warnings: string[] = [];

  if (lines.length === 0) {
    warnings.push(
      "No station or stop is recorded for this area, so the journey starts with a bus.",
    );
  }

  if (lines.length > 0 && lines.every((line) => /bus/i.test(line))) {
    warnings.push(
      "Bus only. Journey times here vary with traffic far more than tram or rail times do.",
    );
  }

  if (!direct && destination) {
    warnings.push(
      `Expect at least one change. ${config.networkShape}, so a journey to ${destination.label} that does not pass through the centre is usually slower than the distance suggests.`,
    );
  }

  // Flag the orbital problem explicitly where it bites: the destination
  // is a long way from the centre and so is the area, in a different
  // direction. This is the single most common way these estimates
  // disappoint someone.
  if (destination) {
    const straightLineKm = haversineKm(
      neighbourhood.centroid,
      destination.centroid,
    );
    const impliedMinutes = (straightLineKm / config.transitKmh) * 60;
    if (straightLineKm > longJourneyKm && impliedMinutes > 35) {
      warnings.push(
        "This is a cross-region journey. Driving is often faster than any published public route for trips like this one.",
      );
    }
  }

  return warnings;
}

function capitalise(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
