import type { useTranslation } from "react-i18next"

// eslint-disable-next-line unused-imports/no-unused-vars
const { t } = useTranslation()

declare global {
  export const APP_DEV_CWD: string
  export const GIT_COMMIT_SHA: string
  export const DEBUG: boolean
  export const dependencies: Record<string, string>
  export const devDependencies: Record<string, string>
  export const README: string
  export const pkg: IPKG
  export type I18nKeys = OmitStringType<Parameters<typeof t>[0]>

}

export { }

export interface IPKG {
  name: string
  type: string
  version: string
  private: boolean
  homepage: string
  repository: Repository
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
  description: string
  author: string
}

export interface Repository {
  url: string
  type: string
}
