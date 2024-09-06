# 快速开始

## 安装

### 先决条件

- Node.js: v20.12.2 或更高版本
- pnpm: v9.1.0 或更高版本

### 克隆仓库

```bash
git clone https://github.com/TinsFox/shadcnui-boilerplate.git
```


### 安装依赖

```bash
cd shadcnui-boilerplate
pnpm install
```

### 开发

```bash
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 就可以看到项目运行的结果了 ~

随便输入一个账号密码，就可以登录了 ~ 🚀

> [!WARNING]
> 此时，API 接口是代理到本地 mock 接口的，所以你看到的接口数据都是假的。
> 如果需要使用真实接口，请参考 [环境变量](./environment-variables.md) 进行配置。
> `VITE_ENABLE_MOCK` 设置为 `false` 即可。

## 文件结构

```bash
.
├── .dockerignore
├── .editorconfig
├── .gitignore
├── Dockerfile
├── LICENSE
├── README.md
├── README-zh_CN.md
├── CONTRIBUTING.md
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── src/
│   ├── assets/
│   │   ├── logo/
│   │   │   ├── eslint.svg
│   │   │   └── faker.svg
│   │   └── stories/
│   │       └── assets/
│   │           └── tutorials.svg
│   ├── components/
│   ├── constants/
│   │   └── index.ts
│   ├── global.d.ts
│   ├── i18n/
│   │   └── locales/
│   │       └── zh-CN.json
│   ├── lib/
│   │   └── route-builder.ts
│   ├── pages/
│   │   ├── (admin)/
│   │   │   └── (with-layout)/
│   │   │       └── list/
│   │   │           ├── data/
│   │   │           │   ├── schema.ts
│   │   │           │   └── tasks.json
│   │   │           └── index.tsx
│   │   └── (main)/
│   │       └── index.tsx
│   ├── styles/
│   │   ├── dev.css
│   │   └── tailwind.css
│   └── stories/
│       └── Configure.mdx
└── .storybook/
    └── main.ts
```

根目录包含基本配置文件和文档。

- Dockerfile: 用于构建 Docker 镜像的指令。
- **README.md**: 项目的概述和说明。
- **package.json**: 列出项目的依赖和脚本。
- **tsconfig.json**: TypeScript 配置文件。
- **vite.config.ts**: Vite 的配置文件。
- **src/**: 主源代码目录。
- **assets/**: 包含项目中使用的图像和 SVG 文件。
- **components/**: 放置可重用的 UI 组件。
- **constants/**: 存放常量值和配置。
- **global.d.ts**: 全局变量类型定义。
- **i18n/**: 国际化文件。
- **lib/**: 实用函数和库。
- **pages/**: 包含页面组件，按路由组织。
- **styles/**: 应用程序的 CSS 文件。
- **stories/**: 用于开发和测试 UI 组件的 Storybook 文件。
- **.storybook/**: Storybook 的配置。

## 下一步

- 要了解更多关于 `shadcn/ui`，请参考 [官方文档](https://ui.shadcn.com/docs)。
- 要创建新页面，请参考 [路由指南](./routing.md)。
- 要了解更多关于环境变量的信息，请参考 [环境变量指南](./environment-variables.md)。
- 一旦您的应用程序准备投入生产，请参考 [部署指南](./deploy.md)。

> [!IMPORTANT]
> [常见问题](./faq.md)
