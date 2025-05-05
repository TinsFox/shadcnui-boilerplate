import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { env } from "~/env";

export const authClient = createAuthClient({
	baseURL: env.VITE_APP_URL,
	plugins: [adminClient()],
});

export const { signOut, signIn, signUp, useSession } = createAuthClient();
export type Session = typeof authClient.$Infer.Session;
