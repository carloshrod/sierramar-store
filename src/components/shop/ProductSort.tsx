"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SORT_OPTIONS } from "@/lib/types/product";
import { useFilterStore } from "@/store/useFilterStore";

export function ProductSort() {
  const sort = useFilterStore((state) => state.sort);
  const setSort = useFilterStore((state) => state.setSort);

  return (
    <Select
      items={SORT_OPTIONS}
      value={sort}
      onValueChange={(value) => value && setSort(value)}
    >
      <SelectTrigger
        aria-label="Ordenar productos"
        className="w-52 cursor-pointer"
      >
        <SelectValue placeholder="Ordenar por" />
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="cursor-pointer"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
