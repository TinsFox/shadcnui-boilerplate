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
    ignores: ["app/components/ui", "pnpm-lock.yaml", "**/**.png", "**/**.md"],
  },
  {
    settings: {
      tailwindcss: {
        whitelist: ["center"],
      },
    },
    rules: {
      "react-refresh/only-export-components": "off",
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
