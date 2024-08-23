import type { IMenu } from "@/models/menu"

export function findMenuTitleByPathname(
  menus: IMenu[],
  pathname: string,
): string | null {
  for (const menu of menus) {
    if (menu.to === pathname) {
      return menu.title
    }

    if (menu.children) {
      for (const child of menu.children) {
        if (child.to === pathname) {
          return child.title
        }
      }
    }
  }

  return null
}
