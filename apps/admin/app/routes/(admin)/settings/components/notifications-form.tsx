import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/button";
import { Checkbox } from "@repo/ui/checkbox";
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
import { RadioGroup, RadioGroupItem } from "@repo/ui/radio-group";
import { Switch } from "@repo/ui/switch";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { z } from "zod";

const notificationsFormSchema = z.object({
	type: z.enum(["all", "mentions", "none"], {
		required_error: "You need to select a notification type.",
	}),
	mobile: z.boolean().default(false).optional(),
	communication_emails: z.boolean().default(false).optional(),
	social_emails: z.boolean().default(false).optional(),
	marketing_emails: z.boolean().default(false).optional(),
	security_emails: z.boolean(),
});

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<NotificationsFormValues> = {
	communication_emails: false,
	marketing_emails: false,
	social_emails: true,
	security_emails: true,
};
export function NotificationsForm() {
	const { t } = useTranslation(["settings"]);
	const { toast } = useToast();
	const form = useForm<NotificationsFormValues>({
		resolver: zodResolver(notificationsFormSchema),
		defaultValues,
	});

	function onSubmit(data: NotificationsFormValues) {
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
					name="type"
					render={({ field }) => (
						<FormItem className="space-y-3">
							<FormLabel>
								{t("sections.notifications.preferences.notify_about")}
							</FormLabel>
							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									defaultValue={field.value}
									className="flex flex-col space-y-1"
								>
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="all" />
										</FormControl>
										<FormLabel className="font-normal">
											{t(
												"sections.notifications.preferences.options.all_messages",
											)}
										</FormLabel>
									</FormItem>
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="mentions" />
										</FormControl>
										<FormLabel className="font-normal">
											{t(
												"sections.notifications.preferences.options.direct_messages",
											)}
										</FormLabel>
									</FormItem>
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="none" />
										</FormControl>
										<FormLabel className="font-normal">
											{t("sections.notifications.preferences.options.nothing")}
										</FormLabel>
									</FormItem>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div>
					<h3 className="mb-4 text-lg font-medium">
						{t("sections.notifications.email_settings.title")}
					</h3>
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="communication_emails"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
									<div className="space-y-0.5">
										<FormLabel className="text-base">
											{t("sections.notifications.email_settings.communication")}
										</FormLabel>
										<FormDescription>
											{t(
												"sections.notifications.update_notifications_description",
											)}
										</FormDescription>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="marketing_emails"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
									<div className="space-y-0.5">
										<FormLabel className="text-base">
											{t("sections.notifications.email_settings.marketing")}
										</FormLabel>
										<FormDescription>
											{t(
												"sections.notifications.update_notifications_description_2",
											)}
										</FormDescription>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="social_emails"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
									<div className="space-y-0.5">
										<FormLabel className="text-base">
											{t("sections.notifications.email_settings.social")}
										</FormLabel>
										<FormDescription>
											{t(
												"sections.notifications.update_notifications_description_3",
											)}
										</FormDescription>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="security_emails"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
									<div className="space-y-0.5">
										<FormLabel className="text-base">
											{t("sections.notifications.email_settings.security")}
										</FormLabel>
										<FormDescription>
											{t(
												"sections.notifications.update_notifications_description",
											)}
										</FormDescription>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
											disabled
											aria-readonly
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
				</div>
				<FormField
					control={form.control}
					name="mobile"
					render={({ field }) => (
						<FormItem className="flex flex-row items-start space-x-3 space-y-0">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className="space-y-1 leading-none">
								<FormLabel>
									{t("sections.notifications.mobile_settings.use_different")}
								</FormLabel>
								<FormDescription>
									{t("sections.notifications.mobile_settings.description")}{" "}
									<Link to="/examples/forms">
										{t("sections.notifications.mobile_settings.page")}
									</Link>
								</FormDescription>
							</div>
						</FormItem>
					)}
				/>
				<Button type="submit">
					{t("sections.notifications.update_notifications")}
				</Button>
			</form>
		</Form>
	);
}
