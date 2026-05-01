"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import {
  Children,
  isValidElement,
  useRef,
  type CSSProperties,
  type ElementType,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------------------------------------------------------------------------
   ScrollReveal — fade/slide on viewport entry.
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

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 36 },
  down: { x: 0, y: -28 },
  left: { x: 36, y: 0 },
  right: { x: -36, y: 0 },
  none: { x: 0, y: 0 },
};

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance,
  className,
  once = true,
}: ScrollRevealProps) {
  const reduce = useReducedMotion();
  const base = offsets[direction];
  const x = direction === "left" || direction === "right" ? distance ?? base.x : 0;
  const y = direction === "up" || direction === "down" ? distance ?? base.y : 0;

  const variants: Variants = {
    hidden: { opacity: 0, x: reduce ? 0 : x, y: reduce ? 0 : y },
    show: { opacity: 1, x: 0, y: 0 },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, delay, ease: EASE }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------------------------------------
   ScrollZoom — element scales based on scroll progress.
   Use for hero images / mascot cards that grow into view.
--------------------------------------------------------------------------- */
interface ScrollZoomProps {
  children: ReactNode;
  className?: string;
  from?: number;
  to?: number;
  /** scroll offsets — see framer-motion useScroll */
  offset?: [string, string];
}

export function ScrollZoom({
  children,
  className,
  from = 0.85,
  to = 1.05,
  offset = ["start end", "end start"],
}: ScrollZoomProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as Parameters<typeof useScroll>[0] extends infer T
      ? T extends { offset?: infer O }
        ? O
        : never
      : never,
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [from, to, from]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0.6, 1, 1, 0.7]);

  return (
    <div ref={ref} className={cn("relative will-change-transform", className)}>
      <motion.div
        style={
          reduce
            ? undefined
            : ({ scale, opacity } as { scale: MotionValue<number>; opacity: MotionValue<number> })
        }
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Parallax — slow-scrolling background element.
--------------------------------------------------------------------------- */
interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number; // -1 to 1 — negative = scrolls slower than page
}

export function Parallax({ children, className, speed = 0.3 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 80}px`, `${-speed * 80}px`]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   ScrollStack — Wix-style sticky stacked cards.
   Each child becomes a sticky card; later cards land on top of earlier ones,
   while earlier ones scale + dim slightly. Mobile-friendly: cards stack
   vertically on small screens with the same sticky behavior.
--------------------------------------------------------------------------- */
interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  /** Top offset of the FIRST card (sticky top value). */
  topOffset?: string;
  /** Pixels each subsequent card is offset further down — creates "deck" effect. */
  stepOffset?: number;
  /** Scale shrink applied per step (earlier cards look further "behind"). */
  scaleStep?: number;
  /** Vertical gap (margin-bottom) between cards in scroll length. */
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
   MagneticButton — cursor-attracted CTA on pointer devices.
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
  const reduce = useReducedMotion();

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    if (reduce || !ref.current) return;
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
   StaggerGroup — wraps a list, animates children in sequence.
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
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
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
  const base = offsets[direction];
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, x: base.x, y: base.y },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.7, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
