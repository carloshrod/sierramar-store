import type { Metadata } from "next";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { PostGrid } from "@/components/blog/PostGrid";
import { Section } from "@/components/common/Section";
import { Newsletter } from "@/components/layout/Newsletter";
import { getBlogCategories } from "@/lib/api/blog-categories";
import { getPosts } from "@/lib/api/posts";

export const metadata: Metadata = {
  title: "Diario — SierraMar",
  description:
    "Notas de cata, guías de preparación e historias de origen para quienes quieren conocer el café más allá de la taza.",
};

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 1;

  const [{ posts, pagination }, categories] = await Promise.all([
    getPosts({}, page),
    getBlogCategories().catch(() => []),
  ]);

  return (
    <>
      <BlogHeader categories={categories} />
      <Section>
        <PostGrid posts={posts} />
        <BlogPagination pagination={pagination} basePath="/blog" />
      </Section>
      <Newsletter />
    </>
  );
}
