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
  vite: {
    plugins: [tailwindcss()],
  },
});
