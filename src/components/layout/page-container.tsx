import type { PropsWithChildren } from "react"
import { useLocation } from "react-router-dom"

import { findMenuTitleByPathname } from "@/lib/menu"

import { menus } from "./nav/sidebar-data"

interface PageContainerProps {
  toolBar?: React.ReactNode
}

export function PageContainer(props: PropsWithChildren<PageContainerProps>) {
  const location = useLocation()

  const { pathname } = location

  const pageTitle = findMenuTitleByPathname(menus, pathname)

  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold capitalize tracking-tight">
          {pageTitle}
        </h2>
        {props.toolBar}
      </div>
      {props.children}
    </div>
  )
}
