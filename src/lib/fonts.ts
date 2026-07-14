import { Montserrat } from "next/font/google";

// Montserrat powers the whole site (body + headings). Weight set:
// 400 (body copy), 600 (UI labels/CTAs), 700 (H2/H3), 800 (H1 hero).
// 500 is intentionally omitted to keep one WOFF2 out of the critical
// payload; `font-medium` gracefully falls back to 400.
// `display: swap` + adjustFontFallback paint the size-matched system
// fallback at FCP (no CLS) before Montserrat swaps in.
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  variable: "--font-montserrat",
  adjustFontFallback: true,
  preload: true,
});
