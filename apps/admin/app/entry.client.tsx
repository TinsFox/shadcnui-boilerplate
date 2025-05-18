import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
import { RootProviders } from "./providers/root-providers";

startTransition(() => {
	hydrateRoot(
		document,
		<StrictMode>
			<RootProviders>
				<HydratedRouter />
			</RootProviders>
		</StrictMode>,
	);
});
