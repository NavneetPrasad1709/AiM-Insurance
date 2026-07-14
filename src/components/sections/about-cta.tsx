"use client";

import Link from "next/link";
import { m as motion } from "framer-motion";
import { useQuoteModal } from "@/lib/quote-modal-context";
import { ICONS } from "@/lib/icons";
import {
  GoldParticleField,
  CornerOrnament,
  GrainTexture,
} from "@/components/illustrations/ambience";

export function AboutCta() {
  const { openModal } = useQuoteModal();

  return (
    <section
      aria-labelledby="about-cta-heading"
      className="relative overflow-hidden bg-background border-t border-border py-14 sm:py-20"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-blob blur-3xl" />
        <GoldParticleField density={28} opacity={0.55} />
        <GrainTexture opacity={0.06} />
      </div>
      <CornerOrnament position="tl" size={160} opacity={0.35} />
      <CornerOrnament position="tr" size={160} opacity={0.35} />
      <CornerOrnament position="bl" size={160} opacity={0.35} />
      <CornerOrnament position="br" size={160} opacity={0.35} />

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-cta"
        >
          <span className="size-1.5 rounded-full bg-cta" />
          Ready when you are
        </motion.span>

        <motion.h2
          id="about-cta-heading"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mt-5 font-heading font-extrabold text-white tracking-[-0.04em] leading-[1]"
          style={{ fontSize: "clamp(2.4rem, 5.6vw, 4rem)" }}
        >
          Ready to start saving?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.16 }}
          className="mt-6 text-base sm:text-lg leading-relaxed text-white"
        >
          Book a 15-minute call or send us your declarations page. Either way,
          we&rsquo;ll tell you exactly what you can save, no obligation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <button
            type="button"
            onClick={() => openModal()}
            className="btn-shine cta-primary inline-flex w-full items-center justify-center gap-2 px-8 py-4 text-base font-heading font-semibold sm:w-auto"
          >
            Get my free quote
            <ICONS.ArrowRight className="size-4" aria-hidden />
          </button>
          <Link
            href="/contact?intent=call"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-surface px-7 py-4 text-base font-heading font-semibold text-white transition-colors duration-150 hover:border-text-secondary/40 hover:bg-surface-2 sm:w-auto"
          >
            <ICONS.Phone className="size-4 text-cta" aria-hidden />
            Book a call
          </Link>
        </motion.div>

        <p className="mt-6 text-xs font-heading font-semibold tabular-nums text-white/90">
          $0 if no savings · No obligation · Results in 24 hours
        </p>
      </div>
    </section>
  );
}

export default AboutCta;
