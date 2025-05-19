import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import auth from "../../locales/en/auth.json";
import common from "../../locales/en/common.json";
import errors from "../../locales/en/errors.json";
import forms from "../../locales/en/forms.json";
import navigation from "../../locales/en/navigation.json";
import seo from "../../locales/en/seo.json";
import settings from "../../locales/en/settings.json";
import signIn from "../../locales/en/sign-in.json";
import signUp from "../../locales/en/sign-up.json";

import authZh from "../../locales/zh-CN/auth.json";
import commonZh from "../../locales/zh-CN/common.json";
import errorsZh from "../../locales/zh-CN/errors.json";
import formsZh from "../../locales/zh-CN/forms.json";
import navigationZh from "../../locales/zh-CN/navigation.json";
import seoZh from "../../locales/zh-CN/seo.json";
import settingsZh from "../../locales/zh-CN/settings.json";
import signInZh from "../../locales/zh-CN/sign-in.json";
import signUpZh from "../../locales/zh-CN/sign-up.json";
const enResources = {
	common,
	auth,
	forms,
	settings,
	navigation,
	errors,
	signUp,
	signIn,
	seo,
};

const zhResources = {
	common: commonZh,
	auth: authZh,
	forms: formsZh,
	settings: settingsZh,
	navigation: navigationZh,
	errors: errorsZh,
	signIn: signInZh,
	signUp: signUpZh,
	seo: seoZh,
};

const resources = {
	en: enResources,
	zh: zhResources,
};

export const languages = [
	{
		value: "en",
		label: "English",
		icon: "🇬🇧",
	},
	{
		value: "zh",
		label: "中文",
		icon: "🇨🇳",
	},
] as const;

export const ns = [
	"common",
	"auth",
	"errors",
	"forms",
	"settings",
	"navigation",
	"sign-in",
	"sign-up",
	"seo",
] as const;

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: "en",
		defaultNS: "common",
		ns,
		debug: import.meta.env.DEV,
		interpolation: {
			escapeValue: false,
		},
	});

export { default as i18n } from "i18next";
