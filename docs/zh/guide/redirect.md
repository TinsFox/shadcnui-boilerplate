# 重定向

假设，我们登录了之后，我们希望跳转到 `/dashboard` 中，但是，希望可以去到 `/dashboard/overview` 页面，我们可以

## `redirect`

```tsx
// src/dashboard/index.tsx
import { redirect } from "react-router"

export function loader() {
  return redirect("/dashboard/overview")
}

export function Component() {
  return null
}
```

### `<Navigate/>`

```tsx
// src/dashboard/index.tsx
import { Navigate } from "react-router"


export function Component() {
  return <Navigate to="/dashboard/overview" replace={true} />
}
```

