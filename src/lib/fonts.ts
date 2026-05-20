import { Montserrat } from "next/font/google";

// Reduced weight set: 400 (body fallback for spots that explicitly use
// Montserrat), 600 (UI labels/CTAs), 700 (H2/H3), 800 (H1 hero).
// Dropping 500 cut one WOFF2 file from the critical font payload.
// `display: swap` lets text paint with the system fallback at FCP
// (see globals.css: --font-body is a system stack so LCP body text
// doesn't pay for the Montserrat round-trip).
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  variable: "--font-montserrat",
  adjustFontFallback: true,
  preload: true,
});
