import type { Metadata } from "next";
import { HistoriaHero } from "@/components/historia/HistoriaHero";
import { StorySection } from "@/components/historia/StorySection";

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
          src: "https://images.unsplash.com/photo-1586095516671-d085ff58cdd4?q=80&w=1260&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
          src: "https://images.unsplash.com/photo-1753837787691-84a06d715d24?q=80&w=1260&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
          src: "https://images.unsplash.com/photo-1708547347608-f30580b9a454?q=80&w=1260&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          alt: "Vista aérea de un atardecer sobre el mar",
        }}
        imagePosition="left"
        tone="dark"
        cta={{ href: "/store", label: "Explorar la tienda" }}
      />
    </>
  );
}
