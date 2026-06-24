import { PostCard } from "@/components/blog/PostCard";
import { ArrowLink } from "@/components/common/ArrowLink";
import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/common/Section";
import type { Post } from "@/lib/types/post";

interface RelatedPostsProps {
  posts: Post[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <Section tone="muted">
      <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">Sigue leyendo</h2>
        <ArrowLink href="/blog" className="shrink-0 text-muted-foreground hover:text-foreground">
          Ver todo el diario
        </ArrowLink>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
        {posts.map((post, index) => (
          <Reveal key={post.documentId} delay={index * 75}>
            <PostCard post={post} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
