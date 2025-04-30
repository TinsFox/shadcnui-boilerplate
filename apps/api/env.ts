import * as process from "node:process";
import { z } from "zod";

// 定义环境变量的 schema
const envSchema = z.object({
	DATABASE_URL: z.string(),
	BETTER_AUTH_URL: z.string(),
	S3_ACCESS_KEY_ID: z.string().optional(),
	S3_SECRET_ACCESS_KEY: z.string().optional(),
	S3_BUCKET: z.string().optional(),
	S3_ENDPOINT: z.string().optional(),
	S3_PUBLIC_DOMAIN: z.string().optional(),
	RESEND_API_KEY: z.string(),
	BETTER_AUTH_EMAIL: z.string(),
	API_PORT: z.string().default("3000"),
});

// 从 process.env 中获取环境变量
const rawEnv = {
	DATABASE_URL: process.env.DATABASE_URL,
	BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
	S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
	S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
	S3_BUCKET: process.env.S3_BUCKET,
	S3_ENDPOINT: process.env.S3_ENDPOINT,
	S3_PUBLIC_DOMAIN: process.env.S3_PUBLIC_DOMAIN,
	RESEND_API_KEY: process.env.RESEND_API_KEY,
	BETTER_AUTH_EMAIL: process.env.BETTER_AUTH_EMAIL,
	API_PORT: process.env.API_PORT,
};
type Env = z.infer<typeof envSchema>;
let env: Env;

try {
	// 使用 envSchema 进行验证和解析
	env = envSchema.parse(rawEnv);
} catch (error) {
	if (error instanceof z.ZodError) {
		console.error("环境变量验证失败：");
		for (const err of error.errors) {
			console.error(`路径：${err.path.join(" -> ")}, 错误：${err.message}`);
		}
		process.exit(1); // 退出进程并返回非零状态码
	} else {
		console.error("未知错误：", error);
		process.exit(1); // 退出进程并返回非零状态码
	}
}

// 导出解析后的环境变量对象
export { env };
