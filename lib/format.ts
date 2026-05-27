/**
 * Display-only formatting helpers.
 *
 * Important: these are presentational. The underlying numbers (commute
 * times, scores, etc.) stay precise — scoring and comparison logic
 * uses the raw integers. We only round for the eye.
 */

/**
 * Round a commute time to the nearest 5 minutes for display, prefixed
 * with "~" to signal "approximate". Returns "—" for nulls.
 *
 *   12 → "~10 min"
 *   23 → "~25 min"
 *   42 → "~40 min"
 *
 * Why round? Because the underlying number is a rough public-transport
 * estimate. Showing "42 min" implies precision we don't have; "~40 min"
 * is honest.
 */
export function formatApproxMinutes(minutes: number | null | undefined): string {
  if (minutes == null) return "—";
  const rounded = Math.max(5, Math.round(minutes / 5) * 5);
  return `~${rounded} min`;
}
