# Poketto CLI

## 目录

- [Poketto CLI](#poketto-cli)
  - [目录](#目录)
  - [简介](#简介)
    - [核心特性](#核心特性)
  - [安装](#安装)
  - [使用方法](#使用方法)
  - [配置选项](#配置选项)
  - [常用场景](#常用场景)
    - [预览变更](#预览变更)
    - [CI/CD 自动化](#cicd-自动化)
    - [文件过滤](#文件过滤)
  - [工作空间支持](#工作空间支持)
  - [最佳实践](#最佳实践)
  - [故障排除](#故障排除)
  - [许可证](#许可证)

## 简介

Poketto CLI 是一个专为 monorepo 项目设计的命令行工具，它可以简化在整个代码库中重命名组织名称的过程。当你需要将项目从 `@old-org/package` 重命名为 `@new-org/package` 时，手动更新所有引用可能既耗时又容易出错。本工具能自动执行这个过程，保持包之间的依赖关系和代码引用的一致性。

### 核心特性

- ✨ 自动识别工作空间结构
- 📦 批量更新 package.json
- 🔄 智能更新代码引用
- 👀 变更预览功能
- 🎯 精确的文件过滤

## 安装

```bash
# npm
npm install -g @poketto/cli

# yarn
yarn global add @poketto/cli

# pnpm
pnpm add -g @poketto/cli
```

## 使用方法

在工作空间根目录执行：

```bash
poketto rename <old-name> <new-name>
```

示例：

```bash
poketto rename @company @newcompany
```

## 配置选项

```bash
用法: poketto rename <old-name> <new-name> [选项]

参数:
  old-name               原组织名称
  new-name              新组织名称

选项:
  -d, --dry-run         预览模式，不实际修改文件
  -y, --yes            跳过确认步骤
  --include <globs>     包含的文件 (glob 模式)
  --exclude <globs>     排除的文件 (glob 模式)
  -v, --verbose         输出详细日志
  -s, --silent         静默模式
  -h, --help           显示帮助信息
```

## 常用场景

### 预览变更

```bash
poketto rename @old-name @new-name --dry-run
```

### CI/CD 自动化

```bash
poketto rename @old-name @new-name --yes
```

### 文件过滤

```bash
# 仅处理 TypeScript 文件
poketto rename @old-name @new-name --include "**/*.{ts,tsx}"

# 排除测试文件
poketto rename @old-name @new-name --exclude "**/*.test.ts"
```

## 工作空间支持

支持主流工作空间方案：

- pnpm Workspaces
- Yarn Workspaces
- npm Workspaces
- Lerna
- Nx

## 最佳实践

1. 执行前备份：
```bash
git checkout -b rename/org
git add -A
git commit -m "chore: backup before rename"
```

2. 分步执行：
```bash
# 第一步：更新 package.json
poketto rename @old-name @new-name --include "**/package.json"

# 第二步：更新源码引用
poketto rename @old-name @new-name --include "src/**/*.ts"
```

## 故障排除

**Q: 找不到工作空间?**
A: 确保在根目录执行，且存在工作空间配置文件

**Q: 部分引用未更新?**
A: 使用 `--verbose` 查看处理详情，检查过滤规则

**Q: 性能问题?**
A: 通过 `--include` 缩小扫描范围：
```bash
poketto rename @old-name @new-name --include "src/**/*" --exclude "**/dist/**"
```

## 许可证

MIT
