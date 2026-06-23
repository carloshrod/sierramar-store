import type { Metadata } from "next";
import { CartView } from "@/components/shop/CartView";
import { ContinueShopping } from "@/components/shop/ContinueShopping";
import { getProducts } from "@/lib/api/products";

export const metadata: Metadata = {
  title: "Carrito — SierraMar",
  description: "Revisa los productos en tu carrito antes de finalizar tu compra.",
};

export default async function CartPage() {
  // Fetches the whole catalog (sorted best-selling first) so ContinueShopping
  // has enough candidates left after excluding whatever's already in the cart.
  // Decorative section: hide it rather than failing the whole page if Strapi is unreachable.
  const candidates = await getProducts({}, "best-selling").catch(() => []);

  return (
    <>
      <CartView />
      <ContinueShopping candidates={candidates} />
    </>
  );
}
