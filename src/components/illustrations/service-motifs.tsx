"use client";

import { m as motion, useReducedMotion } from "framer-motion";
import { useId, type ReactElement } from "react";

/**
 * Per-service signature motif: small decorative SVG (~180 to 220px) that lives
 * behind the hero copy. Subtle, low opacity, brand-gold + service-accent thread.
 *
 * Each motif uses unique gradient IDs (via useId) so multiple services can
 * coexist on the page (e.g., the related-services strip) without ID collisions.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

interface MotifProps {
  className?: string;
  size?: number;
  opacity?: number;
}

/* ─────────────────────────────── CAR ─── */
export function CarMotif({
  className,
  size = 220,
  opacity = 0.55,
}: MotifProps) {
  const id = useId();
  const reduce = useReducedMotion();
  return (
    <svg
      width={size}
      height={size * 0.66}
      viewBox="0 0 220 145"
      className={className}
      style={{ opacity }}
      aria-hidden
    >
      <defs>
        <linearGradient id={`${id}-road`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e85d04" stopOpacity="0.0" />
          <stop offset="60%" stopColor="#e85d04" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ffc83d" stopOpacity="1" />
        </linearGradient>
      </defs>
      {/* Perspective road lines converging to vanishing point */}
      {[0, 1, 2, 3, 4].map((i) => {
        const offset = (i - 2) * 28;
        return (
          <motion.line
            key={i}
            x1={110 + offset}
            y1="140"
            x2={110}
            y2="60"
            stroke={`url(#${id}-road)`}
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: reduce ? 0 : 1.2,
              delay: i * 0.08,
              ease: EASE,
            }}
          />
        );
      })}
      {/* Speedometer arc */}
      <motion.path
        d="M 50,90 A 60,60 0 0 1 170,90"
        fill="none"
        stroke="#ffc83d"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="3 6"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0 : 1.4, delay: 0.4, ease: EASE }}
      />
      {/* Needle */}
      <motion.line
        x1="110"
        y1="90"
        x2="142"
        y2="62"
        stroke="#e85d04"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ rotate: -120, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{
          duration: reduce ? 0 : 1.6,
          delay: 0.8,
          ease: EASE,
        }}
        style={{ transformOrigin: "110px 90px" }}
      />
      <circle cx="110" cy="90" r="3.5" fill="#ffc83d" />
    </svg>
  );
}

/* ────────────────────────────── HOME ─── */
export function HomeMotif({
  className,
  size = 200,
  opacity = 0.55,
}: MotifProps) {
  const id = useId();
  const reduce = useReducedMotion();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      style={{ opacity }}
      aria-hidden
    >
      <defs>
        <linearGradient id={`${id}-glow`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c97e4f" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ffc83d" stopOpacity="0.45" />
        </linearGradient>
      </defs>
      {/* Roof silhouette */}
      <motion.path
        d="M 30,110 L 100,50 L 170,110"
        fill="none"
        stroke="#ffc83d"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0 : 1.6, ease: EASE }}
      />
      {/* House body outline */}
      <motion.path
        d="M 50,110 L 50,170 L 150,170 L 150,110"
        fill="none"
        stroke="#ffc83d"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.5 }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0 : 1.4, delay: 0.4, ease: EASE }}
      />
      {/* Glowing window: hearth */}
      <motion.rect
        x="86"
        y="125"
        width="28"
        height="36"
        fill={`url(#${id}-glow)`}
        rx="2"
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0 : 0.8, delay: 1, ease: EASE }}
      />
      {/* Window cross */}
      <line x1="100" y1="125" x2="100" y2="161" stroke="#0a0a0a" strokeWidth="1" opacity="0.5" />
      <line x1="86" y1="143" x2="114" y2="143" stroke="#0a0a0a" strokeWidth="1" opacity="0.5" />
      {/* Smoke chimney curl */}
      <motion.path
        d="M 130,55 Q 140,40 130,28 Q 120,18 130,8"
        fill="none"
        stroke="#c97e4f"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="2 4"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.6 }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0 : 1.5, delay: 1.4, ease: EASE }}
      />
    </svg>
  );
}

/* ────────────────────────────── BOAT ─── */
export function BoatMotif({
  className,
  size = 220,
  opacity = 0.6,
}: MotifProps) {
  const id = useId();
  const reduce = useReducedMotion();
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 220 154"
      className={className}
      style={{ opacity }}
      aria-hidden
    >
      <defs>
        <linearGradient id={`${id}-wave`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0077b6" stopOpacity="0" />
          <stop offset="50%" stopColor="#0077b6" stopOpacity="1" />
          <stop offset="100%" stopColor="#0077b6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-sail`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffc83d" />
          <stop offset="100%" stopColor="#ff8c42" />
        </linearGradient>
      </defs>
      {/* Three drifting waves */}
      {[
        { y: 110, delay: 0 },
        { y: 124, delay: 0.2 },
        { y: 138, delay: 0.4 },
      ].map((w, i) => (
        <motion.path
          key={i}
          d={`M 0,${w.y} Q 55,${w.y - 6} 110,${w.y} T 220,${w.y}`}
          fill="none"
          stroke={`url(#${id}-wave)`}
          strokeWidth="1.8"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: reduce ? 0 : 1.4,
            delay: w.delay,
            ease: EASE,
          }}
        />
      ))}
      {/* Sailboat: hull */}
      <motion.path
        d="M 70,108 L 150,108 L 130,118 L 90,118 Z"
        fill="#0a0a0a"
        stroke="#ffc83d"
        strokeWidth="1.5"
        initial={{ y: 14, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0 : 1, delay: 0.4, ease: EASE }}
      />
      {/* Mast */}
      <motion.line
        x1="110"
        y1="108"
        x2="110"
        y2="32"
        stroke="#ffc83d"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0 : 0.8, delay: 0.6, ease: EASE }}
      />
      {/* Triangular sail */}
      <motion.path
        d="M 110,32 L 110,100 L 152,100 Z"
        fill={`url(#${id}-sail)`}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 0.85 }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0 : 1.2, delay: 0.9, ease: EASE }}
        style={{ transformOrigin: "110px 50px" }}
      />
      {/* Sun */}
      <motion.circle
        cx="180"
        cy="38"
        r="9"
        fill="#ffc83d"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.8 }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0 : 0.6, delay: 1.2, ease: "backOut" }}
      />
    </svg>
  );
}

/* ───────────────────────────── YACHT ─── */
export function YachtMotif({
  className,
  size = 220,
  opacity = 0.55,
}: MotifProps) {
  const id = useId();
  const reduce = useReducedMotion();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 220 220"
      className={className}
      style={{ opacity }}
      aria-hidden
    >
      <defs>
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1d4e89" />
          <stop offset="60%" stopColor="#c9b07a" />
          <stop offset="100%" stopColor="#ffc83d" />
        </linearGradient>
      </defs>
      {/* Outer compass ring */}
      <motion.circle
        cx="110"
        cy="110"
        r="84"
        fill="none"
        stroke={`url(#${id}-rim)`}
        strokeWidth="1.6"
        initial={{ pathLength: 0, rotate: -90 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0 : 2, ease: EASE }}
        style={{ transformOrigin: "110px 110px" }}
      />
      {/* Inner ring */}
      <circle
        cx="110"
        cy="110"
        r="68"
        fill="none"
        stroke="#ffc83d"
        strokeWidth="0.6"
        opacity="0.4"
      />
      {/* Compass cardinal ticks */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const r1 = i % 2 === 0 ? 78 : 82;
        const rad = (deg * Math.PI) / 180;
        const x1 = 110 + r1 * Math.cos(rad);
        const y1 = 110 + r1 * Math.sin(rad);
        const x2 = 110 + 84 * Math.cos(rad);
        const y2 = 110 + 84 * Math.sin(rad);
        return (
          <motion.line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#ffc83d"
            strokeWidth={i % 2 === 0 ? 1.5 : 0.8}
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: i % 2 === 0 ? 1 : 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.06 }}
          />
        );
      })}
      {/* Anchor body */}
      <motion.path
        d="M 110,72 L 110,150 M 86,148 Q 110,170 134,148 M 96,108 L 124,108"
        fill="none"
        stroke="#ffc83d"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0 : 1.6, delay: 0.5, ease: EASE }}
      />
      {/* Anchor ring */}
      <motion.circle
        cx="110"
        cy="68"
        r="6"
        fill="none"
        stroke="#1d4e89"
        strokeWidth="2"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1.2, ease: "backOut" }}
      />
      {/* Subtle sparkles */}
      {[
        { x: 50, y: 50, d: 0.8 },
        { x: 170, y: 60, d: 1.0 },
        { x: 180, y: 170, d: 1.2 },
        { x: 40, y: 168, d: 1.4 },
      ].map((s, i) => (
        <motion.path
          key={i}
          d={`M ${s.x} ${s.y - 4} L ${s.x + 1} ${s.y - 1} L ${s.x + 4} ${s.y} L ${s.x + 1} ${s.y + 1} L ${s.x} ${s.y + 4} L ${s.x - 1} ${s.y + 1} L ${s.x - 4} ${s.y} L ${s.x - 1} ${s.y - 1} Z`}
          fill="#ffc83d"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: s.d, ease: "backOut" }}
        />
      ))}
    </svg>
  );
}

/* ─────────────────────────────── JET ─── */
export function JetMotif({
  className,
  size = 220,
  opacity = 0.55,
}: MotifProps) {
  const id = useId();
  const reduce = useReducedMotion();
  return (
    <svg
      width={size}
      height={size * 0.66}
      viewBox="0 0 220 145"
      className={className}
      style={{ opacity }}
      aria-hidden
    >
      <defs>
        <linearGradient id={`${id}-trail`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#48cae4" stopOpacity="0" />
          <stop offset="40%" stopColor="#90e0ef" stopOpacity="0.7" />
          <stop offset="80%" stopColor="#ffc83d" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ffc83d" stopOpacity="1" />
        </linearGradient>
        <radialGradient id={`${id}-sky`} cx="50%" cy="100%" r="80%">
          <stop offset="0%" stopColor="#48cae4" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#48cae4" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Sky atmospheric gradient backdrop */}
      <rect x="0" y="0" width="220" height="145" fill={`url(#${id}-sky)`} />
      {/* Altitude grid lines */}
      {[40, 65, 90, 115].map((y, i) => (
        <motion.line
          key={y}
          x1="10"
          y1={y}
          x2="210"
          y2={y}
          stroke="#48cae4"
          strokeWidth="0.6"
          strokeDasharray="2 6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.45 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.1 }}
        />
      ))}
      {/* Contrail */}
      <motion.path
        d="M 14,118 Q 80,108 130,72 T 198,32"
        fill="none"
        stroke={`url(#${id}-trail)`}
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0 : 2, ease: EASE }}
      />
      {/* Cloud puffs: soft white with sky tint */}
      {[
        { x: 32, y: 96, r: 5, d: 0.6 },
        { x: 60, y: 90, r: 4, d: 0.9 },
        { x: 92, y: 78, r: 5, d: 1.2 },
        { x: 130, y: 60, r: 4, d: 1.5 },
      ].map((c, i) => (
        <motion.circle
          key={i}
          cx={c.x}
          cy={c.y}
          r={c.r}
          fill="#caf0f8"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: c.d, ease: "backOut" }}
        />
      ))}
      {/* Jet silhouette: minimal triangle nose with wings */}
      <motion.path
        d="M 198,32 L 188,28 L 184,32 L 180,30 L 174,40 L 180,42 L 184,44 L 188,40 L 198,36 Z"
        fill="#ffc83d"
        initial={{ x: -180, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0 : 2, ease: EASE }}
      />
      {/* Star tip light */}
      <motion.circle
        cx="200"
        cy="32"
        r="2.5"
        fill="#ffc83d"
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.6, 1] }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.2,
        }}
      />
    </svg>
  );
}

/* ─────────── Theme map for use in service pages ─── */

export interface ServiceTheme {
  /** Hex color used in radial halos and accent elements. */
  accent: string;
  /** Decorative motif component for hero. */
  Motif: (props: MotifProps) => ReactElement;
}

export const SERVICE_THEMES: Record<string, ServiceTheme> = {
  "car-insurance": { accent: "#e85d04", Motif: CarMotif },
  "home-insurance": { accent: "#c97e4f", Motif: HomeMotif },
  "boat-insurance": { accent: "#0077b6", Motif: BoatMotif },
  "yacht-insurance": { accent: "#1d4e89", Motif: YachtMotif },
  "jet-insurance": { accent: "#48cae4", Motif: JetMotif },
};
