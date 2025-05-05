import {
	ArrowDownIcon,
	ArrowRightIcon,
	ArrowUpIcon,
	CheckCircledIcon,
	CircleIcon,
	CrossCircledIcon,
	QuestionMarkCircledIcon,
	StopwatchIcon,
} from "@radix-ui/react-icons";
import { FileWarning } from "lucide-react";

export const labels = [
	{
		value: "bug",
		label: "Bug",
	},
	{
		value: "feature",
		label: "Feature",
	},
	{
		value: "documentation",
		label: "Documentation",
	},
];

export const statuses = [
	{
		value: "BACKLOG",
		label: "Backlog",
		icon: QuestionMarkCircledIcon,
	},
	{
		value: "TODO",
		label: "Todo",
		icon: CircleIcon,
	},
	{
		value: "IN_PROGRESS",
		label: "In Progress",
		icon: StopwatchIcon,
	},
	{
		value: "DONE",
		label: "Done",
		icon: CheckCircledIcon,
	},
	{
		value: "CANCELLED",
		label: "Canceled",
		icon: CrossCircledIcon,
	},
];

export const priorities = [
	{
		label: "Low",
		value: "LOW",
		icon: ArrowDownIcon,
	},
	{
		label: "Medium",
		value: "MEDIUM",
		icon: ArrowRightIcon,
	},
	{
		label: "High",
		value: "HIGH",
		icon: ArrowUpIcon,
	},
	{
		label: "Urgent",
		value: "URGENT",
		icon: FileWarning,
	},
];
