import type { RouteConfig } from "@react-router/dev/routes"
import { index, layout, prefix, route } from "@react-router/dev/routes"

export default [
  route("login", "routes/login/index.tsx"),
  layout("routes/main/layout.tsx", [
    index("routes/main/index.tsx"),
  ]),

  layout("routes/dashboard/layout.tsx", [
    ...prefix("dashboard", [
      index("routes/dashboard/index.tsx"),
      route("overview", "routes/dashboard/overview/index.tsx"),
      route("analysis", "routes/dashboard/analysis/index.tsx"),
      route("workplace", "routes/dashboard/workplace/index.tsx"),
    ]),
    ...prefix("form", [
      index("routes/form/index.tsx"),
      route("basic-form", "routes/form/basic-form/index.tsx"),
      route("step-form", "routes/form/step-form/index.tsx"),
      route("advanced-form", "routes/form/advanced-form/index.tsx"),
    ]),
    ...prefix("list", [
      index("routes/list/index.tsx"),
      route("data-table", "routes/list/data-table/index.tsx"),
      route("pro-table", "routes/list/pro-table/index.tsx"),
      route("table-list", "routes/list/table-list/index.tsx"),
      route("card-list", "routes/list/card-list.tsx"),
    ]),
    ...prefix("settings", [
      layout("routes/settings/layout.tsx", [
        index("routes/settings/index.tsx"),
        route("profile", "routes/settings/profile.tsx"),
        route("account", "routes/settings/account.tsx"),
        route("notifications", "routes/settings/notifications.tsx"),
        route("appearance", "routes/settings/appearance.tsx"),
        route("display", "routes/settings/display.tsx"),
        route("theme", "routes/settings/theme/index.tsx"),
      ]),
    ]),
    ...prefix("charts", [
      layout("routes/charts/layout.tsx", [
        index("routes/charts/index.tsx"),
        route(":chartId", "routes/charts/chart/index.tsx"),
      ]),
    ]),
    ...prefix("system", [
      index("routes/system/index.tsx"),
      route("about", "routes/system/about.tsx"),
    ]),
  ]),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig
