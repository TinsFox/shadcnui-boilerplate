import { zodResolver } from "@hookform/resolvers/zod"
import i18n from "i18next"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"

const items = [
  {
    id: "recents",
    label: i18n.t("settings.display.items.recents"),
  },
  {
    id: "home",
    label: i18n.t("settings.display.items.home"),
  },
  {
    id: "applications",
    label: i18n.t("settings.display.items.applications"),
  },
  {
    id: "desktop",
    label: i18n.t("settings.display.items.desktop"),
  },
  {
    id: "downloads",
    label: i18n.t("settings.display.items.downloads"),
  },
  {
    id: "documents",
    label: i18n.t("settings.display.items.documents"),
  },
] as const

const displayFormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some(Boolean), {
    message: "You have to select at least one item.",
  }),
})

type DisplayFormValues = z.infer<typeof displayFormSchema>

// This can come from your database or API.
const defaultValues: Partial<DisplayFormValues> = {
  items: ["recents", "home"],
}
export function DisplayForm() {
  const { t } = useTranslation()
  const form = useForm<DisplayFormValues>({
    resolver: zodResolver(displayFormSchema),
    defaultValues,
  })

  function onSubmit(data: DisplayFormValues) {
    toast({
      title: t("settings.display"),
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
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Sidebar</FormLabel>
                <FormDescription>
                  {t("settings.display.sidebar_description")}
                </FormDescription>
              </div>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => (
                    <FormItem
                      key={item.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => checked ?
                            field.onChange([...field.value, item.id]) :
                            field.onChange(
                              field.value?.filter(
                                (value) => value !== item.id,
                              ),
                            )}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{t("settings.display.update")}</Button>
      </form>
    </Form>
  )
}
