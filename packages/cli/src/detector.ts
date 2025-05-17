import fs from "node:fs/promises";
import path from "node:path";
import { pathExists } from "./utils/file";
import { logger } from "./utils/logger";

/**
 * 支持的 monorepo 类型
 */
export type MonorepoType = "lerna" | "yarn-workspaces" | "pnpm" | "nx" | null;

/**
 * 检测当前目录中的 monorepo 类型
 * @returns 识别到的 monorepo 类型，如果不是 monorepo 则返回 null
 */
export async function detectMonorepo(): Promise<MonorepoType> {
	const rootDir = process.cwd();
	logger.verbose(`Detecting monorepo type in ${rootDir}`);

	try {
		// 检查 lerna.json
		if (await pathExists(path.join(rootDir, "lerna.json"))) {
			logger.verbose("Detected Lerna configuration");
			return "lerna";
		}

		// 检查 package.json 中的 workspaces 配置 (Yarn/NPM Workspaces)
		try {
			const packageJsonPath = path.join(rootDir, "package.json");
			if (await pathExists(packageJsonPath)) {
				const packageJsonContent = await fs.readFile(packageJsonPath, "utf-8");
				const packageJson = JSON.parse(packageJsonContent);

				if (packageJson.workspaces) {
					logger.verbose("Detected Yarn/NPM Workspaces configuration");
					return "yarn-workspaces";
				}
			}
		} catch (error) {
			const err = error instanceof Error ? error : new Error(String(error));
			logger.verbose(`Error checking package.json: ${err.message}`);
		}

		// 检查 pnpm-workspace.yaml
		if (await pathExists(path.join(rootDir, "pnpm-workspace.yaml"))) {
			logger.verbose("Detected pnpm Workspaces configuration");
			return "pnpm";
		}

		// 检查 nx.json
		if (await pathExists(path.join(rootDir, "nx.json"))) {
			logger.verbose("Detected Nx workspace configuration");
			return "nx";
		}

		// 检查 Rush 配置
		if (await pathExists(path.join(rootDir, "rush.json"))) {
			logger.verbose("Detected Rush configuration (not fully supported yet)");
			// 目前暂不支持 Rush，但我们可以检测它并给出提示
			throw new Error("Rush monorepos are detected but not yet supported");
		}

		// 检查 Turborepo 配置
		if (await pathExists(path.join(rootDir, "turbo.json"))) {
			// Turborepo 通常与其他工作区解决方案一起使用，如果我们到了这里，它可能是单独使用的
			logger.verbose(
				"Detected Turborepo configuration but no workspaces definition found",
			);
			throw new Error(
				"Turborepo detected but no workspaces configuration found",
			);
		}

		logger.verbose("No recognized monorepo structure detected");
		return null;
	} catch (error) {
		const err = error instanceof Error ? error : new Error(String(error));
		logger.error(`Error detecting monorepo type: ${err.message}`);
		throw new Error(`Failed to detect monorepo type: ${err.message}`);
	}
}

/**
 * 获取 monorepo 类型的人类可读描述
 * @param repoType
 * @returns
 */
export function getRepoTypeDescription(repoType: MonorepoType): string {
	switch (repoType) {
		case "lerna":
			return "Lerna";
		case "yarn-workspaces":
			return "Yarn/NPM Workspaces";
		case "pnpm":
			return "pnpm Workspaces";
		case "nx":
			return "Nx Workspace";
		default:
			return "Unknown";
	}
}
