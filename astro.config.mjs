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
  },
});
