import type { LucideIcon } from "lucide-react"

export type MenuItem = {
  title: string
  label?: string
  icon: LucideIcon
  to?: string
  children?: IChildrenMenuItem[]
}

interface IChildrenMenuItem {
  title: string
  label?: string
  icon: LucideIcon
  to: string
}
export type IMenu = MenuItem
