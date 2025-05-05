import { describe, expect, it } from "vitest";

import { render, screen } from "~/tests/test-utils";

import HomePage from "./index";

describe("HomePage", () => {
	it("renders main heading", () => {
		render(<HomePage />);
		expect(screen.getByText("Shadcn UI Boilerplate")).toBeInTheDocument();
	});

	it("contains link to documentation", () => {
		render(<HomePage />);
		const link = screen.getByText("Getting Started guide");
		expect(link).toHaveAttribute(
			"href",
			"https://shadcnui-boilerplate.pages.dev/guide/what-is-shadcn-ui-boilerplate",
		);
	});
});
