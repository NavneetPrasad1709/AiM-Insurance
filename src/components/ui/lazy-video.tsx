"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

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

    // Mobile: never download the clip. A decorative background video costs
    // ~1.4MB and, because it repaints the same element, it becomes the LCP
    // (poster paints at ~1.3s, video dragged LCP to 6.3s). The poster alone
    // is the identical first frame, so phones get the visual for 110KB.
    if (window.matchMedia?.("(max-width: 768px)").matches) return;

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
    <>
      {/*
        The poster goes through next/image rather than the <video poster>
        attribute: that attribute is a raw URL, so it shipped the full-size
        JPG to every device and became a slow LCP. As an Image it is served
        responsively as AVIF/WebP at the device's real width.
      */}
      <Image
        src={poster}
        alt={ariaLabel}
        fill
        priority={eager}
        sizes="100vw"
        className={cn("object-cover", className)}
      />
      <video
        ref={ref}
        // `src` intentionally omitted until `load` flips: no bytes are fetched
        // before that, and the poster above carries the visual.
        src={load ? src : undefined}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden
        tabIndex={-1}
        className={cn(className, load ? "opacity-100" : "opacity-0")}
      />
    </>
  );
}

export default LazyVideo;
