import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

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
    summary: z.string(),
    // Orden de aparición en el listado /modulos.
    order: z.number().default(0),
    draft: z.boolean().default(false),
    // TODO: añadir campos reales del detalle de módulo (features, capturas, etc.).
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

// Blog (editable a futuro con Keystatic; por ahora archivos locales).
const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// Casos de éxito. Solo clientes confirmados (sección 2 del CLAUDE.md).
const caseStudies = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/case-studies" }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    image: z.string().optional(),
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
