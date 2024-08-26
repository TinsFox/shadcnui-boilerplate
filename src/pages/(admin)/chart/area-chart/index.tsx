import * as React from "react"
import { Suspense } from "react"

import { ChartDisplay } from "@/components/chart/chart-display"
import { ChartsNav } from "@/components/chart/charts-nav"
import { ThemesSwitcher } from "@/components/themes-selector"
import { ThemesStyle } from "@/components/themes-styles"
import { Separator } from "@/components/ui/separator"
import { THEMES } from "@/lib/themes"

const components = import.meta.glob("./components/**")

export function Component() {
  const [chartModules, setChartModules] = React.useState<
    Record<string, { component: React.FC; description: string }>
  >({})

  React.useEffect(() => {
    const loadCharts = async () => {
      const modules = await Promise.all(
        Object.entries(components).map(async ([path, chart]) => {
          const mod = (await chart()) as {
            Component: React.FC
            description: string
          }
          return { path, ...mod }
        })
      )
      const chartMap = Object.fromEntries(
        modules.map(({ path, Component: component, description }) => [
          path,
          { component, description },
        ])
      )
      setChartModules(chartMap)
    }

    loadCharts()
  }, [])
  return (
    <div className="grid gap-4">
      <ChartsNav className="[&>a:first-child]:bg-muted [&>a:first-child]:font-medium [&>a:first-child]:text-primary" />
      <ThemesStyle />
      <div className="gap-6 md:flex md:flex-row-reverse md:items-start">
        <ThemesSwitcher
          themes={THEMES}
          className="fixed inset-x-0 bottom-0 z-40 flex bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:sticky lg:bottom-auto lg:top-20"
        />
        <div className="grid flex-1 gap-12">
          <h2 className="sr-only">Examples</h2>
          <div
            id="examples"
            className="grid items-start flex-1 gap-10 scroll-mt-20 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
          >
            {Object.entries(chartModules).map(([path, prop]) => {
              const { component: ChartComponent, description } = prop
              return (
                <div key={path} className="p-4">
                  <h3 className="text-lg font-semibold">{path}</h3>
                  <p>{description}</p>
                  <Suspense fallback={<div>Loading...</div>}>
                    <ChartComponent />
                  </Suspense>
                </div>
              )
            })}
          </div>
          <Separator />
        </div>
      </div>
    </div>
  )
}
