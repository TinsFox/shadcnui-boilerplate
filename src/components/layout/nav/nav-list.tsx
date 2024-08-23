import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

import { AccountSwitcher } from "./account-switcher"
import { Nav } from "./nav"
import { accounts, menus } from "./sidebar-data"

export interface NavListProps {
  isCollapsed: boolean
}

export function NavList({ isCollapsed }: NavListProps) {
  return (
    <>
      <div
        className={cn(
          "flex h-16 items-center justify-center",
          isCollapsed ? "h-16" : "px-2",
        )}
      >
        <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
      </div>
      <Separator />
      <Nav
        isCollapsed={isCollapsed}
        links={menus}
      />
    </>
  )
}
