import * as React from "react"
import { useTranslation } from "react-i18next"
import { NavLink } from "react-router-dom"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip"

import { AccountSwitcher } from "./account-switcher"
import { accounts, menus } from "./data"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean
}

export function Sidebar({ className, isCollapsed }: SidebarProps) {
  const { t } = useTranslation()
  return (
    <div className={cn("relative h-full pb-12", className)}>
      <div
        className={cn(
          "sticky top-0 flex size-16 w-full items-center justify-center",
          isCollapsed ? "h-16" : "px-2",
        )}
      >
        <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
      </div>
      <ScrollArea className="h-full overflow-auto pb-12">
        {!isCollapsed ? (menus.map((menuItem) => (
          <div className="px-3 py-2" key={menuItem.title}>
            {menuItem.children && (
              <>
                <h2 className="mb-2 px-4 text-lg font-semibold capitalize tracking-tight">
                  {t(`menus.${menuItem.title}` as never)}
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

                        )}
                    >
                      <child.icon className="mr-2 size-4" />

                      {t(`menus.${child.title}` as never)}

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

                  )}
              >
                <menuItem.icon className="mr-2 size-4" />
                {t(`menus.${menuItem.title}` as never)}
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
        ))) : (
          <div className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
            <div className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
              {menus.map((menuItem) => (
                <React.Fragment key={menuItem.title}>
                  {menuItem.children && (
                    <React.Fragment key={menuItem.title}>
                      {menuItem.children.map((child) => (
                        <Tooltip key={child.title} delayDuration={0}>
                          <TooltipTrigger>
                            <NavLink
                              to={child.to}
                              className={({ isActive }) => cn(
                                buttonVariants({
                                  variant: isActive ? "default" : "ghost",
                                  size: "icon",
                                }),
                                "size-9",

                              )}
                            >
                              <child.icon className="size-4" />
                              <span className="sr-only">
                                {t(`menus.${child.title}` as never)}
                              </span>
                            </NavLink>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="flex items-center gap-4 capitalize">
                            {t(`menus.${child.title}` as never)}
                            {child.label && (
                              <span className="ml-auto text-muted-foreground">
                                {child.label}
                              </span>
                            )}
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </React.Fragment>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
