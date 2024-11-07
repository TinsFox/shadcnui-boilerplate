import { zodResolver } from "@hookform/resolvers/zod"
import * as React from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const searchSchema = z.object({
  value: z.string(),
})

type SearchForm = z.infer<typeof searchSchema>

interface ProTableSearchProps {
  name: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
}

export function ProTableSearch({
  name,
  placeholder = "Search...",
  value,
  onChange,
}: ProTableSearchProps) {
  const form = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      value: value || "",
    },
  })

  React.useEffect(() => {
    form.reset({ value: value || "" })
  }, [value, form])

  return (
    <FormField
      control={form.control}
      name="value"
      render={({ field }) => (
        <FormItem className="space-y-0">
          <FormControl>
            <Input
              {...field}
              name={name}
              placeholder={placeholder}
              className="h-8 w-[150px]"
              onChange={(e) => {
                field.onChange(e)
                onChange?.(e.target.value)
              }}
            />
          </FormControl>
        </FormItem>
      )}
    />
  )
}
