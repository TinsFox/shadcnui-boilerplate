import { readFileSync } from "node:fs"

import { reactRouter } from "@react-router/dev/vite"
import { defineConfig, loadEnv } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

import { getGitHash } from "./scripts/lib.ts"

const pkg = JSON.parse(readFileSync("package.json", "utf8"))
const readme = readFileSync("README.md", "utf8")

export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd(), "")

  return {
    plugins: [
      reactRouter({
        ssr: false,
      }),
      tsconfigPaths(),
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
      proxy: {
        "/api/": {
          target: viteEnv.VITE_API_URL,
          changeOrigin: true,
        },
      },
    },
  }
})
