import type { LucideIcon } from "lucide-react"

export type MenuItem = {
  title: I18nKeys
  label?: I18nKeys
  icon: LucideIcon
  to: string
  children?: IChildrenMenuItem[]
}

interface IChildrenMenuItem {
  title: I18nKeys
  label?: I18nKeys
  icon: LucideIcon
  to: string
}
export type IMenu = MenuItem
