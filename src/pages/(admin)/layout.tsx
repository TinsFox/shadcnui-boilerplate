import { useAtom } from "jotai"
import { useRef } from "react"
import type { ImperativePanelHandle } from "react-resizable-panels"
import { Outlet, redirect } from "react-router-dom"

import { isCollapsedAtom, layoutAtom } from "@/atoms/resizable-panels"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { DEFAULT_LAYOUT, NAV_COLLAPSED_SIZE } from "@/constants"
import { queryUser } from "@/hooks/query/use-user"
import { queryClient } from "@/lib/query-client"
import { cn } from "@/lib/utils"

export const loader = async () => {
  const userData = await queryClient.ensureQueryData(queryUser())
  if (!userData) {
    return redirect("/login")
  }
  return userData
}

export function Component() {
  const [layout, setLayout] = useAtom(layoutAtom)
  const [isCollapsed, setIsCollapsed] = useAtom(isCollapsedAtom)
  const defaultLayout = layout ? JSON.parse(layout) : DEFAULT_LAYOUT
  const ref = useRef<ImperativePanelHandle>(null)
  const handleNavCollapse = () => {
    setIsCollapsed((pre) => !pre)
    const panel = ref.current
    if (panel) {
      panel?.isCollapsed() ? panel?.expand() : panel?.collapse()
    }
  }
  return (
    <div className="h-dvh w-screen overflow-hidden">
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          setLayout(JSON.stringify(sizes))
        }}
        className="h-full items-stretch transition-all duration-300"
      >
        <ResizablePanel
          ref={ref}
          defaultSize={defaultLayout[0]}
          collapsedSize={NAV_COLLAPSED_SIZE}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true)
          }}
          onResize={() => {
            setIsCollapsed(false)
          }}
          className={cn(
            "hidden h-dvh !max-w-[330px] lg:block",
            isCollapsed &&
            "min-w-[50px] transition-all duration-300",
          )}
        >
          <Sidebar isCollapsed={isCollapsed} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={defaultLayout[2]} minSize={30} className="my-2 mr-2 overflow-hidden transition-all duration-300">
          <div className="flex h-screen flex-col">
            <Header handleNavCollapse={handleNavCollapse} />
            <ScrollArea className="flex-auto overflow-x-auto p-8 pt-6">
              <main>
                <Outlet />
              </main>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
