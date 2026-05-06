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
          {/* LEFT — copy + table */}
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
                A snapshot of recent client wins — actual carriers, actual
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
                    Average across 1000+ clients
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
            <StaggerGroup className="mt-2 flex flex-col gap-2.5">
              {/* Header — desktop */}
              <div
                className="hidden sm:grid grid-cols-12 gap-3 px-5 text-[10px] uppercase tracking-[0.18em] font-semibold text-white"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <div className="col-span-4">Former Carrier</div>
                <div className="col-span-3 text-right">Before</div>
                <div className="col-span-3 text-right">After</div>
                <div className="col-span-2 text-right">Saved</div>
              </div>

              {SAVINGS.map((s, i) => (
                <StaggerItem key={s.carrier}>
                  <motion.div
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                    className="group relative grid grid-cols-2 sm:grid-cols-12 gap-3 items-center rounded-[8px] border border-[#232328] bg-[#111113] px-5 py-5 sm:py-4 hover:border-[#9a9aa3]/40 transition-colors duration-150 overflow-hidden"
                  >
                    <div
                      aria-hidden
                      className="absolute left-0 top-0 h-full w-1 bg-[#ffc83d] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300"
                    />

                    <div className="col-span-2 sm:col-span-4 flex items-center gap-3">
                      <span
                        className="inline-flex size-7 shrink-0 items-center justify-center rounded-md bg-[#1a1a1f] border border-[#232328] text-[11px] font-bold text-white tabular-nums"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="inline-flex h-16 w-24 sm:h-20 sm:w-28 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white p-2 ring-1 ring-[#232328]">
                        <Image
                          src={s.logo}
                          alt={`${s.carrier} logo`}
                          width={128}
                          height={80}
                          className="h-full w-full object-contain"
                        />
                      </span>
                      <span
                        className="min-w-0 font-semibold text-white text-base sm:text-lg leading-tight break-words"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {s.carrier}
                      </span>
                    </div>

                    <div className="sm:col-span-3 flex flex-col sm:items-end">
                      <span className="sm:hidden text-[10px] uppercase tracking-[0.18em] font-bold text-white">
                        Before
                      </span>
                      <span className="text-white line-through font-semibold tabular-nums">
                        {fmt(s.before)}
                      </span>
                    </div>

                    <div className="sm:col-span-3 flex flex-col sm:items-end">
                      <span className="sm:hidden text-[10px] uppercase tracking-[0.18em] font-bold text-white">
                        After
                      </span>
                      <span className="text-white font-bold tabular-nums">
                        {fmt(s.after)}
                      </span>
                    </div>

                    <div className="col-span-2 sm:col-span-2 sm:text-right">
                      <span
                        className="inline-flex items-center gap-1 rounded-full bg-[#0a1612] border border-[#4fe0b0]/30 px-3 py-1 text-[#4fe0b0] font-bold text-sm tabular-nums"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        −{fmt(s.saved)}
                      </span>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
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

          {/* RIGHT — savings illustration */}
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
                  alt="Before and after — client switched carriers and saved $1,534 annually with AiM"
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
