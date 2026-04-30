"use client";

import { CountUp } from "@/components/ui/count-up";
import { cn } from "@/lib/utils";

export interface AnimatedCounterProps {
  value: string;
  label?: string;
  durationMs?: number;
  /** Apply coral-gradient text on the number. */
  coralGradient?: boolean;
  className?: string;
  numberClassName?: string;
  labelClassName?: string;
}

export function AnimatedCounter({
  value,
  label,
  durationMs = 2000,
  coralGradient = true,
  className,
  numberClassName,
  labelClassName,
}: AnimatedCounterProps) {
  return (
    <div className={cn("text-center", className)}>
      <div
        className={cn(
          "font-heading font-extrabold text-4xl md:text-5xl leading-none",
          coralGradient ? "text-gradient-coral" : "text-primary",
          numberClassName
        )}
      >
        <CountUp value={value} durationMs={durationMs} />
      </div>
      {label && (
        <div
          className={cn(
            "mt-2 text-xs md:text-sm font-heading font-semibold uppercase tracking-widest text-text-secondary",
            labelClassName
          )}
        >
          {label}
        </div>
      )}
    </div>
  );
}

export default AnimatedCounter;
