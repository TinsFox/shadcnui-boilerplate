import { Link, Outlet, useLoaderData } from "react-router-dom"

import { Announcement } from "@/components/announcement"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layout/page-header"
import { ThemesSwitcher } from "@/components/theme/themes-selector"
import { Button } from "@/components/ui/button"
import { THEMES } from "@/lib/themes"

import { ChartsNav } from "../charts-nav"

export const loader = async ({
  params,
}: {
  request: Request
  params: { chartName: string }
}) => {
  const { chartName } = params

  return {
    chartName,
  }
}

export function Component() {
  const { chartName } = useLoaderData() as Awaited<ReturnType<typeof loader>>

  return (
    <div className="relative">
      <PageHeader>
        <Announcement />
        <PageHeaderHeading>Beautiful Charts</PageHeaderHeading>
        <PageHeaderDescription>
          Built using Recharts. Copy and paste into your apps. Open Source.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild size="sm">
            <a href="#charts">Browse Charts</a>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link target="_blank" to="https://ui.shadcn.com/docs/components/chart">Documentation</Link>
          </Button>
        </PageActions>
      </PageHeader>
      <section id="charts" className="scroll-mt-20">
        <div className="sticky -top-6 z-50 bg-background py-5">
          <ChartsNav />
        </div>
        <div className="grid gap-4">
          <div className="gap-6 md:flex md:flex-row-reverse md:items-start">
            <ThemesSwitcher
              themes={THEMES}
              className="fixed inset-x-0 bottom-0 z-40 flex bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:sticky lg:bottom-auto lg:top-20"
            />
            <div className="grid flex-1 gap-12">
              <h2 className="sr-only">{chartName}</h2>
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
