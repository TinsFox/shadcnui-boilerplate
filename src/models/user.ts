import { z } from "zod"

export const userSchema = z.object({
  userId: z.string(),
  avatar: z.string(),
  password: z.string(),
  birthdate: z.date(),
  registeredAt: z.date(),
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
})
export type IUserInfo = z.infer<typeof userSchema>

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
})

export type ILoginForm = z.infer<typeof loginFormSchema>
