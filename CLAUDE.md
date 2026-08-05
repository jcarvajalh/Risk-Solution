# CLAUDE.md — Sitio Web Risk Solution

> Documento pilar del proyecto. Se carga automáticamente al inicio de cada sesión
> de Claude Code. Establece contexto, stack, arquitectura y reglas obligatorias.
> Todo desarrollo debe respetar estas directrices salvo indicación explícita mía
> en contrario.

---

## 0. Regla de comunicación

**Comunícate siempre en español.** Explicaciones, comentarios de código, mensajes
de commit y preguntas: todo en español. El código (nombres de variables,
funciones, componentes, clases CSS) va en inglés, siguiendo la convención del
ecosistema.

---

## 1. Rol y comportamiento esperado

Actúas como desarrollador frontend senior especializado en sitios corporativos de
alto rendimiento para el sector financiero.

Antes de escribir código:

- Si una tarea es ambigua, **pregúntame en lugar de asumir**.
- Propón la solución antes de implementar cambios estructurales o instalar
  dependencias nuevas.
- No introduzcas librerías pesadas sin justificarlo. Prioriza lo nativo.
- **No inventes datos, métricas, nombres de clientes ni cifras.** Si un contenido
  no está confirmado, deja un `TODO:` explícito y pregúntame.
- Si detectas una inconsistencia en lo que te pido (dato contradictorio, error
  gramatical en el copy, valor que no cuadra con Figma), **señálamela** antes de
  seguir.
- Cada archivo que generes debe cumplir TODAS las reglas de arquitectura,
  seguridad y accesibilidad de este documento.

---

## 2. Contexto del proyecto

**Risk Solution** es el producto SaaS de gestión de riesgo financiero de Solution
Systems, dirigido a entidades financieras colombianas: cooperativas, bancos,
institutos de fomento y fondos de inversión.

Este repositorio es el **sitio web institucional y comercial** del producto —no la
plataforma operativa interna—. Su objetivo es posicionamiento, generación de leads
y soporte a la fuerza comercial.

**Dominio y terminología:** SARLAFT, riesgo LA/FT, normatividad, Superintendencia
Financiera de Colombia, matriz de riesgo, segmentación, señales de alerta,
reportes ROS/UIAF.

**Clientes reales confirmados:** InfiHuila, Infi Caldas, Infi Manizales.
No agregues otros sin que yo los confirme.

### Relación con el sitio corporativo

Existe un proyecto hermano —el sitio corporativo de Solution Systems— con el que
este comparte **stack, sistema de diseño, tipografía y paleta**. La **estructura de
páginas y el contenido son distintos**.

Son repositorios separados. **No mezcles contenido, componentes ni datos entre
ambos.** Si necesitas una referencia del corporativo, pídemela; no la asumas.

---

## 3. Stack tecnológico

Estas dependencias **ya están instaladas**. No las reinstales ni cambies versiones
sin consultarme.

| Capa | Tecnología |
|---|---|
| Runtime | Node.js ≥ 22.12.0 |
| Framework | Astro 7 (`type: module`) |
| Islas interactivas | React 19 vía `@astrojs/react` |
| Estilos | Tailwind CSS v4 (`@tailwindcss/vite`, enfoque CSS-first con `@theme`) + CSS plano |
| Tipado | TypeScript 6 (`strict`) + `@astrojs/check` |
| Estado compartido entre islas | Nanostores + `@nanostores/react` |
| Iconos | `astro-icon` + `@iconify-json/lucide` |
| Validación de datos | Zod 4 |
| Utilidades de clases | `clsx` + `tailwind-merge` (helper `cn()` en `src/lib/utils.ts`) |
| Imágenes | `astro:assets` + `sharp` |
| SEO | `@astrojs/sitemap` + metadatos propios |
| Tipografía | **Geist** (400 regular, 500 medium, 600 semibold, 700 bold) |
| Calidad | ESLint 10 + `eslint-plugin-astro` + `typescript-eslint`; Prettier + `prettier-plugin-astro` + `prettier-plugin-tailwindcss` |
| Hosting | Cloudflare Pages |
| Formularios | EmailJS + reCAPTCHA (sin backend propio) |
| Analítica | GA4 vía Google Tag Manager |
| Control de versiones | Git / GitHub |

### Scripts disponibles

```
pnpm dev            # servidor de desarrollo
pnpm build          # build de producción
pnpm preview        # previsualizar el build
pnpm typecheck      # astro check
pnpm lint           # eslint .
pnpm format         # prettier --write .
pnpm format:check   # prettier --check .
```

> Gestor de paquetes del proyecto: **pnpm** (no npm).

**Antes de dar por terminada cualquier tarea**, ejecuta `pnpm typecheck` y
`pnpm lint`. No entregues código que no pase ambos.

### CMS — decisión pendiente

Las secciones **Blog** y **Casos de éxito** son administrables por un editor no
técnico (1–2 publicaciones al mes). La opción evaluada es **Keystatic** (basado en
git, integración nativa con Astro, cero infraestructura de servidor).

**No implementes el CMS todavía.** Primero se construyen todas las páginas
estáticas. Mientras tanto, blog y casos de éxito se modelan como *content
collections* de Astro con archivos locales, de modo que la migración a Keystatic
sea un cambio de capa de autoría y no de arquitectura.

---

## 4. Sistema de diseño

### 4.1 Tipografía

**Geist** es la única familia del proyecto. Sin excepciones, sin fuente
monoespaciada, sin fallbacks decorativos.

Pesos disponibles: 400, 500, 600, 700. Se sirven **localmente** desde
`public/fonts/geist/` en formato `.woff2`, con `font-display: swap` y `preload`
del peso 400 y 500 en `BaseLayout.astro`. No cargues Geist desde Google Fonts ni
desde ningún CDN externo (rompe la CSP y añade una petición de terceros).

### 4.2 Paleta

Colores **confirmados** por mí. Son la única fuente de verdad para estos cuatro
valores:

| Token | Hex | Uso |
|---|---|---|
| `--color-primary` | `#155EEF` | Color principal: CTAs, enlaces, acentos, estados activos |
| `--color-bg` | `#F7F7F7` | Fondo de página |
| `--color-surface` | `#FFFFFF` | Fondo de tarjetas, paneles y componentes elevados |
| `--color-ink` | `#000000` | Texto principal |

**Valores derivados — PROVISIONALES.** La paleta confirmada no cubre estados ni
jerarquías secundarias. Los siguientes son cálculos míos, marcados como
placeholders: **extráelos de Figma en cuanto tengas acceso al archivo y
reemplázalos**. No los des por definitivos ni los propagues a documentación.

```css
--color-primary-hover:  #1250CB;  /* TODO: confirmar en Figma */
--color-primary-active: #0E40A2;  /* TODO: confirmar en Figma */
--color-primary-subtle: #E8F0FE;  /* TODO: confirmar en Figma — fondos suaves, badges */
--color-ink-secondary:  #4B4B4B;  /* TODO: confirmar en Figma — texto de apoyo */
--color-ink-muted:      #6B6B6B;  /* TODO: confirmar en Figma — metadatos, captions */
--color-border:         #E5E5E5;  /* TODO: confirmar en Figma */
```

Si Figma define además colores semánticos (éxito, error, advertencia) para
formularios y estados, pídemelos antes de inventarlos.

**Regla dura: ningún color hardcodeado en componentes.** Todo pasa por token. Si
encuentras un hex suelto en un archivo `.astro`, `.tsx` o `.css` que no sea la
definición del token, es un bug: reemplázalo.

**Contraste verificado:** `#155EEF` sobre `#FFFFFF` da 5.42:1 y sobre `#F7F7F7`
da 4.93:1 — ambos cumplen WCAG AA para texto normal. Blanco sobre `#155EEF` da
5.42:1, también AA. Si en algún momento se propone aclarar el azul, hay que
recalcular el contraste antes de aprobarlo.

### 4.3 Reparto Tailwind / CSS plano

Esta separación es obligatoria y no negociable.

**Tailwind CSS** se usa para:
Layout · Grid · Flex · Spacing · Tipografía · Colores · Responsive · Botones ·
Tarjetas · Formularios · Hover · Estados de componente

**CSS tradicional** se usa para:
Variables globales · Animaciones complejas · Keyframes · Pseudo-elementos
complejos · Efectos visuales · Gradientes avanzados · Casos especiales

En la práctica: si es maquetación o estilo de componente, va en clases de
Tailwind en el marcado. Si es una animación con varios pasos, un `::before`
posicionado, un gradiente cónico o un efecto que Tailwind expresaría de forma
ilegible, va a una clase CSS en `src/styles/` con prefijo `rs-`
(`rs-rails`, `rs-glow`, etc.).

### 4.4 Tokens en Tailwind v4

Los tokens viven en `src/styles/theme.css` con el bloque `@theme`, que es la
fuente única: Tailwind genera las utilidades a partir de ahí y el CSS plano
consume las mismas variables.

```css
@import "tailwindcss";

@theme {
  --font-sans: "Geist", system-ui, sans-serif;

  --color-primary: #155EEF;
  --color-bg: #F7F7F7;
  --color-surface: #FFFFFF;
  --color-ink: #000000;
  /* … resto de tokens */
}
```

Nunca declares un valor de diseño dos veces. Si un token existe en `@theme`, el
CSS plano lo usa con `var(--token)`.

---

## 5. Arquitectura de carpetas

Espejo de la del sitio corporativo, adaptada a las páginas de Risk Solution.
**Respétala.** Si necesitas una carpeta nueva, propónmela antes de crearla.

```
risk-solution/
├── public/
│   ├── _headers                    # cabeceras de seguridad (Cloudflare Pages)
│   ├── robots.txt
│   ├── favicon.svg
│   └── fonts/geist/                # .woff2 400/500/600/700
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── clients/            # logos de entidades
│   │   │   ├── modules/            # capturas e ilustraciones por módulo
│   │   │   ├── team/
│   │   │   ├── blog/
│   │   │   └── og/                 # imágenes Open Graph
│   │   └── video/                  # VideoRicks
│   │
│   ├── components/
│   │   ├── islands/                # componentes React interactivos
│   │   ├── layout/                 # Header, Footer, Container
│   │   ├── sections/               # secciones de página reutilizables
│   │   ├── modules/                # bloques propios de las páginas de módulo
│   │   └── ui/                     # primitivos: Button, Card, Badge, Input…
│   │
│   ├── config/
│   │   ├── site.ts                 # datos del sitio y de las secciones
│   │   ├── navigation.ts           # estructura del header y footer
│   │   └── seo.ts                  # defaults de metadatos
│   │
│   ├── content.config.ts           # esquemas Zod de las colecciones (Astro 6+ lo exige en la raíz de src/)
│   ├── content/
│   │   ├── modules/                # 7 módulos
│   │   ├── faqs/
│   │   ├── blog/
│   │   ├── case-studies/           # casos de éxito
│   │   └── testimonials/
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── ModuleLayout.astro      # plantilla común de las 7 páginas de módulo
│   │   └── ArticleLayout.astro     # blog y casos de éxito
│   │
│   ├── lib/
│   │   ├── utils.ts                # cn() y helpers
│   │   ├── schemas.ts              # validación de formularios (Zod)
│   │   └── structured-data.ts      # generadores de JSON-LD
│   │
│   ├── pages/
│   │   ├── index.astro                        # Inicio
│   │   ├── modulos/
│   │   │   ├── index.astro                    # listado de los 7 módulos
│   │   │   └── [slug].astro                   # página de detalle por módulo
│   │   ├── nosotros.astro
│   │   ├── recursos/
│   │   │   ├── index.astro                    # hub de recursos
│   │   │   ├── blog/
│   │   │   │   ├── index.astro
│   │   │   │   └── [slug].astro
│   │   │   └── casos-de-exito/
│   │   │       ├── index.astro
│   │   │       └── [slug].astro
│   │   ├── contacto.astro
│   │   └── 404.astro
│   │
│   ├── stores/                     # nanostores compartidos entre islas
│   ├── styles/
│   │   ├── global.css              # reset, base, importa el resto
│   │   ├── theme.css               # bloque @theme (tokens)
│   │   ├── fonts.css               # @font-face de Geist
│   │   └── animations.css          # keyframes y efectos
│   └── types/
│       └── index.ts                # interfaces compartidas
│
├── CLAUDE.md
├── astro.config.mjs
├── tsconfig.json
├── eslint.config.js
└── package.json
```

### Alias de rutas

Configurados en `tsconfig.json`. Úsalos siempre; **nada de `../../..`**.

```
@/*          → src/*
@components  → src/components
@layouts     → src/layouts
@config      → src/config
@lib         → src/lib
@styles      → src/styles
@assets      → src/assets
```

> Nota: el alias `@types` no se puede usar. TypeScript reserva el prefijo
> `@types/` para paquetes de DefinitelyTyped y lanza `ts(6137)`. Para tipos
> compartidos, importa desde `@/types/index` (usando el alias `@/*`).

---

## 6. Estructura del sitio

### 6.1 Navegación principal (header)

| Ítem | Ruta | Notas |
|---|---|---|
| Inicio | `/` | |
| Módulos | `/modulos` | Menú desplegable con los 7 módulos |
| Nosotros | `/nosotros` | |
| Recursos | `/recursos` | Menú desplegable: Blog, Casos de éxito |
| Contacto | `/contacto` | Puede ir como botón CTA en vez de enlace plano |

Los **7 módulos** tienen cada uno su propia página bajo `/modulos/[slug]`,
generadas desde la colección `modules` con `getStaticPaths()`. Todas comparten
`ModuleLayout.astro`: misma estructura, distinto contenido.

⚠️ Los nombres y slugs de los 7 módulos aún no están confirmados en este
documento. **Pídemelos antes de crear los archivos de contenido.** No los inventes.

La navegación se define en `src/config/navigation.ts` como estructura de datos
tipada; el `Header` la recorre. No hardcodees enlaces en el marcado.

### 6.2 Componentes reciclados

Estos cuatro se construyen **una sola vez** y se reutilizan en todo el sitio. Si
te encuentras duplicando alguno, algo está mal:

| Componente | Ubicación | Notas |
|---|---|---|
| `Header` | `components/layout/Header.astro` | Con dropdowns de Módulos y Recursos; menú móvil como isla React |
| `Footer` | `components/layout/Footer.astro` | Navegación completa, datos de contacto, legales |
| `FAQSection` | `components/sections/FAQSection.astro` | Acordeón; recibe qué conjunto de preguntas mostrar |
| `CTABanner` | `components/sections/CTABanner.astro` | Bloque de conversión antes del footer |

`FAQSection` y `CTABanner` aparecen en varias páginas con contenido distinto. Su
variabilidad se resuelve con **props o con una clave que apunte a la colección**,
nunca duplicando el componente.

### 6.3 Patrón de datos

Heredado del sitio corporativo, mantenerlo:

- Las secciones de página **no reciben props desde la página**. Se montan sin
  argumentos y leen sus datos de `src/config/site.ts`.
- Los tipos e interfaces van en `src/types/index.ts`.
- El contenido que se repite, crece o será editable (módulos, FAQs, testimonios,
  blog, casos de éxito) va a **content collections** con esquema Zod en
  `src/content.config.ts`, no a `site.ts`.
- Excepción razonable: componentes reutilizables como `FAQSection` y `CTABanner`
  sí reciben props, porque su contenido cambia según dónde se monten.

### 6.4 Islas React

Astro renderiza estático por defecto. React se usa **solo** donde hay
interactividad real. Cada isla debe justificar su existencia.

Directivas: `client:visible` por defecto; `client:idle` si es interacción
inmediata; `client:load` solo si es imprescindible en el primer pintado.

Candidatas legítimas: menú móvil, formulario de contacto, filtros del blog,
carrusel de testimonios, cualquier demo interactiva de producto.

**No** son candidatas: acordeones simples (usa `<details>`), tabs sin estado
compartido, hovers, animaciones de entrada.

---

## 7. Seguridad

Requisito del proyecto desde el primer commit, no un añadido posterior.

### 7.1 Cabeceras — `public/_headers`

Cloudflare Pages sirve las cabeceras desde este archivo. **Debe existir.** Sin él,
ninguna política aplica en producción.

```
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' https://www.googletagmanager.com https://www.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://www.google-analytics.com; font-src 'self'; connect-src 'self' https://api.emailjs.com https://www.google-analytics.com; frame-src https://www.google.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=()
  Cross-Origin-Opener-Policy: same-origin
```

Ajusta la CSP si se suma un dominio de terceros, pero **jamás la relajes con
`unsafe-eval` ni comodines**. Si algo requiere eso, avísame y buscamos otra vía.

### 7.2 Formularios

- Validación en cliente **y** esquema Zod en `src/lib/schemas.ts`.
- reCAPTCHA obligatorio antes de disparar el envío por EmailJS.
- Honeypot como capa adicional anti-bots.
- Sanitiza toda entrada antes de renderizarla. **Nunca uses `set:html` con datos
  de usuario.**
- Las claves de EmailJS y reCAPTCHA van en variables de entorno
  (`PUBLIC_*` solo las que deben ser públicas). **Nada de secretos en el repo.**

### 7.3 General

- Todo enlace externo: `rel="noopener noreferrer"`.
- Sin dependencias innecesarias; cada una es superficie de ataque.
- No expongas versiones, rutas internas ni mensajes de error detallados.

---

## 8. SEO / AEO / GEO

El sitio tiene que rendir en buscadores tradicionales **y** en motores de
respuesta con IA. Toda página necesita:

- `<title>` único, ≤ 60 caracteres, con el término relevante al inicio.
- `meta description` única, 140–160 caracteres, con llamada a la acción.
- Open Graph y Twitter Card completos, con imagen propia por página cuando aplique.
- URL canónica.
- Un solo `<h1>`, jerarquía de encabezados sin saltos.
- Español de Colombia (`lang="es-CO"`).

**JSON-LD** vía `src/lib/structured-data.ts`:

- `Organization` + `SoftwareApplication` en el home.
- `Product` o `Service` en cada página de módulo.
- `FAQPage` donde haya `FAQSection`.
- `BreadcrumbList` en módulos, blog y casos de éxito.
- `Article` en entradas de blog; `Article` o `CaseStudy` en casos de éxito.

**Optimización para respuestas de IA (AEO/GEO):**

- Redacta en frases afirmativas, autocontenidas y extraíbles. Un dato por frase.
- Usa cifras verificables, no adjetivos vacíos. *"+25 años de experiencia"*, no
  *"amplia trayectoria"*.
- Define los términos del dominio en el propio texto (SARLAFT, LA/FT), porque los
  motores de respuesta citan definiciones claras.
- Incluye preguntas reales como encabezados donde tenga sentido.
- El copy es breve. Sin párrafos-muralla ni testimonios largos.

Ojo: `@astrojs/sitemap` genera el sitemap en el build; verifica que las rutas
dinámicas de los 7 módulos y del blog queden incluidas.

---

## 9. Accesibilidad — WCAG 2.1 AA

No es opcional. El público son entidades financieras con requisitos formales.

- HTML semántico: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`.
- Todo elemento interactivo alcanzable y operable por teclado, con foco visible
  (no elimines el outline sin sustituirlo por algo con contraste suficiente).
- Contraste mínimo 4.5:1 en texto normal, 3:1 en texto grande y en bordes de
  controles.
- `alt` descriptivo en toda imagen informativa; `alt=""` en las decorativas.
- Formularios con `<label>` asociado; errores anunciados con `aria-live`.
- Dropdowns del header operables con teclado y con `aria-expanded` correcto.
- Respeta `prefers-reduced-motion` en todas las animaciones.
- Skip link al contenido principal.

---

## 10. Rendimiento

Objetivos en producción:

| Métrica | Objetivo |
|---|---|
| Lighthouse Performance | ≥ 95 |
| LCP | < 2.0 s |
| CLS | < 0.05 |
| INP | < 200 ms |
| JS enviado al cliente en páginas estáticas | ~0 KB |

Reglas:

- Imágenes siempre con `astro:assets` (`<Image />` / `<Picture />`), formato
  moderno, `width` y `height` explícitos, `loading="lazy"` salvo el LCP.
- El video (VideoRicks) nunca en `autoplay` con audio, con `poster` y carga
  diferida.
- GTM se carga de forma diferida, después de la interacción o del `load`.
- Fuentes locales, preload solo de los pesos usados en el primer pintado.
- Nada de librerías de animación pesadas: CSS y la Web Animations API alcanzan.

---

## 11. Convenciones de código

- **Componentes**: `PascalCase.astro` / `PascalCase.tsx`.
- **Utilidades y config**: `camelCase.ts`.
- **Clases CSS propias**: `kebab-case` con prefijo `rs-`.
- **Rutas y slugs**: `kebab-case` en español (`/casos-de-exito`,
  `/modulos/gestion-de-riesgo`).
- TypeScript en modo `strict`. **Nada de `any`**; si no hay tipo, defínelo en
  `src/types/index.ts`.
- Comentarios solo donde el *por qué* no sea obvio. No narres el código.
- Un componente, una responsabilidad. Si pasa de ~150 líneas, probablemente son dos.

### Flujo Figma → código

- **Figma es la fuente de verdad del diseño.** Los valores se extraen del archivo,
  no se estiman a ojo.
- Trabajamos **sección por sección**, con enlaces a frames de componente
  individuales. No proceses una página completa de una vez.
- Si un valor no está en el frame que te paso (padding vertical de sección, color
  exacto de un texto), **pregúntame en lugar de inventarlo**, y si propones un
  valor provisional márcalo explícitamente como asunción.

---

## 12. Estado del proyecto

Actualiza esta sección conforme avancemos.

- [x] Dependencias instaladas
- [x] Estructura de carpetas creada
- [x] Tokens de diseño en `theme.css` (paleta base confirmada; derivados pendientes de Figma)
- [ ] Geist servida localmente (pendiente: añadir los `.woff2` a `public/fonts/geist/`)
- [x] `public/_headers`
- [ ] `BaseLayout.astro` (esqueleto inicial creado; completar con Figma)
- [ ] Header + Footer
- [ ] Home
- [ ] Listado de módulos + `ModuleLayout` + 7 páginas
- [ ] Nosotros
- [ ] Recursos (hub)
- [ ] Blog (estructura; CMS después)
- [ ] Casos de éxito
- [ ] Contacto (formulario + EmailJS + reCAPTCHA)
- [ ] 404
- [ ] Auditoría de accesibilidad y rendimiento
- [ ] Integración de Keystatic
- [ ] Despliegue en Cloudflare Pages

---

## 13. Pendientes por confirmar conmigo

No avances sobre estos puntos sin preguntarme:

1. **Nombres y slugs de los 7 módulos.**
2. **Valores derivados de la paleta** (hover, active, texto secundario, bordes) —
   deben salir de Figma.
3. **Colores semánticos** de estado en formularios, si Figma los define.
4. Estructura y campos de las páginas de módulo (¿todas idénticas?).
5. Datos de contacto reales: dirección, teléfono, correo, horario.
6. Contenido real del blog y de los casos de éxito.
7. Textos legales: política de tratamiento de datos personales (obligatoria por
   Ley 1581 de 2012 en Colombia, dado que hay formulario de contacto).
