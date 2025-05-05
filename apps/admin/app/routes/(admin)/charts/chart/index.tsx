import { Suspense } from "react";

import type { Route } from "../+types";

const components = import.meta.glob("../components/**");
type ChartComponent = {
	Component: React.FC;
	description: string;
};
export const clientLoader = async ({ params }: Route.ClientLoaderArgs) => {
	const { chartName } = params;
	if (!chartName) {
		throw new Error("Chart name is required");
	}
	const modules = await Promise.all(
		Object.entries(components).map(async ([path, chart]) => {
			const mod = (await chart()) as ChartComponent;
			return { path, ...mod };
		}),
	);

	const filteredModules = modules.filter(({ path }) =>
		path.includes(chartName),
	);

	const chartMap = Object.fromEntries(
		filteredModules.map(({ path, Component: component, description }) => [
			path,
			{ component, description },
		]),
	);

	return {
		components: chartMap,
	};
};

export default function Component({ loaderData }: Route.ComponentProps) {
	const { components } = loaderData;

	return (
		<>
			<div className="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10">
				<Suspense fallback={<div>Loading...</div>}>
					{Object.entries(components).map(([path, prop]) => {
						const { component: ChartComponent, description } = prop as {
							component: React.FC;
							description: string;
						};
						return (
							<div key={path} className="p-4 ">
								<ChartComponent />
								<p>{description}</p>
							</div>
						);
					})}
				</Suspense>
			</div>
		</>
	);
}
