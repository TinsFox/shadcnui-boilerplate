import path from "node:path";

import fs from "node:fs/promises";
import { glob } from "glob";
import yaml from "js-yaml";
import type { MonorepoType } from "./detector";
import { readJsonFile } from "./utils/file";

/**
 * 表示 monorepo 中的一个包
 */
export interface Package {
	/** 包名称（完整名称，包括组织名） */
	name: string;
	/** 包的版本 */
	version: string;
	/** 包的相对路径（相对于 monorepo 根目录） */
	path: string;
	/** 包的绝对路径 */
	location: string;
	/** 是否是私有包 */
	private?: boolean;
	/** 依赖信息 */
	dependencies: {
		/** 生产依赖 */
		dependencies?: Record<string, string>;
		/** 开发依赖 */
		devDependencies?: Record<string, string>;
		/** 对等依赖 */
		peerDependencies?: Record<string, string>;
	};
}

/**
 * 扫描 monorepo 中的所有包
 * @param repoType monorepo 类型
 * @returns 包列表
 */
export async function scanPackages(repoType: MonorepoType): Promise<Package[]> {
	const rootDir = process.cwd();

	switch (repoType) {
		case "lerna":
			return scanLernaPackages(rootDir);
		case "yarn-workspaces":
			return scanYarnWorkspaces(rootDir);
		case "pnpm":
			return scanPnpmWorkspaces(rootDir);
		case "nx":
			return scanNxWorkspaces(rootDir);
		default:
			throw new Error(`Unsupported monorepo type: ${repoType}`);
	}
}

/**
 * 扫描 Lerna monorepo 中的包
 */
async function scanLernaPackages(rootDir: string): Promise<Package[]> {
	try {
		// 读取 lerna.json 配置
		const lernaConfig = await readJsonFile(path.join(rootDir, "lerna.json"));
		const packages = lernaConfig.packages || ["packages/*"];

		return scanPackagesFromGlobs(rootDir, packages);
	} catch (error) {
		const err = error instanceof Error ? error : new Error(String(error));
		throw new Error(`Failed to scan Lerna packages: ${err.message}`);
	}
}

/**
 * 扫描 Yarn Workspaces monorepo 中的包
 */
async function scanYarnWorkspaces(rootDir: string): Promise<Package[]> {
	try {
		// 读取 package.json 中的 workspaces 配置
		const packageJson = await readJsonFile(path.join(rootDir, "package.json"));

		let workspaces: string[] = [];

		// workspaces 可能是数组或者是包含 packages 属性的对象
		if (Array.isArray(packageJson.workspaces)) {
			workspaces = packageJson.workspaces;
		} else if (
			packageJson.workspaces &&
			Array.isArray(packageJson.workspaces.packages)
		) {
			workspaces = packageJson.workspaces.packages;
		}

		return scanPackagesFromGlobs(rootDir, workspaces);
	} catch (error) {
		const err = error instanceof Error ? error : new Error(String(error));
		throw new Error(`Failed to scan Yarn Workspaces packages: ${err.message}`);
	}
}

/**
 * 扫描 pnpm workspaces 中的包
 */
async function scanPnpmWorkspaces(rootDir: string): Promise<Package[]> {
	try {
		// 读取 pnpm-workspace.yaml 配置
		const workspaceYaml = await fs.readFile(
			path.join(rootDir, "pnpm-workspace.yaml"),
			"utf-8",
		);
		const workspaceConfig = yaml.load(workspaceYaml) as { packages?: string[] };
		const packages = workspaceConfig.packages || [];

		return scanPackagesFromGlobs(rootDir, packages);
	} catch (error) {
		const err = error instanceof Error ? error : new Error(String(error));
		throw new Error(`Failed to scan pnpm workspaces packages: ${err.message}`);
	}
}

/**
 * 扫描 Nx workspaces 中的包
 */
async function scanNxWorkspaces(rootDir: string): Promise<Package[]> {
	try {
		const packages: Package[] = [];

		// 读取 nx.json 配置
		// const nxConfig = await readJsonFile(path.join(rootDir, "nx.json"));

		// Nx 可能在不同位置存储项目信息，尝试几种常见策略
		let projectPaths: string[] = [];

		// 1. 尝试 workspace.json
		try {
			const workspaceConfig = await readJsonFile(
				path.join(rootDir, "workspace.json"),
			);
			if (workspaceConfig.projects) {
				Object.entries(workspaceConfig.projects).forEach(
					([_name, config]: [string, any]) => {
						if (typeof config === "string") {
							projectPaths.push(config);
						} else if (config.root) {
							projectPaths.push(config.root);
						}
					},
				);
			}
		} catch {
			// 2. 尝试查找单独的项目配置文件
			const projectJsonFiles = await glob("**/project.json", {
				cwd: rootDir,
				ignore: ["**/node_modules/**", "**/dist/**"],
			});

			projectPaths = projectJsonFiles.map((filePath) => path.dirname(filePath));
		}

		// 检查每个项目路径
		for (const projectPath of projectPaths) {
			const packageJsonPath = path.join(rootDir, projectPath, "package.json");
			try {
				const packageJson = await readJsonFile(packageJsonPath);
				if (packageJson.name) {
					packages.push(
						createPackageFromJson(packageJson, projectPath, rootDir),
					);
				}
			} catch {
				// 跳过没有 package.json 的项目
			}
		}

		return packages;
	} catch (error) {
		const err = error instanceof Error ? error : new Error(String(error));
		throw new Error(`Failed to scan Nx workspaces packages: ${err.message}`);
	}
}

/**
 * 从 glob 模式扫描包
 */
async function scanPackagesFromGlobs(
	rootDir: string,
	patterns: string[],
): Promise<Package[]> {
	const packages: Package[] = [];
	const packagePaths: string[] = [];

	// 收集所有匹配的包路径
	for (const pattern of patterns) {
		const matches = await glob(pattern, {
			cwd: rootDir,
			ignore: ["**/node_modules/**", "**/dist/**"],
		});
		packagePaths.push(...matches);
	}

	// 解析每个包的信息
	for (const packagePath of packagePaths) {
		const packageJsonPath = path.join(rootDir, packagePath, "package.json");
		try {
			const packageJson = await readJsonFile(packageJsonPath);
			if (packageJson.name) {
				packages.push(createPackageFromJson(packageJson, packagePath, rootDir));
			}
		} catch {
			// 跳过无效的包
		}
	}

	return packages;
}

/**
 * 从 package.json 创建包信息
 */
function createPackageFromJson(
	packageJson: any,
	relativePath: string,
	rootDir: string,
): Package {
	return {
		name: packageJson.name,
		version: packageJson.version || "0.0.0",
		path: relativePath,
		location: path.join(rootDir, relativePath),
		private: packageJson.private || false,
		dependencies: {
			dependencies: packageJson.dependencies,
			devDependencies: packageJson.devDependencies,
			peerDependencies: packageJson.peerDependencies,
		},
	};
}
