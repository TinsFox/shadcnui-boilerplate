import { z } from "zod"

export const userSchema = z.object({
  userId: z.string(),
  username: z.string(),
  email: z.string(),
  avatar: z.string(),
  password: z.string(),
  birthdate: z.date(),
  registeredAt: z.date(),
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
