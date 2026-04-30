import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface LogoProps {
  /** "light" — white tagline for dark backgrounds. "dark" — black tagline for light backgrounds. */
  variant?: "dark" | "light";
  showCaption?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

const SIZE_PX = {
  sm: { w: 96, h: 56 },
  md: { w: 128, h: 74 },
  lg: { w: 168, h: 96 },
};

export function Logo({
  variant = "light",
  className,
  size = "md",
  onClick,
}: LogoProps) {
  const src =
    variant === "light" ? "/brand/aim-logo.webp" : "/brand/aim-logo-black.webp";
  const dims = SIZE_PX[size];

  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="AiM Insurance home"
      className={cn(
        "inline-flex items-center transition-opacity duration-150 hover:opacity-90",
        className
      )}
    >
      <Image
        src={src}
        alt="AiM — Product by Car Concierge Pro"
        width={dims.w}
        height={dims.h}
        priority
        className="h-auto w-auto"
        style={{ height: `${dims.h * 0.55}px`, width: "auto" }}
      />
    </Link>
  );
}

export default Logo;
