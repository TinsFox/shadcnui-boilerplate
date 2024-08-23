import { NavLink } from "react-router-dom"

import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import type { IMenu, MenuItem } from "@/models/menu"

interface NavProps {
  isCollapsed: boolean
  links: IMenu[]
}

export function Nav({ links, isCollapsed }: NavProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) => {
          if ("type" in link && link.type === "separator") {
            // eslint-disable-next-line @eslint-react/no-array-index-key
            return <Separator key={`separator-${index}`} />
          }
          const menuItem = link as MenuItem
          return !isCollapsed ?
              (
                <NavLink
                  key={menuItem.title}
                  to={menuItem.to}
                  className={({ isActive }) => cn(
                    buttonVariants({
                      variant: isActive ? "default" : "ghost",
                      size: "sm",
                    }),
                    "justify-start",
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
              ) :
              (
                <Tooltip key={menuItem.title} delayDuration={0}>
                  <TooltipTrigger>
                    <NavLink
                      to={menuItem.to}
                      className={({ isActive }) =>
                        cn(
                          buttonVariants({
                            variant: isActive ? "default" : "ghost",
                            size: "icon",
                          }),
                          "size-9",
                          !isActive && "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                        )}
                    >
                      <menuItem.icon className="size-4" />
                      <span className="sr-only">{menuItem.title}</span>
                    </NavLink>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="flex items-center gap-4">
                    {menuItem.title}
                    {menuItem.label && (
                      <span className="ml-auto text-muted-foreground">
                        {menuItem.label}
                      </span>
                    )}
                  </TooltipContent>
                </Tooltip>
              )
        })}
      </nav>
    </div>
  )
}
