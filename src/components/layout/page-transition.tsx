import type { ReactNode } from "react";

export interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Pass-through. We previously wrapped every page in a framer-motion
 * fade — that set opacity:0 on the page root and delayed paint of the
 * LCP element until framer-motion's runtime finished loading and the
 * animation completed (Lighthouse measured ~2.7s of element render
 * delay). The visual gain wasn't worth a 30+ point hit to mobile perf.
 *
 * If a transition is desired in the future, prefer the View Transitions
 * API (CSS-only) so paint isn't blocked on JS.
 */
export function PageTransition({ children }: PageTransitionProps) {
  return <>{children}</>;
}

export default PageTransition;
