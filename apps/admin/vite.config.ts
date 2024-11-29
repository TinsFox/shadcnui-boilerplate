import { readFileSync } from "node:fs"

import react from "@vitejs/plugin-react-swc"
import { defineConfig, loadEnv } from "vite"
import { createHtmlPlugin } from "vite-plugin-html"
import tsconfigPaths from "vite-tsconfig-paths"

import { getGitHash } from "./scripts/lib.ts"

const pkg = JSON.parse(readFileSync("package.json", "utf8"))
const readme = readFileSync("../../README.md", "utf8")

export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd(), "")

  return {
    plugins: [
      tsconfigPaths(),
      react(),
      createHtmlPlugin({
        template: "index.html",
        inject: {
          data: {
            title: viteEnv.VITE_APP_NAME,
          },
        },
      }),
    ],
    define: {
      APP_VERSION: JSON.stringify(pkg.version),
      APP_NAME: JSON.stringify(pkg.name),
      APP_DEV_CWD: JSON.stringify(process.cwd()),
      GIT_COMMIT_SHA: JSON.stringify(getGitHash()),
      dependencies: JSON.stringify(pkg.dependencies),
      devDependencies: JSON.stringify(pkg.devDependencies),
      README: JSON.stringify(readme),
      pkg: JSON.stringify(pkg),
    },
    server: {
      port: 5173,
      strictPort: true,
      proxy: {
        "/api/": {
          target: viteEnv.VITE_API_URL,
          changeOrigin: true,
        },
      },
    },
    build: {
      rollupOptions: {
        // external: ["react-hook-form"],
      },
    },
  }
})
