import Image from "next/image";
import { ArrowLink } from "@/components/common/ArrowLink";
import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/common/Section";
import { getLatestPost } from "@/lib/api/posts";
import { getStrapiMediaUrl } from "@/lib/utils/media";
import { STRAPI_URL } from "@/lib/constants";

const FALLBACK_IMAGE = `${STRAPI_URL}/uploads/photo_1587369403245_a10d1784662f_e14244fd71.jpeg`;
const FALLBACK_TITLE = "Historias detrás de cada taza";
const FALLBACK_DESCRIPTION =
  "Notas de cata, guías de preparación e historias de origen para quienes quieren conocer el café más allá de la taza.";

export async function JournalTeaser() {
  // Decorative section: if Strapi is unreachable or there's no post yet,
  // degrade to static copy instead of taking down the home page (see
  // `BestSellers`, which follows the same `.catch()` pattern).
  const post = await getLatestPost().catch((error) => {
    console.error("No se pudo cargar el último post del diario:", error);
    return null;
  });

  const href = post ? `/blog/posts/${post.slug}` : "/blog";
  const image = post?.featuredImage
    ? getStrapiMediaUrl(post.featuredImage.url)
    : FALLBACK_IMAGE;
  const imageAlt =
    post?.featuredImage?.alternativeText ||
    "Notas y café del diario de SierraMar";

  return (
    <Section tone="muted">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal delay={100}>
          <span className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
            Desde el diario
          </span>
          <h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
            {post?.title ?? FALLBACK_TITLE}
          </h2>
          <div className="mt-6 space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>{post?.excerpt ?? FALLBACK_DESCRIPTION}</p>
            <ArrowLink href={href} className="text-foreground">
              Leer el diario
            </ArrowLink>
          </div>
        </Reveal>

        <Reveal className="relative h-72 overflow-hidden rounded-3xl sm:h-80 lg:h-96">
          <Image src={image} alt={imageAlt} fill className="object-cover" />
        </Reveal>
      </div>
    </Section>
  );
}
