import path from "node:path";

import fs from "node:fs/promises";
import chalk from "chalk";
import { glob } from "glob";
import type { Package } from "./scanner";
import { readJsonFile, writeJsonFile } from "./utils/file";
import { logger } from "./utils/logger";

interface RenameOptions {
	/** 当前组织名 */
	oldOrg: string;
	/** 新组织名 */
	newOrg: string;
	/** 需要处理的包列表 */
	packages: Package[];
	/** 是否仅预览而不实际修改文件 */
	dryRun: boolean;
	/** 要包含的文件模式 (glob patterns) */
	include?: string[];
	/** 要排除的文件模式 (glob patterns) */
	exclude?: string[];
	/** 是否显示详细日志 */
	verbose?: boolean;
}

interface RenameResult {
	/** 修改的文件数量 */
	modifiedFiles: number;
	/** 修改的包数量 */
	modifiedPackages: number;
	/** 修改的文件列表 */
	files: string[];
}

/**
 * 重命名组织名
 * @param options 重命名选项
 * @returns 重命名结果
 */
export async function renameOrganization(
	options: RenameOptions,
): Promise<RenameResult> {
	const { oldOrg, newOrg, packages, dryRun } = options;
	const result: RenameResult = {
		modifiedFiles: 0,
		modifiedPackages: 0,
		files: [],
	};

	// 确保组织名格式正确
	const oldOrgNormalized = oldOrg.startsWith("@") ? oldOrg : `@${oldOrg}`;
	const newOrgNormalized = newOrg.startsWith("@") ? newOrg : `@${newOrg}`;

	logger.info(
		`🔄 Renaming from ${chalk.cyan(oldOrgNormalized)} to ${chalk.green(newOrgNormalized)}...`,
	);

	// 处理每个包
	for (const pkg of packages) {
		let packageModified = false;
		logger.info(`📂 Processing package: ${chalk.yellow(pkg.name)}`);

		// 1. 更新 package.json
		const packageJsonPath = path.join(pkg.location, "package.json");
		try {
			const packageJson = await readJsonFile(packageJsonPath);

			// 更新包名
			if (packageJson.name.startsWith(oldOrgNormalized)) {
				const newName = packageJson.name.replace(
					oldOrgNormalized,
					newOrgNormalized,
				);
				logger.info(
					`  ${chalk.cyan(packageJson.name)} → ${chalk.green(newName)}`,
				);

				if (!dryRun) {
					packageJson.name = newName;
					packageModified = true;
				}
			}

			// 更新依赖关系
			const dependencyTypes = [
				"dependencies",
				"devDependencies",
				"peerDependencies",
				"optionalDependencies",
			];

			for (const depType of dependencyTypes) {
				if (packageJson[depType]) {
					const updatedDeps: Record<string, string> = {};
					let depsModified = false;

					for (const [dep, version] of Object.entries(packageJson[depType])) {
						if (dep.startsWith(oldOrgNormalized)) {
							const newDep = dep.replace(oldOrgNormalized, newOrgNormalized);
							logger.info(`  ${chalk.cyan(dep)} → ${chalk.green(newDep)}`);
							updatedDeps[newDep] = version as string;
							depsModified = true;
							packageModified = true;
						} else {
							updatedDeps[dep] = version as string;
						}
					}

					if (depsModified && !dryRun) {
						packageJson[depType] = updatedDeps;
					}
				}
			}

			// 保存 package.json
			if (packageModified && !dryRun) {
				await writeJsonFile(packageJsonPath, packageJson);
				result.files.push(packageJsonPath);
				result.modifiedFiles++;
			}
		} catch (error) {
			const err = error instanceof Error ? error : new Error(String(error));
			logger.error(`Error processing ${packageJsonPath}: ${err.message}`);
		}

		// 2. 在源文件中替换导入语句和其他引用
		try {
			const sourceFiles = await getSourceFiles(
				pkg.location,
				options.include,
				options.exclude,
			);

			for (const file of sourceFiles) {
				try {
					let content = await fs.readFile(file, "utf-8");
					const originalContent = content;

					// 使用更全面的正则表达式匹配各种导入/引用模式
					const patterns = [
						// 基本字符串匹配 - 匹配所有引号内包含组织名的字符串
						new RegExp(
							`(['"\`])${escapeRegExp(oldOrgNormalized)}/([^'"\`]+)(['"\`])`,
							"g",
						),

						// import 语句：import { x } from '@old-org/package'
						// import x from '@old-org/package'
						// import * as x from '@old-org/package'
						new RegExp(
							`(import\\s+(?:\\{[^}]*\\}|\\*\\s+as\\s+[\\w$]+|[\\w$]+)\\s+from\\s+)(['"\`])${escapeRegExp(oldOrgNormalized)}/([^'"\`]+)(['"\`])`,
							"g",
						),

						// export 语句：export { x } from '@old-org/package'
						// export * from '@old-org/package'
						// export { default } from '@old-org/package'
						new RegExp(
							`(export\\s+(?:\\{[^}]*\\}|\\*|\\{\\s*default\\s*(?:\\s*as\\s*[\\w$]+)?\\s*\\})\\s+from\\s+)(['"\`])${escapeRegExp(oldOrgNormalized)}/([^'"\`]+)(['"\`])`,
							"g",
						),

						// require 调用：require('@old-org/package')
						new RegExp(
							`(require\\s*\\()(['"\`])${escapeRegExp(oldOrgNormalized)}/([^'"\`]+)(['"\`])\\)`,
							"g",
						),

						// 动态导入：import('@old-org/package')
						new RegExp(
							`(import\\s*\\()(['"\`])${escapeRegExp(oldOrgNormalized)}/([^'"\`]+)(['"\`])\\)`,
							"g",
						),

						// JSX/TSX 属性中的引用：packageName="@old-org/package"
						new RegExp(
							`(\\w+\\s*=\\s*)(['"\`])${escapeRegExp(oldOrgNormalized)}/([^'"\`]+)(['"\`])`,
							"g",
						),

						// 对象属性：{ name: '@old-org/package' }
						new RegExp(
							`(:\\s*)(['"\`])${escapeRegExp(oldOrgNormalized)}/([^'"\`]+)(['"\`])`,
							"g",
						),
					];

					// 应用每个模式
					for (const pattern of patterns) {
						content = content.replace(
							pattern,
							(match, prefix, quote1, pkgPath, quote2) => {
								// 对于较复杂的模式，保留前缀部分
								if (prefix && quote1 && pkgPath && quote2) {
									return `${prefix}${quote1}${newOrgNormalized}/${pkgPath}${quote2}`;
								}
								// 处理基本的字符串替换
								return match.replace(oldOrgNormalized, newOrgNormalized);
							},
						);
					}

					if (content !== originalContent) {
						logger.info(
							`  Modified: ${chalk.cyan(path.relative(process.cwd(), file))}`,
						);
						// 添加：显示简单的差异信息
						if (options.verbose) {
							// 找出并显示修改的行
							const originalLines = originalContent.split("\n");
							const newLines = content.split("\n");

							for (let i = 0; i < originalLines.length; i++) {
								if (originalLines[i] !== newLines[i]) {
									logger.info(`    ${chalk.red(`- ${originalLines[i]}`)}`);
									logger.info(`    ${chalk.green(`+ ${newLines[i]}`)}`);
								}
							}
						}

						// 始终更新统计数据，即使是 dry run 模式
						result.files.push(file);
						result.modifiedFiles++;
						packageModified = true;

						// 只在非 dry run 模式下实际写入文件
						if (!dryRun) {
							await fs.writeFile(file, content);
						}

						// if (!dryRun) {
						// 	await fs.writeFile(file, content);
						// 	result.files.push(file);
						// 	result.modifiedFiles++;
						// 	packageModified = true;
						// }
					}
				} catch (error) {
					const err = error instanceof Error ? error : new Error(String(error));
					logger.error(`Error processing file ${file}: ${err.message}`);
				}
			}
		} catch (error) {
			const err = error instanceof Error ? error : new Error(String(error));
			logger.error(
				`Error processing source files in ${pkg.location}: ${err.message}`,
			);
		}

		if (packageModified) {
			result.modifiedPackages++;
		}
	}

	// 3. 更新根目录 package.json (如果存在)
	try {
		const rootPackageJsonPath = path.join(process.cwd(), "package.json");
		const rootPackageJson = await readJsonFile(rootPackageJsonPath);
		let rootModified = false;

		// 检查依赖项
		const dependencyTypes = [
			"dependencies",
			"devDependencies",
			"peerDependencies",
			"optionalDependencies",
		];

		for (const depType of dependencyTypes) {
			if (rootPackageJson[depType]) {
				const updatedDeps: Record<string, string> = {};
				let depsModified = false;

				for (const [dep, version] of Object.entries(rootPackageJson[depType])) {
					if (dep.startsWith(oldOrgNormalized)) {
						const newDep = dep.replace(oldOrgNormalized, newOrgNormalized);
						logger.info(`Root ${chalk.cyan(dep)} → ${chalk.green(newDep)}`);
						updatedDeps[newDep] = version as string;
						depsModified = true;
						rootModified = true;
					} else {
						updatedDeps[dep] = version as string;
					}
				}

				if (depsModified && !dryRun) {
					rootPackageJson[depType] = updatedDeps;
				}
			}
		}

		// 检查其他可能包含组织名的字段 (如 workspaces 配置)
		if (rootPackageJson.workspaces) {
			// 处理 workspaces 数组或对象
			if (Array.isArray(rootPackageJson.workspaces)) {
				rootPackageJson.workspaces = rootPackageJson.workspaces.map(
					(workspace: string) => {
						if (workspace.includes(oldOrgNormalized)) {
							const newWorkspace = workspace.replace(
								new RegExp(escapeRegExp(oldOrgNormalized), "g"),
								newOrgNormalized,
							);
							logger.info(
								`Root workspace pattern ${chalk.cyan(workspace)} → ${chalk.green(newWorkspace)}`,
							);
							rootModified = true;
							return newWorkspace;
						}
						return workspace;
					},
				);
			} else if (
				rootPackageJson.workspaces.packages &&
				Array.isArray(rootPackageJson.workspaces.packages)
			) {
				rootPackageJson.workspaces.packages =
					rootPackageJson.workspaces.packages.map((workspace: string) => {
						if (workspace.includes(oldOrgNormalized)) {
							const newWorkspace = workspace.replace(
								new RegExp(escapeRegExp(oldOrgNormalized), "g"),
								newOrgNormalized,
							);
							logger.info(
								`Root workspace pattern ${chalk.cyan(workspace)} → ${chalk.green(newWorkspace)}`,
							);
							rootModified = true;
							return newWorkspace;
						}
						return workspace;
					});
			}
		}

		// 保存根 package.json
		if (rootModified && !dryRun) {
			await writeJsonFile(rootPackageJsonPath, rootPackageJson);
			result.files.push(rootPackageJsonPath);
			result.modifiedFiles++;
		}

		// 4. 检查根目录下的其他配置文件
		const rootConfigFiles = [
			"tsconfig.json",
			"jest.config.js",
			"jest.config.ts",
			"webpack.config.js",
			"rollup.config.js",
			"vite.config.js",
			"vite.config.ts",
		];

		for (const configFile of rootConfigFiles) {
			const configPath = path.join(process.cwd(), configFile);
			try {
				if ((await fs.stat(configPath)).isFile()) {
					const content = await fs.readFile(configPath, "utf-8");
					const originalContent = content;

					// 使用相同的正则表达式模式进行替换
					const updatedContent = content.replace(
						new RegExp(escapeRegExp(oldOrgNormalized), "g"),
						newOrgNormalized,
					);

					if (updatedContent !== originalContent) {
						logger.info(
							`Found organization reference in ${chalk.cyan(configFile)}`,
						);

						if (!dryRun) {
							await fs.writeFile(configPath, updatedContent);
							result.files.push(configPath);
							result.modifiedFiles++;
						}
					}
				}
			} catch (error) {
				// 忽略不存在的文件
				if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
					const err = error instanceof Error ? error : new Error(String(error));
					logger.verbose(
						`Error checking config file ${configFile}: ${err.message}`,
					);
				}
			}
		}
	} catch (error) {
		const err = error instanceof Error ? error : new Error(String(error));
		logger.error(`Error processing root package.json: ${err.message}`);
	}

	// 结果摘要
	if (dryRun) {
		logger.info(
			chalk.yellow(
				`Dry run completed. Would modify ${result.modifiedFiles} files in ${result.modifiedPackages} packages`,
			),
		);
	} else {
		logger.info(
			chalk.green(
				`Successfully renamed from ${oldOrgNormalized} to ${newOrgNormalized}`,
			),
		);
		logger.info(
			chalk.green(
				`Modified ${result.modifiedFiles} files in ${result.modifiedPackages} packages`,
			),
		);
	}

	return result;
}

/**
 * 转义正则表达式特殊字符
 */
function escapeRegExp(string: string): string {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * 获取指定目录下符合条件的源文件
 */
async function getSourceFiles(
	dir: string,
	include: string[] = ["**/*.{js,jsx,ts,tsx,json,md,vue}"],
	exclude: string[] = [
		"**/node_modules/**",
		"**/dist/**",
		"**/build/**",
		"**/.git/**",
	],
): Promise<string[]> {
	const defaultInclude = ["**/*.{js,jsx,ts,tsx,json,md,vue}"];
	const defaultExclude = [
		"**/node_modules/**",
		"**/dist/**",
		"**/build/**",
		"**/.git/**",
	];

	const patterns = include && include.length > 0 ? include : defaultInclude;
	const ignorePatterns =
		exclude && exclude.length > 0 ? exclude : defaultExclude;

	const allFiles: string[] = [];

	for (const pattern of patterns) {
		const files = await glob(pattern, {
			cwd: dir,
			ignore: ignorePatterns,
			absolute: true,
			nodir: true,
		});
		allFiles.push(...files);
	}

	return Array.from(new Set(allFiles)); // 去重
}
