import { Button } from "@repo/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@repo/ui/collapsible"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@repo/ui/sidebar"
import { useAtom } from "jotai"
import { ChevronRight, ChevronsDownUp, ChevronsUpDown } from "lucide-react"
import { useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Link, useLocation } from "react-router"

import { navOpenItemsAtom } from "@/atoms/nav"
import type { IMenu } from "@/schema/menu"

export function NavMain({
  items,
}: {
  items: IMenu[]
}) {
  const { t } = useTranslation("navigation")
  const location = useLocation()
  const [openItems, setOpenItems] = useAtom(navOpenItemsAtom)

  const { isPathActive, isParentActive } = useMemo(() => {
    const isPathActive = (path: string) => {
      return location.pathname === path || location.pathname.startsWith(`${path}/`)
    }

    const isParentActive = (item: IMenu) => {
      return item.children?.some((child) => isPathActive(child.to))
    }

    return { isPathActive, isParentActive }
  }, [location.pathname])

  useEffect(() => {
    const newOpenItems: Record<string, boolean> = { ...openItems }
    let hasChanges = false

    items.forEach((item) => {
      const shouldBeOpen = isPathActive(item.to) || isParentActive(item)
      if (shouldBeOpen && !newOpenItems[item.title]) {
        newOpenItems[item.title] = true
        hasChanges = true
      }
    })

    if (hasChanges) {
      setOpenItems(newOpenItems)
    }
  }, [location.pathname, items, isPathActive, isParentActive])

  const handleToggle = (title: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  const handleToggleAll = () => {
    const allExpanded = items.every((item) => openItems[item.title])
    const newOpenItems: Record<string, boolean> = {}

    items.forEach((item) => {
      newOpenItems[item.title] = !allExpanded
    })

    setOpenItems(newOpenItems)
  }

  return (
    <SidebarGroup>
      <div className="flex items-center justify-between">
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={handleToggleAll}
          className="rounded-md p-1 hover:bg-muted"
          title={items.every((item) => openItems[item.title]) ? "Collapse all" : "Expand all"}
        >
          {items.every((item) => openItems[item.title]) ? (
            <ChevronsDownUp className="size-4" />
          ) : (
            <ChevronsUpDown className="size-4" />
          )}
        </Button>
      </div>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            open={openItems[item.title]}
            onOpenChange={() => handleToggle(item.title)}
          >
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={t(item.title)}
                data-active={item.children ? false : isPathActive(item.to)}
              >
                <Link to={item.to}>
                  <item.icon />
                  <span>{t(item.title)}</span>
                </Link>
              </SidebarMenuButton>
              {item.children?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.children?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            data-active={isPathActive(subItem.to)}
                          >
                            <Link to={subItem.to}>
                              <span>{t(subItem.title)}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
