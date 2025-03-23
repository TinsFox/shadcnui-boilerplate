import { cn } from "@/lib/utils";

import { Icons } from "./icons";

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {}
export function Loading({ className, ...props }: LoadingProps) {
	return (
		<div
			className={cn(
				"flex items-center justify-center text-sm text-muted-foreground",
				className,
			)}
			{...props}
		>
			<div className="flex items-center justify-center">
				<Icons.spinner className="mr-2 size-4 animate-spin" />
				<span>Loading...</span>
			</div>
		</div>
	);
}
