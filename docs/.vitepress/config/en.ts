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
      // {
      //   text: "Reference",
      //   link: "/reference/project-config",
      //   activeMatch: "/reference/",
      // },
      {
        text: pkg.version,
        link: ``,
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
        { text: "FAQ", link: "faq" },
      ],
    },
    {
      text: "Routing",
      collapsed: false,
      items: [
        { text: "Routing", link: "routing" },
        { text: "Page", link: "page" },
        { text: "Layout", link: "layout" },
        { text: "Redirect", link: "redirect" },
        { text: "Route Group", link: "route-group" },
      ],
    },
    {
      text: "State Management",
      collapsed: false,
      items: [
        { text: "Data Fetching", link: "data-fetching" },
        { text: "State Management", link: "state-management" },
      ],
    },
    {
      text: "Config",
      collapsed: false,
      items: [
        { text: "Environment Variables", link: "environment-variables" },
        { text: "Theme", link: "theme" },
      ],
    },
    {
      text: "Deploy",
      collapsed: false,
      link: "/deploy",
    },
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
