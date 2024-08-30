import docker from "@/assets/logo/docker.svg"
import eslint from "@/assets/logo/eslint.svg"
import fakerJS from "@/assets/logo/faker.svg"
import github from "@/assets/logo/github.svg"
import msw from "@/assets/logo/msw.svg"
import playwright from "@/assets/logo/playwright.svg"
import radixUI from "@/assets/logo/radix.svg"
import react from "@/assets/logo/react.svg"
import shadcnUI from "@/assets/logo/shadcn-ui.svg"
import tailwind from "@/assets/logo/tailwind.svg"
import testingLibrary from "@/assets/logo/testing-library.png"
import typescript from "@/assets/logo/typescript.svg"
import vitest from "@/assets/logo/vitest.svg"
import zod from "@/assets/logo/zod.svg"

interface ILogo {
  src: string
  name: string
  href: string
  column: 1 | 2 | 3 | 4 | 5
  row: 1 | 2 | 3 | 4 | 5 | 6
}

export const logos: ILogo[] = [
  {
    src: react,
    name: "React",
    href: "https://react.dev",
    column: 1,
    row: 1,
  },
  {
    src: zod,
    name: "Zod",
    href: "https://zod.dev/",
    column: 1,
    row: 2,
  },
  {
    src: github,
    name: "GitHub",
    href: "https://github.com",
    column: 1,
    row: 3,
  },
  {
    src: tailwind,
    name: "Tailwind CSS",
    href: "https://tailwindcss.com",
    column: 2,
    row: 2,
  },
  {
    src: radixUI,
    name: "Radix UI",
    href: "https://www.radix-ui.com/",
    column: 2,
    row: 3,
  },
  {
    src: shadcnUI,
    name: "shadcn/ui",
    href: "https://ui.shadcn.com/",
    column: 2,
    row: 4,
  },
  {
    src: playwright,
    name: "Playwright",
    href: "https://playwright.dev/",
    column: 3,
    row: 3,
  },
  {
    src: msw,
    name: "MSW",
    href: "https://mswjs.io",
    column: 3,
    row: 4,
  },
  {
    src: fakerJS,
    name: "Faker.js",
    href: "https://fakerjs.dev/",
    column: 3,
    row: 5,
  },
  {
    src: vitest,
    name: "Vitest",
    href: "https://vitest.dev",
    column: 4,
    row: 1,
  },
  {
    src: testingLibrary,
    name: "Testing Library",
    href: "https://testing-library.com",
    column: 4,
    row: 2,
  },
  {
    src: docker,
    name: "Docker",
    href: "https://www.docker.com",
    column: 4,
    row: 3,
  },
  {
    src: typescript,
    name: "TypeScript",
    href: "https://typescriptlang.org",
    column: 5,
    row: 4,
  },
  // {
  //   src: prettier,
  //   alt: "Prettier",
  //   href: "https://prettier.io",
  //   column: 5,
  //   row: 3,
  // },
  {
    src: eslint,
    name: "ESLint",
    href: "https://eslint.org",
    column: 5,
    row: 3,
  },
]
