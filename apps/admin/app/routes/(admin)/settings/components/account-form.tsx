import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@poketto/ui/button";
import { Calendar } from "@poketto/ui/calendar";
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
import { Popover, PopoverContent, PopoverTrigger } from "@poketto/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@poketto/ui/select";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { languages } from "@/i18n";
import { cn } from "@/lib/utils";

const accountFormSchema = z.object({
	name: z
		.string()
		.min(2, {
			message: "error.name_min_length",
		})
		.max(30, {
			message: "error.name_max_length",
		}),
	dob: z.date({
		required_error: "error.dob_required",
	}),
	language: z.string({
		required_error: "error.language_required",
	}),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export function AccountForm() {
	const { toast } = useToast();
	const { t, i18n } = useTranslation(["settings"]);
	const form = useForm<AccountFormValues>({
		resolver: zodResolver(accountFormSchema),
		defaultValues: {
			language: i18n.language,
		},
	});

	function onSubmit(data: AccountFormValues) {
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
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t("sections.account.name")}</FormLabel>
							<FormControl>
								<Input
									placeholder={t("sections.account.your_name")}
									{...field}
								/>
							</FormControl>
							<FormDescription>
								{t("sections.account.name_description")}
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="dob"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>{t("sections.account.date_of_birth")}</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant="outline"
											className={cn(
												"w-[240px] pl-3 text-left font-normal",
												!field.value && "text-muted-foreground",
											)}
										>
											{field.value ? (
												format(field.value, "PPP")
											) : (
												<span>{t("sections.account.pick_date")}</span>
											)}
											<CalendarIcon className="ml-auto size-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) =>
											date > new Date() || date < new Date("1900-01-01")
										}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormDescription>
								{t("sections.account.dob_description")}
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="language"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>{t("sections.account.language")}</FormLabel>
							<Select
								value={field.value}
								onValueChange={(value) => {
									field.onChange(value);
									i18n.changeLanguage(value);
								}}
							>
								<FormControl>
									<SelectTrigger className="w-[240px]">
										<SelectValue
											placeholder={t("sections.account.select_language")}
										/>
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{languages.map((language) => (
										<SelectItem key={language.value} value={language.value}>
											{language.icon} {language.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormDescription>
								{t("sections.account.language_description")}
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">{t("sections.account.update_account")}</Button>
			</form>
		</Form>
	);
}
