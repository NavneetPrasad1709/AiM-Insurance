"use client";

import Image from "next/image";
import Link from "next/link";
import { m as motion } from "framer-motion";
import { ICONS } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { categoryGradient, type MockCategory } from "@/data/mock-posts";
import type { SanityImage } from "@/types";
import { urlFor } from "@/lib/sanity/image";

export interface PostCardData {
  title: string;
  slug: string;
  excerpt: string;
  category: MockCategory;
  author: string;
  publishedAt: string;
  readingTime: number;
  mainImage?: SanityImage | null;
}

interface PostCardProps {
  post: PostCardData;
  variant?: "default" | "featured" | "compact";
  className?: string;
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

const CATEGORY_ACCENT: Record<MockCategory, { primary: string; secondary: string }> = {
  "Insurance Tips": { primary: "#ffc83d", secondary: "#4fe0b0" },
  "Savings Stories": { primary: "#4fe0b0", secondary: "#ffc83d" },
  Guides: { primary: "#ffc83d", secondary: "#ff8c42" },
  "Industry News": { primary: "#ff8c42", secondary: "#ffc83d" },
};

/**
 * Per-category line motif (centered, ~64px). Stroke-only, gradient-friendly.
 * Reads as an editorial illustration rather than a stock graphic.
 */
function CategoryMotif({
  category,
  color,
}: {
  category: MockCategory;
  color: string;
}) {
  const common = {
    fill: "none",
    stroke: color,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (category) {
    case "Insurance Tips":
      // Lightbulb glyph - idea, advice
      return (
        <g>
          <path
            d="M32 12 a14 14 0 0 1 8 25 v6 h-16 v-6 a14 14 0 0 1 8 -25 z"
            strokeWidth="1.4"
            {...common}
          />
          <path d="M27 50 h10" strokeWidth="1.4" {...common} />
          <path d="M28.5 54 h7" strokeWidth="1.4" {...common} />
          <path d="M32 22 v15" strokeWidth="1" {...common} />
          <path d="M27 32 l5 5 5 -5" strokeWidth="1" {...common} />
        </g>
      );
    case "Savings Stories":
      // Upward chart line with an arrow tip - gains, savings
      return (
        <g>
          <path d="M12 48 h40" strokeWidth="1.4" {...common} />
          <path d="M12 48 v-32" strokeWidth="1.4" {...common} />
          <path
            d="M16 40 L24 30 L32 36 L40 22 L52 14"
            strokeWidth="1.6"
            {...common}
          />
          <path d="M48 14 h6 v6" strokeWidth="1.6" {...common} />
          <circle cx="40" cy="22" r="1.4" fill={color} stroke="none" />
          <circle cx="32" cy="36" r="1.4" fill={color} stroke="none" />
          <circle cx="24" cy="30" r="1.4" fill={color} stroke="none" />
        </g>
      );
    case "Guides":
      // Compass - direction, walkthrough
      return (
        <g>
          <circle cx="32" cy="32" r="22" strokeWidth="1.4" {...common} />
          <circle cx="32" cy="32" r="17" strokeWidth="0.6" strokeDasharray="2 3" {...common} />
          <path d="M32 22 L36 32 L32 42 L28 32 Z" strokeWidth="1.4" {...common} />
          <circle cx="32" cy="32" r="1.6" fill={color} stroke="none" />
          <path d="M32 6 v3 M32 55 v3 M6 32 h3 M55 32 h3" strokeWidth="1.2" {...common} />
        </g>
      );
    case "Industry News":
      // Concentric pulse waves - broadcast, news
      return (
        <g>
          <circle cx="32" cy="32" r="3.5" fill={color} stroke="none" />
          <path
            d="M32 32 m -10 0 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0"
            strokeWidth="1.3"
            {...common}
          />
          <path
            d="M32 32 m -16 0 a 16 16 0 1 0 32 0"
            strokeWidth="1.1"
            strokeDasharray="3 4"
            {...common}
          />
          <path
            d="M32 32 m -22 0 a 22 22 0 1 0 44 0"
            strokeWidth="0.9"
            strokeDasharray="2 5"
            {...common}
          />
        </g>
      );
  }
}

function CardArtwork({
  category,
  isFeatured,
  mainImage,
  title,
}: {
  category: MockCategory;
  isFeatured: boolean;
  mainImage?: SanityImage | null;
  title: string;
}) {
  const accent = CATEGORY_ACCENT[category];

  if (mainImage?.asset?._ref) {
    const src = urlFor(mainImage).width(isFeatured ? 1280 : 800).fit("max").auto("format").url();
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden",
          isFeatured ? "aspect-[16/9]" : "aspect-[16/10]",
        )}
      >
        <Image
          src={src}
          alt={mainImage.alt ?? title}
          fill
          sizes={isFeatured ? "(min-width: 1024px) 720px, 100vw" : "(min-width: 1024px) 380px, 100vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent"
        />
        <div className="absolute left-4 top-4 z-10">
          <span
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-background/85 px-3 py-1 text-[11px] font-heading font-bold uppercase tracking-[0.22em] backdrop-blur-md"
            style={{ color: accent.primary }}
          >
            <span
              className="size-1 rounded-full"
              style={{ backgroundColor: accent.primary }}
              aria-hidden
            />
            {category}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        isFeatured ? "aspect-[16/9]" : "aspect-[16/10]",
      )}
    >
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{ background: categoryGradient(category) }}
        aria-hidden
      />

      {/* Single soft radial - depth without busyness */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(80% 80% at 30% 35%, ${accent.primary}2e 0%, transparent 65%)`,
        }}
      />

      {/* Refined dot pattern - masked from edges */}
      <svg
        aria-hidden
        viewBox="0 0 200 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-70"
      >
        <defs>
          <pattern
            id={`dotgrid-${category}`}
            x="0"
            y="0"
            width="6"
            height="6"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="0.6" cy="0.6" r="0.55" fill={accent.primary} fillOpacity="0.18" />
          </pattern>
          <linearGradient id={`dotmask-${category}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id={`dotmaskref-${category}`}>
            <rect width="200" height="100" fill={`url(#dotmask-${category})`} />
          </mask>
        </defs>
        <rect
          width="200"
          height="100"
          fill={`url(#dotgrid-${category})`}
          mask={`url(#dotmaskref-${category})`}
        />
      </svg>

      {/* Single sweeping arc - replaces the busy concentric arcs */}
      <svg
        aria-hidden
        viewBox="0 0 200 100"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id={`arc-${category}`} x1="0" y1="0" x2="1" y2="0.5">
            <stop offset="0%" stopColor={accent.primary} stopOpacity="0" />
            <stop offset="40%" stopColor={accent.primary} stopOpacity="0.55" />
            <stop offset="100%" stopColor={accent.primary} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M -10 18 Q 60 -8 130 22 T 220 38"
          fill="none"
          stroke={`url(#arc-${category})`}
          strokeWidth="1.4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>

      {/* Per-category centered motif */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%] transition-transform duration-500 group-hover:-translate-y-[60%]"
      >
        <motion.svg
          viewBox="0 0 64 64"
          width={isFeatured ? 96 : 80}
          height={isFeatured ? 96 : 80}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 0.55, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
        >
          <CategoryMotif category={category} color={accent.primary} />
        </motion.svg>
      </div>

      {/* Three deliberate sparkles - golden-ratio positions */}
      <svg
        aria-hidden
        viewBox="0 0 200 100"
        className="absolute inset-0 h-full w-full"
      >
        {[
          { cx: 24, cy: 18, r: 1.4, c: accent.primary, d: 0 },
          { cx: 178, cy: 26, r: 1.1, c: accent.secondary, d: 0.6 },
          { cx: 162, cy: 76, r: 1.2, c: accent.primary, d: 1.2 },
        ].map((s, i) => (
          <motion.g key={i} transform={`translate(${s.cx} ${s.cy})`}>
            <motion.circle
              r={s.r}
              fill={s.c}
              animate={{ opacity: [0.35, 0.95, 0.35], scale: [0.8, 1.25, 0.8] }}
              transition={{
                duration: 4 + i * 0.5,
                delay: s.d,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.circle
              r={s.r * 3}
              fill={s.c}
              fillOpacity="0.18"
              animate={{ opacity: [0, 0.45, 0], scale: [0.6, 1.4, 0.6] }}
              transition={{
                duration: 4 + i * 0.5,
                delay: s.d,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.g>
        ))}
      </svg>

      {/* AiM logo pill - bottom right */}
      <div
        aria-hidden
        className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-background/55 px-2.5 py-1 backdrop-blur-md transition-all duration-300 group-hover:border-cta/40 group-hover:bg-background/75"
      >
        <Image
          src="/brand/aim-logo.webp"
          alt=""
          width={isFeatured ? 56 : 44}
          height={isFeatured ? 16 : 12}
          className={cn(
            "h-auto w-auto opacity-85 transition-opacity duration-300 group-hover:opacity-100",
            isFeatured ? "h-4" : "h-3.5",
          )}
          style={{ width: "auto" }}
        />
      </div>

      {/* Subtle noise */}
      <div className="absolute inset-0 bg-noise opacity-30" aria-hidden />

      {/* Category badge */}
      <div className="absolute left-4 top-4 z-10">
        <span
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-background/85 px-3 py-1 text-[11px] font-heading font-bold uppercase tracking-[0.22em] backdrop-blur-md"
          style={{ color: accent.primary }}
        >
          <span
            className="size-1 rounded-full"
            style={{ backgroundColor: accent.primary }}
            aria-hidden
          />
          {category}
        </span>
      </div>
    </div>
  );
}

export function PostCard({ post, variant = "default", className }: PostCardProps) {
  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";
  const accent = CATEGORY_ACCENT[post.category];

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-surface",
        "transition-colors duration-300 hover:border-cta/50",
        className,
      )}
      style={{
        ["--accent" as string]: accent.primary,
      }}
    >
      {/* Animated gradient border halo on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow: `0 24px 60px -20px ${accent.primary}38`,
        }}
      />

      <Link
        href={`/blog/${post.slug}`}
        className="block focus-visible:outline-none"
        aria-label={`Read article: ${post.title}`}
      >
        <CardArtwork
          category={post.category}
          isFeatured={isFeatured}
          mainImage={post.mainImage}
          title={post.title}
        />

        <div className={cn("flex flex-col gap-3 p-6", isCompact && "p-5 gap-2.5")}>
          <h3
            className={cn(
              "font-heading font-bold text-white leading-snug tracking-tight transition-colors duration-200 group-hover:text-cta line-clamp-2",
              isFeatured && "text-2xl",
              !isFeatured && !isCompact && "text-lg",
              isCompact && "text-base",
            )}
          >
            {post.title}
          </h3>

          {!isCompact && (
            <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          )}

          <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-text-muted">
            <span className="font-heading font-semibold text-text-secondary">
              {post.author}
            </span>
            <span aria-hidden>·</span>
            <time dateTime={post.publishedAt}>
              {dateFormatter.format(new Date(post.publishedAt))}
            </time>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1 tabular-nums">
              <ICONS.Clock className="size-3" aria-hidden />
              {post.readingTime} min
            </span>
            <motion.span
              aria-hidden
              className="ml-auto inline-flex size-7 items-center justify-center rounded-full text-cta"
              initial={false}
              animate={{ x: 0 }}
              whileHover={{ x: 2 }}
            >
              <span className="absolute inline-flex size-7 rounded-full bg-cta-light opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <ICONS.ArrowRight
                className="relative size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden
              />
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default PostCard;
