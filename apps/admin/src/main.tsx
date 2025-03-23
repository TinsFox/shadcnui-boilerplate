import "@repo/ui/globals.css";
import "@repo/tiptap/tiptap.css";
import "./i18n";

import { env } from "@env";
import { ClickToComponent } from "click-to-react-component";
import * as React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { Fallback } from "@/components/fallback";
import { RootProviders } from "@/providers/root-providers";

import { router } from "./router";

const rootEl = document.getElementById("root");

if (rootEl) {
	ReactDOM.createRoot(rootEl).render(
		<React.StrictMode>
			<RootProviders>
				<RouterProvider router={router} fallbackElement={<Fallback />} />
			</RootProviders>
			{/*  */}
			{/* <ClickToComponent editor={env.VITE_EDITOR} /> */}
		</React.StrictMode>,
	);
}
