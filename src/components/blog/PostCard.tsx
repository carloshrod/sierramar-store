import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils/date";
import { getStrapiMediaUrl } from "@/lib/utils/media";
import type { Post } from "@/lib/types/post";

const IMAGE_SIZES = "(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw";

export function PostCard({ post }: { post: Post }) {
  const href = `/blog/posts/${post.slug}`;

  return (
    <div className="group flex h-full flex-col">
      <Link
        href={href}
        className="block overflow-hidden rounded-3xl bg-secondary/30 ring-1 ring-border/60"
      >
        <div className="relative aspect-4/3">
          {post.featuredImage ? (
            <Image
              src={getStrapiMediaUrl(post.featuredImage.url)}
              alt={post.featuredImage.alternativeText || post.title}
              fill
              sizes={IMAGE_SIZES}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="size-full bg-foreground/5" />
          )}
          {post.category && (
            <Badge
              variant="secondary"
              className="absolute top-4 left-4 bg-background/85 text-foreground"
            >
              {post.category.name}
            </Badge>
          )}
          {post.recipe && (
            <Badge
              variant="secondary"
              className="absolute top-4 right-4 bg-background/85 text-foreground"
            >
              Receta · {post.recipe.prepTime} min
            </Badge>
          )}
        </div>
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        <Link href={href}>
          <h3 className="font-serif text-lg tracking-tight">{post.title}</h3>
        </Link>
        {post.excerpt && (
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-4 text-xs text-muted-foreground">
          {post.author && <span>{post.author.name}</span>}
          <span>{formatDate(post.publishedAt)}</span>
          {post.readingTime && (
            <span className="inline-flex items-center gap-1">
              <BookOpen className="size-3.5" />
              {post.readingTime} min
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
