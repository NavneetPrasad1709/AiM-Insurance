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
  heroPoster: "/jet/jet-hero.jpg",
  heroVideo: "/jet/jet-hero.mp4",
  c1: "/jet/jet-c1.jpg",
  c2: "/jet/jet-c2.jpg",
  c3: "/jet/jet-c3.jpg",
  c4: "/jet/jet-c4.jpg",
  split1: "/jet/jet-s1.jpg",
  ctaPoster: "/jet/jet-cta.jpg",
  ctaVideo: "/jet/jet-cta.mp4",
};

const ALT = {
  hero: "Private jet illuminated on the tarmac at dusk",
  c1: "Sleek private jet on the tarmac with ground tow tug",
  c2: "Luxurious private jet cabin with leather seats and wood trim",
  c3: "Private jet on a runway with a scenic mountain backdrop",
  c4: "Private jet in a hangar, engine and tail detail",
  split1: "Embraer Legacy 600 private jet illuminated on tarmac at night",
  cta: "Aerial view of a private jet parked on the tarmac",
};

const WAITLIST_HREF = "/contact?intent=waitlist&service=jet-insurance";

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export function JetPage() {
  return (
    <main className="bg-background text-white">
      <Hero />
      <TrustStrip />
      <Stats />
      <Coverage />
      <WhyMatters />
      <Waitlist />
      <Process />
      <SocialProof />
      <Faq />
      <ExploreMoreServices currentSlug="jet-insurance" />
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
          AiM · Jet insurance
        </span>
        <span className="hidden font-heading text-[10px] font-semibold uppercase tracking-[0.32em] text-white sm:block">
          Q3 2026 · 100 founder spots
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-20 sm:px-12 sm:pb-28">
        <div className="mx-auto max-w-7xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease, delay: 0.05 }}
            className="inline-flex items-center gap-3 rounded-full bg-cta/15 px-4 py-1.5 font-heading text-[10px] font-semibold uppercase tracking-[0.36em] text-cta backdrop-blur"
          >
            <span className="h-2 w-2 rounded-full bg-cta" aria-hidden />
            Coming soon · Q3 2026
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
            Elite aviation cover.
            <br />
            <span className="text-cta">Founder pricing, first.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease, delay: 0.32 }}
            className="mt-7 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg"
          >
            We&rsquo;re onboarding global aviation underwriters: Lloyd&rsquo;s,
            AIG Aerospace, Global Aerospace, Allianz. Join the waitlist
            for founder pricing on hull, liability and worldwide flight
            cover.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease, delay: 0.42 }}
            className="mt-9 flex flex-col items-start gap-5 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6"
          >
            <Link
              href={WAITLIST_HREF}
              className="group inline-flex items-center gap-3 rounded-full bg-cta px-9 py-4 font-heading text-[12px] font-bold uppercase tracking-[0.16em] text-background transition-transform duration-200 hover:-translate-y-0.5 hover:bg-cta-hover"
              style={{ boxShadow: "0 24px 50px -20px rgba(255,200,61,0.55)" }}
            >
              Join the waitlist
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
                Or call 602-910-2500
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
    { label: "Lloyd's syndicates", icon: "Shield" },
    { label: "AIG Aerospace", icon: "Award" },
    { label: "Global Aerospace", icon: "Plane" },
    { label: "Allianz Aviation", icon: "Handshake" },
    { label: "Worldwide territory", icon: "Sparkles" },
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
          Underwriting partners
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
    { value: "Q3 2026", label: "Programme launch" },
    { value: "100", label: "Founder spots" },
    { value: "$50M+", label: "CSL liability" },
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
      title: "Hull all-risk",
      body:
        "Agreed-value protection for the airframe, engines and avionics: in flight, ground risk and during taxi.",
      image: ASSET.c1,
      alt: ALT.c1,
    },
    {
      n: "02",
      title: "Combined single limit",
      body:
        "Bodily injury, passenger and third-party property liability under one CSL, typically $50M to $300M limits.",
      image: ASSET.c2,
      alt: ALT.c2,
    },
    {
      n: "03",
      title: "Hangar & ground risk",
      body:
        "Aircraft on the ground, in maintenance and during fuelling. Protection beyond the standard hull policy.",
      image: ASSET.c3,
      alt: ALT.c3,
    },
    {
      n: "04",
      title: "Worldwide territory",
      body:
        "Negotiated geographic limits including transit, ferry flights, charter operations and AOG ferry.",
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
              What the programme covers
            </p>
            <h2
              className="font-heading font-extrabold uppercase text-white"
              style={{
                fontSize: "clamp(1.65rem, 3.6vw, 2.6rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.025em",
              }}
            >
              Hull, liability,
              <br />
              <span className="text-cta">worldwide territory.</span>
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
            Light, midsize and heavy business jets up to $40M hull. Owner-flown,
            fractional and managed-aircraft programmes: Part 91 to start,
            Part 135 charter in 2027.
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
              Why join early?
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
              Founder pricing,{" "}
              <span style={{ color: CREAM_GOLD_TEXT }}>
                locked for the first term.
              </span>
            </h3>
            <p
              className="text-[15px] leading-relaxed"
              style={{ color: `${CREAM_INK}b8` }}
            >
              Aviation premiums are driven by hull value, pilot experience
              and territory, not annual mileage. We&rsquo;re negotiating
              founder rates with three Lloyd&rsquo;s syndicates and two
              North American aerospace specialists. The first{" "}
              <span className="font-semibold" style={{ color: CREAM_INK }}>
                100 owners
              </span>{" "}
              onboard at locked-in pricing.
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

function Waitlist() {
  return (
    <section
      className="relative pb-28 pt-12 sm:pb-36 sm:pt-16"
      style={{ backgroundColor: CREAM, color: CREAM_INK }}
    >
      <div className="mx-auto max-w-5xl px-6 sm:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease }}
          className="mx-auto mb-12 max-w-3xl text-center"
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
            Founder programme
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
            100 spots.{" "}
            <span style={{ color: CREAM_GOLD_TEXT }}>No card. No contract.</span>
          </h2>
          <p
            className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed"
            style={{ color: `${CREAM_INK}b0` }}
          >
            Joining the waitlist secures founder pricing and priority
            onboarding when we launch. That&rsquo;s it. Decline the audit
            or use it as leverage with your current broker.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="relative overflow-hidden rounded-3xl p-8 sm:rounded-[36px] sm:p-12"
          style={{ backgroundColor: "#0a0a0a", color: "#ffffff" }}
        >
          <div className="grid gap-8 sm:grid-cols-12 sm:items-center">
            <div className="sm:col-span-7">
              <p
                className="font-heading text-[10px] font-semibold uppercase tracking-[0.36em]"
                style={{ color: "#ffc83d" }}
              >
                Reserve your spot
              </p>
              <h3
                className="mt-3 font-heading font-extrabold uppercase"
                style={{
                  fontSize: "clamp(1.3rem, 2vw, 1.75rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                }}
              >
                Founder pricing locked
                <br />
                <span style={{ color: "#ffc83d" }}>for your first term.</span>
              </h3>
              <p
                className="mt-4 max-w-md text-[14px] leading-relaxed"
                style={{ color: "rgba(255,255,255,0.9)" }}
              >
                Onboarding starts in chronological order. Earlier on the
                list = earlier in the queue when binders go live.
              </p>
            </div>
            <div className="flex sm:col-span-5 sm:justify-end">
              <Link
                href={WAITLIST_HREF}
                className="group inline-flex items-center gap-3 rounded-full bg-cta px-8 py-4 font-heading text-[12px] font-bold uppercase tracking-[0.16em] text-background transition-transform duration-200 hover:-translate-y-0.5 hover:bg-cta-hover"
                style={{ boxShadow: "0 24px 50px -20px rgba(255,200,61,0.55)" }}
              >
                Join the waitlist
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
      title: "Join the waitlist",
      body:
        "Two minutes. Aircraft type, pilot ratings, current carrier. That's it. No card.",
      meta: "≈ 2 min",
    },
    {
      n: "02",
      title: "Binders go live",
      body:
        "Q3 2026: three Lloyd's syndicates and two North American aerospace specialists open quotes for the founder cohort.",
      meta: "Q3 2026",
    },
    {
      n: "03",
      title: "Founder audit",
      body:
        "We benchmark your hull value, pilot experience and territory across the five carriers. Founder pricing locked.",
      meta: "Within 2 weeks",
    },
    {
      n: "04",
      title: "Bind or decline",
      body:
        "Accept the audit, or use the report as leverage with your current broker. No obligation either way.",
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
              Waitlist now,
              <br />
              <span className="text-cta">audit at launch.</span>
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed text-text-secondary sm:col-span-5">
            From waitlist signup to a binder-ready audit. Founder pricing
            is locked the day you accept, no renegotiation at year two.
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
                Spots are first-come
              </p>
              <h3
                className="mt-3 font-heading font-extrabold uppercase text-white"
                style={{
                  fontSize: "clamp(1.3rem, 2vw, 1.75rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                }}
              >
                100 founder spots.{" "}
                <span className="text-cta">No card. No commitment.</span>
              </h3>
            </div>
            <div className="flex sm:col-span-5 sm:justify-end">
              <Link
                href={WAITLIST_HREF}
                className="group inline-flex items-center gap-3 rounded-full bg-cta px-8 py-4 font-heading text-[12px] font-bold uppercase tracking-[0.16em] text-background transition-transform duration-200 hover:-translate-y-0.5 hover:bg-cta-hover"
                style={{ boxShadow: "0 24px 50px -20px rgba(255,200,61,0.55)" }}
              >
                Reserve a spot
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
          From a founding client
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease, delay: 0.08 }}
          className="mt-6 font-heading font-extrabold uppercase"
          style={{
            fontSize: "clamp(1.5rem, 3.4vw, 2.4rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: CREAM_INK,
          }}
        >
          &ldquo;AiM saved us{" "}
          <span style={{ color: CREAM_GOLD_TEXT }}>$8,400 a year</span> on the
          yacht. I&rsquo;m on the jet waitlist before they even launch.
          Founder pricing is a no-brainer.&rdquo;
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease, delay: 0.16 }}
          className="mx-auto mt-6 text-[14px] uppercase tracking-[0.24em]"
          style={{ color: `${CREAM_INK}cc` }}
        >
          Alexander V. · Yacht client, future jet owner
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
            href={WAITLIST_HREF}
            className="group inline-flex items-center gap-3 rounded-full px-9 py-4 font-heading text-[12px] font-bold uppercase tracking-[0.16em] transition-transform duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: "#0a0a0a", color: CREAM }}
          >
            Join the waitlist
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
              Call us 602-910-2500
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
      q: "When does AiM's jet programme officially launch?",
      a: "Q3 2026. We are finalising binders with three Lloyd's syndicates and two North American aerospace specialists. Waitlist members will be onboarded first, in chronological order, with founder pricing locked for the first policy term.",
    },
    {
      q: "What aircraft types will be covered?",
      a: "Light, midsize and heavy business jets, super-mids, turboprops and select rotorcraft. Initial focus is owner-flown and fractionally owned aircraft up to $40M hull value. Larger heavy-iron and commercial-style fleets are phase two.",
    },
    {
      q: "Does the waitlist commit me to anything?",
      a: "No. Joining the waitlist secures founder pricing and priority onboarding when we launch. That's it. You can decline the audit, accept it, or use it as leverage with your current broker. No card, no contract.",
    },
    {
      q: "How does jet insurance pricing differ from boat or yacht?",
      a: "Aviation premiums are driven by hull value, pilot experience, aircraft type and geographic territory, not annual mileage. Pilot training records, type ratings and recurrent-training currency are the biggest single levers we negotiate.",
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
              Founder programme · Q3 2026
            </p>
            <h2
              className="font-heading font-extrabold uppercase text-white"
              style={{
                fontSize: "clamp(1.7rem, 4vw, 3.2rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
              }}
            >
              Be first off the runway.
              <br />
              <span className="text-cta">Lock founder pricing.</span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-text-secondary sm:text-[15.5px]">
              Reserve a founder spot today. Onboarding starts in
              chronological order. Earlier you join, sooner you fly.
            </p>
            <div className="mt-9 flex flex-col gap-5 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
              <Link
                href={WAITLIST_HREF}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-cta px-8 py-4 font-heading text-[12px] font-bold uppercase tracking-[0.16em] text-background transition-transform duration-200 hover:-translate-y-0.5 hover:bg-cta-hover sm:px-9"
                style={{ boxShadow: "0 24px 50px -20px rgba(255,200,61,0.55)" }}
              >
                Join the waitlist
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
                  Or call 602-910-2500
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
