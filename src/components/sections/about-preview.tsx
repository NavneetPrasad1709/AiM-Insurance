"use client";

import Link from "next/link";
import { m as motion } from "framer-motion";

export function AboutPreview() {
  return (
    <section
      aria-label="About AiM Insurance"
      className="relative bg-background-cream py-24 sm:py-32 lg:py-48 border-y border-[#232328]"
    >
      <div className="relative mx-auto max-w-3xl px-5 sm:px-8 lg:px-12 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-[#232328] bg-[#111113] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <span className="size-1.5 rounded-full bg-[#ffc83d]" />
          About AiM
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 text-white"
          style={{
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            fontFamily: "var(--font-inter)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
          }}
        >
          Insurance shouldn&apos;t take{" "}
          <span className="text-[#ffc83d]">advantage of you.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-lg text-white max-w-2xl mx-auto leading-[1.55]"
        >
          Founded by Neel Mehta of Car Concierge Pro, AiM is built on a simple
          idea: our negotiators work for you, not the carriers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10"
        >
          <Link
            href="/about"
            className="link-underline inline-flex items-center gap-2 text-white text-base font-semibold"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Read our story
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
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutPreview;
