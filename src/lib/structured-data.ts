/**
 * Generadores de JSON-LD (schema.org) para SEO/AEO/GEO (sección 8 del CLAUDE.md).
 *
 * Cada helper devuelve un objeto serializable que la página inyecta en un
 * <script type="application/ld+json">. No incluye datos de negocio hardcodeados:
 * todo llega por parámetros para no inventar información no confirmada.
 *
 * TODO: completar con datos reales (razón social, dirección, teléfono, redes)
 * cuando estén confirmados (pendientes 5 del CLAUDE.md).
 */

type JsonLd = Record<string, unknown>;

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbList(items: BreadcrumbItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

interface FaqItem {
  question: string;
  answer: string;
}

export function faqPage(items: FaqItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
