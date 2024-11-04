import { env } from "@env"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { queryClient } from "@/lib/query-client"
import { cn } from "@/lib/utils"
import { Badge } from "@/ui/badge"

import { TailwindIndicator } from "./tailwind-indicator"

interface DevMonitorPanelProps {
  className?: string
}

export function DevMonitorPanel({ className }: DevMonitorPanelProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  if (!env.VITE_ENABLE_DEVTOOLS) {
    return null
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <div className={cn("z-50 flex cursor-default items-center", className)}>
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
