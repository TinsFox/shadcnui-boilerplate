import { adminClient } from "better-auth/client/plugins";
import { username } from "better-auth/plugins/username";
import { createAuthClient } from "better-auth/react";
import { env } from "~/env";

export const authClient = createAuthClient({
	baseURL: env.VITE_APP_URL,
	plugins: [adminClient(), username()],
});

export const { signOut, signIn, signUp, useSession } = authClient;

export type Session = typeof authClient.$Infer.Session;

export type User = (typeof authClient.$Infer.Session)["user"];
