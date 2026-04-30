"use client";

import {
  GoldParticleField,
  AuroraStrands,
  CornerOrnament,
  GrainTexture,
} from "@/components/illustrations/ambience";

/**
 * Ambience layer for service-page hero section.
 * Mirrors the calculator-page ambience but tuned slightly tighter
 * (lower density) so the foreground illustration stays the focus.
 */
export function ServiceHeroAmbience() {
  return (
    <>
      <GoldParticleField density={22} opacity={0.4} />
      <AuroraStrands opacity={0.18} />
      <GrainTexture opacity={0.06} />
      <CornerOrnament position="tl" size={180} opacity={0.28} />
      <CornerOrnament position="br" size={180} opacity={0.28} />
    </>
  );
}

/**
 * Lighter ambience for the bottom-CTA on a service page.
 */
export function ServiceCtaAmbience() {
  return (
    <>
      <GoldParticleField density={18} opacity={0.5} />
      <CornerOrnament position="tl" size={160} opacity={0.32} />
      <CornerOrnament position="tr" size={160} opacity={0.32} />
    </>
  );
}

export default ServiceHeroAmbience;
