import Image from "next/image";
import { ScrollZoom } from "@/components/ui/scroll-effects";
import { FloatingOrbs } from "@/components/illustrations/floating-orbs";
import { CornerOrnament, QuoteMarkAccent } from "@/components/illustrations/ambience";
import { ICONS } from "@/lib/icons";

interface Testimonial {
  name: string;
  role: string;
  location: string;
  quote: string;
  saved: string;
  carrier: string;
  verified?: string;
}

const FEATURED: Testimonial = {
  name: "Daniel R.",
  role: "Family of four",
  location: "Austin, TX",
  quote:
    "Thanks to AiM, I saved $1,236 annually on my auto insurance. Same reliable, safe coverage. Painless switch.",
  saved: "$1,236/yr",
  carrier: "Switched from GEICO",
  verified: "Verified · Google Review",
};

const SECONDARY: Testimonial[] = [
  {
    name: "Sarah M.",
    role: "Homeowner",
    location: "Toronto, ON",
    quote:
      "AiM saved us $1,400 annually on our auto policy without changing coverage at all. The whole process was hassle-free.",
    saved: "$1,400/yr",
    carrier: "Switched from Allstate",
  },
  {
    name: "Michael K.",
    role: "Small business owner",
    location: "Dubai, UAE",
    quote:
      "Skeptical at first, but they actually found a better rate AND better coverage. Wouldn't go back to negotiating on my own.",
    saved: "$1,850/yr",
    carrier: "Switched from Liberty Mutual",
  },
  {
    name: "Jennifer B.",
    role: "Mother of three",
    location: "Phoenix, AZ",
    quote:
      "Multiple vehicles meant the savings really added up. AiM is genuinely a game-changer for families like ours.",
    saved: "$2,100/yr",
    carrier: "Switched from Progressive",
  },
];

function StarRow({ size = "size-3.5" }: { size?: string }) {
  return (
    <div
      role="img"
      className="inline-flex items-center gap-0.5"
      aria-label="5 out of 5 stars"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <ICONS.Star
          key={i}
          className={`${size} fill-[#ffc83d] text-[#ffc83d]`}
          aria-hidden
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative bg-background py-14 sm:py-20 lg:py-24 overflow-hidden"
    >
      {/* Ambient gradients */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 left-1/3 h-[480px] w-[480px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgb(255 200 61 / 0.16), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgb(255 200 61 / 0.18), transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        {/* Heading */}
        <div className="max-w-3xl">
          <div data-reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#232328] bg-[#111113] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase text-white"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <ICONS.Quote className="size-3.5 text-[#ffc83d]" aria-hidden />
              In their own words
            </span>
          </div>
          <div data-reveal>
            <h2
              id="testimonials-heading"
              className="mt-5 text-white"
              style={{
                fontSize: "clamp(2rem, 4.6vw, 3.4rem)",
                fontFamily: "var(--font-inter)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
              }}
            >
              Real clients. Real savings.{" "}
              <span className="text-[#ffc83d]">Same coverage.</span>
            </h2>
          </div>
          <div data-reveal>
            <p className="mt-5 text-base sm:text-lg leading-[1.55] text-white">
              Average savings of{" "}
              <span className="font-semibold text-[#ffc83d] tabular-nums">
                $1,247/yr
              </span>{" "}
              across 1100+ clients in USA, Canada, and UAE.
            </p>
          </div>
        </div>

        {/* Featured - character + editorial blockquote */}
        <div className="mt-14 lg:mt-20" data-reveal>
          <figure className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center rounded-[12px] border border-[#232328] bg-[#111113] p-7 sm:p-10 lg:p-14 overflow-hidden">
            {/* Warm gradient halo */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, rgb(255 200 61 / 0.32), rgb(255 200 61 / 0.18) 55%, transparent 80%)",
              }}
            />
            {/* Decorative corner ornaments framing the featured testimonial */}
            <CornerOrnament position="tl" size={160} opacity={0.35} />
            <CornerOrnament position="br" size={160} opacity={0.35} />
            {/* Ghosted quote glyph behind the blockquote */}
            <QuoteMarkAccent
              className="right-8 top-8"
              size={120}
              opacity={0.12}
            />

            {/* Character */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div
                aria-hidden
                className="absolute inset-0 flex items-center justify-center"
              >
                <div
                  className="h-96 w-96 rounded-full blur-3xl"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgb(255 200 61 / 0.15), transparent 75%)",
                  }}
                />
              </div>
              <ScrollZoom from={0.94} to={1.04} className="relative z-10 w-full max-w-[460px]">
                <div className="illu-float">
                  <Image
                    src="/brand/illustrations/testimonial-client.webp"
                    alt="Daniel R., AiM client who saved $1,236 a year on auto insurance"
                    width={1024}
                    height={1024}
                    sizes="(min-width: 1024px) 460px, 92vw"
                    className="w-full h-auto"
                  />
                </div>
                <FloatingOrbs variant="testimonial" />
              </ScrollZoom>
            </div>

            {/* Blockquote */}
            <div className="lg:col-span-7 relative z-10">
              <span
                aria-hidden
                className="absolute -top-4 left-0 select-none"
                style={{
                  fontSize: "clamp(7rem, 12vw, 10rem)",
                  fontFamily: "var(--font-inter)",
                  fontWeight: 700,
                  letterSpacing: "-0.08em",
                  lineHeight: 1,
                  color: "#ffc83d",
                  opacity: 0.2,
                }}
              >
                &ldquo;
              </span>

              <blockquote
                className="relative text-white"
                style={{
                  fontSize: "clamp(1.3rem, 2.4vw, 1.9rem)",
                  fontFamily: "var(--font-inter)",
                  fontWeight: 600,
                  letterSpacing: "-0.015em",
                  lineHeight: 1.3,
                }}
              >
                Thanks to{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(120deg, #ffc83d 0%, #ffc83d 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  AiM
                </span>
                , I saved{" "}
                <span className="text-[#ffc83d] tabular-nums">$1,236</span>{" "}
                annually on auto insurance. Same reliable, safe coverage.
                Painless switch.
              </blockquote>

              <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 pt-6 border-t border-[#232328]">
                <div>
                  <div
                    className="font-semibold text-white text-base"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {FEATURED.name}
                  </div>
                  <div className="text-sm text-white">
                    {FEATURED.role} · {FEATURED.location}
                  </div>
                </div>
                <div className="hidden sm:block h-9 w-px bg-[#232328]" />
                <StarRow />
                <span
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#0a1612] border border-[#4fe0b0]/30 px-3 py-1 text-[#4fe0b0] font-bold text-sm tabular-nums"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  <ICONS.TrendingUp className="size-3.5" aria-hidden />
                  Saved {FEATURED.saved}
                </span>
              </figcaption>
              <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-white">
                <ICONS.CheckCircle2 className="size-3.5" aria-hidden />
                {FEATURED.verified} · {FEATURED.carrier}
              </p>
            </div>
          </figure>
        </div>

        {/* Secondary cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4" data-reveal>
          {SECONDARY.map((t) => (
            <div key={t.name}>
              <figure
                className="card-hover group relative h-full rounded-[12px] border border-[#232328] bg-[#111113] p-7 flex flex-col"
              >
                <div className="flex items-center justify-between gap-3">
                  <StarRow />
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#0a1612] border border-[#4fe0b0]/30 px-2.5 py-0.5 text-[#4fe0b0] font-bold text-xs tabular-nums"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    <ICONS.TrendingUp className="size-3" aria-hidden />
                    {t.saved}
                  </span>
                </div>

                <blockquote className="mt-4 text-[15px] leading-[1.55] text-white flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-5 pt-5 border-t border-[#232328]">
                  <div
                    className="font-semibold text-white text-base"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {t.name}
                  </div>
                  <div className="text-xs text-white">
                    {t.role} · {t.location}
                  </div>
                  <div
                    className="mt-1.5 text-[10px] uppercase tracking-[0.16em] font-bold text-white"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {t.carrier}
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
