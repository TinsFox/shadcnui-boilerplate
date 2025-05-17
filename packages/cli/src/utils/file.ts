import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { logger } from "./logger";

/**
 * 检查文件或目录是否存在
 * @param filePath 文件或目录的路径
 * @returns 是否存在
 */
export async function pathExists(filePath: string): Promise<boolean> {
	try {
		await fs.access(filePath);
		return true;
	} catch {
		return false;
	}
}

/**
 * 检查文件或目录是否存在（同步版本）
 * @param filePath 文件或目录的路径
 * @returns 是否存在
 */
export function pathExistsSync(filePath: string): boolean {
	return existsSync(filePath);
}

/**
 * 读取并解析 JSON 文件
 * @param filePath JSON 文件路径
 * @returns 解析后的 JSON 对象
 */
export async function readJsonFile<T = any>(filePath: string): Promise<T> {
	try {
		const content = await fs.readFile(filePath, "utf-8");
		return JSON.parse(content) as T;
	} catch (error) {
		const err = error instanceof Error ? error : new Error(String(error));
		logger.error(`Error reading JSON file ${filePath}: ${err.message}`);
		throw new Error(`Failed to read JSON file ${filePath}: ${err.message}`);
	}
}

/**
 * 将对象写入 JSON 文件
 * @param filePath 目标文件路径
 * @param data 要写入的数据
 * @param spaces 缩进空格数（格式化）
 */
export async function writeJsonFile(
	filePath: string,
	data: any,
	spaces = 2,
): Promise<void> {
	try {
		const content = JSON.stringify(data, null, spaces);
		await ensureDirectoryExists(path.dirname(filePath));
		await fs.writeFile(filePath, content, "utf-8");
	} catch (error) {
		const err = error instanceof Error ? error : new Error(String(error));
		logger.error(`Error writing JSON file ${filePath}: ${err.message}`);
		throw new Error(`Failed to write JSON file ${filePath}: ${err.message}`);
	}
}

/**
 * 确保目录存在，如果不存在则创建
 * @param dirPath 目录路径
 */
export async function ensureDirectoryExists(dirPath: string): Promise<void> {
	try {
		await fs.mkdir(dirPath, { recursive: true });
	} catch (error) {
		// 如果目录已存在，则不视为错误
		if ((error as NodeJS.ErrnoException).code !== "EEXIST") {
			const err = error instanceof Error ? error : new Error(String(error));
			logger.error(`Error creating directory ${dirPath}: ${err.message}`);
			throw error;
		}
	}
}

/**
 * 安全地读取文件内容
 * @param filePath 文件路径
 * @param encoding 文件编码
 * @returns 文件内容或 null（如果文件不存在）
 */
export async function safeReadFile(
	filePath: string,
	encoding: BufferEncoding = "utf-8",
): Promise<string | null> {
	try {
		if (!(await pathExists(filePath))) {
			return null;
		}
		return await fs.readFile(filePath, { encoding });
	} catch (error) {
		const err = error instanceof Error ? error : new Error(String(error));
		logger.error(`Error reading file ${filePath}: ${err.message}`);
		return null;
	}
}

/**
 * 安全地写入文件内容
 * @param filePath 文件路径
 * @param content 要写入的内容
 * @returns 是否成功写入
 */
export async function safeWriteFile(
	filePath: string,
	content: string,
): Promise<boolean> {
	try {
		await ensureDirectoryExists(path.dirname(filePath));
		await fs.writeFile(filePath, content, "utf-8");
		return true;
	} catch (error) {
		const err = error instanceof Error ? error : new Error(String(error));
		logger.error(`Error writing file ${filePath}: ${err.message}`);
		return false;
	}
}

/**
 * 递归删除目录或文件
 * @param filePath 要删除的路径
 */
export async function removeRecursively(filePath: string): Promise<void> {
	try {
		await fs.rm(filePath, { recursive: true, force: true });
	} catch (error) {
		const err = error instanceof Error ? error : new Error(String(error));
		logger.error(`Error removing path ${filePath}: ${err.message}`);
		throw error;
	}
}

/**
 * 创建文件的备份副本
 * @param filePath 要备份的文件路径
 * @returns 备份文件路径或 null（如果备份失败）
 */
export async function createBackup(filePath: string): Promise<string | null> {
	try {
		if (!(await pathExists(filePath))) {
			return null;
		}

		const backupPath = `${filePath}.backup-${Date.now()}`;
		await fs.copyFile(filePath, backupPath);
		logger.verbose(`Created backup of ${filePath} at ${backupPath}`);
		return backupPath;
	} catch (error) {
		const err = error instanceof Error ? error : new Error(String(error));
		logger.error(`Error creating backup for ${filePath}: ${err.message}`);
		return null;
	}
}
