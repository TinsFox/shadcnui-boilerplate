import { useTranslation } from "react-i18next"

import { Separator } from "@/components/ui/separator"

import { DisplayForm } from "./components/display-form"

export function Component() {
  const { t } = useTranslation()
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t("settings.nav.display")}</h3>
        <p className="text-sm text-muted-foreground">
          {t("settings.display_description")}
        </p>
      </div>
      <Separator />
      <DisplayForm />
    </div>
  )
}
