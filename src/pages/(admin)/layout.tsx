import { Outlet, redirect } from "react-router-dom"

import { AppSidebar } from "@/components/app-sidebar"
import { NavBreadcrumb } from "@/components/nav-breadcrumb"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { queryUser } from "@/hooks/query/use-user"
import { queryClient } from "@/lib/query-client"

export const loader = async () => {
  const userData = await queryClient.ensureQueryData(queryUser())
  if (!userData) {
    return redirect("/login")
  }
  return userData
}

export function Component() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 bg-background">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <NavBreadcrumb />
          </div>
        </header>

        <ScrollArea className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  )
}
