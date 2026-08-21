import type { Loader } from "astro/loaders";
import { getCmsBase } from "./cms";

/*
 * Custom loader (Content Layer API de Astro) que alimenta la colección
 * `case-studies` desde la API del CMS de Risk (repo aparte, Cloudflare Workers)
 * en vez de leer archivos locales.
 *
 * La API pública del CMS (GET /api/case-studies) devuelve SOLO publicados
 * (draft=false) con la forma del contrato. Este loader mapea esa forma al esquema
 * de la colección y renderiza el cuerpo HTML para que `render()`/<Content />
 * sigan funcionando sin tocar las páginas.
 *
 * La URL base del CMS se resuelve en `getCmsBase()` (ver src/lib/cms.ts):
 * variable CMS_API_URL si existe, dominio de producción en build, localhost en dev.
 * Espeja `cms-blog-loader.ts`.
 */

type ApiCaseStudy = {
  slug: string;
  title: string;
  client: string;
  description: string;
  publishDate: string;
  sector: string | null;
  location: string | null;
  image: string | null;
  logo: string | null;
  gallery: string[];
  body: string;
};

export function cmsCaseStudiesLoader(): Loader {
  return {
    name: "cms-case-studies-loader",
    load: async ({ store, logger, parseData }) => {
      const base = getCmsBase();
      const endpoint = new URL("/api/case-studies", base);

      let studies: ApiCaseStudy[];
      try {
        const res = await fetch(endpoint);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status} ${res.statusText}`);
        }
        studies = (await res.json()) as ApiCaseStudy[];
      } catch (error) {
        // No rompemos el build del sitio si el CMS no está disponible: dejamos los
        // casos vacíos y avisamos con claridad (útil al hacer pruebas locales).
        logger.error(
          `No se pudieron cargar los casos de éxito desde el CMS (${endpoint.href}). ` +
            `¿Está corriendo el CMS? Detalle: ${
              error instanceof Error ? error.message : String(error)
            }`,
        );
        return;
      }

      // Reemplaza el contenido: los casos eliminados en el CMS desaparecen.
      store.clear();

      for (const study of studies) {
        const data = await parseData({
          id: study.slug,
          data: {
            title: study.title,
            client: study.client,
            description: study.description,
            publishDate: study.publishDate,
            image: study.image ?? undefined,
            logo: study.logo ?? undefined,
            sector: study.sector ?? undefined,
            location: study.location ?? undefined,
            gallery: study.gallery ?? [],
            draft: false,
          },
        });

        // El cuerpo llega ya como HTML (editor enriquecido del CMS). Se sirve tal
        // cual; el texto plano se guarda como `body` por consistencia con el blog.
        const html = study.body ?? "";
        const text = html
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim();

        store.set({ id: study.slug, data, body: text, rendered: { html } });
      }

      logger.info(`Casos de éxito cargados desde el CMS: ${studies.length}.`);
    },
  };
}
