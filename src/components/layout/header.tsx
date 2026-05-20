"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/layout/logo";

// MobileNav pulls in framer-motion for the slide-in drawer. Defer it
// until the hamburger actually opens — keeps the header chunk lean.
const MobileNav = dynamic(
  () => import("@/components/layout/mobile-nav").then((m) => m.MobileNav),
  { ssr: false },
);
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useQuoteModal } from "@/lib/quote-modal-context";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { ICONS, getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/types";

const HOVER_CLOSE_DELAY = 150;

interface PillLinkProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

function PillLink({ href, active, children, onClick }: PillLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "px-4 py-2.5 text-sm font-semibold rounded-full transition-colors",
        active
          ? "bg-cta text-background shadow-coral"
          : "text-white/75 hover:bg-white/10 hover:text-white"
      )}
    >
      {children}
    </Link>
  );
}

function PillDropdown({ link, pathname }: { link: NavLink; pathname: string }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpen(true);
  };
  const handleLeave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), HOVER_CLOSE_DELAY);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [open]);

  const handleKey = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Escape") {
      setOpen(false);
      (e.currentTarget as HTMLButtonElement).blur();
    }
  };

  const isAnyChildActive = !!link.children?.some((c) => c.href === pathname);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen(true)}
        onKeyDown={handleKey}
        className={cn(
          "inline-flex items-center gap-1 px-4 py-2.5 text-sm font-semibold rounded-full transition-colors",
          isAnyChildActive
            ? "bg-cta text-background shadow-coral"
            : "text-white/75 hover:bg-white/10 hover:text-white"
        )}
      >
        {link.label}
        <ICONS.ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-200",
            open && "rotate-180"
          )}
          aria-hidden
        />
      </button>

      <div
        className={cn(
          "absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-3 transition-[opacity,transform] duration-200 ease-out",
          open
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 -translate-y-2",
        )}
        role="menu"
        aria-hidden={!open}
      >
        <div className="grid grid-cols-2 gap-1.5 rounded-2xl border border-white/10 bg-surface/95 p-3 shadow-card-hover backdrop-blur-xl">
          {(link.children ?? []).map((child) => {
            const Icon = getIcon(child.icon);
            return (
              <Link
                key={child.href}
                href={child.href}
                role="menuitem"
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/5"
              >
                {Icon && (
                  <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-cta/15 text-cta transition-colors group-hover:bg-gradient-warm group-hover:text-white">
                    <Icon className="size-5" aria-hidden />
                  </span>
                )}
                <span className="flex flex-col gap-0.5">
                  <span className="flex items-center gap-2">
                    <span className="font-heading font-semibold text-white">
                      {child.label}
                    </span>
                    {child.badge && (
                      <Badge variant="coral" size="sm">
                        {child.badge}
                      </Badge>
                    )}
                  </span>
                  {child.description && (
                    <span className="text-sm text-white/60">
                      {child.description}
                    </span>
                  )}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CircleArrowCta({ onClick, label }: { onClick?: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="btn-shine group inline-flex items-center gap-2 rounded-full bg-cta hover:bg-cta-hover text-white px-5 py-2.5 font-heading font-semibold text-sm shadow-coral transition-all"
    >
      <span>{label}</span>
      <span className="inline-flex size-6 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5">
        <ICONS.ArrowRight className="size-3.5" aria-hidden />
      </span>
    </button>
  );
}

export function Header() {
  const pathname = usePathname();
  const { isScrolled } = useScrollPosition();
  const { openModal } = useQuoteModal();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileEverOpened, setMobileEverOpened] = useState(false);
  if (mobileOpen && !mobileEverOpened) setMobileEverOpened(true);

  const isHome = pathname === "/";
  const transparent = isHome && !isScrolled;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter,padding,border-color] duration-300",
          transparent
            ? "bg-transparent py-5 border-b border-transparent"
            : isScrolled
              ? "bg-background/80 backdrop-blur-xl shadow-md border-b border-white/8 py-3"
              : "bg-background/95 backdrop-blur-md py-5 border-b border-white/8"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Logo variant="light" />

          {/* Center: pill nav */}
          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center"
          >
            <div className="flex items-center gap-0 rounded-full border border-white/10 bg-white/5 backdrop-blur-md p-1.5">
              {NAV_LINKS.map((link) =>
                link.children?.length ? (
                  <PillDropdown key={link.label} link={link} pathname={pathname} />
                ) : (
                  <PillLink
                    key={link.href}
                    href={link.href}
                    active={pathname === link.href}
                  >
                    {link.label}
                  </PillLink>
                )
              )}
            </div>
          </nav>

          {/* Right: phone + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, "")}`}
              className="hidden xl:inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-white transition-colors"
            >
              <ICONS.Phone className="size-4 text-accent" aria-hidden />
              {SITE_CONFIG.phone}
            </a>
            <CircleArrowCta
              label="Get Free Quote"
              onClick={() => openModal()}
            />
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className="lg:hidden inline-flex size-11 items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors"
          >
            <ICONS.Menu className="size-6" aria-hidden />
          </button>
        </div>
      </header>

      {/* Spacer on inner pages so content isn't hidden under the fixed header */}
      {!isHome && <div aria-hidden className="h-20" />}

      {mobileEverOpened && (
        <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      )}
    </>
  );
}

export default Header;
