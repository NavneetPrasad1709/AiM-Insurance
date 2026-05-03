"use client";

import Image from "next/image";
import { m as motion } from "framer-motion";
import { categoryGradient, type MockCategory } from "@/data/mock-posts";
import type { SanityImage } from "@/types";
import { urlFor } from "@/lib/sanity/image";

interface PostHeroArtworkProps {
  category: MockCategory;
  mainImage?: SanityImage | null;
  title?: string;
}

const ACCENTS: Record<MockCategory, { primary: string; secondary: string }> = {
  "Insurance Tips": { primary: "#ffc83d", secondary: "#4fe0b0" },
  "Savings Stories": { primary: "#4fe0b0", secondary: "#ffc83d" },
  Guides: { primary: "#ffc83d", secondary: "#ff8c42" },
  "Industry News": { primary: "#ff8c42", secondary: "#ffc83d" },
};

export function PostHeroArtwork({ category, mainImage, title }: PostHeroArtworkProps) {
  const accent = ACCENTS[category];

  if (mainImage?.asset?._ref) {
    const src = urlFor(mainImage).width(1600).fit("max").auto("format").url();
    return (
      <div className="relative aspect-[16/8] w-full overflow-hidden rounded-2xl border border-border">
        <Image
          src={src}
          alt={mainImage.alt ?? title ?? ""}
          fill
          sizes="(min-width: 1024px) 960px, 100vw"
          priority
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="relative aspect-[16/8] w-full overflow-hidden rounded-2xl border border-border"
      style={{ background: categoryGradient(category) }}
    >
      {/* Multi-radial light source */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(50% 60% at 25% 30%, ${accent.primary}38 0%, transparent 60%), radial-gradient(45% 60% at 80% 70%, ${accent.secondary}28 0%, transparent 65%)`,
        }}
      />

      {/* Dotted background grid */}
      <svg
        aria-hidden
        viewBox="0 0 200 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-50"
      >
        <defs>
          <pattern id="dotted-grid" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.4" fill="white" fillOpacity="0.2" />
          </pattern>
          <linearGradient id="grid-mask" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0.3" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="grid-cutoff">
            <rect width="200" height="100" fill="url(#grid-mask)" />
          </mask>
        </defs>
        <rect
          width="200"
          height="100"
          fill="url(#dotted-grid)"
          mask="url(#grid-cutoff)"
        />
      </svg>

      {/* Concentric arcs — top-left */}
      <svg
        aria-hidden
        viewBox="0 0 240 240"
        className="absolute -left-20 -top-20 h-60 w-60"
      >
        {[60, 90, 120, 150].map((r, i) => (
          <motion.circle
            key={r}
            cx="120"
            cy="120"
            r={r}
            fill="none"
            stroke={accent.primary}
            strokeOpacity={0.18 + i * 0.05}
            strokeWidth={i === 1 ? 1 : 0.5}
            strokeDasharray={i === 0 ? "1 6" : i === 3 ? "2 8" : undefined}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </svg>

      {/* Sparkles */}
      <svg
        aria-hidden
        viewBox="0 0 200 100"
        className="absolute inset-0 h-full w-full"
      >
        {[
          { cx: 30, cy: 20, r: 1.4, c: accent.primary, d: 0 },
          { cx: 60, cy: 12, r: 0.8, c: accent.secondary, d: 0.4 },
          { cx: 110, cy: 28, r: 1.1, c: accent.primary, d: 1.0 },
          { cx: 160, cy: 18, r: 1.4, c: accent.secondary, d: 0.6 },
          { cx: 50, cy: 78, r: 0.9, c: accent.primary, d: 1.4 },
          { cx: 120, cy: 82, r: 1.2, c: accent.secondary, d: 0.2 },
          { cx: 180, cy: 70, r: 0.8, c: accent.primary, d: 1.6 },
          { cx: 14, cy: 60, r: 0.7, c: accent.secondary, d: 0.8 },
        ].map((s, i) => (
          <motion.circle
            key={i}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill={s.c}
            initial={{ opacity: 0.15, scale: 0.6 }}
            animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.7, 1.2, 0.7] }}
            transition={{
              duration: 4 + i * 0.3,
              delay: s.d,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Decorative cross sparkles */}
        {[
          { cx: 78, cy: 50, size: 4, c: accent.primary, d: 0 },
          { cx: 175, cy: 50, size: 5, c: accent.secondary, d: 1 },
        ].map((s, i) => (
          <motion.g
            key={`cross-${i}`}
            transform={`translate(${s.cx}, ${s.cy})`}
            initial={{ scale: 0, rotate: 0 }}
            animate={{
              scale: [0.7, 1.1, 0.7],
              rotate: [0, 90, 180],
            }}
            transition={{
              duration: 6 + i,
              delay: s.d,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path
              d={`M 0,-${s.size} L 0,${s.size} M -${s.size},0 L ${s.size},0`}
              stroke={s.c}
              strokeWidth="0.6"
              strokeLinecap="round"
            />
          </motion.g>
        ))}
      </svg>

      {/* AiM brand mark — real logo, subtle on artwork */}
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 0.92, x: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-background/60 px-3 py-1.5 backdrop-blur-md md:right-10 md:top-10"
      >
        <Image
          src="/brand/aim-logo.webp"
          alt="AiM Insurance"
          width={92}
          height={26}
          className="h-5 w-auto md:h-6"
          style={{ width: "auto" }}
        />
      </motion.div>

      {/* Noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-30" aria-hidden />

      {/* Bottom-left category label */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
        <p
          className="font-heading text-sm uppercase tracking-[0.18em]"
          style={{ color: accent.primary }}
        >
          {category}
        </p>
      </div>
    </div>
  );
}

export default PostHeroArtwork;
