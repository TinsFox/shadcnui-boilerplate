import { atomWithStorage } from "jotai/utils"

import { DEFAULT_LAYOUT } from "@/constants"

export const layoutAtom = atomWithStorage<string | null>(
  "layout",
  JSON.stringify(DEFAULT_LAYOUT),
)

export const isCollapsedAtom = atomWithStorage<boolean>("collapsed", false)
