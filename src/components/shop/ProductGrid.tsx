import { ProductCard } from "@/components/shop/ProductCard";
import type { Product } from "@/lib/types/product";

interface ProductGridProps {
  products?: Product[];
  isLoading: boolean;
  isError: boolean;
}

export function ProductGrid({ products, isLoading, isError }: ProductGridProps) {
  if (isError) {
    return (
      <p className="py-20 text-center text-sm text-muted-foreground">
        No pudimos cargar el catálogo. Intenta de nuevo en un momento.
      </p>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="aspect-square animate-pulse rounded-3xl bg-secondary/40"
          />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-20 text-center">
        <p className="font-serif text-xl tracking-tight">Sin resultados</p>
        <p className="text-sm text-muted-foreground">
          Prueba a ajustar o limpiar los filtros.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.documentId} product={product} />
      ))}
    </div>
  );
}
