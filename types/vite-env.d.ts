/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_APP_NAME: string
  VITE_WEB_URL: string
  VITE_API_URL: string
  VITE_ENABLE_DEVTOOLS: string
  VITE_EDITOR: string
  VITE_ENABLE_MOCK: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
