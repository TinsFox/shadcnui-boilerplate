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
    ignores: ["public/mockServiceWorker.js", "src/components/ui"],
  },
  {
    settings: {
      tailwindcss: {
        whitelist: [
          "center",
        ],
      },
    },
    rules: {},
  },
)
