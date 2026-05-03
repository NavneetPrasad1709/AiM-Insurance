"use client";

import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, m as motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type AccordionType = "single" | "multiple";

interface AccordionContextValue {
  type: AccordionType;
  open: Set<string>;
  toggle: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx)
    throw new Error("Accordion subcomponents must be used inside <Accordion>.");
  return ctx;
}

export interface AccordionProps {
  type?: AccordionType;
  defaultValue?: string | string[];
  className?: string;
  children: ReactNode;
}

export function Accordion({
  type = "single",
  defaultValue,
  className,
  children,
}: AccordionProps) {
  const initial = useMemo(() => {
    if (!defaultValue) return new Set<string>();
    return new Set(
      Array.isArray(defaultValue) ? defaultValue : [defaultValue]
    );
  }, [defaultValue]);

  const [open, setOpen] = useState<Set<string>>(initial);

  const toggle = useCallback(
    (value: string) => {
      setOpen((prev) => {
        const next = new Set(prev);
        if (next.has(value)) {
          next.delete(value);
          return next;
        }
        if (type === "single") next.clear();
        next.add(value);
        return next;
      });
    },
    [type]
  );

  const ctx = useMemo<AccordionContextValue>(
    () => ({ type, open, toggle }),
    [type, open, toggle]
  );

  return (
    <AccordionContext.Provider value={ctx}>
      <div className={cn("flex flex-col", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps {
  value: string;
  question: ReactNode;
  children: ReactNode;
  className?: string;
}

export function AccordionItem({
  value,
  question,
  children,
  className,
}: AccordionItemProps) {
  const { open, toggle } = useAccordionContext();
  const isOpen = open.has(value);
  const reactId = useId();
  const headerId = `accordion-header-${reactId}`;
  const panelId = `accordion-panel-${reactId}`;

  const handleKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(value);
    }
  };

  return (
    <div
      className={cn(
        "border-b border-border-light transition-colors",
        isOpen && "border-l-2 border-l-cta pl-4 -ml-4",
        className
      )}
    >
      <h3>
        <button
          type="button"
          id={headerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => toggle(value)}
          onKeyDown={handleKey}
          className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-heading font-medium text-primary transition-colors hover:text-cta"
        >
          <span>{question}</span>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-cta shrink-0"
            aria-hidden
          >
            <Plus className="size-5" />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            id={panelId}
            role="region"
            aria-labelledby={headerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.3 },
              opacity: { duration: 0.2, delay: 0.1 },
            }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-text-secondary leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Accordion;
