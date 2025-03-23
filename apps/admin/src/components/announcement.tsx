import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Separator } from "@repo/ui/separator";
import { PieChart } from "lucide-react";
import { Link } from "react-router-dom";

export function Announcement() {
	return (
		<Link
			to="/docs/components/chart"
			className="group inline-flex items-center px-0.5 text-sm font-medium"
		>
			<PieChart className="size-4" />{" "}
			<Separator className="mx-2 h-4" orientation="vertical" />{" "}
			<span className="underline-offset-4 group-hover:underline">
				Introducing Charts
			</span>
			<ArrowRightIcon className="ml-1 size-4" />
		</Link>
	);
}
