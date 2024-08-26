import { Link, Outlet } from "react-router-dom"

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"

export function Component() {
  return (
    <>
      <PageHeader>
        {/* <Announcement /> */}
        <PageHeaderHeading>Beautiful Charts</PageHeaderHeading>
        <PageHeaderDescription>
          Built using Recharts. Copy and paste into your apps. Open Source.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild size="sm">
            <a href="#charts">Browse Charts</a>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link to="/docs/components/chart">Documentation</Link>
          </Button>
        </PageActions>
      </PageHeader>
      <section id="charts" className="scroll-mt-20">
        <Outlet />
      </section>
    </>
  )
}
