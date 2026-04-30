"use client";

/**
 * Pure-SVG ambience layer for AiM Insurance.
 * Zero raster assets, infinite scaling, lighthouse-safe.
 * Every component renders aria-hidden + pointer-events-none so it never
 * interferes with content or assistive tech.
 *
 * Palette (matches IMAGE_PROMPTS.md brand block):
 *   gold      #ffc83d
 *   gold-soft #fff5d4
 *   charcoal  #0a0a0a
 *   ivory     #fbfaf5
 */

import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─────────────────────────────────────────────────────────────────────────
   GoldParticleField — drifting gold dots as a hero overlay.
   Suggested: hero right column, CTA banner, calculator preview.
───────────────────────────────────────────────────────────────────────── */
export function GoldParticleField({
  className,
  density = 24,
  opacity = 0.6,
}: {
  className?: string;
  density?: number;
  opacity?: number;
}) {
  const reduce = useReducedMotion();
  const id = useId();
  const particles = Array.from({ length: density }, (_, i) => {
    const seed = (i + 1) * 13.37;
    return {
      cx: ((Math.sin(seed) * 0.5 + 0.5) * 100).toFixed(2),
      cy: ((Math.cos(seed * 1.7) * 0.5 + 0.5) * 100).toFixed(2),
      r: 0.25 + ((seed * 17) % 1) * 1.4,
      delay: (i % 7) * 0.4,
      duration: 5 + ((seed * 11) % 4),
      blur: i % 4 === 0 ? 1.4 : 0,
    };
  });

  return (
    <svg
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className,
      )}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
      style={{ opacity }}
    >
      <defs>
        <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffc83d" stopOpacity="1" />
          <stop offset="60%" stopColor="#ffc83d" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffc83d" stopOpacity="0" />
        </radialGradient>
      </defs>
      {particles.map((p, i) => (
        <motion.circle
          key={i}
          cx={`${p.cx}%`}
          cy={`${p.cy}%`}
          r={p.r}
          fill={`url(#${id}-glow)`}
          style={{ filter: p.blur ? `blur(${p.blur}px)` : undefined }}
          initial={{ opacity: 0.3 }}
          animate={
            reduce
              ? undefined
              : {
                  opacity: [0.3, 0.9, 0.3],
                  y: [0, -6, 0],
                }
          }
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   CornerOrnament — three nested gold quarter-arcs + dots in a corner.
   Suggested: testimonial card, CTA banner, hero corner accent.
───────────────────────────────────────────────────────────────────────── */
export function CornerOrnament({
  position = "tl",
  className,
  size = 140,
  opacity = 0.5,
}: {
  position?: "tl" | "tr" | "bl" | "br";
  className?: string;
  size?: number;
  opacity?: number;
}) {
  const rotate = {
    tl: 0,
    tr: 90,
    br: 180,
    bl: 270,
  }[position];

  const positionClass = {
    tl: "top-0 left-0",
    tr: "top-0 right-0",
    bl: "bottom-0 left-0",
    br: "bottom-0 right-0",
  }[position];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      className={cn(
        "pointer-events-none absolute",
        positionClass,
        className,
      )}
      style={{ transform: `rotate(${rotate}deg)`, opacity }}
      aria-hidden
    >
      {/* Three concentric quarter-arcs */}
      {[
        { r: 56, w: 1 },
        { r: 78, w: 1 },
        { r: 100, w: 0.75 },
      ].map((arc, i) => (
        <motion.path
          key={i}
          d={`M 0,${arc.r} A ${arc.r},${arc.r} 0 0 1 ${arc.r},0`}
          fill="none"
          stroke="#ffc83d"
          strokeWidth={arc.w}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: i * 0.15, ease: EASE }}
        />
      ))}
      {/* Dots punctuating the middle arc */}
      {[
        { angle: 30, r: 78, size: 2 },
        { angle: 55, r: 78, size: 1.5 },
        { angle: 80, r: 78, size: 1.5 },
      ].map((d, i) => {
        const x = Number((d.r * Math.cos((d.angle * Math.PI) / 180)).toFixed(3));
        const y = Number((d.r * Math.sin((d.angle * Math.PI) / 180)).toFixed(3));
        return (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r={d.size}
            fill="#ffc83d"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.1, ease: EASE }}
          />
        );
      })}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   SectionDividerArc — full-width sweeping gold arc with 5 rest-points.
   Suggested: drop between any two sections as a visual breath.
───────────────────────────────────────────────────────────────────────── */
export function SectionDividerArc({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("relative w-full overflow-hidden py-8", className)}
    >
      <svg
        viewBox="0 0 1600 120"
        className="mx-auto block w-full max-w-[1600px]"
        preserveAspectRatio="xMidYMid meet"
      >
        <motion.path
          d="M 40,90 Q 400,20 900,40 T 1560,70"
          fill="none"
          stroke="#ffc83d"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.6, ease: EASE }}
        />
        {[
          { cx: 200, cy: 60 },
          { cx: 540, cy: 35 },
          { cx: 900, cy: 40 },
          { cx: 1240, cy: 55 },
          { cx: 1480, cy: 70 },
        ].map((p, i) => (
          <motion.circle
            key={i}
            cx={p.cx}
            cy={p.cy}
            r="3.5"
            fill="#ffc83d"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.12, ease: EASE }}
          />
        ))}
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   AuroraStrands — three slow-flowing translucent gold ribbons.
   Suggested: behind major heading sections, after pain-stats.
───────────────────────────────────────────────────────────────────────── */
export function AuroraStrands({
  className,
  opacity = 0.4,
}: {
  className?: string;
  opacity?: number;
}) {
  const reduce = useReducedMotion();
  const id = useId();

  return (
    <svg
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className,
      )}
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      style={{ opacity }}
    >
      <defs>
        <linearGradient id={`${id}-strand`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffc83d" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffc83d" stopOpacity="1" />
          <stop offset="100%" stopColor="#ffc83d" stopOpacity="0" />
        </linearGradient>
        <filter id={`${id}-blur`}>
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      {[
        { d: "M -100,200 Q 300,80 600,260 T 1300,200", w: 28, dur: 14 },
        { d: "M -100,360 Q 350,500 720,300 T 1300,400", w: 22, dur: 18 },
        { d: "M -100,140 Q 400,260 800,140 T 1300,260", w: 18, dur: 22 },
      ].map((s, i) => (
        <motion.path
          key={i}
          d={s.d}
          fill="none"
          stroke={`url(#${id}-strand)`}
          strokeWidth={s.w}
          strokeLinecap="round"
          filter={`url(#${id}-blur)`}
          initial={{ pathLength: 0 }}
          whileInView={{
            pathLength: 1,
            x: reduce ? 0 : [0, -20, 0],
          }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{
            pathLength: { duration: 2, ease: EASE },
            x: {
              duration: s.dur,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   QuoteMarkAccent — sculpted decorative quote glyph (two teardrops).
   Suggested: behind testimonial blocks at low opacity.
───────────────────────────────────────────────────────────────────────── */
export function QuoteMarkAccent({
  className,
  size = 200,
  opacity = 0.18,
}: {
  className?: string;
  size?: number;
  opacity?: number;
}) {
  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 200 280"
      className={cn("pointer-events-none absolute", className)}
      style={{ opacity }}
      aria-hidden
    >
      <defs>
        <linearGradient id="quoteGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffc83d" stopOpacity="1" />
          <stop offset="100%" stopColor="#ffc83d" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {/* Upper teardrop */}
      <path
        d="M 60,30 Q 30,30 30,80 Q 30,120 80,120 L 100,80 Q 100,30 60,30 Z"
        fill="url(#quoteGrad)"
      />
      {/* Lower teardrop */}
      <path
        d="M 130,30 Q 100,30 100,80 Q 100,120 150,120 L 170,80 Q 170,30 130,30 Z"
        fill="url(#quoteGrad)"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MonogramMark — geometric medallion. Footer mark, watermark accent.
───────────────────────────────────────────────────────────────────────── */
export function MonogramMark({
  className,
  size = 96,
  opacity = 1,
}: {
  className?: string;
  size?: number;
  opacity?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={cn("inline-block", className)}
      style={{ opacity }}
      aria-hidden
    >
      <defs>
        <linearGradient id="monoRing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffc83d" />
          <stop offset="100%" stopColor="#d9a52f" />
        </linearGradient>
      </defs>
      {/* Outer ring */}
      <circle
        cx="60"
        cy="60"
        r="54"
        fill="none"
        stroke="url(#monoRing)"
        strokeWidth="2"
      />
      <circle
        cx="60"
        cy="60"
        r="48"
        fill="none"
        stroke="#ffc83d"
        strokeWidth="0.5"
        strokeOpacity="0.4"
      />
      {/* Interlocking arcs forming abstract "i" */}
      <path
        d="M 60,28 Q 80,28 80,48"
        fill="none"
        stroke="#ffc83d"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M 60,92 Q 40,92 40,72"
        fill="none"
        stroke="#ffc83d"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="60"
        y1="48"
        x2="60"
        y2="72"
        stroke="#ffc83d"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="60" cy="36" r="3" fill="#ffc83d" />
      {/* Centre dot */}
      <circle cx="60" cy="60" r="2" fill="#0a0a0a" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   GrainTexture — subtle film-grain overlay using SVG turbulence.
   Suggested: hero or any dark section to add tactility.
───────────────────────────────────────────────────────────────────────── */
export function GrainTexture({
  className,
  opacity = 0.12,
}: {
  className?: string;
  opacity?: number;
}) {
  const id = useId();
  return (
    <svg
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full mix-blend-screen",
        className,
      )}
      aria-hidden
      style={{ opacity }}
    >
      <filter id={`${id}-grain`}>
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.85"
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix
          values="0 0 0 0 1
                  0 0 0 0 0.78
                  0 0 0 0 0.24
                  0 0 0 0.6 0"
        />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id}-grain)`} />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   PaperPlaneAccent — sleek paper plane in flight w/ gold trail.
   Suggested: beside newsletter form.
───────────────────────────────────────────────────────────────────────── */
export function PaperPlaneAccent({
  className,
  size = 80,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={cn("inline-block", className)}
      initial={{ opacity: 0, x: -16, y: 8 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: EASE }}
      aria-hidden
    >
      <defs>
        <linearGradient id="planeBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbfaf5" />
          <stop offset="100%" stopColor="#e8e0c8" />
        </linearGradient>
        <linearGradient id="planeTrail" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffc83d" stopOpacity="0" />
          <stop offset="100%" stopColor="#ffc83d" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      {/* Trail */}
      <motion.path
        d="M 8,80 Q 35,72 60,60"
        fill="none"
        stroke="url(#planeTrail)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
      />
      {/* Plane body */}
      <path
        d="M 60,60 L 100,30 L 90,68 L 78,62 L 70,80 L 68,66 Z"
        fill="url(#planeBody)"
        stroke="#0a0a0a"
        strokeOpacity="0.15"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
      {/* Crease line */}
      <line
        x1="60"
        y1="60"
        x2="78"
        y2="62"
        stroke="#0a0a0a"
        strokeOpacity="0.18"
        strokeWidth="0.5"
      />
    </motion.svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   FloatingCardsBackdrop — frosted glass cards drifting at varied depths.
   Pure CSS, no SVG. Drop behind any card grid for "depth" feel.
───────────────────────────────────────────────────────────────────────── */
export function FloatingCardsBackdrop({
  className,
  opacity = 0.25,
}: {
  className?: string;
  opacity?: number;
}) {
  const reduce = useReducedMotion();
  const cards = [
    { top: "8%", left: "6%", w: 120, h: 76, rot: -8, dur: 9 },
    { top: "22%", left: "78%", w: 96, h: 60, rot: 6, dur: 11 },
    { top: "62%", left: "12%", w: 140, h: 88, rot: 4, dur: 13 },
    { top: "70%", left: "82%", w: 84, h: 54, rot: -5, dur: 10 },
    { top: "40%", left: "44%", w: 160, h: 100, rot: -2, dur: 15 },
  ];

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      style={{ opacity }}
    >
      {cards.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={
            reduce
              ? { opacity: 1 }
              : { opacity: [0.6, 1, 0.6], y: [0, -8, 0] }
          }
          transition={{
            duration: c.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
          className="absolute rounded-md border"
          style={{
            top: c.top,
            left: c.left,
            width: c.w,
            height: c.h,
            transform: `rotate(${c.rot}deg)`,
            background:
              "linear-gradient(135deg, rgba(255,200,61,0.06), rgba(255,200,61,0.02))",
            borderColor: "rgba(255,200,61,0.18)",
            backdropFilter: "blur(2px)",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   OrbitLoader — small three-arc orbital spinner.
   Suggested: quote modal submit, blog skeletons.
───────────────────────────────────────────────────────────────────────── */
export function OrbitLoader({
  className,
  size = 64,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      className={cn("inline-block", className)}
      aria-hidden
    >
      <circle cx="40" cy="40" r="6" fill="#ffc83d" />
      {[
        { r: 18, dur: 2.2, dir: 1 },
        { r: 26, dur: 3.6, dir: -1 },
        { r: 34, dur: 5, dir: 1 },
      ].map((o, i) => (
        <motion.g
          key={i}
          animate={{ rotate: 360 * o.dir }}
          transition={{
            duration: o.dur,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ originX: "40px", originY: "40px" } as never}
        >
          <circle
            cx="40"
            cy="40"
            r={o.r}
            fill="none"
            stroke="#ffc83d"
            strokeWidth="0.7"
            strokeOpacity="0.4"
            strokeDasharray={`${o.r * 4} ${o.r * 6}`}
          />
          <circle cx={40 + o.r} cy="40" r="2" fill="#ffc83d" />
        </motion.g>
      ))}
    </svg>
  );
}
