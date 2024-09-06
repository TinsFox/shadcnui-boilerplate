# 页面

默认情况下，你可以从 `src/pages` 目录下创建页面。



例如，要创建一个名为 `index` 的页面，可以创建 `src/pages/index.tsx` 文件，并添加以下内容：

```tsx
// src/pages/index.tsx
export  function Component() {
  return <div>Home Page</div>;
}
```

然后，要创建更多页面，只需在 `src/pages` 目录下创建更多文件。例如，要为 `about` 的路由创建页面，可以创建 `src/pages/about.tsx` 文件，并添加以下内容：

```tsx
// src/pages/about.tsx
export  function Component() {
  return <div>About Page</div>;
}
```

> [!TIP]
> 1. 页面组件必须导出为 `Component` 函数，才会被渲染成页面
