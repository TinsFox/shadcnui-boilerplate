# 路由

shadcnui-boilerplate 使用 **基于文件系统的路由** 来定义路由。

这个功能由 [Innei](https://github.com/innei) 实现，源码在这里 [传送门](https://github.com/innei-template/vite-react-tailwind-template/blob/master/src/utils/route-builder.ts)。感谢 **Innei** ！

`route-builder` 使用 `react-router@v6` 与 `Vite` 的 [Glob Import](https://cn.vitejs.dev/guide/features#glob-import) 实现。

::: details 为什么使用 `React Router` 而不是 `TanStack Router`？

> 1. 简单用过，但是 `TanStack Router` 的 API 与 `React Router` 不兼容，用起来不习惯，所以还是换回来了。
> 2. 而且期待一手 `react-router@v7` 的 文件路由
> 3. 让子弹飞一会儿

:::

## 创建路由

默认使用 `pages` 目录来存放页面，每个文件夹代表一个路由段，映射到 URL 段。要创建嵌套路由，可以将文件夹嵌套在一起。

例如，`pages/home/index.tsx` 对应的路由是 `/home`，`pages/home/about.tsx` 对应的路由是 `/home/about`。

## 页面

文件中的内容写法遵循 `react-router` 的写法。

例如：

```tsx
// pages/home/index.tsx
export const loader = async () => {
  return {
    message: "Hello World"
  }
}

export const Component = () => {
  const { message } =  useLoaderData() as Awaited<ReturnType<typeof loader>>
  return <div>{message}</div>
}
```

## 布局

在实际开发中，我们经常需要使用到嵌套布局，比如在 `/dashboard` 页面下，我们可能需要使用到 `Sidebar` 布局，在 `/dashboard/home` 页面下，我们可能需要使用到 `Header` 布局。

`route-builder` 支持嵌套路由，并且会自动生成嵌套路由的布局。在文件夹下创建 `layout.tsx` 文件，即可定义该文件夹下的布局。

例如：

```tsx
// pages/home/layout.tsx
export const Component = () => {
  return <div>Layout</div>
}
```

## 嵌套路由

