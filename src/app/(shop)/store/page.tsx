import type { Metadata } from "next";
import { StoreView } from "@/components/shop/StoreView";

export const metadata: Metadata = {
  title: "Tienda — SierraMar",
  description:
    "Café de especialidad en grano o molido. Filtra por origen, nivel de tueste y método de preparación.",
};

export default function StorePage() {
  return <StoreView />;
}
