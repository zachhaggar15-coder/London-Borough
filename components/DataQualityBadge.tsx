"use client";

import type { Neighbourhood } from "@/lib/types";
import {
  dataQualityDescription,
  dataQualityLabel,
} from "@/lib/provenance";

type Props = {
  quality: Neighbourhood["dataQuality"];
  compact?: boolean;
};

export default function DataQualityBadge({ quality, compact }: Props) {
  const tone =
    quality === "full"
      ? "border-emerald-700 bg-emerald-950/70 text-emerald-200"
      : "border-sky-700 bg-sky-950/70 text-sky-200";

  return (
    <span
      title={dataQualityDescription(quality)}
      className={[
        "inline-flex shrink-0 items-center rounded-full border font-medium",
        compact ? "px-1.5 py-0 text-[9px]" : "px-2 py-0.5 text-[10px]",
        tone,
      ].join(" ")}
    >
      {dataQualityLabel(quality)}
    </span>
  );
}
