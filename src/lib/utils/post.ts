import type { Post } from "@/lib/types/post";

/**
 * Heading for the related-products section on a post's detail page, tailored
 * to what the post actually is. Keyed primarily by blog-category slug
 * (admin-editable content, see `seed-posts.js`) rather than by `recipe`
 * presence — both "Recetas" and "Métodos de preparación" posts can carry a
 * `recipe`, so checking that first would always win over the method-specific
 * title. `recipe` is only consulted as a fallback for categories not listed
 * here.
 */
export function getRelatedProductsTitle(post: Post): string {
  switch (post.category?.slug) {
    case "recetas":
      return "Café para esta receta";
    case "metodos-de-preparacion":
      return "El café ideal para este método";
    case "origen-y-productores":
      return "El café de este origen";
    case "cata-y-sabores":
      return "Café para esta cata";
    case "historia-del-cafe":
      return "Pruébalo en tu taza";
    case "sostenibilidad":
      return "El café detrás de esta historia";
    case "tips":
      return "El café que necesitas";
    case "noticias-sierramar":
      return "Ya disponible en la tienda";
    default:
      return post.recipe ? "Café para esta receta" : "Descubre este café";
  }
}
