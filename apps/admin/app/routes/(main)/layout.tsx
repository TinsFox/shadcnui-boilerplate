import { Button } from "@repo/ui/button";
import { Link } from "react-router";

import { Logo } from "@/components/icons/logo";
import { Search } from "@/components/search";

export function HomeLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-screen flex-col justify-between">
			<header className="container py-6">
				<nav className="xs:flex-nowrap flex flex-nowrap items-center justify-between gap-4 md:gap-8">
					<div>
						<Logo className="size-12" />
					</div>
					<div className="flex items-center gap-4">
						<div className="mr-auto hidden w-full flex-1 sm:block">
							<Search />
						</div>
						<div className="flex items-center gap-5">
							<Button asChild variant="ghost" size="lg">
								<Link to="/dashboard">Dashboard</Link>
							</Button>
						</div>
					</div>
				</nav>
			</header>

			<div className="flex-1">{children}</div>
		</div>
	);
}
