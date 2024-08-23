import { zodResolver } from "@hookform/resolvers/zod"
import * as React from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import type { z } from "zod"

import { Icons } from "@/components/icons"
import { Logo } from "@/components/icons/logo"
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
import { useUserMutation } from "@/hooks/query/use-user"
import { cn } from "@/lib/utils"
import type { ILoginForm } from "@/models/user"
import { loginFormSchema } from "@/models/user"

export function Component() {
  return (
    <div className="container relative grid h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Logo className="mr-2 size-6" />
          Acme Inc
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our
            {" "}
            <Link
              to="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>
            {" "}
            and
            {" "}
            <Link
              to="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const loginMutation = useUserMutation()
  const navigate = useNavigate()
  const form = useForm<ILoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    toast.promise(loginMutation.mutateAsync(values), {
      position: "top-center",
      loading: "Loading...",
      success: () => {
        navigate("/dashboard", {
          replace: true,
        })
        return "Login successful"
      },
      error: "Error",
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
                  <FormLabel className="sr-only">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="name@example.com"
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
                  <FormLabel className="sr-only">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Password"
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
              Sign In with Email
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
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? (
          <Icons.spinner className="mr-2 size-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 size-4" />
        )}
        Github
      </Button>
    </div>
  )
}
