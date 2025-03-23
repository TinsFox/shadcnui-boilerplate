import { addons } from "@storybook/manager-api";
import { themes } from "@storybook/theming";

// 获取系统主题偏好
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

addons.setConfig({
	theme: prefersDark ? themes.dark : themes.light,
});
