import type { UserWithRole } from "better-auth/plugins/admin";
import { z } from "zod";

export const userProfileSchema = z.object({
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
});
export type IUserProfile = z.infer<typeof userProfileSchema>;
export const userStatuses = ["active", "inactive", "busy"] as const;

export const userRoles = ["admin", "user", "guest", "member"] as const;

export const betterUserWithRoleSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string().email(),
	emailVerified: z.boolean().default(false),
	// image: z.coerce.string(),
	image: z.string(),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
	username: z.string().nullable(),
	displayUsername: z.string().nullable(),
	role: z.string().default("user"),
	banned: z.boolean().nullable(),
	banReason: z.string().nullable(),
	banExpires: z.string().datetime().nullable(),
});

export type IBetterAuthUsers = z.infer<typeof betterUserWithRoleSchema> &
	UserWithRole;

export const updateUserSchema = z.object({
	name: z.string(),
	image: z.string(),
});

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
	rememberMe: z.boolean().default(false),
});

export type ILoginForm = z.infer<typeof loginFormSchema>;

export const userStatus = ["active", "inactive", "pending"] as const;
