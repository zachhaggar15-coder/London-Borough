/**
 * Take-home pay, by tax regime.
 *
 * Income tax is devolved to Scotland and National Insurance is not, so a
 * Scottish salary page and an English one cannot share a model. The
 * difference is not cosmetic: on £60,000 a Scottish taxpayer pays over
 * £1,500 a year more, and the salary pages would be wrong for Edinburgh
 * if they used the England and Wales bands.
 *
 * Both models exclude pension contributions, student loan repayments and
 * salary sacrifice, all of which reduce take-home further. Every page
 * that uses them says so.
 */

/** Reserved UK-wide, so identical in both regimes. */
const PERSONAL_ALLOWANCE = 12_570;
const TAPER_START = 100_000;
const NI_UPPER_EARNINGS = 50_270;

/** Class 1 employee National Insurance: 8% to the UEL, 2% above. */
function nationalInsurance(gross: number): number {
  const lower = Math.min(Math.max(0, gross - PERSONAL_ALLOWANCE), NI_UPPER_EARNINGS - PERSONAL_ALLOWANCE);
  const upper = Math.max(0, gross - NI_UPPER_EARNINGS);
  return lower * 0.08 + upper * 0.02;
}

/**
 * The personal allowance tapers by £1 for every £2 above £100,000 in both
 * regimes, which is what produces the notorious ~60% effective marginal
 * rate through that band.
 */
function allowanceFor(gross: number): number {
  return gross <= TAPER_START
    ? PERSONAL_ALLOWANCE
    : Math.max(0, PERSONAL_ALLOWANCE - (gross - TAPER_START) / 2);
}

type Band = { upTo: number; rate: number };

/**
 * England, Wales and Northern Ireland, 2026/27. Thresholds are expressed
 * as taxable income above the standard personal allowance, so the taper
 * correctly pushes more income into the higher bands as it bites.
 */
const RUK_BANDS: Band[] = [
  { upTo: 50_270 - PERSONAL_ALLOWANCE, rate: 0.2 },
  { upTo: 125_140 - PERSONAL_ALLOWANCE, rate: 0.4 },
  { upTo: Infinity, rate: 0.45 },
];

/**
 * Scotland, 2026/27 — six bands rather than three.
 *
 * Starter 19% to £16,537, basic 20% to £29,526, intermediate 21% to
 * £43,662, higher 42% to £75,000, advanced 45% to £125,140, top 48%
 * above. Note the higher rate starts at £43,662, well below the £50,270
 * point where NI drops to 2%, which is why the band between them is the
 * most heavily taxed stretch of a Scottish salary.
 */
const SCOTLAND_BANDS: Band[] = [
  { upTo: 16_537 - PERSONAL_ALLOWANCE, rate: 0.19 },
  { upTo: 29_526 - PERSONAL_ALLOWANCE, rate: 0.2 },
  { upTo: 43_662 - PERSONAL_ALLOWANCE, rate: 0.21 },
  { upTo: 75_000 - PERSONAL_ALLOWANCE, rate: 0.42 },
  { upTo: 125_140 - PERSONAL_ALLOWANCE, rate: 0.45 },
  { upTo: Infinity, rate: 0.48 },
];

function incomeTax(gross: number, bands: Band[]): number {
  const taxable = Math.max(0, gross - allowanceFor(gross));
  let tax = 0;
  let previous = 0;
  for (const band of bands) {
    const inBand = Math.min(Math.max(taxable - previous, 0), band.upTo - previous);
    tax += inBand * band.rate;
    previous = band.upTo;
    if (taxable <= previous) break;
  }
  return tax;
}

export function rukTakeHomeMonthly(grossAnnual: number): number {
  const gross = Math.max(0, grossAnnual);
  return Math.round((gross - incomeTax(gross, RUK_BANDS) - nationalInsurance(gross)) / 12);
}

export function scotlandTakeHomeMonthly(grossAnnual: number): number {
  const gross = Math.max(0, grossAnnual);
  return Math.round((gross - incomeTax(gross, SCOTLAND_BANDS) - nationalInsurance(gross)) / 12);
}

/**
 * Written as full sentences because the pages print them directly into a
 * data note. Each names the regime rather than saying "income tax", so a
 * reader on the Edinburgh pages is never left assuming the UK-wide bands.
 */
export const TAX_REGIME_LABELS = {
  ruk: "Take-home is modelled on England and Wales income tax and Class 1 employee National Insurance for 2026/27, including the personal allowance taper above £100,000.",
  scotland:
    "Take-home is modelled on Scottish income tax — six bands rather than three, with the higher rate starting at £43,662 — and Class 1 employee National Insurance, which is reserved and therefore identical across the UK. It includes the personal allowance taper above £100,000.",
} as const;

// ──────────────────────────────────────────────────────────────────
// Non-UK regimes
// ──────────────────────────────────────────────────────────────────

/**
 * Take-home for the three international sections.
 *
 * These are modelled differently from the UK ones and it matters that a
 * reader knows which they are looking at. The UK functions above compute
 * tax from statutory bands, because the UK system is simple enough that
 * a band model *is* the system. None of the other three is.
 *
 * Switzerland levies income tax at three levels — federal, cantonal and
 * communal — and the communal multiplier alone varies by roughly a
 * factor of two across Geneva's 45 communes. France applies a
 * household quotient that changes the answer entirely depending on who
 * else lives with you. Spain splits the schedule between the state and
 * the autonomous community, and Catalonia sets its own.
 *
 * Modelling all of that properly would take a tax engine and would still
 * be wrong for most readers, because the deductions matter more than the
 * bands. So these are **effective-rate curves for a single person with
 * no dependants**, interpolated between reviewed points, covering income
 * tax and compulsory employee social contributions together. They are
 * accurate enough to answer "roughly what will I clear, and can I afford
 * that flat" and nowhere near accurate enough to file with. Every page
 * that uses them says exactly that.
 */
type RatePoint = { gross: number; effective: number };

/** Linear interpolation between reviewed points, flat beyond the ends. */
function effectiveRate(gross: number, curve: RatePoint[]): number {
  if (gross <= curve[0].gross) return curve[0].effective;
  const last = curve[curve.length - 1];
  if (gross >= last.gross) return last.effective;
  for (let i = 1; i < curve.length; i += 1) {
    const a = curve[i - 1];
    const b = curve[i];
    if (gross <= b.gross) {
      const t = (gross - a.gross) / (b.gross - a.gross);
      return a.effective + t * (b.effective - a.effective);
    }
  }
  return last.effective;
}

/**
 * Geneva, in Swiss francs. Combined federal, cantonal and communal
 * income tax at the Ville de Genève multiplier, plus AVS/AI/APG (5.3%),
 * unemployment insurance (1.1%) and an assumed occupational pension
 * (LPP) contribution of about 7%, which is compulsory above a low
 * threshold and rises with age.
 *
 * Excludes health insurance entirely — it is not a payroll deduction in
 * Switzerland, it is a private bill, and it is large. The Geneva pages
 * carry it in the local-costs table instead, which is where a British
 * reader expecting it to come out of payroll will actually find it.
 */
const GENEVA_CURVE: RatePoint[] = [
  { gross: 40_000, effective: 0.175 },
  { gross: 60_000, effective: 0.205 },
  { gross: 80_000, effective: 0.235 },
  { gross: 100_000, effective: 0.262 },
  { gross: 130_000, effective: 0.297 },
  { gross: 180_000, effective: 0.337 },
  { gross: 250_000, effective: 0.375 },
];

export function genevaTakeHomeMonthly(grossAnnual: number): number {
  const gross = Math.max(0, grossAnnual);
  return Math.round((gross * (1 - effectiveRate(gross, GENEVA_CURVE))) / 12);
}

/**
 * France, in euros. Income tax on the barème after the 10% professional
 * allowance, plus employee social contributions (health, pension,
 * unemployment, CSG and CRDS), which together take roughly 22% of gross
 * before income tax is applied at all.
 *
 * Assumes one part fiscale — a single person with no children. The
 * quotient familial makes a household of two adults and two children pay
 * dramatically less on the same gross, which is the single biggest
 * reason a French payslip surprises a British reader in both directions.
 */
const PARIS_CURVE: RatePoint[] = [
  { gross: 25_000, effective: 0.235 },
  { gross: 35_000, effective: 0.262 },
  { gross: 45_000, effective: 0.29 },
  { gross: 60_000, effective: 0.325 },
  { gross: 80_000, effective: 0.362 },
  { gross: 120_000, effective: 0.414 },
  { gross: 200_000, effective: 0.463 },
];

export function franceTakeHomeMonthly(grossAnnual: number): number {
  const gross = Math.max(0, grossAnnual);
  return Math.round((gross * (1 - effectiveRate(gross, PARIS_CURVE))) / 12);
}

/**
 * Catalonia, in euros. IRPF on the combined state and Catalan schedules
 * — Catalonia sets its own rates and they are among the higher ones in
 * Spain — plus employee social security at 6.35% up to the contribution
 * ceiling, above which the marginal social cost falls away sharply.
 *
 * Assumes a single person under 65 with no dependants and no regional
 * deductions claimed.
 */
const BARCELONA_CURVE: RatePoint[] = [
  { gross: 20_000, effective: 0.175 },
  { gross: 30_000, effective: 0.222 },
  { gross: 40_000, effective: 0.258 },
  { gross: 55_000, effective: 0.298 },
  { gross: 75_000, effective: 0.337 },
  { gross: 110_000, effective: 0.385 },
  { gross: 180_000, effective: 0.435 },
];

export function cataloniaTakeHomeMonthly(grossAnnual: number): number {
  const gross = Math.max(0, grossAnnual);
  return Math.round((gross * (1 - effectiveRate(gross, BARCELONA_CURVE))) / 12);
}

export const INTERNATIONAL_TAX_LABELS = {
  geneva:
    "Take-home is modelled on combined federal, cantonal and communal income tax at Geneva rates, plus AVS/AI/APG, unemployment insurance and an assumed LPP pension contribution. It is an effective-rate estimate for a single person with no dependants, not a payroll calculation. It deliberately excludes health insurance, which in Switzerland is a private monthly bill rather than a payroll deduction — see the local costs table, because it is the largest single thing a British reader will not have budgeted for.",
  paris:
    "Take-home is modelled on French income tax after the 10% professional allowance plus employee social contributions including CSG and CRDS, as an effective-rate estimate for a single person with one part fiscale. A household with children pays substantially less on the same gross under the quotient familial, so treat this as the single-person floor rather than a household figure.",
  barcelona:
    "Take-home is modelled on combined state and Catalan IRPF plus employee social security, as an effective-rate estimate for a single person with no dependants and no regional deductions claimed. Catalonia sets its own half of the income tax schedule and it is among the higher ones in Spain, so a figure quoted for Madrid will not apply here.",
} as const;
