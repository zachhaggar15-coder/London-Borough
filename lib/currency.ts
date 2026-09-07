/**
 * Currency, for the cities that do not price in pounds.
 *
 * The site was built £-only and every rent figure in it was a pound. That
 * is wrong for Geneva, Paris and Barcelona in a way that matters: nobody
 * will ever be quoted a Geneva flat in sterling, and a reader who budgets
 * against a converted figure will be wrong by whatever the rate has done
 * since.
 *
 * So the rule across the site is: **store and display the local currency**,
 * and show a sterling equivalent beside it because the audience for those
 * three sections is British and thinks in pounds. The sterling figure is
 * explicitly an approximation with a review date attached — it is not a
 * live rate and no page pretends otherwise.
 */

export type CurrencyCode = "GBP" | "CHF" | "EUR";

export type Currency = {
  code: CurrencyCode;
  symbol: string;
  /**
   * Units of this currency per pound sterling, for the approximate
   * sterling equivalent shown alongside local figures.
   *
   * Deliberately a stored constant with a review date rather than a live
   * rate. A live rate would make every static page non-deterministic, and
   * the precision would be false anyway: the figures it converts are
   * rounded market estimates, so a third decimal place on the rate buys
   * nothing.
   */
  perGbp: number;
  /** When perGbp was last reviewed. Printed wherever a conversion shows. */
  rateAsOf: string;
};

export const GBP: Currency = {
  code: "GBP",
  symbol: "£",
  perGbp: 1,
  rateAsOf: "2026-09-07",
};

export const CHF: Currency = {
  code: "CHF",
  symbol: "CHF ",
  perGbp: 1.07,
  rateAsOf: "2026-09-07",
};

export const EUR: Currency = {
  code: "EUR",
  symbol: "€",
  perGbp: 1.16,
  rateAsOf: "2026-09-07",
};

/** "£1,250", "CHF 1,850", "€1,100" — no decimals, thousands separated. */
export function money(value: number, currency: Currency = GBP): string {
  return `${currency.symbol}${Math.round(value).toLocaleString("en-GB")}`;
}

/**
 * The approximate sterling equivalent of a local figure, rounded hard.
 *
 * Rounded to the nearest £25 rather than the nearest pound, because
 * pretending a CHF 1,850 rent is "£1,729" implies a precision that
 * neither the rent estimate nor the stored rate supports.
 */
export function approxGbp(value: number, currency: Currency): string | null {
  if (currency.code === "GBP") return null;
  const pounds = value / currency.perGbp;
  return `£${(Math.round(pounds / 25) * 25).toLocaleString("en-GB")}`;
}

/** "CHF 1,850 (about £1,725)" for prose; the bare figure for sterling. */
export function moneyWithGbp(value: number, currency: Currency): string {
  const local = money(value, currency);
  const sterling = approxGbp(value, currency);
  return sterling ? `${local} (about ${sterling})` : local;
}
