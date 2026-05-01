"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
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

  const visible = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < filtered.length;

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

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setPage((p) => p + 1)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-heading font-semibold text-white transition-colors hover:border-cta hover:text-cta"
            >
              Load more
              <ICONS.ChevronDown className="size-4" aria-hidden />
            </button>
          </div>
        )}
      </section>
    </>
  );
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
