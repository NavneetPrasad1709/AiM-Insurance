"use client";

import { useQuoteModal } from "@/lib/quote-modal-context";

/**
 * Tiny client island for the hero's primary CTA. Kept out of the main
 * Hero component so Hero itself can stay a Server Component - no
 * framer-motion, no hooks in the LCP tree.
 */
export function HeroQuoteButton() {
  const { openModal } = useQuoteModal();

  return (
    <button
      type="button"
      onClick={() => openModal()}
      className="btn-shine cta-primary inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <span>Get my free quote</span>
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
  );
}
