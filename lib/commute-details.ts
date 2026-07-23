import type {
  CommuteEstimateSource,
  Destination,
  Neighbourhood,
  UserQuery,
} from "@/lib/types";
import { LONDON_TRANSIT_KMH } from "@/lib/isochrone";
import { DESTINATIONS_BY_ID } from "@/lib/data/destinations";

export const LONDON_BOROUGHS = [
  "Barking and Dagenham",
  "Barnet",
  "Bexley",
  "Brent",
  "Bromley",
  "Camden",
  "Croydon",
  "Ealing",
  "Enfield",
  "Greenwich",
  "Hackney",
  "Hammersmith & Fulham",
  "Haringey",
  "Harrow",
  "Havering",
  "Hillingdon",
  "Hounslow",
  "Islington",
  "Kensington & Chelsea",
  "Kingston upon Thames",
  "Lambeth",
  "Lewisham",
  "Merton",
  "Newham",
  "Redbridge",
  "Richmond upon Thames",
  "Southwark",
  "Sutton",
  "Tower Hamlets",
  "Waltham Forest",
  "Wandsworth",
  "Westminster",
] as const;

export function fallbackCommuteMinutes(
  neighbourhood: Neighbourhood,
  destination: Destination | null,
): number | null {
  if (!destination) return null;
  const km = haversineKm(neighbourhood.centroid, destination.centroid);
  const minPerKm = 60 / LONDON_TRANSIT_KMH;
  return Math.max(10, Math.round(km * minPerKm));
}

export function displayCommuteMinutes(
  neighbourhood: Neighbourhood,
  commuteMinutes: number | null,
  query: UserQuery,
): number | null {
  return commuteMinutes ?? fallbackCommuteMinutes(neighbourhood, query.destination);
}

export function commuteSourceLabel(
  source: CommuteEstimateSource | null | undefined,
): string {
  switch (source) {
    case "tflJourneyPlanner":
      return "TfL duration";
    case "staticMatrix":
      return "reviewed estimate";
    case "distanceHeuristic":
      return "distance estimate";
    default:
      return "typical estimate";
  }
}

export function commuteSourceDescription(
  source: CommuteEstimateSource | null | undefined,
): string {
  switch (source) {
    case "tflJourneyPlanner":
      return "Duration returned by TfL Journey Planner; route legs are simplified for decision support.";
    case "staticMatrix":
      return "Duration from the reviewed static commute matrix for common London destinations.";
    case "distanceHeuristic":
      return "Duration estimated from London distance and typical public-transport speed; verify before booking viewings.";
    default:
      return "Typical public-transport estimate; choose a destination to refresh with live routing where available.";
  }
}

export function commuteRouteSummary(
  neighbourhood: Neighbourhood,
  query: UserQuery,
  source?: CommuteEstimateSource | null,
): CommuteRouteSummary {
  const station = neighbourhood.mainStations[0] ?? null;
  const destination = query.destination?.label ?? "your destination";
  const anchor = routeAnchorFor(query.destination);

  const legs = routeLegsFor(neighbourhood, station, destination, anchor);
  const backup = backupRouteOption(neighbourhood, station, destination, anchor);

  return {
    primary: routePrimary(station, destination, anchor, legs),
    legs,
    destinationLines: anchor?.lines ?? [],
    routeOptions: [
      { label: "Best available structure", legs },
      ...(backup ? [backup] : []),
    ],
    warnings: routeWarnings(neighbourhood, query, station, anchor, legs, source),
    durationSourceLabel: commuteSourceLabel(source),
    methodology: commuteSourceDescription(source),
    confidence:
      legs.some((leg) => leg.line) && source === "tflJourneyPlanner"
        ? "direct-service-estimate"
        : source === "tflJourneyPlanner"
        ? "tfl-duration-structured-estimate"
        : "structured-estimate",
  };
}

export type CommuteRouteSummary = {
  primary: string;
  legs: CommuteRouteLeg[];
  destinationLines: string[];
  routeOptions: CommuteRouteOption[];
  warnings: string[];
  durationSourceLabel: string;
  methodology: string;
  confidence:
    | "direct-service-estimate"
    | "tfl-duration-structured-estimate"
    | "structured-estimate";
};

export type CommuteRouteOption = {
  label: string;
  legs: CommuteRouteLeg[];
};

export type CommuteRouteLeg = {
  mode:
    | "walk"
    | "bus"
    | "tube"
    | "rail"
    | "overground"
    | "dlr"
    | "tram"
    | "river"
    | "interchange"
    | "public transport";
  instruction: string;
  service?: string;
  line?: string;
};

type RouteAnchor = {
  id: string;
  station: string;
  lines: string[];
};

const DESTINATION_ROUTE_ANCHORS: Record<string, RouteAnchor> = {
  marylebone: {
    id: "marylebone",
    station: "Marylebone",
    lines: ["Bakerloo", "National Rail"],
  },
  "kings-cross": {
    id: "kings-cross",
    station: "King's Cross St Pancras",
    lines: [
      "Northern",
      "Piccadilly",
      "Victoria",
      "Circle",
      "Hammersmith & City",
      "Metropolitan",
      "National Rail",
    ],
  },
  "liverpool-st": {
    id: "liverpool-st",
    station: "Liverpool Street",
    lines: [
      "Central",
      "Elizabeth",
      "Circle",
      "Hammersmith & City",
      "Metropolitan",
      "Overground",
      "National Rail",
    ],
  },
  "canary-wharf": {
    id: "canary-wharf",
    station: "Canary Wharf",
    lines: ["Jubilee", "Elizabeth", "DLR"],
  },
  bank: {
    id: "bank",
    station: "Bank",
    lines: ["Central", "Northern", "DLR", "Waterloo & City"],
  },
  victoria: {
    id: "victoria",
    station: "Victoria",
    lines: ["Victoria", "Circle", "District", "National Rail"],
  },
  waterloo: {
    id: "waterloo",
    station: "Waterloo",
    lines: ["Bakerloo", "Jubilee", "Northern", "Waterloo & City", "National Rail"],
  },
  "oxford-circus": {
    id: "oxford-circus",
    station: "Oxford Circus",
    lines: ["Bakerloo", "Central", "Victoria"],
  },
  paddington: {
    id: "paddington",
    station: "Paddington",
    lines: [
      "Bakerloo",
      "Circle",
      "District",
      "Elizabeth",
      "Hammersmith & City",
      "National Rail",
    ],
  },
  "london-bridge": {
    id: "london-bridge",
    station: "London Bridge",
    lines: ["Jubilee", "Northern", "National Rail"],
  },
};

const ACCESS_BUS_LEGS: Record<string, { routes: string[]; target: string }> = {
  "muswell-hill": { routes: ["43", "134", "144"], target: "Highgate, East Finchley, or Turnpike Lane" },
  "crouch-end": { routes: ["W3", "41", "91"], target: "Finsbury Park, Archway, or King's Cross" },
  camberwell: { routes: ["12", "36", "171", "345"], target: "Denmark Hill, Elephant & Castle, or Vauxhall" },
  "east-dulwich": { routes: ["40", "176", "185"], target: "East Dulwich, Denmark Hill, or Vauxhall" },
  streatham: { routes: ["57", "133", "159"], target: "Streatham station, Tooting, or Brixton" },
  peckham: { routes: ["12", "36", "63", "436"], target: "Peckham Rye, Elephant & Castle, or Victoria" },
};

const DIRECT_RENDERABLE_LINES = new Set([
  "Bakerloo",
  "Central",
  "Circle",
  "District",
  "DLR",
  "Elizabeth",
  "Hammersmith & City",
  "Jubilee",
  "Metropolitan",
  "Northern",
  "Piccadilly",
  "Tramlink",
  "Victoria",
  "Waterloo & City",
]);

const VERIFIED_DIRECT_SERVICE_KEYS = new Set([
  "Bermondsey|canary-wharf|Jubilee",
  "Bermondsey|london-bridge|Jubilee",
  "Bethnal Green|bank|Central",
  "Bethnal Green|liverpool-st|Central",
  "Bethnal Green|oxford-circus|Central",
  "Brixton|kings-cross|Victoria",
  "Brixton|oxford-circus|Victoria",
  "Brixton|victoria|Victoria",
  "Ealing Broadway|bank|Central",
  "Ealing Broadway|liverpool-st|Elizabeth",
  "Ealing Broadway|oxford-circus|Central",
  "Ealing Broadway|paddington|Elizabeth",
  "Finsbury Park|kings-cross|Victoria",
  "Finsbury Park|oxford-circus|Victoria",
  "Finsbury Park|victoria|Victoria",
  "Green Park|canary-wharf|Jubilee",
  "Green Park|oxford-circus|Victoria",
  "Green Park|victoria|Victoria",
  "Hammersmith|kings-cross|Piccadilly",
  "Hammersmith|paddington|Hammersmith & City",
  "Leyton|bank|Central",
  "Leyton|liverpool-st|Central",
  "Leyton|oxford-circus|Central",
  "Old Street|bank|Northern",
  "Pimlico|kings-cross|Victoria",
  "Pimlico|oxford-circus|Victoria",
  "Pimlico|victoria|Victoria",
  "Stockwell|kings-cross|Victoria",
  "Stockwell|oxford-circus|Victoria",
  "Stockwell|victoria|Victoria",
  "Stratford|bank|Central",
  "Stratford|canary-wharf|Jubilee",
  "Stratford|liverpool-st|Central",
  "Stratford|london-bridge|Jubilee",
  "Tottenham Court Road|bank|Central",
  "Tottenham Court Road|liverpool-st|Elizabeth",
  "Tottenham Court Road|oxford-circus|Central",
  "Tottenham Hale|kings-cross|Victoria",
  "Tottenham Hale|oxford-circus|Victoria",
  "Tottenham Hale|victoria|Victoria",
  "Vauxhall|kings-cross|Victoria",
  "Vauxhall|oxford-circus|Victoria",
  "Vauxhall|victoria|Victoria",
  "Walthamstow Central|kings-cross|Victoria",
  "Walthamstow Central|oxford-circus|Victoria",
  "Walthamstow Central|victoria|Victoria",
  "Waterloo|bank|Waterloo & City",
]);

function routeLegsFor(
  neighbourhood: Neighbourhood,
  station: Neighbourhood["mainStations"][number] | null,
  destination: string,
  anchor: RouteAnchor | null,
): CommuteRouteLeg[] {
  if (!station) {
    return [
      {
        mode: "walk",
        instruction: "Walk or use local buses to the nearest suitable station or stop",
      },
      {
        mode: "public transport",
        service: "TfL public transport",
        instruction: `Use the fastest public-transport connection toward ${destination}`,
      },
      {
        mode: "walk",
        instruction: `Final walk from the nearest stop to ${destination}`,
      },
    ];
  }

  const originLines = station.lines.map(canonicalLine);
  const accessLeg = accessLegFor(neighbourhood, station.name, originLines);

  if (!anchor) {
    return [
      accessLeg,
      {
        mode: "public transport",
        service: "TfL public transport",
        instruction: `Use TfL Journey Planner from ${station.name} to the stop nearest ${destination}`,
      },
      {
        mode: "walk",
        instruction: `Final walk from the nearest stop to ${destination}`,
      },
    ];
  }

  const directLine = originLines.find(
    (line) =>
      anchor.lines.includes(line) &&
      DIRECT_RENDERABLE_LINES.has(line) &&
      isVerifiedDirectService(station.name, anchor.id, line),
  );

  if (directLine) {
    return [
      accessLeg,
      {
        mode: modeForLine(directLine),
        service: lineServiceLabel(directLine),
        line: directLine,
        instruction: `Take ${lineServiceLabel(directLine)} from ${station.name} to ${anchor.station}`,
      },
      {
        mode: "walk",
        instruction: `Final walk from ${anchor.station} to ${destination}`,
      },
    ];
  }

  return [
    accessLeg,
    {
      mode: "public transport",
      service: "TfL public transport",
      instruction: `Use the fastest public-transport route from ${station.name} toward ${anchor.station}`,
    },
    {
      mode: "interchange",
      instruction: "Allow for the interchange pattern shown by TfL for your travel time",
    },
    {
      mode: "walk",
      instruction: `Final walk from the destination stop to ${destination}`,
    },
  ];
}

function routePrimary(
  station: Neighbourhood["mainStations"][number] | null,
  destination: string,
  anchor: RouteAnchor | null,
  legs: CommuteRouteLeg[],
): string {
  const direct = legs.find((leg) => leg.line);
  if (station && anchor && direct) {
    return `${station.name} to ${anchor.station} (${direct.service})`;
  }
  if (station && anchor) {
    return `${station.name} toward ${anchor.station}`;
  }
  if (station) {
    return `${station.name} toward ${destination}`;
  }
  return `Estimated public transport toward ${destination}`;
}

function backupRouteOption(
  neighbourhood: Neighbourhood,
  station: Neighbourhood["mainStations"][number] | null,
  destination: string,
  anchor: RouteAnchor | null,
): CommuteRouteOption | null {
  const alternativeStation =
    station == null
      ? null
      : neighbourhood.mainStations.find((candidate) => candidate.name !== station.name) ?? null;
  const bus = ACCESS_BUS_LEGS[neighbourhood.id];

  if (!alternativeStation && !bus) return null;

  const accessLeg = alternativeStation
    ? accessLegFor(
        neighbourhood,
        alternativeStation.name,
        alternativeStation.lines.map(canonicalLine),
      )
    : {
        mode: "bus" as const,
        service: `Bus ${bus!.routes.join(", ")}`,
        instruction: `Use bus ${bus!.routes.join(", ")} toward ${bus!.target}`,
      };

  return {
    label: "Backup route",
    legs: [
      accessLeg,
      {
        mode: "public transport",
        service: "TfL public transport",
        instruction: anchor
          ? `Check TfL for an alternative public-transport route toward ${anchor.station}`
          : `Check TfL for an alternative public-transport route toward ${destination}`,
      },
    ],
  };
}

function routeWarnings(
  neighbourhood: Neighbourhood,
  query: UserQuery,
  station: Neighbourhood["mainStations"][number] | null,
  anchor: RouteAnchor | null,
  legs: CommuteRouteLeg[],
  source: CommuteEstimateSource | null | undefined,
): string[] {
  const warnings: string[] = [];
  const stationLines = station?.lines.map(canonicalLine) ?? [];

  if (source === "staticMatrix") {
    warnings.push("Reviewed commute estimate; verify current service before viewings.");
  } else if (source === "distanceHeuristic") {
    warnings.push("Distance-based estimate; exact routing is not guaranteed.");
  } else if (source === "tflJourneyPlanner") {
    warnings.push("Duration from TfL; route structure is simplified here.");
  } else {
    warnings.push("Typical route structure; exact legs depend on travel time.");
  }

  if (legs.some((leg) => leg.mode === "bus")) {
    warnings.push("Bus-first start; allow extra time at peak.");
  }
  if (
    stationLines.length > 0 &&
    stationLines.every((line) => line === "National Rail" || line === "Overground")
  ) {
    warnings.push("Rail or Overground dependent; check service gaps before viewing.");
  }
  if (anchor == null && query.destination) {
    warnings.push("Custom destination: route text uses local station metadata.");
  }
  if (neighbourhood.mainStations.length === 1 && stationLines.length <= 1) {
    warnings.push("Limited line choice from the main station.");
  }

  return warnings.slice(0, 4);
}

export function boroughCoverage(
  neighbourhoods: Neighbourhood[],
): {
  covered: string[];
  missing: string[];
} {
  const covered = new Set(
    neighbourhoods.flatMap((n) => n.borough.split("/").map((b) => b.trim())),
  );
  return {
    covered: LONDON_BOROUGHS.filter((borough) => covered.has(borough)),
    missing: LONDON_BOROUGHS.filter((borough) => !covered.has(borough)),
  };
}

export function routeSummaryUsesOnlySupportedServices(
  summary: CommuteRouteSummary,
  neighbourhood: Neighbourhood,
  destination: Destination | null,
): boolean {
  const anchor = routeAnchorFor(destination);
  const neighbourhoodLines = new Set(
    neighbourhood.mainStations.flatMap((station) =>
      station.lines.map(canonicalLine),
    ),
  );

  for (const option of summary.routeOptions) {
    for (const leg of option.legs) {
      if (!leg.line) continue;
      if (!DIRECT_RENDERABLE_LINES.has(leg.line)) return false;
      if (!neighbourhoodLines.has(leg.line)) return false;
      if (anchor && !anchor.lines.includes(leg.line)) return false;
      if (
        anchor &&
        !isVerifiedDirectService(
          originStationNameForLine(neighbourhood, leg.line),
          anchor.id,
          leg.line,
        )
      ) {
        return false;
      }
    }
  }

  return true;
}

function routeAnchorFor(destination: Destination | null): RouteAnchor | null {
  if (!destination) return null;
  const direct = DESTINATION_ROUTE_ANCHORS[destination.id];
  if (direct) return direct;

  const known = Object.values(DESTINATIONS_BY_ID).find(
    (d) =>
      Math.abs(d.centroid.lat - destination.centroid.lat) < 0.004 &&
      Math.abs(d.centroid.lng - destination.centroid.lng) < 0.004,
  );
  return known ? DESTINATION_ROUTE_ANCHORS[known.id] ?? null : null;
}

function accessLegFor(
  neighbourhood: Neighbourhood,
  stationName: string,
  originLines: string[],
): CommuteRouteLeg {
  const bus = ACCESS_BUS_LEGS[neighbourhood.id];
  const needsBusAccess =
    stationName.toLowerCase().includes("bus") ||
    (!originLines.some((line) => modeForLine(line) === "tube") && bus != null);

  if (bus && needsBusAccess) {
    const routes = bus.routes.join(", ");
    return {
      mode: "bus",
      service: `Bus ${routes}`,
      instruction: `Use bus ${routes} toward ${bus.target}`,
    };
  }

  return {
    mode: "walk",
    instruction: `Walk to ${stationName.replace(" (bus)", "")}`,
  };
}

function isVerifiedDirectService(
  stationName: string,
  destinationId: string,
  line: string,
): boolean {
  return VERIFIED_DIRECT_SERVICE_KEYS.has(verifiedDirectServiceKey(stationName, destinationId, line));
}

function verifiedDirectServiceKey(
  stationName: string,
  destinationId: string,
  line: string,
): string {
  return `${stationName.replace(" (bus)", "")}|${destinationId}|${line}`;
}

function originStationNameForLine(
  neighbourhood: Neighbourhood,
  line: string,
): string {
  const station = neighbourhood.mainStations.find((candidate) =>
    candidate.lines.map(canonicalLine).includes(line),
  );
  return station?.name ?? "";
}

function canonicalLine(line: string): string {
  const lower = line.toLowerCase();
  if (lower.includes("hammersmith")) return "Hammersmith & City";
  if (
    lower.includes("national rail") ||
    lower.includes("thameslink") ||
    lower.includes("great northern")
  ) {
    return "National Rail";
  }
  if (lower.includes("elizabeth")) return "Elizabeth";
  if (lower.includes("overground")) return "Overground";
  if (lower.includes("dlr")) return "DLR";
  if (lower.includes("tram")) return "Tramlink";
  return line;
}

function lineServiceLabel(line: string): string {
  switch (line) {
    case "DLR":
      return "DLR";
    case "Elizabeth":
      return "the Elizabeth line";
    case "National Rail":
      return "National Rail";
    case "Overground":
      return "the Overground";
    case "Tramlink":
      return "Tramlink";
    case "public transport":
      return "public transport";
    default:
      return `the ${line} line`;
  }
}

function modeForLine(line: string): CommuteRouteLeg["mode"] {
  switch (line) {
    case "DLR":
      return "dlr";
    case "National Rail":
      return "rail";
    case "Overground":
      return "overground";
    case "Tramlink":
      return "tram";
    case "public transport":
      return "public transport";
    default:
      return "tube";
  }
}

function haversineKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}
