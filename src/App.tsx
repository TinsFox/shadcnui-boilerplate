import { useLayoutEffect } from "react"
import { Outlet } from "react-router-dom"

import { RootProviders } from "@/providers/root-providers"

function App() {
  useLayoutEffect(() => {
    const handleOpenSettings = (e: KeyboardEvent) => {
      if (e.key === "," && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
      }
    }
    document.addEventListener("keydown", handleOpenSettings)

    return () => {
      document.removeEventListener("keydown", handleOpenSettings)
    }
  }, [])

  return (
    <RootProviders>
      <Outlet />
    </RootProviders>
  )
}

export default App
