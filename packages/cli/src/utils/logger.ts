import chalk from "chalk";

/**
 * 日志级别枚举
 */
export enum LogLevel {
	SILENT = 0, // 不输出任何日志
	ERROR = 1, // 只输出错误
	WARN = 2, // 输出警告和错误
	INFO = 3, // 输出信息、警告和错误
	VERBOSE = 4, // 输出所有信息，包括详细日志
}

/**
 * 日志格式化选项
 */
export interface LoggerOptions {
	/** 日志级别 */
	level: LogLevel;
	/** 是否在日志中显示时间戳 */
	showTimestamp: boolean;
	/** 是否启用彩色输出 */
	enableColors: boolean;
	/** 是否输出到控制台 */
	console: boolean;
}

/**
 * 日志记录器类
 */
class Logger {
	private options: LoggerOptions = {
		level: LogLevel.INFO,
		showTimestamp: true,
		enableColors: true,
		console: true,
	};

	/**
	 * 配置日志记录器
	 * @param options 日志选项
	 */
	configure(options: Partial<LoggerOptions>): void {
		this.options = { ...this.options, ...options };
	}

	/**
	 * 设置日志级别
	 * @param level 日志级别
	 */
	setLevel(level: LogLevel | string): void {
		if (typeof level === "string") {
			switch (level.toLowerCase()) {
				case "silent":
					this.options.level = LogLevel.SILENT;
					break;
				case "error":
					this.options.level = LogLevel.ERROR;
					break;
				case "warn":
					this.options.level = LogLevel.WARN;
					break;
				case "info":
					this.options.level = LogLevel.INFO;
					break;
				case "verbose":
					this.options.level = LogLevel.VERBOSE;
					break;
				default:
					this.options.level = LogLevel.INFO;
			}
		} else {
			this.options.level = level;
		}
	}

	/**
	 * 获取当前的日志级别
	 */
	getLevel(): LogLevel {
		return this.options.level;
	}

	/**
	 * 格式化日志消息
	 * @param level 日志级别标签
	 * @param message 消息内容
	 */
	private format(level: string, message: string): string {
		const { showTimestamp, enableColors } = this.options;

		let formattedLevel = level;
		if (enableColors) {
			switch (level) {
				case "ERROR":
					formattedLevel = chalk.red(level);
					break;
				case "WARN":
					formattedLevel = chalk.yellow(level);
					break;
				case "INFO":
					formattedLevel = chalk.blue(level);
					break;
				case "VERBOSE":
					formattedLevel = chalk.gray(level);
					break;
			}
		}

		const timestamp = showTimestamp
			? enableColors
				? chalk.gray(`[${new Date().toISOString()}]`)
				: `[${new Date().toISOString()}]`
			: "";

		return `${timestamp} ${formattedLevel}: ${message}`;
	}

	/**
	 * 记录错误日志
	 * @param message 错误消息
	 */
	error(message: string): void {
		if (this.options.level >= LogLevel.ERROR) {
			const formattedMessage = this.format("ERROR", message);
			if (this.options.console) {
				console.error(formattedMessage);
			}
		}
	}

	/**
	 * 记录警告日志
	 * @param message 警告消息
	 */
	warn(message: string): void {
		if (this.options.level >= LogLevel.WARN) {
			const formattedMessage = this.format("WARN", message);
			if (this.options.console) {
				console.warn(formattedMessage);
			}
		}
	}

	/**
	 * 记录信息日志
	 * @param message 信息消息
	 */
	info(message: string): void {
		if (this.options.level >= LogLevel.INFO) {
			const formattedMessage = this.format("INFO", message);
			if (this.options.console) {
				console.info(formattedMessage);
			}
		}
	}

	/**
	 * 记录详细日志
	 * @param message 详细消息
	 */
	verbose(message: string): void {
		if (this.options.level >= LogLevel.VERBOSE) {
			const formattedMessage = this.format("VERBOSE", message);
			if (this.options.console) {
				console.log(formattedMessage);
			}
		}
	}

	/**
	 * 记录原始消息（不添加格式）
	 * @param message 消息内容
	 */
	raw(message: string): void {
		if (this.options.level > LogLevel.SILENT && this.options.console) {
			console.log(message);
		}
	}

	/**
	 * 清空控制台输出
	 */
	clear(): void {
		if (this.options.console) {
			console.clear();
		}
	}
}

// 创建单例实例
export const logger = new Logger();
