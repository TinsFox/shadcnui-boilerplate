import { openAPISpecs } from "hono-openapi";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
// import { userRouter } from './module/users/users'
import { albumRouter } from "./module/albums/albums";

import { logger } from "hono/logger";
import { requestId } from "hono/request-id";

import { apiReference } from "@scalar/hono-api-reference";
import { Hono } from "hono";
import { showRoutes } from "hono/dev";
import { env } from "../env";
import { auth } from "./lib/auth";
import { formatTable } from "./lib/log";

import { adminMiddleware } from "./middleware/auth-middleware";
import { taskRouter } from "./module/tasks/tasks";
const app = new Hono<HonoEnvType>().basePath("/api");

app.use("*", logger());
app.use("*", csrf());
app.use("*", cors());
app.use("*", requestId());
app.use("*", adminMiddleware());

app.on(["POST", "GET"], "/auth/*", (c) => {
	return auth.handler(c.req.raw);
});

app.get("/", (c) => {
	return c.text(`Your request id is ${c.get("requestId")}`);
});

app.route("/albums", albumRouter);
// app.route(`/users`, userRouter)
app.route("/tasks", taskRouter);

showRoutes(app);
app.get(
	"/openapi",
	openAPISpecs(app, {
		documentation: {
			info: {
				title: "Hono",
				version: "1.0.0",
				description: "API documentation for Hono",
			},
			servers: [
				{
					url: `http://localhost:${env.API_PORT}`,
					description: "Local server",
				},
			],
		},
	}),
);

app.get(
	"/scalar-docs",
	apiReference({
		theme: "saturn",
		title: "Hono API Reference",
		url: `http://localhost:${env.API_PORT}/api/openapi`,
		authentication: {
			type: "bearer",
			name: "Authorization",
			in: "header",
		},
	}),
);
app.notFound((c) => c.json({ message: "Not Found", ok: false }, 404));

showRoutes(app, {
	colorize: true,
	verbose: true,
});

const serverInfo = [
	{ Description: "Server", URL: `http://localhost:${env.API_PORT}` },
	{ Description: "Server API", URL: `http://localhost:${env.API_PORT}/api` },
	{
		Description: "OpenAPI",
		URL: `http://localhost:${env.API_PORT}/api/openapi`,
	},
	{
		Description: "Scalar Docs",
		URL: `http://localhost:${env.API_PORT}/api/scalar-docs`,
	},
];

formatTable(serverInfo);

export default {
	fetch: app.fetch,
};
