# 路由

shadcnui-boilerplate 使用 **基于文件系统的路由** 来定义路由。

这个功能由 [Innei](https://github.com/innei) 实现，源码在这里 [传送门](https://github.com/innei-template/vite-react-tailwind-template/blob/master/src/utils/route-builder.ts)。感谢 **Innei** ！

`route-builder` 使用 `react-router@v6` 与 `Vite` 的 [Glob Import](https://cn.vitejs.dev/guide/features#glob-import) 实现。

::: details 为什么使用 `React Router` 而不是 `TanStack Router`？

> 1. 简单用过，但是 `TanStack Router` 的 API 与 `React Router` 不兼容，用起来不习惯，所以还是换回来了。
> 2. 而且期待一手 `react-router@v7` 的 文件路由
> 3. 让子弹飞一会儿

:::


> [!TIP]
> 默认使用 `pages` 目录来存放页面

## 创建路由

- 每个目录代表一个路由
  - `pages/home/index.tsx` 对应的路由是 `/home`
  - `pages/home/about.tsx` 对应的路由是 `/home/about`
- [嵌套路由](./route-group.md)



## 创建 UI

要创建第一个页面，请在应用程序目录中添加 index.tsx 文件并导出 React 组件：

> [!IMPORTANT]
> 注意，组件名称必须为 `Component`，否则无法识别生成页面

```tsx
// src/pages/index.tsx
export const Component = () => {
  return <div>Hello, shadcn/ui boilerplate</div>
}
```

