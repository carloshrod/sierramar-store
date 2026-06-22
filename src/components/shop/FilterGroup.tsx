"use client";

import { cn } from "@/lib/utils/index";
import { useFilterStore, type ArrayFilterKey } from "@/store/useFilterStore";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterGroupProps {
  title: string;
  filterKey: ArrayFilterKey;
  options: FilterOption[];
}

export function FilterGroup({ title, filterKey, options }: FilterGroupProps) {
  const activeValues =
    useFilterStore((state) => state.activeFilters[filterKey]) ?? [];
  const toggleFilter = useFilterStore((state) => state.toggleFilter);

  return (
    <fieldset>
      <legend className="sr-only">{title}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = activeValues.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => toggleFilter(filterKey, option.value)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm transition-colors cursor-pointer",
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground/70 hover:border-foreground/30 hover:text-foreground",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
