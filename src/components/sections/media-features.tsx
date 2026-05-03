"use client";

import { m as motion } from "framer-motion";
import { ICONS } from "@/lib/icons";

interface MediaFeature {
  publication: string;
  title: string;
  excerpt: string;
  href: string;
  date: string;
}

const FEATURES: MediaFeature[] = [
  {
    publication: "IssueWire",
    title:
      "AiM Insurance Helps Clients Save Thousands Through Expert Negotiation",
    excerpt:
      "How a small Texas-based negotiation desk is taking on the carrier rate machine — and winning, one declarations page at a time.",
    href: "https://www.issuewire.com/",
    date: "2024",
  },
  {
    publication: "Newswire",
    title: "Car Concierge Pro Launches AiM — Insurance Negotiation as a Service",
    excerpt:
      "Founder Neel Mehta on why insurance shoppers leave money on the table at every renewal — and what AiM does differently.",
    href: "https://www.newswire.com/",
    date: "2024",
  },
];

export function MediaFeatures() {
  return (
    <section
      aria-labelledby="media-heading"
      className="relative overflow-hidden bg-[#fbfaf5] py-24 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/2 h-[400px] w-[400px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgb(79 224 176 / 0.14), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-0 h-[400px] w-[400px] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgb(255 200 61 / 0.16), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-heading font-bold uppercase tracking-[0.22em] text-[#0a0a0a]/70">
            In the press
          </span>
          <h2
            id="media-heading"
            className="mt-3 font-heading font-extrabold text-[#0a0a0a] tracking-[-0.03em] leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 4.4vw, 3rem)" }}
          >
            Featured in
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-2">
          {FEATURES.map((f, i) => (
            <motion.a
              key={f.publication}
              href={f.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#0a0a0a]/10 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#ffc83d] hover:shadow-[0_24px_60px_-20px_rgba(255,200,61,0.45)]"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#fff5d4] ring-1 ring-[#ffc83d]/40 px-3 py-1 text-[11px] font-heading font-bold uppercase tracking-[0.2em] text-[#0a0a0a]">
                  {f.publication}
                </span>
                <span className="text-xs font-heading font-bold uppercase tracking-[0.18em] text-[#5a5a64] tabular-nums">
                  {f.date}
                </span>
              </div>
              <h3 className="mt-5 font-heading text-xl font-bold text-[#0a0a0a] leading-snug transition-colors group-hover:text-[#0a0a0a]">
                {f.title}
              </h3>
              <p className="mt-3 text-base leading-[1.6] text-[#3a3a44]">
                {f.excerpt}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-heading font-bold text-[#0a0a0a] group-hover:text-[#ffc83d] transition-colors">
                Read article
                <ICONS.ExternalLink className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MediaFeatures;
