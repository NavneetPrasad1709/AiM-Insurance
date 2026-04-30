"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface QuoteModalPrefill {
  fullName?: string;
  email?: string;
  phone?: string;
  insuranceType?: string;
  notes?: string;
}

interface QuoteModalContextValue {
  isOpen: boolean;
  openModal: (prefill?: QuoteModalPrefill) => void;
  closeModal: () => void;
  prefill: QuoteModalPrefill;
}

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null);

export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState<QuoteModalPrefill>({});

  const openModal = useCallback((next?: QuoteModalPrefill) => {
    setPrefill(next ?? {});
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Allow any element to trigger the modal via data attribute,
  // independent of React tree depth (e.g. server-rendered links).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const trigger = target.closest<HTMLElement>(
        '[data-action="open-quote-modal"]'
      );
      if (!trigger) return;
      e.preventDefault();
      const ds = trigger.dataset;
      openModal({
        fullName: ds.prefillName,
        email: ds.prefillEmail,
        phone: ds.prefillPhone,
        insuranceType: ds.prefillInsurance,
        notes: ds.prefillNotes,
      });
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [openModal]);

  const value = useMemo<QuoteModalContextValue>(
    () => ({ isOpen, openModal, closeModal, prefill }),
    [isOpen, openModal, closeModal, prefill]
  );

  return (
    <QuoteModalContext.Provider value={value}>
      {children}
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal(): QuoteModalContextValue {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) {
    throw new Error("useQuoteModal must be used inside QuoteModalProvider");
  }
  return ctx;
}
