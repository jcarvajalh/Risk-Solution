# CMS — Blog y Guías (contrato de datos)

> Documento de referencia para construir el CMS del sitio **Risk Solution**.
> Describe **exactamente** los campos que consume el sitio para el blog y las
> guías, cómo se renderizan (tarjeta del listado y página completa), y las reglas
> de validación que el CMS debe respetar para que el contenido publicado no rompa
> el build.
>
> El CMS vive en un **repo/carpeta aparte**. Este archivo es el "contrato": si el
> CMS alimenta estos campos con estos tipos, el sitio los consume sin cambios.
> La opción evaluada es **Keystatic** (basado en git, sin servidor), pero el
> contrato es agnóstico: sirve para cualquier CMS que escriba archivos Markdown
> con frontmatter.

---

## 1. Idea clave: blog y guías son la MISMA colección

No hay dos colecciones separadas. **Blog y Guías son la misma colección** (`blog`)
y se diferencian por un único campo: `type` (`"blog"` o `"guia"`).

- Misma estructura de campos.
- Misma plantilla de tarjeta y misma plantilla de detalle.
- El filtro **Todo / Blog / Guías** del listado usa `type`.
- La etiqueta visible ("Blog" o "Guía") se deriva de `type`, no es un campo aparte.

Esto significa que en el CMS **una sola plantilla de contenido** cubre ambos; el
editor solo elige el tipo en un desplegable.

---

## 2. Ubicación y ruteo

| Concepto | Valor |
|---|---|
| Carpeta de contenido | `src/content/blog/` |
| Formato de archivo | `.md` o `.mdx` |
| Nombre del archivo | Es el **slug** y la **URL**. Ej.: `senales-de-alerta.md` → `/recursos/blog/senales-de-alerta` |
| URL del listado | `/recursos/blog` |
| URL del detalle | `/recursos/blog/<slug>` |

**Reglas del nombre de archivo (slug):**

- `kebab-case`, en español, sin tildes ni caracteres especiales
  (ej.: `matriz-de-riesgo-paso-a-paso`).
- Único en la colección (dos archivos no pueden tener el mismo nombre).
- No cambiar el nombre de un archivo ya publicado sin poner una redirección: el
  slug **es** la URL y cambiarlo rompe enlaces externos.
- El slug es independiente del `type`: blog y guías comparten el mismo espacio de
  nombres/carpeta.

Las imágenes **no** van en esta carpeta (ver sección 6).

---

## 3. Esquema de campos (fuente de verdad)

Definido con Zod en `src/content.config.ts`, colección `blog`. Esta tabla es la
referencia canónica.

| Campo | Tipo | ¿Obligatorio? | Default | Dónde aparece |
|---|---|---|---|---|
| `title` | texto | **Sí** | — | Tarjeta + Detalle (H1) + `<title>` + JSON-LD |
| `description` | texto | **Sí** | — | Tarjeta (resumen) + `meta description` + JSON-LD |
| `publishDate` | fecha | **Sí** | — | Tarjeta + Detalle (metadatos) + JSON-LD |
| `type` | `"blog"` \| `"guia"` | No | `"blog"` | Filtro del listado + etiqueta del detalle |
| `image` | slug de imagen | No | — (usa placeholder) | Tarjeta (portada) + Detalle (portada) |
| `author` | texto | **Sí** | — | Detalle (metadatos) + JSON-LD |
| `updatedDate` | fecha | No | — | JSON-LD (`dateModified`) |
| `tags` | lista de textos | No | `[]` | Detalle (chips al final) |
| `draft` | booleano | No | `false` | Controla si se publica |

> **Regla de oro para el CMS:** todo lo marcado como obligatorio debe ser un campo
> requerido en el formulario. Si falta `title`, `description`, `publishDate` o
> `author`, el build de Astro **falla**.

---

## 4. Campos por vista

### 4.1 Tarjeta del listado (`BlogCard`)

La tarjeta muestra **solo 4 datos**:

1. **Portada** — `image` (o placeholder si falta). Se recorta a proporción
   **291 × 174** (≈ 16:10).
2. **Fecha** — `publishDate`, formateada como `Julio 14 2026` (mes en español, sin
   coma).
3. **Título** — `title`.
4. **Descripción** — `description`, recortada visualmente a **3 líneas**
   (`line-clamp-3`). El texto completo se guarda igual; solo se recorta al mostrar.

La tarjeta **no** muestra: autor, tiempo de lectura, tags ni tipo. (El tipo solo
se usa para el filtro, de forma invisible.)

### 4.2 Página de detalle (`/recursos/blog/[slug]`)

De arriba a abajo:

1. **Enlace "Volver"** al listado (fijo, no es contenido).
2. **Etiqueta de tipo** — badge con "Blog" o "Guía", derivada de `type`.
3. **Título** — `title` como `<h1>`.
4. **Metadatos** — `author` · `publishDate` (formato `Julio 14, 2026`, **con
   coma**) · **tiempo de lectura** (calculado, no es un campo).
5. **Portada** — `image` (si existe), en proporción **16:9**.
6. **Cuerpo** — el contenido Markdown/MDX del archivo (ver sección 7).
7. **Tags** — `tags` como chips `#etiqueta` (solo si hay al menos uno).
8. Cierra con el banner CTA (fijo).

---

## 5. Detalle de cada campo

### `title` (obligatorio)
- Titular del artículo/guía. Se usa como `<h1>` del detalle, título de la tarjeta,
  `<title>` de la pestaña (`<title>` → `"<title> — Risk Solution"`) y `headline`
  del JSON-LD.
- **Recomendación SEO:** ≤ 60 caracteres para el `<title>`, con el término
  relevante al inicio (regla del sitio).

### `description` (obligatorio)
- Doble función: **resumen/excerpt** de la tarjeta **y** `meta description` de la
  página.
- **Recomendación SEO:** 140–160 caracteres, con gancho o llamada a la acción.
- En la tarjeta se recorta a 3 líneas; escribe pensando en que las primeras líneas
  comuniquen lo esencial.

### `publishDate` (obligatorio)
- Fecha de publicación. En el archivo se escribe `AAAA-MM-DD` (ej.: `2026-07-14`).
- Astro la interpreta con `z.coerce.date()` (acepta `AAAA-MM-DD` o ISO completo).
- **Se muestra siempre en UTC** para que no se desfase por zona horaria:
  - Tarjeta: `Julio 14 2026` (sin coma).
  - Detalle: `Julio 14, 2026` (con coma).
- Ordena el listado: los artículos se muestran del **más reciente al más antiguo**.
- ⚠️ El diseño original repetía la misma fecha en todas las tarjetas; cada entrada
  debe tener su fecha real.

### `type` (opcional, default `"blog"`)
- Valores permitidos: **solo** `"blog"` o `"guia"` (sin tilde en el valor).
- En el CMS debe ser un **desplegable/select cerrado** con esas dos opciones, no
  texto libre.
- Determina: el grupo del filtro (Blog/Guías) y la etiqueta del detalle
  (`"guia"` → "Guía"; cualquier otro → "Blog").

### `image` (opcional)
- **No es una ruta ni un archivo subido a la carpeta de contenido:** es un **slug**
  (ruta relativa **sin extensión**) bajo `src/assets/images/`. Ver sección 6.
- Ejemplo: `image: "blog/matriz-de-riesgo"` → el sitio busca
  `src/assets/images/blog/matriz-de-riesgo.(webp|png|jpg|…)`.
- Si se omite o el archivo no existe, se muestra un **placeholder** (recuadro con
  ícono) en lugar de romper. En la tarjeta el fallback es el slug
  `blog/sin-imagen`.
- La **misma** imagen se usa en la tarjeta (recorte 291×174) y en la portada del
  detalle (recorte 16:9).

### `author` (obligatorio)
- Nombre del autor o de la organización. Hoy se usa `"Solution Systems"`.
- Aparece en los metadatos del detalle y en el JSON-LD (`author.name`).
- El JSON-LD lo declara como `Organization`; si en el futuro se quieren autores
  personas, hay que ajustar `structured-data`/la plantilla (fuera del alcance de
  este contrato).

### `updatedDate` (opcional)
- Fecha de última actualización. Mismo formato que `publishDate`.
- No se muestra en pantalla hoy; alimenta `dateModified` del JSON-LD (bueno para
  SEO cuando se reedita un artículo).

### `tags` (opcional, default lista vacía)
- Lista de textos cortos. Se muestran como chips `#etiqueta` al final del detalle.
- No se muestran en la tarjeta ni afectan el filtro (el filtro es solo por `type`).
- En el CMS: campo de lista/array de textos (idealmente con autocompletado de tags
  ya usados para mantener consistencia).

### `draft` (opcional, default `false`)
- `true` → el artículo **no** se publica: no aparece en el listado ni genera página
  de detalle (excluido en `getStaticPaths` y en el listado).
- Úsalo para borradores en progreso.

---

## 6. Imágenes — cómo funcionan (importante para el CMS)

El sitio **no** guarda imágenes junto al Markdown. Todas las imágenes de contenido
viven en `src/assets/images/` y se referencian por **slug** (ruta sin extensión) a
través del componente `AppImage`.

**Reglas:**

- El valor del campo `image` es la ruta bajo `src/assets/images/` **sin extensión**.
  Convención para blog: prefijo `blog/`.
  - `image: "blog/senales-de-alerta"` → archivo real
    `src/assets/images/blog/senales-de-alerta.webp` (o `.png`, `.jpg`, etc.).
- **Extensiones soportadas:** `svg`, `png`, `jpg`, `jpeg`, `webp`, `avif`.
  Recomendado **`.webp`** o `.avif` por peso/rendimiento.
- Si el archivo no existe, `AppImage` pinta un placeholder con el texto del archivo
  que falta (no rompe el build). Esto permite escribir el artículo antes de tener
  la imagen final.
- Las imágenes se optimizan en build con `astro:assets` (formato moderno, tamaños
  responsivos). Por eso **no** se referencian por URL absoluta ni se incrustan como
  `<img src>` externas.

**Tamaños/recortes que aplica el sitio:**

| Uso | Proporción de recorte | Ancho máx. de render |
|---|---|---|
| Tarjeta del listado | 291 × 174 (≈ 16:10) | ~291 px |
| Portada del detalle | 16:9 | ~860 px |

**Recomendación de origen:** subir una sola imagen horizontal de buena resolución,
p. ej. **1600 × 900 px (16:9)**. Se recorta bien tanto a 16:9 (portada) como a
291×174 (tarjeta). Evita texto importante en los bordes: el recorte de la tarjeta
es más cuadrado y puede cortarlos.

**Implicación para el CMS:** si el CMS permite "subir imagen", debe guardar el
archivo en `src/assets/images/blog/<algo>.<ext>` y escribir en el frontmatter el
slug `blog/<algo>` (sin extensión). Si el CMS es Keystatic, configurar el campo de
imagen con `directory: "src/assets/images/blog"` y `publicPath`/transformación del
valor para que quede el slug sin extensión, **o** documentar al editor que escriba
el slug a mano.

---

## 7. Cuerpo del artículo (Markdown / MDX)

El contenido debajo del frontmatter es el **cuerpo** del artículo/guía. Se renderiza
con estilos tipográficos propios (clase `.rs-article`).

**Reglas de redacción:**

- **No** incluir un `# H1` en el cuerpo: el `title` del frontmatter ya es el `<h1>`
  de la página. Empezar las secciones en `##` (H2) y bajar con `###` (H3).
- Mantener una jerarquía de encabezados sin saltos (H2 → H3, no H2 → H4).
- Elementos soportados de serie: encabezados, párrafos, listas (con viñetas y
  numeradas), **negritas**, _cursivas_, enlaces y `> blockquote` (citas
  destacadas).
- El **tiempo de lectura** se calcula automáticamente a partir del cuerpo
  (~200 palabras/minuto); no es un campo y no hay que escribirlo.
- Estilo editorial del sitio: frases afirmativas y autocontenidas, un dato por
  frase, cifras verificables, definiciones claras de términos del dominio
  (SARLAFT, LA/FT, VaR…). Copy breve, sin párrafos-muralla.

**MDX:** los archivos pueden ser `.mdx` si en algún momento se necesitan
componentes embebidos; para contenido editorial normal, `.md` es suficiente.

---

## 8. SEO y datos estructurados (generados solos)

Con los campos anteriores, el sitio ya produce:

- `<title>` = `"<title> — Risk Solution"`.
- `meta description` = `description`.
- **JSON-LD `Article`** con: `headline` (title), `description`, `author`
  (Organization), `datePublished` (publishDate) y `dateModified` (si hay
  `updatedDate`).
- **JSON-LD `BreadcrumbList`**: Inicio › Blog › `<title>`.

El CMS no necesita generar nada de esto; basta con alimentar bien los campos.

---

## 9. Ejemplos de frontmatter

### 9.1 Artículo de blog

```markdown
---
title: "Señales de alerta en SARLAFT: cómo priorizarlas sin ahogar al equipo"
description: "Una entidad genera cientos de señales de alerta al mes. La diferencia entre cumplir y solo aparentar cumplir está en cómo se priorizan. Estas son las claves."
publishDate: 2026-07-14
type: "blog"
image: "blog/senales-de-alerta"
author: "Solution Systems"
tags:
  - "SARLAFT"
  - "señales de alerta"
  - "cumplimiento"
draft: false
---

Texto introductorio del artículo (sin H1).

## Primer subtítulo

Contenido…

> Cita destacada opcional.

## Segundo subtítulo

Más contenido…
```

### 9.2 Guía

Idéntico, cambiando `type`:

```markdown
---
title: "Guía: cómo construir una matriz de riesgo LA/FT paso a paso"
description: "La matriz de riesgo es el corazón del SARLAFT. Esta guía práctica explica cómo definir factores, valorar el riesgo inherente y llegar al riesgo residual."
publishDate: 2026-07-10
type: "guia"
image: "blog/matriz-de-riesgo"
author: "Solution Systems"
updatedDate: 2026-08-01
tags:
  - "matriz de riesgo"
  - "guía"
  - "LA/FT"
draft: false
---

Contenido de la guía…
```

---

## 10. Mapeo sugerido a campos de CMS (Keystatic u otro)

| Campo | Tipo de campo en el CMS | Requerido | Notas |
|---|---|---|---|
| slug (nombre de archivo) | slug / text | Sí | kebab-case; deriva del título pero editable |
| `title` | text | Sí | contador ≤ 60 recomendado |
| `description` | text (multilínea) | Sí | contador 140–160 recomendado |
| `publishDate` | date | Sí | guardar como `AAAA-MM-DD` |
| `type` | select (opciones: `blog`, `guia`) | No (default `blog`) | cerrado, no texto libre |
| `image` | image (o text con el slug) | No | destino `src/assets/images/blog/`; valor = slug sin extensión |
| `author` | text (o relación a "autores") | Sí | hoy fijo "Solution Systems" |
| `updatedDate` | date | No | opcional |
| `tags` | array de text | No | idealmente con sugerencias |
| `draft` | checkbox / boolean | No | default `false` |
| cuerpo | markdown / mdx | Sí (en la práctica) | empezar en H2; sin H1 |

**Validaciones que el CMS debe imponer para no romper el build:**

1. `title`, `description`, `publishDate`, `author` **siempre presentes**.
2. `type` solo `blog` o `guia`.
3. `publishDate`/`updatedDate` en formato de fecha válido.
4. `image`: si se completa, debe corresponder a un archivo existente bajo
   `src/assets/images/` (si no, el sitio muestra placeholder — no es fatal, pero
   conviene avisar al editor).
5. slug único y en kebab-case sin tildes.

---

## 11. Notas de migración

- Hoy el contenido son **archivos locales** en `src/content/blog/`. El CMS solo
  cambia la **capa de autoría** (una UI que escribe esos mismos archivos), no el
  esquema ni la arquitectura del sitio.
- Si el CMS vive en repo aparte, debe **escribir en la ruta
  `src/content/blog/*.md(x)`** del repo del sitio (o abrir PRs contra él). Mantener
  el frontmatter idéntico a este contrato.
- Si en el futuro se cambia el esquema (`src/content.config.ts`), **actualizar este
  documento** para que el CMS siga alineado.
- La colección hermana **Casos de éxito** (`src/content/case-studies/`) es
  parecida pero **tiene otro esquema** (cliente, sector, ubicación, galería). No
  está cubierta aquí: requiere su propio contrato si también se administra por CMS.
```
