import { NEIGHBOURHOODS } from "@/lib/data/neighbourhoods";
import {
  KM_PER_DEG_LAT,
  LONDON_CENTRE,
  kmPerDegLngAtLat,
} from "@/lib/geo";
import type { Neighbourhood } from "@/lib/types";

/**
 * Launch neighbourhood footprints.
 *
 * London neighbourhood names are vernacular rather than official boundary
 * units. Until we add high-resolution source geometry, these display polygons
 * use a deterministic approximation:
 *   1. build a local walk-shed around the curated centre,
 *   2. orient it along the strongest tube/rail corridor,
 *   3. clip it against nearby neighbourhoods so adjacent areas form shared
 *      edges instead of overlapping bubbles.
 */

type ProjectedPoint = { x: number; y: number };

type FootprintSeed = {
  neighbourhood: Neighbourhood;
  center: ProjectedPoint;
  radiusXKm: number;
  radiusYKm: number;
  rotation: number;
  weight: number;
};

type CorridorFamily = {
  pattern: RegExp;
  rotation: number | "radial";
  stretch: number;
};

const CORRIDOR_FAMILIES: CorridorFamily[] = [
  {
    pattern: /victoria|northern|piccadilly|bakerloo/i,
    rotation: -0.72,
    stretch: 0.12,
  },
  {
    pattern: /central|district|elizabeth|metropolitan/i,
    rotation: 0.08,
    stretch: 0.14,
  },
  {
    pattern: /jubilee/i,
    rotation: 0.52,
    stretch: 0.1,
  },
  {
    pattern: /overground|dlr|national rail|thameslink|tramlink/i,
    rotation: "radial",
    stretch: 0.1,
  },
];

let cache: Map<string, GeoJSON.Polygon> | null = null;

const KM_PER_DEG_LNG = kmPerDegLngAtLat(LONDON_CENTRE.lat);
const MIN_USABLE_AREA_KM2 = 0.18;

function buildFootprints(): Map<string, GeoJSON.Polygon> {
  const seeds = NEIGHBOURHOODS.map(seedFor);
  const out = new Map<string, GeoJSON.Polygon>();

  for (const seed of seeds) {
    out.set(seed.neighbourhood.id, footprintFor(seed, seeds));
  }

  return out;
}

function seedFor(neighbourhood: Neighbourhood): FootprintSeed {
  const zone = primaryTransportZone(neighbourhood);
  const lineCount = new Set(
    neighbourhood.mainStations.flatMap((station) => station.lines),
  ).size;
  const [baseX, baseY] = baseRadiiForZone(zone);
  const connectivityStretch = Math.min(0.42, Math.max(0, lineCount - 1) * 0.06);
  const corridor = dominantCorridor(neighbourhood);
  const corridorStretch = corridor?.stretch ?? 0.04;
  const rotation = rotationFor(neighbourhood, corridor);

  return {
    neighbourhood,
    center: project(neighbourhood.centroid.lng, neighbourhood.centroid.lat),
    radiusXKm: baseX * (1.08 + connectivityStretch + corridorStretch),
    radiusYKm: baseY * (1 - Math.min(0.18, connectivityStretch * 0.45)),
    rotation,
    weight: ((baseX + baseY) / 2) ** 2,
  };
}

function primaryTransportZone(neighbourhood: Neighbourhood): number {
  const zones = neighbourhood.transportZones.filter(Number.isFinite);
  return zones.length ? Math.min(...zones) : 3;
}

function baseRadiiForZone(zone: number): [number, number] {
  if (zone <= 1) return [0.72, 0.5];
  if (zone === 2) return [0.96, 0.72];
  if (zone === 3) return [1.14, 0.86];
  if (zone <= 5) return [1.36, 1.02];
  return [1.55, 1.16];
}

function footprintFor(
  seed: FootprintSeed,
  allSeeds: FootprintSeed[],
): GeoJSON.Polygon {
  const initial = organicWalkshed(seed);
  const clipped = clipAgainstNeighbours(seed, initial, allSeeds);
  const polygon =
    polygonAreaKm2(clipped) >= MIN_USABLE_AREA_KM2 ? clipped : initial;
  const ring = polygon.map((point) => {
    const coord = unproject(point);
    return [roundCoord(coord.lng), roundCoord(coord.lat)];
  });

  ring.push(ring[0]);

  return {
    type: "Polygon",
    coordinates: [ring],
  };
}

function organicWalkshed(seed: FootprintSeed): ProjectedPoint[] {
  const points: ProjectedPoint[] = [];
  const idSeed = hash01(seed.neighbourhood.id);
  const pointCount = 20;
  const cos = Math.cos(seed.rotation);
  const sin = Math.sin(seed.rotation);

  for (let i = 0; i < pointCount; i++) {
    const angle = (Math.PI * 2 * i) / pointCount;
    const wobble =
      1 +
      0.13 * Math.sin(angle * 3 + idSeed * Math.PI * 2) +
      0.08 * Math.cos(angle * 5 + idSeed * Math.PI * 4);
    const pinch = 1 - 0.08 * Math.sin(angle * 2 + idSeed * Math.PI);
    const x = Math.cos(angle) * seed.radiusXKm * wobble;
    const y = Math.sin(angle) * seed.radiusYKm * wobble * pinch;
    const xr = x * cos - y * sin;
    const yr = x * sin + y * cos;

    points.push({
      x: seed.center.x + xr,
      y: seed.center.y + yr,
    });
  }

  return points;
}

function clipAgainstNeighbours(
  seed: FootprintSeed,
  polygon: ProjectedPoint[],
  allSeeds: FootprintSeed[],
): ProjectedPoint[] {
  let clipped = polygon;
  const ownInfluence = influenceRadius(seed);

  const neighbours = allSeeds
    .filter((other) => other.neighbourhood.id !== seed.neighbourhood.id)
    .map((other) => ({
      seed: other,
      distance: distance(seed.center, other.center),
    }))
    .filter(({ seed: other, distance: d }) => {
      return d < ownInfluence + influenceRadius(other) + 0.45;
    })
    .sort((a, b) => a.distance - b.distance);

  for (const { seed: other } of neighbours) {
    clipped = clipToPowerBisector(seed, other, clipped);
    if (clipped.length < 3 || polygonAreaKm2(clipped) < MIN_USABLE_AREA_KM2) {
      return polygon;
    }
  }

  return clipped;
}

function clipToPowerBisector(
  own: FootprintSeed,
  other: FootprintSeed,
  polygon: ProjectedPoint[],
): ProjectedPoint[] {
  const dx = other.center.x - own.center.x;
  const dy = other.center.y - own.center.y;
  const distanceSq = dx * dx + dy * dy;
  if (distanceSq < 0.0001) return polygon;

  const a = 2 * dx;
  const b = 2 * dy;
  const c =
    other.center.x * other.center.x +
    other.center.y * other.center.y -
    own.center.x * own.center.x -
    own.center.y * own.center.y +
    own.weight * 0.22 -
    other.weight * 0.22;

  return clipPolygonByHalfPlane(polygon, a, b, c);
}

function clipPolygonByHalfPlane(
  polygon: ProjectedPoint[],
  a: number,
  b: number,
  c: number,
): ProjectedPoint[] {
  const result: ProjectedPoint[] = [];

  for (let i = 0; i < polygon.length; i++) {
    const current = polygon[i];
    const previous = polygon[(i + polygon.length - 1) % polygon.length];
    const currentInside = isInside(current, a, b, c);
    const previousInside = isInside(previous, a, b, c);

    if (currentInside !== previousInside) {
      const intersection = intersectSegmentWithLine(previous, current, a, b, c);
      if (intersection) result.push(intersection);
    }

    if (currentInside) result.push(current);
  }

  return removeNearDuplicatePoints(result);
}

function isInside(point: ProjectedPoint, a: number, b: number, c: number) {
  return a * point.x + b * point.y <= c + 0.000001;
}

function intersectSegmentWithLine(
  start: ProjectedPoint,
  end: ProjectedPoint,
  a: number,
  b: number,
  c: number,
): ProjectedPoint | null {
  const startValue = a * start.x + b * start.y;
  const endValue = a * end.x + b * end.y;
  const denominator = endValue - startValue;
  if (Math.abs(denominator) < 0.000001) return null;

  const t = (c - startValue) / denominator;
  return {
    x: start.x + (end.x - start.x) * t,
    y: start.y + (end.y - start.y) * t,
  };
}

function removeNearDuplicatePoints(points: ProjectedPoint[]) {
  return points.filter((point, index) => {
    const previous = points[(index + points.length - 1) % points.length];
    return distance(point, previous) > 0.025;
  });
}

function influenceRadius(seed: FootprintSeed) {
  return Math.max(seed.radiusXKm, seed.radiusYKm);
}

function rotationFor(
  neighbourhood: Neighbourhood,
  corridor: CorridorFamily | null,
): number {
  if (corridor) {
    if (corridor.rotation !== "radial") return corridor.rotation;
    const fromCentre = Math.atan2(
      neighbourhood.centroid.lat - LONDON_CENTRE.lat,
      neighbourhood.centroid.lng - LONDON_CENTRE.lng,
    );
    return fromCentre + 0.22;
  }
  return (hash01(neighbourhood.id) - 0.5) * 1.2;
}

function dominantCorridor(neighbourhood: Neighbourhood): CorridorFamily | null {
  let best:
    | {
        family: CorridorFamily;
        count: number;
        firstStation: number;
        firstLine: number;
      }
    | null = null;

  for (const family of CORRIDOR_FAMILIES) {
    let count = 0;
    let firstStation = Number.POSITIVE_INFINITY;
    let firstLine = Number.POSITIVE_INFINITY;

    neighbourhood.mainStations.forEach((station, stationIndex) => {
      station.lines.forEach((line, lineIndex) => {
        if (!family.pattern.test(line)) return;
        count += 1;
        if (
          stationIndex < firstStation ||
          (stationIndex === firstStation && lineIndex < firstLine)
        ) {
          firstStation = stationIndex;
          firstLine = lineIndex;
        }
      });
    });

    if (count === 0) continue;
    if (
      !best ||
      count > best.count ||
      (count === best.count && firstStation < best.firstStation) ||
      (count === best.count &&
        firstStation === best.firstStation &&
        firstLine < best.firstLine)
    ) {
      best = { family, count, firstStation, firstLine };
    }
  }

  return best?.family ?? null;
}

function project(lng: number, lat: number): ProjectedPoint {
  return {
    x: lng * KM_PER_DEG_LNG,
    y: lat * KM_PER_DEG_LAT,
  };
}

function unproject(point: ProjectedPoint): { lng: number; lat: number } {
  return {
    lng: point.x / KM_PER_DEG_LNG,
    lat: point.y / KM_PER_DEG_LAT,
  };
}

function distance(a: ProjectedPoint, b: ProjectedPoint): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function polygonAreaKm2(points: ProjectedPoint[]): number {
  if (points.length < 3) return 0;
  let area = 0;
  for (let i = 0; i < points.length; i++) {
    const current = points[i];
    const next = points[(i + 1) % points.length];
    area += current.x * next.y - next.x * current.y;
  }
  return Math.abs(area) / 2;
}

function hash01(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) / 4294967295;
}

function roundCoord(value: number): number {
  return Math.round(value * 100000) / 100000;
}

export function polygonForNeighbourhood(id: string): GeoJSON.Polygon | null {
  if (!cache) cache = buildFootprints();
  return cache.get(id) ?? null;
}
