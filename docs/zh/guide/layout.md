# 布局

在一些页面中，我们需要共享一部分 UI，在这里，我们约定使用 `layout.tsx`  来实现。

- `layout.tsx` 用于定义布局

```tsx

// src/dashboard/layout.tsx
import { Outlet } from "react-router-dom";

export function Component() {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav></nav>
      <Outlet />
    </section>
  )
}
```

```tsx
// src/dashboard/settings/page.tsx
export function Component() {
  return <div>Settings</div>
}
```

上述的布局文件，会渲染成如下的页面：

- `/dashboard` 页面会渲染成 `DashboardLayout` 组件
- `/dashboard/settings` 页面会渲染成 `DashboardLayout` 组件，并且 `Outlet` 会被替换为 `SettingsPage` 组件
