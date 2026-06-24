import type { StrapiMedia } from "@/lib/types/strapi";

export interface Author {
  id: number;
  documentId: string;
  name: string;
  bio?: string;
  role?: string;
  avatar?: StrapiMedia;
}
