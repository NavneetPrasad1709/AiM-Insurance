"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-effects";
import { ICONS } from "@/lib/icons";

export function CalculatorPreview() {
  return (
    <section
      aria-labelledby="calculator-preview-heading"
      className="relative bg-background py-24 sm:py-28 lg:py-36 overflow-hidden"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 left-1/2 h-[420px] w-[680px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgb(79 224 176 / 0.14), rgb(255 200 61 / 0.10) 55%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[12px] border border-[#232328] bg-[#111113] p-7 sm:p-10 lg:p-14 max-w-5xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Copy */}
            <div className="flex flex-col gap-5">
              <ScrollReveal direction="up">
                <span
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-[#232328] bg-[#0a0a0a] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  <ICONS.Calculator className="size-3.5 text-[#ffc83d]" aria-hidden />
                  Free savings calculator
                </span>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.1}>
                <h2
                  id="calculator-preview-heading"
                  className="text-white"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontFamily: "var(--font-inter)",
                    fontWeight: 700,
                    letterSpacing: "-0.025em",
                    lineHeight: 1.05,
                  }}
                >
                  See your savings in{" "}
                  <span className="text-[#ffc83d] tabular-nums">60 seconds.</span>
                </h2>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.2}>
                <p className="text-base sm:text-lg text-white leading-[1.55]">
                  Enter your current premium. We&apos;ll show you the savings
                  and our fee — before you commit to anything.
                </p>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.3}>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/calculator"
                    className="btn-shine cta-primary inline-flex items-center gap-2 px-7 py-3.5 font-semibold"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Try the calculator
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                  <span className="text-xs text-white">
                    No signup · No commitment
                  </span>
                </div>
              </ScrollReveal>
            </div>

            {/* Mock calculator card */}
            <ScrollReveal direction="left" delay={0.2}>
              <div className="relative rounded-[8px] border border-[#232328] bg-[#0a0a0a] p-6">
                <div className="flex items-center justify-between">
                  <span
                    className="text-[10px] uppercase tracking-[0.18em] font-bold text-white"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Premium estimate
                  </span>
                  <span
                    className="inline-flex items-center gap-1 rounded-full bg-[#0a1612] border border-[#4fe0b0]/30 px-2.5 py-0.5 text-[#4fe0b0] font-bold text-[11px]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    <span className="size-1.5 rounded-full bg-[#4fe0b0]" />
                    Live
                  </span>
                </div>

                <dl className="mt-5 space-y-2.5">
                  <div className="flex items-center justify-between rounded-md bg-[#111113] border border-[#1a1a1f] px-4 py-3">
                    <dt className="text-sm text-white">Initial premium</dt>
                    <dd className="font-bold text-white tabular-nums">
                      $3,214
                    </dd>
                  </div>
                  <div className="flex items-center justify-between rounded-md bg-[#111113] border border-[#1a1a1f] px-4 py-3">
                    <dt className="text-sm text-white">After AiM</dt>
                    <dd className="font-bold text-white tabular-nums">
                      $2,400
                    </dd>
                  </div>
                  <div className="flex items-center justify-between rounded-md border border-[#ffc83d]/40 bg-[#160d09] px-4 py-3">
                    <dt className="text-sm font-semibold text-white">
                      Your savings
                    </dt>
                    <dd
                      className="font-extrabold text-[#ffc83d] text-xl tabular-nums"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      $814
                    </dd>
                  </div>
                </dl>

                <div className="mt-4 pt-4 border-t border-[#232328] flex items-center justify-between text-xs">
                  <span className="text-white">AiM service fee</span>
                  <span className="font-bold text-white tabular-nums">
                    $204{" "}
                    <span className="text-white font-semibold">(25%)</span>
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CalculatorPreview;
