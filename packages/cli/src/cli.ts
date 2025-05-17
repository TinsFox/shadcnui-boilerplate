#!/usr/bin/env node

import path from "node:path";
import chalk from "chalk";
import { Command } from "commander";
import inquirer from "inquirer";
import ora from "ora";
import { version } from "../package.json";
import { detectMonorepo, getRepoTypeDescription } from "./detector";
import { renameOrganization } from "./renamer";
import { scanPackages } from "./scanner";
import { logger } from "./utils/logger";

// 添加在文件顶部的类型定义
interface CliOptions {
	dryRun: boolean;
	yes: boolean;
	include?: string;
	exclude?: string;
	verbose: boolean;
	silent: boolean;
}

// 设置进程错误处理
process.on("unhandledRejection", (err) => {
	logger.error(`Unhandled rejection: ${err}`);
	process.exit(1);
});

/**
 * 验证组织名格式
 */
function validateOrgName(name: string): boolean {
	// 组织名可以有或没有 @ 前缀
	return /^(@?)[a-zA-Z0-9-_.]+$/.test(name);
}

/**
 * 主函数 - CLI 入口点
 */
async function main() {
	const program = new Command();

	program
		.name("Poketto CLI")
		.description("Rename organization name across a monorepo project")
		.version(version);

	program
		.argument(
			"<old-org>",
			"Current organization name (with or without @ prefix)",
		)
		.argument("<new-org>", "New organization name (with or without @ prefix)")
		.option("-d, --dry-run", "Preview changes without modifying files", false)
		.option("-y, --yes", "Skip confirmation prompts", false)
		.option(
			"--include <patterns>",
			"Comma-separated glob patterns for files to include",
		)
		.option(
			"--exclude <patterns>",
			"Comma-separated glob patterns for files to exclude",
		)
		.option("--verbose", "Enable verbose logging", false)
		.option("--silent", "Suppress all non-error output", false)
		// 修改 action 函数的参数类型
		.action(async (oldOrg: string, newOrg: string, options: CliOptions) => {
			// 设置日志级别
			if (options.silent) {
				logger.setLevel("error");
			} else if (options.verbose) {
				logger.setLevel("verbose");
			} else {
				logger.setLevel("info");
			}

			// 验证组织名格式
			if (!validateOrgName(oldOrg) || !validateOrgName(newOrg)) {
				logger.error(
					"Organization names must contain only letters, numbers, hyphens, underscores, and dots",
				);
				process.exit(1);
			}

			// 确保组织名格式一致（都带 @ 或都不带 @），使用新变量而不是修改参数
			const normalizedOldOrg =
				!oldOrg.startsWith("@") && newOrg.startsWith("@")
					? `@${oldOrg}`
					: oldOrg;
			const normalizedNewOrg =
				oldOrg.startsWith("@") && !newOrg.startsWith("@")
					? `@${newOrg}`
					: newOrg;

			// 检测 monorepo 类型
			let spinner = ora("Detecting monorepo structure...").start();
			try {
				const repoType = await detectMonorepo();

				if (!repoType) {
					spinner.fail("No monorepo structure detected");
					logger.error(
						"Make sure you are in the root directory of a monorepo project",
					);
					process.exit(1);
				}

				spinner.succeed(
					`Detected ${chalk.cyan(getRepoTypeDescription(repoType))} monorepo`,
				);

				// 扫描包
				spinner = ora("Scanning packages...").start();
				const packages = await scanPackages(repoType);
				spinner.succeed(
					`Found ${chalk.cyan(packages.length.toString())} packages`,
				);

				// 显示找到的包
				logger.verbose("Packages found:");
				packages.forEach((pkg) => {
					logger.verbose(`- ${pkg.name} (${pkg.path})`);
				});

				// 解析包含/排除模式
				const include = options.include
					? options.include.split(",")
					: undefined;
				const exclude = options.exclude
					? options.exclude.split(",")
					: undefined;

				// 如果不是静默模式且不是自动确认，显示确认提示
				if (!options.yes && !options.silent) {
					logger.info(
						`Will rename organization from ${chalk.cyan(normalizedOldOrg)} to ${chalk.green(normalizedNewOrg)}`,
					);
					logger.info(
						`This will affect ${chalk.cyan(packages.length.toString())} packages`,
					);

					if (options.dryRun) {
						logger.info(
							chalk.yellow("Dry run mode enabled - no files will be modified"),
						);
					}

					const { confirm } = await inquirer.prompt([
						{
							type: "confirm",
							name: "confirm",
							message: "Continue with the renaming operation?",
							default: false,
						},
					]);

					if (!confirm) {
						logger.info("Operation cancelled");
						process.exit(0);
					}
				}

				// 执行重命名操作
				spinner = ora(
					`Renaming ${chalk.cyan(normalizedOldOrg)} to ${chalk.green(normalizedNewOrg)}...`,
				).start();
				const result = await renameOrganization({
					oldOrg: normalizedOldOrg,
					newOrg: normalizedNewOrg,
					packages,
					dryRun: options.dryRun,
					include,
					exclude,
				});

				// 显示结果
				if (options.dryRun) {
					spinner.info(
						chalk.yellow(
							`Dry run completed. Would modify ${result.modifiedFiles} files in ${result.modifiedPackages} packages`,
						),
					);

					// 添加：显示会被修改的文件列表
					if (result.files.length > 0) {
						logger.info("Files that would be modified:");
						result.files.forEach((file) => {
							logger.info(`- ${path.relative(process.cwd(), file)}`);
						});
					}
				} else {
					spinner.succeed(
						`Renamed organization in ${chalk.cyan(result.modifiedFiles.toString())} files across ${chalk.cyan(result.modifiedPackages.toString())} packages`,
					);
				}

				// 显示详细的修改文件列表
				if (!options.silent && options.verbose && result.files.length > 0) {
					logger.verbose("Modified files:");
					result.files.forEach((file) => {
						logger.verbose(`- ${file}`);
					});
				}
			} catch (error) {
				const err = error instanceof Error ? error : new Error(String(error));
				spinner.fail(`Error: ${err.message}`);
				logger.error(`${err.stack || err}`);
				process.exit(1);
			}
		});

	program.parse(process.argv);
}

// 执行主函数
main().catch((err) => {
	logger.error(`${err.stack || err}`);
	process.exit(1);
});
