import { strapiPublicFetch } from "@/lib/api/public-client";
import { POSTS_PER_PAGE } from "@/lib/types/post";
import type { Post, PostFilters, Recipe } from "@/lib/types/post";
import type { StrapiPagination } from "@/lib/types/strapi";

const POPULATE_PARAMS =
  "populate[featuredImage]=true" +
  "&populate[category]=true" +
  "&populate[author][populate][avatar]=true" +
  "&populate[recipe][populate][ingredients]=true" +
  "&populate[recipe][populate][steps]=true";

// Only needed on the post detail page — heavier payload (nested product
// images/variants), so list queries (getPosts) skip it.
const RELATED_PRODUCTS_POPULATE =
  "&populate[relatedProducts][populate][images]=true" +
  "&populate[relatedProducts][populate][category]=true" +
  "&populate[relatedProducts][populate][variants]=true";

interface RawRecipeItem {
  text: string;
}

interface RawRecipe {
  prepTime: number;
  difficulty: Recipe["difficulty"];
  ingredients?: RawRecipeItem[];
  steps?: RawRecipeItem[];
}

interface RawPost extends Omit<Post, "recipe"> {
  recipe?: RawRecipe | null;
}

/** Strapi returns the recipe's ingredients/steps as `{ id, text }[]` (repeatable components) — flatten to `string[]` for consumers. */
function mapPost(raw: RawPost): Post {
  if (!raw.recipe) {
    return { ...raw, recipe: null };
  }

  return {
    ...raw,
    recipe: {
      prepTime: raw.recipe.prepTime,
      difficulty: raw.recipe.difficulty,
      ingredients: (raw.recipe.ingredients ?? []).map((item) => item.text),
      steps: (raw.recipe.steps ?? []).map((item) => item.text),
    },
  };
}

function buildPostFiltersQuery(filters: PostFilters = {}): string {
  const params = new URLSearchParams();
  filters.category?.forEach((slug, i) =>
    params.append(`filters[category][slug][$in][${i}]`, slug),
  );
  return params.toString();
}

export interface PostsResult {
  posts: Post[];
  pagination: StrapiPagination;
}

export async function getPosts(
  filters: PostFilters = {},
  page = 1,
): Promise<PostsResult> {
  const query = buildPostFiltersQuery(filters);
  const res = await strapiPublicFetch<RawPost[]>(
    // Sorted by createdAt rather than publishedAt: republishing a post (e.g.
    // backfilling its image) bumps publishedAt to "now" in Strapi, which
    // would otherwise reshuffle the chronological order on every edit.
    `/api/posts?${query}&${POPULATE_PARAMS}&sort=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=${POSTS_PER_PAGE}`,
  );
  return {
    posts: res.data.map(mapPost),
    pagination: res.meta.pagination!,
  };
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const params = new URLSearchParams();
  params.set("filters[slug][$eq]", slug);
  const res = await strapiPublicFetch<RawPost[]>(
    `/api/posts?${params.toString()}&${POPULATE_PARAMS}${RELATED_PRODUCTS_POPULATE}`,
  );
  const post = res.data[0];
  return post ? mapPost(post) : null;
}

/** Most recently created post — used by the home page's JournalTeaser. */
export async function getLatestPost(): Promise<Post | null> {
  const res = await strapiPublicFetch<RawPost[]>(
    `/api/posts?${POPULATE_PARAMS}&sort=createdAt:desc&pagination[limit]=1`,
  );
  const post = res.data[0];
  return post ? mapPost(post) : null;
}

const RELATED_POSTS_LIMIT = 3;

/** Same category first (excluding the post itself); tops up with the most recent posts if there aren't enough. */
export async function getRelatedPosts(
  post: Post,
  limit = RELATED_POSTS_LIMIT,
): Promise<Post[]> {
  const sameCategory = post.category
    ? (await getPosts({ category: [post.category.slug] })).posts.filter(
        (candidate) => candidate.documentId !== post.documentId,
      )
    : [];

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const { posts: recent } = await getPosts({}, 1);
  const seen = new Set([post.documentId, ...sameCategory.map((candidate) => candidate.documentId)]);
  const result = [...sameCategory];

  for (const candidate of recent) {
    if (result.length === limit) break;
    if (seen.has(candidate.documentId)) continue;
    seen.add(candidate.documentId);
    result.push(candidate);
  }

  return result;
}
