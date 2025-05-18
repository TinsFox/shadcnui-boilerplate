import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@poketto/ui/badge";
import { Button } from "@poketto/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@poketto/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@poketto/ui/form";
import { useToast } from "@poketto/ui/hooks/use-toast";
import { Input } from "@poketto/ui/input";
import { Separator } from "@poketto/ui/separator";
import { Skeleton } from "@poketto/ui/skeleton";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

const profileFormSchema = z.object({
	name: z
		.string()
		.min(2, {
			message: "Name must be at least 2 characters.",
		})
		.max(30, {
			message: "Name must not be longer than 30 characters.",
		})
		.default(""),
	email: z
		.string({
			required_error: "Please enter an email address.",
		})
		.email()
		.default(""),
	role: z
		.enum(["admin", "user"])
		.nullable()
		.transform((val) => val ?? "user")
		.default("user"),
	banned: z
		.boolean()
		.nullable()
		.transform((val) => (val === null ? false : val)),
	banReason: z
		.string()
		.nullable()
		.transform((val) => (val === null ? "" : val)),
	banExpires: z
		.string()
		.nullable()
		.transform((val) => (val === null ? "" : val)),
});

const defaultValues: Partial<ProfileFormValues> = {
	name: "",
	email: "",
	role: "user",
	banned: false,
	banReason: "",
	banExpires: "",
};

type ProfileFormValues = z.infer<typeof profileFormSchema>;

import { useSession } from "@/lib/auth-client";

export function ProfileForm() {
	const { t } = useTranslation(["settings"]);

	const { data: session, isPending, error, refetch } = useSession();

	const user = session?.user;
	const { toast } = useToast();
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues,
		mode: "onChange",
	});

	const isBanned = form.watch("banned");

	// note: https://github.com/orgs/react-hook-form/discussions/4918#discussioncomment-3568702
	useEffect(() => {
		if (user) {
			const result = profileFormSchema.safeParse({
				name: user.name,
				email: user.email,
				role: user.role,
				banned: user.banned,
				banReason: user.banReason,
				banExpires: user.banExpires,
			});

			if (result.success) {
				// 数据验证成功
				form.reset(result.data);
			} else {
				// 数据验证失败，使用默认值
				console.error("Data validation failed:", result.error);
				form.reset(defaultValues);

				// 可以显示错误提示
				toast({
					title: "Error",
					description: "Invalid data received from server",
					variant: "destructive",
				});
			}
		}
	}, [user, form, toast]);

	function onSubmit(data: ProfileFormValues) {
		// 只保留可以修改的字段
		const submittableData = {
			name: data.name,
			email: data.email,
		};

		toast({
			title: t("form.you_submitted"),
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">
						{JSON.stringify(submittableData, null, 2)}
					</code>
				</pre>
			),
		});
		refetch();
	}

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>{t("sections.profile.title", "Profile Settings")}</CardTitle>
				<CardDescription>
					{t("sections.profile.description", "Update your profile information")}
				</CardDescription>
			</CardHeader>
			<CardContent>
				{isPending ? (
					<div className="space-y-8">
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							<div className="space-y-2">
								<Skeleton className="h-5 w-20" />
								<Skeleton className="h-10 w-full" />
							</div>
							<div className="space-y-2">
								<Skeleton className="h-5 w-20" />
								<Skeleton className="h-10 w-full" />
							</div>
						</div>
						<div className="space-y-2">
							<Skeleton className="h-5 w-20" />
							<Skeleton className="h-10 w-32" />
						</div>
						<Separator className="my-6" />
						<div className="space-y-6">
							<div className="flex justify-between items-center p-4 border rounded-lg">
								<div className="space-y-2">
									<Skeleton className="h-5 w-32" />
									<Skeleton className="h-4 w-48" />
								</div>
								<Skeleton className="h-6 w-24" />
							</div>
						</div>
					</div>
				) : (
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("sections.profile.name")}</FormLabel>
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
											<FormLabel>{t("sections.profile.email")}</FormLabel>
											<FormControl>
												<Input {...field} type="email" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name="role"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("sections.profile.role")}</FormLabel>
										<FormControl>
											<div className="flex items-center gap-2">
												<Badge variant="secondary">
													{field.value === "admin" ? "Admin" : "User"}
												</Badge>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Separator className="my-6" />

							<div className="space-y-6">
								<FormField
									control={form.control}
									name="banned"
									render={({ field }) => (
										<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
											<div className="space-y-0.5">
												<FormLabel className="text-base">
													{t("sections.profile.banned")}
												</FormLabel>
												<FormDescription>
													{t("sections.profile.banned_description")}
												</FormDescription>
											</div>
											<FormControl>
												<Badge
													variant={field.value ? "destructive" : "secondary"}
												>
													{field.value
														? t("sections.profile.banned_true", "Banned")
														: t("sections.profile.banned_false", "Not Banned")}
												</Badge>
											</FormControl>
										</FormItem>
									)}
								/>

								{isBanned && (
									<>
										{" "}
										{form.watch("banned") && (
											<>
												<FormField
													control={form.control}
													name="banReason"
													render={({ field }) => (
														<FormItem>
															<FormLabel>
																{t("sections.profile.banReason")}
															</FormLabel>
															<FormControl>
																<div className="min-h-[100px] rounded-md border bg-muted/50 p-3">
																	{field.value || "-"}
																</div>
															</FormControl>
															<FormDescription>
																{t("sections.profile.banReason_description")}
															</FormDescription>
															<FormMessage />
														</FormItem>
													)}
												/>

												<FormField
													control={form.control}
													name="banExpires"
													render={({ field }) => (
														<FormItem>
															<FormLabel>
																{t("sections.profile.banExpires")}
															</FormLabel>
															<FormControl>
																<Input type="date" {...field} />
															</FormControl>
															<FormDescription>
																{t("sections.profile.banExpires_description")}
															</FormDescription>
															<FormMessage />
														</FormItem>
													)}
												/>
											</>
										)}
									</>
								)}
							</div>

							<div className="flex justify-end">
								<Button type="submit">
									{t("sections.profile.update_profile")}
								</Button>
							</div>
						</form>
					</Form>
				)}
			</CardContent>
		</Card>
	);
}
