import type { PropsWithChildren } from "react"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"

import { findMenuTitleByPathname } from "@/lib/menu"

import { menus } from "./sidebar/data"

interface PageContainerProps {
  toolBar?: React.ReactNode
}

export function PageContainer(props: PropsWithChildren<PageContainerProps>) {
  const location = useLocation()
  const { t } = useTranslation()

  const { pathname } = location

  const pageTitle = findMenuTitleByPathname(menus, pathname)

  return (
    <>
      {pageTitle && (
        <div className="my-2 flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold capitalize tracking-tight">
            {t(`menus.${pageTitle}` as never)}
          </h2>
          {props.toolBar && <>{props.toolBar}</>}
        </div>
      )}
      {props.children}
    </>
  )
}
