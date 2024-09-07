# 常见问题

## 为什么使用 `vite`

因为用习惯了，但是有可能会尝试一下 [rsbuild](https://rsbuild.dev/)

## 为什么是 `ofetch`

因为 **Type Friendly** article 可以直接获得类型，`axios` 还需要处理拦截器

```ts
const article = await ofetch<Article>(`/api/article/${id}`);

```

## 为什么是 `react-query`

`swr` 的 条件请求数据的写法我不喜欢

> https://swr.vercel.app/zh-CN/docs/conditional-fetching

```ts
// 有条件的请求
const { data } = useSWR(shouldFetch ? '/api/data' : null, fetcher)

// ...或返回一个 falsy 值
const { data } = useSWR(() => shouldFetch ? '/api/data' : null, fetcher)

// ... 或在 user.id 未定义时抛出错误
const { data } = useSWR(() => '/api/data?uid=' + user.id, fetcher)
```

## 为什么是 `react-router`

1. 因为看到 [Innei](https://github.com/innei) 实现了基于 `react-router` 的文件路由。
2. 简单用过 `TanStack Router`，但是 `TanStack Router` 的 API 与 `React Router` 不兼容，用起来不习惯，所以还是换回来了。
3. 而且期待一手 `react-router@v7` 的 文件路由
4. 让子弹飞一会儿，`TanStack Router` 之后的几个版本可能会尝试一下，或者是等 `react-router@v7` 的 文件路由


## 会不会有 Next.js 版本

因为我目前在写 Electron 应用，用到的是 SPA，把需要用到的东西给开源出来了

可能会有，但是短期内不会，因为需要去做一些别的事情，当前我只需要 SPA 版本

但是在写的过程中发现，还是需要一些服务端的能力会比较方便，等我有需要的时候，我会去实现一个 Next.js 版本的
