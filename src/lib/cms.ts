/*
 * URL base del CMS de Risk (Cloudflare Workers) que alimenta las colecciones
 * `blog` y `case-studies` vía sus custom loaders (Content Layer API).
 *
 * Precedencia (de mayor a menor):
 *   1. Variable de entorno CMS_API_URL — override sin tocar código. Se lee tanto
 *      de import.meta.env (archivos `.env` cargados por Vite) como de process.env
 *      (variables de build del entorno, p. ej. las del proyecto de Cloudflare
 *      Pages). Útil para apuntar a un CMS de staging o al futuro dominio `cms.*`.
 *   2. En build de PRODUCCIÓN (astro build): el dominio de producción del CMS.
 *   3. En DEV (astro dev): el `pnpm dev` local del CMS (puerto 3000).
 *
 * Al migrar el CMS a un dominio custom (p. ej. https://cms.risksolution.co),
 * basta con actualizar PROD_CMS_URL aquí o definir CMS_API_URL en el proyecto de
 * Pages (Settings → Environment variables, entorno Production).
 */
const PROD_CMS_URL = "https://cms-risk-solution.jcarvajal-36f.workers.dev";
const DEV_CMS_URL = "http://localhost:3000";

export function getCmsBase(): string {
  const fromEnv =
    import.meta.env.CMS_API_URL ||
    (typeof process !== "undefined" ? process.env.CMS_API_URL : undefined);

  return fromEnv || (import.meta.env.PROD ? PROD_CMS_URL : DEV_CMS_URL);
}
