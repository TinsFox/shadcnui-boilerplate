import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const COMPONENTS_DIR = path.join(__dirname, "../src/components/ui")
const HOOKS_DIR = path.join(__dirname, "../src/hooks")
const INDEX_FILE = path.join(__dirname, "../src/index.ts")
const PACKAGE_JSON = path.join(__dirname, "../package.json")

function getExportStatements(dir: string, prefix = "./") {
  const files = fs.readdirSync(dir)
  return files
    .filter((file) => file.endsWith(".tsx") || file.endsWith(".ts"))
    .map((file) => {
      const basename = path.basename(file, path.extname(file))
      const relativePath = path
        .relative(path.dirname(INDEX_FILE), path.join(dir, basename))
        .replaceAll("\\", "/")
      return `export * from "${prefix}${relativePath}"`
    })
    .join("\n")
}

function generatePackageExports() {
  const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, "utf-8"))
  const files = fs.readdirSync(COMPONENTS_DIR)

  // 保持现有的导出
  const exports = {
    ".": "./src/index.ts",
    "./globals.css": "./src/globals.css",
    "./tailwind.config.ts": "./tailwind.config.ts",
    "./components.json": "./components.json",
  }

  // 添加组件导出
  files
    .filter((file) => file.endsWith(".tsx") || file.endsWith(".ts"))
    .forEach((file) => {
      const basename = path.basename(file, path.extname(file))
      exports[`./${basename}`] = `./src/components/ui/${basename}${path.extname(file)}`
    })

  // 添加 hooks 导出
  const hookFiles = fs.readdirSync(HOOKS_DIR)
  hookFiles
    .filter((file) => file.endsWith(".tsx") || file.endsWith(".ts"))
    .forEach((file) => {
      const basename = path.basename(file, path.extname(file))
      exports[`./hooks/${basename}`] = `./src/hooks/${basename}`
    })

  // 添加 utils 导出
  exports["./utils"] = "./src/lib/utils"

  pkg.exports = exports

  fs.writeFileSync(PACKAGE_JSON, JSON.stringify(pkg, null, 2), "utf-8")
  console.log("✅ Successfully updated package.json exports")
}

function generateIndex() {
  const componentsExports = getExportStatements(COMPONENTS_DIR)
  const hooksExports = getExportStatements(HOOKS_DIR)

  const content = `// Components exports
${componentsExports}

// Hooks exports
${hooksExports}

// Utils exports
export * from "./lib/utils"
`

  fs.writeFileSync(INDEX_FILE, content, "utf-8")
  console.log("✅ Successfully generated index.ts")
}

generateIndex()
generatePackageExports()
