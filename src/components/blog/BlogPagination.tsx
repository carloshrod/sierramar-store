import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { StrapiPagination } from "@/lib/types/strapi";

interface BlogPaginationProps {
  pagination: StrapiPagination;
  basePath: string;
}

export function BlogPagination({ pagination, basePath }: BlogPaginationProps) {
  const { page, pageCount } = pagination;
  if (pageCount <= 1) return null;

  return (
    <div className="mt-12 flex items-center justify-center gap-3">
      <Button
        variant="outline"
        size="sm"
        disabled={page <= 1}
        nativeButton={false}
        render={<Link href={`${basePath}?page=${page - 1}`} />}
      >
        Anteriores
      </Button>
      <span className="text-sm text-muted-foreground">
        Página {page} de {pageCount}
      </span>
      <Button
        variant="outline"
        size="sm"
        disabled={page >= pageCount}
        nativeButton={false}
        render={<Link href={`${basePath}?page=${page + 1}`} />}
      >
        Siguientes
      </Button>
    </div>
  );
}
