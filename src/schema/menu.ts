import type { LucideIcon } from "lucide-react"
import { z } from "zod"

// 由于 LucideIcon 是一个类型，我们需要使用 custom 方法来验证
const LucideIconSchema = z.custom<LucideIcon>(
  (data) => {
    return typeof data === "function"
  },
  {
    message: "Invalid Lucide icon",
  },
)

// 子菜单项 Schema
export const ChildrenMenuItemSchema = z.object({
  title: z.string(),
  label: z.string().optional(),
  icon: LucideIconSchema,
  to: z.string().url(),
})

// 菜单项 Schema
export const MenuItemSchema = z.object({
  title: z.string(),
  label: z.string().optional(),
  icon: LucideIconSchema,
  to: z.string().url(),
  children: z.array(ChildrenMenuItemSchema).optional(),
})

// 导出类型
export type IChildrenMenuItem = z.infer<typeof ChildrenMenuItemSchema>
export type MenuItem = z.infer<typeof MenuItemSchema>
export type IMenu = MenuItem

// 如果需要验证菜单数组
export const MenuArraySchema = z.array(MenuItemSchema)
