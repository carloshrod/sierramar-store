import Link from "next/link";
import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils/index";
import type { BlogCategory } from "@/lib/types/blog-category";

interface BlogHeaderProps {
  categories: BlogCategory[];
  activeCategory?: BlogCategory;
}

const PILL_CLASSES =
  "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors";
const PILL_ACTIVE = "border-foreground bg-foreground text-background";
const PILL_INACTIVE =
  "border-border/60 text-muted-foreground hover:border-foreground hover:text-foreground";

export function BlogHeader({ categories, activeCategory }: BlogHeaderProps) {
  return (
    <div className="border-b border-border/60 bg-secondary/30 py-16 sm:py-20">
      <Container>
        <span className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          Diario
        </span>
        <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
          {activeCategory ? activeCategory.name : "Historias detrás de cada taza"}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {activeCategory?.description ??
            "Notas de cata, guías de preparación e historias de origen para quienes quieren conocer el café más allá de la taza."}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          <Link
            href="/blog"
            className={cn(PILL_CLASSES, !activeCategory ? PILL_ACTIVE : PILL_INACTIVE)}
          >
            Todas
          </Link>
          {categories.map((category) => (
            <Link
              key={category.documentId}
              href={`/blog/categories/${category.slug}`}
              className={cn(
                PILL_CLASSES,
                activeCategory?.documentId === category.documentId
                  ? PILL_ACTIVE
                  : PILL_INACTIVE,
              )}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
