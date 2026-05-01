"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/ui/scroll-effects";
import {
  ServiceHeroAmbience,
  ServiceCtaAmbience,
} from "@/components/sections/service-page-ambience";
import { FloatingOrbs } from "@/components/illustrations/floating-orbs";
import {
  SectionDividerArc,
  FloatingCardsBackdrop,
} from "@/components/illustrations/ambience";
import { TrustStrip } from "@/components/sections/trust-strip";
import {
  StructuredData,
  faqSchema,
} from "@/components/seo/structured-data";
import { useQuoteModal } from "@/lib/quote-modal-context";
import { SERVICES } from "@/lib/constants";
import { ICONS, getIcon } from "@/lib/icons";
import type { IconName } from "@/lib/icons";
import { cn } from "@/lib/utils";

export interface Benefit {
  icon: IconName | string;
  title: string;
  description: string;
}

export interface CoverageType {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ServicePageTemplateProps {
  serviceName: string;
  serviceSlug: string;
  heroTitle: string;
  heroDescription: string;
  benefits: Benefit[];
  coverageTypes: CoverageType[];
  faqs: FaqItem[];
  stats?: { value: string; label: string }[];
  comingSoon?: boolean;
  testimonial?: {
    quote: string;
    name: string;
    role: string;
    saved?: string;
  };
  iconImage?: string;
}

const SERVICE_IMAGE: Record<string, string> = {
  "car-insurance": "/brand/illustrations/service-car.webp",
  "home-insurance": "/brand/illustrations/service-home.webp",
  "boat-insurance": "/brand/illustrations/service-boat.webp",
  "yacht-insurance": "/brand/illustrations/service-yacht.webp",
  "jet-insurance": "/brand/illustrations/service-jet.webp",
};

const PRIMARY_CTA_HREF = (slug: string, comingSoon?: boolean) =>
  comingSoon ? `/contact?intent=waitlist&service=${slug}` : `/contact?service=${slug}`;

const PRIMARY_CTA_LABEL = (comingSoon?: boolean) =>
  comingSoon ? "Join the waitlist" : "Get my free quote";

export function ServicePageTemplate({
  serviceName,
  serviceSlug,
  heroTitle,
  heroDescription,
  benefits,
  coverageTypes,
  faqs,
  stats,
  comingSoon = false,
  testimonial,
  iconImage,
}: ServicePageTemplateProps) {
  const heroImage = iconImage ?? SERVICE_IMAGE[serviceSlug];
  const otherServices = SERVICES.filter((s) => s.slug !== serviceSlug);
  const ctaHref = PRIMARY_CTA_HREF(serviceSlug, comingSoon);
  const ctaLabel = PRIMARY_CTA_LABEL(comingSoon);
  const { openModal } = useQuoteModal();
  const insuranceTypeKey = serviceSlug.replace("-insurance", "");

  const renderPrimaryCta = (className?: string) =>
    comingSoon ? (
      <Link
        href={ctaHref}
        className={cn(
          "btn-shine cta-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold",
          className
        )}
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {ctaLabel}
        <ICONS.ArrowRight className="size-4" aria-hidden />
      </Link>
    ) : (
      <button
        type="button"
        onClick={() => openModal({ insuranceType: insuranceTypeKey })}
        className={cn(
          "btn-shine cta-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold",
          className
        )}
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {ctaLabel}
        <ICONS.ArrowRight className="size-4" aria-hidden />
      </button>
    );

  const faqLd = faqSchema({
    qas: faqs.map((f) => ({ question: f.question, answer: f.answer })),
  });

  return (
    <>
      <StructuredData data={faqLd} />
      {/* ─────────────────────────────────────────── HERO ─── */}
      <section
        aria-labelledby="service-hero-heading"
        className="relative overflow-hidden bg-background pt-32 pb-24 sm:pt-40 sm:pb-32"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-32 left-1/2 h-[640px] w-[800px] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgb(255 200 61 / 0.18), transparent 70%)",
            }}
          />
          <ServiceHeroAmbience />
          <div className="absolute inset-x-0 bottom-0 h-px bg-[#232328]" />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              <li>
                <Link
                  href="/"
                  className="link-underline transition-colors hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-white/30">
                /
              </li>
              <li className="text-white/60">Insurance Services</li>
              <li aria-hidden className="text-white/30">
                /
              </li>
              <li className="text-[#ffc83d]" aria-current="page">
                {serviceName}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <ScrollReveal direction="up">
                <span
                  className="inline-flex items-center gap-2 rounded-full border border-[#232328] bg-[#111113] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {comingSoon ? (
                    <>
                      <span className="size-1.5 rounded-full bg-[#ffc83d] animate-pulse" />
                      Coming Soon
                    </>
                  ) : (
                    <>
                      <ICONS.Sparkles
                        className="size-3.5 text-[#ffc83d]"
                        aria-hidden
                      />
                      {serviceName}
                    </>
                  )}
                </span>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.08}>
                <h1
                  id="service-hero-heading"
                  className="mt-6 text-white"
                  style={{
                    fontSize: "clamp(2.4rem, 5.6vw, 4.4rem)",
                    fontFamily: "var(--font-inter)",
                    fontWeight: 700,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  {heroTitle}
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.16}>
                <p className="mt-6 max-w-2xl text-lg sm:text-xl text-white leading-[1.55]">
                  {heroDescription}
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.24}>
                <div className="mt-10 flex flex-col sm:flex-row gap-3">
                  {renderPrimaryCta()}
                  {!comingSoon && (
                    <Link
                      href="/calculator"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[#232328] bg-[#111113] px-7 py-4 text-base font-semibold text-white transition-colors duration-150 hover:border-[#9a9aa3]/40 hover:bg-[#1a1a1f]"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      <ICONS.Calculator
                        className="size-4 text-[#ffc83d]"
                        aria-hidden
                      />
                      Estimate my savings
                    </Link>
                  )}
                </div>
                <p className="mt-5 text-xs text-white/70 font-semibold tabular-nums">
                  {comingSoon
                    ? "First in line · Priority pricing · Zero obligation"
                    : "$0 if no savings · No obligation · Results in 24 hours"}
                </p>
              </ScrollReveal>
            </div>

            {heroImage && (
              <div className="lg:col-span-5">
                <ScrollReveal direction="left" delay={0.1}>
                  <div className="relative mx-auto max-w-[480px]">
                    <div className="illu-backdrop" aria-hidden />
                    <div className="illu-float relative">
                      <Image
                        src={heroImage}
                        alt={`${serviceName} illustration`}
                        width={960}
                        height={720}
                        priority
                        className="w-full h-auto"
                      />
                      <FloatingOrbs variant="hero" />
                    </div>
                    {comingSoon && (
                      <div className="absolute -top-3 -right-3 rotate-6 rounded-full bg-[#ffc83d] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#0a0a0a] shadow-coral">
                        Coming Soon
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              </div>
            )}
          </div>

          {/* Trust signals — Newswire-led */}
          <ScrollReveal direction="up" delay={0.28}>
            <div className="mt-16">
              <TrustStrip variant="full" />
            </div>
          </ScrollReveal>

          {stats && stats.length > 0 && (
            <ScrollReveal direction="up" delay={0.34}>
              <ul className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-px overflow-hidden rounded-2xl border border-[#232328] bg-[#232328]">
                {stats.map((s) => (
                  <li
                    key={s.label}
                    className="bg-[#111113] p-7 sm:p-8 text-center"
                  >
                    <div
                      className="text-4xl sm:text-5xl font-extrabold tabular-nums text-[#ffc83d]"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {s.value}
                    </div>
                    <div className="mt-2 text-sm uppercase tracking-[0.18em] font-semibold text-white/70">
                      {s.label}
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* ────────────────────────────────────── BENEFITS ─── */}
      <section
        aria-labelledby="benefits-heading"
        className="relative bg-[#fbfaf5] py-24 sm:py-32 overflow-hidden"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgb(0 0 0 / 0.6) 1px, transparent 1px), linear-gradient(90deg, rgb(0 0 0 / 0.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse at center, black, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black, transparent 75%)",
          }}
        />
        <FloatingCardsBackdrop opacity={0.18} />
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <ScrollReveal direction="up">
              <span
                className="inline-flex items-center gap-2 rounded-full border border-[#0a0a0a]/12 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0a0a0a]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <ICONS.Award className="size-3.5 text-[#ffc83d]" aria-hidden />
                Why AiM
              </span>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.08}>
              <h2
                id="benefits-heading"
                className="mt-5 text-[#0a0a0a] text-balance"
                style={{
                  fontSize: "clamp(2rem, 4.6vw, 3.4rem)",
                  fontFamily: "var(--font-inter)",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.05,
                }}
              >
                What you{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">actually get</span>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-1 h-3 bg-[#ffc83d]/55"
                  />
                </span>{" "}
                with AiM.
              </h2>
            </ScrollReveal>
          </div>

          <StaggerGroup
            className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            stagger={0.1}
          >
            {benefits.map((b) => {
              const Icon = getIcon(b.icon) ?? ICONS.Shield;
              return (
                <StaggerItem key={b.title}>
                  <article className="group relative h-full rounded-[14px] border border-[#0a0a0a]/8 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#ffc83d] hover:shadow-[0_24px_60px_-20px_rgba(255,200,61,0.45)]">
                    <span className="inline-flex size-12 items-center justify-center rounded-md bg-[#fff5d4] text-[#0a0a0a] ring-2 ring-[#ffc83d]/40">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3
                      className="mt-5 text-[#0a0a0a]"
                      style={{
                        fontSize: "1.25rem",
                        fontFamily: "var(--font-inter)",
                        fontWeight: 600,
                        letterSpacing: "-0.015em",
                        lineHeight: 1.2,
                      }}
                    >
                      {b.title}
                    </h3>
                    <p className="mt-3 text-sm text-[#5a5a64] leading-[1.6]">
                      {b.description}
                    </p>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      <div className="relative bg-background">
        <SectionDividerArc />
      </div>

      {/* ─────────────────────────────────── COVERAGE ─── */}
      <section
        aria-labelledby="coverage-heading"
        className="relative bg-background py-24 sm:py-32 overflow-hidden"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-1/4 -left-32 h-[460px] w-[460px] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgb(255 200 61 / 0.12), transparent 70%)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4 lg:sticky lg:top-28 self-start">
              <ScrollReveal direction="up">
                <span
                  className="inline-flex items-center gap-2 rounded-full border border-[#232328] bg-[#111113] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  <ICONS.Shield className="size-3.5 text-[#ffc83d]" aria-hidden />
                  Coverage Types
                </span>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.08}>
                <h2
                  id="coverage-heading"
                  className="mt-5 text-white"
                  style={{
                    fontSize: "clamp(2rem, 4.6vw, 3rem)",
                    fontFamily: "var(--font-inter)",
                    fontWeight: 700,
                    letterSpacing: "-0.025em",
                    lineHeight: 1.05,
                  }}
                >
                  Every coverage{" "}
                  <span className="text-[#ffc83d]">we negotiate.</span>
                </h2>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.16}>
                <p className="mt-5 max-w-md text-base text-white/75 leading-[1.6]">
                  We don&rsquo;t cut corners on protection. Every line item below stays in your policy — we just fight for a better price on it.
                </p>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-8">
              <StaggerGroup
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                stagger={0.06}
              >
                {coverageTypes.map((c, i) => (
                  <StaggerItem key={c.title}>
                    <article className="group relative h-full rounded-[10px] border border-[#232328] bg-[#111113] p-6 transition-colors duration-200 hover:border-[#ffc83d]/40">
                      <div
                        className="text-xs font-bold tabular-nums text-[#ffc83d]/70 uppercase tracking-[0.18em]"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3
                        className="mt-2 text-white"
                        style={{
                          fontSize: "1.1rem",
                          fontFamily: "var(--font-inter)",
                          fontWeight: 600,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {c.title}
                      </h3>
                      <p className="mt-2 text-sm text-white/70 leading-[1.55]">
                        {c.description}
                      </p>
                    </article>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────── HOW AiM HELPS (mini) ─── */}
      <section
        aria-labelledby="help-heading"
        className="relative bg-[#fbfaf5] py-24 sm:py-32 overflow-hidden"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
        >
          <div
            className="absolute -top-32 right-1/4 h-[420px] w-[420px] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgb(255 200 61 / 0.18), transparent 70%)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <ScrollReveal direction="up">
              <span
                className="inline-flex items-center gap-2 rounded-full border border-[#0a0a0a]/12 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0a0a0a]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <ICONS.Handshake
                  className="size-3.5 text-[#ffc83d]"
                  aria-hidden
                />
                How AiM helps
              </span>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.08}>
              <h2
                id="help-heading"
                className="mt-5 text-[#0a0a0a] text-balance"
                style={{
                  fontSize: "clamp(2rem, 4.6vw, 3rem)",
                  fontFamily: "var(--font-inter)",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.05,
                }}
              >
                Four steps to a lower{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">
                    {serviceName.toLowerCase()}
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-1 h-3 bg-[#ffc83d]/55"
                  />
                </span>{" "}
                bill.
              </h2>
            </ScrollReveal>
          </div>

          <StaggerGroup
            className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            stagger={0.08}
          >
            {[
              {
                step: "01",
                icon: ICONS.FileText,
                title: "Share your policy",
                desc: `Upload your current ${serviceName.toLowerCase()} declarations page — 60 seconds.`,
              },
              {
                step: "02",
                icon: ICONS.BarChart3,
                title: "We compare 50+ carriers",
                desc: `We benchmark your coverage against the best ${serviceName.toLowerCase()} rates available.`,
              },
              {
                step: "03",
                icon: ICONS.Handshake,
                title: "We negotiate, you decide",
                desc: "Side-by-side savings report. You approve before anything changes.",
              },
              {
                step: "04",
                icon: ICONS.CheckCircle2,
                title: "We handle the switch",
                desc: "Paperwork, cancellation, refund timing — we manage every detail.",
              },
            ].map((step) => (
              <StaggerItem key={step.step}>
                <article className="group relative h-full overflow-hidden rounded-[14px] border border-[#0a0a0a]/8 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#ffc83d] hover:shadow-[0_24px_60px_-20px_rgba(255,200,61,0.45)]">
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px bg-[#ffc83d]"
                  />
                  <div
                    className="text-5xl font-extrabold tabular-nums text-[#0a0a0a]/12"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {step.step}
                  </div>
                  <span className="mt-4 inline-flex size-11 items-center justify-center rounded-md bg-[#fff5d4] text-[#0a0a0a] ring-2 ring-[#ffc83d]/40">
                    <step.icon className="size-5" aria-hidden />
                  </span>
                  <h3
                    className="mt-5 text-[#0a0a0a]"
                    style={{
                      fontSize: "1.1rem",
                      fontFamily: "var(--font-inter)",
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#5a5a64] leading-[1.55]">
                    {step.desc}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ─────────────────────────────────── FAQ ─── */}
      <section
        aria-labelledby="service-faq-heading"
        className="relative bg-background py-24 sm:py-32 overflow-hidden"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-1/3 -right-32 h-[460px] w-[460px] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgb(255 200 61 / 0.14), transparent 70%)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <ScrollReveal direction="up">
                <span
                  className="inline-flex items-center gap-2 rounded-full border border-[#232328] bg-[#111113] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  <ICONS.MessageSquare
                    className="size-3.5 text-[#ffc83d]"
                    aria-hidden
                  />
                  {serviceName} FAQ
                </span>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.08}>
                <h2
                  id="service-faq-heading"
                  className="mt-5 text-white"
                  style={{
                    fontSize: "clamp(2rem, 4.6vw, 3rem)",
                    fontFamily: "var(--font-inter)",
                    fontWeight: 700,
                    letterSpacing: "-0.025em",
                    lineHeight: 1.05,
                  }}
                >
                  Asked about{" "}
                  <span className="text-[#ffc83d]">
                    {serviceName.toLowerCase()}.
                  </span>
                </h2>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.16}>
                <p className="mt-5 max-w-md text-base text-white/75 leading-[1.6]">
                  The questions we hear most about {serviceName.toLowerCase()} negotiation. Have a different one? Email us — we answer every one.
                </p>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-3">
              <Accordion type="single" defaultValue={faqs[0]?.question}>
                {faqs.map((f) => (
                  <AccordionItem
                    key={f.question}
                    value={f.question}
                    question={f.question}
                  >
                    {f.answer}
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────── TESTIMONIAL ─── */}
      {testimonial && (
        <section
          aria-labelledby="service-testimonial-heading"
          className="relative bg-[#fbfaf5] py-24 sm:py-32 overflow-hidden"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
          >
            <div
              className="absolute -top-32 left-1/4 h-[420px] w-[520px] rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, rgb(255 200 61 / 0.16), transparent 70%)",
              }}
            />
          </div>
          <div className="relative mx-auto max-w-3xl px-5 sm:px-8 lg:px-12">
            <ScrollReveal direction="up">
              <div className="rounded-[20px] border border-[#0a0a0a]/8 bg-white p-8 sm:p-10 lg:p-14 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.18)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1" aria-label="5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <ICONS.Star
                        key={i}
                        className="size-4 fill-[#ffc83d] text-[#ffc83d]"
                        aria-hidden
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#5a5a64]">
                    Verified · Google Review
                  </span>
                </div>
                <span
                  className="block text-7xl leading-none text-[#ffc83d]/35 -mb-6"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 700 }}
                  aria-hidden
                >
                  &ldquo;
                </span>
                <h2
                  id="service-testimonial-heading"
                  className="text-[#0a0a0a] text-balance"
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2.1rem)",
                    fontFamily: "var(--font-inter)",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.3,
                  }}
                >
                  {testimonial.quote}
                </h2>
                <div className="mt-8 pt-6 border-t border-[#0a0a0a]/8 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#0a0a0a]">
                      {testimonial.name}
                    </span>
                    <span className="text-xs text-[#5a5a64]">
                      {testimonial.role}
                    </span>
                  </div>
                  {testimonial.saved && (
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#fff5d4] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#0a0a0a] tabular-nums ring-2 ring-[#ffc83d]/40"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      <ICONS.TrendingUp className="size-3.5" aria-hidden />
                      Saved {testimonial.saved}
                    </span>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ──────────────────────── RELATED SERVICES ─── */}
      <section
        aria-labelledby="related-heading"
        className="relative bg-background py-24 sm:py-32"
      >
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="max-w-xl">
              <ScrollReveal direction="up">
                <span
                  className="inline-flex items-center gap-2 rounded-full border border-[#232328] bg-[#111113] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  <ICONS.TrendingUp
                    className="size-3.5 text-[#ffc83d]"
                    aria-hidden
                  />
                  Other Services
                </span>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.08}>
                <h2
                  id="related-heading"
                  className="mt-5 text-white"
                  style={{
                    fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                    fontFamily: "var(--font-inter)",
                    fontWeight: 700,
                    letterSpacing: "-0.025em",
                    lineHeight: 1.1,
                  }}
                >
                  Explore other{" "}
                  <span className="text-[#ffc83d]">insurance services.</span>
                </h2>
              </ScrollReveal>
            </div>
          </div>

          <StaggerGroup
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            stagger={0.08}
          >
            {otherServices.map((s) => {
              const Icon = getIcon(s.icon) ?? ICONS.Shield;
              const href = s.comingSoon ? `/${s.slug}` : `/${s.slug}`;
              const img = SERVICE_IMAGE[s.slug];
              return (
                <StaggerItem key={s.slug}>
                  <Link
                    href={href}
                    className={cn(
                      "card-hover group relative block h-full overflow-hidden rounded-[12px] border border-[#232328] bg-[#111113] p-6 transition-colors duration-200 hover:border-[#ffc83d]/40"
                    )}
                  >
                    {img && (
                      <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[#0a0a0a]">
                        <Image
                          src={img}
                          alt={`${s.name} illustration`}
                          fill
                          sizes="(max-width: 640px) 90vw, 280px"
                          className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="mt-5 flex items-center gap-3">
                      <span className="inline-flex size-9 items-center justify-center rounded-md border border-[#ffc83d]/30 bg-[#1a0e0a] text-[#ffc83d]">
                        <Icon className="size-4" aria-hidden />
                      </span>
                      <h3
                        className="text-white"
                        style={{
                          fontSize: "1rem",
                          fontFamily: "var(--font-inter)",
                          fontWeight: 600,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {s.name}
                      </h3>
                      {s.comingSoon && (
                        <span className="ml-auto rounded-full bg-[#ffc83d]/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#ffc83d]">
                          Soon
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-sm text-white/70 leading-[1.55]">
                      {s.shortDescription}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#ffc83d]">
                      Learn more
                      <ICONS.ArrowRight
                        className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden
                      />
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* ─────────────────────────── BOTTOM CTA ─── */}
      <section
        aria-labelledby="service-cta-heading"
        className="relative bg-background py-28 sm:py-36 overflow-hidden"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[640px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-blob blur-3xl" />
          <ServiceCtaAmbience />
          <div className="absolute inset-x-0 top-0 h-px bg-[#232328]" />
        </div>
        <FloatingOrbs variant="cta" className="z-[1]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-3xl px-5 sm:px-8 lg:px-12 text-center"
        >
          <h2
            id="service-cta-heading"
            className="text-white"
            style={{
              fontSize: "clamp(2.4rem, 5.6vw, 4.4rem)",
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            {comingSoon ? (
              <>
                Be first when{" "}
                <span className="text-[#ffc83d]">{serviceName}</span> launches.
              </>
            ) : (
              <>
                Ready to save on{" "}
                <span className="text-[#ffc83d]">{serviceName}</span>?
              </>
            )}
          </h2>
          <p className="mt-6 text-base sm:text-lg text-white/85 leading-[1.55]">
            {comingSoon
              ? `Join the ${serviceName.toLowerCase()} waitlist — early-access pricing for the first 100 clients.`
              : `Same coverage. Lower premium. Zero hassle. We’ll send your audit in 24 hours.`}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            {renderPrimaryCta("w-full sm:w-auto")}
            <Link
              href="/contact?intent=call"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-[#232328] bg-[#111113] px-7 py-4 text-base font-semibold text-white transition-colors duration-150 hover:border-[#9a9aa3]/40 hover:bg-[#1a1a1f]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <ICONS.Phone className="size-4 text-[#ffc83d]" aria-hidden />
              Book a 15-min call
            </Link>
          </div>
          <p className="mt-6 text-xs font-semibold tabular-nums text-white/70">
            {comingSoon
              ? "First 100 get founder pricing · No commitment"
              : "$0 if no savings · No obligation · Results in 24 hours"}
          </p>
        </motion.div>
      </section>
    </>
  );
}

export default ServicePageTemplate;
