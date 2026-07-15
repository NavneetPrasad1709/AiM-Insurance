"use client";

import { useState } from "react";

export function FaqRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div data-reveal className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span
          className={[
            "flex-1 font-heading font-bold uppercase transition-colors",
            open ? "text-cta" : "text-white group-hover:text-cta",
          ].join(" ")}
          style={{
            fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)",
            letterSpacing: "0.01em",
          }}
        >
          {q}
        </span>
        <span
          aria-hidden
          className="grid size-9 shrink-0 place-items-center rounded-full border border-cta/40 text-sm text-cta transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      {/* CSS-only height animation (grid 0fr -> 1fr) replaces the old
          JS-driven height:auto tween. */}
      <div
        className="grid transition-[grid-template-rows,opacity] duration-450 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <p className="pb-7 pr-12 text-[15px] leading-relaxed text-text-secondary">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}
