"use client";

import { useEffect, useRef, useState } from "react";

export interface CountUpProps {
  /** Display string like "$1,247", "$6.14M+", "1100+", "5.0". The numeric portion is animated. */
  value: string;
  /** Total animation time in ms */
  durationMs?: number;
  /** Decimal places to round to (auto-detected from input if omitted) */
  decimals?: number;
  className?: string;
}

interface Parsed {
  prefix: string;
  number: number;
  suffix: string;
  decimals: number;
}

function parse(value: string): Parsed {
  // Accept digits, dots, AND commas in the number portion so values
  // like "$1,247" parse as 1247 (not 1 + suffix ",247").
  const m = value.match(/^([^\d.,]*)([\d.,]+)([^\d.,]*)$/);
  if (!m) return { prefix: "", number: 0, suffix: value, decimals: 0 };
  const [, prefix, num, suffix] = m;
  const decimalsMatch = num.match(/\.(\d+)/);
  // Strip thousands commas before parseFloat; toLocaleString re-inserts them on output.
  const cleanNum = num.replace(/,/g, "");
  return {
    prefix,
    number: parseFloat(cleanNum),
    suffix,
    decimals: decimalsMatch ? decimalsMatch[1].length : 0,
  };
}

function format(n: number, decimals: number): string {
  return n.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function CountUp({
  value,
  durationMs = 1600,
  decimals,
  className,
}: CountUpProps) {
  const parsed = parse(value);
  const finalDecimals = decimals ?? parsed.decimals;
  const ref = useRef<HTMLSpanElement>(null);
  // Render the FINAL value as the initial state: no "0" flash on SSR or
  // before the element scrolls into view. When inView fires, we snap to 0
  // and animate up.
  const finalDisplay =
    parsed.prefix + format(parsed.number, finalDecimals) + parsed.suffix;
  const [display, setDisplay] = useState<string>(finalDisplay);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;

    let frame = 0;
    let observer: IntersectionObserver | null = null;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const runAnimation = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs);
        const eased = 1 - Math.pow(1 - t, 3);
        const n = parsed.number * eased;
        setDisplay(parsed.prefix + format(n, finalDecimals) + parsed.suffix);
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          observer?.disconnect();
          runAnimation();
        }
      },
      { rootMargin: "-80px" },
    );
    observer.observe(el);

    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [parsed.number, parsed.prefix, parsed.suffix, finalDecimals, durationMs]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ fontVariantNumeric: "tabular-nums" }}
      aria-label={value}
    >
      {display}
    </span>
  );
}

export default CountUp;
