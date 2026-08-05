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

/**
 * Contenido del hero del home. Copy tomado del diseño de Figma (confirmado).
 * El slug `backgroundImage` apunta a src/assets/images/hero.(png|…).
 * TODO: a futuro el fondo será un video en bucle (VideoRicks: sin autoplay con
 * audio, con poster y carga diferida — sección 10). Por ahora, imagen estática.
 */
export const hero = {
  badge: "GESTIÓN INTEGRAL DE RIESGOS · COLOMBIA",
  // El título se parte en dos: lead (blanco) + accent (azul primary).
  titleLead: "Gestión integral de riesgos ",
  titleAccent: "financieros.",
  description:
    "Centraliza crédito, liquidez, mercado, operacional, SARLAFT, otorgamiento y Business Intelligence en un solo lugar. Con tableros listos para usar y datos siempre actualizados.",
  backgroundImage: "hero",
  primaryCta: { label: "Solicitar Demo", href: "/contacto" },
  secondaryCta: { label: "Explorar módulos", href: "/modulos" },
};

/**
 * Sección "El costo de no saberlo a tiempo" (problema). Copy tomado de Figma.
 * Los íconos son equivalentes lucide de los PNG del diseño.
 * TODO: el body de 3 de las 4 tarjetas es placeholder repetido en Figma
 * ("Consolidar todos los riesgos toma días, no minutos."). Falta el copy real.
 */
export const problem = {
  eyebrow: "EL COSTO DE NO SABERLO A TIEMPO",
  title:
    "La información de riesgo vive dispersa. Las decisiones no pueden esperar.",
  intro:
    "Crédito, liquidez, mercado y operacional viven en hojas de Excel separadas, actualizadas por personas distintas, momentos distintos. Para el comité de riesgo o la junta, armar un solo reporte confiable toma días de trabajo manual — ",
  introAccent: "justo cuando más se necesita rapidez.",
  cards: [
    {
      icon: "lucide:file-text",
      title: "Reportes manuales",
      // TODO: copy placeholder (Figma).
      body: "Consolidar todos los riesgos toma días, no minutos. Consolidar todos los riesgos toma días, no minutos. Consolidar todos los riesgos toma días, no minutos.",
    },
    {
      icon: "lucide:hourglass",
      title: "Cumplimiento bajo presión",
      // TODO: copy placeholder (Figma).
      body: "Consolidar todos los riesgos toma días, no minutos.",
    },
    {
      icon: "lucide:network",
      title: "Datos dispersos",
      body: "Cada área tiene su propio Excel; nadie ve la foto completa.",
    },
    {
      icon: "lucide:circle-ellipsis",
      title: "Visibilidad tardía",
      // TODO: copy placeholder (Figma).
      body: "Consolidar todos los riesgos toma días, no minutos. Consolidar todos los riesgos toma días, no minutos. Consolidar todos los riesgos toma días, no minutos.",
    },
  ],
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
