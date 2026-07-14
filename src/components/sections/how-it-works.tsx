"use client";

import Image from "next/image";
import { ScrollReveal, ScrollStack } from "@/components/ui/scroll-effects";
import { FloatingOrbs } from "@/components/illustrations/floating-orbs";
import { SectionDividerArc } from "@/components/illustrations/ambience";
import { useQuoteModal } from "@/lib/quote-modal-context";
import { PROCESS_STEPS } from "@/lib/constants";
import { ICONS, getIcon } from "@/lib/icons";

export function HowItWorks() {
  const { openModal } = useQuoteModal();
  return (
    <section
      aria-labelledby="how-heading"
      id="how-it-works"
      className="relative bg-background-cream py-24 sm:py-32 lg:py-40"
    >
      {/* Decorative arc divider entering this section */}
      <div className="pointer-events-none absolute inset-x-0 top-0">
        <SectionDividerArc />
      </div>

      {/* Ambient orbs wrapped in their own clipped layer so sticky still works */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-clip"
      >
        <div
          className="absolute top-1/4 -right-40 h-[460px] w-[460px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgb(255 200 61 / 0.16), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 -left-40 h-[460px] w-[460px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgb(255 200 61 / 0.16), transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        {/* Heading */}
        <div className="max-w-3xl">
          <ScrollReveal direction="up">
            <span
              className="inline-flex items-center gap-2 rounded-full border border-[#232328] bg-[#111113] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase text-white"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <ICONS.Sparkles className="size-3.5 text-[#ffc83d]" aria-hidden />
              How it works
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2
              id="how-heading"
              className="mt-5 text-white"
              style={{
                fontSize: "clamp(2rem, 4.6vw, 3.4rem)",
                fontFamily: "var(--font-inter)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
              }}
            >
              Four steps.{" "}
              <span className="text-[#ffc83d]">One lower premium.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.18}>
            <p className="mt-5 text-base sm:text-lg text-white leading-[1.55]">
              Send your policy. We negotiate. You save.
            </p>
          </ScrollReveal>
        </div>

        {/* Journey road illustration with floating coins */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="relative mt-12 lg:mt-16 mx-auto max-w-4xl">
            <Image
              src="/brand/illustrations/journey-road.webp"
              alt="Six-step journey from sharing your policy to staying on autopilot with AiM"
              width={1600}
              height={900}
              sizes="(min-width: 1024px) 896px, 92vw"
              className="w-full h-auto"
            />
            <FloatingOrbs variant="journey" />
          </div>
        </ScrollReveal>

        {/* Stacked cards - first 4 steps; later detail lives in /about + quote flow */}
        <div className="mt-16 lg:mt-20 max-w-4xl mx-auto">
          <ScrollStack topOffset="14vh" stepOffset={20} scaleStep={0.018} gap="14vh">
            {PROCESS_STEPS.slice(0, 4).map((step) => {
              const Icon = getIcon(step.icon) ?? ICONS.Shield;
              return (
                <article
                  key={step.step}
                  className="card-hover relative rounded-[12px] border border-[#232328] bg-[#111113]"
                >
                  {/* Top accent strip - single Ember */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px bg-[#ffc83d]"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8 p-7 sm:p-10 lg:p-12">
                    <div className="sm:col-span-3 flex sm:flex-col items-center sm:items-start gap-3 sm:gap-4">
                      <span
                        className="text-7xl sm:text-8xl lg:text-9xl font-extrabold leading-none tracking-[-0.06em] text-[#ffc83d] tabular-nums"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {String(step.step).padStart(2, "0")}
                      </span>
                      <span
                        className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#232328] bg-[#0a0a0a] px-3 py-1 text-[10px] uppercase tracking-[0.18em] font-bold text-white tabular-nums"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        Step {step.step} / 4
                      </span>
                    </div>

                    <div className="sm:col-span-9 flex flex-col gap-4">
                      <span className="inline-flex size-11 items-center justify-center rounded-md bg-[#1a0e0a] text-[#ffc83d] border border-[#ffc83d]/30">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <h3
                        className="text-white"
                        style={{
                          fontSize: "clamp(1.5rem, 2.6vw, 2rem)",
                          fontFamily: "var(--font-inter)",
                          fontWeight: 600,
                          letterSpacing: "-0.02em",
                          lineHeight: 1.15,
                        }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-white text-base sm:text-lg leading-[1.55] max-w-xl">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </ScrollStack>
        </div>

        {/* Closer CTA */}
        <ScrollReveal direction="up" delay={0.1} className="mt-16 lg:mt-20">
          <div className="flex flex-col items-center gap-3 text-center">
            <button
              type="button"
              onClick={() => openModal()}
              className="btn-shine cta-primary inline-flex items-center gap-2 px-7 py-4 font-semibold text-base"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Start step 1: share my policy
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
              5 min · No credit card · No commitment
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default HowItWorks;
