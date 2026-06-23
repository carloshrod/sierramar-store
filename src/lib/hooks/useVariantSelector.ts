import { useState } from "react";
import type { GrindType, ProductVariant } from "@/lib/types/product";

function getDefaultVariant(variants: ProductVariant[]): ProductVariant | undefined {
  const active = variants.filter((variant) => variant.isActive);
  return active.find((variant) => variant.stock > 0) ?? active[0];
}

/** Grind and weight are picked independently; selecting one snaps the other to the nearest existing combination. */
export function useVariantSelector(variants: ProductVariant[] = []) {
  const activeVariants = variants.filter((variant) => variant.isActive);
  const defaultVariant = getDefaultVariant(variants);

  const [grindType, setGrindType] = useState<GrindType | undefined>(defaultVariant?.grindType);
  const [weight, setWeight] = useState<number | undefined>(defaultVariant?.weight);

  const grindTypes = Array.from(new Set(activeVariants.map((variant) => variant.grindType)));
  const weights = Array.from(new Set(activeVariants.map((variant) => variant.weight))).sort(
    (a, b) => a - b,
  );

  const selectedVariant = activeVariants.find(
    (variant) => variant.grindType === grindType && variant.weight === weight,
  );

  const selectGrindType = (next: GrindType) => {
    setGrindType(next);
    const stillAvailable = activeVariants.some(
      (variant) => variant.grindType === next && variant.weight === weight,
    );
    if (!stillAvailable) {
      const fallback = activeVariants.find((variant) => variant.grindType === next);
      if (fallback) setWeight(fallback.weight);
    }
  };

  const selectWeight = (next: number) => {
    setWeight(next);
    const stillAvailable = activeVariants.some(
      (variant) => variant.weight === next && variant.grindType === grindType,
    );
    if (!stillAvailable) {
      const fallback = activeVariants.find((variant) => variant.weight === next);
      if (fallback) setGrindType(fallback.grindType);
    }
  };

  return {
    activeVariants,
    grindTypes,
    weights,
    grindType,
    weight,
    selectedVariant,
    selectGrindType,
    selectWeight,
  };
}
