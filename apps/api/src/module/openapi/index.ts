import { env } from "cloudflare:workers";
import { apiReference } from "@scalar/hono-api-reference";
import type { Hono } from "hono";
import { openAPISpecs } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import { z } from "zod";

// Create middleware function that sets up OpenAPI specs
export const openAPIMiddleware = (app: Hono) => {
	return openAPISpecs(app, {
		documentation: {
			info: {
				title: "poketto stack api",
				version: "0.1.0",
				description: "API documentation for Hono",
			},
			servers: [
				{
					url: env.API_HOST || "",
					description: "Local server",
				},
			],
		},
		defaultOptions: {
			GET: {
				responses: {
					400: {
						description: "Zod Error",
						content: {
							"application/json": {
								schema: resolver(
									z
										.object({
											status: z.literal(400),
											message: z.string(),
										})
										.openapi("Bad Request"),
								),
							},
						},
					},
					404: {
						description: "Not Found",
						content: {
							"application/json": {
								schema: resolver(z.object({ message: z.string() })),
							},
						},
					},
					401: {
						description: "Unauthorized",
						content: {
							"application/json": {
								schema: resolver(z.object({ message: z.string() })),
							},
						},
					},
					403: {
						description: "Forbidden",
						content: {
							"application/json": {
								schema: resolver(z.object({ message: z.string() })),
							},
						},
					},
					500: {
						description: "Internal Server Error",
						content: {
							"application/json": {
								schema: resolver(z.object({ message: z.string() })),
							},
						},
					},
				},
			},
		},
	});
};

// Create middleware for Scalar docs
export const scalarDocsMiddleware = () => {
	return apiReference({
		theme: "saturn",
		title: "Hono API Reference",
		url: `${env.API_HOST}/api/docs/openapi`,
		authentication: {
			type: "bearer",
			name: "Authorization",
			in: "header",
		},
	});
};
