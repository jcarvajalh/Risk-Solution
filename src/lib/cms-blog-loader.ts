import type { Loader } from "astro/loaders";
import { getCmsBase } from "./cms";

/*
 * Custom loader (Content Layer API de Astro) que alimenta la colección `blog`
 * desde la API del CMS de Risk (repo aparte, Cloudflare Workers) en vez de leer
 * archivos locales.
 *
 * La API pública del CMS (GET /api/posts) devuelve SOLO publicados y con la forma
 * del contrato (ver arquitectura-cms.md). Este loader mapea esa forma al esquema
 * de la colección y renderiza el cuerpo Markdown para que `render()`/<Content />
 * sigan funcionando sin tocar las páginas.
 *
 * La URL base del CMS se resuelve en `getCmsBase()` (ver src/lib/cms.ts):
 * variable CMS_API_URL si existe, dominio de producción en build, localhost en dev.
 */

type ApiPost = {
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  updatedDate: string | null;
  type: "blog" | "guia";
  author: string;
  image: string | null;
  tags: string[];
  body: string;
};

export function cmsBlogLoader(): Loader {
  return {
    name: "cms-blog-loader",
    load: async ({ store, logger, parseData }) => {
      const base = getCmsBase();
      const endpoint = new URL("/api/posts", base);

      let posts: ApiPost[];
      try {
        const res = await fetch(endpoint);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status} ${res.statusText}`);
        }
        posts = (await res.json()) as ApiPost[];
      } catch (error) {
        // No rompemos el build del sitio si el CMS no está disponible: dejamos el
        // blog vacío y avisamos con claridad (útil al hacer pruebas locales).
        logger.error(
          `No se pudo cargar el blog desde el CMS (${endpoint.href}). ` +
            `¿Está corriendo el CMS? Detalle: ${
              error instanceof Error ? error.message : String(error)
            }`,
        );
        return;
      }

      // Reemplaza el contenido: los posts eliminados en el CMS desaparecen.
      store.clear();

      for (const post of posts) {
        const data = await parseData({
          id: post.slug,
          data: {
            image: post.image ?? undefined,
            publishDate: post.publishDate,
            title: post.title,
            description: post.description,
            type: post.type,
            author: post.author,
            updatedDate: post.updatedDate ?? undefined,
            tags: post.tags ?? [],
            draft: false,
          },
        });

        // El cuerpo llega ya como HTML (editor enriquecido del CMS). Se sirve tal
        // cual; el texto plano se guarda como `body` para el cálculo de tiempo de
        // lectura en la página de detalle.
        const html = post.body ?? "";
        const text = html
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim();

        store.set({ id: post.slug, data, body: text, rendered: { html } });
      }

      logger.info(`Blog cargado desde el CMS: ${posts.length} publicaciones.`);
    },
  };
}
