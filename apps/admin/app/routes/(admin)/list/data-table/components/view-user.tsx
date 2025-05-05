import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/avatar";
import { Button } from "@repo/ui/button";
import { DropdownMenuItem } from "@repo/ui/dropdown-menu";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@repo/ui/form";
import { useToast } from "@repo/ui/hooks/use-toast";
import { Input } from "@repo/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/ui/select";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@repo/ui/sheet";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { useUpdateUser } from "@/hooks/query/use-user";

import { betterUserWithRoleSchema, userRoles } from "@/schema/user";
import { CopyButton } from "@repo/ui/copy-button";
import type { UserWithRole } from "better-auth/plugins/admin";
import dayjs from "dayjs";

export function ViewUser({ user }: { user: UserWithRole }) {
	const [state, setState] = useState(false);
	const { toast } = useToast();
	const sheetCloseRef = useRef<HTMLButtonElement>(null);

	const form = useForm<UserWithRole>({
		resolver: zodResolver(betterUserWithRoleSchema),
		defaultValues: user,
	});

	const { mutate: updateUser, isPending } = useUpdateUser();

	function onSubmit(values: UserWithRole) {
		// updateUser(values, {
		// 	onSuccess: () => {
		// 		toast({
		// 			title: "Success",
		// 			description: "User information updated successfully",
		// 		});
		// 	},
		// 	onError: (error) => {
		// 		toast({
		// 			title: "Error",
		// 			description: error.message || "Failed to update user information",
		// 			variant: "destructive",
		// 		});
		// 	},
		// });
	}

	return (
		<Sheet open={state} onOpenChange={setState}>
			<SheetTrigger asChild>
				<DropdownMenuItem
					onSelect={(event) => {
						event.preventDefault();
						setState(true);
					}}
				>
					View customer
				</DropdownMenuItem>
			</SheetTrigger>
			<SheetContent className="sm:max-w-[500px]">
				<SheetHeader>
					<SheetTitle>User Profile</SheetTitle>
					<SheetDescription>View and edit user information</SheetDescription>
				</SheetHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<div className="mt-6">
							<div className="mb-6 flex items-center space-x-4">
								<Avatar className="size-20">
									<AvatarImage src={user.image || ""} />
									<AvatarFallback className="text-lg">
										{user.name?.charAt(0)}
									</AvatarFallback>
								</Avatar>
								<div className="space-y-1">
									<h3 className="text-xl font-semibold">{user.name}</h3>
									<p className="text-sm text-muted-foreground">{user.email}</p>
								</div>
							</div>

							<div className="space-y-4">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input {...field} type="email" readOnly />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="role"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Role</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select a role" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{userRoles.map((role) => (
														<SelectItem key={role} value={role}>
															{role}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="grid grid-cols-2 gap-4 border-t pt-4">
									<div className="group">
										<p className="text-sm text-muted-foreground">User ID</p>
										<p className="font-mono text-sm flex items-center gap-2">
											<span className="truncate">{user.id}</span>
											<CopyButton
												className="invisible group-hover:visible"
												value={user.id}
											/>
										</p>
									</div>
									<div>
										<p className="text-sm text-muted-foreground">Created At</p>
										<p className="font-medium">
											{dayjs(user.createdAt).format("YYYY-MM-DD")}
										</p>
									</div>
									<div>
										<p className="text-sm text-muted-foreground">
											Email Verified
										</p>
										<p className="font-medium">
											{user.emailVerified ? "Yes" : "No"}
										</p>
									</div>
									{user.banned && (
										<div>
											<p className="text-sm text-muted-foreground">
												Ban Reason
											</p>
											<p className="font-medium">{user.banReason}</p>
										</div>
									)}
								</div>
							</div>
						</div>

						<SheetFooter className="flex flex-row gap-2">
							<SheetClose ref={sheetCloseRef} asChild>
								<Button variant="outline">Cancel</Button>
							</SheetClose>
							<Button disabled={isPending}>
								{isPending ? "Saving..." : "Save changes"}
							</Button>
						</SheetFooter>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
}
