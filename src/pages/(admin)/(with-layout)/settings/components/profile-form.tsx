import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { useUser } from "@/hooks/query/use-user"
import { cn } from "@/lib/utils"

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }).default(""),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email().default(""),
  bio: z.string().max(160).min(4).default(""),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      }),
    )
    .optional().default([]),
})
const defaultValues: Partial<ProfileFormValues> = {
  username: "",
  email: "",
  bio: "",
  urls: [],
}
type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileForm() {
  const { t } = useTranslation()
  const user = useUser()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })
  // note: https://github.com/orgs/react-hook-form/discussions/4918#discussioncomment-3568702
  useEffect(() => {
    if (user.data) {
      form.setValue("username", user.data.username)
      form.setValue("email", user.data.email)
      form.setValue("bio", user.data.bio)
      form.setValue("urls", user.data.urls)
    }
  }, [user])

  const { fields, append } = useFieldArray({
    name: "urls",
    control: form.control,
  })

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: t("form.you_submitted"),
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("settings.profile.username")}</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                {t("settings.profile.username_description")}
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
              <FormLabel>{t("settings.profile.email")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("settings.profile.email_description")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                {t("settings.profile.email_options_description")}
                {" "}
                <Link to="/examples/forms">{t("settings.profile.email_options")}</Link>
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
              <FormLabel>{t("settings.profile.bio")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("settings.profile.bio_description")}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t("settings.profile.bio_description")}
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
                    {t("settings.profile.urls")}
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    {t("settings.profile.urls_description")}
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
            {t("settings.profile.add_url")}
          </Button>
        </div>
        <Button type="submit">{t("settings.profile.update_profile")}</Button>
      </form>
    </Form>
  )
}
