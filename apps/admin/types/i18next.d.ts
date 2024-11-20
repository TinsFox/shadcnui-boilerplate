// import the original type declarations
import "i18next"

// import all namespaces (for the default language, only)
import type en from "@/i18n/locales/en.json"
import type zhCN from "@/i18n/locales/zh-CN.json"

declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: "en"
    // custom resources type
    resources: {
      en: typeof en
      zhCN: typeof zhCN
    }
  }
}
