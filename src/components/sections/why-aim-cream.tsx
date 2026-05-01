"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useQuoteModal } from "@/lib/quote-modal-context";
import { ICONS } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface WhyAimCreamProps {
  className?: string;
  /** Heading override per page context. */
  heading?: string;
  intro?: string;
}

const STEPS = [
  {
    icon: ICONS.FileText,
    title: "Share your policy",
    desc: "Upload your declarations page in 60 seconds.",
  },
  {
    icon: ICONS.BarChart3,
    title: "We compare 50+ carriers",
    desc: "Side-by-side benchmark on your exact coverage.",
  },
  {
    icon: ICONS.Handshake,
    title: "We negotiate",
    desc: "We do the back-and-forth. You get the savings.",
  },
];

export function WhyAimCream({
  className,
  heading = "Same coverage. Lower premium. Zero hassle.",
  intro = "We're insurance negotiators — not agents. We work for you, fight your renewal, and only count it as a win if you actually save.",
}: WhyAimCreamProps) {
  const { openModal } = useQuoteModal();

  return (
    <section
      aria-labelledby="why-aim-cream-heading"
      className={cn(
        "relative overflow-hidden bg-[#fbfaf5] py-24 sm:py-28",
        className,
      )}
    >
      {/* Warm washes */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-1/4 h-[420px] w-[420px] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgb(255 200 61 / 0.20), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 -left-24 h-[360px] w-[360px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgb(79 224 176 / 0.14), transparent 70%)",
        }}
      />
      {/* Subtle grid */}
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

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Newswire credibility line */}
        <div className="mx-auto mb-8 flex max-w-2xl items-center justify-center gap-3">
          <span aria-hidden className="h-px flex-1 bg-[#0a0a0a]/15" />
          <Link
            href="https://www.newswire.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full border border-[#ffc83d] bg-white px-4 py-2 transition-colors hover:bg-[#fff5d4]"
          >
            <span className="inline-flex size-5 items-center justify-center rounded-full bg-[#ffc83d] text-[#0a0a0a]">
              <ICONS.Award className="size-3" aria-hidden />
            </span>
            <span className="font-heading text-[10px] font-bold uppercase tracking-[0.22em] text-[#0a0a0a]">
              As featured on
            </span>
            <Image
              src="/brand/newswire-logo.webp"
              alt="Newswire"
              width={92}
              height={22}
              className="h-5 w-auto"
            />
          </Link>
          <span aria-hidden className="h-px flex-1 bg-[#0a0a0a]/15" />
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0a0a0a]/12 bg-white px-3.5 py-1.5 text-[11px] font-heading font-bold uppercase tracking-[0.2em] text-[#0a0a0a]">
            <ICONS.Sparkles className="size-3.5 text-[#ffc83d]" aria-hidden />
            Why AiM
          </span>
          <motion.h2
            id="why-aim-cream-heading"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 font-heading font-extrabold text-[#0a0a0a] tracking-[-0.03em] leading-[1.05] text-balance"
            style={{ fontSize: "clamp(2rem, 4.6vw, 3.2rem)" }}
          >
            {heading.split(".").map((part, i, arr) => (
              <span key={i}>
                {i === 1 ? (
                  <span className="relative inline-block">
                    <span className="relative z-10">{part.trim()}</span>
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-1 h-3 bg-[#ffc83d]/55"
                    />
                  </span>
                ) : (
                  part.trim()
                )}
                {i < arr.length - 1 && part.trim() && ". "}
              </span>
            ))}
          </motion.h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-[1.6] text-[#3a3a44]">
            {intro}
          </p>
        </div>

        <ul className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-3">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative overflow-hidden rounded-[14px] border border-[#0a0a0a]/8 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#ffc83d] hover:shadow-[0_24px_60px_-20px_rgba(255,200,61,0.45)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-[#ffc83d]"
                />
                <div className="text-5xl font-extrabold tabular-nums text-[#0a0a0a]/12 font-heading leading-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <span className="mt-4 inline-flex size-11 items-center justify-center rounded-md bg-[#fff5d4] text-[#0a0a0a] ring-2 ring-[#ffc83d]/40">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 font-heading text-xl font-bold text-[#0a0a0a] leading-snug">
                  {s.title}
                </h3>
                <p className="mt-3 text-base leading-[1.6] text-[#3a3a44]">
                  {s.desc}
                </p>
              </motion.li>
            );
          })}
        </ul>

        {/* Bottom CTA pair */}
        <div className="mx-auto mt-12 flex max-w-md flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => openModal()}
            className="btn-shine cta-primary inline-flex w-full items-center justify-center gap-2 px-7 py-3.5 text-base font-heading font-semibold sm:w-auto"
          >
            Get my free quote
            <ICONS.ArrowRight className="size-4" aria-hidden />
          </button>
          <Link
            href="/calculator"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#0a0a0a]/15 bg-white px-7 py-3.5 text-base font-heading font-semibold text-[#0a0a0a] transition-colors hover:border-[#ffc83d] hover:bg-[#fff5d4] sm:w-auto"
          >
            <ICONS.Calculator className="size-4 text-[#ffc83d]" aria-hidden />
            Estimate savings
          </Link>
        </div>
        <p className="mt-5 text-center text-xs font-heading font-semibold tabular-nums text-[#5a5a64]">
          $0 if no savings · No obligation · Results in 24 hours
        </p>
      </div>
    </section>
  );
}

export default WhyAimCream;
