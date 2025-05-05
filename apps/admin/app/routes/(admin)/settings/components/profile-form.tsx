import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
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
import { Textarea } from "@repo/ui/textarea";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { z } from "zod";

import { useUser } from "@/hooks/query/use-user";
import { cn } from "@/lib/utils";

const profileFormSchema = z.object({
	username: z
		.string()
		.min(2, {
			message: "Username must be at least 2 characters.",
		})
		.max(30, {
			message: "Username must not be longer than 30 characters.",
		})
		.default(""),
	email: z
		.string({
			required_error: "Please select an email to display.",
		})
		.email()
		.default(""),
	bio: z.string().max(160).min(4).default(""),
	urls: z
		.array(
			z.object({
				value: z.string().url({ message: "Please enter a valid URL." }),
			}),
		)
		.optional()
		.default([]),
});
const defaultValues: Partial<ProfileFormValues> = {
	username: "",
	email: "",
	bio: "",
	urls: [],
};
type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
	const { t } = useTranslation(["settings"]);
	const user = useUser();
	const { toast } = useToast();
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues,
		mode: "onChange",
	});
	// note: https://github.com/orgs/react-hook-form/discussions/4918#discussioncomment-3568702
	useEffect(() => {
		if (user.data) {
			form.setValue("username", user.data.data?.user.name || "");
			form.setValue("email", user.data.data?.user.email || "");
		}
	}, [user.data, form]);

	const { fields, append } = useFieldArray({
		name: "urls",
		control: form.control,
	});

	function onSubmit(data: ProfileFormValues) {
		toast({
			title: t("form.you_submitted"),
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t("sections.profile.username")}</FormLabel>
							<FormControl>
								<Input placeholder="shadcn" {...field} />
							</FormControl>
							<FormDescription>
								{t("sections.profile.username_description")}
							</FormDescription>
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
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue
											placeholder={t("sections.profile.email_description")}
										/>
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="m@example.com">m@example.com</SelectItem>
									<SelectItem value="m@google.com">m@google.com</SelectItem>
									<SelectItem value="m@support.com">m@support.com</SelectItem>
								</SelectContent>
							</Select>
							<FormDescription>
								{t("sections.profile.email_options_description")}{" "}
								<Link to="/examples/forms">
									{t("sections.profile.email_options")}
								</Link>
								.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="bio"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t("sections.profile.bio")}</FormLabel>
							<FormControl>
								<Textarea
									placeholder={t("sections.profile.bio_description")}
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								{t("sections.profile.bio_description")}
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div>
					{fields.map((field, index) => (
						<FormField
							control={form.control}
							key={field.id}
							name={`urls.${index}.value`}
							render={({ field }) => (
								<FormItem>
									<FormLabel className={cn(index !== 0 && "sr-only")}>
										{t("sections.profile.urls")}
									</FormLabel>
									<FormDescription className={cn(index !== 0 && "sr-only")}>
										{t("sections.profile.urls_description")}
									</FormDescription>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					))}
					<Button
						type="button"
						variant="outline"
						size="sm"
						className="mt-2"
						onClick={() => append({ value: "" })}
					>
						{t("sections.profile.add_url")}
					</Button>
				</div>
				<Button type="submit">{t("sections.profile.update_profile")}</Button>
			</form>
		</Form>
	);
}
