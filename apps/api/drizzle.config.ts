import { config } from "dotenv";
config({ path: "./.dev.vars", debug: true });
import { defineConfig } from "drizzle-kit";
import { env } from "env";

export default defineConfig({
	schema: ["./src/db/schema/**/*.ts", "./auth-schema.ts"],
	out: "./drizzle",
	dialect: "postgresql",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
});
