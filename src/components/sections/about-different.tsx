"use client";

import { m as motion } from "framer-motion";
import { ICONS } from "@/lib/icons";

interface ComparisonRow {
  traditional: string;
  aim: string;
}

const ROWS: ComparisonRow[] = [
  {
    traditional: "Sells policies, you're the product",
    aim: "Negotiates for you, you're the client",
  },
  {
    traditional: "Commission-driven recommendations",
    aim: "Savings-driven recommendations",
  },
  {
    traditional: "Locked to one carrier's catalog",
    aim: "Compares 50+ carriers per quote",
  },
  {
    traditional: "Renewal letters accepted at face value",
    aim: "Every renewal audited and re-negotiated",
  },
  {
    traditional: "Paperwork is your problem",
    aim: "End-to-end switch handled for you",
  },
  {
    traditional: "Pays out only what the policy forces",
    aim: "Advocates you at claim time",
  },
];

export function AboutDifferent() {
  return (
    <section
      aria-labelledby="different-heading"
      className="relative overflow-hidden bg-[#fbfaf5] py-14 sm:py-18"
    >
      {/* Subtle warm washes */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-32 h-[420px] w-[420px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgb(255 106 106 / 0.08), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-32 h-[480px] w-[480px] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgb(255 200 61 / 0.18), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {/* Deep gold: the brand #ffc83d is only 1.47:1 on this cream section. */}
          <span className="text-xs font-heading font-semibold uppercase tracking-[0.22em] text-[#8a6410]">
            Side by side
          </span>
          <h2
            id="different-heading"
            className="mt-3 font-heading font-extrabold text-[#0a0a0a] tracking-[-0.03em] leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 4.4vw, 3rem)" }}
          >
            How we&rsquo;re different
          </h2>
          <p className="mt-5 text-lg sm:text-xl leading-[1.6] text-[#1f1f26]">
            A traditional agent works for a carrier. AiM works for you.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 lg:grid-cols-2">
          {/* Traditional */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-[#0a0a0a]/10 bg-white p-7 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.18)]"
          >
            <div className="flex items-center gap-3 border-b border-[#0a0a0a]/8 pb-4">
              <span
                aria-hidden
                className="grid size-9 place-items-center rounded-full bg-error-light text-error"
              >
                <ICONS.X className="size-4" aria-hidden />
              </span>
              <h3 className="font-heading text-lg font-bold text-[#2e2e36]">
                Traditional Insurance Agent
              </h3>
            </div>
            <ul className="mt-5 space-y-4">
              {ROWS.map((row) => (
                <li
                  key={`trad-${row.traditional}`}
                  className="flex items-start gap-3 text-base leading-[1.6] text-[#1f1f26]"
                >
                  <ICONS.X
                    className="mt-0.5 size-4 shrink-0 text-error"
                    aria-hidden
                  />
                  <span>{row.traditional}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* AiM */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-2xl border-2 border-[#ffc83d] bg-white p-7 shadow-[0_30px_80px_-30px_rgba(255,200,61,0.45)]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, rgb(255 200 61 / 0.18), transparent 70%)",
              }}
            />
            {/* Animated sparkle field */}
            <svg
              aria-hidden
              viewBox="0 0 200 100"
              className="pointer-events-none absolute inset-x-0 top-0 h-20 w-full"
            >
              {[
                { cx: 16, cy: 24, r: 0.8, d: 0 },
                { cx: 50, cy: 12, r: 1.2, d: 0.6 },
                { cx: 110, cy: 30, r: 1, d: 1.0 },
                { cx: 168, cy: 18, r: 0.9, d: 0.4 },
                { cx: 188, cy: 60, r: 1.1, d: 1.2 },
              ].map((s, i) => (
                <motion.circle
                  key={i}
                  cx={s.cx}
                  cy={s.cy}
                  r={s.r}
                  fill="#ffc83d"
                  animate={{
                    opacity: [0.3, 0.9, 0.3],
                    scale: [0.7, 1.2, 0.7],
                  }}
                  transition={{
                    duration: 4 + i * 0.4,
                    delay: s.d,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </svg>
            <div className="relative">
              <div className="flex items-center gap-3 border-b border-[#ffc83d]/40 pb-4">
                <span
                  aria-hidden
                  className="grid size-9 place-items-center rounded-full bg-[#ffc83d] text-[#0a0a0a]"
                >
                  <ICONS.Check className="size-4" aria-hidden />
                </span>
                <h3 className="font-heading text-lg font-bold text-[#0a0a0a]">
                  AiM Insurance
                </h3>
                <span className="ml-auto rounded-full bg-[#fff5d4] px-2.5 py-0.5 text-[10px] font-heading font-bold uppercase tracking-[0.18em] text-[#0a0a0a] ring-1 ring-[#ffc83d]/40">
                  You win
                </span>
              </div>
              <ul className="mt-5 space-y-4">
                {ROWS.map((row) => (
                  <li
                    key={`aim-${row.aim}`}
                    className="flex items-start gap-3 text-base leading-[1.6] text-[#0a0a0a]"
                  >
                    <ICONS.CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-[#ffc83d]"
                      aria-hidden
                    />
                    <span>{row.aim}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutDifferent;
