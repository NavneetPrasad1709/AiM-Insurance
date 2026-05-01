"use client";

import { useEffect, useRef, useState } from "react";
import { ICONS } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Debounce window in ms. */
  delay?: number;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search articles…",
  delay = 300,
  className,
}: SearchBarProps) {
  const [internal, setInternal] = useState(value);
  const [lastProp, setLastProp] = useState(value);

  // Derived state pattern: if the parent prop changes (e.g. external reset),
  // sync internal during render. React handles this without a cascading effect.
  if (value !== lastProp) {
    setLastProp(value);
    setInternal(value);
  }

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    if (internal === value) return;
    timer.current = setTimeout(() => onChange(internal), delay);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [internal, delay, onChange, value]);

  const clear = () => {
    setInternal("");
    onChange("");
  };

  return (
    <div
      className={cn(
        "relative flex items-center rounded-full border border-border bg-surface transition-colors focus-within:border-cta",
        className,
      )}
    >
      <ICONS.Search
        className="pointer-events-none absolute left-4 size-4 text-text-muted"
        aria-hidden
      />
      <input
        type="search"
        role="searchbox"
        aria-label="Search articles"
        placeholder={placeholder}
        value={internal}
        onChange={(e) => setInternal(e.target.value)}
        className={cn(
          "h-12 w-full rounded-full bg-transparent pl-11 pr-12 text-base text-white placeholder:text-text-muted",
          "focus:outline-none",
        )}
      />
      {internal && (
        <button
          type="button"
          onClick={clear}
          aria-label="Clear search"
          className="absolute right-3 grid size-7 place-items-center rounded-full text-text-muted transition-colors hover:bg-surface-2 hover:text-white"
        >
          <ICONS.X className="size-3.5" aria-hidden />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
