import { Menu } from "lucide-react"

import { LanguageSwitch } from "@/components/language-switch"
import { Search } from "@/components/layout/search"
import { MobileNav } from "@/components/layout/sidebar/mobile-nav"
import { UserNav } from "@/components/layout/user-nav"
import { ThemeCustomizer } from "@/components/theme/theme-customizer"
import { ThemeSwitcher } from "@/components/theme/theme-switcher"
import { Button } from "@/components/ui/button"

import { TailwindIndicator } from "../devtools/tailwind-indicator"

interface HeaderProps {
  handleNavCollapse: () => void
}

export function Header({ handleNavCollapse }: HeaderProps) {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Button
          size="icon"
          variant="ghost"
          onClick={handleNavCollapse}
          className="hidden lg:flex"
        >
          <Menu />
        </Button>

        <MobileNav />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <LanguageSwitch />
          <ThemeSwitcher />
          <ThemeCustomizer className="" />
          <TailwindIndicator />
          <UserNav />
        </div>
      </div>
    </div>
  )
}
