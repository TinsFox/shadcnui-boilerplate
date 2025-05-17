import { Button } from "@poketto/ui/button";
import { Link, Outlet } from "react-router";

import { Announcement } from "@/components/announcement";
import { ThemesSwitcher } from "@/components/theme/themes-selector";
import { THEMES } from "@/lib/themes";

import type { Route } from "./+types";
import { ChartsNav } from "./charts-nav";
import {
	PageActions,
	PageHeader,
	PageHeaderDescription,
	PageHeaderHeading,
} from "./components/page-header";

export const clientLoader = async ({ params }: Route.ClientLoaderArgs) => {
	const { chartName } = params;

	return {
		chartName,
	};
};

export default function Component({ loaderData }: Route.ComponentProps) {
	const { chartName } = loaderData;
	return (
		<div className="relative">
			<PageHeader>
				<Announcement />
				<PageHeaderHeading>Beautiful Charts</PageHeaderHeading>
				<PageHeaderDescription>
					Built using Recharts. Copy and paste into your apps. Open Source.
				</PageHeaderDescription>
				<PageActions>
					<Button asChild size="sm">
						<a href="#charts">Browse Charts</a>
					</Button>
					<Button asChild variant="ghost" size="sm">
						<Link
							target="_blank"
							to="https://ui.shadcn.com/docs/components/chart"
						>
							Documentation
						</Link>
					</Button>
				</PageActions>
			</PageHeader>
			<section id="charts" className="scroll-mt-20">
				<div className="sticky -top-6 z-50 bg-background py-5">
					<ChartsNav />
				</div>
				<div className="grid gap-4">
					<div className="gap-6 md:flex md:flex-row-reverse md:items-start">
						<ThemesSwitcher
							themes={THEMES}
							className="fixed inset-x-0 bottom-0 z-40 flex bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:sticky lg:bottom-auto lg:top-20"
						/>
						<div className="grid flex-1 gap-12">
							<h2 className="sr-only">{chartName}</h2>
							<Outlet />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
