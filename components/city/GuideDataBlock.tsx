import Link from "next/link";
import { money } from "@/lib/currency";
import type { CityContent, CityGuideSection } from "@/lib/city-content";
import {
  LocalCostsTable,
  ScrollTable,
  TableHead,
} from "@/components/city/Pieces";

/**
 * Live tables rendered inside a guide's prose.
 *
 * The point of these is that a guide's figures should never drift from
 * the rest of the site. Everything below reads the same datasets the
 * neighbourhood and council pages read, so a rent revision updates the
 * guide in the same deploy rather than leaving a stale number embedded
 * in a paragraph nobody thinks to re-read.
 */

type Block = NonNullable<CityGuideSection["dataBlock"]>;

function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="mt-6">{children}</div>;
}

export default function GuideDataBlock({
  block,
  content,
}: {
  block: Block;
  content: CityContent;
}) {
  const { input } = content;
  const currency = input.currency;

  if (block === "council-tax") {
    // A city with no occupier property tax shows what its households
    // actually pay instead; see LocalCostsTable.
    if (!content.councilTax) {
      return content.localCosts ? (
        <Wrapper>
          <LocalCostsTable content={content} />
        </Wrapper>
      ) : null;
    }
    const councilTax = content.councilTax;
    const rows = content.councilsByBandD;
    const heading =
      input.councilNoun.singular.charAt(0).toUpperCase() +
      input.councilNoun.singular.slice(1);
    return (
      <Wrapper>
        <ScrollTable minWidth="30rem">
          <TableHead cells={[heading, "Band D per year", "Per month"]} />
          <tbody>
            {rows.map((council) => {
              const bandD = councilTax.bandD[council];
              return (
                <tr key={council} className="border-b border-slate-900">
                  <td className="py-2.5 pr-4">
                    <Link
                      href={content.councilPath(council)}
                      className="transition-colors hover:text-emerald-400"
                    >
                      {council}
                    </Link>
                  </td>
                  <td className="py-2.5 pr-4 tabular-nums text-slate-200">
                    {money(bandD, currency)}
                  </td>
                  <td className="py-2.5 pr-4 tabular-nums text-slate-400">
                    {money(bandD / 12, currency)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </ScrollTable>
      </Wrapper>
    );
  }

  if (block === "rent-spread") {
    const sorted = [...content.areas].sort(
      (a, b) => a.rent.oneBedMedianGbp - b.rent.oneBedMedianGbp,
    );
    // Five points across the distribution rather than the whole list: the
    // guide is making a point about spread, and the full table already
    // exists at /rent-index.
    const picks = [0, 0.25, 0.5, 0.75, 1].map(
      (q) => sorted[Math.round(q * (sorted.length - 1))],
    );
    return (
      <Wrapper>
        <ScrollTable minWidth="30rem">
          <TableHead cells={["Area", "1-bed", "2-bed", "Room"]} />
          <tbody>
            {picks.map((n) => (
              <tr key={n.id} className="border-b border-slate-900">
                <td className="py-2.5 pr-4">
                  <Link
                    href={content.path(`/neighbourhoods/${n.id}`)}
                    className="transition-colors hover:text-emerald-400"
                  >
                    {n.name}
                  </Link>
                </td>
                <td className="py-2.5 pr-4 tabular-nums text-slate-200">
                  {money(n.rent.oneBedMedianGbp, currency)}
                </td>
                <td className="py-2.5 pr-4 tabular-nums text-slate-300">
                  {money(n.rent.twoBedMedianGbp, currency)}
                </td>
                <td className="py-2.5 pr-4 tabular-nums text-slate-400">
                  {money(content.roomRentFor(n), currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </ScrollTable>
      </Wrapper>
    );
  }

  // salary-ladder — the city's own ladder and its own tax regime, so a
  // Scottish page never quotes a rest-of-UK take-home.
  return (
    <Wrapper>
      <ScrollTable minWidth="32rem">
        <TableHead
          cells={["Salary", "Take-home / month", "Rent at 35%", "Rent at 40%"]}
        />
        <tbody>
          {input.salaryLevels.map((salary) => {
            const monthly = input.takeHomeMonthly(salary);
            return (
              <tr key={salary} className="border-b border-slate-900">
                <td className="py-2.5 pr-4 tabular-nums font-medium">
                  {money(salary, currency)}
                </td>
                <td className="py-2.5 pr-4 tabular-nums text-slate-300">
                  {money(monthly, currency)}
                </td>
                <td className="py-2.5 pr-4 tabular-nums text-slate-200">
                  {money(monthly * 0.35, currency)}
                </td>
                <td className="py-2.5 pr-4 tabular-nums text-slate-400">
                  {money(monthly * 0.4, currency)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </ScrollTable>
    </Wrapper>
  );
}
