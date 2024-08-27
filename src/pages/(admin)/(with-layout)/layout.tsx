import { Outlet } from "react-router-dom"

import { PageContainer } from "@/components/layout/page-container"

export function Component() {
  return (
    <PageContainer>
      <Outlet />
    </PageContainer>
  )
}
