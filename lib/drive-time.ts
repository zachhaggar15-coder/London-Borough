import { haversineKm } from "@/lib/city-content";
import type { Destination, Neighbourhood } from "@/lib/types";

/**
 * Peak-hour driving times.
 *
 * Every region on this site outside London has journeys the car simply
 * wins — the orbital ones, where the rail network was built to bring
 * people into a centre and never to move them around an edge. The
 * commute pages have been asserting that in prose for two cities; this
 * module lets them show it.
 *
 * ## Why this is modelled and the transit times are not
 *
 * The transit matrices are hand-reviewed cell by cell because public
 * transport is lumpy: a station either exists or it does not, a line
 * either runs direct or it does not, and no formula recovers that.
 * Driving is the opposite. Road networks are dense and continuous, so a
 * journey time is genuinely close to a function of distance, road class
 * and how bad the last mile is — which is exactly what this models.
 *
 * Hand-writing two thousand car journeys would have produced numbers
 * that *looked* reviewed without being checkable against anything. A
 * stated model with stated parameters is both more honest and easier to
 * argue with, and every page that shows a driving time labels it as a
 * modelled estimate rather than a reviewed one.
 *
 * ## What it accounts for
 *
 * - **Circuity.** Roads are not straight. The multiplier from
 *   straight-line to road distance is typically 1.25–1.4 and is higher
 *   where a river, an estuary or a mountain forces a detour.
 * - **Road class.** A motorway corridor and a cross-town crawl are not
 *   the same journey per kilometre, so corridors can override the
 *   regional average speed.
 * - **The last mile.** Getting into a city centre at 08:30 and parking
 *   costs far more than the driving distance implies. Every destination
 *   carries its own arrival penalty, and for a city centre it is the
 *   single largest term in a short journey.
 */

export type DriveCorridor = {
  /** Applies when the journey runs broadly along this corridor. */
  destinationIds: string[];
  /** Average door-to-door speed in km/h along it, before the penalty. */
  kmh: number;
};

export type DriveModelConfig = {
  /** Road distance ÷ straight-line distance. Typically 1.25–1.4. */
  circuity: number;
  /** Average peak driving speed in km/h across the region. */
  peakKmh: number;
  /**
   * Minutes added on arrival at each destination: the last mile through
   * traffic, plus finding and paying for a space. Keyed by destination
   * id; `default` covers the rest.
   */
  arrivalPenaltyMinutes: Record<string, number> & { default: number };
  /** Corridors that behave unlike the regional average. */
  corridors?: DriveCorridor[];
  /**
   * Destinations where driving is not a sensible option at all and the
   * pages should say so rather than print a number — a congestion or
   * clean-air charge zone, or somewhere with no parking to speak of.
   */
  notDriveable?: string[];
};

export function createDriveModel(
  areas: Neighbourhood[],
  destinations: Destination[],
  config: DriveModelConfig,
) {
  const areaById = new Map(areas.map((a) => [a.id, a]));
  const destinationById = new Map(destinations.map((d) => [d.id, d]));
  const notDriveable = new Set(config.notDriveable ?? []);

  return function driveMinutes(
    areaId: string,
    destinationId: string,
  ): number | null {
    if (notDriveable.has(destinationId)) return null;
    const area = areaById.get(areaId);
    const destination = destinationById.get(destinationId);
    if (!area || !destination) return null;

    const straightKm = haversineKm(area.centroid, destination.centroid);
    const roadKm = straightKm * config.circuity;

    const corridor = config.corridors?.find((c) =>
      c.destinationIds.includes(destinationId),
    );
    const kmh = corridor?.kmh ?? config.peakKmh;

    const penalty =
      config.arrivalPenaltyMinutes[destinationId] ??
      config.arrivalPenaltyMinutes.default;

    const minutes = (roadKm / kmh) * 60 + penalty;

    // A five-minute floor, and rounded to five: the model does not
    // support finer resolution than the transit estimates it sits beside.
    return Math.max(5, Math.round(minutes / 5) * 5);
  };
}
