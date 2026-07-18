/**
 * Affordability helpers.
 *
 * Convert salary → realistic monthly rent budget using a simplified
 * UK take-home calculation, then score a neighbourhood against the
 * budget.
 *
 * Tax brackets here are deliberately simplified — they capture the
 * shape of UK PAYE for 2026/27 but skip pension contributions, student
 * loans, and the personal-allowance taper above £100k. Good enough
 * for guidance, not for filing a tax return.
 */

/** UK income tax + NI estimate for England (2026/27 simplified). */
export function annualTakeHome(grossAnnualGbp: number): number {
  const gross = Math.max(0, grossAnnualGbp);

  // Personal allowance £12,570; tapers above £100k (ignored here for simplicity).
  const personalAllowance = 12_570;
  const basicRateBand = 50_270 - personalAllowance;     // 37,700
  const higherRateBand = 125_140 - 50_270;              // 74,870

  const taxablePersonal = Math.max(0, gross - personalAllowance);
  const inBasic = Math.min(taxablePersonal, basicRateBand);
  const inHigher = Math.min(Math.max(0, taxablePersonal - basicRateBand), higherRateBand);
  const inAdditional = Math.max(0, taxablePersonal - basicRateBand - higherRateBand);
  const incomeTax = inBasic * 0.20 + inHigher * 0.40 + inAdditional * 0.45;

  // National Insurance (Class 1 employee, 2026/27):
  //   12,570 – 50,270 @ 8%
  //   50,270+         @ 2%
  const niLower = Math.min(Math.max(0, gross - 12_570), 50_270 - 12_570);
  const niUpper = Math.max(0, gross - 50_270);
  const ni = niLower * 0.08 + niUpper * 0.02;

  return gross - incomeTax - ni;
}

/**
 * Default monthly rent budget: configurable share of monthly take-home pay.
 * Defaults to 35%, which is a London-realistic starting point.
 */
export function defaultMonthlyRentBudgetGbp(
  grossAnnualGbp: number,
  shareOfTakeHome = 0.35,
): number {
  const monthly = annualTakeHome(grossAnnualGbp) / 12;
  const share = Math.max(0, Math.min(1, shareOfTakeHome));
  return Math.round(monthly * share);
}

/**
 * Score a neighbourhood's rent against a budget.
 * Returns a value in [0, 1] — 1 = comfortably under budget, 0 = double or more.
 *
 * Curve: stays at 1 up to budget, then drops linearly to 0 at 2x budget.
 */
export function affordabilityScore(rentGbp: number, budgetGbp: number): number {
  if (budgetGbp <= 0) return 0;
  const ratio = rentGbp / budgetGbp;
  if (ratio <= 1) return 1;
  if (ratio >= 2) return 0;
  return 1 - (ratio - 1); // 1.0 → 1, 1.5 → 0.5, 2.0 → 0
}

/** Format £ with no decimals. Avoids importing a date/number library. */
export function gbp(value: number): string {
  return `£${Math.round(value).toLocaleString("en-GB")}`;
}
