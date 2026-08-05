import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";

export default tseslint.config(
  {
    ignores: ["dist/", ".astro/", "node_modules/", "public/"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    rules: {
      // Nada de `any`: el CLAUDE.md exige tipos explícitos (sección 11).
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
);
