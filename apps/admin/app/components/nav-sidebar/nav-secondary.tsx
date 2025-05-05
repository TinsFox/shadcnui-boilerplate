import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@repo/ui/sidebar";
import type { LucideIcon } from "lucide-react";
import type * as React from "react";
import { Link } from "react-router";

export function NavSecondary({
	items,
	...props
}: {
	items: {
		title: I18nKeys;
		url: string;
		icon: LucideIcon;
		external?: boolean;
	}[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
	return (
		<SidebarGroup {...props}>
			<SidebarGroupContent>
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton asChild size="sm">
								<Link to={item.url} target={item.external ? "_blank" : "_self"}>
									<item.icon />
									<span>{item.title}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
