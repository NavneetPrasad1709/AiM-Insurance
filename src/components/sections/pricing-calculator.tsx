"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { m as motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-effects";
import { ICONS } from "@/lib/icons";

const RULES = [
  {
    num: "25%",
    title: "Success Based Fee",
    body: "Of the annual savings we negotiate, on new or renewed policies.",
    featured: true,
  },
  {
    num: "$149",
    title: "Flat for New Policies",
    body: "One-time fee for any new insurance policy placement.",
  },
  {
    num: "$0",
    title: "No Savings, No Fee",
    body: "If we don't save you money, you don't pay a cent.",
  },
];

function fmt(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function PricingCalculator() {
  const [initial, setInitial] = useState("");
  const [negotiated, setNegotiated] = useState("");

  const { savings, fee, hasFee, percentSaved } = useMemo(() => {
    const i = Number(initial) || 0;
    const n = Number(negotiated) || 0;
    const s = Math.max(0, i - n);
    const f = s > 0 ? Math.round(s * 0.25) : 0;
    const pct = i > 0 && s > 0 ? Math.min(100, Math.round((s / i) * 100)) : 0;
    return { savings: s, fee: f, hasFee: s > 0, percentSaved: pct };
  }, [initial, negotiated]);

  const showSummary = initial !== "" || negotiated !== "";

  return (
    <section
      aria-labelledby="pricing-calc-heading"
      className="relative isolate overflow-hidden bg-background-cream py-14 sm:py-20 lg:py-24"
    >
      {/* Ambient gradients */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-20 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgb(255 200 61 / 0.18), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 -left-32 h-[420px] w-[420px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgb(79 224 176 / 0.10), transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-16 -right-24 h-[420px] w-[420px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgb(255 200 61 / 0.10), transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1080px] px-4 sm:px-8 lg:px-10">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center">
          <span
            className="inline-flex items-center gap-2 rounded-full border border-[#232328] bg-[#111113] px-3.5 py-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-white"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <ICONS.Sparkles className="size-3.5 text-[#ffc83d]" aria-hidden />
            Our Pricing Structure
          </span>
          <h2
            id="pricing-calc-heading"
            className="mt-5 text-white"
            style={{
              fontSize: "clamp(1.85rem, 4.4vw, 3rem)",
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
            }}
          >
            Designed As Per{" "}
            <span className="text-[#ffc83d]">Your Savings</span>
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-white leading-[1.55]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            No hidden costs. No surprises. You only pay when we deliver real
            results.
          </p>
        </ScrollReveal>

        {/* Pricing rule pills */}
        <ScrollReveal direction="up" delay={0.08}>
          <ul className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {RULES.map((r) => (
              <li
                key={r.num}
                className={
                  r.featured
                    ? "relative rounded-[12px] border border-[#ffc83d]/40 bg-gradient-to-br from-[#1a140a] to-[#111113] p-5 transition-transform duration-300 hover:-translate-y-0.5"
                    : "relative rounded-[12px] border border-[#232328] bg-[#111113] p-5 transition-transform duration-300 hover:-translate-y-0.5"
                }
              >
                {r.featured && (
                  <span
                    aria-hidden
                    className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#ffc83d]/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#ffc83d]"
                  >
                    Most common
                  </span>
                )}
                <span
                  className="block text-3xl sm:text-[2rem] font-extrabold tabular-nums text-[#ffc83d] tracking-[-0.04em] leading-none"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {r.num}
                </span>
                <strong
                  className="mt-3 block text-white text-sm sm:text-[15px] font-semibold"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {r.title}
                </strong>
                <p className="mt-1.5 text-xs sm:text-[13px] text-white leading-[1.5]">
                  {r.body}
                </p>
              </li>
            ))}
          </ul>
        </ScrollReveal>

        {/* Calculator hero card */}
        <ScrollReveal direction="up" delay={0.14}>
          <div className="relative mx-auto mt-10 max-w-2xl">
            {/* Outer glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-px rounded-[18px] opacity-80 blur-md"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,200,61,0.35), rgba(79,224,176,0.18) 60%, rgba(255,200,61,0.25))",
              }}
            />
            <div className="relative rounded-[18px] border border-[#ffc83d]/30 bg-gradient-to-br from-[#15110b] via-[#0e0e11] to-[#0a0a0a] p-6 sm:p-9 shadow-[0_30px_80px_-40px_rgba(255,200,61,0.45)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span
                  className="inline-flex items-center gap-2 rounded-full border border-[#ffc83d]/40 bg-[#ffc83d]/10 px-3 py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ffc83d]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  <ICONS.Calculator className="size-3.5" aria-hidden />
                  AiM Fee Calculator
                </span>
                {hasFee && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#4fe0b0]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    <span className="inline-block size-1.5 rounded-full bg-[#4fe0b0]" />
                    Saving {percentSaved}%
                  </motion.span>
                )}
              </div>

              <h3
                className="mt-4 text-white"
                style={{
                  fontSize: "clamp(1.4rem, 2.6vw, 1.85rem)",
                  fontFamily: "var(--font-inter)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                Calculate your{" "}
                <span className="text-[#ffc83d]">exact fee</span>
              </h3>
              <p
                className="mt-2 text-xs sm:text-sm text-white"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Enter both premiums. The math runs live.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <CalcField
                  label="Initial Annual Premium"
                  placeholder="2500"
                  value={initial}
                  onChange={setInitial}
                />
                <CalcField
                  label="AiM Negotiated Premium"
                  placeholder="2000"
                  value={negotiated}
                  onChange={setNegotiated}
                  highlight
                />
              </div>

              {/* Result hero */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
                <ResultBlock
                  label="Your Savings"
                  value={showSummary ? fmt(savings) : "$0"}
                  tone="green"
                  active={showSummary && savings > 0}
                />
                <ResultBlock
                  label="AiM Service Fee"
                  value={showSummary ? fmt(fee) : "$0"}
                  tone="gold"
                  active={showSummary && fee > 0}
                  hint="25% of savings"
                />
              </div>

              {/* Mini summary line */}
              {showSummary && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="mt-4 text-center text-[11px] sm:text-xs text-white tabular-nums"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {fmt(Number(initial) || 0)}
                  <span aria-hidden className="mx-2 text-white">→</span>
                  {fmt(Number(negotiated) || 0)}
                </motion.p>
              )}

              {/* CTA */}
              <AnimatePresence mode="wait" initial={false}>
                {hasFee ? (
                  <motion.div
                    key="paid"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="mt-6"
                  >
                    <Link
                      href="/contact?intent=quote"
                      className="btn-shine cta-primary inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 font-semibold text-sm sm:text-base"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      <ICONS.CreditCard className="size-4" aria-hidden />
                      Proceed with Payment
                    </Link>
                    <p className="mt-2.5 text-center text-[11px] text-white">
                      🔒 Secured via PayPal · No commitment
                    </p>
                  </motion.div>
                ) : showSummary ? (
                  <motion.div
                    key="zero"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[10px] border border-[#4fe0b0]/30 bg-[#0a1612] px-4 py-3.5 text-xs sm:text-sm font-semibold text-[#b8d96e] text-center"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    <ICONS.CheckCircle2 className="size-4 shrink-0" aria-hidden />
                    No savings detected, no fee applies
                  </motion.div>
                ) : (
                  <motion.p
                    key="hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 text-center text-xs text-white"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Enter your premiums above to see your fee instantly
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </ScrollReveal>

        {/* Footnote + concierge CTA */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="mx-auto mt-8 max-w-2xl text-center">
            <p
              className="text-[11px] sm:text-xs text-white leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Fees payable once the new premium is shared. Our team handles
              the switch and policy update upon receipt.
            </p>
            <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/request-a-concierge"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[#ffc83d] hover:text-[#ffd966] transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Or request a concierge instead
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function CalcField({
  label,
  placeholder,
  value,
  onChange,
  highlight,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  highlight?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span
        className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-semibold text-white"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {label}
      </span>
      <span className="relative inline-flex items-center">
        <span
          className="pointer-events-none absolute left-3.5 text-base font-bold text-[#ffc83d]"
          style={{ fontFamily: "var(--font-inter)" }}
          aria-hidden
        >
          $
        </span>
        <input
          type="number"
          inputMode="numeric"
          min={0}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={
            highlight
              ? "w-full rounded-[10px] border border-[#ffc83d]/40 bg-[#0a0a0a] py-3 pl-8 pr-3 text-base sm:text-lg font-semibold text-white placeholder:text-white/25 outline-none focus:border-[#ffc83d] focus:ring-2 focus:ring-[#ffc83d]/30 tabular-nums transition-colors"
              : "w-full rounded-[10px] border border-[#232328] bg-[#0a0a0a] py-3 pl-8 pr-3 text-base sm:text-lg font-semibold text-white placeholder:text-white/25 outline-none focus:border-[#ffc83d] focus:ring-2 focus:ring-[#ffc83d]/30 tabular-nums transition-colors"
          }
          style={{ fontFamily: "var(--font-inter)" }}
        />
      </span>
    </label>
  );
}

function ResultBlock({
  label,
  value,
  tone,
  active,
  hint,
}: {
  label: string;
  value: string;
  tone: "green" | "gold";
  active?: boolean;
  hint?: string;
}) {
  const accent = tone === "green" ? "#4fe0b0" : "#ffc83d";
  const bgGradient =
    tone === "green"
      ? "linear-gradient(135deg, rgba(79,224,176,0.10), rgba(79,224,176,0) 70%)"
      : "linear-gradient(135deg, rgba(255,200,61,0.14), rgba(255,200,61,0) 70%)";

  return (
    <div
      className="relative rounded-[12px] border p-4 sm:p-5 transition-colors"
      style={{
        borderColor: active ? `${accent}66` : "#232328",
        background: active
          ? `${bgGradient}, #0a0a0a`
          : "#0a0a0a",
      }}
    >
      <span
        className="block text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-white"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {label}
      </span>
      <motion.span
        key={value}
        initial={active ? { opacity: 0, y: 4 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="mt-2 block text-2xl sm:text-[2rem] font-extrabold tabular-nums tracking-[-0.03em] leading-none"
        style={{
          fontFamily: "var(--font-inter)",
          color: active ? accent : "rgba(255,255,255,0.45)",
        }}
      >
        {value}
      </motion.span>
      {hint && (
        <span
          className="mt-1.5 block text-[10px] sm:text-[11px] text-white"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {hint}
        </span>
      )}
    </div>
  );
}

export default PricingCalculator;
