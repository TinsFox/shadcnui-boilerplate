import type { Column } from "@tanstack/react-table"
import type { CSSProperties } from "react"

export const DEFAULT_PAGINATION_STEP = 3
export const DEFAULT_PAGE_INDEX = 0
export const DEFAULT_PAGE_SIZE = 10
export function getCommonPinningStyles<T = unknown>(column: Column<T>): CSSProperties {
  const isPinned = column.getIsPinned()
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left")
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right")

  return {
    boxShadow: isLastLeftPinnedColumn ?
      "-4px 0 4px -4px hsl(var(--foreground) / 0.1) inset" :
      isFirstRightPinnedColumn ?
        "4px 0 4px -4px hsl(var(--foreground) / 0.1) inset" :
        undefined,
    backgroundColor: isPinned ? "hsl(var(--background))" : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  }
}
