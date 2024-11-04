# Dynamic Routes

## Dynamic Routes

Dynamic routes are defined by the file name.

For example, if you have a file named `[id].tsx`, it will be treated as a dynamic route.

## Dynamic Routes with Params

If you don't know the exact segment name beforehand and want to create routes from dynamic data, you can use dynamic segments that are filled at request time or pre-rendered at build time.

You can create dynamic segments by enclosing the folder name in square brackets: `[folderName]`. For example, `[id]` or `[slug]`.

For example, we have the following directory structure:

```
pages
  - users
    - [id ].tsx
```

`pages/users/[id].tsx` corresponds to the route `/users/:id`

- In `pages/users/[id].tsx`, we can use `useParams` to get the `id` parameter

```tsx
import { useParams } from "react-router"

export function Component() {
  const { id } = useParams()
  return <div>User: {id}</div>
}
```

| Route | URL Example | `params` |
| --- | --- | --- |
| `/users/1` | `pages/users/[id].tsx` | `{ id: '1' }` |
| `/users/2` | `pages/users/[id].tsx` | `{ id: '2' }` |
| `/users/3` | `pages/users/[id].tsx` | `{ id: '3' }` |

## Dynamic Routes with Layouts

If we add a layout to `pages/users/[id].tsx`, this layout will be applied to all user pages.

```
pages
  - user
    - [id]
      - index.tsx
      - layout.tsx
```


