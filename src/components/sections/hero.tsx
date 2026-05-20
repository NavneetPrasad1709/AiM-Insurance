import Image from "next/image";
import Link from "next/link";
import { CountUp } from "@/components/ui/count-up";
import { HeroQuoteButton } from "@/components/sections/hero-quote-button";
import { ICONS } from "@/lib/icons";

const TRUST_PILLS = [
  { icon: "Shield" as const, label: "BBB Accredited" },
  { icon: "Star" as const, label: "Google 5.0" },
  { icon: "Award" as const, label: "Featured · Newswire" },
] as const;

const CARRIERS = [
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
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-background"
    >
      {/* Static ambient gradients — pure CSS, no JS, no motion. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full opacity-80 blur-3xl sm:h-[720px] sm:w-[720px]"
          style={{
            background:
              "radial-gradient(closest-side, rgb(255 200 61 / 0.35), rgb(255 200 61 / 0.18) 55%, transparent 75%)",
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full opacity-80 blur-3xl sm:h-[640px] sm:w-[640px]"
          style={{
            background:
              "radial-gradient(closest-side, rgb(4 107 210 / 0.30), rgb(79 224 176 / 0.16) 55%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1320px] px-5 pt-24 pb-16 sm:px-8 sm:pt-28 sm:pb-20 lg:px-10 lg:pt-32 lg:pb-24">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* LEFT — copy. No framer-motion: hero text paints on FCP. */}
          <div className="relative z-10 flex flex-col gap-5 sm:gap-6 lg:col-span-6">
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
              <span className="block">Never overpay</span>
              <span className="block">your insurance</span>
              <span className="block">
                premiums. <span className="text-[#ffc83d]">Ever.</span>
              </span>
            </h1>

            <p className="max-w-xl text-[17px] leading-[1.55] text-[#b0b5c2] sm:text-lg">
              A dedicated concierge that negotiates lower premiums while
              keeping the same coverage you already trust. Clients save{" "}
              <span className="font-semibold text-[#ffc83d] tabular-nums">
                <CountUp value="$1,247" />
                /yr
              </span>{" "}
              on average — same coverage, lower cost.
            </p>

            <div className="flex flex-col flex-wrap gap-3 pt-1 sm:flex-row">
              <HeroQuoteButton />
              <Link
                href="/contact?intent=call"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#232328] bg-[#111113] px-7 py-4 text-base font-semibold text-white transition-colors duration-150 hover:border-[#9a9aa3]/50 hover:bg-[#1a1a1f]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <ICONS.Phone className="size-4 text-[#ffc83d]" aria-hidden />
                Book a 15-min call
              </Link>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#4fe0b0]/30 bg-[#0a1612] px-4 py-2 text-[13px]">
              <ICONS.CheckCircle2 className="size-4 text-[#4fe0b0]" aria-hidden />
              <span className="font-semibold tabular-nums text-[#e8e8ec]">
                $0 if no savings · No upfront cost · Takes 5 min
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-3">
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex"
                  role="img"
                  aria-label="5 star rating"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <ICONS.Star
                      key={i}
                      className="size-3.5 fill-[#ffc83d] text-[#ffc83d]"
                      aria-hidden
                    />
                  ))}
                </span>
                <span className="text-sm font-semibold tabular-nums text-[#e8e8ec]">
                  1000+
                </span>
                <span className="text-sm text-white">
                  clients · USA · Canada · UAE
                </span>
              </div>
              <div className="hidden h-3.5 w-px bg-[#232328] sm:block" />
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-white">
                {TRUST_PILLS.map((p) => {
                  const Icon = ICONS[p.icon];
                  return (
                    <li
                      key={p.label}
                      className="inline-flex items-center gap-1.5"
                    >
                      <Icon
                        className="size-3.5 text-[#ffc83d]"
                        aria-hidden
                      />
                      {p.label}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* RIGHT — LCP image. No motion wrapper, no scroll-zoom.
              priority + fetchPriority="high" let it race FCP. */}
          <div className="relative flex w-full items-center justify-center lg:col-span-6">
            <Image
              src="/brand/illustrations/hero-driver.webp"
              alt="AiM client and a $1,247/yr savings card — same coverage, lower premium"
              width={1600}
              height={1200}
              priority
              fetchPriority="high"
              quality={70}
              sizes="(max-width: 480px) 88vw, (max-width: 1024px) 56vw, 640px"
              className="relative z-10 mx-auto h-auto w-full max-w-[640px] lg:max-w-none"
            />
          </div>
        </div>

        {/* Carrier marquee — pure CSS animation. */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <p
            className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-white"
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
              {CARRIERS.concat(CARRIERS).map((p, i) => (
                <span
                  key={`${p}-${i}`}
                  className="inline-flex shrink-0 items-center gap-12 text-sm font-semibold uppercase tracking-[0.18em] text-white"
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
