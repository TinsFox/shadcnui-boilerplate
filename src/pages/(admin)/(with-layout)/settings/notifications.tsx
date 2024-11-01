import { useTranslation } from "react-i18next"

import { Separator } from "@/components/ui/separator"

import { NotificationsForm } from "./components/notifications-form"

export function Component() {
  const { t } = useTranslation(["settings", "common"])
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t("nav.notifications")}</h3>
        <p className="text-sm text-muted-foreground">
          {t("sections.notifications.description")}
        </p>
      </div>
      <Separator />
      <NotificationsForm />
    </div>
  )
}
