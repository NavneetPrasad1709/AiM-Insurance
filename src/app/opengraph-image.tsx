import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "AiM Insurance: Same coverage, lower premiums.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "radial-gradient(120% 90% at 20% 0%, #1a1306 0%, #0a0a0a 55%, #050505 100%)",
          color: "#ffffff",
          padding: "72px 80px",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(closest-side, rgba(255,200,61,0.22), transparent 70%)",
            transform: "translate(420px, -160px)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#ffc83d",
          }}
        >
          <span
            style={{
              display: "flex",
              width: 44,
              height: 2,
              background: "#ffc83d",
            }}
          />
          AiM Insurance
        </div>

        <div
          style={{
            marginTop: 56,
            display: "flex",
            flexDirection: "column",
            gap: 26,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: -3,
              lineHeight: 1.02,
              maxWidth: 980,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            Same coverage.
            <span style={{ color: "#ffc83d", marginLeft: 18 }}>
              Lower premiums.
            </span>
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.95)",
              maxWidth: 880,
              display: "flex",
            }}
          >
            Expert negotiators fight for the best deal on your car, home, boat,
            yacht, and jet insurance. Average savings: $1,247 a year.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            color: "rgba(255,255,255,0.9)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                display: "flex",
                width: 8,
                height: 8,
                borderRadius: 9999,
                background: "#4fe0b0",
              }}
            />
            1100+ clients · USA · Canada · UAE
          </div>
          <div style={{ display: "flex", fontWeight: 700, color: "#ffffff" }}>
            getaiminsurance.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
