import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "default"
  | "coral"
  | "accent"
  | "success"
  | "error"
  | "warning";

export type BadgeSize = "sm" | "md";

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  default: "bg-primary/10 text-primary",
  coral: "bg-cta-light text-cta-hover",
  accent: "bg-accent-light text-accent",
  success: "bg-success-light text-success",
  error: "bg-error-light text-error",
  warning: "bg-warning-light text-warning",
};

const SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: "px-2.5 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children?: ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = "default", size = "sm", className, children, ...rest },
  ref
) {
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-heading font-semibold tracking-wide uppercase",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
});

export default Badge;
