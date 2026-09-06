import Link from "next/link";
import { GM_BOROUGHS, boroughSlug } from "@/lib/manchester/boroughs";
import { BAND_D_BY_BOROUGH } from "@/lib/manchester/data/council-tax";
import { MANCHESTER_NEIGHBOURHOODS } from "@/lib/manchester/data/neighbourhoods";
import { manchesterPath, manchesterRoomRentFor } from "@/lib/manchester/seo-data";
import { annualTakeHome } from "@/lib/affordability";
import type { ManchesterGuideSection } from "@/lib/manchester/data/guides";

/**
 * Live tables rendered inside a guide's prose.
 *
 * The point of these is that a guide's figures should never drift from
 * the rest of the site. Everything below reads the same datasets the
 * neighbourhood and borough pages read, so a rent revision updates the
 * guide in the same deploy rather than leaving a stale number embedded
 * in a paragraph nobody thinks to re-read.
 */

type Block = NonNullable<ManchesterGuideSection["dataBlock"]>;

const SALARY_LEVELS = [25_000, 30_000, 35_000, 45_000, 55_000, 70_000];

function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="-mx-6 mt-6 overflow-x-auto px-6">{children}</div>;
}

function Head({ cells }: { cells: string[] }) {
  return (
    <thead>
      <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-wide text-slate-500">
        {cells.map((cell) => (
          <th key={cell} scope="col" className="py-2 pr-4 font-medium">
            {cell}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default function GuideDataBlock({ block }: { block: Block }) {
  if (block === "council-tax-boroughs") {
    const rows = [...GM_BOROUGHS].sort(
      (a, b) => BAND_D_BY_BOROUGH[a] - BAND_D_BY_BOROUGH[b],
    );
    return (
      <Wrapper>
        <table className="w-full min-w-[30rem] border-collapse text-sm">
          <Head cells={["Borough", "Band D per year", "Per month"]} />
          <tbody>
            {rows.map((borough) => (
              <tr key={borough} className="border-b border-slate-900">
                <td className="py-2.5 pr-4">
                  <Link
                    href={manchesterPath(`/boroughs/${boroughSlug(borough)}`)}
                    className="transition-colors hover:text-emerald-400"
                  >
                    {borough}
                  </Link>
                </td>
                <td className="py-2.5 pr-4 tabular-nums text-slate-200">
                  £{BAND_D_BY_BOROUGH[borough].toLocaleString()}
                </td>
                <td className="py-2.5 pr-4 tabular-nums text-slate-400">
                  £{Math.round(BAND_D_BY_BOROUGH[borough] / 12).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Wrapper>
    );
  }

  if (block === "rent-spread") {
    const sorted = [...MANCHESTER_NEIGHBOURHOODS].sort(
      (a, b) => a.rent.oneBedMedianGbp - b.rent.oneBedMedianGbp,
    );
    // Five points across the distribution rather than the whole list: the
    // guide is making a point about spread, and the full table already
    // exists at /manchester/rent-index.
    const picks = [0, 0.25, 0.5, 0.75, 1].map(
      (q) => sorted[Math.round(q * (sorted.length - 1))],
    );
    return (
      <Wrapper>
        <table className="w-full min-w-[30rem] border-collapse text-sm">
          <Head cells={["Area", "1-bed", "2-bed", "Room"]} />
          <tbody>
            {picks.map((n) => (
              <tr key={n.id} className="border-b border-slate-900">
                <td className="py-2.5 pr-4">
                  <Link
                    href={manchesterPath(`/neighbourhoods/${n.id}`)}
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
                  £{manchesterRoomRentFor(n).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Wrapper>
    );
  }

  // salary-ladder
  return (
    <Wrapper>
      <table className="w-full min-w-[32rem] border-collapse text-sm">
        <Head
          cells={["Salary", "Take-home / month", "Rent at 35%", "Rent at 40%"]}
        />
        <tbody>
          {SALARY_LEVELS.map((salary) => {
            const monthly = annualTakeHome(salary) / 12;
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
      </table>
    </Wrapper>
  );
}
