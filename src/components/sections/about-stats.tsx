"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/ui/count-up";
import { ICONS } from "@/lib/icons";
import type { IconName } from "@/lib/icons";

interface StatRow {
  value: string;
  label: string;
  icon: IconName;
  description: string;
  accent: string;
  accentBg: string;
}

const ROWS: StatRow[] = [
  {
    value: "800+",
    label: "Clients served",
    icon: "HeartHandshake",
    description: "Across the US, Canada, and UAE.",
    accent: "#ffc83d",
    accentBg: "rgb(255 200 61 / 0.12)",
  },
  {
    value: "$4.8M+",
    label: "Total savings negotiated",
    icon: "TrendingUp",
    description: "Real money back in client pockets.",
    accent: "#4fe0b0",
    accentBg: "rgb(79 224 176 / 0.14)",
  },
  {
    value: "$1,200+",
    label: "Average annual savings",
    icon: "Award",
    description: "Same coverage, lower premium.",
    accent: "#ffc83d",
    accentBg: "rgb(255 200 61 / 0.12)",
  },
  {
    value: "50+",
    label: "Insurance providers compared",
    icon: "BarChart3",
    description: "Every quote, against every relevant carrier.",
    accent: "#4fe0b0",
    accentBg: "rgb(79 224 176 / 0.14)",
  },
];

export function AboutStats() {
  return (
    <section
      aria-labelledby="about-stats-heading"
      className="relative overflow-hidden bg-background border-t border-border py-24 sm:py-28"
    >
      {/* Subtle navy/dot pattern + ambient washes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-dot-grid opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[640px] -translate-x-1/2 rounded-full bg-gradient-blob blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgb(79 224 176 / 0.08), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-heading font-semibold uppercase tracking-[0.22em] text-cta">
            By the numbers
          </span>
          <h2
            id="about-stats-heading"
            className="mt-3 font-heading font-extrabold text-white tracking-[-0.03em] leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 4.4vw, 3rem)" }}
          >
            Our journey, measured
          </h2>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-text-secondary">
            Every figure represents real clients we&rsquo;ve helped pay less for
            the same coverage.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ROWS.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:p-7"
              >
                {/* Top accent bar */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px opacity-60"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)`,
                  }}
                />
                {/* Hover glow */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(80% 60% at 50% 0%, ${s.accent}1c, transparent 70%)`,
                  }}
                />
                {/* Corner decoration: tiny radiating lines */}
                <svg
                  aria-hidden
                  viewBox="0 0 60 60"
                  className="absolute -right-2 -top-2 h-16 w-16 opacity-50"
                >
                  {Array.from({ length: 6 }).map((_, idx) => {
                    const angle = (idx * Math.PI) / 8 - Math.PI / 4;
                    const x1 = 30 + Math.cos(angle) * 18;
                    const y1 = 30 + Math.sin(angle) * 18;
                    const x2 = 30 + Math.cos(angle) * 26;
                    const y2 = 30 + Math.sin(angle) * 26;
                    return (
                      <line
                        key={idx}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={s.accent}
                        strokeWidth="0.7"
                        strokeLinecap="round"
                        opacity={0.4 + idx * 0.08}
                      />
                    );
                  })}
                  <motion.circle
                    cx="30"
                    cy="30"
                    r="3"
                    fill={s.accent}
                    animate={{ opacity: [0.4, 1, 0.4], scale: [0.85, 1.1, 0.85] }}
                    transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </svg>

                <div className="relative">
                  <div
                    className="mb-5 inline-flex size-10 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: s.accentBg, color: s.accent }}
                  >
                    <Icon className="size-4" aria-hidden />
                  </div>
                  <div
                    className="font-heading text-4xl sm:text-5xl font-extrabold tracking-[-0.02em] leading-none"
                    style={{ color: s.accent }}
                  >
                    <CountUp value={s.value} />
                  </div>
                  <p className="mt-4 font-heading text-sm font-bold text-white">
                    {s.label}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-text-muted">
                    {s.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AboutStats;
