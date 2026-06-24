import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { RecipeDetails } from "@/components/blog/RecipeDetails";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { Section } from "@/components/common/Section";
import { RelatedProducts } from "@/components/shop/RelatedProducts";
import { Badge } from "@/components/ui/badge";
import { APP_URL } from "@/lib/constants";
import { getPostBySlug, getRelatedPosts } from "@/lib/api/posts";
import { formatDate } from "@/lib/utils/date";
import { getStrapiMediaUrl } from "@/lib/utils/media";
import { getRelatedProductsTitle } from "@/lib/utils/post";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);

  if (!post) {
    return { title: "Artículo no encontrado — SierraMar" };
  }

  const description = post.excerpt ?? post.content.slice(0, 160);
  const image = post.featuredImage
    ? getStrapiMediaUrl(post.featuredImage.url)
    : undefined;

  return {
    title: `${post.title} — SierraMar`,
    description,
    openGraph: {
      title: post.title,
      description,
      images: image ? [image] : undefined,
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author.name] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post).catch(() => []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage ? [getStrapiMediaUrl(post.featuredImage.url)] : undefined,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author?.name ?? "SierraMar",
    },
    mainEntityOfPage: `${APP_URL}/blog/posts/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section className="pt-10 pb-20 sm:pt-14 sm:pb-28">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4 shrink-0 transition-transform duration-200 group-hover:-translate-x-1" />
          Volver al diario
        </Link>

        <div className="mt-6">
          {post.category && <Badge variant="secondary">{post.category.name}</Badge>}
          <h1 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            {post.author && <span>{post.author.name}</span>}
            <span>{formatDate(post.publishedAt)}</span>
            {post.readingTime && <span>{post.readingTime} min de lectura</span>}
          </div>
        </div>

        {post.featuredImage && (
          <div className="relative mt-10 aspect-2/1 overflow-hidden rounded-3xl">
            <Image
              src={getStrapiMediaUrl(post.featuredImage.url)}
              alt={post.featuredImage.alternativeText || post.title}
              fill
              priority
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_240px]">
          <article className="prose prose-neutral max-w-none prose-headings:font-serif prose-headings:tracking-tight">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
              {post.content}
            </ReactMarkdown>
          </article>

          <TableOfContents content={post.content} />
        </div>

        {post.recipe && <RecipeDetails recipe={post.recipe} />}
      </Section>

      {post.relatedProducts && post.relatedProducts.length > 0 && (
        <RelatedProducts
          title={getRelatedProductsTitle(post)}
          products={post.relatedProducts}
        />
      )}

      <RelatedPosts posts={relatedPosts} />
    </>
  );
}
