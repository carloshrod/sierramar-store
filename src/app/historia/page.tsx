import type { Metadata } from "next";
import { HistoriaHero } from "@/components/historia/HistoriaHero";
import { StorySection } from "@/components/historia/StorySection";
import { STRAPI_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Nuestra historia — SierraMar",
  description:
    "De la sierra al mar: el recorrido de SierraMar, desde los lotes de altura hasta el tueste en pequeños lotes frente al mar.",
};

export default function HistoriaPage() {
  return (
    <>
      <HistoriaHero />

      <StorySection
        id="el-origen"
        eyebrow="El origen"
        title="Todo empezó en la montaña."
        paragraphs={[
          "SierraMar nace de un mismo gesto: subir a la sierra a buscar el grano y bajar hasta el mar para compartirlo. En ese recorrido aprendimos que el buen café no se improvisa, se cultiva con paciencia, altura y atención al detalle.",
          "Empezamos visitando fincas pequeñas en busca de lotes con carácter propio, cafés que contaran algo del lugar donde crecieron. Esa búsqueda sigue siendo el corazón de todo lo que hacemos.",
        ]}
        image={{
          src: `${STRAPI_URL}/uploads/Proyecto_nuevo_4_lrahav_861e7b8f84.webp`,
          alt: "Cerezas de café maduras entre el follaje verde",
        }}
        imagePosition="left"
      />

      <StorySection
        eyebrow="El proceso"
        title="Tostado con intención, en lotes pequeños."
        paragraphs={[
          "Trabajamos de cerca con los productores que eligen cada lote y tostamos en cantidades pequeñas para cuidar cada curva de tueste. Así el origen del grano se siente en la taza, sin atajos ni excesos.",
          "Cada bolsa lleva la altitud, el proceso y las notas de cata del lote que tienes en las manos, porque creemos que conocer el origen es parte de la experiencia.",
        ]}
        image={{
          src: `${STRAPI_URL}/uploads/photo_1753837787691_84a06d715d24_a9150334ef.jpeg`,
          alt: "Granos de café recién tostados de cerca",
        }}
        imagePosition="right"
        tone="muted"
      />

      <StorySection
        eyebrow="El destino"
        title="De la sierra al mar, hasta tu taza."
        paragraphs={[
          "Tostamos frente al mar, donde el viaje del grano se encuentra con el nuestro. Empacamos cada lote recién tostado y lo enviamos directo a tu puerta para que llegue con la frescura de la montaña intacta.",
          "Esto es apenas el comienzo de SierraMar. Gracias por ser parte de este recorrido, de la sierra al mar, una taza a la vez.",
        ]}
        image={{
          src: `${STRAPI_URL}/uploads/Tayrona_1_8a758fa650.jpg`,
          alt: "Vista aérea de un atardecer sobre el mar",
        }}
        imagePosition="left"
        tone="dark"
        cta={{ href: "/store", label: "Explorar la tienda" }}
      />
    </>
  );
}
