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
    "Centraliza crédito, liquidez, mercado, operacional, SARLAFT, otorgamiento y Business Intelligence en un solo lugar, con tableros listos para usar y datos siempre actualizados.",
  backgroundImage: "hero",
  primaryCta: { label: "Solicitar Demo", href: "/contacto" },
  secondaryCta: { label: "Explorar módulos", href: "/modulos" },
};

/**
 * Sección "El costo de no saberlo a tiempo" (problema). Copy real tomado de
 * contenido.md. Los íconos son equivalentes lucide de los PNG del diseño.
 */
export const problem = {
  eyebrow: "EL COSTO DE NO SABERLO A TIEMPO",
  title:
    "La información de riesgo vive dispersa. Las decisiones no pueden esperar.",
  intro:
    "Crédito, liquidez, mercado y operacional viven en hojas de Excel separadas, actualizadas por personas distintas, en momentos distintos. Para el comité de riesgo o la junta, armar un solo reporte confiable toma días de trabajo manual — ",
  introAccent: "justo cuando más se necesita rapidez.",
  cards: [
    {
      icon: "lucide:file-text",
      title: "Reportes manuales",
      body: "Consolidar cifras de distintas áreas en un solo informe toma días de trabajo dedicado, en lugar de minutos.",
    },
    {
      icon: "lucide:hourglass",
      title: "Cumplimiento bajo presión",
      body: "Preparar los reportes regulatorios a último momento aumenta el riesgo de errores frente a la Superfinanciera.",
    },
    {
      icon: "lucide:network",
      title: "Datos dispersos",
      body: "Cada área tiene su propio Excel; nadie tiene la foto completa del riesgo de la entidad.",
    },
    {
      icon: "lucide:circle-ellipsis",
      title: "Visibilidad tardía",
      body: "Cuando el riesgo se detecta en el reporte mensual, ya es tarde para actuar sobre él.",
    },
  ],
};

/**
 * Sección "El ecosistema Risk" — carrusel de módulos. Copy y colores de Figma.
 *
 * Descripciones cortas reales de los 7 módulos (contenido.md, basado en la
 * presentación "Solution Riesgos — Junio 2026").
 *
 * TODO:
 * - Los `accent` son PROVISIONALES (de Figma). Tokenizar al confirmar la paleta
 *   de módulos. Ojo contraste: #DDBF00 sobre blanco no cumple WCAG AA.
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
        "Mide la probabilidad de pérdida por incumplimiento: pérdida esperada, análisis de cosechas y gestión de cartera.",
      chartImage: "modules/riesgo-de-credito",
      href: "/modulos/riesgo-de-credito",
    },
    {
      name: "Otorgamiento de crédito",
      accent: "#4F46E5", // TODO Figma
      icon: "lucide:file-check", // TODO Figma
      description:
        "Analiza con IA si una persona natural o jurídica es candidata a un crédito, con scoring automático y RPA.",
      chartImage: "modules/otorgamiento-de-credito",
      href: "/modulos/otorgamiento-de-credito",
    },
    {
      name: "Riesgo de liquidez",
      accent: "#0E7490", // TODO Figma
      icon: "lucide:droplets", // TODO Figma
      description:
        "Mide la capacidad de la entidad para cubrir sus obligaciones frente a terceros, con escenarios de tensión.",
      chartImage: "modules/riesgo-de-liquidez",
      href: "/modulos/riesgo-de-liquidez",
    },
    {
      name: "Business Intelligence",
      accent: "#00970F",
      icon: "lucide:bar-chart-3",
      description:
        "Convierte los datos clave de la organización en indicadores gráficos para la toma de decisiones.",
      chartImage: "modules/business-intelligence",
      href: "/modulos/business-intelligence",
    },
    {
      name: "Riesgo de mercado",
      accent: "#7C3AED", // TODO Figma
      icon: "lucide:trending-up", // TODO Figma
      description:
        "Mide la probabilidad de variación en precio y posición de los activos de la entidad.",
      chartImage: "modules/riesgo-de-mercado",
      href: "/modulos/riesgo-de-mercado",
    },
    {
      name: "Riesgo operacional",
      accent: "#DDBF00",
      icon: "lucide:workflow",
      description:
        "Identifica pérdidas por fallos en procesos internos, errores humanos o eventos externos.",
      chartImage: "modules/riesgo-operacional",
      href: "/modulos/riesgo-operacional",
    },
    {
      name: "SARLAFT",
      accent: "#DC2626", // TODO Figma
      icon: "lucide:shield-check", // TODO Figma
      description:
        "Sistema de prevención de lavado de activos y financiación del terrorismo, con consulta a listas restrictivas.",
      chartImage: "modules/sarlaft",
      href: "/modulos/sarlaft",
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

/**
 * Sección "Lo que dicen nuestros clientes" (testimonios). Copy tomado de Figma.
 * Solo el encabezado vive aquí: los testimonios son contenido que crece y será
 * editable, así que van en la content collection `testimonials` (sección 6.3).
 */
export const testimonialsSection = {
  eyebrow: "TESTIMONIOS",
  title: "Lo que dicen nuestros clientes",
};

/**
 * CTABanner — bloque de conversión antes del footer. Copy real (contenido.md).
 * Son los valores POR DEFECTO: el componente acepta props para montarlo con
 * otro copy en otras páginas sin duplicarlo (sección 6.2).
 *
 * TODO: confirmar el destino del CTA (mismo caso que headerCta).
 */
export const ctaBanner = {
  // El título se parte en dos para forzar el salto después de "a", como en
  // Figma. En móvil el salto se desactiva y el texto fluye solo.
  titleLead: "Lleva toda tu gestión de riesgo a",
  titleTrail: "un solo tablero.",
  description:
    "Agenda una demo y mira cómo el comité de riesgo recibe el reporte en minutos.",
  cta: { label: "Hablar con un experto", href: "/contacto" },
};

/**
 * Página "Nosotros" — hero: título, descripción y fila de estadísticas. Copy y
 * cifras confirmados en contenido.md.
 */
export const aboutHero = {
  title: "Construimos infraestructura de riesgo financiero",
  description:
    "Desde 2014 desarrollamos software especializado para la gestión de riesgos en entidades del sector financiero.",
  stats: [
    { value: "2014", label: "Año de lanzamiento" },
    { value: "7", label: "Módulos interconectados" },
    { value: "+10", label: "Años de experiencia" },
    { value: "100%", label: "Enfoque sector financiero" },
  ],
};

/**
 * Página "Nosotros" — tarjeta de propósito (misión + visión) sobre fondo gris.
 * Copy real (contenido.md): un único párrafo de misión + visión.
 */
export const aboutStatement = {
  text: "Dotar a cada entidad financiera de herramientas precisas para anticipar el riesgo y decidir con datos, no con intuición. Ser la plataforma de referencia en gestión integral de riesgos para las entidades financieras de Colombia y la región.",
};

/**
 * Página "Nosotros" — "Cómo trabajamos": 4 pasos del proceso. El número (01–04)
 * se deriva del orden. Copy real (contenido.md).
 */
export const aboutProcess = {
  eyebrow: "Cómo trabajamos",
  steps: [
    {
      title: "Agenda una reunión",
      description:
        "Conversamos sobre los riesgos y procesos actuales de tu entidad para entender tus necesidades específicas.",
    },
    {
      title: "Levantamiento de info",
      description:
        "Relevamos tus fuentes de datos, estructura de cartera y procesos de reporte existentes.",
    },
    {
      title: "Capacitación",
      description:
        "Formamos a tu equipo de riesgo en el uso de la plataforma y en la interpretación de cada tablero.",
    },
    {
      title: "Implementación",
      description:
        "Configuramos los módulos contratados y ponemos en marcha el flujo de datos en producción.",
    },
  ],
};

/**
 * Página "Nosotros" — "El equipo": encabezado + carrusel de personas.
 *
 * TODO: confirmar que estos son los integrantes reales (los nombres vienen de
 * Figma con casing inconsistente; aquí normalizados). Las fotos son placeholder
 * (stock de Unsplash en Figma): subir las reales a src/assets/images/team/ con el
 * slug indicado en cada `photo`.
 */
export const teamSection = {
  eyebrow: "El equipo",
  // El título va en 2 líneas fijas (salto tras "personas"), como en Figma.
  titleLine1: "Conoce las personas",
  titleLine2: "detrás de",
  titleHighlight: "Risk",
  description:
    "Equipo de Solution Systems, enfocados en soluciones para el sector financiero.",
  members: [
    { name: "Jorge Pérez", role: "Gerente", photo: "team/jorge-perez" },
    { name: "Diego Cabal", role: "Ingeniero", photo: "team/diego-cabal" },
    { name: "Wilmar Aspiazu", role: "Ingeniero", photo: "team/wilmar-aspiazu" },
    { name: "Juan Camilo", role: "Ingeniero", photo: "team/juan-camilo" },
    { name: "Jhon Freddy", role: "Ingeniero", photo: "team/jhon-freddy" },
  ],
};

/**
 * Página "Blog" — encabezado del listado de artículos y guías. Copy real
 * (contenido.md): subtítulo propio del blog.
 */
export const blogHero = {
  titleLine1: "Artículos y guías",
  titleLine2: "de tu interés",
  description:
    "Contenido especializado sobre gestión de riesgos financieros para cooperativas, institutos de financiamiento, bancos y fondos.",
};

/**
 * Página "Casos de éxito" — encabezado del listado. Mismo patrón visual que el
 * blog (título en 2 líneas + descripción centrada).
 *
 * TODO (pendiente 6 del CLAUDE.md): descripción provisional. Confirmar el copy
 * real; no inventar cifras ni resultados de clientes.
 */
export const caseStudiesHero = {
  titleLine1: "Casos de éxito",
  titleLine2: "de nuestros clientes",
  description:
    "Entidades financieras que gestionan su riesgo con Risk Solution. Conoce cómo institutos de financiamiento y cooperativas fortalecen su cumplimiento normativo.",
};

/**
 * Página "Contacto" — encabezado. Solo el título (sin eyebrow): va en un único
 * renglón en desktop (contenedor sin ancho máximo) y se ajusta en móvil.
 */
export const contactHero = {
  title: "Ponte en contacto con nosotros y dinos cómo podemos ayudarte.",
};

/**
 * Footer. Copy tomado de Figma. El CTA reutiliza `headerCta` de navigation.ts:
 * es la misma acción, no se duplica.
 */
export const footer = {
  description:
    "Infraestructura de gestión integral de riesgos financieros para entidades reguladas en Colombia.",
  copyrightHolder: "Solution Systems",
};

/**
 * Datos de contacto confirmados en contenido.md. Correo, teléfono y dirección
 * son la única fuente de verdad; el footer los reutiliza desde aquí (por eso no
 * existe la inconsistencia de correo que había en el mock).
 * TODO: confirmar horario de atención (pendiente 5 del CLAUDE.md).
 */
export const contact: ContactInfo = {
  address: "Calle 22 Nte. #6AN-24",
  phone: "+57 301 813 5745",
  email: "contacto@e-solutionsystems.net",
  hours: undefined, // TODO
};
