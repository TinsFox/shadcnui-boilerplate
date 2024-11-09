import type { Meta, StoryObj } from "@storybook/react"

import type { Person } from "./__stories__/data"
import { basicColumns, basicData } from "./__stories__/data"
import { ProTable } from "./index"
import type { ColumnDef } from "./types"

const meta = {
  title: "Components/ProTable",
  component: ProTable.Root,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ProTable.Root<Person, unknown>>

export default meta
type Story = StoryObj<typeof meta>

// 使用完整 ProTable 的示例
export const Default: Story = {
  args: {
    columns: basicColumns as ColumnDef<unknown>[],
    data: basicData,
    isLoading: false,
  },
}

// 导出其他示例
export { composedStory as Composed } from "./__stories__/composed"
export { customLayoutStory as CustomLayout } from "./__stories__/custom-layout"
export { loadingStory as Loading } from "./__stories__/loading"
export { minimalStory as Minimal } from "./__stories__/minimal"
