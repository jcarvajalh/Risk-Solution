/**
 * Verifica que los hashes sha256 de `script-src` en public/_headers cubran
 * EXACTAMENTE los scripts inline que quedan en dist/.
 *
 * Por qué existe: un script inline no autorizado no produce ningún error visible
 * en el sitio — Cloudflare lo bloquea y la funcionalidad simplemente no ocurre.
 * Y como `public/_headers` no se aplica ni en `pnpm dev` ni en `pnpm preview`, el
 * fallo es invisible hasta que está en producción. Pasó tres veces.
 *
 * Uso:
 *   pnpm csp:check           -> falla (exit 1) si hay desincronización
 *   pnpm csp:check --fix     -> reescribe la lista de hashes en public/_headers
 *
 * Requiere un `pnpm build` previo: lee dist/, no el código fuente.
 */
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const HEADERS_FILE = "public/_headers";
const DIST = "dist";

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });

/**
 * Scripts inline EJECUTABLES del build. Se excluyen los que tienen `src` (los
 * cubre `'self'`) y los `application/ld+json`, que son datos: el navegador no
 * los ejecuta y no los somete a script-src.
 */
function collectInlineHashes() {
  const pattern = /<script(\s[^>]*)?>([\s\S]*?)<\/script>/g;
  const found = new Map();

  for (const file of walk(DIST).filter((f) => f.endsWith(".html"))) {
    const html = readFileSync(file, "utf8");
    let match;
    while ((match = pattern.exec(html))) {
      const attrs = match[1] ?? "";
      const body = match[2];
      if (/src\s*=/.test(attrs)) continue;
      if (/application\/ld\+json/.test(attrs)) continue;
      if (body.trim() === "") continue;

      const hash = createHash("sha256").update(body, "utf8").digest("base64");
      if (!found.has(hash)) found.set(hash, { file, snippet: body.trim().slice(0, 70) });
    }
  }
  return found;
}

const headers = readFileSync(HEADERS_FILE, "utf8");
const cspLine = headers
  .split("\n")
  .find((line) => line.includes("Content-Security-Policy"));

if (!cspLine) {
  console.error(`✗ No se encontró Content-Security-Policy en ${HEADERS_FILE}`);
  process.exit(1);
}

const declared = new Set(
  [...cspLine.matchAll(/'sha256-([^']+)'/g)].map((m) => m[1]),
);
const required = collectInlineHashes();

const missing = [...required.keys()].filter((h) => !declared.has(h));
const extra = [...declared].filter((h) => !required.has(h));

if (missing.length === 0 && extra.length === 0) {
  console.log(
    `✓ CSP sincronizada: ${required.size} script(s) inline, ${declared.size} hash(es) declarado(s).`,
  );
  process.exit(0);
}

if (process.argv.includes("--fix")) {
  const hashList = [...required.keys()].map((h) => `'sha256-${h}'`).join(" ");
  const fixed = headers.replace(cspLine, () =>
    cspLine
      .replace(/\s*'sha256-[^']+'/g, "")
      .replace(/(script-src[^;]*?)(;)/, `$1 ${hashList}$2`),
  );
  writeFileSync(HEADERS_FILE, fixed, "utf8");
  console.log(`✓ ${HEADERS_FILE} actualizado con ${required.size} hash(es).`);
  console.log("  Revisa el diff y vuelve a compilar antes de desplegar.");
  process.exit(0);
}

console.error(`✗ ${HEADERS_FILE} está desincronizado con ${DIST}/\n`);

for (const hash of missing) {
  const { file, snippet } = required.get(hash);
  console.error(`  FALTA    'sha256-${hash}'`);
  console.error(`           ${file} :: ${snippet.replace(/\s+/g, " ")}…`);
}
for (const hash of extra) {
  console.error(`  SOBRA    'sha256-${hash}' (ningún script del build lo usa)`);
}

console.error(
  "\n  Sin esos hashes, Cloudflare bloquea el script y la funcionalidad muere",
);
console.error("  EN SILENCIO en producción. Corrige con: pnpm csp:check --fix");
process.exit(1);
