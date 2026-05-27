import type { Destination, Neighbourhood, UserQuery } from "@/lib/types";
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

export function commuteRouteSummary(
  neighbourhood: Neighbourhood,
  query: UserQuery,
): CommuteRouteSummary {
  const station = neighbourhood.mainStations[0];
  const destination = query.destination?.label ?? "your destination";
  const anchor = routeAnchorFor(query.destination);

  if (!station) {
    const legs: CommuteRouteLeg[] = [
      {
        mode: "walk",
        instruction: "Walk or use local buses to the nearest station",
      },
      {
        mode: "public transport",
        instruction: `Use the fastest public transport connection toward ${destination}`,
      },
      {
        mode: "walk",
        instruction: `Final walk from the closest stop to ${destination}`,
      },
    ];
    return completeRouteSummary({
      neighbourhood,
      query,
      primary: `Public transport toward ${destination}`,
      legs,
      destinationLines: anchor?.lines ?? [],
      station: null,
      anchor,
      originLine: null,
    });
  }

  const originLines = station.lines.map(canonicalLine);
  const accessLeg = accessLegFor(neighbourhood, station.name, originLines);

  if (!anchor) {
    const line = bestOriginLine(originLines);
    const legs: CommuteRouteLeg[] = [
      accessLeg,
      {
        mode: modeForLine(line),
        service: lineServiceLabel(line),
        instruction: `Use ${lineServiceLabel(line)} from ${station.name}; follow the fastest TfL interchange toward ${destination}`,
      },
      {
        mode: "walk",
        instruction: `Final walk from the closest stop to ${destination}`,
      },
    ];
    return completeRouteSummary({
      neighbourhood,
      query,
      primary: `${station.name} toward ${destination}`,
      legs,
      destinationLines: [],
      station,
      anchor,
      originLine: line,
    });
  }

  const directLine = originLines.find((line) => anchor.lines.includes(line));
  if (directLine) {
    const legs: CommuteRouteLeg[] = [
      accessLeg,
      {
        mode: modeForLine(directLine),
        service: lineServiceLabel(directLine),
        instruction: `Take ${lineServiceLabel(directLine)} to ${anchor.station}`,
      },
      {
        mode: "walk",
        instruction: `Final walk from ${anchor.station} to ${destination}`,
      },
    ];
    return completeRouteSummary({
      neighbourhood,
      query,
      primary: `${station.name} to ${anchor.station}`,
      legs,
      destinationLines: anchor.lines,
      station,
      anchor,
      originLine: directLine,
    });
  }

  const originLine = bestOriginLine(originLines);
  const destinationLine = bestDestinationLine(anchor.lines, originLine);
  const interchange = interchangeFor(originLine, destinationLine, anchor.id);

  const legs: CommuteRouteLeg[] = [
    accessLeg,
    {
      mode: modeForLine(originLine),
      service: lineServiceLabel(originLine),
      instruction: `Take ${lineServiceLabel(originLine)} from ${station.name} to ${interchange}`,
    },
    {
      mode: "interchange",
      instruction: `Change at ${interchange}`,
    },
    {
      mode: modeForLine(destinationLine),
      service: lineServiceLabel(destinationLine),
      instruction: `Take ${lineServiceLabel(destinationLine)} to ${anchor.station}`,
    },
    {
      mode: "walk",
      instruction: `Final walk from ${anchor.station} to ${destination}`,
    },
  ];

  return completeRouteSummary({
    neighbourhood,
    query,
    primary: `${station.name} to ${anchor.station}`,
    legs,
    destinationLines: anchor.lines,
    station,
    anchor,
    originLine,
  });
}

export type CommuteRouteSummary = {
  primary: string;
  legs: CommuteRouteLeg[];
  destinationLines: string[];
  routeOptions: CommuteRouteOption[];
  warnings: string[];
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
    lines: ["Northern", "Piccadilly", "Victoria", "Circle", "Hammersmith & City", "Metropolitan", "National Rail"],
  },
  "liverpool-st": {
    id: "liverpool-st",
    station: "Liverpool Street",
    lines: ["Central", "Elizabeth", "Circle", "Hammersmith & City", "Metropolitan", "Overground", "National Rail"],
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
    lines: ["Bakerloo", "Circle", "District", "Elizabeth", "Hammersmith & City", "National Rail"],
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

function completeRouteSummary({
  neighbourhood,
  query,
  primary,
  legs,
  destinationLines,
  station,
  anchor,
  originLine,
}: {
  neighbourhood: Neighbourhood;
  query: UserQuery;
  primary: string;
  legs: CommuteRouteLeg[];
  destinationLines: string[];
  station: Neighbourhood["mainStations"][number] | null;
  anchor: RouteAnchor | null;
  originLine: string | null;
}): CommuteRouteSummary {
  const backup = backupRouteOption(
    neighbourhood,
    query,
    station,
    anchor,
    originLine,
  );
  return {
    primary,
    legs,
    destinationLines,
    routeOptions: [
      { label: "Best route", legs },
      ...(backup ? [backup] : []),
    ],
    warnings: routeWarnings(neighbourhood, query, station, anchor, legs),
  };
}

function backupRouteOption(
  neighbourhood: Neighbourhood,
  query: UserQuery,
  station: Neighbourhood["mainStations"][number] | null,
  anchor: RouteAnchor | null,
  primaryLine: string | null,
): CommuteRouteOption | null {
  const destination = query.destination?.label ?? "your destination";
  if (!station || !anchor) {
    return {
      label: "Backup route",
      legs: [
        {
          mode: "public transport",
          instruction: `Use TfL journey planning for a second public transport route toward ${destination}`,
        },
      ],
    };
  }

  const alternativeStation =
    neighbourhood.mainStations.find((candidate) => candidate.name !== station.name) ??
    station;
  const alternativeLines = alternativeStation.lines.map(canonicalLine);
  const alternativeLine =
    alternativeLines.find((line) => line !== primaryLine && line !== "National Rail") ??
    alternativeLines.find((line) => line !== primaryLine) ??
    null;

  if (!alternativeLine) return null;

  const accessLeg = accessLegFor(
    neighbourhood,
    alternativeStation.name,
    alternativeLines,
  );
  const directLine = anchor.lines.includes(alternativeLine) ? alternativeLine : null;
  if (directLine) {
    return {
      label: "Backup route",
      legs: [
        accessLeg,
        {
          mode: modeForLine(directLine),
          service: lineServiceLabel(directLine),
          instruction: `Take ${lineServiceLabel(directLine)} to ${anchor.station}`,
        },
        {
          mode: "walk",
          instruction: `Final walk from ${anchor.station} to ${destination}`,
        },
      ],
    };
  }

  const destinationLine = bestDestinationLine(anchor.lines, alternativeLine);
  const interchange = interchangeFor(
    alternativeLine,
    destinationLine,
    anchor.id,
  );
  return {
    label: "Backup route",
    legs: [
      accessLeg,
      {
        mode: modeForLine(alternativeLine),
        service: lineServiceLabel(alternativeLine),
        instruction: `Take ${lineServiceLabel(alternativeLine)} from ${alternativeStation.name} to ${interchange}`,
      },
      {
        mode: "interchange",
        instruction: `Change at ${interchange}`,
      },
      {
        mode: modeForLine(destinationLine),
        service: lineServiceLabel(destinationLine),
        instruction: `Take ${lineServiceLabel(destinationLine)} to ${anchor.station}`,
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
): string[] {
  const warnings: string[] = [];
  const stationLines = station?.lines.map(canonicalLine) ?? [];

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
    warnings.push("Custom destination: route text follows local station metadata.");
  }
  if (neighbourhood.mainStations.length === 1 && stationLines.length <= 1) {
    warnings.push("Limited line choice from the main station.");
  }

  return warnings.slice(0, 3);
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

function canonicalLine(line: string): string {
  const lower = line.toLowerCase();
  if (lower.includes("hammersmith")) return "Hammersmith & City";
  if (lower.includes("national rail") || lower.includes("thameslink") || lower.includes("great northern")) {
    return "National Rail";
  }
  if (lower.includes("elizabeth")) return "Elizabeth";
  if (lower.includes("overground")) return "Overground";
  if (lower.includes("dlr")) return "DLR";
  if (lower.includes("tram")) return "Tramlink";
  return line;
}

function bestOriginLine(lines: string[]): string {
  return (
    lines.find((line) => line !== "National Rail") ??
    lines[0] ??
    "public transport"
  );
}

function bestDestinationLine(destinationLines: string[], originLine: string): string {
  if (destinationLines.includes(originLine)) return originLine;
  return (
    destinationLines.find((line) => line !== "National Rail") ??
    destinationLines[0] ??
    "public transport"
  );
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

function interchangeFor(
  originLine: string,
  destinationLine: string,
  destinationId: string,
): string {
  const key = `${originLine}|${destinationLine}`;
  const direct: Record<string, string> = {
    "Bakerloo|Central": "Oxford Circus",
    "Bakerloo|Circle": "Baker Street",
    "Bakerloo|District": "Embankment",
    "Bakerloo|Elizabeth": "Paddington",
    "Bakerloo|Jubilee": "Baker Street",
    "Bakerloo|Northern": "Charing Cross",
    "Bakerloo|Victoria": "Oxford Circus",
    "Central|Bakerloo": "Oxford Circus",
    "Central|Circle": "Liverpool Street",
    "Central|District": "Notting Hill Gate",
    "Central|Elizabeth": "Tottenham Court Road",
    "Central|Jubilee": "Bond Street",
    "Central|Northern": "Bank",
    "Central|Victoria": "Oxford Circus",
    "Circle|Bakerloo": "Baker Street",
    "Circle|Central": "Liverpool Street",
    "Circle|District": "Victoria",
    "Circle|Elizabeth": "Paddington",
    "Circle|Jubilee": "Westminster",
    "Circle|Northern": "Moorgate",
    "Circle|Victoria": "Victoria",
    "District|Bakerloo": "Embankment",
    "District|Central": "Notting Hill Gate",
    "District|Circle": "Victoria",
    "District|Elizabeth": "Whitechapel",
    "District|Jubilee": "Westminster",
    "District|Northern": "Embankment",
    "District|Victoria": "Victoria",
    "Elizabeth|Bakerloo": "Paddington",
    "Elizabeth|Central": "Tottenham Court Road",
    "Elizabeth|Circle": "Paddington",
    "Elizabeth|District": "Whitechapel",
    "Elizabeth|DLR": "Canary Wharf",
    "Elizabeth|Jubilee": "Bond Street",
    "Elizabeth|Northern": "Tottenham Court Road",
    "Elizabeth|Victoria": "Tottenham Court Road",
    "Hammersmith & City|Bakerloo": "Baker Street",
    "Hammersmith & City|Central": "Liverpool Street",
    "Hammersmith & City|Circle": "Baker Street",
    "Hammersmith & City|District": "Aldgate East",
    "Hammersmith & City|Elizabeth": "Whitechapel",
    "Hammersmith & City|Jubilee": "Baker Street",
    "Hammersmith & City|Metropolitan": "Baker Street",
    "Hammersmith & City|Northern": "Moorgate",
    "Jubilee|Bakerloo": "Baker Street",
    "Jubilee|Central": "Bond Street",
    "Jubilee|District": "Westminster",
    "Jubilee|DLR": "Canary Wharf",
    "Jubilee|Elizabeth": "Bond Street",
    "Jubilee|Northern": "London Bridge",
    "Jubilee|Piccadilly": "Green Park",
    "Jubilee|Victoria": "Green Park",
    "Metropolitan|Bakerloo": "Baker Street",
    "Metropolitan|Central": "Liverpool Street",
    "Metropolitan|Circle": "Baker Street",
    "Metropolitan|Elizabeth": "Liverpool Street",
    "Metropolitan|Jubilee": "Baker Street",
    "Metropolitan|Northern": "Moorgate",
    "Northern|Bakerloo": "Charing Cross",
    "Northern|Central": "Bank",
    "Northern|Circle": "Moorgate",
    "Northern|District": "Embankment",
    "Northern|Elizabeth": "Tottenham Court Road",
    "Northern|Jubilee": "London Bridge",
    "Northern|Piccadilly": "Leicester Square",
    "Northern|Victoria": "Euston",
    "Overground|Central": "Stratford",
    "Overground|District": "Whitechapel",
    "Overground|Elizabeth": "Whitechapel",
    "Overground|Jubilee": "Canada Water",
    "Overground|Northern": "Highbury & Islington",
    "Overground|Victoria": "Highbury & Islington",
    "Piccadilly|Central": "Holborn",
    "Piccadilly|District": "Earl's Court",
    "Piccadilly|Elizabeth": "Farringdon",
    "Piccadilly|Jubilee": "Green Park",
    "Piccadilly|Northern": "Leicester Square",
    "Piccadilly|Victoria": "King's Cross St Pancras",
    "Victoria|Bakerloo": "Oxford Circus",
    "Victoria|Central": "Oxford Circus",
    "Victoria|Circle": "Victoria",
    "Victoria|District": "Victoria",
    "Victoria|Elizabeth": "Tottenham Court Road",
    "Victoria|Jubilee": "Green Park",
    "Victoria|Northern": "Euston",
    "Waterloo & City|Jubilee": "Waterloo",
    "Waterloo & City|Northern": "Waterloo",
  };

  if (direct[key]) return direct[key];
  if (originLine === "National Rail") return nationalRailInterchange(destinationId, destinationLine);
  if (destinationLine === "National Rail") return railTerminalForOrigin(originLine);
  return anchorFallbackInterchange(destinationId, destinationLine);
}

function nationalRailInterchange(destinationId: string, destinationLine: string): string {
  if (destinationId === "london-bridge" || destinationLine === "Jubilee") return "London Bridge";
  if (destinationId === "victoria" || destinationLine === "Victoria") return "Victoria";
  if (destinationId === "waterloo" || destinationLine === "Bakerloo") return "Waterloo";
  if (destinationId === "liverpool-st" || destinationLine === "Central") return "Liverpool Street";
  if (destinationId === "paddington" || destinationLine === "Elizabeth") return "Paddington";
  return "London Bridge";
}

function railTerminalForOrigin(originLine: string): string {
  if (originLine === "Bakerloo") return "Marylebone";
  if (originLine === "Central" || originLine === "Elizabeth") return "Liverpool Street";
  if (originLine === "Jubilee" || originLine === "Northern") return "London Bridge";
  if (originLine === "Victoria" || originLine === "District") return "Victoria";
  return "London Bridge";
}

function anchorFallbackInterchange(destinationId: string, destinationLine: string): string {
  if (destinationLine === "Elizabeth") return "Tottenham Court Road";
  if (destinationLine === "Jubilee") return "London Bridge";
  if (destinationLine === "Northern") return "Bank";
  if (destinationLine === "Central") return "Oxford Circus";
  if (destinationLine === "Victoria") return "Green Park";
  return DESTINATION_ROUTE_ANCHORS[destinationId]?.station ?? "King's Cross St Pancras";
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
