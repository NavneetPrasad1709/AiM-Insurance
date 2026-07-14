"use client";

import Link from "next/link";
import { m as motion } from "framer-motion";
import { ICONS } from "@/lib/icons";
import {
  AuroraStrands,
  GoldParticleField,
  GrainTexture,
  CornerOrnament,
} from "@/components/illustrations/ambience";
import { TrustStrip } from "@/components/sections/trust-strip";

export function AboutHero() {
  return (
    <section
      aria-labelledby="about-hero-heading"
      className="relative overflow-hidden bg-background pt-28 pb-24 sm:pt-32 sm:pb-32"
    >
      {/* Layered ambient backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <AuroraStrands opacity={0.32} />
        <GoldParticleField density={32} opacity={0.5} />
        <div className="absolute inset-x-0 -top-24 h-[480px] bg-gradient-blob opacity-70 blur-3xl" />
        <div
          className="absolute right-1/3 top-1/2 h-[420px] w-[420px] rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgb(79 224 176 / 0.15), transparent 70%)",
          }}
        />
        <GrainTexture opacity={0.06} />
      </div>
      <CornerOrnament position="tl" size={160} opacity={0.4} />
      <CornerOrnament position="tr" size={160} opacity={0.4} />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-1.5 text-sm text-text-muted">
            <li>
              <Link href="/" className="transition-colors hover:text-cta">
                Home
              </Link>
            </li>
            <ICONS.ChevronRight className="size-3" aria-hidden />
            <li className="text-text-secondary">About</li>
          </ol>
        </nav>

        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-cta"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cta opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-cta" />
            </span>
            Our story
          </motion.span>

          <motion.h1
            id="about-hero-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 font-heading font-extrabold text-white tracking-[-0.04em] leading-[0.98]"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.4rem)" }}
          >
            About{" "}
            <span className="relative inline-block">
              <span className="text-cta">AiM Insurance</span>
              <motion.svg
                aria-hidden
                viewBox="0 0 320 14"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-3 w-full"
              >
                <motion.path
                  d="M2 9 Q 80 1 160 6 T 318 7"
                  fill="none"
                  stroke="#ffc83d"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-7 max-w-2xl text-xl sm:text-2xl leading-[1.5] text-white"
          >
            We don&rsquo;t sell insurance. We{" "}
            <strong className="font-bold text-cta">negotiate</strong> what&rsquo;s
            best for you.
          </motion.p>
        </div>

        {/* Trust signals: Newswire-led */}
        <div className="relative mx-auto mt-12 max-w-4xl">
          <TrustStrip variant="full" />
        </div>
      </div>
    </section>
  );
}

export default AboutHero;
