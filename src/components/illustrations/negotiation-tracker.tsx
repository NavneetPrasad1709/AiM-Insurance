"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NegotiationTrackerProps {
  className?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Crafted product-UI illustration. Replaces legacy cartoon mascots.
 * Looks like an internal AiM negotiation dashboard — that signal beats
 * any vector-art character at converting premium leads.
 */
export function NegotiationTracker({ className }: NegotiationTrackerProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
      className={cn(
        "relative w-full max-w-[460px] rounded-[12px] border border-[#232328] bg-[#111113] p-5 sm:p-6 font-[var(--font-inter)]",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex size-7 items-center justify-center rounded-md bg-[#1a1a1f] border border-[#232328]">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffc83d"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z" />
            </svg>
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
              AiM Concierge
            </span>
            <span className="text-[13px] font-semibold text-white">
              Premium negotiation
            </span>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0a1612] border border-[#4fe0b0]/30 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#4fe0b0]">
          <span className="relative inline-flex size-1.5">
            <span className="absolute inset-0 rounded-full bg-[#4fe0b0] animate-ping opacity-70" />
            <span className="relative size-1.5 rounded-full bg-[#4fe0b0]" />
          </span>
          Live
        </span>
      </div>

      {/* Status row */}
      <div className="mt-5 flex items-center gap-2 text-[12px]">
        <span className="font-semibold text-[#e8e8ec]">Day 4</span>
        <span className="text-white">·</span>
        <span className="text-white">Negotiating Allstate adjuster</span>
      </div>

      {/* Premium delta */}
      <div className="mt-4 rounded-[8px] border border-[#232328] bg-[#0a0a0a] p-4">
        <div className="text-[10px] uppercase tracking-[0.18em] font-semibold text-white">
          Annual Premium
        </div>
        <div className="mt-2 flex items-baseline gap-3">
          <span className="text-base font-semibold text-white line-through tabular-nums">
            $3,214
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9a9aa3"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
          <span className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums tracking-[-0.02em]">
            $2,367
          </span>
        </div>

        {/* Saving callout — handwritten-ish, Citrine */}
        <div className="mt-3 inline-flex items-center gap-2">
          <span
            className="text-[#ffc83d] text-base font-bold tabular-nums"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            −$847 saved
          </span>
          <svg
            width="46"
            height="8"
            viewBox="0 0 46 8"
            fill="none"
            aria-hidden
          >
            <motion.path
              d="M1 5 Q 12 1, 23 4 T 45 3"
              stroke="#ffc83d"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
            />
          </svg>
        </div>
      </div>

      {/* Sparkline */}
      <div className="mt-4 rounded-[8px] border border-[#232328] bg-[#0a0a0a] p-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-white">
            Quote progression
          </span>
          <span className="text-[10px] font-bold tabular-nums text-white">
            6 carriers
          </span>
        </div>
        <svg
          viewBox="0 0 280 64"
          className="mt-3 w-full h-14"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffc83d" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#ffc83d" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,18 L40,22 L80,16 L120,28 L160,38 L200,46 L240,52 L280,56 L280,64 L0,64 Z"
            fill="url(#sparkFill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          />
          <motion.path
            d="M0,18 L40,22 L80,16 L120,28 L160,38 L200,46 L240,52 L280,56"
            fill="none"
            stroke="#ffc83d"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, delay: 0.4, ease: EASE }}
          />
          {/* End point marker */}
          <motion.circle
            cx="280"
            cy="56"
            r="3"
            fill="#ffc83d"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 1.8, ease: EASE }}
          />
        </svg>
        <div className="mt-1 flex items-center justify-between text-[10px] font-semibold text-white tabular-nums">
          <span>$3,214</span>
          <span>$2,367</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-semibold text-white">Negotiation progress</span>
          <span className="font-bold tabular-nums text-white">70%</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#1a1a1f]">
          <motion.div
            className="h-full rounded-full bg-[#ffc83d]"
            initial={{ width: 0 }}
            animate={{ width: "70%" }}
            transition={{ duration: 1.2, delay: 0.8, ease: EASE }}
          />
        </div>
        <div className="mt-2 text-[10px] font-semibold text-white">
          Day 4 of 7 estimated · final quote shared on close
        </div>
      </div>
    </motion.div>
  );
}

export default NegotiationTracker;
