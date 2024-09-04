import type { DefaultTheme } from "vitepress"
import { defineConfig } from "vitepress"

import * as pkg from "../../../package.json"
import { githubLink } from "./shared"

export const en = defineConfig({
  title: "shadcn/ui Boilerplate",
  description: "A boilerplate built with shadcn/ui for rapid development of modern web applications.",
  themeConfig: {
    nav: [
      {
        text: "Guide",
        link: "/guide/what-is-shadcn-ui-boilerplate",
        activeMatch: "/guide/",
      },
      {
        text: "Reference",
        link: "/reference/project-config",
        activeMatch: "/reference/",
      },
      {
        text: pkg.version,
        items: [
          {
            text: "Changelog",
            link: `${githubLink}/blob/main/CHANGELOG.md`,
          },
          {
            text: "Contributing",
            link: `${githubLink}/blob/main/.github/contributing.md`,
          },
        ],
      },
    ],

    sidebar: {
      "/guide/": { base: "/guide/", items: sidebarGuide() },
      "/reference/": { base: "/reference/", items: sidebarReference() },
    },
    socialLinks: [
      { icon: "github", link: githubLink },
    ],
  },
})

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Introduction",
      collapsed: false,
      items: [
        { text: "What is shadcn/ui boilerplate?", link: "what-is-shadcn-ui-boilerplate" },
        { text: "Getting Started", link: "getting-started" },
        { text: "Routing", link: "routing" },
        { text: "Deploy", link: "deploy" },
      ],
    },
    { text: "Config Reference", base: "/reference/", link: "project-config" },
  ]
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Reference",
      items: [
        { text: "Project Config", link: "project-config" },
      ],
    },
  ]
}
