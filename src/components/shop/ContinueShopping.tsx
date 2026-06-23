"use client";

import { RelatedProducts } from "@/components/shop/RelatedProducts";
import { useCartStore } from "@/store/useCartStore";
import type { Product } from "@/lib/types/product";

const CONTINUE_SHOPPING_LIMIT = 4;

export function ContinueShopping({ candidates }: { candidates: Product[] }) {
  const items = useCartStore((state) => state.items);
  const cartProductIds = new Set(items.map((item) => item.productId));

  const products = candidates
    .filter((product) => !cartProductIds.has(product.id))
    .slice(0, CONTINUE_SHOPPING_LIMIT);

  return <RelatedProducts title="Sigue comprando" products={products} />;
}
