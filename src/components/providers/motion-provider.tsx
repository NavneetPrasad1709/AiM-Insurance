"use client";

import { LazyMotion } from "framer-motion";

// Lazy-load domAnimation features (transform, animation, exit, etc.) as
// a separate chunk, keeping the initial JS payload smaller. Components
// import `m` (not `motion`) so they don't drag in the heavy features.
const loadFeatures = () =>
  import("framer-motion").then((mod) => mod.domAnimation);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
