// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

// TODO: reemplazar por el dominio de producción real antes del despliegue.
const SITE = "https://risksolution.example";

// https://astro.build/config
export default defineConfig({
  site: SITE,
  integrations: [react(), sitemap(), icon()],
  // Autoriza optimizar imágenes remotas (portadas del blog servidas por el CMS
  // desde R2). En build, Astro las descarga y optimiza a formato moderno.
  image: {
    // Dev local: el CMS corre en http://localhost. Prod: cualquier host https
    // (el dominio real del CMS, p. ej. cms.tudominio.com).
    domains: ["localhost"],
    remotePatterns: [{ protocol: "https" }],
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      /*
       * Astro incrusta en el HTML todo chunk por debajo de este límite
       * (shouldInlineAsset en core/build/plugins/util.js, que reciben tanto el
       * plugin de scripts como el de hojas de estilo). Devolver `false` para .js
       * impide que los scripts se incrusten: cada uno sale como archivo servido
       * desde el propio dominio. Para el resto (CSS, imágenes) se devuelve
       * undefined, que deja el comportamiento por defecto de Vite (<4KB) intacto
       * y conserva el CSS crítico embebido.
       *
       * Es un requisito de SEGURIDAD, no una optimización. Un script inline solo
       * pasa la CSP si su hash sha256 está listado en public/_headers, y ese hash
       * cambia con CADA edición del script. Tres veces se publicó un hash viejo y
       * la funcionalidad murió en silencio en Cloudflare Pages (el fondo del
       * header al hacer scroll, el carrusel del ecosistema, el zoom de las
       * capturas de módulo). Con los scripts del proyecto fuera del HTML,
       * `script-src 'self'` los cubre para siempre.
       *
       * Los únicos scripts que siguen inline son los cargadores de hidratación
       * que emite el runtime de Astro (no pasan por este plugin): sus hashes solo
       * cambian al subir la versión de Astro, no al tocar código del proyecto.
       */
      assetsInlineLimit: (filePath) =>
        filePath.endsWith(".js") ? false : undefined,
    },
  },
});
