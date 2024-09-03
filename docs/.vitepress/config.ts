import type { DefaultTheme } from "vitepress"
import { defineConfig } from "vitepress"

const pkg = require("../../package.json")

const githubLink = "https://github.com/TinsFox/shadcnui-boilerplate"
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "shadcn/ui boilerplate",
  description: "A boilerplate build with shadcn/ui",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
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
