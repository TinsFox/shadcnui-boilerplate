import { NavLink } from "react-router-dom"

import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/ui/scroll-area"

const links = [
  {
    name: "Area Chart",
    href: "/charts/area-chart",
  },
  {
    name: "Bar Chart",
    href: "/charts/bar-chart",
  },
  {
    name: "Line Chart",
    href: "/charts/line-chart",
  },
  {
    name: "Pie Chart",
    href: "/charts/pie-chart",
  },
  {
    name: "Radar Chart",
    href: "/charts/radar-chart",
  },
  {
    name: "Radial Chart",
    href: "/charts/radial-chart",
  },
  {
    name: "Tooltip",
    href: "/charts/tooltip",
  },
]

export function ChartsNav({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <ScrollArea className="max-w-[600px] lg:max-w-none">
      <div className={cn("flex items-center space-x-2", className)} {...props}>
        {links.map((example) => (
          <NavLink
            to={example.href}
            key={example.href}
            className={({ isActive }) =>
              cn(
                "flex h-7 shrink-0 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary",
                isActive ?
                  "bg-muted font-medium text-primary" :
                  "text-muted-foreground",
              )}
          >
            {example.name}
          </NavLink>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="invisible" />
    </ScrollArea>
  )
}
