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

export const TAX_REGIME_LABELS = {
  ruk: "England and Wales income tax and Class 1 National Insurance for 2026/27",
  scotland: "Scottish income tax and Class 1 National Insurance for 2026/27",
} as const;
