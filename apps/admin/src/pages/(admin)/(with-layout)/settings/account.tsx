import { Separator } from "@repo/ui/separator"
import { useTranslation } from "react-i18next"

import { AccountForm } from "./components/account-form"

export function Component() {
  const { t } = useTranslation(["settings"])
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t("sections.account.title")}</h3>
        <p className="text-sm text-muted-foreground">
          {t("sections.account.description")}
        </p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  )
}
