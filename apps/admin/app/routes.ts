import {
	type RouteConfig,
	index,
	layout,
	prefix,
	route,
} from "@react-router/dev/routes";

export default [
	index("routes/(main)/index.tsx"),
	route("login", "routes/(external)/login/index.tsx"),
	route("sign-up", "routes/(external)/sign-up/index.tsx"),

	layout("routes/(admin)/layout.tsx", [
		...prefix("dashboard", [
			index("routes/(admin)/dashboard/index.tsx"),
			route("overview", "routes/(admin)/dashboard/overview/index.tsx"),
			route("workplace", "routes/(admin)/dashboard/workplace/index.tsx"),
			route("analysis", "routes/(admin)/dashboard/analysis/index.tsx"),
		]),
		// form
		...prefix("form", [
			index("routes/(admin)/form/index.tsx"),
			route("basic-form", "routes/(admin)/form/basic-form.tsx"),
			route("step-form", "routes/(admin)/form/step-form.tsx"),
			route("advanced-form", "routes/(admin)/form/advanced-form.tsx"),
		]),
		// table
		...prefix("list", [
			index("routes/(admin)/list/index.tsx"),
			route("data-table", "routes/(admin)/list/data-table/index.tsx"),
			route("pro-table", "routes/(admin)/list/pro-table/index.tsx"),
			route("card-list", "routes/(admin)/list/card-list.tsx"),
			route("table-list", "routes/(admin)/list/table-list/index.tsx"),
		]),
		// settings
		...prefix("settings", [
			layout("routes/(admin)/settings/layout.tsx", [
				index("routes/(admin)/settings/index.tsx"),
				route("appearance", "routes/(admin)/settings/appearance.tsx"),
				route("account", "routes/(admin)/settings/account.tsx"),
				// display
				route("display", "routes/(admin)/settings/display.tsx"),
				// notifications
				route("notifications", "routes/(admin)/settings/notifications.tsx"),
				// profile
				route("profile", "routes/(admin)/settings/profile.tsx"),
				// theme
				route("theme", "routes/(admin)/settings/theme/index.tsx"),
			]),
		]),
		// charts
		...prefix("charts", [
			layout("routes/(admin)/charts/layout.tsx", [
				index("routes/(admin)/charts/index.tsx"),
				route(":chartName", "routes/(admin)/charts/chart/index.tsx"),
			]),
		]),
		// result
		...prefix("result", [
			route("success", "routes/(admin)/result/success.tsx"),
			route("fail", "routes/(admin)/result/fail.tsx"),
		]),
		// system
		...prefix("system", [
			index("routes/(admin)/system/index.tsx"),
			route("about", "routes/(admin)/system/about.tsx"),
		]),
	]),
] satisfies RouteConfig;
