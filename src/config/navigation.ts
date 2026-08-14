import type { FooterNavGroup, NavLink, SocialLink } from "@/types/index";

/**
 * Estructura de navegación tipada. El Header y el Footer la recorren; no se
 * hardcodean enlaces en el marcado (sección 6.1 del CLAUDE.md).
 */

/**
 * Los 7 módulos del producto. FUENTE ÚNICA: el dropdown de "Módulos" del Header y
 * la columna "Módulos" del Footer los recorren desde aquí (no se duplican).
 *
 * TODO (pendiente 1 del CLAUDE.md): los NOMBRES están confirmados por diseño; los
 * SLUGS de las rutas son derivación en kebab-case y siguen SIN confirmar por el
 * cliente. Deben coincidir con los nombres de archivo de la colección `modules`
 * (src/content/modules/*.md). Si cambia un slug, actualizar ambos sitios.
 */
export const moduleLinks: NavLink[] = [
  { label: "Riesgo de crédito", href: "/modulos/riesgo-de-credito" },
  { label: "Otorgamiento de crédito", href: "/modulos/otorgamiento-de-credito" },
  { label: "Riesgo de liquidez", href: "/modulos/riesgo-de-liquidez" },
  { label: "Business Intelligence", href: "/modulos/business-intelligence" },
  { label: "Riesgo de mercado", href: "/modulos/riesgo-de-mercado" },
  { label: "Riesgo operacional", href: "/modulos/riesgo-operacional" },
  { label: "SARLAFT", href: "/modulos/sarlaft" },
];

export const mainNav: NavLink[] = [
  { label: "Inicio", href: "/" },
  {
    label: "Módulos",
    href: "/modulos",
    // Solo abre el menú; no navega (cada módulo se alcanza desde el desplegable).
    menuOnly: true,
    children: moduleLinks,
  },
  { label: "Nosotros", href: "/nosotros" },
  {
    label: "Recursos",
    href: "/recursos",
    children: [
      { label: "Blog", href: "/recursos/blog" },
      { label: "Casos de éxito", href: "/recursos/casos-de-exito" },
    ],
  },
  { label: "Contacto", href: "/contacto" },
];

/**
 * CTA del header ("Solicitar Demo"). Es una acción separada de los enlaces de
 * navegación (así aparece en el diseño del home).
 * TODO: confirmar destino real (¿/contacto o un formulario de demo dedicado?).
 */
export const headerCta: NavLink = {
  label: "Solicitar Demo",
  href: "/contacto",
};

/**
 * Navegación del footer, agrupada en columnas como en el diseño.
 *
 * TODO (pendiente 1 del CLAUDE.md): el diseño ya confirma los NOMBRES de los 7
 * módulos, pero no sus slugs. Hasta tenerlos, los siete apuntan a /modulos —
 * mismo criterio que el carrusel del ecosistema en site.ts. No inventar rutas.
 *
 * TODO: "Guías" no existe en la estructura de páginas del CLAUDE.md (sección 5),
 * y el diseño omite "Casos de éxito", que sí está en la navegación principal.
 * Confirmar cuál de las dos manda.
 */
export const footerNav: FooterNavGroup[] = [
  {
    title: "Módulos",
    links: moduleLinks,
  },
  {
    title: "Empresa",
    links: [
      { label: "Nosotros", href: "/nosotros" },
      { label: "FAQS", href: "/#faqs" },
      { label: "Contacto", href: "/contacto" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Blog", href: "/recursos/blog" },
      { label: "Guías", href: "/recursos" }, // TODO: destino sin definir.
      { label: "Testimonios", href: "/#testimonios" },
    ],
  },
];

/**
 * Enlaces legales de la barra inferior.
 * TODO (pendiente 7 del CLAUDE.md): ninguna de estas páginas existe todavía. La
 * de tratamiento de datos es obligatoria por la Ley 1581 de 2012 al haber
 * formulario de contacto.
 */
export const legalNav: NavLink[] = [
  { label: "Política de privacidad", href: "/politica-de-privacidad" },
  { label: "Política de cookies", href: "/politica-de-cookies" },
  {
    label: "Tratamiento de datos — Ley 1581 de 2012",
    href: "/tratamiento-de-datos",
  },
];

/**
 * Redes sociales del footer. El diseño trae los íconos pero ninguna URL.
 * TODO: confirmar los perfiles. Mientras `href` esté sin definir, el Footer
 * pinta el ícono igual que en el diseño pero sin enlazarlo, para no dejar
 * enlaces muertos.
 */
export const socialNav: SocialLink[] = [
  { label: "LinkedIn", icon: "lucide:linkedin", href: undefined },
  { label: "Instagram", icon: "lucide:instagram", href: undefined },
];
