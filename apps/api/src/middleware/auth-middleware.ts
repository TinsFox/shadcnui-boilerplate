import { auth } from "@/lib/auth";
import type { Context, Next } from "hono";
import { createMiddleware } from "hono/factory";
import { jwt } from "hono/jwt";

const authWhiteList = [
	"/api/auth/login",
	"/api/auth/register",
	"/api/seed",
	"/reference",
	"/doc",
];

export const authMiddleware = (c: Context, next: Next) => {
	if (authWhiteList.length === 0) {
		return next();
	}
	if (authWhiteList.includes(c.req.path)) {
		return next();
	}
	const jwtMiddleware = jwt({
		secret: c.env.JWT_SECRET,
		cookie: c.env.COOKIE_KEY,
	});
	return jwtMiddleware(c, next);
};

export const adminMiddleware = () => {
	return createMiddleware(async (c, next) => {
		const session = await auth.api.getSession({
			headers: c.req.raw.headers,
		});
		console.log("adminMiddleware session: ", session);
		await next();
	});
};
