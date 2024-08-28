import { Outlet } from "react-router-dom"

import { SidebarNav } from "./components/sidebar-nav"

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings/profile",
  },
  {
    title: "Account",
    href: "/settings/account",
  },
  {
    title: "Appearance",
    href: "/settings/appearance",
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
  },
  {
    title: "Display",
    href: "/settings/display",
  },
  {
    title: "Theme",
    href: "/settings/theme",
  },
]
export function Component() {
  return (
    <div className="space-y-6 p-10 py-0 md:block ">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/6">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
