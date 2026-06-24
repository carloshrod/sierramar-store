import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { PostGrid } from "@/components/blog/PostGrid";
import { Section } from "@/components/common/Section";
import { getBlogCategories, getBlogCategoryBySlug } from "@/lib/api/blog-categories";
import { getPosts } from "@/lib/api/posts";

interface BlogCategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({
  params,
}: BlogCategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getBlogCategoryBySlug(slug).catch(() => null);

  if (!category) {
    return { title: "Categoría no encontrada — SierraMar" };
  }

  return {
    title: `${category.name} — Diario SierraMar`,
    description: category.description,
  };
}

export default async function BlogCategoryPage({
  params,
  searchParams,
}: BlogCategoryPageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 1;

  const category = await getBlogCategoryBySlug(slug);
  if (!category) notFound();

  const [{ posts, pagination }, categories] = await Promise.all([
    getPosts({ category: [slug] }, page),
    getBlogCategories().catch(() => []),
  ]);

  return (
    <>
      <BlogHeader categories={categories} activeCategory={category} />
      <Section>
        <PostGrid posts={posts} />
        <BlogPagination pagination={pagination} basePath={`/blog/categories/${slug}`} />
      </Section>
    </>
  );
}
