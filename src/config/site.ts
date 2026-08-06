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

/**
 * Sección "El ecosistema Risk" — carrusel de módulos. Copy y colores de Figma.
 *
 * TODO IMPORTANTE:
 * - Faltan 4 de los 7 módulos (nombre, acento, ícono, descripción, imagen, slug).
 * - Los `accent` son PROVISIONALES (de Figma). Tokenizar al confirmar la paleta
 *   de módulos. Ojo contraste: #DDBF00 sobre blanco no cumple WCAG AA.
 * - Los `href` apuntan a /modulos hasta confirmar los slugs (pendiente 1).
 * - Los íconos son equivalentes lucide de los PNG del diseño.
 * - Las imágenes de gráfico van por slug bajo src/assets/images/modules/.
 */
export const ecosystem = {
  eyebrow: "EL ECOSISTEMA RISK",
  title: "Siete módulos. Una sola plataforma.",
  subtitle:
    "Cada módulo opera de forma independiente, pero todos comparten una misma fuente de datos y un mismo lenguaje visual ejecutivo.",
  cta: { label: "Solicitar Demo", href: "/contacto" },
  modules: [
    {
      name: "Riesgo de crédito",
      accent: "#155EEF",
      icon: "lucide:triangle-alert",
      description:
        "Pérdida esperada, análisis de cosechas, calidad y concentración de cartera.",
      chartImage: "modules/riesgo-de-credito",
      href: "/modulos",
    },
    {
      name: "Business Intelligence",
      accent: "#00970F",
      icon: "lucide:bar-chart-3",
      description:
        "Informe de gestión diario, solvencia, ROE/ROA y flujo de efectivo.",
      chartImage: "modules/business-intelligence",
      href: "/modulos",
    },
    {
      name: "Riesgo operacional",
      accent: "#DDBF00",
      icon: "lucide:workflow",
      // TODO: revisar copy, ¿"matrices de eventos"?
      description: "Mapas de procesos, matrices eventos.",
      chartImage: "modules/riesgo-operacional",
      href: "/modulos",
    },
    // --- Módulos deducidos del copy del hero (nombres confirmados). ---
    // TODO: color, ícono y descripción PROVISIONALES; reemplazar con los de Figma.
    {
      name: "Riesgo de liquidez",
      accent: "#0E7490", // TODO Figma
      icon: "lucide:droplets", // TODO Figma
      description: "Brechas de liquidez, indicadores regulatorios y proyección de flujos de caja.", // TODO copy
      chartImage: "modules/riesgo-de-liquidez",
      href: "/modulos",
    },
    {
      name: "Riesgo de mercado",
      accent: "#7C3AED", // TODO Figma
      icon: "lucide:trending-up", // TODO Figma
      description: "Valor en riesgo (VaR), sensibilidades y exposición por factor de mercado.", // TODO copy
      chartImage: "modules/riesgo-de-mercado",
      href: "/modulos",
    },
    {
      name: "SARLAFT",
      accent: "#DC2626", // TODO Figma
      icon: "lucide:shield-check", // TODO Figma
      description: "Segmentación, señales de alerta y reportes ROS/UIAF.", // TODO copy
      chartImage: "modules/sarlaft",
      href: "/modulos",
    },
    {
      name: "Otorgamiento",
      accent: "#4F46E5", // TODO Figma
      icon: "lucide:file-check", // TODO Figma
      description: "Originación, scoring y decisión de crédito en un solo flujo.", // TODO copy
      chartImage: "modules/otorgamiento",
      href: "/modulos",
    },
  ],
};

/**
 * Sección "Beneficios" (banda azul). Copy de Figma (real, no placeholder).
 * Los `number` (01–04) NO se renderizan: en Figma están en #155EEF, el mismo
 * color del fondo (invisibles). Se conservan por si se decide mostrarlos.
 */
export const benefits = {
  eyebrow: "BENEFICIOS",
  title: "¿Por qué elegir nuestra infraestructura?",
  subtitle: "Construido y diseñado para la decisión ejecutiva.",
  cta: { label: "Solicitar Demo", href: "/contacto" },
  items: [
    {
      number: "01",
      title: "IA integrada",
      description:
        "Scoring automático, RPA para extracción web y análisis predictivo dentro del flujo de otorgamiento.",
    },
    {
      number: "02",
      title: "Cumplimiento normativo",
      description:
        "Normativa colombiana embebida en cada módulo: Ley 358, 617, 819, SARLAFT y exigencias de la Superfinanciera.",
    },
    {
      number: "03",
      title: "Visualización ejecutiva",
      description:
        "Dashboards listos para presentar al comité de riesgo y a la junta directiva, sin preparación adicional.",
    },
    {
      number: "04",
      title: "Integración RPA",
      description:
        "Automatización de procesos y extracción de datos de fuentes externas, sin digitación manual.",
    },
  ],
};

/** Clientes reales CONFIRMADOS. No agregar otros sin confirmación (sección 2). */
export const clients = ["InfiHuila", "Infi Caldas", "Infi Manizales"] as const;

/**
 * Sección "Entidades que confían en Risk" (logos de clientes).
 * Los logos van por slug bajo src/assets/images/clients/ (placeholder por ahora).
 * NOTA: "CONFIAN" va sin tilde como en Figma; lo correcto sería "CONFÍAN".
 */
export const clientsSection = {
  eyebrow: "ENTIDADES QUE CONFÍAN EN RISK",
  logos: [
    { name: "Infi Caldas", slug: "clients/infi-caldas", width: 168, height: 125 },
    { name: "InfiHuila", slug: "clients/infihuila", width: 197, height: 115 },
    {
      name: "Infi Manizales",
      slug: "clients/infi-manizales",
      width: 146,
      height: 142,
    },
  ],
};

/** Datos de contacto. TODO: confirmar valores reales (pendiente 5 del CLAUDE.md). */
export const contact: ContactInfo = {
  address: undefined, // TODO
  phone: undefined, // TODO
  email: undefined, // TODO
  hours: undefined, // TODO
};
