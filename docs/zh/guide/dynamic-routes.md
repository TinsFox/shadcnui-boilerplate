# 动态路由

如果你事先不知道确切的分段名称，并且想要从动态数据创建路由，则可以使用在请求时填写或在构建时预呈现的动态分段。

可以通过将文件夹名称括在方括号中来创建动态区段：[folderName]。例如，[id] 或 [slug]。


例如，我们有如下的目录结构：

```
pages
  - users
    - [id ].tsx
```

`pages/users/[id].tsx` 对应的路由是 `/users/:id`

- 在 `pages/users/[id].tsx` 中，我们可以使用 `useParams` 来获取 `id` 参数

```tsx
import { useParams } from "react-router-dom"

export function Component() {
  const { id } = useParams()
  return <div>User: {id}</div>
}
```

| 路由 | url 示例 | `params` |
| --- | --- | --- |
| `/users/1` | `pages/users/[id].tsx` | `{ id: '1' }` |
| `/users/2` | `pages/users/[id].tsx` | `{ id: '2' }` |
| `/users/3` | `pages/users/[id].tsx` | `{ id: '3' }` |

## 带有布局

如果我们在 `pages/users/[id].tsx` 中添加一个布局，那么这个布局会应用到所有的用户页面。

```
pages
  - user
    - [id]
      - index.tsx
      - layout.tsx
```


