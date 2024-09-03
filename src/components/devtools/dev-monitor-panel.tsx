import { env } from "@env"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { Grip } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { queryClient } from "@/lib/query-client"
import { Badge } from "@/ui/badge"

import { TailwindIndicator } from "./tailwind-indicator"

interface DevMonitorPanelPosition {
  x: number
  y: number
}

const devMonitorPanelAtom = atomWithStorage<DevMonitorPanelPosition>("dev-monitor-panel", {
  x: 0,
  y: 0,
})

export function DevMonitorPanel() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [position, setPosition] = useAtom(devMonitorPanelAtom)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartPos = useRef<{ x: number, y: number }>({ x: 0, y: 0 })
  const panelRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    }
  }, [position])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragStartPos.current.x
      const newY = e.clientY - dragStartPos.current.y
      setPosition({ x: newX, y: newY })
    }
  }, [isDragging, setPosition])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  useEffect(() => {
    const handleResize = () => {
      if (panelRef.current) {
        const rect = panelRef.current.getBoundingClientRect()
        setPosition({
          x: Math.min(rect.left, window.innerWidth - rect.width),
          y: Math.min(rect.top, window.innerHeight - rect.height),
        })
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [setPosition])

  if (!env.VITE_ENABLE_DEVTOOLS) {
    return null
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <div
        ref={panelRef}
        className="fixed z-50 flex cursor-default items-center"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <Grip
          className="cursor-move"
          onMouseDown={handleMouseDown}
        />
        <Badge onClick={() => setIsSheetOpen(true)}>
          DevPanel
          <TailwindIndicator />
        </Badge>
      </div>
      <SheetContent className="dev-monitor-panel">
        <SheetHeader>
          <SheetTitle>Dev Monitor</SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <ReactQueryDevtools client={queryClient} initialIsOpen={false} />
            <Button>
              ping
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
