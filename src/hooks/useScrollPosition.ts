"use client";

import { useEffect, useState } from "react";

export interface ScrollPositionState {
  scrollY: number;
  isScrolled: boolean;
}

const SCROLLED_THRESHOLD = 50;

export function useScrollPosition(): ScrollPositionState {
  const [state, setState] = useState<ScrollPositionState>(() => ({
    scrollY: 0,
    isScrolled: false,
  }));

  useEffect(() => {
    let frame = 0;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      setState((prev) => {
        const next: ScrollPositionState = {
          scrollY: y,
          isScrolled: y > SCROLLED_THRESHOLD,
        };
        if (prev.scrollY === next.scrollY && prev.isScrolled === next.isScrolled) {
          return prev;
        }
        return next;
      });
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return state;
}
