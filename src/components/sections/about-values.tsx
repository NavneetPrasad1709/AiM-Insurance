"use client";

import { m as motion } from "framer-motion";
import { ICONS } from "@/lib/icons";
import type { IconName } from "@/lib/icons";

interface Value {
  icon: IconName;
  title: string;
  description: string;
  /** Hex color used for the icon ring + accent. */
  accent: string;
  accentBg: string;
}

const VALUES: Value[] = [
  {
    icon: "Eye",
    title: "Transparency",
    description: "No fine print. No upselling. Just honest advice.",
    accent: "#ffc83d",
    accentBg: "rgb(255 200 61 / 0.12)",
  },
  {
    icon: "HeartHandshake",
    title: "Client-First",
    description: "Every decision we make puts your interests first.",
    accent: "#4fe0b0",
    accentBg: "rgb(79 224 176 / 0.14)",
  },
  {
    icon: "Award",
    title: "Expertise",
    description: "Deep industry knowledge that gives you an edge.",
    accent: "#ffc83d",
    accentBg: "rgb(255 200 61 / 0.12)",
  },
  {
    icon: "Sparkles",
    title: "Innovation",
    description: "Continuously finding smarter ways to save you money.",
    accent: "#4fe0b0",
    accentBg: "rgb(79 224 176 / 0.14)",
  },
];

export function AboutValues() {
  return (
    <section
      aria-labelledby="values-heading"
      className="relative overflow-hidden bg-background border-t border-border py-14 sm:py-18"
    >
      {/* Light accent washes */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-32 h-[420px] w-[420px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgb(255 200 61 / 0.10), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-32 h-[420px] w-[420px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgb(79 224 176 / 0.10), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-heading font-semibold uppercase tracking-[0.22em] text-cta">
            What we stand for
          </span>
          <h2
            id="values-heading"
            className="mt-3 font-heading font-extrabold text-white tracking-[-0.03em] leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 4.4vw, 3rem)" }}
          >
            Our values
          </h2>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-text-secondary">
            The four principles every negotiation, every recommendation, every
            client conversation runs through.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => {
            const Icon = ICONS[v.icon];
            return (
              <motion.article
                key={v.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-colors duration-300"
                style={{
                  ["--accent" as string]: v.accent,
                }}
              >
                {/* Top accent gradient bar */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px opacity-60"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${v.accent}, transparent)`,
                  }}
                />
                {/* Hover glow */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(80% 60% at 50% 0%, ${v.accent}1c, transparent 70%)`,
                  }}
                />

                {/* Decorative corner sparkle */}
                <svg
                  aria-hidden
                  viewBox="0 0 60 60"
                  className="absolute right-3 top-3 h-10 w-10 opacity-50"
                >
                  {[
                    { cx: 30, cy: 12, r: 1.4 },
                    { cx: 48, cy: 24, r: 0.8 },
                    { cx: 14, cy: 32, r: 1 },
                    { cx: 38, cy: 44, r: 0.7 },
                  ].map((s, idx) => (
                    <motion.circle
                      key={idx}
                      cx={s.cx}
                      cy={s.cy}
                      r={s.r}
                      fill={v.accent}
                      initial={{ opacity: 0.2, scale: 0.7 }}
                      animate={{
                        opacity: [0.25, 0.85, 0.25],
                        scale: [0.7, 1.1, 0.7],
                      }}
                      transition={{
                        duration: 4 + idx * 0.4,
                        delay: idx * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </svg>

                <div className="relative">
                  <div
                    className="mb-5 grid size-12 place-items-center rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                    style={{ backgroundColor: v.accentBg, color: v.accent }}
                  >
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-base leading-[1.6] text-text-secondary">
                    {v.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AboutValues;
