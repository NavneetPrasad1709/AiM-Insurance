"use client";

import { m as motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   FloatingOrbs - animated decorative overlays for illustrations.
   Place inside a relative parent. pointer-events-none so they don't block.
   Each variant has its own choreography of orbiting coins, sparkles, dots.
--------------------------------------------------------------------------- */

type OrbType = "coin" | "sparkle" | "dot" | "ring" | "check";

interface OrbSpec {
  type: OrbType;
  /** position as % strings, e.g. "12%", "-4%" */
  top: string;
  left?: string;
  right?: string;
  size: number;
  color?: string;
  delay?: number;
  duration?: number;
  /** orbit radius in px: set for orbital motion, omit for floating-bob */
  orbit?: number;
}

const VARIANTS: Record<string, OrbSpec[]> = {
  hero: [
    { type: "coin", top: "8%", right: "8%", size: 22, delay: 0, duration: 5 },
    { type: "coin", top: "78%", left: "6%", size: 18, delay: 1.2, duration: 6 },
    { type: "sparkle", top: "18%", left: "-2%", size: 18, color: "#ffc83d", delay: 0.4 },
    { type: "sparkle", top: "62%", right: "-2%", size: 14, color: "#4fe0b0", delay: 1.5 },
    { type: "dot", top: "32%", right: "12%", size: 6, color: "#4fe0b0", delay: 0.8 },
    { type: "dot", top: "70%", left: "20%", size: 4, color: "#ff8c42", delay: 1.8 },
  ],
  pain: [
    { type: "coin", top: "10%", left: "0%", size: 14, delay: 0, duration: 4, orbit: 12 },
    { type: "coin", top: "18%", right: "8%", size: 18, delay: 0.6, duration: 5, orbit: 14 },
    { type: "sparkle", top: "5%", right: "20%", size: 14, color: "#ff6a6a", delay: 0.3 },
    { type: "dot", top: "35%", left: "-2%", size: 5, color: "#ff6a6a", delay: 1 },
  ],
  savings: [
    { type: "coin", top: "5%", left: "5%", size: 22, delay: 0, duration: 6 },
    { type: "coin", top: "70%", right: "8%", size: 18, delay: 0.8, duration: 5 },
    { type: "sparkle", top: "20%", right: "5%", size: 18, color: "#ffc83d", delay: 0.5 },
    { type: "sparkle", top: "55%", left: "8%", size: 14, color: "#4fe0b0", delay: 1.2 },
    { type: "dot", top: "85%", left: "30%", size: 5, color: "#4fe0b0", delay: 0.6 },
    { type: "ring", top: "8%", right: "30%", size: 28, color: "#ffc83d", delay: 1, duration: 7 },
  ],
  testimonial: [
    { type: "sparkle", top: "8%", left: "4%", size: 16, color: "#ffc83d", delay: 0 },
    { type: "sparkle", top: "70%", right: "6%", size: 14, color: "#4fe0b0", delay: 0.7 },
    { type: "coin", top: "20%", right: "0%", size: 18, delay: 0.4, duration: 5 },
    { type: "dot", top: "50%", left: "-2%", size: 5, color: "#ffc83d", delay: 1.2 },
  ],
  cta: [
    { type: "coin", top: "5%", left: "8%", size: 20, delay: 0, duration: 6 },
    { type: "coin", top: "12%", right: "12%", size: 22, delay: 0.4, duration: 5 },
    { type: "coin", top: "75%", left: "20%", size: 16, delay: 0.9, duration: 5.5 },
    { type: "coin", top: "82%", right: "18%", size: 18, delay: 1.4, duration: 6.5 },
    { type: "sparkle", top: "30%", left: "-2%", size: 18, color: "#ffc83d", delay: 0.3 },
    { type: "sparkle", top: "40%", right: "-2%", size: 16, color: "#4fe0b0", delay: 1 },
    { type: "dot", top: "55%", left: "12%", size: 5, color: "#ff8c42", delay: 0.6 },
    { type: "dot", top: "65%", right: "8%", size: 6, color: "#ffc83d", delay: 1.5 },
  ],
  pricing: [
    { type: "check", top: "-8%", right: "-8%", size: 24, color: "#4fe0b0", delay: 0 },
    { type: "sparkle", top: "10%", left: "-6%", size: 14, color: "#ffc83d", delay: 0.5 },
    { type: "dot", top: "70%", right: "-4%", size: 5, color: "#4fe0b0", delay: 1 },
  ],
  journey: [
    { type: "coin", top: "20%", left: "8%", size: 16, delay: 0, duration: 5 },
    { type: "coin", top: "70%", right: "12%", size: 14, delay: 0.6, duration: 5 },
    { type: "sparkle", top: "10%", right: "20%", size: 16, color: "#ffc83d", delay: 0.4 },
    { type: "sparkle", top: "80%", left: "30%", size: 14, color: "#4fe0b0", delay: 1.2 },
  ],
};

export function FloatingOrbs({
  variant,
  className,
}: {
  variant: keyof typeof VARIANTS;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const orbs = VARIANTS[variant] ?? [];

  if (reduce) return null;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-visible z-20",
        className
      )}
    >
      {orbs.map((orb, i) => (
        <Orb key={i} {...orb} />
      ))}
    </div>
  );
}

function Orb({
  type,
  top,
  left,
  right,
  size,
  color,
  delay = 0,
  duration = 5,
  orbit,
}: OrbSpec) {
  const baseStyle: React.CSSProperties = { top, left, right };

  // Orbital motion = circular drift; otherwise gentle bob + slight rotate
  const animate = orbit
    ? {
        x: [0, orbit, 0, -orbit, 0],
        y: [0, -orbit, 0, orbit, 0],
        rotate: [0, 360],
      }
    : {
        y: [0, -10, 0, 6, 0],
        x: [0, 4, 0, -3, 0],
        rotate: [-6, 6, -3, 3, -6],
      };

  return (
    <motion.div
      className="absolute"
      style={baseStyle}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: [0, 1, 1, 1, 1],
        scale: 1,
        ...animate,
      }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: {
          duration,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        },
        x: {
          duration,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        },
        rotate: {
          duration: orbit ? duration * 1.5 : duration,
          delay,
          repeat: Infinity,
          ease: orbit ? "linear" : "easeInOut",
        },
      }}
    >
      {type === "coin" && <CoinSVG size={size} />}
      {type === "sparkle" && <SparkleSVG size={size} color={color ?? "#ffc83d"} />}
      {type === "dot" && (
        <span
          className="block rounded-full"
          style={{
            width: size,
            height: size,
            background: color ?? "#ffc83d",
            boxShadow: `0 0 ${size * 1.6}px ${color ?? "#ffc83d"}66`,
          }}
        />
      )}
      {type === "ring" && (
        <span
          className="block rounded-full"
          style={{
            width: size,
            height: size,
            border: `1.5px solid ${color ?? "#ffc83d"}`,
            opacity: 0.6,
          }}
        />
      )}
      {type === "check" && <CheckBadgeSVG size={size} color={color ?? "#4fe0b0"} />}
    </motion.div>
  );
}

/* SVG icons: inline so no asset loading */

function CoinSVG({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="coinFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd75a" />
          <stop offset="100%" stopColor="#e5a82b" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="14" fill="url(#coinFill)" />
      <circle
        cx="16"
        cy="16"
        r="10"
        fill="none"
        stroke="#1a1a1f"
        strokeWidth="1"
        strokeOpacity="0.35"
      />
      <text
        x="16"
        y="21"
        textAnchor="middle"
        fontFamily="system-ui, sans-serif"
        fontWeight="800"
        fontSize="14"
        fill="#1a1a1f"
        fillOpacity="0.85"
      >
        $
      </text>
    </svg>
  );
}

function SparkleSVG({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2 L13.5 9 L20 12 L13.5 15 L12 22 L10.5 15 L4 12 L10.5 9 Z"
        fill={color}
        style={{ filter: `drop-shadow(0 0 ${size / 2}px ${color}88)` }}
      />
    </svg>
  );
}

function CheckBadgeSVG({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="14" fill={color} />
      <path
        d="M10 16 L14 20 L22 12"
        stroke="#0a0a0a"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
