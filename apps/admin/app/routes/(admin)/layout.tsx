import { Button } from "@poketto/ui/button";
import { ScrollArea, ScrollBar } from "@poketto/ui/scroll-area";
import { Separator } from "@poketto/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@poketto/ui/sidebar";
import { CircleHelp } from "lucide-react";
import { Link, Outlet, redirect } from "react-router";

import { Icons } from "@/components/icons";
import { LanguageSwitch } from "@/components/language-switch";
import { AppSidebar } from "@/components/nav-sidebar/app-sidebar";
import { NavBreadcrumb } from "@/components/nav-sidebar/nav-breadcrumb";
import { Search } from "@/components/search";
import { ThemeCustomizer } from "@/components/theme/theme-customizer";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { SIDEBAR_COOKIE_NAME } from "@/constants";

import { authClient } from "@/lib/auth-client";

export const clientLoader = async () => {
	const session = await authClient.getSession();
	if (!session.data) {
		return redirect("/login");
	}
	return null;
};

export default function AdminLayout() {
	const sidebarState = localStorage.getItem(SIDEBAR_COOKIE_NAME) === "true";

	return (
		<SidebarProvider defaultOpen={sidebarState} storage="local">
			<AppSidebar />
			<SidebarInset className="w-full overflow-hidden">
				<div className="sticky top-0 z-10">
					<header className="flex h-14 w-full shrink-0 items-center justify-between border-b bg-background/80 px-2 backdrop-blur-sm sm:h-16 sm:px-4">
						<div className="flex items-center gap-1 sm:gap-2">
							<SidebarTrigger className="-ml-0.5 sm:-ml-1" />
							<Separator
								orientation="vertical"
								className="mr-1 hidden h-4 sm:mr-2 sm:block"
							/>
							<NavBreadcrumb className="hidden md:flex text-nowrap" />
						</div>
						<div className="ml-auto flex items-center justify-end gap-1 px-1 sm:gap-2 sm:px-2 md:flex-1 md:justify-between md:px-4 md:max-w-96 lg:max-w-lg">
							<Search className="w-full max-w-[200px] md:max-w-none" />
							<div className="flex items-center gap-1 sm:gap-2">
								<Link
									to="https://github.com/TinsFox/poketto-stack"
									target="_blank"
									className="hidden sm:inline-flex"
								>
									<Button variant="ghost" size="icon">
										<Icons.gitHub className="size-4 sm:size-5" />
									</Button>
								</Link>
								<Link to="https://poketto-stack.pages.dev" target="_blank">
									<Button variant="ghost" size="icon">
										<CircleHelp className="size-4 sm:size-5" />
									</Button>
								</Link>
								<LanguageSwitch />
								<ThemeSwitcher />
								<ThemeCustomizer />
							</div>
						</div>
					</header>
				</div>

				<ScrollArea className="flex h-[calc(100vh-3.5rem)] flex-col gap-4 p-2 pt-0 sm:h-[calc(100vh-4rem)] sm:p-4">
					<div className="p-2 sm:py-4">
						<Outlet />
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</SidebarInset>
		</SidebarProvider>
	);
}
