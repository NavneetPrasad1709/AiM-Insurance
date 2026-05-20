"use client";

import Image from "next/image";
import Link from "next/link";
import { m as motion, useReducedMotion } from "framer-motion";
import { CountUp } from "@/components/ui/count-up";
import { ScrollZoom } from "@/components/ui/scroll-effects";
import { FloatingOrbs } from "@/components/illustrations/floating-orbs";
import { GoldParticleField, GrainTexture } from "@/components/illustrations/ambience";
import { useQuoteModal } from "@/lib/quote-modal-context";
import { ICONS } from "@/lib/icons";

const EASE = [0.16, 1, 0.3, 1] as const;

const TRUST_PILLS = [
  { icon: "Shield" as const, label: "BBB Accredited" },
  { icon: "Star" as const, label: "Google 5.0" },
  { icon: "Award" as const, label: "Featured · Newswire" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const { openModal } = useQuoteModal();

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-background"
    >
      {/* Layered ambient gradients — eye-pleasing on black */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* Warm Ember/Citrine wash top-right */}
        <div
          className="absolute -top-32 -right-32 h-[720px] w-[720px] rounded-full blur-3xl animate-blob-slow"
          style={{
            background:
              "radial-gradient(closest-side, rgb(255 200 61 / 0.45), rgb(255 200 61 / 0.25) 55%, transparent 75%)",
          }}
        />
        {/* Cool blue/teal wash bottom-left */}
        <div
          className="absolute -bottom-40 -left-40 h-[640px] w-[640px] rounded-full blur-3xl animate-blob"
          style={{
            background:
              "radial-gradient(closest-side, rgb(4 107 210 / 0.35), rgb(79 224 176 / 0.18) 55%, transparent 75%)",
          }}
        />
        {/* Citrine spotlight upper-left soft */}
        <div
          className="absolute top-1/4 left-1/3 h-80 w-80 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgb(255 200 61 / 0.18), transparent 70%)",
          }}
        />
        {/* Hairline grid masked */}
        <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        {/* Drifting gold particles across full hero */}
        <GoldParticleField density={28} opacity={0.5} />
        {/* Subtle film grain for tactility */}
        <GrainTexture opacity={0.08} />
      </div>

      <div className="relative mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-10 pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* LEFT — copy */}
          <div className="lg:col-span-6 flex flex-col gap-5 sm:gap-6 relative z-10">


            {/* H1 */}
            <h1
              id="hero-heading"
              className="text-white"
              style={{
                fontSize: "clamp(2rem, 4.8vw, 4rem)",
                fontFamily: "var(--font-inter)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
              }}
            >
              <motion.span {...fadeUp(0.05)} className="block">
                Never overpay
              </motion.span>
              <motion.span {...fadeUp(0.12)} className="block">
                your insurance
              </motion.span>
              <motion.span {...fadeUp(0.2)} className="block">
                premiums.{" "}
                <span
                  style={{
                    background: "linear-gradient(120deg, #ffc83d 0%, #ffc83d 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Ever.
                </span>
              </motion.span>
            </h1>

            {/* Sub */}
            <motion.p
              {...fadeUp(0.3)}
              className="max-w-xl text-[17px] sm:text-lg leading-[1.55] text-[#b0b5c2]"
            >
              A dedicated concierge that negotiates lower premiums while
              keeping the same coverage you already trust. Clients save{" "}
              <span className="font-semibold text-[#ffc83d] tabular-nums">
                <CountUp value="$1,247" />
                /yr
              </span>{" "}
              on average — same coverage, lower cost.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...fadeUp(0.4)}
              className="flex flex-col sm:flex-row flex-wrap gap-3 pt-1"
            >
              <button
                type="button"
                onClick={() => openModal()}
                className="btn-shine cta-primary inline-flex items-center justify-center gap-2 px-7 py-4 font-semibold text-base"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <span>Get my free quote</span>
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
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#232328] bg-[#111113] hover:border-[#9a9aa3]/50 hover:bg-[#1a1a1f] text-white px-7 py-4 font-semibold text-base transition-colors duration-150"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <ICONS.Phone className="size-4 text-[#ffc83d]" aria-hidden />
                Book a 15-min call
              </Link>
            </motion.div>

            {/* Risk reversal */}
            <motion.div
              {...fadeUp(0.5)}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[#4fe0b0]/30 bg-[#0a1612] px-4 py-2 text-[13px]"
            >
              <ICONS.CheckCircle2 className="size-4 text-[#4fe0b0]" aria-hidden />
              <span className="font-semibold text-[#e8e8ec] tabular-nums">
                $0 if no savings · No upfront cost · Takes 5 min
              </span>
            </motion.div>

            {/* Trust mini-strip */}
            <motion.div
              {...fadeUp(0.6)}
              className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-3"
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex" role="img" aria-label="5 star rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <ICONS.Star
                      key={i}
                      className="size-3.5 fill-[#ffc83d] text-[#ffc83d]"
                      aria-hidden
                    />
                  ))}
                </span>
                <span className="text-sm font-semibold text-[#e8e8ec] tabular-nums">
                  1000+
                </span>
                <span className="text-sm text-white">
                  clients · USA · Canada · UAE
                </span>
              </div>
              <div className="hidden sm:block h-3.5 w-px bg-[#232328]" />
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-white">
                {TRUST_PILLS.map((p) => {
                  const Icon = ICONS[p.icon];
                  return (
                    <li
                      key={p.label}
                      className="inline-flex items-center gap-1.5"
                    >
                      <Icon className="size-3.5 text-[#ffc83d]" aria-hidden />
                      {p.label}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </div>

          {/* RIGHT — hero illustration with floating orbs */}
          <div className="lg:col-span-6 relative flex items-center justify-center w-full">
            {/* Soft ambient backdrop — image has its own halo, this is just floor glow */}
            <div aria-hidden className="absolute inset-0 flex items-center justify-center">
              <div
                className="h-[60%] w-[80%] max-h-[520px] max-w-[640px] rounded-full blur-3xl animate-blob"
                style={{
                  background:
                    "radial-gradient(closest-side, rgb(255 200 61 / 0.18), transparent 75%)",
                }}
              />
            </div>

            {/* Animated floating coins / sparkles around the hero */}
            <FloatingOrbs variant="hero" />

            <ScrollZoom from={0.96} to={1.02} className="relative z-10 w-full">
              <motion.div
                initial={{ opacity: 0, scale: reduce ? 1 : 0.96, y: reduce ? 0 : 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
                className="w-full"
              >
                <div className="illu-float">
                  <Image
                    src="/brand/illustrations/hero-driver.webp"
                    alt="AiM client and a $1,247/yr savings card — same coverage, lower premium"
                    width={1600}
                    height={1200}
                    priority
                    sizes="(max-width: 1024px) 92vw, 50vw"
                    className="relative z-10 w-full h-auto max-w-[640px] lg:max-w-none mx-auto"
                  />
                </div>
              </motion.div>
            </ScrollZoom>
          </div>
        </div>

        {/* Bottom carrier marquee — social proof on every screen */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <p
            className="text-center text-[10px] uppercase tracking-[0.22em] font-semibold text-white mb-4"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            We negotiate with the carriers you already trust
          </p>
          <div
            className="marquee-pause overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%)",
            }}
          >
            <div className="flex w-max items-center gap-12 animate-marquee-slow">
              {[
                "AAA",
                "Farmers",
                "Travelers",
                "GEICO",
                "Liberty Mutual",
                "Erie",
                "Allstate",
                "Progressive",
                "Nationwide",
                "USAA",
              ]
                .concat([
                  "AAA",
                  "Farmers",
                  "Travelers",
                  "GEICO",
                  "Liberty Mutual",
                  "Erie",
                  "Allstate",
                  "Progressive",
                  "Nationwide",
                  "USAA",
                ])
                .map((p, i) => (
                  <span
                    key={`${p}-${i}`}
                    className="inline-flex shrink-0 items-center gap-12 text-sm font-semibold uppercase tracking-[0.18em] text-white hover:text-white transition-colors duration-150"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {p}
                    <span aria-hidden className="text-[#232328]">
                      ●
                    </span>
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
