import type { LucideIcon } from "lucide-react"
import { z } from "zod"

const LucideIconSchema = z.custom<LucideIcon>(
  (data) => {
    return typeof data === "function"
  },
  {
    message: "Invalid Lucide icon",
  },
)

export const ChildrenMenuItemSchema = z.object({
  title: z.string(),
  label: z.string().optional(),
  icon: LucideIconSchema,
  to: z.string().url(),
})

export const MenuItemSchema = z.object({
  title: z.string(),
  label: z.string().optional(),
  icon: LucideIconSchema,
  to: z.string().url(),
  children: z.array(ChildrenMenuItemSchema).optional(),
})

export type IChildrenMenuItem = z.infer<typeof ChildrenMenuItemSchema>
export type MenuItem = z.infer<typeof MenuItemSchema>
export type IMenu = MenuItem

export const MenuArraySchema = z.array(MenuItemSchema)
