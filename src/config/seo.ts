import type { SeoMeta } from "@/types/index";

/**
 * Defaults de metadatos SEO. Cada página sobrescribe title y description con
 * valores propios (sección 8 del CLAUDE.md).
 */

export const SITE_NAME = "Risk Solution";
export const SITE_LOCALE = "es-CO";

/** Se antepone/pospone al title de cada página: "Página | Risk Solution". */
export const TITLE_TEMPLATE = "%s | Risk Solution";

export const defaultSeo: SeoMeta = {
  // TODO: confirmar copy definitivo del title/description del home (≤60 y 140–160
  // caracteres respectivamente). Provisional.
  title: "Risk Solution — Gestión de riesgo SARLAFT",
  description:
    "Risk Solution es el software de gestión de riesgo LA/FT (SARLAFT) para entidades financieras colombianas. Solicita una demostración. TODO: confirmar copy.",
  ogImage: "/og/default.png", // TODO: crear imagen OG por defecto en src/assets/images/og/
};
