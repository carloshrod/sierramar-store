import type { Category } from "@/lib/types/category";

export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText?: string | null;
  width: number;
  height: number;
}

export const ROAST_LEVELS = ["Claro", "Medio", "Oscuro"] as const;
export type RoastLevel = (typeof ROAST_LEVELS)[number];

export const BREW_METHODS = ["Espresso", "Filtrado", "Multimétodo"] as const;
export type BrewMethod = (typeof BREW_METHODS)[number];

export const PROCESSES = ["Lavado", "Natural", "Honey"] as const;
export type Process = (typeof PROCESSES)[number];

export const GRIND_TYPES = ["Grano", "Molido"] as const;
export type GrindType = (typeof GRIND_TYPES)[number];

/** Bounds for the catalog price filter, in COP. */
export const PRICE_RANGE = { min: 0, max: 150_000 } as const;

export const SORT_OPTIONS = [
  { value: "recent", label: "Más reciente" },
  { value: "best-selling", label: "Más vendidos" },
  { value: "name-asc", label: "Nombre: A-Z" },
  { value: "name-desc", label: "Nombre: Z-A" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
] as const;
export type SortOption = (typeof SORT_OPTIONS)[number]["value"];
export const DEFAULT_SORT: SortOption = "recent";

export interface ProductVariant {
  id: number;
  documentId: string;
  grindType: GrindType;
  weight: number;
  sku: string;
  price: number;
  compareAtPrice?: number | null;
  stock: number;
  isActive: boolean;
}

export interface Product {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  method: BrewMethod;
  roastLevel: RoastLevel;
  origin?: string;
  altitude?: string;
  process: Process;
  tastingNotes?: string;
  isActive: boolean;
  isFeatured: boolean;
  images: StrapiMedia[];
  category?: Category;
  variants?: ProductVariant[];
  createdAt: string;
  /** Units sold in paid orders — only present on `/products/best-sellers` responses, or on `/products` when sorted with `sortBy=totalSold`. */
  totalSold?: number | null;
}

export interface ProductFilters {
  category?: string[];
  roastLevel?: RoastLevel[];
  method?: BrewMethod[];
  process?: Process[];
  priceMin?: number;
  priceMax?: number;
}
