import { ImageResponse } from "next/og";
import { NEIGHBOURHOODS } from "@/lib/data/neighbourhoods";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const n = NEIGHBOURHOODS.find((n) => n.id === slug);

  const name = n?.name ?? "London";
  const borough = n?.borough?.split("/")[0]?.trim() ?? "London";
  const zone =
    n?.transportZones?.length === 1
      ? `Zone ${n.transportZones[0]}`
      : n?.transportZones
        ? `Zones ${n.transportZones.join(" & ")}`
        : "";
  const rent = n ? `£${n.rent.oneBedMedianGbp.toLocaleString()}/mo` : "";
  const summary = n?.summary?.slice(0, 100) ?? "";

  // Top two lifestyle dimensions
  const topDimensions = n
    ? Object.entries(n.lifestyle)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 2)
        .map(([k]) => {
          const labels: Record<string, string> = {
            livelyVsQuiet: "Lively",
            greenSpace: "Green space",
            nightlife: "Nightlife",
            cafeDensity: "Café scene",
            gymDensity: "Gym density",
            walkability: "Walkability",
            foodScene: "Food scene",
            youngProfessionalDensity: "Young professionals",
            safety: "Safety",
            connectivity: "Transport",
          };
          return labels[k] ?? k;
        })
    : [];

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f172a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "72px 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Borough + Zone badges */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "28px",
          }}
        >
          {[borough, zone].filter(Boolean).map((tag) => (
            <span
              key={tag}
              style={{
                background: "#1e293b",
                color: "#94a3b8",
                fontSize: "20px",
                padding: "6px 18px",
                borderRadius: "100px",
                border: "1px solid #334155",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Neighbourhood name */}
        <div
          style={{
            color: "#f8fafc",
            fontSize: "72px",
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: "20px",
          }}
        >
          {name}
        </div>

        {/* Summary */}
        {summary && (
          <div
            style={{
              color: "#94a3b8",
              fontSize: "24px",
              lineHeight: 1.4,
              maxWidth: "900px",
              marginBottom: "40px",
            }}
          >
            {summary}
            {summary.length >= 100 ? "…" : ""}
          </div>
        )}

        {/* Rent + top dimensions */}
        <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
          {rent && (
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span
                style={{ color: "#10b981", fontSize: "32px", fontWeight: 700 }}
              >
                {rent}
              </span>
              <span style={{ color: "#64748b", fontSize: "16px" }}>
                1-bed median
              </span>
            </div>
          )}
          {topDimensions.map((d) => (
            <div
              key={d}
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <span
                style={{ color: "#10b981", fontSize: "32px", fontWeight: 700 }}
              >
                ↑
              </span>
              <span style={{ color: "#64748b", fontSize: "16px" }}>{d}</span>
            </div>
          ))}
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            right: "80px",
            color: "#475569",
            fontSize: "20px",
          }}
        >
          whereinlondon.app
        </div>
      </div>
    ),
    { ...size },
  );
}
