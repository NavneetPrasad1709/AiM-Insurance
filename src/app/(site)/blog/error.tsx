"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ICONS } from "@/lib/icons";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function BlogError({ error, reset }: ErrorProps) {
  useEffect(() => {
    if (typeof console !== "undefined") {
      console.error("[blog-error]", error);
    }
  }, [error]);

  return (
    <section
      role="alert"
      aria-labelledby="blog-error-heading"
      className="relative flex min-h-[60vh] items-center justify-center bg-background px-5 py-24 sm:px-8"
    >
      <div className="relative max-w-xl text-center">
        <p className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-cta">
          Article unavailable
        </p>
        <h1
          id="blog-error-heading"
          className="mt-4 font-heading font-extrabold text-white tracking-[-0.04em] leading-[1.05]"
          style={{ fontSize: "clamp(2rem, 4.6vw, 3rem)" }}
        >
          We couldn&rsquo;t load this article.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-text-secondary">
          The post might be in transit or briefly offline. Try reloading, or
          browse the rest of the blog.
        </p>
        {error.digest && (
          <p className="mt-3 text-xs font-mono text-text-muted">
            Reference: {error.digest}
          </p>
        )}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="btn-shine cta-primary inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-heading font-semibold"
          >
            <ICONS.ArrowRight className="size-4" aria-hidden />
            Try again
          </button>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-7 py-3.5 text-base font-heading font-semibold text-white transition-colors hover:border-cta/40"
          >
            <ICONS.ArrowLeft className="size-4 text-cta" aria-hidden />
            Back to blog
          </Link>
        </div>
      </div>
    </section>
  );
}
