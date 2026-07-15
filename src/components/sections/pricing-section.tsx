"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/ui/scroll-effects";
import { FloatingOrbs } from "@/components/illustrations/floating-orbs";
import { ICONS } from "@/lib/icons";

interface Tier {
  badge?: string;
  amount: string;
  unit: string;
  title: string;
  description: string;
  bullets: string[];
  highlight?: boolean;
  cta: string;
  ctaHref: string;
}

const TIERS: Tier[] = [
  {
    amount: "25%",
    unit: "of savings",
    title: "Success Fee",
    description:
      "On annual savings we secure for new or renewed policies. You only pay when we save you money.",
    bullets: [
      "Pay only when you save",
      "Applies to new + renewed policies",
      "No upfront commitment",
    ],
    cta: "Get a free quote",
    ctaHref: "/contact",
  },
  {
    amount: "$149",
    unit: "flat",
    title: "New Policy",
    description:
      "Simple, predictable fee for placing a brand new policy with the best carrier we negotiate.",
    bullets: [
      "Flat $149, no surprises",
      "Best carrier match",
      "Concierge handles the switch",
    ],
    cta: "Start my negotiation",
    ctaHref: "/contact",
  },
  {
    amount: "$0",
    unit: "no savings, no fee",
    title: "Risk-Free",
    description:
      "If we can’t beat your current premium, you owe absolutely nothing. Zero. Never.",
    bullets: [
      "$0 if no savings found",
      "No card needed up front",
      "Cancel any time",
    ],
    cta: "Try risk-free",
    ctaHref: "/contact",
  },
];

export function PricingSection() {
  return (
    <section
      aria-labelledby="pricing-heading"
      id="pricing"
      className="relative bg-background py-14 sm:py-20 lg:py-24 overflow-hidden"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/4 left-1/2 h-[640px] w-[800px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgb(255 200 61 / 0.16), rgb(255 200 61 / 0.10) 55%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal direction="up">
            <span
              className="inline-flex items-center gap-2 rounded-full border border-[#232328] bg-[#111113] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase text-white"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <ICONS.HeartHandshake className="size-3.5 text-[#ffc83d]" aria-hidden />
              Pricing aligned with savings
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2
              id="pricing-heading"
              className="mt-5 text-white"
              style={{
                fontSize: "clamp(2rem, 4.6vw, 3.4rem)",
                fontFamily: "var(--font-inter)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
              }}
            >
              You only pay{" "}
              <span className="text-[#ffc83d]">when we save you money.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.18}>
            <p className="mt-5 text-base sm:text-lg text-white leading-[1.55]">
              No upfront fees. No subscriptions. No tricks. Three clean options,
              pick the one that fits your situation.
            </p>
          </ScrollReveal>
        </div>

        {/* Tiers */}
        <StaggerGroup
          className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto items-stretch"
          delay={0.05}
        >
          {TIERS.map((t) => (
            <StaggerItem key={t.title} className="h-full">
              <article
                className={`card-hover ${t.highlight ? "card-hover-strong" : ""} relative h-full flex flex-col rounded-[12px] p-7 lg:p-8 ${
                  t.highlight
                    ? "bg-[#160d09] border border-[#ffc83d]/40 lg:scale-[1.02]"
                    : "bg-[#111113] border border-[#232328]"
                }`}
              >
                {t.badge && (
                  <span
                    className="absolute top-5 right-5 inline-flex items-center gap-1 rounded-full bg-[#ffc83d] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0a0a0a]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    <ICONS.Sparkles className="size-3" aria-hidden />
                    {t.badge}
                  </span>
                )}

                {/* Decoration: AI-generated guarantee illustration for the $0 risk-free tier */}
                {t.amount === "$0" && (
                  <div className="absolute -top-2 -right-2 w-28 h-28 sm:w-32 sm:h-32">
                    <div className="relative w-full h-full pointer-events-none">
                      <Image
                        src="/brand/illustrations/guarantee-zero.webp"
                        alt=""
                        width={1024}
                        height={1024}
                        className="w-full h-auto"
                      />
                      <FloatingOrbs variant="pricing" />
                    </div>
                  </div>
                )}

                {/* Title */}
                <div
                  className="text-[10px] uppercase tracking-[0.18em] font-bold text-white"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {t.title}
                </div>

                {/* Amount */}
                <div className="mt-3 flex items-baseline gap-2">
                  <span
                    className={`font-extrabold leading-none tracking-[-0.04em] tabular-nums ${
                      t.highlight ? "text-[#ffc83d]" : "text-white"
                    }`}
                    style={{
                      fontSize: "clamp(3.2rem, 6vw, 4.5rem)",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    {t.amount}
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {t.unit}
                  </span>
                </div>

                <p className="mt-4 text-[15px] leading-[1.55] text-white min-h-[60px]">
                  {t.description}
                </p>

                <ul className="mt-6 flex flex-col gap-3 flex-1">
                  {t.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-[15px] text-white"
                    >
                      <span
                        className={`mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full ${
                          t.highlight
                            ? "bg-[#ffc83d]/15 text-[#ffc83d]"
                            : "bg-[#0a1612] text-[#4fe0b0] border border-[#4fe0b0]/30"
                        }`}
                      >
                        <ICONS.CheckCircle2 className="size-3.5" aria-hidden />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>

                <Link
                  href={t.ctaHref}
                  className={`mt-7 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold text-sm transition-all duration-150 ${
                    t.highlight
                      ? "btn-shine cta-primary"
                      : "border border-[#232328] bg-[#1a1a1f] hover:bg-[#232328] hover:border-[#9a9aa3]/40 text-white"
                  }`}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {t.cta}
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
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Footnote */}
        <ScrollReveal direction="up" delay={0.2}>
          <p className="mt-12 text-sm text-white max-w-2xl mx-auto text-center">
            Fees are payable once your new premium is shared. Our team handles
            the switch and update on your behalf, zero hassle.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default PricingSection;
