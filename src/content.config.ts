import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";
import { cmsBlogLoader } from "./lib/cms-blog-loader";
import { cmsCaseStudiesLoader } from "./lib/cms-case-studies-loader";

/*
 * Esquemas Zod de las content collections (Content Layer API de Astro).
 *
 * IMPORTANTE: los campos son PROVISIONALES. La estructura definitiva de las
 * páginas de módulo (pendiente 4) y el contenido de blog/casos (pendiente 6)
 * están sin confirmar. No se han creado archivos de contenido todavía para no
 * inventar datos. Al confirmar, ajustar estos esquemas.
 */

// Los 7 módulos del producto. TODO: confirmar campos y nombres/slugs (pendiente 1 y 4).
const modules = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/modules" }),
  schema: z.object({
    title: z.string(),
    // Resumen corto para el listado /modulos. Opcional hasta confirmar ese copy.
    summary: z.string().optional(),
    // Párrafo del encabezado (hero) de la página de módulo.
    description: z.string(),
    // Chips/etiquetas del hero (borde punteado).
    highlights: z.array(z.string()).default([]),
    // Vista previa del dashboard del módulo: KPIs + tarjetas de gráfico
    // (los gráficos son imágenes). Opcional: si falta, no se renderiza la sección.
    dashboard: z
      .object({
        kpis: z.array(
          z.object({
            label: z.string(),
            value: z.string(),
            // Color del valor. default → text-ink; primary/danger → tokens.
            tone: z.enum(["default", "primary", "danger"]).default("default"),
          }),
        ),
        charts: z.array(
          z.object({
            title: z.string(),
            // Slug de la imagen del gráfico bajo src/assets/images/ (AppImage).
            image: z.string(),
          }),
        ),
      })
      .optional(),
    // Sección "Beneficios": título + lista de beneficios (el número 01/02/03 se
    // deriva del orden). Opcional: si falta, no se renderiza la sección.
    benefits: z
      .object({
        title: z.string(),
        items: z.array(
          z.object({
            title: z.string(),
            description: z.string(),
          }),
        ),
      })
      .optional(),
    // Orden de aparición en el listado /modulos.
    order: z.number().default(0),
    draft: z.boolean().default(false),
    // TODO: añadir el resto de campos del detalle de módulo (features, capturas, etc.).
  }),
});

// Preguntas frecuentes. `group` indica qué conjunto muestra cada FAQSection.
const faqs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/faqs" }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    group: z.string(),
    order: z.number().default(0),
  }),
});

/*
 * Blog. Esquema pensado como CONTRATO de datos de la tarjeta del listado.
 * La fuente de datos es el CMS a medida (repo aparte, Cloudflare Workers): el
 * loader trae los posts publicados desde su API (GET /api/posts). El esquema NO
 * cambia respecto a los archivos locales; solo cambia la capa de autoría.
 */
const blog = defineCollection({
  loader: cmsBlogLoader(),
  schema: z.object({
    // — Campos que muestra la TARJETA del listado —
    /** Imagen de portada: slug bajo src/assets/images/ (p. ej. "blog/articulo-1"). */
    image: z.string().optional(),
    /** Fecha de publicación (se muestra como "Julio 14 2026"). */
    publishDate: z.coerce.date(),
    /** Título de la tarjeta. */
    title: z.string(),
    /** Meta descripción CORTA (resumen/excerpt que se ve en la tarjeta). */
    description: z.string(),
    /** Tipo, para el filtro Todo/Blog/Guías. */
    type: z.enum(["blog", "guia"]).default("blog"),

    // — Campos adicionales (detalle del artículo / administración) —
    author: z.string(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// Casos de éxito. La fuente de datos es el CMS a medida (mismo que el blog): el
// loader trae los casos publicados desde su API (GET /api/case-studies). El
// cuerpo llega como HTML (editor enriquecido) y las imágenes como URL absolutas
// que sirve el CMS desde R2 (AppImage detecta y renderiza URLs remotas).
const caseStudies = defineCollection({
  loader: cmsCaseStudiesLoader(),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    /** Resumen para la tarjeta y el encabezado del detalle. */
    description: z.string(),
    publishDate: z.coerce.date(),
    /** Portada de la tarjeta del listado (URL absoluta del CMS o slug local). */
    image: z.string().optional(),
    /** Logo de la entidad (URL absoluta del CMS o slug local). */
    logo: z.string().optional(),
    /** Sector de la entidad (metadato del encabezado). */
    sector: z.string().optional(),
    /** Ubicación de la entidad (metadato del encabezado). */
    location: z.string().optional(),
    /** Imágenes del detalle tipo revista (URLs absolutas del CMS o slugs locales). */
    gallery: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// Testimonios.
const testimonials = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/testimonials" }),
  schema: z.object({
    author: z.string(),
    role: z.string(),
    company: z.string(),
    quote: z.string(),
    /** Slug del logo de la entidad bajo src/assets/images/ (p. ej. "clients/infi-manizales"). */
    logo: z.string().optional(),
    /**
     * Alto del logo en px medido a 1440px (Figma). Cada entidad tiene su propia
     * proporción, así que el alto se define por testimonio; el ancho sale solo.
     */
    logoHeight: z.number().default(77),
    /** Slug de la foto del autor bajo src/assets/images/ (p. ej. "team/ricardo-calderon"). */
    avatar: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = {
  modules,
  faqs,
  blog,
  "case-studies": caseStudies,
  testimonials,
};
