import { describe, expect, it } from "vitest"

import { cn } from "./utils"

describe("cn utility", () => {
  it("merges class names correctly", () => {
    const result = cn("base-class", "additional", { conditional: true })
    expect(result).toBe("base-class additional conditional")
  })
})
