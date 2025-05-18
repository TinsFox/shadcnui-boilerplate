import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	render as rtlRender,
	renderHook as rtlRenderHook,
} from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router";

import type { Theme } from "@/components/theme/theme-provider";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { env } from "@/env";
import { i18n } from "@/i18n";
import { PostHogProvider } from "posthog-js/react";

type RenderHookOptions = {
	initialProps?: {
		defaultTheme?: Theme;
	};
	wrapper?: React.ComponentType<{ children: React.ReactNode }>;
};

export const renderHook = <Result,>(
	hook: () => Result,
	options: RenderHookOptions = {},
) => {
	return rtlRenderHook(hook, {
		wrapper: ({ children }) => {
			const content = options.wrapper ? (
				<options.wrapper>{children}</options.wrapper>
			) : (
				<ThemeProvider defaultTheme={options.initialProps?.defaultTheme}>
					{children}
				</ThemeProvider>
			);
			return (
				<PostHogProvider
					apiKey={env.VITE_PUBLIC_POSTHOG_KEY}
					options={{
						api_host: env.VITE_PUBLIC_POSTHOG_HOST,
						debug: import.meta.env.DEV,
					}}
				>
					{content}
				</PostHogProvider>
			);
		},
	});
};

function render(ui: React.ReactElement, { route = "/" } = {}) {
	window.history.pushState({}, "Test page", route);

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

	return rtlRender(
		<QueryClientProvider client={queryClient}>
			<I18nextProvider i18n={i18n}>
				<PostHogProvider
					apiKey={env.VITE_PUBLIC_POSTHOG_KEY}
					options={{
						api_host: env.VITE_PUBLIC_POSTHOG_HOST,
						debug: import.meta.env.DEV,
					}}
				>
					<BrowserRouter>{ui}</BrowserRouter>
				</PostHogProvider>
			</I18nextProvider>
		</QueryClientProvider>,
	);
}

export * from "@testing-library/react";
export { render };
