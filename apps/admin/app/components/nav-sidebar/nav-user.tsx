import { Avatar, AvatarFallback, AvatarImage } from "@poketto/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@poketto/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@poketto/ui/sidebar";
import {
	BadgeCheck,
	Bell,
	ChevronsUpDown,
	CreditCard,
	LogOut,
	Sparkles,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import { useSession } from "@/hooks/query/use-user";
import { signOut } from "@/lib/auth-client";

export function NavUser() {
	const { isMobile } = useSidebar();
	const { t } = useTranslation("navigation");
	const { data: user } = useSession();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="size-8 rounded-lg">
								<AvatarImage
									src={user.data?.user.image || ""}
									alt={user.data?.user.name}
								/>
								<AvatarFallback className="rounded-lg">CN</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">
									{user.data?.user.name}
								</span>
								<span className="truncate text-xs">{user.data?.user.name}</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-popover p-1 text-popover-foreground shadow-md"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm">
								<Avatar className="size-8 rounded-lg">
									<AvatarImage
										src={user.data?.user.image || ""}
										alt={user.data?.user.name}
									/>
									<AvatarFallback className="rounded-lg">
										{user.data?.user.name.slice(0, 2)}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">
										{user.data?.user.name}
									</span>
									<span className="truncate text-xs text-muted-foreground">
										{user.data?.user.email}
									</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator className="my-1" />
						<DropdownMenuGroup>
							<DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5">
								<Sparkles className="size-4" />
								<span>{t("user.upgrade_pro")}</span>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator className="my-1" />
						<DropdownMenuGroup>
							<DropdownMenuItem
								className="flex items-center gap-2 px-2 py-1.5"
								asChild
							>
								<Link to="/settings/profile">
									<BadgeCheck className="size-4" />
									<span>{t("user.account")}</span>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem
								className="flex items-center gap-2 px-2 py-1.5"
								asChild
							>
								<Link to="/system/account/billing">
									<CreditCard className="size-4" />
									<span>{t("user.billing")}</span>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem
								className="flex items-center gap-2 px-2 py-1.5"
								asChild
							>
								<Link to="/system/notifications">
									<Bell className="size-4" />
									<span>{t("user.notifications")}</span>
								</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator className="my-1" />
						<DropdownMenuItem
							className="flex items-center gap-2 px-2 py-1.5"
							onSelect={() =>
								signOut().then(() => {
									window.location.replace("/");
								})
							}
						>
							<LogOut className="size-4" />
							<span>{t("user.logout")}</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
