"use client";

import { forwardRef, type ElementType, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export type CardVariant = "default" | "elevated" | "glass" | "premium";
export type CardElement = "div" | "article" | "section";

const VARIANT_CLASSES: Record<CardVariant, string> = {
  default:
    "bg-surface border border-border-light hover:shadow-md transition-shadow duration-300",
  elevated:
    "bg-surface shadow-md hover:shadow-lg transition-shadow duration-300",
  glass:
    "bg-white/80 backdrop-blur-md border border-white/20 shadow-sm hover:shadow-md transition-shadow duration-300",
  premium:
    "bg-surface border border-border-light hover:border-cta/20 hover:shadow-card-hover transition-all duration-300",
};

export interface CardProps
  extends Omit<HTMLMotionProps<"div">, "children"> {
  variant?: CardVariant;
  as?: CardElement;
  hoverLift?: boolean;
  children?: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    variant = "default",
    as = "div",
    hoverLift = true,
    className,
    children,
    onClick,
    ...rest
  },
  ref
) {
  const MotionTag = motion[as as ElementType as "div"];
  const interactive = typeof onClick === "function";

  return (
    <MotionTag
      ref={ref as never}
      onClick={onClick}
      whileHover={hoverLift ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      className={cn(
        "rounded-2xl p-6",
        VARIANT_CLASSES[variant],
        interactive && "cursor-pointer",
        className
      )}
      {...rest}
    >
      {children}
    </MotionTag>
  );
});

export default Card;
