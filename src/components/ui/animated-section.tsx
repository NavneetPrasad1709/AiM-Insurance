"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  VARIANTS,
  staggerContainer,
  viewportConfig,
  type AnimationVariant,
} from "@/lib/animations";

type DivPropsForMotion = Omit<
  HTMLAttributes<HTMLDivElement>,
  | "children"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
>;

export interface AnimatedSectionProps extends DivPropsForMotion {
  variant?: AnimationVariant;
  /** Wrap children in a stagger container so each child reveals in sequence. */
  stagger?: boolean;
  /** Extra delay (seconds) before this section's animation starts. */
  delay?: number;
  /** When true, animate immediately on mount instead of on scroll-in. */
  animateOnMount?: boolean;
  children?: ReactNode;
}

export function AnimatedSection({
  variant = "fadeUp",
  stagger = false,
  delay = 0,
  animateOnMount = false,
  children,
  ...rest
}: AnimatedSectionProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div {...rest}>{children}</div>;
  }

  const variants = stagger ? staggerContainer : VARIANTS[variant];
  const triggerProps = animateOnMount
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: viewportConfig };

  return (
    <motion.div
      initial="hidden"
      {...triggerProps}
      variants={variants}
      transition={delay ? { delay } : undefined}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedSection;
