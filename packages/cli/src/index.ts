/**
 * MonoRename - A tool for renaming organization names in monorepo projects
 * @packageDocumentation
 */

import { detectMonorepo } from "./detector";
import { renameOrganization } from "./renamer";
import { scanPackages } from "./scanner";

// 导出类型定义
export type { MonorepoType } from "./detector";
export type { Package } from "./scanner";

// 导出接口
export interface RenameOptions {
	/** 当前组织名 (如 "@old-org") */
	oldOrg: string;
	/** 新组织名 (如 "@new-org") */
	newOrg: string;
	/** 是否仅预览而不实际修改文件 */
	dryRun?: boolean;
	/** 要包含的文件模式 (glob patterns) */
	include?: string[];
	/** 要排除的文件模式 (glob patterns) */
	exclude?: string[];
	/** 日志级别 */
	logLevel?: "silent" | "normal" | "verbose";
}

// 导出核心功能
export { detectMonorepo } from "./detector";
export { scanPackages } from "./scanner";
export { renameOrganization } from "./renamer";

/**
 * 主函数 - 在当前目录执行组织名重命名操作
 * @param options 重命名选项
 * @returns 重命名结果统计
 */
export async function rename(options: RenameOptions) {
	const { oldOrg, newOrg, dryRun = false } = options;

	// 1. 检测 monorepo 类型
	const repoType = await detectMonorepo();
	if (!repoType) {
		throw new Error("No monorepo structure detected in current directory");
	}

	// 2. 扫描包信息
	const packages = await scanPackages(repoType);

	// 3. 执行重命名操作
	const result = await renameOrganization({
		oldOrg,
		newOrg,
		packages,
		dryRun: dryRun ?? false,
		include: options.include,
		exclude: options.exclude,
	});

	return {
		repoType,
		packagesCount: packages.length,
		modifiedFiles: result.modifiedFiles,
		modifiedPackages: result.modifiedPackages,
		dryRun,
	};
}
