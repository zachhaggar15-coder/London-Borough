import Link from "next/link";
import type { CityContent, CityGuideSection } from "@/lib/city-content";
import { ScrollTable, TableHead } from "@/components/city/Pieces";

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

  if (block === "council-tax") {
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
              const bandD = input.councilTax.bandD[council];
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
                    £{bandD.toLocaleString()}
                  </td>
                  <td className="py-2.5 pr-4 tabular-nums text-slate-400">
                    £{Math.round(bandD / 12).toLocaleString()}
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
                  £{n.rent.oneBedMedianGbp.toLocaleString()}
                </td>
                <td className="py-2.5 pr-4 tabular-nums text-slate-300">
                  £{n.rent.twoBedMedianGbp.toLocaleString()}
                </td>
                <td className="py-2.5 pr-4 tabular-nums text-slate-400">
                  £{content.roomRentFor(n).toLocaleString()}
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
                  £{salary.toLocaleString()}
                </td>
                <td className="py-2.5 pr-4 tabular-nums text-slate-300">
                  £{Math.round(monthly).toLocaleString()}
                </td>
                <td className="py-2.5 pr-4 tabular-nums text-slate-200">
                  £{Math.round(monthly * 0.35).toLocaleString()}
                </td>
                <td className="py-2.5 pr-4 tabular-nums text-slate-400">
                  £{Math.round(monthly * 0.4).toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </ScrollTable>
    </Wrapper>
  );
}
