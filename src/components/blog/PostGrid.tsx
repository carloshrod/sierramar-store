import { PostCard } from "@/components/blog/PostCard";
import type { Post } from "@/lib/types/post";

interface PostGridProps {
  posts: Post[];
}

export function PostGrid({ posts }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-20 text-center">
        <p className="font-serif text-xl tracking-tight">Sin publicaciones</p>
        <p className="text-sm text-muted-foreground">
          Pronto encontrarás aquí nuevas historias sobre café.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.documentId} post={post} />
      ))}
    </div>
  );
}
