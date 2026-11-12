import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      // Vendored MIT components from Pin UI are kept unmodified, so they are not linted.
      "components/audio/**",
      "components/cards/**",
      "components/interactive/**",
      "components/forms/**",
      "components/lists/**",
    ],
  },
];

export default eslintConfig;
