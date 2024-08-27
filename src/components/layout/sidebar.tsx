import { NavLink } from "react-router-dom"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { ScrollArea } from "../ui/scroll-area"
import { AccountSwitcher } from "./nav/account-switcher"
import { accounts, menus } from "./nav/sidebar-data"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean
}

export function Sidebar({ className, isCollapsed }: SidebarProps) {
  return (
    <div className={cn("relative  h-full pb-12", className)}>
      <div
        className={cn(
          "sticky top-0 flex size-16 w-full items-center justify-center ",
          isCollapsed ? "h-16" : "px-2",
        )}
      >
        <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
      </div>
      <ScrollArea className="h-full overflow-auto ">
        {menus.map((menuItem) => (
          <div className="px-3 py-2" key={menuItem.title}>
            {menuItem.children && (
              <>
                <h2 className="mb-2 px-4 text-lg font-semibold capitalize tracking-tight">
                  {menuItem.title}
                </h2>
                <div className="space-y-1">
                  {menuItem.children.map((child) => (
                    <NavLink
                      key={child.title}
                      to={child.to}
                      className={({ isActive }) =>
                        cn(
                          buttonVariants({
                            variant: isActive ? "default" : "ghost",
                          }),
                          "w-full justify-start capitalize",
                          isActive &&
                          "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                        )}
                    >
                      <child.icon className="mr-2 size-4" />
                      {child.title}
                      {child.label && (
                        <span
                          className={cn(
                            "ml-auto",
                            "data-[active=true]:text-white data-[active=true]:dark:text-white",
                          )}
                        >
                          {child.label}
                        </span>
                      )}
                    </NavLink>
                  ))}
                </div>
              </>
            )}
            {!menuItem.children && menuItem.to && (
              <NavLink
                key={menuItem.title}
                to={menuItem.to}
                className={({ isActive }) =>
                  cn(
                    buttonVariants({
                      variant: isActive ? "default" : "ghost",
                    }),
                    "w-full justify-start capitalize",
                    isActive &&
                    "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                  )}
              >
                <menuItem.icon className="mr-2 size-4" />
                {menuItem.title}
                {menuItem.label && (
                  <span
                    className={cn(
                      "ml-auto",
                      "data-[active=true]:text-white data-[active=true]:dark:text-white",
                    )}
                  >
                    {menuItem.label}
                  </span>
                )}
              </NavLink>
            )}
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}
