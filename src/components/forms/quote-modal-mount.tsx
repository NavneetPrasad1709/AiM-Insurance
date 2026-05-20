"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useQuoteModal } from "@/lib/quote-modal-context";

// QuoteModal is ~63 KiB of form/validation code that isn't needed for
// the initial render. Defer the chunk until the user actually opens it.
const QuoteModal = dynamic(
  () => import("./quote-modal").then((m) => ({ default: m.QuoteModal })),
  { ssr: false },
);

export function QuoteModalMount() {
  const { isOpen } = useQuoteModal();

  // React-supported "store derived state" pattern: setting state during
  // render is valid when it converges in one pass and is the same instance
  // (see https://react.dev/reference/react/useState#storing-information-from-previous-renders).
  // Once the user opens the modal for the first time we latch this to true
  // so re-opens render instantly from the already-loaded chunk.
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  if (isOpen && !hasOpenedOnce) {
    setHasOpenedOnce(true);
  }

  if (!hasOpenedOnce) return null;
  return <QuoteModal />;
}
