import Image from "next/image";
import Link from "next/link";
import { LazyVideo } from "@/components/ui/lazy-video";
import { RevealObserver } from "@/components/ui/reveal";
import { ICONS } from "@/lib/icons";
import { ExploreMoreServices } from "@/components/sections/explore-more-services";
import { FaqRow } from "./faq-row";

/* ---------------------------------------------------------------------------
   Yacht Insurance: Montserrat only, alternating dark + cream sections.
   Smooth blend: each section has rounded-top corners and overlaps the
   previous via negative margin, creating a curved-page transition.
--------------------------------------------------------------------------- */

const CREAM = "#faf6ee";    // light section bg
const CREAM_INK = "#0c1626"; // text color on cream
const CREAM_GOLD = "#b8842a"; // deeper gold for legible accent text on cream
const CREAM_GOLD_TEXT = "#8a6410"; // AA-contrast gold for text on cream (>=4.6:1)

const ASSET = {
  heroPoster: "/yacht/yacht-hero.jpg",
  heroVideo: "/yacht/hero.mp4",
  coverage1: "/yacht/yacht-c1.jpg",
  coverage2: "/yacht/yacht-c2.jpg",
  coverage3: "/yacht/yacht-c3.jpg",
  coverage4: "/yacht/yacht-c4.jpg",
  split1: "/yacht/yacht-s1.jpg",
  split2: "/yacht/yacht-s2.jpg",
  ctaPoster: "/yacht/yacht-cta.jpg",
  ctaVideo: "/yacht/cta.mp4",
};

/* ─────────────────────────────────────────────────────────────────── */

export function YachtPage() {
  return (
    <main className="bg-background text-white">
      <RevealObserver />
      <Hero />
      <TrustStrip />
      <Stats />
      <Coverage />
      <WhyMatters />
      <Pricing />
      <Process />
      <SocialProof />
      <Faq />
      <ExploreMoreServices currentSlug="yacht-insurance" />
      <Cta />
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <LazyVideo
        src={ASSET.heroVideo}
        poster={ASSET.heroPoster}
        ariaLabel="Luxury yacht cruising at sea"
        eager
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Cinematic gradient + side scrim for readability */}
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

      {/* Top bar */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 py-4 sm:px-12 sm:py-5">
        <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.32em] text-white">
          AiM · Yacht insurance
        </span>
        <span className="hidden font-heading text-[10px] font-semibold uppercase tracking-[0.32em] text-white sm:block">
          USA &amp; Canada · 1100+ clients
        </span>
      </div>

      {/* Bottom-anchored content */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-20 sm:px-12 sm:pb-28">
        <div className="mx-auto max-w-7xl">
          <span className="inline-flex items-center gap-3 font-heading text-[10px] font-semibold uppercase tracking-[0.36em] text-cta">
            <span className="h-px w-12 bg-cta" />
            Serving the USA &amp; Canada
          </span>

          <h1
            className="mt-6 font-heading font-extrabold uppercase text-white text-balance"
            style={{
              fontSize: "clamp(1.85rem, 5vw, 4.2rem)",
              lineHeight: 0.96,
              letterSpacing: "-0.03em",
            }}
          >
            Smarter savings.
            <br />
            <span className="text-cta">Better coverage.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
            We monitor your existing yacht insurance to make sure
            you&rsquo;re getting the best premium for the same coverage,
            continuously comparing rates across major providers so you never
            overpay.
          </p>

          <div className="mt-9 flex flex-col items-start gap-5 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <Link
              href="/contact?service=yacht-insurance"
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
              className="group inline-flex items-center gap-2 py-2 text-sm text-white transition-colors hover:text-cta"
            >
              <ICONS.Phone className="size-4" aria-hidden />
              <span className="border-b border-white/30 pb-0.5 transition-colors group-hover:border-cta">
                Or call: 602-910-2500
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="illu-float flex flex-col items-center gap-2 font-heading text-[9px] uppercase tracking-[0.36em] text-white">
          <span>Scroll</span>
          <span className="h-8 w-px bg-white/40" aria-hidden />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────── */

function TrustStrip() {
  const items: { label: string; icon: keyof typeof ICONS }[] = [
    { label: "USA & Canada", icon: "Anchor" },
    { label: "1100+ clients", icon: "Award" },
    { label: "Ongoing monitoring", icon: "Eye" },
    { label: "Same coverage", icon: "Shield" },
    { label: "Annual reviews", icon: "Clock" },
  ];

  return (
    <section
      className="relative -mt-12 rounded-t-[48px] sm:rounded-t-[72px]"
      style={{ backgroundColor: CREAM, color: CREAM_INK }}
    >
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-14 sm:px-12 sm:pt-20">
        {/* Eyebrow */}
        <p
          className="mb-7 text-center font-heading text-[10px] font-semibold uppercase tracking-[0.36em] sm:mb-9"
          style={{ color: CREAM_GOLD_TEXT }}
        >
          <span
            aria-hidden
            className="mr-3 inline-block h-px w-10 align-middle"
            style={{ backgroundColor: CREAM_GOLD }}
          />
          Trusted by yacht owners
          <span
            aria-hidden
            className="ml-3 inline-block h-px w-10 align-middle"
            style={{ backgroundColor: CREAM_GOLD }}
          />
        </p>

        {/* Pills row */}
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

/* ─────────────────────────────────────────────────────────────────── */

function Stats() {
  const STATS = [
    { value: "60%", label: "Yacht owners overpay" },
    { value: "15 to 40%", label: "Average annual saving" },
    { value: "1100+", label: "Clients served" },
  ];
  return (
    <section
      className="relative pb-24 pt-16 sm:pb-32 sm:pt-20"
      style={{ backgroundColor: CREAM, color: CREAM_INK }}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
          {STATS.map((s) => (
            <div
              key={s.label}
              data-reveal
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
                style={{ color: `${CREAM_INK}e6` }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────── */

function Coverage() {
  const items = [
    {
      n: "01",
      title: "Ongoing price monitoring",
      body:
        "We continuously check rates across major providers, so the moment a better price appears, you know.",
      image: ASSET.coverage1,
    },
    {
      n: "02",
      title: "No coverage changes",
      body:
        "Keep the same protection, just at a lower cost. We compare like-for-like, never trim cover.",
      image: ASSET.coverage2,
    },
    {
      n: "03",
      title: "Seamless adjustments",
      body:
        "If a better price is available, we guide the switch smoothly, every form, every signature.",
      image: ASSET.coverage3,
    },
    {
      n: "04",
      title: "Annual policy reviews",
      body:
        "Renewal-time check that ensures you never pay more than necessary, year after year.",
      image: ASSET.coverage4,
    },
  ];

  return (
    <section className="relative -mt-12 rounded-t-[48px] bg-background pb-28 pt-28 sm:rounded-t-[72px] sm:pb-36 sm:pt-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        <div className="mb-16 grid items-end gap-8 sm:grid-cols-12">
          <div data-reveal className="sm:col-span-7">
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
              Smarter savings,
              <br />
              <span className="text-cta">same coverage.</span>
            </h2>
          </div>
          <p
            data-reveal
            className="text-[15px] leading-relaxed text-text-secondary sm:col-span-5"
          >
            We monitor your existing yacht insurance to make sure
            you&rsquo;re getting the best premium for the same protection,
            comparing rates across major providers so you never overpay.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((c) => (
            <article
              key={c.n}
              data-reveal
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-colors duration-300 hover:border-cta/50"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.title}
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────── */

function WhyMatters() {
  return (
    <section
      className="relative -mt-12 overflow-hidden rounded-t-[48px] py-24 sm:rounded-t-[72px] sm:py-32"
      style={{ backgroundColor: CREAM, color: CREAM_INK }}
    >
      <div className="relative mx-auto max-w-7xl px-6 sm:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
          <figure data-reveal className="relative lg:col-span-7">
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-3xl sm:rounded-[40px]">
              <div className="absolute inset-0" aria-hidden>
                <div className="relative h-[120%] w-full">
                  <Image
                    src={ASSET.split1}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 56vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <span
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 60%, rgba(10,10,10,0.35) 100%)",
                }}
              />
            </div>
          </figure>

          <div data-reveal className="lg:col-span-5">
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
              Over 60% of yacht owners are{" "}
              <span style={{ color: CREAM_GOLD_TEXT }}>
                unknowingly overpaying.
              </span>
            </h3>
            <p
              className="text-[15px] leading-relaxed"
              style={{ color: `${CREAM_INK}e6` }}
            >
              Many policies increase in cost over time, even when the risk
              factors stay the same. Insurers rarely tell you when cheaper
              options become available, and a 2024 study found policyholders
              who actively compare prices save{" "}
              <span className="font-semibold" style={{ color: CREAM_INK }}>
                $23,000 to $31,000
              </span>{" "}
              a year.
            </p>
            <span
              className="mt-9 block h-px w-14"
              style={{ backgroundColor: CREAM_GOLD }}
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────── */

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
        <div data-reveal className="mx-auto mb-16 max-w-3xl text-center">
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
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {tiers.map((t, i) => (
            <article
              key={t.tag}
              data-reveal
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
                  href="/contact?service=yacht-insurance"
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────── */

interface Step {
  n: string;
  title: string;
  body: string;
  meta: string;
}

function ProcessStepCard({ step: s }: { step: Step }) {
  return (
    <article
      data-reveal
      className="group relative flex flex-col rounded-3xl border border-border bg-surface p-7 transition-[transform,border-color,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-cta/60 hover:bg-surface-2 sm:p-8"
    >
      {/* Yellow numeral - scales up on card hover */}
      <span
        aria-hidden
        data-reveal
        className="font-heading font-extrabold tabular-nums text-cta"
        style={{
          fontSize: "clamp(2.7rem, 4vw, 3.6rem)",
          lineHeight: 0.9,
          letterSpacing: "-0.04em",
          display: "inline-block",
          transformOrigin: "left center",
        }}
      >
        <span
          className="inline-block transition-transform duration-300 group-hover:scale-110"
          style={{ transformOrigin: "left center" }}
        >
          {s.n}
        </span>
      </span>

      {/* Step eyebrow */}
      <p className="mt-5 font-heading text-[10px] font-semibold uppercase tracking-[0.32em] text-text-muted">
        Step {s.n}
      </p>

      {/* Title */}
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

      {/* Body */}
      <p className="mt-3 flex-1 text-[14px] leading-relaxed text-text-secondary">
        {s.body}
      </p>

      {/* Footer meta - animates underline on hover */}
      <div className="mt-7 flex items-center justify-between border-t border-border pt-5">
        <span className="font-heading text-[10px] font-semibold uppercase tabular-nums tracking-[0.28em] text-cta">
          {s.meta}
        </span>
        <span
          aria-hidden
          className="block h-px w-8 origin-right bg-cta transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-[2.4]"
        />
      </div>

      {/* Hover glow - brightens on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow: "0 32px 70px -28px rgba(255,200,61,0.50)",
        }}
      />

      {/* Brass corner tick - appears on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-5 top-5 h-4 w-4 -rotate-45 border-t-2 border-cta opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </article>
  );
}

function Process() {
  const steps = [
    {
      n: "01",
      title: "Submit your policy",
      body:
        "Share your existing yacht or boat insurance details. Five minutes. Fully encrypted.",
      meta: "≈ 5 min",
    },
    {
      n: "02",
      title: "We analyse & compare",
      body:
        "Our system checks for lower-priced alternatives with the same coverage as your current policy.",
      meta: "2 to 3 days",
    },
    {
      n: "03",
      title: "Savings report",
      body:
        "If we find a better rate, we notify you with actionable recommendations, in plain English.",
      meta: "Same week",
    },
    {
      n: "04",
      title: "You save effortlessly",
      body:
        "Follow our guidance to adjust your policy and lock in savings. We handle every form.",
      meta: "When ready",
    },
  ];

  return (
    <section className="relative -mt-12 overflow-hidden rounded-t-[48px] bg-background pb-32 pt-28 sm:rounded-t-[72px] sm:pb-40 sm:pt-32">
      {/* Ambient yellow radial glow - top center */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,200,61,0.16), transparent 70%)",
        }}
      />
      {/* Soft side glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-[460px] w-[460px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,200,61,0.10), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-12">
        {/* Header */}
        <div data-reveal className="mb-20 grid items-end gap-8 sm:grid-cols-12">
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
        </div>

        {/* Steps grid */}
        <div className="relative">
          {/* Connector - desktop only, sits at the height of step circles */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-x-12 top-[78px] hidden lg:block"
            height="2"
            preserveAspectRatio="none"
            viewBox="0 0 100 2"
          >
            <line
              x1="2"
              y1="1"
              x2="98"
              y2="1"
              stroke="#ffc83d"
              strokeOpacity="0.45"
              strokeWidth="0.5"
            />
          </svg>

          <div className="relative grid gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((s) => (
              <ProcessStepCard key={s.n} step={s} />
            ))}
          </div>
        </div>

        {/* Bottom CTA panel - 2-tone refined */}
        <div
          data-reveal
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
                href="/contact?service=yacht-insurance"
                className="group inline-flex items-center gap-3 rounded-full bg-cta px-8 py-4 font-heading text-[12px] font-bold uppercase tracking-[0.16em] text-background transition-transform duration-200 hover:-translate-y-0.5 hover:bg-cta-hover"
                style={{
                  boxShadow: "0 24px 50px -20px rgba(255,200,61,0.55)",
                }}
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
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────── */

function SocialProof() {
  return (
    <section
      className="relative -mt-12 rounded-t-[48px] py-24 sm:rounded-t-[72px] sm:py-32"
      style={{ backgroundColor: CREAM, color: CREAM_INK }}
    >
      <div className="mx-auto max-w-5xl px-6 text-center sm:px-12">
        <p
          data-reveal
          className="font-heading text-[10px] font-semibold uppercase tracking-[0.36em]"
          style={{ color: CREAM_GOLD_TEXT }}
        >
          <span
            className="mr-3 inline-block h-px w-12 align-middle"
            style={{ backgroundColor: CREAM_GOLD }}
            aria-hidden
          />
          Trusted by owners
        </p>

        <h2
          data-reveal
          className="mt-6 font-heading font-extrabold uppercase"
          style={{
            fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.03em",
            color: CREAM_INK,
          }}
        >
          <span style={{ color: CREAM_GOLD_TEXT }}>1100+</span> clients served,
          and counting.
        </h2>

        <p
          data-reveal
          className="mx-auto mt-7 max-w-2xl text-[16px] leading-relaxed"
          style={{ color: `${CREAM_INK}e6` }}
        >
          With premiums on the rise and most owners overpaying, owners across
          the USA and Canada are letting AiM monitor their policies, quietly,
          continuously, in the background.
        </p>

        <div
          data-reveal
          className="mt-10 flex flex-wrap items-center justify-center gap-5"
        >
          <Link
            href="/contact?service=yacht-insurance"
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
            className="inline-flex items-center gap-2 py-2 text-sm transition-colors"
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
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────── */

function Faq() {
  const items = [
    {
      q: "Do I have to switch insurers?",
      a: "Only if you want to. We show you what you could save. The choice to switch is always yours. Many clients stay put after using our report to renegotiate with their current carrier.",
    },
    {
      q: "Will my coverage change?",
      a: "No. We compare like-for-like: same limits, same deductibles, same endorsements. We hunt rates, not coverage gaps.",
    },
    {
      q: "What does it cost?",
      a: "Nothing upfront. If we can't reduce your premium, you owe nothing. When we do save you money, we keep a small portion of the negotiated savings, first year only. You always pay less than before.",
    },
    {
      q: "How often do you re-check my premium?",
      a: "Continuously. Every renewal cycle, plus mid-term whenever the market moves enough to make a switch worthwhile.",
    },
  ];
  return (
    <section className="relative -mt-12 rounded-t-[48px] bg-background pb-28 pt-28 sm:rounded-t-[72px] sm:pb-36 sm:pt-32">
      <div className="mx-auto max-w-3xl px-6 sm:px-12">
        <div data-reveal className="mb-14">
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
        </div>

        <div className="border-t border-border">
          {items.map((f, i) => (
            <FaqRow key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────── */

function Cta() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden sm:h-auto sm:min-h-0">
      {/* Media layer */}
      <div className="absolute inset-0 sm:relative sm:aspect-[21/9] sm:h-auto">
        <LazyVideo
          src={ASSET.ctaVideo}
          poster={ASSET.ctaPoster}
          ariaLabel="Yacht sailing into open water"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Mobile overlay - only darken the bottom for headline contrast */}
        <div
          aria-hidden
          className="absolute inset-0 sm:hidden"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, transparent 35%, rgba(10,10,10,0.78) 100%)",
          }}
        />
        {/* Desktop side-weighted overlay - only darken the left half */}
        <div
          aria-hidden
          className="absolute inset-0 hidden sm:block"
          style={{
            background:
              "linear-gradient(110deg, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.30) 45%, transparent 75%)",
          }}
        />
      </div>

      {/* Content layer */}
      <div className="absolute inset-0 flex items-end pb-16 sm:items-center sm:pb-0">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-12">
          <div data-reveal className="max-w-2xl">
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
              Let&rsquo;s cut your yacht insurance costs.
              <br />
              <span className="text-cta">Set sail with confidence.</span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-text-secondary sm:text-[15.5px]">
              Send us your current policy and let AiM start saving you money
              today, knowing you&rsquo;re never overpaying.
            </p>
            <div className="mt-9 flex flex-col gap-5 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
              <Link
                href="/contact?service=yacht-insurance"
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
                className="group inline-flex items-center gap-2 py-2 text-sm text-white transition-colors hover:text-cta"
              >
                <ICONS.Phone className="size-4" aria-hidden />
                <span className="border-b border-white/30 pb-0.5 transition-colors group-hover:border-cta">
                  Or call: 602-910-2500
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
