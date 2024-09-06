# 路由组

参考文档 [Next.js Route Groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups)


在 `pages` 目录下，我们可以使用 `(folderName)` 来实现路由组。

这经常用于
- 将路由组织成组，例如按页面的用途、类型等
- 共享布局

> [!IMPORTANT]
> 在 `pages` 目录下，`(folderName)` 目录下的文件会被视为路由组

## 布局

路由组布局可以放在 `(folderName)/layout.tsx` 中

```tsx
// src/pages/(admin)/layout.tsx
import { Outlet } from "react-router-dom"

export function Component() {
  return (
    <section>
      {/* 布局内容 */}
      <nav></nav>
      <Outlet />
    </section>
  )
}
```


