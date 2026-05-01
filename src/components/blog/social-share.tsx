"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ICONS } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface SocialShareProps {
  /** Site-relative URL or full URL. */
  url: string;
  title: string;
  className?: string;
}

function resolveUrl(url: string): string {
  if (url.startsWith("http")) return url;
  if (typeof window === "undefined") return url;
  return new URL(url, window.location.origin).toString();
}

export function SocialShare({ url, title, className }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const enc = encodeURIComponent;
  const buildTargets = () => {
    const absolute = resolveUrl(url);
    return [
      {
        label: "Share on X",
        href: `https://twitter.com/intent/tweet?url=${enc(absolute)}&text=${enc(title)}`,
        Icon: ICONS.Twitter,
      },
      {
        label: "Share on Facebook",
        href: `https://www.facebook.com/sharer/sharer.php?u=${enc(absolute)}`,
        Icon: ICONS.Facebook,
      },
      {
        label: "Share on LinkedIn",
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(absolute)}`,
        Icon: ICONS.Linkedin,
      },
    ];
  };

  const handleShareClick = (href: string) => {
    if (typeof window === "undefined") return;
    window.open(href, "_blank", "noopener,noreferrer,width=620,height=540");
  };

  const handleCopy = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(resolveUrl(url));
      setCopied(true);
    } catch {
      // ignore — older browsers without clipboard permission
    }
  };

  const targets = buildTargets();

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="mr-2 text-xs font-heading font-semibold uppercase tracking-[0.18em] text-text-muted">
        Share
      </span>
      {targets.map(({ label, href, Icon }) => (
        <button
          key={label}
          type="button"
          aria-label={label}
          onClick={() => handleShareClick(href)}
          className="grid size-10 place-items-center rounded-full border border-border bg-surface text-text-secondary transition-colors hover:border-cta/40 hover:text-cta"
        >
          <Icon className="size-4" aria-hidden />
        </button>
      ))}
      <div className="relative">
        <button
          type="button"
          aria-label="Copy link"
          onClick={handleCopy}
          className={cn(
            "grid size-10 place-items-center rounded-full border border-border bg-surface transition-colors",
            copied
              ? "border-success/40 text-success"
              : "text-text-secondary hover:border-cta/40 hover:text-cta",
          )}
        >
          {copied ? (
            <ICONS.Check className="size-4" aria-hidden />
          ) : (
            <ICONS.Link2 className="size-4" aria-hidden />
          )}
        </button>
        <AnimatePresence>
          {copied && (
            <motion.span
              role="status"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.18 }}
              className="absolute left-1/2 top-full mt-2 -translate-x-1/2 rounded-md bg-surface-2 px-2.5 py-1 text-xs font-heading font-semibold text-success shadow"
            >
              Copied!
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SocialShare;
