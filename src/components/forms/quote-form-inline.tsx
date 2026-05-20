"use client";

import { useState, type FormEvent } from "react";
import { useQuoteModal } from "@/lib/quote-modal-context";
import { ICONS } from "@/lib/icons";

interface QuoteFormInlineProps {
  className?: string;
}

const INSURANCE_OPTIONS = [
  { value: "", label: "Insurance type" },
  { value: "car", label: "Car Insurance" },
  { value: "home", label: "Home Insurance" },
  { value: "boat", label: "Boat Insurance" },
  { value: "yacht", label: "Yacht Insurance" },
  { value: "jet", label: "Jet Insurance" },
  { value: "unsure", label: "Not sure yet" },
];

/**
 * Compact horizontal form embedded in hero / service pages.
 * Captures 3 fields, then opens the full modal pre-filled with what we have.
 */
export function QuoteFormInline({ className }: QuoteFormInlineProps) {
  const { openModal } = useQuoteModal();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [insuranceType, setInsuranceType] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    openModal({
      fullName: name.trim() || undefined,
      email: email.trim() || undefined,
      insuranceType: insuranceType || undefined,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-2 rounded-2xl border border-[#232328] bg-[#111113]/85 backdrop-blur-md p-2 ${className ?? ""}`}
    >
      <label className="sr-only" htmlFor="inline-quote-name">
        Full name
      </label>
      <input
        id="inline-quote-name"
        type="text"
        autoComplete="name"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="min-w-0 flex-1 rounded-xl border border-transparent bg-[#0a0a0a] px-4 py-3 text-base sm:text-sm text-white placeholder:text-white/45 focus:outline-none focus:border-[#ffc83d] focus:ring-2 focus:ring-[#ffc83d]/30"
      />
      <label className="sr-only" htmlFor="inline-quote-email">
        Email
      </label>
      <input
        id="inline-quote-email"
        type="email"
        autoComplete="email"
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="min-w-0 flex-1 rounded-xl border border-transparent bg-[#0a0a0a] px-4 py-3 text-base sm:text-sm text-white placeholder:text-white/45 focus:outline-none focus:border-[#ffc83d] focus:ring-2 focus:ring-[#ffc83d]/30"
      />
      <label className="sr-only" htmlFor="inline-quote-type">
        Insurance type
      </label>
      <select
        id="inline-quote-type"
        value={insuranceType}
        onChange={(e) => setInsuranceType(e.target.value)}
        className="min-w-0 flex-1 rounded-xl border border-transparent bg-[#0a0a0a] px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#ffc83d] focus:ring-2 focus:ring-[#ffc83d]/30"
      >
        {INSURANCE_OPTIONS.map((o) => (
          <option key={o.value} value={o.value} disabled={o.value === ""}>
            {o.label}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="btn-shine cta-primary inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold whitespace-nowrap"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        Get free quote
        <ICONS.ArrowRight className="size-4" aria-hidden />
      </button>
    </form>
  );
}

export default QuoteFormInline;
