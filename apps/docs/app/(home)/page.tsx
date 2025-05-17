import { Badge } from "@poketto/ui/badge";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
	return (
		<main className="flex flex-col items-center px-4 py-16 md:py-24">
			<div className="container flex max-w-[980px] flex-col items-center gap-4">
				<Badge variant="outline" className="mb-4">
					v0.1.0 - Beta
				</Badge>

				<h1 className="text-center text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
					Poketto Stack
				</h1>

				<p className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
					Modern full-stack development boilerplate built with React, Next.js,
					Tauri, and more. Build type-safe applications with ease.
				</p>

				<div className="flex gap-4 mt-6">
					<Link
						href="/docs"
						className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
					>
						Get Started
						<ArrowRight className="h-4 w-4" />
					</Link>
					<Link
						href="https://github.com/TinsFox/poketto-stack"
						className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
					>
						<Github className="h-4 w-4" />
						GitHub
					</Link>
				</div>

				<div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					<FeatureCard
						icon={<CodeIcon className="h-10 w-10 text-primary" />}
						title="Type-Safe Development"
						description="End-to-end type safety with TypeScript across your entire stack. Catch errors before they happen."
					/>
					<FeatureCard
						icon={<LayersIcon className="h-10 w-10 text-primary" />}
						title="Monorepo Architecture"
						description="Organized as a monorepo using PNPM workspaces. Share code efficiently between projects."
					/>
					<FeatureCard
						icon={<BoxIcon className="h-10 w-10 text-primary" />}
						title="Modern Stack"
						description="Built with React, Next.js, Tauri, and Cloudflare Workers. Best-in-class developer experience."
					/>
				</div>
			</div>
		</main>
	);
}

function FeatureCard({
	icon,
	title,
	description,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
}) {
	return (
		<div className="relative overflow-hidden rounded-lg border bg-background p-6">
			{icon}
			<h3 className="mt-4 font-semibold">{title}</h3>
			<p className="mt-2 text-sm text-muted-foreground">{description}</p>
		</div>
	);
}

function CodeIcon(props: React.ComponentProps<"svg">) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<polyline points="16 18 22 12 16 6" />
			<polyline points="8 6 2 12 8 18" />
		</svg>
	);
}

function LayersIcon(props: React.ComponentProps<"svg">) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<polygon points="12 2 2 7 12 12 22 7 12 2" />
			<polyline points="2 17 12 22 22 17" />
			<polyline points="2 12 12 17 22 12" />
		</svg>
	);
}

function BoxIcon(props: React.ComponentProps<"svg">) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
			<path d="m3.3 7 8.7 5 8.7-5" />
			<path d="M12 22V12" />
		</svg>
	);
}
