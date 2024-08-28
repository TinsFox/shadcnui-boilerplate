import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

import type { Style } from "./styles"
import type { Theme } from "./themes"

type Config = {
  style: Style["name"]
  theme: Theme["name"]
  radius: number
}

const configAtom = atomWithStorage<Config>("config", {
  style: "new-york",
  theme: "zinc",
  radius: 0.5,
})

export function useConfig() {
  return useAtom(configAtom)
}
