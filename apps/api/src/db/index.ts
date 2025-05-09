import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/neon-http";
import * as authSchema from "../../auth-schema";
import * as schema from "./schema";

export const db = drizzle(env.DATABASE_URL, {
	schema: { ...schema, ...authSchema },
});
