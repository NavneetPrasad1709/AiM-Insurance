"use client";

import { m as motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ScrollProgressProps {
  className?: string;
}

export function ScrollProgress({ className }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "left" }}
      className={cn(
        "fixed top-0 left-0 right-0 h-[3px] bg-gradient-coral z-[100] pointer-events-none",
        className
      )}
    />
  );
}

export default ScrollProgress;
