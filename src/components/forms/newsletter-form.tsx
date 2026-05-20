"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { PaperPlaneAccent } from "@/components/illustrations/ambience";
import { ICONS } from "@/lib/icons";

interface NewsletterFormProps {
  className?: string;
  helperText?: string;
}

/**
 * Footer newsletter form — dark surface, gold submit, success state in green.
 * Wires into the shared lead-capture pipeline via useFormSubmit.
 */
export function NewsletterForm({ className, helperText }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const { submit, isLoading, isSuccess, isError, errorMessage } = useFormSubmit(
    "newsletter",
    { autoResetMs: 5000 }
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    const ok = await submit({ email: email.trim() });
    if (ok) setEmail("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex flex-col gap-2 ${className ?? ""}`}
    >
      <PaperPlaneAccent
        className="pointer-events-none absolute -top-7 -right-2 opacity-70"
        size={56}
      />
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-wrap gap-2">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          aria-invalid={isError || undefined}
          disabled={isLoading || isSuccess}
          className="flex-1 min-w-[180px] rounded-full border border-white/15 bg-white/5 px-4 py-3 text-base sm:text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#ffc83d] focus:ring-2 focus:ring-[#ffc83d]/30 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isLoading || isSuccess}
          aria-label="Subscribe to newsletter"
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#ffc83d] hover:bg-[#ffd75a] text-[#0a0a0a] px-4 sm:px-5 py-2.5 text-sm font-heading font-semibold transition-colors disabled:opacity-70"
        >
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : isSuccess ? (
            "Subscribed"
          ) : (
            <>
              Subscribe
              <ICONS.ArrowRight className="size-4" aria-hidden />
            </>
          )}
        </button>
      </div>
      <p
        className="text-xs min-h-[1rem]"
        role="status"
        aria-live="polite"
        style={{
          color: isSuccess
            ? "#059669"
            : isError
              ? "#DC2626"
              : "rgb(255 255 255 / 0.55)",
        }}
      >
        {isSuccess
          ? "✓ Subscribed!"
          : isError
            ? errorMessage ?? "Something went wrong. Please try again."
            : helperText ?? "Monthly insights. No spam."}
      </p>
    </form>
  );
}

export default NewsletterForm;
