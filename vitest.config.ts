import react from "@vitejs/plugin-react-swc"
import { mergeConfig } from "vite"
import { configDefaults, defineConfig } from "vitest/config"

import viteConfig from "./vite.config"

export default defineConfig((configEnv) =>
  mergeConfig(
    viteConfig(configEnv),
    defineConfig({
      plugins: [react()],
      test: {
        environment: "jsdom",
        globals: true,
        setupFiles: "./src/test/setup.ts",
        coverage: {
          provider: "v8",
          reporter: ["text", "json", "html"],
          exclude: [
            ...(configDefaults.exclude ?? []),
            "node_modules/",
            "src/test/",
            "**/*.d.ts",
            "**/*.config.*",
            "**/.*",
          ],
        },
      },
    }),
  ),
)
