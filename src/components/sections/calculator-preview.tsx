"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal } from "@/components/ui/scroll-effects";
import { CountUp } from "@/components/ui/count-up";
import {
  GoldParticleField,
  CornerOrnament,
} from "@/components/illustrations/ambience";
import { ICONS } from "@/lib/icons";

/* Animated savings-curve SVG that draws in on view */
function SavingsCurve() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  return (
    <svg
      ref={ref}
      viewBox="0 0 220 80"
      className="mt-4 h-12 w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="curveGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffc83d" stopOpacity="0" />
          <stop offset="40%" stopColor="#ffc83d" stopOpacity="1" />
          <stop offset="100%" stopColor="#4fe0b0" stopOpacity="1" />
        </linearGradient>
      </defs>
      {/* Drop fill */}
      <motion.path
        d="M 4,20 Q 60,18 110,38 T 216,68 L 216,80 L 4,80 Z"
        fill="url(#curveGrad)"
        fillOpacity="0.18"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      />
      {/* Curve */}
      <motion.path
        d="M 4,20 Q 60,18 110,38 T 216,68"
        fill="none"
        stroke="url(#curveGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: reduce ? 1 : 1 } : {}}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Anchor dots */}
      {[
        { cx: 4, cy: 20, delay: 0 },
        { cx: 110, cy: 38, delay: 0.8 },
        { cx: 216, cy: 68, delay: 1.4 },
      ].map((d, i) => (
        <motion.circle
          key={i}
          cx={d.cx}
          cy={d.cy}
          r="3.5"
          fill="#ffc83d"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: d.delay, ease: "backOut" }}
        />
      ))}
    </svg>
  );
}

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
        {/* Drifting gold particles for kinetic energy */}
        <GoldParticleField density={20} opacity={0.45} />
      </div>
      {/* Decorative corner ornaments */}
      <CornerOrnament position="tl" size={140} opacity={0.25} />
      <CornerOrnament position="br" size={140} opacity={0.25} />

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
                    <motion.span
                      className="size-1.5 rounded-full bg-[#4fe0b0]"
                      animate={{
                        opacity: [1, 0.4, 1],
                        scale: [1, 1.4, 1],
                      }}
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{ boxShadow: "0 0 8px rgb(79 224 176 / 0.8)" }}
                    />
                    Live
                  </span>
                </div>

                <dl className="mt-5 space-y-2.5">
                  <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex items-center justify-between rounded-md bg-[#111113] border border-[#1a1a1f] px-4 py-3"
                  >
                    <dt className="text-sm text-white">Initial premium</dt>
                    <dd className="font-bold text-white tabular-nums">
                      <CountUp value="$3,214" />
                    </dd>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex items-center justify-between rounded-md bg-[#111113] border border-[#1a1a1f] px-4 py-3"
                  >
                    <dt className="text-sm text-white">After AiM</dt>
                    <dd className="font-bold text-white tabular-nums">
                      <CountUp value="$2,400" />
                    </dd>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.85 }}
                    className="relative flex items-center justify-between rounded-md border border-[#ffc83d]/40 bg-[#160d09] px-4 py-3 overflow-hidden"
                  >
                    {/* Pulse glow inside the savings row */}
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 rounded-md"
                      style={{
                        background:
                          "radial-gradient(closest-side, rgb(255 200 61 / 0.30), transparent 70%)",
                      }}
                      animate={{ opacity: [0.4, 0.9, 0.4] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <dt className="relative text-sm font-semibold text-white">
                      Your savings
                    </dt>
                    <dd
                      className="relative font-extrabold text-[#ffc83d] text-xl tabular-nums"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      <CountUp value="$814" />
                    </dd>
                  </motion.div>
                </dl>

                {/* Animated savings curve under the table */}
                <SavingsCurve />

                <div className="mt-4 pt-4 border-t border-[#232328] flex items-center justify-between text-xs">
                  <span className="text-white">AiM service fee</span>
                  <span className="font-bold text-white tabular-nums">
                    <CountUp value="$204" />{" "}
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
