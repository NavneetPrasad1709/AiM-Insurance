"use client";

import Image from "next/image";
import Link from "next/link";
import { m as motion } from "framer-motion";
import { ICONS } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface TrustStripProps {
  /**
   * "full" — wide hero strip with Newswire badge + 4 trust signals.
   * "compact" — single-row inline strip for under blog posts / service heroes.
   */
  variant?: "full" | "compact";
  className?: string;
}

const STAR_ROW = (
  <span className="inline-flex items-center gap-0.5" aria-label="5 out of 5 stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <ICONS.Star
        key={i}
        className="size-3.5 fill-cta text-cta"
        aria-hidden
      />
    ))}
  </span>
);

export function TrustStrip({ variant = "full", className }: TrustStripProps) {
  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className={cn(
          "flex flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-2xl border border-border bg-surface/80 px-5 py-3 backdrop-blur-md",
          className,
        )}
      >
        <Link
          href="https://www.newswire.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2.5"
          aria-label="Featured on Newswire"
        >
          <span className="text-[10px] font-heading font-bold uppercase tracking-[0.22em] text-cta">
            Featured on
          </span>
          <Image
            src="/brand/newswire-logo.webp"
            alt="Newswire"
            width={88}
            height={22}
            className="h-5 w-auto opacity-95 transition-opacity group-hover:opacity-100"
          />
        </Link>
        <span aria-hidden className="hidden h-4 w-px bg-border md:inline" />
        <span className="inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-white">
          {STAR_ROW}
          <span className="tabular-nums">5.0</span>
          <span className="text-text-muted">on Google</span>
        </span>
        <span aria-hidden className="hidden h-4 w-px bg-border md:inline" />
        <span className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-white">
          <ICONS.Shield className="size-4 text-cta" aria-hidden />
          BBB Accredited
        </span>
        <span aria-hidden className="hidden h-4 w-px bg-border md:inline" />
        <span className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-white tabular-nums">
          <ICONS.HeartHandshake className="size-4 text-cta" aria-hidden />
          800+ clients
        </span>
      </motion.div>
    );
  }

  return (
    <motion.section
      aria-label="Trust signals"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn("relative", className)}
    >
      {/* Headline Newswire badge */}
      <div className="mx-auto mb-6 flex max-w-3xl items-center justify-center gap-3 sm:gap-4">
        <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-transparent via-cta/40 to-cta/60" />
        <Link
          href="https://www.newswire.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 rounded-full border border-cta/40 bg-cta-light px-5 py-2.5 transition-colors hover:border-cta/70"
          aria-label="Featured on Newswire — read the article"
        >
          <span className="inline-flex size-5 items-center justify-center rounded-full bg-cta text-background">
            <ICONS.Award className="size-3" aria-hidden />
          </span>
          <span className="font-heading text-[11px] font-bold uppercase tracking-[0.22em] text-cta">
            As featured on
          </span>
          <Image
            src="/brand/newswire-logo.webp"
            alt="Newswire"
            width={104}
            height={26}
            className="h-6 w-auto"
          />
        </Link>
        <span aria-hidden className="h-px flex-1 bg-gradient-to-l from-transparent via-cta/40 to-cta/60" />
      </div>

      {/* Four trust signals */}
      <ul className="mx-auto grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        <SignalCard
          icon={<ICONS.HeartHandshake className="size-5 text-cta" aria-hidden />}
          big="800+"
          label="Clients served"
        />
        <SignalCard
          icon={<ICONS.TrendingUp className="size-5 text-cta" aria-hidden />}
          big="$4.8M+"
          label="Saved for clients"
        />
        <SignalCard
          icon={STAR_ROW}
          big="5.0"
          label="Google rating"
        />
        <SignalCard
          icon={
            <Image
              src="/brand/bbb-logo.webp"
              alt="BBB"
              width={36}
              height={20}
              className="h-5 w-auto"
            />
          }
          big="A+"
          label="BBB accredited"
        />
      </ul>
    </motion.section>
  );
}

function SignalCard({
  icon,
  big,
  label,
}: {
  icon: React.ReactNode;
  big: string;
  label: string;
}) {
  return (
    <li className="group flex flex-col items-center gap-1 rounded-xl border border-border bg-surface/80 px-3 py-4 text-center backdrop-blur-md transition-colors hover:border-cta/40">
      <span className="mb-1 inline-flex h-6 items-center justify-center">{icon}</span>
      <span className="font-heading text-2xl font-extrabold text-white tabular-nums leading-none">
        {big}
      </span>
      <span className="text-xs font-heading font-semibold uppercase tracking-[0.16em] text-text-muted">
        {label}
      </span>
    </li>
  );
}

export default TrustStrip;
