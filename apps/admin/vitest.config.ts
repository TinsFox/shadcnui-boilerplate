import { reactRouter } from "@react-router/dev/vite";
import { mergeConfig } from "vite";
import { configDefaults, defineConfig } from "vitest/config";

import viteConfig from "./vite.config";

export default defineConfig((configEnv) =>
	mergeConfig(
		viteConfig(configEnv),
		defineConfig({
			test: {
				environment: "jsdom",
				globals: true,
				setupFiles: "./app/test/setup.ts",
				coverage: {
					provider: "v8",
					reporter: ["text", "json", "html"],
					exclude: [
						...(configDefaults.exclude ?? []),
						"node_modules/",
						"src/test/",
						"**/*.d.ts",
						"**/*.config.*",
						"**/.*",
					],
				},
			},
		}),
	),
);
