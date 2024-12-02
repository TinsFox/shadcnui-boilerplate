import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/breadcrumb"
import * as React from "react"
import { useTranslation } from "react-i18next"
import { Link, useLocation } from "react-router"

import { useNavMenu } from "@/hooks/query/user-menu"
import { cn } from "@/lib/utils"
import type { IMenu } from "@/schema/menu"

interface Breadcrumb {
  title: I18nKeys
  to: string
  isLast: boolean
}

export function NavBreadcrumb({ className }: { className?: string }) {
  const location = useLocation()
  const { t } = useTranslation("navigation")
  const { data: menus } = useNavMenu()
  const findMenuPath = (
    pathname: string,
    items: IMenu[],
    parents: IMenu[] = [],
  ): (IMenu & { parents: IMenu[] }) | null => {
    for (const item of items) {
      if (item.to === pathname) {
        return { ...item, parents }
      }

      if (item.children?.length) {
        const found = findMenuPath(pathname, item.children, [...parents, item])
        if (found) return found
      }
    }
    return null
  }

  const buildBreadcrumbs = (): Breadcrumb[] => {
    const menuPath = findMenuPath(location.pathname, menus)
    if (!menuPath) return []

    const breadcrumbs: Breadcrumb[] = []

    // 添加父级菜单
    menuPath.parents.forEach((parent) => {
      breadcrumbs.push({
        title: parent.title,
        to: parent.to,
        isLast: false,
      })
    })

    // 添加当前菜单
    breadcrumbs.push({
      title: menuPath.title,
      to: menuPath.to,
      isLast: true,
    })

    return breadcrumbs
  }

  const breadcrumbs = buildBreadcrumbs()

  if (breadcrumbs.length === 0) {
    return null
  }

  return (
    <Breadcrumb className={cn(className)}>
      <BreadcrumbList className="flex-nowrap">
        {breadcrumbs.map((item) => (
          <React.Fragment key={item.to}>
            <BreadcrumbItem>
              {!item.isLast ? (
                <BreadcrumbLink asChild>
                  <Link to={item.to}>
                    {t(item.title)}
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{t(item.title)}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {!item.isLast && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
