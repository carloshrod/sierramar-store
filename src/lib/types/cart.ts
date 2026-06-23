import type { GrindType } from "@/lib/types/product";

export interface CartItem {
  variantId: number;
  productId: number;
  slug: string;
  name: string;
  image?: string;
  grindType: GrindType;
  weight: number;
  price: number;
  quantity: number;
}
