"use client";

import { motion, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";
import { mockCategories, type MockCategorySlug } from "@/data/mock-posts";

interface CategoryFilterProps {
  active: MockCategorySlug;
  onChange: (slug: MockCategorySlug) => void;
  counts?: Partial<Record<MockCategorySlug, number>>;
  className?: string;
}

export function CategoryFilter({
  active,
  onChange,
  counts,
  className,
}: CategoryFilterProps) {
  return (
    <LayoutGroup id="blog-category-filter">
      <div
        role="tablist"
        aria-label="Filter posts by category"
        className={cn(
          "flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0",
          "[&::-webkit-scrollbar]:hidden [scrollbar-width:none]",
          className,
        )}
      >
        {mockCategories.map((cat) => {
          const isActive = cat.slug === active;
          const count = counts?.[cat.slug];
          return (
            <button
              key={cat.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(cat.slug)}
              className={cn(
                "relative shrink-0 rounded-full px-4 py-2 text-sm font-heading font-semibold transition-colors duration-200",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta",
                isActive
                  ? "text-background"
                  : "text-text-secondary hover:text-white",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="blog-category-pill"
                  className="absolute inset-0 rounded-full bg-cta"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 inline-flex items-center gap-1.5">
                {cat.title}
                {typeof count === "number" && (
                  <span
                    className={cn(
                      "rounded-full px-1.5 text-[10px] tabular-nums",
                      isActive
                        ? "bg-background/20 text-background"
                        : "bg-surface text-text-muted",
                    )}
                  >
                    {count}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}

export default CategoryFilter;
