// @ts-check
import { defineConfig } from "eslint-config-hyoban"

export default defineConfig(
  {
    formatting: {
      quotes: "double",
      arrowParens: true,
      braceStyle: "1tbs",
      lineBreak: "after",
    },
    lessOpinionated: true,
    preferESM: false,
    ignores: [
      "src/components/ui",
      "pnpm-lock.yaml",
      "pnpm-workspace.yaml",
      "apps/api/**/*",
      "**/*.png",
      "**/*.svg",
      "**/*.avif",
    ],
  },
  {
    settings: {
      tailwindcss: {
        whitelist: ["center"],
      },
    },
    rules: {
      "react-refresh/only-export-components": "off",
      "tailwindcss/no-custom-classname": "off",
    },
  },
  {
    files: ["**/pages/**/*.tsx"],
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowExportNames: ["loader", "Component", "action"] },
      ],
    },
  },
)
