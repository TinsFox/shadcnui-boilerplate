import type { DefaultTheme } from "vitepress";
import { defineConfig } from "vitepress";

import * as pkg from "../../../package.json";
import { githubLink } from "./shared";

export const zh = defineConfig({
	lang: "zh-CN",
	title: "shadcn/ui boilerplate",
	description:
		"一个现代化的、可扩展的样板项目，用于使用 React、Tailwind CSS 和 Radix UI 构建美丽的、响应式的网络应用程序。",
	themeConfig: {
		nav: [
			{
				text: "指南",
				link: "/zh/guide/what-is-shadcn-ui-boilerplate",
				activeMatch: "/zh/guide/",
			},
			// {
			//   text: "参考",
			//   link: "/zh/reference/project-config",
			//   activeMatch: "/zh/reference/",
			// },
			{
				text: pkg.version,
				link: "",
			},
		],

		sidebar: {
			"/zh/guide/": { base: "/zh/guide/", items: sidebarGuide() },
			"/zh/reference/": { base: "/zh/reference/", items: sidebarReference() },
		},
		socialLinks: [{ icon: "github", link: githubLink }],
		docFooter: {
			prev: "上一页",
			next: "下一页",
		},
		outline: {
			label: "页面导航",
		},
		lastUpdated: {
			text: "最后更新于",
			formatOptions: {
				dateStyle: "short",
				timeStyle: "medium",
			},
		},
		langMenuLabel: "多语言",
		returnToTopLabel: "回到顶部",
		sidebarMenuLabel: "菜单",
		darkModeSwitchLabel: "主题",
		lightModeSwitchTitle: "切换到浅色模式",
		darkModeSwitchTitle: "切换到深色模式",
	},
});

function sidebarGuide(): DefaultTheme.SidebarItem[] {
	return [
		{
			text: "介绍",
			collapsed: false,
			items: [
				{
					text: "什么是 shadcn/ui boilerplate?",
					link: "what-is-shadcn-ui-boilerplate",
				},
				{ text: "快速开始", link: "getting-started" },
				{ text: "常见问题", link: "faq" },
			],
		},
		{
			text: "路由",
			collapsed: false,
			items: [
				{ text: "路由", link: "routing" },
				{ text: "页面", link: "page" },
				{ text: "布局", link: "layout" },
				{ text: "重定向", link: "redirect" },
				{ text: "路由分组", link: "route-group" },
			],
		},
		{
			text: "数据流",
			collapsed: false,
			items: [
				{ text: "数据请求", link: "data-fetching" },
				{
					text: "状态管理",
					link: "state-management",
				},
			],
		},
		{
			text: "配置",
			collapsed: false,
			items: [
				{ text: "环境变量", link: "environment-variables" },
				{ text: "主题", link: "theme" },
			],
		},
		{
			text: "部署",
			link: "/deploy",
		},
	];
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
	return [
		{
			text: "参考",
			items: [{ text: "项目配置", link: "project-config" }],
		},
	];
}
