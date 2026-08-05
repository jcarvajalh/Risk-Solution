import type { ContactInfo } from "@/types/index";

/**
 * Datos del sitio y de las secciones. Las secciones de página leen de aquí sin
 * recibir props (sección 6.3 del CLAUDE.md). El contenido que crece o es
 * editable (módulos, FAQs, blog, casos, testimonios) va en content collections,
 * NO aquí.
 */

export const site = {
  name: "Risk Solution",
  company: "Solution Systems",
  // TODO: confirmar tagline/descripción oficial.
  tagline: "Gestión de riesgo LA/FT (SARLAFT) para entidades financieras.",
};

/** Clientes reales CONFIRMADOS. No agregar otros sin confirmación (sección 2). */
export const clients = ["InfiHuila", "Infi Caldas", "Infi Manizales"] as const;

/** Datos de contacto. TODO: confirmar valores reales (pendiente 5 del CLAUDE.md). */
export const contact: ContactInfo = {
  address: undefined, // TODO
  phone: undefined, // TODO
  email: undefined, // TODO
  hours: undefined, // TODO
};
