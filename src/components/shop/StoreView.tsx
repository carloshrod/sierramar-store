"use client";

import { useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/common/Container";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ProductSort } from "@/components/shop/ProductSort";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/lib/hooks/useProducts";
import { scrollToElement } from "@/lib/utils/scroll";
import { sortProducts } from "@/lib/utils/product";
import { useFilterStore } from "@/store/useFilterStore";
import Image from "next/image";

const PRODUCTS_SECTION_ID = "catalogo";
const SCROLL_OFFSET_PX = 48;

export function StoreView() {
  const activeFilters = useFilterStore((state) => state.activeFilters);
  const sort = useFilterStore((state) => state.sort);
  const {
    data: products,
    isLoading,
    isError,
  } = useProducts(activeFilters, sort);

  const sortedProducts = useMemo(
    () => (products ? sortProducts(products, sort) : products),
    [products, sort],
  );

  const scrollToProducts = () => scrollToElement(PRODUCTS_SECTION_ID, SCROLL_OFFSET_PX);

  return (
    <div className="pb-12 sm:pb-16">
      <div className="relative isolate overflow-hidden bg-foreground">
        <Image
          src="/store-hero.jpg"
          alt="Paquetes de café SierraMar en un estante de la tienda"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-foreground via-foreground/70 to-foreground/20" />
        <Container className="relative flex h-[calc(100vh-80px)] flex-col justify-end py-12 sm:py-16">
          <span className="text-sm font-medium tracking-wide text-background/60 uppercase">
            Catálogo
          </span>
          <h1 className="mt-3 font-serif text-4xl tracking-tight text-background  sm:text-6xl lg:text-8xl">
            Nuestro café
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-background/80">
            Lotes de especialidad tostados en pequeñas cantidades. Filtra por
            origen, tueste o método para encontrar tu próxima taza.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="mt-8 w-fit border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background"
            onClick={scrollToProducts}
          >
            Ver productos
            <ChevronDown />
          </Button>
        </Container>
      </div>

      <Container id={PRODUCTS_SECTION_ID}>
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
          <FilterSidebar />
          <div>
            <div className="flex items-center justify-end pb-6">
              <ProductSort />
            </div>
            <ProductGrid
              products={sortedProducts}
              isLoading={isLoading}
              isError={isError}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
