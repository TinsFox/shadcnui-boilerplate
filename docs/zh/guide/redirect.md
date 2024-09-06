# 重定向

假设，我们登录了之后，我们希望跳转到 `/dashboard` 中，但是，希望可以去到 `/dashboard/overview` 页面，我们可以使用 `redirect` 来实现。

```tsx
// src/dashboard/index.tsx
import { redirect } from "react-router-dom"

export function loader() {
  return redirect("/dashboard/overview")
}

export function Component() {
  return null
}
```
