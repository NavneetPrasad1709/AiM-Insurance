"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type FormSubmitStatus = "idle" | "loading" | "success" | "error";

export interface UseFormSubmitOptions {
  /** Skip the leads API call and just simulate locally (useful in tests). */
  simulateOnly?: boolean;
  /** Reset back to idle this many ms after success. Set to 0 to disable. */
  autoResetMs?: number;
}

export interface UseFormSubmitResult {
  submit: <T>(formData: T) => Promise<boolean>;
  status: FormSubmitStatus;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string | null;
  reset: () => void;
}

const DEFAULT_RESET_MS = 5000;

export function useFormSubmit(
  formName: string,
  options: UseFormSubmitOptions = {}
): UseFormSubmitResult {
  const { simulateOnly = false, autoResetMs = DEFAULT_RESET_MS } = options;
  const [status, setStatus] = useState<FormSubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = useCallback(() => {
    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
      resetTimer.current = null;
    }
    setStatus("idle");
    setErrorMessage(null);
  }, []);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const submit = useCallback(
    async <T,>(formData: T): Promise<boolean> => {
      setStatus("loading");
      setErrorMessage(null);

      const payload = {
        formName,
        data: formData,
        timestamp: new Date().toISOString(),
      };

      if (typeof console !== "undefined") {
        console.log("[useFormSubmit] submit", payload);
      }

      try {
        if (simulateOnly) {
          await new Promise((r) => setTimeout(r, 1500));
        } else {
          // POST to internal leads route. Falls back to a simulated delay if
          // the route is unreachable so dev/preview never blocks the user.
          // TODO: Replace with actual API endpoint once email/CRM is wired.
          //   fetch('/api/leads', { method: 'POST', body: JSON.stringify({ formName, data }) })
          const res = await fetch("/api/leads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!res.ok) {
            const txt = await res.text().catch(() => "");
            throw new Error(txt || `Request failed (${res.status})`);
          }
        }

        setStatus("success");
        if (autoResetMs > 0) {
          resetTimer.current = setTimeout(() => {
            setStatus("idle");
            setErrorMessage(null);
          }, autoResetMs);
        }
        return true;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.";
        setStatus("error");
        setErrorMessage(message);
        return false;
      }
    },
    [formName, simulateOnly, autoResetMs]
  );

  return {
    submit,
    status,
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
    errorMessage,
    reset,
  };
}

export default useFormSubmit;
