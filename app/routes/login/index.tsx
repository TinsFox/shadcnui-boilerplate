import { zodResolver } from "@hookform/resolvers/zod"
import * as React from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"
import type { z } from "zod"

import { Icons } from "@/components/icons"
import { Logo } from "@/components/icons/logo"
import { LanguageSwitch } from "@/components/language-switch"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useUserLoginMutation } from "@/hooks/query/use-user"
import { getFetchErrorMessage } from "@/lib/api-fetch"
import { cn } from "@/lib/utils"
import type { ILoginForm } from "@/schema/user"
import { loginFormSchema } from "@/schema/user"

export default function LoginRoute() {
  const { t } = useTranslation("auth")
  return (
    <div className="container relative grid h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Logo className="mr-2 size-6" />
          {t("company.name")}
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">{t("company.testimonial.quote")}</p>
            <footer className="text-sm">{t("company.testimonial.name")}</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="absolute right-0 top-0 p-4">
          <LanguageSwitch />
        </div>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {t("login.create_account")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t("login.enter_email")}
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            {t("login.terms_of_service")}
            {" "}
            <Link
              to="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              {t("login.terms_of_service")}
            </Link>
            {" "}
            and
            {" "}
            <Link
              to="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              {t("login.privacy_policy")}
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { t } = useTranslation(["auth", "common", "errors"])
  const redirectUrl =
    new URLSearchParams(window.location.search).get("redirectTo") ||
      "/dashboard"

  const loginMutation = useUserLoginMutation()
  const navigate = useNavigate()
  const form = useForm<ILoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "admin@shadcn.com",
      password: "admin",
    },
  })

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    toast.promise(loginMutation.mutateAsync(values), {
      position: "top-center",
      loading: t("login.loading"),
      success: () => {
        navigate(redirectUrl, {
          replace: true,
        })
        return t("login.login_successful")
      },
      error: (error) => {
        const errorMessage = getFetchErrorMessage(error)
        return t(errorMessage)
      },
    })
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          aria-disabled={loginMutation.isPending}
        >
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-1">
                  <FormLabel className="sr-only">{t("login.email")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t("login.email_placeholder")}
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={loginMutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-1">
                  <FormLabel className="sr-only">
                    {t("login.password")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t("login.password_placeholder")}
                      type="password"
                      autoCapitalize="none"
                      autoComplete="current-password"
                      autoCorrect="off"
                      disabled={loginMutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loginMutation.isPending}>
              {loginMutation.isPending && (
                <Icons.spinner className="mr-2 size-4 animate-spin" />
              )}
              {t("login.sign_in_with_email")}
            </Button>
          </div>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {t("login.or_continue_with")}
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={loginMutation.isPending}
      >
        {t("social_login.github")}
      </Button>
    </div>
  )
}
