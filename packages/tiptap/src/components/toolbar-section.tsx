import { CaretDownIcon } from "@radix-ui/react-icons";
import type { Editor } from "@tiptap/react";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { toggleVariants } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

import type { FormatAction } from "../types";
import { getShortcutKey } from "../utils";
import { ShortcutKey } from "./shortcut-key";
import { ToolbarButton } from "./toolbar-button";

interface ToolbarSectionProps extends VariantProps<typeof toggleVariants> {
	editor: Editor;
	actions: FormatAction[];
	activeActions?: string[];
	mainActionCount?: number;
	dropdownIcon?: React.ReactNode;
	dropdownTooltip?: string;
	dropdownClassName?: string;
}

export const ToolbarSection: React.FC<ToolbarSectionProps> = ({
	editor,
	actions,
	activeActions = actions.map((action) => action.value),
	mainActionCount = 0,
	dropdownIcon,
	dropdownTooltip = "More options",
	dropdownClassName = "w-12",
	size,
	variant,
}) => {
	const { mainActions, dropdownActions } = React.useMemo(() => {
		const sortedActions = actions
			.filter((action) => activeActions.includes(action.value))
			.sort(
				(a, b) =>
					activeActions.indexOf(a.value) - activeActions.indexOf(b.value),
			);

		return {
			mainActions: sortedActions.slice(0, mainActionCount),
			dropdownActions: sortedActions.slice(mainActionCount),
		};
	}, [actions, activeActions, mainActionCount]);

	const renderToolbarButton = React.useCallback(
		(action: FormatAction) => (
			<ToolbarButton
				key={action.label}
				onClick={() => action.action(editor)}
				disabled={!action.canExecute(editor)}
				isActive={action.isActive(editor)}
				tooltip={`${action.label} ${action.shortcuts.map((s) => getShortcutKey(s).symbol).join(" ")}`}
				aria-label={action.label}
				size={size}
				variant={variant}
			>
				{action.icon}
			</ToolbarButton>
		),
		[editor, size, variant],
	);

	const renderDropdownMenuItem = React.useCallback(
		(action: FormatAction) => (
			<DropdownMenuItem
				key={action.label}
				onClick={() => action.action(editor)}
				disabled={!action.canExecute(editor)}
				className={cn("flex flex-row items-center justify-between gap-4", {
					"bg-accent": action.isActive(editor),
				})}
				aria-label={action.label}
			>
				<span className="grow">{action.label}</span>
				<ShortcutKey keys={action.shortcuts} />
			</DropdownMenuItem>
		),
		[editor],
	);

	const isDropdownActive = React.useMemo(
		() => dropdownActions.some((action) => action.isActive(editor)),
		[dropdownActions, editor],
	);

	return (
		<>
			{mainActions.map((element) => renderToolbarButton(element))}
			{dropdownActions.length > 0 && (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<ToolbarButton
							isActive={isDropdownActive}
							tooltip={dropdownTooltip}
							aria-label={dropdownTooltip}
							className={cn(dropdownClassName)}
							size={size}
							variant={variant}
						>
							{dropdownIcon || <CaretDownIcon className="size-5" />}
						</ToolbarButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start" className="w-full">
						{dropdownActions.map((element) => renderDropdownMenuItem(element))}
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</>
	);
};

export default ToolbarSection;
