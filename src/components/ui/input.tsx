"use client";

import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

interface FieldShellProps {
  id: string;
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  children: ReactNode;
  className?: string;
  light?: boolean;
}

function FieldShell({
  id,
  label,
  required,
  error,
  helperText,
  children,
  className,
  light,
}: FieldShellProps) {
  const describedById = error
    ? `${id}-error`
    : helperText
      ? `${id}-helper`
      : undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "text-sm font-heading font-semibold",
            light ? "text-[#0a0a0a]" : "text-text-primary",
          )}
        >
          {label}
          {required && (
            <span className="text-error ml-1" aria-hidden>
              *
            </span>
          )}
        </label>
      )}
      <div data-described-by={describedById}>{children}</div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-error">
          {error}
        </p>
      ) : helperText ? (
        <p
          id={`${id}-helper`}
          className={cn("text-sm", light ? "text-[#2e2e36]" : "text-text-muted")}
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

const baseFieldClasses =
  "w-full rounded-xl border px-4 py-3 text-base transition-colors focus:outline-none focus:ring-4 disabled:opacity-60 disabled:cursor-not-allowed";

const darkSurfaceClasses =
  "bg-surface text-text-primary placeholder:text-text-muted";

const lightSurfaceClasses =
  "bg-white text-[#0a0a0a] placeholder:text-[#7a7a82]";

const okFieldClasses =
  "border-border-light focus:border-cta focus:ring-cta/20";

const okLightFieldClasses =
  "border-[#0a0a0a]/15 focus:border-cta focus:ring-cta/25";

const errorFieldClasses =
  "border-error focus:border-error focus:ring-error/20";

/* ------------------------------ Input ------------------------------ */

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  register?: UseFormRegisterReturn;
  containerClassName?: string;
  light?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    id,
    label,
    error,
    helperText,
    leftIcon,
    required,
    className,
    containerClassName,
    register,
    light,
    ...rest
  },
  ref
) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const isInvalid = Boolean(error);
  const describedBy = error
    ? `${fieldId}-error`
    : helperText
      ? `${fieldId}-helper`
      : undefined;

  return (
    <FieldShell
      id={fieldId}
      label={label}
      required={required}
      error={error}
      helperText={helperText}
      className={containerClassName}
      light={light}
    >
      <div className="relative">
        {leftIcon && (
          <span
            className={cn(
              "pointer-events-none absolute inset-y-0 left-3 flex items-center",
              light ? "text-[#2e2e36]" : "text-text-muted",
            )}
            aria-hidden
          >
            {leftIcon}
          </span>
        )}
        <input
          id={fieldId}
          ref={ref}
          aria-invalid={isInvalid || undefined}
          aria-describedby={describedBy}
          required={required}
          className={cn(
            baseFieldClasses,
            light ? lightSurfaceClasses : darkSurfaceClasses,
            isInvalid
              ? errorFieldClasses
              : light
                ? okLightFieldClasses
                : okFieldClasses,
            leftIcon && "pl-10",
            className
          )}
          {...register}
          {...rest}
        />
      </div>
    </FieldShell>
  );
});

/* ----------------------------- Textarea ----------------------------- */

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  register?: UseFormRegisterReturn;
  containerClassName?: string;
  light?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      id,
      label,
      error,
      helperText,
      required,
      className,
      containerClassName,
      register,
      light,
      rows = 4,
      ...rest
    },
    ref
  ) {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const isInvalid = Boolean(error);
    const describedBy = error
      ? `${fieldId}-error`
      : helperText
        ? `${fieldId}-helper`
        : undefined;

    return (
      <FieldShell
        id={fieldId}
        label={label}
        required={required}
        error={error}
        helperText={helperText}
        className={containerClassName}
        light={light}
      >
        <textarea
          id={fieldId}
          ref={ref}
          rows={rows}
          aria-invalid={isInvalid || undefined}
          aria-describedby={describedBy}
          required={required}
          className={cn(
            baseFieldClasses,
            light ? lightSurfaceClasses : darkSurfaceClasses,
            isInvalid
              ? errorFieldClasses
              : light
                ? okLightFieldClasses
                : okFieldClasses,
            "resize-y",
            className
          )}
          {...register}
          {...rest}
        />
      </FieldShell>
    );
  }
);

/* ------------------------------ Select ------------------------------ */

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  register?: UseFormRegisterReturn;
  containerClassName?: string;
  light?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      id,
      label,
      error,
      helperText,
      options,
      placeholder,
      required,
      className,
      containerClassName,
      register,
      light,
      ...rest
    },
    ref
  ) {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const isInvalid = Boolean(error);
    const describedBy = error
      ? `${fieldId}-error`
      : helperText
        ? `${fieldId}-helper`
        : undefined;

    const arrowColor = light ? "%230a0a0a" : "%2394A3B8";

    return (
      <FieldShell
        id={fieldId}
        label={label}
        required={required}
        error={error}
        helperText={helperText}
        className={containerClassName}
        light={light}
      >
        <select
          id={fieldId}
          ref={ref}
          aria-invalid={isInvalid || undefined}
          aria-describedby={describedBy}
          required={required}
          defaultValue={rest.defaultValue ?? (placeholder ? "" : undefined)}
          className={cn(
            baseFieldClasses,
            light ? lightSurfaceClasses : darkSurfaceClasses,
            isInvalid
              ? errorFieldClasses
              : light
                ? okLightFieldClasses
                : okFieldClasses,
            "appearance-none pr-10 bg-[length:16px_16px] bg-no-repeat bg-[right_1rem_center]",
            className
          )}
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='${arrowColor}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>")`,
          }}
          {...register}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              disabled={opt.disabled}
            >
              {opt.label}
            </option>
          ))}
        </select>
      </FieldShell>
    );
  }
);

export default Input;
