"use client";

import Image from "next/image";
import Link from "next/link";
import { m as motion } from "framer-motion";
import { ScrollReveal, ScrollZoom } from "@/components/ui/scroll-effects";
import { FloatingOrbs } from "@/components/illustrations/floating-orbs";
import {
  GoldParticleField,
  CornerOrnament,
  GrainTexture,
} from "@/components/illustrations/ambience";
import { useQuoteModal } from "@/lib/quote-modal-context";
import { ICONS } from "@/lib/icons";

export function CtaBanner() {
  const { openModal } = useQuoteModal();
  return (
    <section
      aria-labelledby="cta-banner-heading"
      className="relative bg-background py-28 sm:py-36 lg:py-48 overflow-hidden"
    >
      {/* Single ambient — soft Ember radial */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[640px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-blob blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-[#232328]" />
        {/* Drifting gold particles for celebratory feel */}
        <GoldParticleField density={32} opacity={0.55} />
        {/* Subtle grain */}
        <GrainTexture opacity={0.08} />
      </div>
      {/* Decorative corner ornaments framing the CTA */}
      <CornerOrnament position="tl" size={180} opacity={0.4} />
      <CornerOrnament position="tr" size={180} opacity={0.4} />
      <CornerOrnament position="bl" size={180} opacity={0.4} />
      <CornerOrnament position="br" size={180} opacity={0.4} />

      <div className="relative mx-auto max-w-3xl px-5 sm:px-8 lg:px-12 text-center">

        {/* Family illustration with celebratory floating coins */}
        <ScrollZoom from={0.96} to={1.02} className="relative mx-auto w-full max-w-[520px] mb-2">
          <div className="illu-float-slow">
            <Image
              src="/brand/illustrations/cta-family.webp"
              alt="Happy AiM family standing beside their car — same coverage, lower premium"
              width={1024}
              height={768}
              sizes="(min-width: 640px) 520px, 92vw"
              className="w-full h-auto"
            />
          </div>
          <FloatingOrbs variant="cta" />
        </ScrollZoom>

        <ScrollReveal direction="up">
          <span
            className="inline-flex items-center gap-2 rounded-full border border-[#232328] bg-[#111113] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <span className="size-1.5 rounded-full bg-[#ffc83d]" />
            Ready to save?
          </span>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.1}>
          <h2
            id="cta-banner-heading"
            className="mt-5 text-white"
            style={{
              fontSize: "clamp(2.4rem, 5.6vw, 4.4rem)",
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            Stop overpaying.{" "}
            <span className="text-[#ffc83d]">Start saving today.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <p className="mt-6 text-base sm:text-lg text-white leading-[1.55]">
            Join{" "}
            <span className="font-semibold text-white tabular-nums">
              800+ clients
            </span>{" "}
            across US, Canada, and UAE who trust AiM to negotiate better rates
            — same coverage, lower cost.
          </p>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <button
            type="button"
            onClick={() => openModal()}
            className="btn-shine cta-primary inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 text-base font-semibold"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Get my free quote
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
          <Link
            href="/contact?intent=call"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-[#232328] bg-[#111113] hover:border-[#9a9aa3]/40 hover:bg-[#1a1a1f] text-white px-7 py-4 text-base font-semibold transition-colors duration-150"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <ICONS.Phone className="size-4 text-[#ffc83d]" aria-hidden />
            Book a 15-min call
          </Link>
        </motion.div>

        <ScrollReveal direction="up" delay={0.4}>
          <p className="mt-6 text-xs text-white font-semibold tabular-nums">
            $0 if no savings · No obligation · Results in 24 hours
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default CtaBanner;
