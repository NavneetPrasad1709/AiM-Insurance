"use client";

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Replaces the root layout when the layout itself throws. Must include its
 * own <html> and <body>. Keep markup minimal, fonts/providers may be down.
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    if (typeof console !== "undefined") {
      console.error("[global-error]", error);
    }
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#f4f4f8",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: 480, textAlign: "center" }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#ffc83d",
              margin: 0,
            }}
          >
            500 · Server error
          </p>
          <h1
            style={{
              marginTop: 16,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Something broke on our end.
          </h1>
          <p
            style={{
              marginTop: 16,
              fontSize: 18,
              lineHeight: 1.6,
              color: "#f4f4f8",
            }}
          >
            Sorry, try reloading the page. If this keeps happening, email{" "}
            <a
              href="mailto:info@getaiminsurance.com"
              style={{ color: "#ffc83d" }}
            >
              info@getaiminsurance.com
            </a>
            .
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: 32,
              cursor: "pointer",
              border: "none",
              background: "#ffc83d",
              color: "#0a0a0a",
              padding: "14px 28px",
              borderRadius: 9999,
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
