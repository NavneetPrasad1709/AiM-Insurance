"use client";

import {
  GoldParticleField,
  AuroraStrands,
  CornerOrnament,
  GrainTexture,
} from "@/components/illustrations/ambience";

/**
 * Decorative ambience layer for the /calculator page hero.
 * Pure decoration, aria-hidden, pointer-events:none.
 */
export function CalculatorPageAmbience() {
  return (
    <>
      <GoldParticleField density={28} opacity={0.45} />
      <AuroraStrands opacity={0.22} />
      <GrainTexture opacity={0.07} />
      <CornerOrnament position="tl" size={200} opacity={0.32} />
      <CornerOrnament position="tr" size={200} opacity={0.32} />
    </>
  );
}

export default CalculatorPageAmbience;
