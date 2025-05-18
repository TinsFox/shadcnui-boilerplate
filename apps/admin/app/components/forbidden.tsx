import { Button } from "@poketto/ui/components/ui/button";
import { useNavigate } from "react-router";

interface ForbiddenProps {
	message?: string;
	redirectPath?: string;
	redirectText?: string;
}

export const Forbidden = ({
	message = "您没有权限访问此页面",
	redirectPath = "/dashboard",
	redirectText = "返回首页",
}: ForbiddenProps) => {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center justify-center min-h-[400px] p-8 border rounded-lg bg-background">
			<div className="mb-8 text-destructive">
				<svg
					className="w-20 h-20"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
						clipRule="evenodd"
					/>
				</svg>
			</div>

			<div className="space-y-2 text-center mb-8">
				<h1 className="text-4xl font-bold tracking-tight">403</h1>
				<h2 className="text-2xl font-semibold tracking-tight">访问被拒绝</h2>
				<p className="text-muted-foreground max-w-md">{message}</p>
			</div>

			<div className="flex gap-4">
				<Button variant="default" onClick={() => navigate(redirectPath)}>
					{redirectText}
				</Button>

				<Button variant="outline" onClick={() => navigate(-1)}>
					返回上一页
				</Button>
			</div>
		</div>
	);
};
