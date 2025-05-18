import "@poketto/ui/globals.css";
import "@poketto/tiptap/tiptap.css";
import "./i18n";

import { ClickToComponent } from "click-to-react-component";
import * as React from "react";
import type { Route } from "./+types/root";

import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
} from "react-router";

import { RootProviders } from "@/providers/root-providers";
import { useTranslation } from "react-i18next";
import { Fallback } from "./components/fallback";
import { env } from "./env";

export function meta() {
	return [{ title: env.VITE_APP_NAME }];
}

export function Layout({ children }: { children: React.ReactNode }) {
	const { i18n, t } = useTranslation("seo");

	return (
		<html lang={i18n.language}>
			<head>
				<meta charSet="utf-8" />
				<link rel="icon" type="image/svg+xml" href="/logo.svg" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content={t("seo.description")} />
				<meta name="keywords" content={t("seo.keywords")} />
				<meta property="og:title" content={env.VITE_APP_NAME} />
				<meta property="og:description" content={t("seo.description")} />
				<meta property="og:type" content="website" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={env.VITE_APP_NAME} />
				<meta name="twitter:description" content={t("seo.description")} />

				<Meta />
				<Links />
			</head>
			<body className="antialiased bg-background">
				<RootProviders>{children}</RootProviders>
				<ClickToComponent />
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	React.useLayoutEffect(() => {
		const handleOpenSettings = (e: KeyboardEvent) => {
			if (e.key === "," && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				// TODO: Open settings
			}
		};
		document.addEventListener("keydown", handleOpenSettings);

		return () => {
			document.removeEventListener("keydown", handleOpenSettings);
		};
	}, []);

	return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className="pt-16 p-4 container mx-auto">
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className="w-full p-4 overflow-x-auto">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}

export function HydrateFallback() {
	return <Fallback />;
}
