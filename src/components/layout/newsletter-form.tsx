"use client";

import { useState, type FormEvent } from "react";
import { ICONS } from "@/lib/icons";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 400));
    setStatus("ok");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="flex-1 min-w-0 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-cta focus:ring-2 focus:ring-cta/30"
          aria-invalid={status === "error" || undefined}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          aria-label="Subscribe to newsletter"
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-cta hover:bg-cta-hover text-white px-5 py-2.5 text-sm font-heading font-semibold transition-colors disabled:opacity-60"
        >
          {status === "loading" ? "..." : "Join"}
          <ICONS.ArrowRight className="size-4" aria-hidden />
        </button>
      </div>
      <p
        className="text-xs text-white/55 min-h-[1rem]"
        role="status"
        aria-live="polite"
      >
        {status === "ok"
          ? "Thanks — we'll be in touch."
          : "Monthly insights. No spam."}
      </p>
    </form>
  );
}

export default NewsletterForm;
