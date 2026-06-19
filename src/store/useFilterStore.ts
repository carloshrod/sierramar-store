import { create } from "zustand";

interface FilterState {
  activeFilters: Record<string, unknown>;
  setFilter: (key: string, value: unknown) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  activeFilters: {},
  setFilter: (key, value) =>
    set((state) => ({ activeFilters: { ...state.activeFilters, [key]: value } })),
  resetFilters: () => set({ activeFilters: {} }),
}));
