"use client";

import { SlidersHorizontal } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterGroup } from "@/components/shop/FilterGroup";
import { PriceRangeFilter } from "@/components/shop/PriceRangeFilter";
import { useCategories } from "@/lib/hooks/useCategories";
import { BREW_METHODS, PROCESSES, ROAST_LEVELS } from "@/lib/types/product";
import { useFilterStore } from "@/store/useFilterStore";

const DEFAULT_OPEN_SECTIONS = [
  "price",
  "category",
  "roastLevel",
  "method",
  "process",
];

function FilterSections() {
  const { data: categories } = useCategories();
  const priceMin = useFilterStore((state) => state.activeFilters.priceMin);
  const priceMax = useFilterStore((state) => state.activeFilters.priceMax);

  return (
    <Accordion multiple defaultValue={DEFAULT_OPEN_SECTIONS}>
      {categories && categories.length > 0 && (
        <AccordionItem value="category">
          <AccordionTrigger className="font-serif text-sm">
            Categoría
          </AccordionTrigger>
          <AccordionContent>
            <FilterGroup
              title="Categoría"
              filterKey="category"
              options={categories.map((category) => ({
                value: category.slug,
                label: category.name,
              }))}
            />
          </AccordionContent>
        </AccordionItem>
      )}

      <AccordionItem value="roastLevel">
        <AccordionTrigger className="font-serif text-sm">
          Nivel de tueste
        </AccordionTrigger>
        <AccordionContent>
          <FilterGroup
            title="Nivel de tueste"
            filterKey="roastLevel"
            options={ROAST_LEVELS.map((value) => ({ value, label: value }))}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="method">
        <AccordionTrigger className="font-serif text-sm">
          Método
        </AccordionTrigger>
        <AccordionContent>
          <FilterGroup
            title="Método"
            filterKey="method"
            options={BREW_METHODS.map((value) => ({ value, label: value }))}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="process">
        <AccordionTrigger className="font-serif text-sm">
          Proceso
        </AccordionTrigger>
        <AccordionContent>
          <FilterGroup
            title="Proceso"
            filterKey="process"
            options={PROCESSES.map((value) => ({ value, label: value }))}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="price">
        <AccordionTrigger className="font-serif text-sm">
          Precio
        </AccordionTrigger>
        <AccordionContent>
          <PriceRangeFilter key={`${priceMin ?? "min"}-${priceMax ?? "max"}`} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function useActiveFilterCount() {
  const activeFilters = useFilterStore((state) => state.activeFilters);
  const arrayCount =
    (activeFilters.category?.length ?? 0) +
    (activeFilters.roastLevel?.length ?? 0) +
    (activeFilters.method?.length ?? 0) +
    (activeFilters.process?.length ?? 0);
  const hasPriceFilter =
    activeFilters.priceMin !== undefined ||
    activeFilters.priceMax !== undefined;

  return arrayCount + (hasPriceFilter ? 1 : 0);
}

export function FilterSidebar() {
  const resetFilters = useFilterStore((state) => state.resetFilters);
  const activeCount = useActiveFilterCount();

  return (
    <>
      <aside className="hidden lg:block">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg tracking-tight">Filtros</h2>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Limpiar
            </button>
          )}
        </div>
        <div className="mt-5">
          <FilterSections />
        </div>
      </aside>

      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger
            className={buttonVariants({
              variant: "outline",
              className: "gap-2",
            })}
          >
            <SlidersHorizontal className="size-4" />
            Filtros
            {activeCount > 0 && (
              <Badge variant="secondary" className="ms-0.5">
                {activeCount}
              </Badge>
            )}
          </SheetTrigger>
          <SheetContent
            side="left"
            className="flex w-full flex-col sm:max-w-xs"
          >
            <SheetHeader className="border-b border-border px-4 pt-4 pb-3">
              <SheetTitle>Filtros</SheetTitle>
              <SheetDescription className="sr-only">
                Filtra el catálogo de SierraMar
              </SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto px-4 py-5">
              <FilterSections />
            </div>
            <SheetFooter className="flex-row gap-3 border-t border-border px-4 py-4">
              {activeCount > 0 && (
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={resetFilters}
                >
                  Limpiar
                </Button>
              )}
              <SheetClose render={<Button className="flex-1" />}>
                Ver resultados
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
