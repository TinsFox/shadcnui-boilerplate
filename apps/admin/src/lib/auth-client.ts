import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: "http://localhost:5173",
	plugins: [adminClient()],
});

export const { signOut, signIn, signUp, useSession } = createAuthClient();
export type Session = typeof authClient.$Infer.Session;
