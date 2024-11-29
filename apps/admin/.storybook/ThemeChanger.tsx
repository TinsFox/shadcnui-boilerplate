import { Button } from "@repo/ui/button"
import { addons } from "@storybook/manager-api"
import { useTheme } from "@storybook/theming"
import { Moon, Sun } from "lucide-react"
import * as React from "react"

import { darkTheme, lightTheme } from "./theme"

export function ThemeChanger() {
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    // 初始化时设置 Storybook 主题
    addons.setConfig({
      theme: theme === "dark" ? darkTheme : lightTheme,
    })
  }, [])

  const toggleTheme = React.useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)

    // 更新 Storybook 管理界面主题
    addons.setConfig({
      theme: newTheme === "dark" ? darkTheme : lightTheme,
    })
  }, [theme, setTheme])

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed right-4 top-4 z-50"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <Sun className="size-5" />
      ) : (
        <Moon className="size-5" />
      )}
    </Button>
  )
}
