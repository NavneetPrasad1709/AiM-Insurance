"use client";

import { useEffect, useRef, useState } from "react";

export interface LazyVideoProps {
  /** MP4 source. Only fetched once the video is actually needed. */
  src: string;
  /** Poster image. Paints immediately, so it (not the video) is the LCP candidate. */
  poster: string;
  ariaLabel: string;
  className?: string;
  /**
   * Above-the-fold video: start fetching as soon as the browser goes idle
   * instead of waiting for a scroll. Still deferred so the poster paints first.
   */
  eager?: boolean;
}

/**
 * Background video that never blocks first paint.
 *
 * The poster renders immediately and the `src` stays unset until the clip is
 * genuinely needed, so a below-the-fold CTA video costs 0 bytes until the user
 * scrolls to it. Honors prefers-reduced-motion by showing the poster only.
 */
export function LazyVideo({
  src,
  poster,
  ariaLabel,
  className,
  eager = false,
}: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion: keep the poster, never pull the video down.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    if (eager) {
      // Let the poster paint (and LCP settle) before the video competes for bandwidth.
      const ric = window.requestIdleCallback;
      if (typeof ric === "function") {
        const id = ric(() => setLoad(true), { timeout: 2500 });
        return () => window.cancelIdleCallback?.(id);
      }
      const t = window.setTimeout(() => setLoad(true), 1200);
      return () => window.clearTimeout(t);
    }

    if (typeof IntersectionObserver === "undefined") {
      setLoad(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setLoad(true);
          obs.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [eager]);

  return (
    <video
      ref={ref}
      // `src` intentionally omitted until `load` flips: no bytes are fetched
      // before that, and the poster carries the visual.
      src={load ? src : undefined}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-label={ariaLabel}
      className={className}
    />
  );
}

export default LazyVideo;
