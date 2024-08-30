import { useTranslation } from "react-i18next"

import { Separator } from "@/components/ui/separator"

import { AppearanceForm } from "./components/appearance-form"

export function Component() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t("settings.nav.appearance")}</h3>
        <p className="text-sm text-muted-foreground">
          {t("settings.appearance_description")}
        </p>
      </div>
      <Separator />
      <AppearanceForm />
    </div>
  )
}
