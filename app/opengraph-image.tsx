import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Where in London — find your perfect neighbourhood";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Green accent bar */}
        <div
          style={{
            width: "60px",
            height: "6px",
            background: "#10b981",
            borderRadius: "3px",
            marginBottom: "32px",
          }}
        />

        {/* Headline */}
        <div
          style={{
            color: "#f8fafc",
            fontSize: "60px",
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: "820px",
            marginBottom: "28px",
          }}
        >
          Find your perfect London neighbourhood
        </div>

        {/* Sub-headline */}
        <div
          style={{
            color: "#94a3b8",
            fontSize: "28px",
            lineHeight: 1.4,
            maxWidth: "700px",
            marginBottom: "48px",
          }}
        >
          Match by commute · salary · lifestyle
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: "40px",
          }}
        >
          {[
            ["95+", "neighbourhoods"],
            ["32", "boroughs"],
            ["10", "commute guides"],
          ].map(([num, label]) => (
            <div
              key={label}
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <span
                style={{ color: "#10b981", fontSize: "36px", fontWeight: 700 }}
              >
                {num}
              </span>
              <span style={{ color: "#64748b", fontSize: "18px" }}>{label}</span>
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
