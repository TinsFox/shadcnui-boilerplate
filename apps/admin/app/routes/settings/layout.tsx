import { useTranslation } from "react-i18next"
import { Outlet } from "react-router"

import { SidebarNav } from "./components/sidebar-nav"

export default function SettingsLayout() {
  const { t } = useTranslation("settings")

  const sidebarNavItems = [
    {
      title: t("nav.profile"),
      href: "/settings/profile",
    },
    {
      title: t("nav.account"),
      href: "/settings/account",
    },
    {
      title: t("nav.appearance"),
      href: "/settings/appearance",
    },
    {
      title: t("nav.notifications"),
      href: "/settings/notifications",
    },
    {
      title: t("nav.display"),
      href: "/settings/display",
    },
    {
      title: t("nav.theme"),
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
