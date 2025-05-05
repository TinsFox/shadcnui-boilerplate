import { FetchError, ofetch } from "ofetch";

import { getRedirectToLoginUrl } from "./utils";

export const apiFetch = ofetch.create({
	credentials: "include",
	retry: false,
	onRequest: async ({ options }) => {
		const header = new Headers(options.headers);

		options.headers = header;

		if (options.method && options.method.toLowerCase() !== "get") {
			if (typeof options.body === "string") {
				options.body = JSON.parse(options.body);
			}
			if (!options.body) {
				options.body = {};
			}
		}
	},
	onResponse() {
		// TODO: response interceptor
	},
	onResponseError(context) {
		if (context.response.status === 401) {
			return redirectToLogin();
		}
	},
});

export function redirectToLogin() {
	if (window.location.pathname === "/login") {
		return;
	}
	const redirectUrl = getRedirectToLoginUrl();
	window.location.replace(redirectUrl);
}

export const getFetchErrorMessage = (error: Error) => {
	if (error instanceof FetchError) {
		try {
			const json = error.response?._data;
			const { message } = json;
			return `${message || error.message}`;
		} catch {
			return error.message;
		}
	}

	return error.message;
};
