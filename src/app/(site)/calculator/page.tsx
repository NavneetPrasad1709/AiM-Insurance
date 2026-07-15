import type { Metadata } from "next";
import Link from "next/link";
import { SavingsCalculator } from "@/components/sections/savings-calculator";
import { CalculatorPageAmbience } from "@/components/sections/calculator-page-ambience";
import { FloatingOrbs } from "@/components/illustrations/floating-orbs";
import { SectionDividerArc } from "@/components/illustrations/ambience";
import { SITE_CONFIG } from "@/lib/constants";

const PAGE_URL = `${SITE_CONFIG.url}/calculator`;
const TITLE = "Savings Calculator";
const DESCRIPTION =
  "See how much AiM can save you on car, home, boat, yacht or jet insurance. 4-step calculator with instant estimate.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/calculator" },
  openGraph: {
    title: `${TITLE} | AiM Insurance`,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
};

export default function CalculatorPage() {
  return (
    <div className="relative bg-background pt-10 pb-24 sm:pt-14 sm:pb-32">
      {/* Ambient gold glow behind card */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-20 left-1/2 -translate-x-1/2 h-[640px] w-[1100px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgb(255 200 61 / 0.22), transparent 70%)",
          }}
        />
        {/* Animated decorative ambience: particles, aurora, grain, corner ornaments */}
        <CalculatorPageAmbience />
      </div>

      <div className="relative mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-10">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white">
            <li>
              <Link
                href="/"
                className="link-underline transition-colors hover:text-white"
              >
                Home
              </Link>
            </li>
            <li aria-hidden className="text-white/30">/</li>
            <li className="text-[#ffc83d]" aria-current="page">
              Calculator
            </li>
          </ol>
        </nav>

        <div className="relative max-w-2xl mb-10">
          <FloatingOrbs variant="hero" />
          <h1
            className="relative text-white text-balance"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.02,
            }}
          >
            See exactly{" "}
            <span className="relative inline-block">
              <span className="relative z-10">what you&rsquo;d save</span>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-1 h-3 bg-[#ffc83d]/55"
              />
            </span>
            .
          </h1>
          <p className="relative mt-4 text-base sm:text-lg text-white leading-[1.55]">
            Four questions. Live benchmark against 50+ carrier rate filings.
            Zero commitment.
          </p>
        </div>

        <SectionDividerArc className="mb-4" />

        <SavingsCalculator />
      </div>
    </div>
  );
}
