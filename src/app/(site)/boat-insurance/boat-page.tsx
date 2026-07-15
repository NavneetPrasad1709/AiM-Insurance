"use client";

import Image from "next/image";
import Link from "next/link";
import {
  m as motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { LazyVideo } from "@/components/ui/lazy-video";
import { ICONS } from "@/lib/icons";
import { ExploreMoreServices } from "@/components/sections/explore-more-services";

const CREAM = "#faf6ee";
const CREAM_INK = "#0c1626";
const CREAM_GOLD = "#b8842a";
const CREAM_GOLD_TEXT = "#8a6410"; // AA-contrast gold for text on cream (>=4.6:1)

const ASSET = {
  heroPoster: "/boat/boat-hero.jpg",
  heroVideo: "/boat/boat-hero.mp4",
  c1: "/boat/boat-c1.jpg",
  c2: "/boat/boat-c2.jpg",
  c3: "/boat/boat-c3.jpg",
  c4: "/boat/boat-c4.jpg",
  split1: "/boat/boat-s1.jpg",
  ctaPoster: "/boat/boat-cta.jpg",
  ctaVideo: "/boat/boat-cta.mp4",
};

const ALT = {
  hero: "Luxury motor yacht cruising at sunset off the coast",
  c1: "Luxurious motor yacht on the open Ionian Sea",
  c2: "White luxury yacht docked at a modern urban marina",
  c3: "Yacht cockpit with leather helm seats and marina views",
  c4: "Aerial top-down view of a luxury yacht in vivid blue waters",
  split1: "Premium motor yacht sailing at golden hour",
  cta: "Sleek sport yacht traversing open sea bay at speed",
};

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export function BoatPage() {
  return (
    <main className="bg-background text-white">
      <Hero />
      <TrustStrip />
      <Stats />
      <Coverage />
      <WhyMatters />
      <Pricing />
      <Process />
      <SocialProof />
      <Faq />
      <ExploreMoreServices currentSlug="boat-insurance" />
      <Cta />
    </main>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <LazyVideo
        src={ASSET.heroVideo}
        poster={ASSET.heroPoster}
        ariaLabel={ALT.hero}
        eager
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.65) 0%, rgba(10,10,10,0.30) 30%, rgba(10,10,10,0.55) 60%, rgba(10,10,10,0.95) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-3/4"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.25) 50%, transparent 100%)",
        }}
      />

      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 py-4 sm:px-12 sm:py-5">
        <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.32em] text-white">
          AiM · Boat insurance
        </span>
        <span className="hidden font-heading text-[10px] font-semibold uppercase tracking-[0.32em] text-white sm:block">
          USA &amp; Canada · 85+ marine clients
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-20 sm:px-12 sm:pb-28">
        <div className="mx-auto max-w-7xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease, delay: 0.05 }}
            className="inline-flex items-center gap-3 font-heading text-[10px] font-semibold uppercase tracking-[0.36em] text-cta"
          >
            <span className="h-px w-12 bg-cta" />
            Marine specialists
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease, delay: 0.16 }}
            className="mt-6 font-heading font-extrabold uppercase text-white text-balance"
            style={{
              fontSize: "clamp(1.85rem, 5vw, 4.2rem)",
              lineHeight: 0.96,
              letterSpacing: "-0.03em",
            }}
          >
            Open water.
            <br />
            <span className="text-cta">Closed-margin pricing.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease, delay: 0.32 }}
            className="mt-7 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg"
          >
            Marine premiums are notoriously inflated. Different carriers
            price the same hull wildly differently. AiM benchmarks them
            and negotiates so you pay for protection, not paperwork.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease, delay: 0.42 }}
            className="mt-9 flex flex-col items-start gap-5 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6"
          >
            <Link
              href="/contact?service=boat-insurance"
              className="group inline-flex items-center gap-3 rounded-full bg-cta px-9 py-4 font-heading text-[12px] font-bold uppercase tracking-[0.16em] text-background transition-transform duration-200 hover:-translate-y-0.5 hover:bg-cta-hover"
              style={{ boxShadow: "0 24px 50px -20px rgba(255,200,61,0.55)" }}
            >
              Call us now
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <a
              href="tel:+16029102500"
              className="group inline-flex min-h-[44px] items-center gap-2 text-sm text-white transition-colors hover:text-cta"
            >
              <ICONS.Phone className="size-4" aria-hidden />
              <span className="border-b border-white/30 pb-0.5 transition-colors group-hover:border-cta">
                Or call: 602-910-2500
              </span>
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.85 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 font-heading text-[9px] uppercase tracking-[0.36em] text-white"
        >
          <span>Scroll</span>
          <span className="h-8 w-px bg-white/40" aria-hidden />
        </motion.div>
      </motion.div>
    </section>
  );
}

function TrustStrip() {
  const items: { label: string; icon: keyof typeof ICONS }[] = [
    { label: "USA & Canada", icon: "Ship" },
    { label: "85+ marine clients", icon: "Award" },
    { label: "12 marine carriers", icon: "BarChart3" },
    { label: "Agreed value", icon: "Shield" },
    { label: "Annual reviews", icon: "Clock" },
  ];

  return (
    <section
      className="relative -mt-12 rounded-t-[48px] sm:rounded-t-[72px]"
      style={{ backgroundColor: CREAM, color: CREAM_INK }}
    >
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-14 sm:px-12 sm:pt-20">
        <p
          className="mb-7 text-center font-heading text-[10px] font-semibold uppercase tracking-[0.36em] sm:mb-9"
          style={{ color: CREAM_GOLD_TEXT }}
        >
          <span
            aria-hidden
            className="mr-3 inline-block h-px w-10 align-middle"
            style={{ backgroundColor: CREAM_GOLD }}
          />
          Trusted by boat owners
          <span
            aria-hidden
            className="ml-3 inline-block h-px w-10 align-middle"
            style={{ backgroundColor: CREAM_GOLD }}
          />
        </p>

        <ul className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-3 sm:gap-x-3">
          {items.map((it) => {
            const Icon = ICONS[it.icon];
            return (
              <li
                key={it.label}
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] sm:px-5 sm:py-2.5 sm:text-[12px]"
                style={{
                  borderColor: `${CREAM_INK}1f`,
                  backgroundColor: "#ffffff",
                  color: CREAM_INK,
                }}
              >
                {Icon && (
                  <Icon
                    className="size-3.5 shrink-0 sm:size-4"
                    style={{ color: CREAM_GOLD_TEXT }}
                    aria-hidden
                  />
                )}
                {it.label}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Stats() {
  const STATS = [
    { value: "$1,650", label: "Avg. annual savings" },
    { value: "85+", label: "Boat clients" },
    { value: "12", label: "Marine carriers" },
  ];
  return (
    <section
      className="relative pb-24 pt-16 sm:pb-32 sm:pt-20"
      style={{ backgroundColor: CREAM, color: CREAM_INK }}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.85, ease, delay: i * 0.1 }}
              className="border-l pl-6"
              style={{ borderColor: `${CREAM_GOLD}80` }}
            >
              <span
                className="block font-heading font-extrabold tabular-nums"
                style={{
                  fontSize: "clamp(1.85rem, 3.8vw, 2.8rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.025em",
                  color: CREAM_INK,
                }}
              >
                {s.value}
              </span>
              <span
                className="mt-4 block font-heading text-[10px] font-semibold uppercase tracking-[0.32em]"
                style={{ color: `${CREAM_INK}cc` }}
              >
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Coverage() {
  const items = [
    {
      n: "01",
      title: "Hull cover that pays",
      body:
        "Agreed-value protection for collision, sinking, fire, theft and storm, settled at the policy number, not depreciated.",
      image: ASSET.c1,
      alt: ALT.c1,
    },
    {
      n: "02",
      title: "On-water liability",
      body:
        "Bodily injury and property damage to other boaters, swimmers, marinas and waterfront property, including legal defence.",
      image: ASSET.c2,
      alt: ALT.c2,
    },
    {
      n: "03",
      title: "Towing & emergencies",
      body:
        "On-water towing, fuel delivery, soft ungrounding and trip interruption. Most owners never realise this is negotiable.",
      image: ASSET.c3,
      alt: ALT.c3,
    },
    {
      n: "04",
      title: "Gear & personal effects",
      body:
        "Fishing equipment, electronics, watersports gear, dive equipment and personal property aboard, at replacement cost.",
      image: ASSET.c4,
      alt: ALT.c4,
    },
  ];

  return (
    <section className="relative -mt-12 rounded-t-[48px] bg-background pb-28 pt-28 sm:rounded-t-[72px] sm:pb-36 sm:pt-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        <div className="mb-16 grid items-end gap-8 sm:grid-cols-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease }}
            className="sm:col-span-7"
          >
            <p className="mb-5 font-heading text-[10px] font-semibold uppercase tracking-[0.36em] text-cta">
              <span
                className="mr-3 inline-block h-px w-12 align-middle bg-cta"
                aria-hidden
              />
              What AiM does for you
            </p>
            <h2
              className="font-heading font-extrabold uppercase text-white"
              style={{
                fontSize: "clamp(1.65rem, 3.6vw, 2.6rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.025em",
              }}
            >
              Same hull,
              <br />
              <span className="text-cta">tighter premium.</span>
            </h2>
          </motion.div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease, delay: 0.1 }}
            className="text-[15px] leading-relaxed text-text-secondary sm:col-span-5"
          >
            We benchmark twelve marine specialists on your exact navigation
            territory and lay-up profile: same agreed value, same limits,
            lower number on the bill.
          </motion.p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((c, i) => (
            <motion.article
              key={c.n}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease, delay: i * 0.08 }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-colors duration-300 hover:border-cta/50"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="font-heading text-[11px] font-bold tabular-nums tracking-[0.18em] text-cta">
                  {c.n}
                </span>
                <h3
                  className="mt-2 font-heading font-bold uppercase text-white"
                  style={{ fontSize: "1.05rem", letterSpacing: "-0.01em" }}
                >
                  {c.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-text-secondary">
                  {c.body}
                </p>
                <span
                  aria-hidden
                  className="mt-5 block h-px w-10 origin-left bg-cta transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-[3]"
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyMatters() {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-40, 40]);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative -mt-12 overflow-hidden rounded-t-[48px] py-24 sm:rounded-t-[72px] sm:py-32"
      style={{ backgroundColor: CREAM, color: CREAM_INK }}
    >
      <div className="relative mx-auto max-w-7xl px-6 sm:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
          <motion.figure
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.0, ease }}
            className="relative lg:col-span-7"
          >
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-3xl sm:rounded-[40px]">
              <motion.div
                style={{ y }}
                className="absolute inset-0"
                aria-hidden
              >
                <div className="relative h-[120%] w-full">
                  <Image
                    src={ASSET.split1}
                    alt={ALT.split1}
                    fill
                    sizes="(min-width: 1024px) 56vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>
              <span
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 60%, rgba(10,10,10,0.35) 100%)",
                }}
              />
            </div>
          </motion.figure>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <p
              className="mb-5 font-heading text-[10px] font-semibold uppercase tracking-[0.36em]"
              style={{ color: CREAM_GOLD_TEXT }}
            >
              <span
                className="mr-3 inline-block h-px w-10 align-middle"
                style={{ backgroundColor: CREAM_GOLD }}
                aria-hidden
              />
              Why does this matter?
            </p>
            <h3
              className="mb-7 font-heading font-extrabold uppercase"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: CREAM_INK,
              }}
            >
              Marine carriers price the{" "}
              <span style={{ color: CREAM_GOLD_TEXT }}>
                same hull wildly differently.
              </span>
            </h3>
            <p
              className="text-[15px] leading-relaxed"
              style={{ color: `${CREAM_INK}e6` }}
            >
              Quotes from twelve marine specialists on the same boat can
              vary by{" "}
              <span className="font-semibold" style={{ color: CREAM_INK }}>
                $1,200 to $3,400
              </span>{" "}
              a year, and most owners only ever see one. AiM benchmarks
              them all so you stop guessing.
            </p>
            <span
              className="mt-9 block h-px w-14"
              style={{ backgroundColor: CREAM_GOLD }}
              aria-hidden
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    {
      tag: "No savings, no fee",
      figure: "$0",
      figureSuffix: "",
      title: "If we can't save you money",
      body:
        "If we don't reduce your premium, you owe us nothing, no risk, no commitment.",
      filled: false,
    },
    {
      tag: "Success-based",
      figure: "Small",
      figureSuffix: "",
      title: "A share of your savings",
      body:
        "Only when we save you money, we keep a small portion of the negotiated savings on your annual premium, first year only. You always come out ahead.",
      filled: true,
    },
  ];

  return (
    <section
      className="relative pb-28 pt-12 sm:pb-36 sm:pt-16"
      style={{ backgroundColor: CREAM, color: CREAM_INK }}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <p
            className="mb-5 font-heading text-[10px] font-semibold uppercase tracking-[0.36em]"
            style={{ color: CREAM_GOLD_TEXT }}
          >
            <span
              className="mr-3 inline-block h-px w-12 align-middle"
              style={{ backgroundColor: CREAM_GOLD }}
              aria-hidden
            />
            Pricing
          </p>
          <h2
            className="font-heading font-extrabold uppercase"
            style={{
              fontSize: "clamp(1.65rem, 3.6vw, 2.6rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.025em",
              color: CREAM_INK,
            }}
          >
            Aligned with{" "}
            <span style={{ color: CREAM_GOLD_TEXT }}>your savings.</span>
          </h2>
          <p
            className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed"
            style={{ color: `${CREAM_INK}e6` }}
          >
            Our pricing structure is designed around the savings we deliver.
            You only pay when you benefit.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {tiers.map((t, i) => (
            <motion.article
              key={t.tag}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease, delay: i * 0.1 }}
              className="group relative flex flex-col rounded-3xl border p-7 transition-colors duration-300 sm:rounded-[36px] sm:p-12"
              style={{
                backgroundColor: t.filled ? "#0a0a0a" : "#ffffff",
                borderColor: t.filled ? "#ffc83d" : "#e5dfd1",
                color: t.filled ? "#ffffff" : CREAM_INK,
              }}
            >
              <p
                className="font-heading text-[10px] font-semibold uppercase tracking-[0.36em]"
                style={{ color: t.filled ? "#ffc83d" : CREAM_GOLD_TEXT }}
              >
                {t.tag}
              </p>

              <div className="mt-10 flex items-baseline gap-1">
                <span
                  className="font-heading font-extrabold tabular-nums"
                  style={{
                    fontSize: "clamp(2.8rem, 5.5vw, 4.4rem)",
                    lineHeight: 0.85,
                    letterSpacing: "-0.04em",
                    color: t.filled ? "#ffffff" : CREAM_INK,
                  }}
                >
                  {t.figure}
                </span>
                {t.figureSuffix && (
                  <span
                    className="font-heading font-extrabold"
                    style={{
                      fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)",
                      lineHeight: 1,
                      color: t.filled ? "#ffc83d" : CREAM_GOLD_TEXT,
                    }}
                  >
                    {t.figureSuffix}
                  </span>
                )}
              </div>

              <h3
                className="mt-6 font-heading font-bold uppercase"
                style={{
                  fontSize: "clamp(1.1rem, 1.4vw, 1.3rem)",
                  letterSpacing: "-0.01em",
                  color: t.filled ? "#ffffff" : CREAM_INK,
                }}
              >
                {t.title}
              </h3>
              <p
                className="mt-3 text-[15px] leading-relaxed"
                style={{
                  color: t.filled
                    ? "rgba(255,255,255,0.92)"
                    : `${CREAM_INK}e6`,
                }}
              >
                {t.body}
              </p>

              <div className="mt-10">
                <Link
                  href="/contact?service=boat-insurance"
                  className="group/btn inline-flex items-center gap-3 rounded-full bg-cta px-7 py-3.5 font-heading text-[12px] font-bold uppercase tracking-[0.16em] text-background transition-transform duration-200 hover:-translate-y-0.5 hover:bg-cta-hover"
                >
                  Get started
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover/btn:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>

              <span
                aria-hidden
                className="absolute right-6 top-6 font-heading text-[10px] font-bold tabular-nums tracking-[0.18em]"
                style={{
                  color: t.filled
                    ? "rgba(255,255,255,0.62)"
                    : `${CREAM_INK}b3`,
                }}
              >
                0{i + 1}
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

interface Step {
  n: string;
  title: string;
  body: string;
  meta: string;
}

function ProcessStepCard({ step: s, index: i }: { step: Step; index: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, ease, delay: i * 0.12 }}
      className="group relative flex flex-col rounded-3xl border border-border bg-surface p-7 transition-[transform,border-color,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-cta/60 hover:bg-surface-2 sm:p-8"
    >
      <motion.span
        aria-hidden
        initial={{ opacity: 0, scale: 0.7, y: 12 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease, delay: 0.18 + i * 0.12 }}
        className="font-heading font-extrabold tabular-nums text-cta"
        style={{
          fontSize: "clamp(2.7rem, 4vw, 3.6rem)",
          lineHeight: 0.9,
          letterSpacing: "-0.04em",
          display: "inline-block",
          transformOrigin: "left center",
        }}
      >
        <motion.span
          animate={reduce ? undefined : { y: [0, -4, 0, 3, 0] }}
          transition={{
            duration: 6 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
          className="inline-block transition-transform duration-300 group-hover:scale-110"
          style={{ transformOrigin: "left center" }}
        >
          {s.n}
        </motion.span>
      </motion.span>

      <p className="mt-5 font-heading text-[10px] font-semibold uppercase tracking-[0.32em] text-text-muted">
        Step {s.n}
      </p>

      <h3
        className="mt-3 font-heading font-bold uppercase text-white"
        style={{
          fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)",
          letterSpacing: "-0.01em",
          lineHeight: 1.2,
        }}
      >
        {s.title}
      </h3>

      <p className="mt-3 flex-1 text-[14px] leading-relaxed text-text-secondary">
        {s.body}
      </p>

      <div className="mt-7 flex items-center justify-between border-t border-border pt-5">
        <span className="font-heading text-[10px] font-semibold uppercase tabular-nums tracking-[0.28em] text-cta">
          {s.meta}
        </span>
        <span
          aria-hidden
          className="block h-px w-8 origin-right bg-cta transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-[2.4]"
        />
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: "0 32px 70px -28px rgba(255,200,61,0.50)" }}
      />

      <span
        aria-hidden
        className="pointer-events-none absolute right-5 top-5 h-4 w-4 -rotate-45 border-t-2 border-cta opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </motion.article>
  );
}

function Process() {
  const steps = [
    {
      n: "01",
      title: "Send your policy",
      body:
        "Share your existing marine policy details. Five minutes. Fully encrypted.",
      meta: "≈ 5 min",
    },
    {
      n: "02",
      title: "We benchmark 12 carriers",
      body:
        "We price your hull, navigation territory and lay-up profile against every major marine specialist.",
      meta: "2 to 3 days",
    },
    {
      n: "03",
      title: "Savings report",
      body:
        "If we find a better rate at the same agreed value, we email a 1-page side-by-side comparison.",
      meta: "Same week",
    },
    {
      n: "04",
      title: "We handle the switch",
      body:
        "Follow our guidance to adjust your policy and lock in savings. We handle every form.",
      meta: "When ready",
    },
  ];

  return (
    <section className="relative -mt-12 overflow-hidden rounded-t-[48px] bg-background pb-32 pt-28 sm:rounded-t-[72px] sm:pb-40 sm:pt-32">
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,200,61,0.16), transparent 70%)",
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-[460px] w-[460px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,200,61,0.10), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease }}
          className="mb-20 grid items-end gap-8 sm:grid-cols-12"
        >
          <div className="sm:col-span-7">
            <p className="mb-5 font-heading text-[10px] font-semibold uppercase tracking-[0.36em] text-cta">
              <span
                className="mr-3 inline-block h-px w-12 align-middle bg-cta"
                aria-hidden
              />
              How it works
            </p>
            <h2
              className="font-heading font-extrabold uppercase text-white"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
              }}
            >
              Four steps,
              <br />
              <span className="text-cta">about a week.</span>
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed text-text-secondary sm:col-span-5">
            From upload to a side-by-side comparison sitting in your inbox.
            We do the work; you decide what to do with the savings.
          </p>
        </motion.div>

        <div className="relative">
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-x-12 top-[78px] hidden lg:block"
            height="2"
            preserveAspectRatio="none"
            viewBox="0 0 100 2"
          >
            <motion.line
              x1="2"
              y1="1"
              x2="98"
              y2="1"
              stroke="#ffc83d"
              strokeOpacity="0.45"
              strokeWidth="0.5"
              strokeDasharray="0.6 1.2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.6, ease }}
            />
          </svg>

          <div className="relative grid gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((s, i) => (
              <ProcessStepCard key={s.n} step={s} index={i} />
            ))}
          </div>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease, delay: 0.2 }}
          className="relative mt-20 overflow-hidden rounded-3xl border border-cta/30 bg-surface p-8 sm:rounded-[36px] sm:p-12"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,200,61,0.20), transparent 70%)",
            }}
          />
          <div className="relative grid gap-8 sm:grid-cols-12 sm:items-center">
            <div className="sm:col-span-7">
              <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.36em] text-cta">
                Ready when you are
              </p>
              <h3
                className="mt-3 font-heading font-extrabold uppercase text-white"
                style={{
                  fontSize: "clamp(1.3rem, 2vw, 1.75rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                }}
              >
                No upfront cost.
              </h3>
            </div>
            <div className="flex sm:col-span-5 sm:justify-end">
              <Link
                href="/contact?service=boat-insurance"
                className="group inline-flex items-center gap-3 rounded-full bg-cta px-8 py-4 font-heading text-[12px] font-bold uppercase tracking-[0.16em] text-background transition-transform duration-200 hover:-translate-y-0.5 hover:bg-cta-hover"
                style={{ boxShadow: "0 24px 50px -20px rgba(255,200,61,0.55)" }}
              >
                Start step one
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section
      className="relative -mt-12 rounded-t-[48px] py-24 sm:rounded-t-[72px] sm:py-32"
      style={{ backgroundColor: CREAM, color: CREAM_INK }}
    >
      <div className="mx-auto max-w-5xl px-6 text-center sm:px-12">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease }}
          className="font-heading text-[10px] font-semibold uppercase tracking-[0.36em]"
          style={{ color: CREAM_GOLD_TEXT }}
        >
          <span
            className="mr-3 inline-block h-px w-12 align-middle"
            style={{ backgroundColor: CREAM_GOLD }}
            aria-hidden
          />
          Trusted by owners
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease, delay: 0.08 }}
          className="mt-6 font-heading font-extrabold uppercase"
          style={{
            fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.03em",
            color: CREAM_INK,
          }}
        >
          <span style={{ color: CREAM_GOLD_TEXT }}>85+</span> boat owners served,
          and counting.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease, delay: 0.16 }}
          className="mx-auto mt-7 max-w-2xl text-[16px] leading-relaxed"
          style={{ color: `${CREAM_INK}e6` }}
        >
          Marine premiums climb every renewal. Most owners only ever
          see one quote. Owners across the USA and Canada are letting AiM
          benchmark twelve carriers, quietly, every year.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease, delay: 0.24 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-5"
        >
          <Link
            href="/contact?service=boat-insurance"
            className="group inline-flex items-center gap-3 rounded-full px-9 py-4 font-heading text-[12px] font-bold uppercase tracking-[0.16em] transition-transform duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: "#0a0a0a", color: CREAM }}
          >
            Contact us
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
          <a
            href="tel:+16029102500"
            className="inline-flex min-h-[44px] items-center gap-2 text-sm transition-colors"
            style={{ color: CREAM_GOLD_TEXT }}
          >
            <ICONS.Phone className="size-4" aria-hidden />
            <span
              className="border-b pb-0.5"
              style={{ borderColor: CREAM_GOLD }}
            >
              Call us: 602-910-2500
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Faq() {
  const items = [
    {
      q: "What size and type of boats do you cover?",
      a: "Personal watercraft, bowriders, centre consoles, pontoons, sailboats, cabin cruisers and offshore sport-fishers up to 65 feet. Above 65 feet typically routes into our yacht programme. We'll tell you which makes more sense.",
    },
    {
      q: "Does my boat policy cover trailering and storage?",
      a: "Yes, most carriers cover the boat in transit on a trailer, in dry storage at marinas, and during winter haul-out. We confirm the navigation territory and lay-up provisions match how you actually use the boat.",
    },
    {
      q: "Will my boating record affect the rate?",
      a: "Cleanly. We negotiate experience credits for completed boating safety courses, multi-year clean records and Coast Guard licences. Most carriers will knock 10 to 25% off if asked. They don't volunteer it.",
    },
    {
      q: "Do you handle saltwater and offshore navigation?",
      a: "Yes. We negotiate extended navigation territories: coastal, Bahamas, Bermuda triangle and trans-Atlantic, with proper salvage and towing limits matched to where you actually run the boat.",
    },
  ];
  return (
    <section className="relative -mt-12 rounded-t-[48px] bg-background pb-28 pt-28 sm:rounded-t-[72px] sm:pb-36 sm:pt-32">
      <div className="mx-auto max-w-3xl px-6 sm:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease }}
          className="mb-14"
        >
          <p className="mb-5 font-heading text-[10px] font-semibold uppercase tracking-[0.36em] text-cta">
            <span
              className="mr-3 inline-block h-px w-10 align-middle bg-cta"
              aria-hidden
            />
            Frequently asked
          </p>
          <h2
            className="font-heading font-extrabold uppercase text-white"
            style={{
              fontSize: "clamp(1.55rem, 3.4vw, 2.2rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
            }}
          >
            Answers to <span className="text-cta">common questions.</span>
          </h2>
        </motion.div>

        <div className="border-t border-border">
          {items.map((f, i) => (
            <FaqRow key={i} q={f.q} a={f.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqRow({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease, delay: index * 0.08 }}
      className="border-b border-border"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span
          className={[
            "flex-1 font-heading font-bold uppercase transition-colors",
            open ? "text-cta" : "text-white group-hover:text-cta",
          ].join(" ")}
          style={{
            fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)",
            letterSpacing: "0.01em",
          }}
        >
          {q}
        </span>
        <span
          aria-hidden
          className="grid size-9 shrink-0 place-items-center rounded-full border border-cta/40 text-sm text-cta transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.45, ease }}
        style={{ overflow: "hidden" }}
      >
        <p className="pb-7 pr-12 text-[15px] leading-relaxed text-text-secondary">
          {a}
        </p>
      </motion.div>
    </motion.div>
  );
}

function Cta() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden sm:h-auto sm:min-h-0">
      <div className="absolute inset-0 sm:relative sm:aspect-[21/9] sm:h-auto">
        <LazyVideo
          src={ASSET.ctaVideo}
          poster={ASSET.ctaPoster}
          ariaLabel={ALT.cta}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 sm:hidden"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, transparent 35%, rgba(10,10,10,0.78) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 hidden sm:block"
          style={{
            background:
              "linear-gradient(110deg, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.30) 45%, transparent 75%)",
          }}
        />
      </div>

      <div className="absolute inset-0 flex items-end pb-16 sm:items-center sm:pb-0">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.95, ease }}
            className="max-w-2xl"
          >
            <p className="mb-5 inline-flex items-center gap-3 font-heading text-[10px] font-semibold uppercase tracking-[0.36em] text-cta">
              <span className="h-px w-10 bg-cta sm:w-12" aria-hidden />
              Free review
            </p>
            <h2
              className="font-heading font-extrabold uppercase text-white"
              style={{
                fontSize: "clamp(1.7rem, 4vw, 3.2rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
              }}
            >
              Cast off without overpaying.
              <br />
              <span className="text-cta">Cruise with confidence.</span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-text-secondary sm:text-[15.5px]">
              Send us your current marine policy and let AiM start
              benchmarking: same agreed value, lower premium.
            </p>
            <div className="mt-9 flex flex-col gap-5 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
              <Link
                href="/contact?service=boat-insurance"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-cta px-8 py-4 font-heading text-[12px] font-bold uppercase tracking-[0.16em] text-background transition-transform duration-200 hover:-translate-y-0.5 hover:bg-cta-hover sm:px-9"
                style={{ boxShadow: "0 24px 50px -20px rgba(255,200,61,0.55)" }}
              >
                Call us now
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <a
                href="tel:+16029102500"
                className="group inline-flex min-h-[44px] items-center gap-2 text-sm text-white transition-colors hover:text-cta"
              >
                <ICONS.Phone className="size-4" aria-hidden />
                <span className="border-b border-white/30 pb-0.5 transition-colors group-hover:border-cta">
                  Or call: 602-910-2500
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
