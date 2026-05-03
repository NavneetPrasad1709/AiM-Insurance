"use client";

import { forwardRef, type ReactNode } from "react";
import { m as motion, type HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "link";

export type ButtonSize = "sm" | "md" | "lg" | "xl";

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  children?: ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "btn-shine bg-gradient-coral text-white shadow-md hover:shadow-coral focus-visible:shadow-coral",
  secondary:
    "bg-primary text-white hover:bg-primary-hover shadow-sm",
  outline:
    "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white",
  ghost: "text-primary bg-transparent hover:bg-primary/5",
  link: "text-cta underline-offset-4 hover:underline px-0 py-0 shadow-none rounded-none",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-5 py-2 text-sm gap-1.5",
  md: "px-7 py-3 text-base gap-2",
  lg: "px-9 py-4 text-lg gap-2.5",
  xl: "px-10 py-5 text-xl gap-3",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      disabled,
      children,
      type = "button",
      ...rest
    },
    ref
  ) {
    const isDisabled = disabled || isLoading;
    const isLink = variant === "link";

    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={isLoading || undefined}
        whileHover={
          isDisabled || isLink
            ? undefined
            : { y: -1, scale: variant === "primary" ? 1.02 : 1 }
        }
        whileTap={isDisabled || isLink ? undefined : { scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 24 }}
        className={cn(
          "inline-flex items-center justify-center font-heading font-semibold transition-colors",
          isLink ? "" : "rounded-full",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta",
          SIZE_CLASSES[size],
          VARIANT_CLASSES[variant],
          fullWidth && "w-full",
          className
        )}
        {...rest}
      >
        {isLoading ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </motion.button>
    );
  }
);

export default Button;
