"use client";

import Image from "next/image";
import { m as motion } from "framer-motion";
import { ScrollReveal, ScrollZoom, StaggerGroup, StaggerItem } from "@/components/ui/scroll-effects";
import { PremiumGauge } from "@/components/illustrations/decorations";
import { FloatingOrbs } from "@/components/illustrations/floating-orbs";
import { FloatingCardsBackdrop } from "@/components/illustrations/ambience";
import { useQuoteModal } from "@/lib/quote-modal-context";
import { ICONS } from "@/lib/icons";

interface SavingsRow {
  carrier: string;
  logo: string;
  before: number;
  after: number;
  saved: number;
}

const SAVINGS: SavingsRow[] = [
  { carrier: "Allstate", logo: "/brand/carriers/allstate.png", before: 3214, after: 2400, saved: 814 },
  { carrier: "Endurance", logo: "/brand/carriers/endurance.png", before: 4650, after: 3375, saved: 1275 },
  { carrier: "GEICO", logo: "/brand/carriers/geico.png", before: 3987, after: 2775, saved: 1212 },
  { carrier: "USAA", logo: "/brand/carriers/usaa.png", before: 3120, after: 2104, saved: 1016 },
];

function fmt(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function CarrierSavings() {
  const { openModal } = useQuoteModal();
  return (
    <section
      aria-labelledby="savings-heading"
      className="relative bg-background-cream py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Ambient gradients */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 right-1/4 h-[420px] w-[420px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgb(255 200 61 / 0.18), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 -left-32 h-[480px] w-[480px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgb(79 224 176 / 0.14), transparent 70%)",
          }}
        />
        {/* Drifting frosted-glass cards backdrop */}
        <FloatingCardsBackdrop opacity={0.18} />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT - copy + table */}
          <div className="lg:col-span-7 flex flex-col gap-7">
            <ScrollReveal direction="up">
              <span
                className="inline-flex w-fit items-center gap-2 rounded-full border border-[#232328] bg-[#111113] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase text-white"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <ICONS.CheckCircle2 className="size-3.5 text-[#ffc83d]" aria-hidden />
                Real client receipts
              </span>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.08}>
              <h2
                id="savings-heading"
                className="text-white"
                style={{
                  fontSize: "clamp(2rem, 4.4vw, 3.2rem)",
                  fontFamily: "var(--font-inter)",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.05,
                }}
              >
                Same coverage.{" "}
                <span
                  style={{
                    background: "linear-gradient(120deg, #ffc83d 0%, #ffc83d 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Lower premium.
                </span>{" "}
                Year after year.
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.16}>
              <p className="text-white text-base sm:text-lg leading-[1.55] max-w-xl">
                A snapshot of recent client wins, actual carriers, actual
                annual savings, identical coverage.
              </p>
            </ScrollReveal>

            {/* Summary gauge card */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="mt-4 flex items-center gap-5 rounded-[12px] border border-[#232328] bg-[#111113] p-5 max-w-md">
                <PremiumGauge size={150} percent={31} />
                <div className="flex flex-col">
                  <span
                    className="text-[10px] uppercase tracking-[0.18em] font-bold text-white"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Average across 1100+ clients
                  </span>
                  <span
                    className="mt-1.5 text-2xl font-extrabold text-white tabular-nums leading-tight"
                    style={{
                      fontFamily: "var(--font-inter)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    $1,247/yr
                  </span>
                  <span className="mt-0.5 text-xs text-white">
                    Same coverage. Same carriers.
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* Savings rows */}
            <StaggerGroup className="mt-2 flex flex-col gap-3">
              {/* Header - desktop */}
              <div
                className="hidden sm:grid grid-cols-12 gap-4 px-6 text-[10px] uppercase tracking-[0.22em] font-semibold text-white/90"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <div className="col-span-5">Former Carrier</div>
                <div className="col-span-2 text-right">Before</div>
                <div className="col-span-2 text-right">After</div>
                <div className="col-span-3 text-right">You Saved</div>
              </div>

              {SAVINGS.map((s, i) => {
                const pct = Math.round((s.saved / s.before) * 100);
                return (
                  <StaggerItem key={s.carrier}>
                    <motion.div
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="group relative grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-4 sm:items-center rounded-[12px] border border-[#232328] bg-gradient-to-br from-[#13131a] via-[#111113] to-[#0d0d10] px-5 py-4 sm:px-6 sm:py-5 hover:border-[#ffc83d]/40 hover:shadow-[0_18px_50px_-30px_rgba(255,200,61,0.45)] transition-[border-color,box-shadow,transform] duration-300 overflow-hidden"
                    >
                      {/* Left accent strip on hover */}
                      <div
                        aria-hidden
                        className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#ffc83d] via-[#ffc83d]/60 to-transparent scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-400"
                      />

                      {/* Carrier identity */}
                      <div className="sm:col-span-5 flex items-center gap-4 min-w-0">
                        <span
                          className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-[#0a0a0a] ring-1 ring-[#232328] text-[10px] font-bold tabular-nums text-[#ffc83d]"
                          style={{ fontFamily: "var(--font-inter)" }}
                          aria-hidden
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="inline-flex size-12 sm:size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-2 ring-1 ring-[#232328] shadow-[inset_0_-1px_0_rgba(0,0,0,0.05)]">
                          <Image
                            src={s.logo}
                            alt={`${s.carrier} logo`}
                            width={96}
                            height={96}
                            className="h-full w-full object-contain"
                          />
                        </span>
                        <div className="min-w-0 flex flex-col gap-0.5">
                          <span
                            className="font-bold text-white text-base sm:text-lg leading-tight tracking-[-0.01em] truncate"
                            style={{ fontFamily: "var(--font-inter)" }}
                            title={s.carrier}
                          >
                            {s.carrier}
                          </span>
                          <span className="text-[11px] sm:text-xs text-white/90 uppercase tracking-[0.16em] font-semibold">
                            Switched · {pct}% off
                          </span>
                        </div>
                      </div>

                      {/* Mobile: before/after/saved row */}
                      <div className="grid grid-cols-3 gap-3 sm:hidden border-t border-[#232328] pt-3">
                        <div className="flex flex-col gap-1">
                          <span className="text-[9px] uppercase tracking-[0.18em] font-bold text-white/90">
                            Before
                          </span>
                          <span className="text-white/90 line-through font-semibold tabular-nums text-sm">
                            {fmt(s.before)}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[9px] uppercase tracking-[0.18em] font-bold text-white/90">
                            After
                          </span>
                          <span className="text-white font-bold tabular-nums text-sm">
                            {fmt(s.after)}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1 items-end">
                          <span className="text-[9px] uppercase tracking-[0.18em] font-bold text-[#4fe0b0]/80">
                            Saved
                          </span>
                          <span
                            className="inline-flex items-center rounded-full bg-[#0a1612] border border-[#4fe0b0]/40 px-2.5 py-0.5 text-[#4fe0b0] font-bold text-xs tabular-nums"
                            style={{ fontFamily: "var(--font-inter)" }}
                          >
                            −{fmt(s.saved)}
                          </span>
                        </div>
                      </div>

                      {/* Desktop: before */}
                      <div className="hidden sm:flex sm:col-span-2 justify-end">
                        <span className="text-white/90 line-through font-semibold tabular-nums text-[15px]">
                          {fmt(s.before)}
                        </span>
                      </div>

                      {/* Desktop: after */}
                      <div className="hidden sm:flex sm:col-span-2 justify-end items-center gap-2">
                        <ICONS.ArrowRight className="size-3.5 text-[#ffc83d]/70 shrink-0" aria-hidden />
                        <span className="text-white font-bold tabular-nums text-[15px]">
                          {fmt(s.after)}
                        </span>
                      </div>

                      {/* Desktop: saved */}
                      <div className="hidden sm:flex sm:col-span-3 justify-end">
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#0a1612] to-[#0d1a14] border border-[#4fe0b0]/40 px-3.5 py-1.5 text-[#4fe0b0] font-extrabold text-sm tabular-nums shadow-[0_6px_20px_-10px_rgba(79,224,176,0.5)]"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          <ICONS.TrendingUp className="size-3.5" aria-hidden />
                          −{fmt(s.saved)}
                        </span>
                      </div>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => openModal()}
                  className="btn-shine cta-primary inline-flex items-center gap-2 px-7 py-3.5 font-semibold"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Show me my number
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
                </button>
                <span className="text-sm text-white">
                  5 min · No obligation
                </span>
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT - savings illustration */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div
              aria-hidden
              className="absolute inset-0 flex items-center justify-center"
            >
              <div
                className="h-[440px] w-[440px] rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(closest-side, rgb(255 200 61 / 0.25), rgb(255 200 61 / 0.15) 55%, transparent 80%)",
                }}
              />
            </div>
            <ScrollZoom from={0.92} to={1.05} className="relative z-10 w-full max-w-[480px]">
              <div className="illu-float">
                <Image
                  src="/brand/illustrations/savings-comparison.webp"
                  alt="Before and after: client switched carriers and saved $1,534 annually with AiM"
                  width={1024}
                  height={1024}
                  sizes="(min-width: 1024px) 480px, 92vw"
                  className="w-full h-auto"
                />
              </div>
              <FloatingOrbs variant="savings" />
            </ScrollZoom>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CarrierSavings;
