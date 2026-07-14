"use client";

import { m as motion } from "framer-motion";
import { ICONS } from "@/lib/icons";
import { MonogramMark } from "@/components/illustrations/ambience";

const MILESTONES = [
  {
    year: "2019",
    title: "Car Concierge Pro launches",
    description:
      "Neel Mehta starts Car Concierge Pro after watching friends overpay on auto policies they didn't fully understand.",
  },
  {
    year: "2022",
    title: "Negotiation desk formalised",
    description:
      "First dedicated team of insurance negotiators is built, moving from one-off favors to a real service.",
  },
  {
    year: "2024",
    title: "AiM Insurance launches",
    description:
      "AiM is spun out as a standalone insurance arm with its own carrier appointments and negotiation workflow.",
  },
  {
    year: "2025",
    title: "$6.14M+ negotiated for clients",
    description:
      "1100+ clients across the US, Canada, and UAE, averaging $1,247 in annual savings each.",
  },
];

export function AboutStory() {
  return (
    <section
      aria-labelledby="story-heading"
      className="relative overflow-hidden bg-[#fbfaf5] py-14 sm:py-18"
    >
      {/* Subtle warm washes */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 h-[480px] w-[480px] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgb(255 200 61 / 0.18), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-10 h-[360px] w-[360px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgb(79 224 176 / 0.10), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20">
        {/* Text column */}
        <div className="lg:col-span-7">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-xs font-heading font-semibold uppercase tracking-[0.22em] text-cta"
          >
            Our story
          </motion.span>

          <motion.h2
            id="story-heading"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-3 font-heading font-extrabold text-[#0a0a0a] tracking-[-0.03em] leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 4.4vw, 3.2rem)" }}
          >
            From a side favor to a savings desk for hundreds of clients.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-7 space-y-5 text-lg sm:text-xl leading-[1.65] text-[#1f1f26]"
          >
            <p>
              Founded by{" "}
              <strong className="font-heading font-bold text-[#0a0a0a]">
                Neel Mehta
              </strong>
              , AiM Insurance started from a simple observation: friends and
              family were constantly overpaying for policies they didn&rsquo;t
              fully understand.
            </p>
            <p>
              As a product of{" "}
              <strong className="font-heading font-bold text-[#0a0a0a]">
                Car Concierge Pro
              </strong>
              , we created a service that stands in your corner, reviewing
              quotes, challenging overpriced plans, and ensuring you never
              settle for less than you deserve.
            </p>
            <p>
              Today AiM works for individuals, families, and high-net-worth
              clients across three countries. Same coverage, lower premium,
              every time.
            </p>
          </motion.div>
        </div>

        {/* Visual column: milestone card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5"
        >
          <div className="relative overflow-hidden rounded-3xl border border-[#0a0a0a]/10 bg-white p-7 sm:p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.18)]">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, rgb(255 200 61 / 0.22), transparent 70%)",
              }}
            />
            {/* AiM monogram watermark */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-6 -right-6 opacity-25"
            >
              <MonogramMark size={140} />
            </div>
            {/* Sparkles */}
            <svg
              aria-hidden
              viewBox="0 0 100 100"
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              {[
                { cx: 78, cy: 14, r: 0.7, c: "#ffc83d", d: 0 },
                { cx: 90, cy: 32, r: 1, c: "#ffc83d", d: 0.6 },
                { cx: 12, cy: 70, r: 0.8, c: "#4fe0b0", d: 1.0 },
                { cx: 22, cy: 92, r: 0.7, c: "#ffc83d", d: 1.4 },
              ].map((s, i) => (
                <motion.circle
                  key={i}
                  cx={s.cx}
                  cy={s.cy}
                  r={s.r}
                  fill={s.c}
                  animate={{
                    opacity: [0.3, 0.9, 0.3],
                    scale: [0.7, 1.2, 0.7],
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    delay: s.d,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </svg>
            <div className="relative">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#ffc83d]/40 bg-[#fff5d4] px-3 py-1.5 text-[11px] font-heading font-bold uppercase tracking-[0.2em] text-[#0a0a0a]">
                <ICONS.Sparkles className="size-3 text-[#ffc83d]" aria-hidden />
                Key milestones
              </div>
              <ol className="relative ml-2 space-y-7 border-l border-[#0a0a0a]/12 pl-6">
                {MILESTONES.map((m, i) => (
                  <motion.li
                    key={m.year}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: 0.05 + i * 0.08 }}
                    className="relative"
                  >
                    <span
                      aria-hidden
                      className="absolute -left-[33px] top-0.5 grid size-4 place-items-center rounded-full bg-[#ffc83d] ring-2 ring-white"
                    >
                      <span className="size-1.5 rounded-full bg-white" />
                    </span>
                    <p className="font-heading text-[11px] font-bold uppercase tracking-[0.22em] text-[#ffc83d] tabular-nums">
                      {m.year}
                    </p>
                    <p className="mt-1 font-heading text-base font-bold text-[#0a0a0a]">
                      {m.title}
                    </p>
                    <p className="mt-1.5 text-sm text-[#1f1f26] leading-relaxed">
                      {m.description}
                    </p>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutStory;
