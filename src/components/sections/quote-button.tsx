"use client";

import type { CSSProperties, ReactNode } from "react";
import { useQuoteModal } from "@/lib/quote-modal-context";

export interface QuoteButtonProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Tiny client island for any "open the quote modal" CTA.
 *
 * Most sections were marked "use client" solely because of this one onClick,
 * which forced their entire (otherwise static) tree to ship and hydrate.
 * Isolating the button here lets those sections stay Server Components.
 */
export function QuoteButton({ children, className, style }: QuoteButtonProps) {
  const { openModal } = useQuoteModal();

  return (
    <button type="button" onClick={() => openModal()} className={className} style={style}>
      {children}
    </button>
  );
}

export default QuoteButton;
