"use client";

import { useMemo, useState } from "react";
import { m as motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { CategoryFilter } from "@/components/blog/category-filter";
import { SearchBar } from "@/components/blog/search-bar";
import { PostCard, type PostCardData } from "@/components/blog/post-card";
import { mockCategories, type MockCategorySlug } from "@/data/mock-posts";
import { ICONS } from "@/lib/icons";

const PAGE_SIZE = 9;

interface BlogIndexClientProps {
  posts: PostCardData[];
  featured: PostCardData[];
}

export function BlogIndexClient({ posts, featured }: BlogIndexClientProps) {
  const [active, setActive] = useState<MockCategorySlug>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const counts = useMemo(() => {
    const c: Partial<Record<MockCategorySlug, number>> = { all: posts.length };
    for (const cat of mockCategories) {
      if (cat.slug === "all") continue;
      c[cat.slug] = posts.filter(
        (p) => slugifyCategory(p.category) === cat.slug,
      ).length;
    }
    return c;
  }, [posts]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return posts.filter((p) => {
      const matchCategory =
        active === "all" || slugifyCategory(p.category) === active;
      if (!matchCategory) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q)
      );
    });
  }, [posts, active, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  const handleCategory = (slug: MockCategorySlug) => {
    setActive(slug);
    setPage(1);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const showFeatured = active === "all" && !search;

  return (
    <>
      <div className="mx-auto mb-10 flex max-w-4xl flex-col gap-4">
        <div className="mx-auto w-full max-w-2xl">
          <SearchBar value={search} onChange={handleSearch} />
        </div>
        <CategoryFilter
          active={active}
          onChange={handleCategory}
          counts={counts}
          className="justify-start lg:justify-center"
        />
      </div>

      <AnimatePresence mode="wait">
        {showFeatured && featured.length > 0 && (
          <motion.section
            key="featured"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            aria-labelledby="featured-heading"
            className="mb-16"
          >
            <h2
              id="featured-heading"
              className="mb-6 font-heading text-xl font-bold uppercase tracking-[0.2em] text-text-muted"
            >
              Featured
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <PostCard post={featured[0]} variant="featured" />
              </div>
              <div className="grid gap-6">
                {featured.slice(1, 3).map((post) => (
                  <PostCard key={post.slug} post={post} variant="compact" />
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <section aria-label="All articles">
        <h2 className="mb-6 font-heading text-xl font-bold uppercase tracking-[0.2em] text-text-muted">
          {showFeatured ? "Latest articles" : "Results"}{" "}
          <span className="ml-2 text-text-secondary tabular-nums">
            ({filtered.length})
          </span>
        </h2>

        {filtered.length === 0 ? (
          <EmptyState onReset={() => { setSearch(""); setActive("all"); }} />
        ) : (
          <LayoutGroup>
            <motion.div
              layout
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {visible.map((post) => (
                  <motion.div
                    key={post.slug}
                    layout
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28 }}
                  >
                    <PostCard post={post} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        )}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={(p) => {
              setPage(p);
              if (typeof window !== "undefined") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          />
        )}
      </section>
    </>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onChange,
}: {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  const pages = pageList(currentPage, totalPages);
  const baseBtn =
    "inline-flex h-11 min-w-11 items-center justify-center rounded-full border px-3 text-sm font-heading font-semibold transition-colors";
  return (
    <nav
      aria-label="Pagination"
      className="mt-12 flex flex-wrap items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`${baseBtn} border-border bg-surface text-white hover:border-cta hover:text-cta disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-white`}
        aria-label="Previous page"
      >
        <ICONS.ChevronRight className="size-4 rotate-180" aria-hidden />
      </button>
      {pages.map((p, i) =>
        p === "…" ? (
          <span
            key={`gap-${i}`}
            className="inline-flex h-11 min-w-6 items-center justify-center text-sm text-text-muted"
            aria-hidden
          >
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-current={p === currentPage ? "page" : undefined}
            className={
              p === currentPage
                ? `${baseBtn} border-cta bg-cta text-background`
                : `${baseBtn} border-border bg-surface text-white hover:border-cta hover:text-cta`
            }
          >
            {p}
          </button>
        ),
      )}
      <button
        type="button"
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`${baseBtn} border-border bg-surface text-white hover:border-cta hover:text-cta disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-white`}
        aria-label="Next page"
      >
        <ICONS.ChevronRight className="size-4" aria-hidden />
      </button>
    </nav>
  );
}

function pageList(current: number, total: number): (number | "…")[] {
  const window = 1;
  const pages = new Set<number>([1, total, current - window, current, current + window]);
  const sorted = [...pages].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  let prev = 0;
  for (const n of sorted) {
    if (n - prev > 1) out.push("…");
    out.push(n);
    prev = n;
  }
  return out;
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-surface px-8 py-16 text-center">
      <ICONS.Search
        className="mx-auto mb-4 size-8 text-text-muted"
        aria-hidden
      />
      <p className="font-heading text-lg font-bold text-white">
        No matching articles
      </p>
      <p className="mt-2 text-sm text-text-secondary">
        Try a different search term or clear the filter.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-cta px-5 py-2 text-sm font-heading font-semibold text-background transition-colors hover:bg-cta-hover"
      >
        Reset filters
      </button>
    </div>
  );
}

function slugifyCategory(category: string): MockCategorySlug {
  const map: Record<string, MockCategorySlug> = {
    "Insurance Tips": "insurance-tips",
    "Savings Stories": "savings-stories",
    Guides: "guides",
    "Industry News": "industry-news",
  };
  return map[category] ?? "all";
}
