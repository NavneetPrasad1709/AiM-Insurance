"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  subtitle,
  title,
  description,
  align = "center",
  className,
  as: HeadingTag = "h2",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "flex flex-col gap-3",
        isCenter ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {subtitle && (
        <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 backdrop-blur-md px-4 py-1.5 text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-accent">
          {subtitle}
        </span>
      )}
      <HeadingTag
        className="font-heading font-extrabold text-white leading-[1.05] tracking-[-0.02em] text-balance"
        style={{ fontSize: "clamp(2rem, 4.6vw, 3.4rem)" }}
      >
        {title}
      </HeadingTag>
      {description && (
        <p
          className={cn(
            "text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed",
            isCenter && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

export default SectionHeading;
