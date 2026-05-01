"use client";

import Image from "next/image";
import { CountUp } from "@/components/ui/count-up";
import { ScrollReveal, ScrollZoom, StaggerGroup, StaggerItem } from "@/components/ui/scroll-effects";
import { FloatingOrbs } from "@/components/illustrations/floating-orbs";
import { AuroraStrands } from "@/components/illustrations/ambience";
import { ICONS } from "@/lib/icons";

const PAIN_POINTS = [
  {
    stat: "$2,000",
    suffix: "/yr",
    label: "Average overpayment",
    description:
      "Every year people overpay by up to $2,000 on insurance — money that could fuel a vacation or family goal.",
    icon: "TrendingUp" as const,
    accent: "from-cta to-orange",
  },
  {
    stat: "30%",
    suffix: "more",
    label: "Loyalty tax",
    description:
      "Insurers raise rates on loyal customers while offering discounts to new ones. Staying still costs you 30% extra a year.",
    icon: "BarChart3" as const,
    accent: "from-orange to-accent",
  },
  {
    stat: "$500+",
    suffix: "saved",
    label: "By switching",
    description:
      "Switching providers can save over $500 on identical coverage. Why pay more for the same protection?",
    icon: "Handshake" as const,
    accent: "from-accent to-teal",
  },
] as const;

export function PainStats() {
  return (
    <section
      aria-labelledby="pain-heading"
      className="relative bg-background py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/4 -left-32 h-[460px] w-[460px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgb(255 200 61 / 0.18), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgb(255 200 61 / 0.14), transparent 70%)",
          }}
        />
        {/* Slow-drifting aurora ribbons behind heading */}
        <AuroraStrands opacity={0.28} />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        {/* Heading + decoration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-8 max-w-3xl">
          <ScrollReveal direction="up">
            <span
              className="inline-flex items-center gap-2 rounded-full border border-[#232328] bg-[#111113] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase text-white"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <ICONS.Eye className="size-3.5 text-[#ffc83d]" aria-hidden />
              Why this matters
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2
              id="pain-heading"
              className="mt-5 text-white"
              style={{
                fontSize: "clamp(2rem, 4.6vw, 3.4rem)",
                fontFamily: "var(--font-inter)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
              }}
            >
              Loyalty doesn&apos;t pay.{" "}
              <span className="text-[#ffc83d]">
                Your insurance hopes you stay quiet.
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.18}>
            <p className="mt-5 text-base sm:text-lg leading-[1.55] text-white">
              Most people are paying hundreds — sometimes thousands — more than
              they should. Insurers know it. We fix it.
            </p>
          </ScrollReveal>
          </div>
          <div className="lg:col-span-4 flex justify-center lg:justify-end relative">
            <div
              aria-hidden
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div
                className="h-72 w-72 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(closest-side, rgb(255 90 54 / 0.18), transparent 75%)",
                }}
              />
            </div>
            <ScrollZoom from={0.94} to={1.04} className="relative z-10 w-full max-w-[320px]">
              <div className="illu-float">
                <Image
                  src="/brand/illustrations/pain-overpay.webp"
                  alt="Worried client realizing they're overpaying $2,000 a year on insurance"
                  width={1024}
                  height={1024}
                  className="w-full h-auto"
                />
              </div>
              <FloatingOrbs variant="pain" />
            </ScrollZoom>
          </div>
        </div>

        {/* Stat cards */}
        <StaggerGroup
          className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6"
          delay={0.05}
        >
          {PAIN_POINTS.map((p) => {
            const Icon = ICONS[p.icon];
            return (
              <StaggerItem key={p.label}>
                <article
                  className="card-hover group relative h-full rounded-[12px] border border-[#232328] bg-[#111113] p-7 sm:p-9"
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-md bg-[#1a0e0a] text-[#ffc83d] border border-[#ffc83d]/30">
                    <Icon className="size-5" aria-hidden />
                  </span>

                  <div className="mt-7 flex items-baseline gap-1.5">
                    <span
                      className="text-5xl sm:text-6xl font-extrabold text-[#ffc83d] leading-none tracking-[-0.04em] tabular-nums"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      <CountUp value={p.stat} />
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {p.suffix}
                    </span>
                  </div>

                  <div
                    className="mt-5 text-[10px] uppercase tracking-[0.18em] font-bold text-white"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {p.label}
                  </div>
                  <p className="mt-2.5 text-[15px] leading-[1.55] text-white">
                    {p.description}
                  </p>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        {/* Closer */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="mt-14 flex flex-col items-center text-center gap-4">
            <p className="text-white/65 text-base sm:text-lg max-w-2xl">
              We monitor your premium continuously, so the second a better deal
              appears — we&apos;re on it. You stay paid less, forever.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default PainStats;
