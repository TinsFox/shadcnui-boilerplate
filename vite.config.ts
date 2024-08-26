import { readFileSync } from "node:fs"

import react from "@vitejs/plugin-react-swc"
import { config } from "dotenv"
import { defineConfig } from "vite"
import { createHtmlPlugin } from "vite-plugin-html"
import tsconfigPaths from "vite-tsconfig-paths"

import { getGitHash } from "./scripts/lib.ts"

const pkg = JSON.parse(readFileSync("package.json", "utf8"))
const readme = readFileSync("README.md", "utf8")

config()

const { env } = process

const define = {
  APP_VERSION: JSON.stringify(pkg.version),
  APP_NAME: JSON.stringify(pkg.name),
  APP_DEV_CWD: JSON.stringify(process.cwd()),
  GIT_COMMIT_SHA: JSON.stringify(
    process.env.VERCEL_GIT_COMMIT_SHA || getGitHash()
  ),
  DEBUG: process.env.DEBUG === "true",
  dependencies: JSON.stringify(pkg.dependencies),
  devDependencies: JSON.stringify(pkg.devDependencies),
  README: JSON.stringify(readme),
  pkg: JSON.stringify(pkg),
}

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    createHtmlPlugin({
      template: "index.html",
      inject: {
        data: {
          title: env.VITE_APP_NAME,
        },
      },
    }),
  ],
  define,
  server: {
    // host: "0.0.0.0",
    proxy: {
      "/^api/": {
        target: process.env.VITE_API_URL,
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
