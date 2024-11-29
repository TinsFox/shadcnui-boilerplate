import { useLayoutEffect } from "react"
import { Outlet } from "react-router-dom"

function App() {
  useLayoutEffect(() => {
    const handleOpenSettings = (e: KeyboardEvent) => {
      if (e.key === "," && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        // TODO: Open settings
      }
    }
    document.addEventListener("keydown", handleOpenSettings)

    return () => {
      document.removeEventListener("keydown", handleOpenSettings)
    }
  }, [])

  return <Outlet />
}

export default App
