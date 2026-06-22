"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { PRICE_RANGE } from "@/lib/types/product";
import { formatPrice } from "@/lib/utils/price";
import { useFilterStore } from "@/store/useFilterStore";

const STEP = 5_000;

/**
 * Keyed by `priceMin`/`priceMax` from the parent so an external reset
 * (e.g. "Limpiar") remounts this with fresh local drag state instead of
 * syncing it through an effect.
 */
export function PriceRangeFilter() {
  const priceMin = useFilterStore((state) => state.activeFilters.priceMin);
  const priceMax = useFilterStore((state) => state.activeFilters.priceMax);
  const setPriceRange = useFilterStore((state) => state.setPriceRange);

  const [range, setRange] = useState<[number, number]>([
    priceMin ?? PRICE_RANGE.min,
    priceMax ?? PRICE_RANGE.max,
  ]);

  return (
    <div>
      <Slider
        className="mt-1"
        min={PRICE_RANGE.min}
        max={PRICE_RANGE.max}
        step={STEP}
        value={range}
        onValueChange={(value) => setRange(value as [number, number])}
        onValueCommitted={(value) => {
          const [min, max] = value as [number, number];
          setPriceRange(
            min <= PRICE_RANGE.min ? undefined : min,
            max >= PRICE_RANGE.max ? undefined : max,
          );
        }}
      />
      <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
        <span>{formatPrice(range[0])}</span>
        <span>{formatPrice(range[1])}</span>
      </div>
    </div>
  );
}
