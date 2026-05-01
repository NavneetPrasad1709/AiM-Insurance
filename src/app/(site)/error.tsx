"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ICONS } from "@/lib/icons";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function SiteError({ error, reset }: ErrorProps) {
  useEffect(() => {
    if (typeof console !== "undefined") {
      console.error("[site-error]", error);
    }
  }, [error]);

  return (
    <section
      role="alert"
      aria-labelledby="site-error-heading"
      className="relative flex min-h-[70vh] items-center justify-center bg-background px-5 py-24 sm:px-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-blob opacity-60 blur-3xl"
      />
      <div className="relative max-w-xl text-center">
        <p className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-cta">
          500 · Something went wrong
        </p>
        <h1
          id="site-error-heading"
          className="mt-4 font-heading font-extrabold text-white tracking-[-0.04em] leading-[1]"
          style={{ fontSize: "clamp(2.4rem, 5.6vw, 4rem)" }}
        >
          We hit an unexpected snag.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-text-secondary">
          The page didn&rsquo;t load correctly. Try again — or head back home
          and we&rsquo;ll get you on track.
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
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-7 py-3.5 text-base font-heading font-semibold text-white transition-colors hover:border-cta/40"
          >
            <ICONS.ArrowLeft className="size-4 text-cta" aria-hidden />
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
