/**
 * Interfaces y tipos compartidos del proyecto. Todo tipo que no exista se
 * define aquí (nada de `any`, sección 11 del CLAUDE.md).
 */

/** Un enlace de navegación (header/footer). */
export interface NavLink {
  label: string;
  href: string;
  /** Sub-enlaces para ítems con menú desplegable (Módulos, Recursos). */
  children?: NavLink[];
  /** Marca el ítem como CTA (p. ej. Contacto como botón). */
  isCta?: boolean;
  /** Enlace externo: fuerza rel="noopener noreferrer" y target opcional. */
  external?: boolean;
}

/** Columna de enlaces del footer: un título y su lista de enlaces. */
export interface FooterNavGroup {
  title: string;
  links: NavLink[];
}

/** Red social del footer. */
export interface SocialLink {
  label: string;
  /** Nombre del ícono en iconify (colección lucide). */
  icon: string;
  /** Sin URL confirmada el Footer no pinta el ícono: mejor un hueco que un enlace roto. */
  href?: string;
}

/** Metadatos SEO por página. */
export interface SeoMeta {
  title: string;
  description: string;
  /** Ruta absoluta o relativa usada como canónica. */
  canonical?: string;
  /** Imagen Open Graph específica de la página. */
  ogImage?: string;
  /** Evita indexación cuando corresponda (borradores, 404). */
  noindex?: boolean;
}

/** Datos de contacto del sitio. TODO: confirmar valores reales (pendiente 5). */
export interface ContactInfo {
  address?: string;
  phone?: string;
  email?: string;
  hours?: string;
}
