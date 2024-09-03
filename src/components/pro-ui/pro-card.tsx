import { CheckIcon, ClipboardIcon, Share, TrendingUp } from "lucide-react"
import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { cn } from "@/lib/utils"

import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { Separator } from "../ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

export interface ProCardProps {
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
  toolbar?: React.ReactNode
  title?: string
}
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]
export function ProCard(props: ProCardProps) {
  const { children, className, style, toolbar } = props
  return (
    <div
      className={cn(
        "group relative flex max-w-xs flex-col overflow-hidden rounded-xl border shadow transition-all duration-200 ease-in-out hover:z-30 hover:scale-105",
        className,
      )}
      style={style}
    >
      <CardToolbar
        toolbar={toolbar}
        title="Area Chart - Stacked"
        className="relative  flex justify-end border-b bg-card px-3 py-2.5 text-card-foreground"
      />
      <div className="relative  [&>div]:rounded-none [&>div]:border-none [&>div]:shadow-none">
        <Card>
          <CardHeader>
            <CardTitle>Area Chart - Stacked</CardTitle>
            <CardDescription>
              Showing total visitors for the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <img className="h-48 w-full rounded-md object-cover transition-all  " src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1024&amp;h=1280&amp;q=80" />
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Trending up by 5.2% this month <TrendingUp className="size-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  January - June 2024
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

interface CardToolbarProps {
  toolbar?: React.ReactNode
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
  title?: React.ReactNode
}
function CardToolbar(props: CardToolbarProps) {
  const [hasCopied, setHasCopied] = React.useState(false)
  const { title, toolbar, className, children, style } = props

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])
  return (
    <div className={cn("flex items-center gap-2", className)} style={style}>
      <div className="flex items-center gap-1.5 pl-1 text-[13px] text-muted-foreground [&>svg]:size-[0.9rem]">
        {title}
      </div>
      <div className="invisible ml-auto flex items-center gap-2 transition-all duration-300 group-hover:visible">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className={cn(
                className,
              )}
              onClick={() => {
                navigator.clipboard.writeText("")
              }}
            >
              <span className="sr-only">Copy</span>
              {hasCopied ? <CheckIcon /> : <ClipboardIcon className="size-3.5" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-black text-white">Copy code</TooltipContent>
        </Tooltip>
        <Separator orientation="vertical" className="mx-0 hidden h-4 md:flex" />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className={cn(
                className,
              )}
              onClick={() => {
                navigator.clipboard.writeText("")
              }}
            >
              <span className="sr-only">Copy</span>
              {hasCopied ? <CheckIcon /> : <Share className="size-3.5" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-black text-white">Share code</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}
