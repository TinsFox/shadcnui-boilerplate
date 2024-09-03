import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

import { Sidebar } from "."

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="flex lg:hidden"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="max-w-xs pr-0">
        <SheetTitle className="sr-only">Mobile Nav</SheetTitle>
        <SheetDescription className="sr-only">Mobile Nav</SheetDescription>
        <Sidebar isCollapsed={false} />
      </SheetContent>
    </Sheet>
  )
}
