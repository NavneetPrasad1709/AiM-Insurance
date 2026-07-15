"use client";

import { m as motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------------------------------------------------------------------------
   GuaranteeShield - bold premium emblem with dollar + sparkle.
   Perfect for risk-reversal pills, pricing $0 tier, hero accents.
--------------------------------------------------------------------------- */
export function GuaranteeShield({
  className,
  size = 96,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block", className)}
      initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: EASE }}
      aria-hidden
    >
      <defs>
        <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffc83d" />
          <stop offset="100%" stopColor="#ffc83d" />
        </linearGradient>
        <linearGradient id="shieldGradInner" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a0e0a" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </linearGradient>
      </defs>

      {/* Outer shield */}
      <path
        d="M60 8 L18 22 V58 C18 80 36 102 60 112 C84 102 102 80 102 58 V22 Z"
        fill="url(#shieldGrad)"
      />
      {/* Inner shield */}
      <path
        d="M60 18 L28 30 V58 C28 76 42 92 60 100 C78 92 92 76 92 58 V30 Z"
        fill="url(#shieldGradInner)"
        stroke="#ffc83d"
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
      {/* Dollar sign */}
      <text
        x="60"
        y="72"
        textAnchor="middle"
        fontFamily="var(--font-inter)"
        fontSize="40"
        fontWeight="800"
        fill="#ffc83d"
        style={{ letterSpacing: "-0.04em" }}
      >
        $
      </text>
      {/* Sparkle top-left */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.7, ease: EASE }}
      >
        <path
          d="M24 30 L26 24 L28 30 L34 32 L28 34 L26 40 L24 34 L18 32 Z"
          fill="#ffc83d"
        />
      </motion.g>
      {/* Sparkle bottom-right */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.9, ease: EASE }}
      >
        <path
          d="M96 86 L97 82 L98 86 L102 87 L98 88 L97 92 L96 88 L92 87 Z"
          fill="#ffc83d"
        />
      </motion.g>
      {/* Check seal */}
      <motion.g
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
      >
        <circle cx="86" cy="36" r="14" fill="#4fe0b0" />
        <path
          d="M80 36 L84 40 L92 32"
          fill="none"
          stroke="#0a0a0a"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>
    </motion.svg>
  );
}

/* ---------------------------------------------------------------------------
   CoinStack - abstract decreasing coin tower with downward arrow.
   Use as section decoration, hero ornament, or pain-stats accent.
--------------------------------------------------------------------------- */
export function CoinStack({
  className,
  size = 160,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block", className)}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: EASE }}
      aria-hidden
    >
      <defs>
        <linearGradient id="coinTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffc83d" />
          <stop offset="100%" stopColor="#ffc83d" />
        </linearGradient>
        <linearGradient id="coinBottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4fe0b0" />
          <stop offset="100%" stopColor="#3cc8c0" />
        </linearGradient>
      </defs>

      {/* Tall (high premium) coin stack, left, dimmed */}
      <g opacity="0.35">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <ellipse
            key={i}
            cx="50"
            cy={170 - i * 18}
            rx="34"
            ry="9"
            fill={i === 5 ? "url(#coinTop)" : "#ffc83d"}
            stroke="#1a0e0a"
            strokeWidth="1"
          />
        ))}
        <text
          x="50"
          y={170 - 5 * 18 + 4}
          textAnchor="middle"
          fontFamily="var(--font-inter)"
          fontSize="14"
          fontWeight="800"
          fill="#0a0a0a"
        >
          $
        </text>
      </g>

      {/* Arrow: premium drops */}
      <motion.g
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4, ease: EASE }}
      >
        <motion.path
          d="M88 84 Q 110 96, 130 130"
          fill="none"
          stroke="#ffc83d"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <path
          d="M126 124 L132 132 L140 128"
          fill="none"
          stroke="#ffc83d"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>

      {/* Short (low premium) coin stack, right, full color */}
      <g>
        {[0, 1, 2].map((i) => (
          <ellipse
            key={i}
            cx="150"
            cy={170 - i * 18}
            rx="34"
            ry="9"
            fill={i === 2 ? "url(#coinBottom)" : "#3cc8c0"}
            stroke="#0a1612"
            strokeWidth="1"
          />
        ))}
        <text
          x="150"
          y={170 - 2 * 18 + 4}
          textAnchor="middle"
          fontFamily="var(--font-inter)"
          fontSize="14"
          fontWeight="800"
          fill="#0a0a0a"
        >
          $
        </text>
      </g>

      {/* Annotation */}
      <text
        x="100"
        y="40"
        textAnchor="middle"
        fontFamily="var(--font-inter)"
        fontSize="12"
        fontWeight="700"
        fill="#ffc83d"
        style={{ letterSpacing: "0.18em" }}
      >
        BEFORE → AFTER
      </text>
    </motion.svg>
  );
}

/* ---------------------------------------------------------------------------
   PremiumGauge - semicircular dial showing premium reduction.
   Composable, use as small accent.
--------------------------------------------------------------------------- */
export function PremiumGauge({
  className,
  size = 140,
  percent = 31,
}: {
  className?: string;
  size?: number;
  percent?: number;
}) {
  // map 0-100% to arc 0-180 degrees
  const r = 70;
  const cx = 80;
  const cy = 90;
  const angle = (percent / 100) * 180;
  const endX = cx + r * Math.cos(Math.PI - (angle * Math.PI) / 180);
  const endY = cy - r * Math.sin(Math.PI - (angle * Math.PI) / 180);
  const largeArc = angle > 180 ? 1 : 0;

  return (
    <motion.svg
      width={size}
      height={size * (100 / 160)}
      viewBox="0 0 160 100"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block", className)}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE }}
      aria-hidden
    >
      <defs>
        <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffc83d" />
          <stop offset="60%" stopColor="#ffc83d" />
          <stop offset="100%" stopColor="#4fe0b0" />
        </linearGradient>
      </defs>

      {/* Background arc */}
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none"
        stroke="#232328"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* Foreground arc, animated draw */}
      <motion.path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 ${largeArc} 1 ${endX} ${endY}`}
        fill="none"
        stroke="url(#gaugeGrad)"
        strokeWidth="10"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE }}
      />

      {/* Number */}
      <text
        x={cx}
        y={cy - 8}
        textAnchor="middle"
        fontFamily="var(--font-inter)"
        fontSize="28"
        fontWeight="800"
        fill="#ffffff"
        style={{ letterSpacing: "-0.04em", fontVariantNumeric: "tabular-nums" }}
      >
        {percent}%
      </text>
      <text
        x={cx}
        y={cy + 8}
        textAnchor="middle"
        fontFamily="var(--font-inter)"
        fontSize="9"
        fontWeight="700"
        fill="#e8e8ec"
        style={{ letterSpacing: "0.18em" }}
      >
        AVG REDUCTION
      </text>
    </motion.svg>
  );
}

/* ---------------------------------------------------------------------------
   PressStrip - "AS FEATURED IN" wordmark row.
   Custom-styled text wordmarks, no images.
--------------------------------------------------------------------------- */
export function PressStrip({ className }: { className?: string }) {
  const outlets = [
    { name: "NEWSWIRE", tracking: "0.18em" },
    { name: "Yahoo Finance", tracking: "-0.01em", italic: false },
    { name: "MarketWatch", tracking: "-0.005em" },
    { name: "Benzinga", tracking: "0" },
  ];

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-10 gap-y-4",
        className
      )}
    >
      {outlets.map((o) => (
        <span
          key={o.name}
          className="text-base sm:text-lg font-bold text-white hover:text-white transition-colors duration-150"
          style={{
            fontFamily: "var(--font-inter)",
            letterSpacing: o.tracking,
          }}
        >
          {o.name}
        </span>
      ))}
    </div>
  );
}
