"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ICONS } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { ParsedHeading } from "./post-content";

interface TableOfContentsProps {
  headings: ParsedHeading[];
  className?: string;
}

export function TableOfContents({ headings, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(
    headings[0]?.id ?? null,
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.target.getBoundingClientRect().top -
              b.target.getBoundingClientRect().top,
          );
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -65% 0px", threshold: [0, 0.5, 1] },
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  const list = (
    <ol className="list-none border-l border-border space-y-1">
      {headings.map((h) => {
        const isActive = h.id === activeId;
        return (
          <li key={h.id} className={h.level === 3 ? "ml-4" : ""}>
            <a
              href={`#${h.id}`}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "relative -ml-px block border-l-2 border-transparent py-1.5 pl-4 pr-2 transition-colors",
                isActive
                  ? "border-cta text-white font-heading font-semibold"
                  : "text-text-secondary hover:text-white hover:border-border-light",
                h.level === 3 && "text-[13px]",
              )}
            >
              {h.text}
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <nav aria-label="Table of contents" className={cn("text-sm", className)}>
      {/* Desktop — always visible */}
      <div className="hidden lg:block">
        <div className="mb-4 flex items-center gap-2">
          <ICONS.BookOpen className="size-4 text-cta" aria-hidden />
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
            On this page
          </span>
        </div>
        {list}
      </div>

      {/* Mobile — collapsible */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          className="flex w-full items-center justify-between rounded-xl border border-border bg-surface px-4 py-3"
        >
          <span className="inline-flex items-center gap-2 font-heading text-sm font-semibold text-white">
            <ICONS.BookOpen className="size-4 text-cta" aria-hidden />
            On this page
          </span>
          <ICONS.ChevronDown
            className={cn(
              "size-4 text-text-muted transition-transform",
              mobileOpen && "rotate-180",
            )}
            aria-hidden
          />
        </button>

        <AnimatePresence initial={false}>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden mt-3"
            >
              {list}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default TableOfContents;
