import "i18next"

import type { resources } from "@/i18n"
import type en from "@/i18n/locales/en.json"
import type zhCN from "@/i18n/locales/zh-CN.json"

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common"
    resources: {
      common: typeof resources.en.common
      auth: typeof resources.en.auth
      forms: typeof resources.en.forms
      settings: typeof resources.en.settings
      navigation: typeof resources.en.navigation
    }
  }
}
