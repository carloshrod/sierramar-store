import type { MetadataRoute } from "next";
import { APP_URL } from "@/lib/constants";
import { getPosts } from "@/lib/api/posts";

const STATIC_ROUTES = ["", "/store", "/blog", "/historia"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { posts } = await getPosts({}, 1).catch(() => ({ posts: [] }));

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${APP_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${APP_URL}/blog/posts/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
  }));

  return [...staticEntries, ...postEntries];
}
