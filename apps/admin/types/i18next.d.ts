import "i18next";

import type { resources } from "@/i18n";

declare module "i18next" {
	interface CustomTypeOptions {
		defaultNS: "common";
		resources: {
			common: typeof resources.en.common;
			auth: typeof resources.en.auth;
			forms: typeof resources.en.forms;
			settings: typeof resources.en.settings;
			navigation: typeof resources.en.navigation;
			errors: typeof resources.en.errors;
			signUp: typeof resources.en.signUp;
			signIn: typeof resources.en.signIn;
			seo: typeof resources.en.seo;
		};
	}
}
