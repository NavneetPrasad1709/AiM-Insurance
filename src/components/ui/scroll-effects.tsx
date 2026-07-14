"use client";

import {
  Children,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   ScrollReveal - fade/slide on viewport entry.
   IntersectionObserver + CSS animation. Zero framer-motion footprint.
--------------------------------------------------------------------------- */
type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}

const transforms: Record<Direction, string> = {
  up: "translate3d(0, 32px, 0)",
  down: "translate3d(0, -28px, 0)",
  left: "translate3d(32px, 0, 0)",
  right: "translate3d(-32px, 0, 0)",
  none: "none",
};

function useInViewOnce(
  ref: React.RefObject<HTMLElement | null>,
  margin = "-80px",
  once = true,
) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e?.isIntersecting) {
          setInView(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin: margin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, margin, once]);
  return inView;
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance,
  className,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(ref, "-80px", once);

  let hiddenTransform = transforms[direction];
  if (distance != null && direction !== "none") {
    if (direction === "up") hiddenTransform = `translate3d(0, ${distance}px, 0)`;
    else if (direction === "down")
      hiddenTransform = `translate3d(0, ${-distance}px, 0)`;
    else if (direction === "left")
      hiddenTransform = `translate3d(${distance}px, 0, 0)`;
    else hiddenTransform = `translate3d(${-distance}px, 0, 0)`;
  }

  const style: CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView ? "none" : hiddenTransform,
    transition: `opacity ${duration}s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform ${duration}s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    willChange: inView ? undefined : "opacity, transform",
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   ScrollZoom - was a JS-driven scale-on-scroll. Removed for perf; renders
   children directly. The visual effect cost more than it gave.
--------------------------------------------------------------------------- */
interface ScrollZoomProps {
  children: ReactNode;
  className?: string;
  from?: number;
  to?: number;
  offset?: [string, string];
}

export function ScrollZoom({ children, className }: ScrollZoomProps) {
  return <div className={cn("relative", className)}>{children}</div>;
}

/* ---------------------------------------------------------------------------
   Parallax - removed for perf. Pass-through.
--------------------------------------------------------------------------- */
interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function Parallax({ children, className }: ParallaxProps) {
  return <div className={cn("relative", className)}>{children}</div>;
}

/* ---------------------------------------------------------------------------
   ScrollStack - sticky stacked cards (pure CSS).
--------------------------------------------------------------------------- */
interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  topOffset?: string;
  stepOffset?: number;
  scaleStep?: number;
  gap?: string;
}

export function ScrollStack({
  children,
  className,
  topOffset = "12vh",
  stepOffset = 18,
  scaleStep = 0.025,
  gap = "8vh",
}: ScrollStackProps) {
  const items = Children.toArray(children).filter(isValidElement) as ReactElement[];

  return (
    <div className={cn("relative", className)}>
      {items.map((child, i) => {
        const style: CSSProperties = {
          position: "sticky",
          top: `calc(${topOffset} + ${i * stepOffset}px)`,
          zIndex: 10 + i,
          marginBottom: i < items.length - 1 ? gap : 0,
        };
        const innerStyle: CSSProperties = {
          transform: `scale(${1 - (items.length - 1 - i) * scaleStep})`,
          transformOrigin: "50% 0%",
        };
        return (
          <div
            key={child.key ?? i}
            className="stack-card"
            style={style}
            data-stack-index={i}
          >
            <div style={innerStyle}>{child}</div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   MagneticButton - cursor-attracted CTA on pointer devices.
--------------------------------------------------------------------------- */
interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: ElementType;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

export function MagneticButton({
  children,
  className,
  strength = 18,
  as,
  href,
  onClick,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ref.current.getBoundingClientRect();
    const dx = ((e.clientX - r.left) / r.width - 0.5) * strength;
    const dy = ((e.clientY - r.top) / r.height - 0.5) * strength;
    ref.current.style.transform = `translate(${dx}px, ${dy}px)`;
  };
  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0,0)";
  };

  const Tag = (as ?? "button") as ElementType;
  const props = {
    ref,
    href,
    onClick,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    "aria-label": ariaLabel,
    className: cn("inline-flex transition-transform duration-300 ease-out", className),
  } as Record<string, unknown>;

  return <Tag {...props}>{children}</Tag>;
}

/* ---------------------------------------------------------------------------
   StaggerGroup - wraps a list, IntersectionObserver fires CSS animation
   on children when the parent enters the viewport.
--------------------------------------------------------------------------- */
interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function StaggerGroup({
  children,
  className,
  delay = 0,
  stagger = 0.08,
}: StaggerGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(ref, "-80px", true);

  const style = {
    "--stagger-delay-base": `${delay}s`,
    "--stagger-step": `${stagger}s`,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className={cn(className, inView && "is-revealed")}
      style={style}
      data-stagger
    >
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  className,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
}) {
  const hidden = transforms[direction];
  return (
    <div
      className={cn("stagger-item", className)}
      style={{
        opacity: 0,
        transform: hidden,
        transition:
          "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {children}
    </div>
  );
}
