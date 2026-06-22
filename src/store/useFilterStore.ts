import { create } from "zustand";
import { DEFAULT_SORT, type ProductFilters, type SortOption } from "@/lib/types/product";

export type ArrayFilterKey = "category" | "roastLevel" | "method" | "process";

interface FilterState {
  activeFilters: ProductFilters;
  sort: SortOption;
  toggleFilter: (key: ArrayFilterKey, value: string) => void;
  setPriceRange: (min: number | undefined, max: number | undefined) => void;
  setSort: (sort: SortOption) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  activeFilters: {},
  sort: DEFAULT_SORT,
  toggleFilter: (key, value) =>
    set((state) => {
      const current = state.activeFilters[key] ?? [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { activeFilters: { ...state.activeFilters, [key]: next } };
    }),
  setPriceRange: (min, max) =>
    set((state) => ({
      activeFilters: { ...state.activeFilters, priceMin: min, priceMax: max },
    })),
  setSort: (sort) => set({ sort }),
  resetFilters: () => set({ activeFilters: {} }),
}));
