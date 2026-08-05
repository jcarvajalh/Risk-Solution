import type { NavLink } from "@/types/index";

/**
 * Estructura de navegación tipada. El Header y el Footer la recorren; no se
 * hardcodean enlaces en el marcado (sección 6.1 del CLAUDE.md).
 */

export const mainNav: NavLink[] = [
  { label: "Inicio", href: "/" },
  {
    label: "Módulos",
    href: "/modulos",
    // TODO: añadir los 7 módulos como children cuando se confirmen nombres y
    // slugs (pendiente 1 del CLAUDE.md). No inventar.
    children: [],
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
  { label: "Contacto", href: "/contacto", isCta: true },
];

/**
 * Navegación del footer. Se refinará cuando se defina el contenido definitivo;
 * por ahora reutiliza la principal.
 */
export const footerNav: NavLink[] = mainNav;
