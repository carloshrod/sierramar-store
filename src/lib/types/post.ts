import type { Author } from "@/lib/types/author";
import type { BlogCategory } from "@/lib/types/blog-category";
import type { Product } from "@/lib/types/product";
import type { StrapiMedia } from "@/lib/types/strapi";

export const RECIPE_DIFFICULTIES = ["Fácil", "Media", "Difícil"] as const;
export type RecipeDifficulty = (typeof RECIPE_DIFFICULTIES)[number];

export interface Recipe {
  prepTime: number;
  difficulty: RecipeDifficulty;
  ingredients: string[];
  steps: string[];
}

export interface Post {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: StrapiMedia;
  category?: BlogCategory;
  author?: Author;
  readingTime?: number | null;
  recipe?: Recipe | null;
  relatedProducts?: Product[];
  publishedAt: string;
  createdAt: string;
}

export interface PostFilters {
  category?: string[];
}

export const POSTS_PER_PAGE = 9;
