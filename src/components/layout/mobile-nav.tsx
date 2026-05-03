"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { AnimatePresence, m as motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/layout/logo";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useQuoteModal } from "@/lib/quote-modal-context";
import { NAV_LINKS, SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import { ICONS, getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { openModal } = useQuoteModal();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [prevOpen, setPrevOpen] = useState(open);
  if (prevOpen !== open) {
    setPrevOpen(open);
    if (!open && servicesOpen) setServicesOpen(false);
  }

  useLockBodyScroll(open);

  useEffect(() => {
    if (open) {
      lastFocusRef.current = document.activeElement as HTMLElement | null;
      requestAnimationFrame(() => closeBtnRef.current?.focus());
    } else {
      lastFocusRef.current?.focus?.();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleTrap = useCallback(
    (e: ReactKeyboardEvent<HTMLDivElement>) => {
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((el) => !el.hasAttribute("disabled"));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    },
    []
  );

  const navigate = (href: string) => {
    onClose();
    if (href !== "#") router.push(href);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          ref={panelRef}
          onKeyDown={handleTrap}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[60] text-white lg:hidden flex flex-col bg-background"
          style={{ backgroundColor: "rgb(10 14 26 / 0.98)" }}
        >
          <div className="flex items-center justify-between px-4 sm:px-6 h-20 shrink-0">
            <Logo variant="light" />
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="inline-flex size-11 items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors"
            >
              <ICONS.X className="size-6" aria-hidden />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-8">
            <nav aria-label="Mobile primary" className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                if (link.children?.length) {
                  return (
                    <div key={link.label}>
                      <button
                        type="button"
                        aria-expanded={servicesOpen}
                        onClick={() => setServicesOpen((v) => !v)}
                        className="w-full flex items-center justify-between py-3 text-2xl font-heading font-semibold text-white"
                      >
                        <span>{link.label}</span>
                        <ICONS.ChevronDown
                          className={cn(
                            "size-5 transition-transform duration-200",
                            servicesOpen && "rotate-180"
                          )}
                          aria-hidden
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {servicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <ul className="flex flex-col gap-1 pb-2 pl-2">
                              {link.children.map((child) => {
                                const Icon = getIcon(child.icon);
                                return (
                                  <li key={child.href}>
                                    <button
                                      type="button"
                                      onClick={() => navigate(child.href)}
                                      className="w-full flex items-center gap-3 py-2.5 text-left text-lg text-white/85 hover:text-cta transition-colors"
                                    >
                                      {Icon && (
                                        <Icon
                                          className="size-5 text-cta"
                                          aria-hidden
                                        />
                                      )}
                                      <span>{child.label}</span>
                                      {child.badge && (
                                        <Badge variant="coral" size="sm">
                                          {child.badge}
                                        </Badge>
                                      )}
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      "py-3 text-2xl font-heading font-semibold transition-colors",
                      isActive
                        ? "text-cta"
                        : "text-white hover:text-cta"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="my-6 h-px bg-white/15" />

            <a
              href={`tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, "")}`}
              onClick={onClose}
              className="inline-flex items-center gap-3 text-white/85 hover:text-cta transition-colors"
            >
              <ICONS.Phone className="size-5 text-cta" aria-hidden />
              <span className="font-heading font-semibold text-lg">
                {SITE_CONFIG.phone}
              </span>
            </a>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              className="mt-5"
              onClick={() => {
                onClose();
                openModal();
              }}
              rightIcon={<ICONS.ArrowRight className="size-4" aria-hidden />}
            >
              Get Free Quote
            </Button>

            <div className="mt-8 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = getIcon(social.icon);
                if (!Icon) return null;
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 text-white/80 hover:text-cta hover:border-cta transition-colors"
                  >
                    <Icon className="size-5" aria-hidden />
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MobileNav;
