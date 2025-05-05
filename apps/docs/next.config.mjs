import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	images: {
		remotePatterns: [new URL("https://vercel.com/**")],
	},
	redirects: async () => {
		return [
			{
				// Jump straight to the first page (no root index page)
				source: "/docs",
				destination: "/docs/quickstart",
				permanent: false,
			},
		];
	},
};

export default withMDX(config);
