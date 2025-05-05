import { config } from "dotenv";
config({ path: "./.dev.vars", debug: true });
import * as process from "node:process";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: ["./src/db/schema/**/*.ts", "./auth-schema.ts"],
	out: "./drizzle",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL,
	},
});
