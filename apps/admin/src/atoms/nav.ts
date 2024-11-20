import { atomWithStorage } from "jotai/utils"

export const navOpenItemsAtom = atomWithStorage<Record<string, boolean>>("nav-open-items", {})
