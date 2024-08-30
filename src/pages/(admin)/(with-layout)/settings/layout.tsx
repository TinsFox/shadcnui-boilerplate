import { useTranslation } from "react-i18next"
import { Outlet } from "react-router-dom"

import { SidebarNav } from "./components/sidebar-nav"

export function Component() {
  const { t } = useTranslation()

  const sidebarNavItems = [
    {
      title: t("settings.nav.profile"),
      href: "/settings/profile",
    },
    {
      title: t("settings.nav.account"),
      href: "/settings/account",
    },
    {
      title: t("settings.nav.appearance"),
      href: "/settings/appearance",
    },
    {
      title: t("settings.nav.notifications"),
      href: "/settings/notifications",
    },
    {
      title: t("settings.nav.display"),
      href: "/settings/display",
    },
    {
      title: t("settings.nav.theme"),
      href: "/settings/theme",
    },
  ]
  return (
    <div className="space-y-6 p-10 py-0 md:block ">
      <div className="relative flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/6 ">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <Outlet />
      </div>
    </div>
  )
}
