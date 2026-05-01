"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ICONS } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { categoryGradient, type MockCategory } from "@/data/mock-posts";

export interface PostCardData {
  title: string;
  slug: string;
  excerpt: string;
  category: MockCategory;
  author: string;
  publishedAt: string;
  readingTime: number;
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

function CardArtwork({
  category,
  isFeatured,
}: {
  category: MockCategory;
  isFeatured: boolean;
}) {
  const accent = CATEGORY_ACCENT[category];

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

      {/* Layered radial light source */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(70% 70% at 25% 30%, ${accent.primary}33 0%, transparent 60%), radial-gradient(60% 60% at 80% 80%, ${accent.secondary}22 0%, transparent 65%)`,
        }}
      />

      {/* Decorative dotted arc */}
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        className="absolute -right-12 -top-12 h-44 w-44 opacity-60"
      >
        <defs>
          <linearGradient id={`arc-${category}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={accent.primary} stopOpacity="0.7" />
            <stop offset="100%" stopColor={accent.primary} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[60, 80, 100].map((r, i) => (
          <circle
            key={r}
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke={`url(#arc-${category})`}
            strokeWidth={i === 1 ? 1 : 0.5}
            strokeDasharray={i === 0 ? "1 6" : i === 2 ? "2 8" : undefined}
          />
        ))}
      </svg>

      {/* Sparkles */}
      <svg
        aria-hidden
        viewBox="0 0 120 80"
        className="absolute inset-0 h-full w-full"
      >
        {[
          { cx: 18, cy: 22, r: 1, c: accent.primary, d: 0 },
          { cx: 38, cy: 14, r: 0.7, c: accent.secondary, d: 0.6 },
          { cx: 92, cy: 30, r: 1.2, c: accent.primary, d: 1.2 },
          { cx: 70, cy: 60, r: 0.8, c: accent.secondary, d: 0.4 },
          { cx: 24, cy: 68, r: 0.6, c: accent.primary, d: 1.6 },
          { cx: 108, cy: 58, r: 0.9, c: accent.primary, d: 0.9 },
        ].map((s, i) => (
          <motion.circle
            key={i}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill={s.c}
            initial={{ opacity: 0.2, scale: 0.7 }}
            animate={{
              opacity: [0.25, 0.85, 0.25],
              scale: [0.8, 1.15, 0.8],
            }}
            transition={{
              duration: 4 + i * 0.4,
              delay: s.d,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Real AiM logo — bottom right, subtle brand mark */}
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

      {/* Noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-40" aria-hidden />

      {/* Category badge */}
      <div className="absolute left-4 top-4 z-10">
        <span
          className="inline-flex items-center gap-1.5 rounded-full bg-background/85 px-3 py-1 text-[11px] font-heading font-semibold uppercase tracking-[0.18em] backdrop-blur-md"
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
        <CardArtwork category={post.category} isFeatured={isFeatured} />

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
