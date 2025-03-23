import { drizzle } from "drizzle-orm/neon-http";
import * as authSchema from "../../auth-schema";
import { env } from "../../env.js";
import * as schema from "./schema";

export const db = drizzle(env.DATABASE_URL, {
	schema: { ...schema, ...authSchema },
});
