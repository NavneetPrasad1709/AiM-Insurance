"use client";

import { useEffect } from "react";

/**
 * One IntersectionObserver for every `[data-reveal]` element on the page.
 *
 * Replaces per-element framer-motion reveals. Costs ~1KB of JS instead of the
 * framer-motion runtime, and because the markup is plain HTML the content is
 * rendered by the server with no hydration.
 *
 * Behaviour:
 *  - Mobile (<=768px): does nothing at all. Content is simply visible. No
 *    animation, no observer, no main-thread work.
 *  - prefers-reduced-motion: same, content stays visible.
 *  - Desktop: anything already at/above the fold is shown immediately; only
 *    genuinely below-the-fold elements are "armed" (hidden off-screen) and
 *    animate in on scroll.
 *
 * Fail-open by design: the hidden state is only ever added by JS, so SSR HTML,
 * crawlers and no-JS clients always show the content.
 */
export function RevealObserver() {
  useEffect(() => {
    // Mobile and reduced-motion: leave everything visible, do no work.
    if (
      window.matchMedia("(max-width: 768px)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      return;
    }

    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-revealed");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "-80px" },
    );

    const vh = window.innerHeight || 800;
    const timers: number[] = [];

    for (const el of els) {
      // At/above the fold on mount: show it, never animate. Keeps the hero and
      // first section instant (and out of the LCP critical path).
      if (el.getBoundingClientRect().top < vh) continue;

      // Below the fold: hide (off-screen, so no visible flash) then reveal on scroll.
      el.classList.add("reveal-armed");
      io.observe(el);
      // Safety net: never let content stay hidden. Snap it visible with the
      // transition disabled rather than fading — a half-faded element reports
      // a blended colour, which trips axe/Lighthouse colour-contrast.
      timers.push(
        window.setTimeout(() => {
          el.classList.add("reveal-snap", "is-revealed");
        }, 4000),
      );
    }

    return () => {
      io.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return null;
}

export default RevealObserver;
