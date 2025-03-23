import "./styles/index.css";

import type { Content, Editor } from "@tiptap/react";
import { EditorContent } from "@tiptap/react";
import * as React from "react";

import { cn } from "@/lib/utils";

import { LinkBubbleMenu } from "./components/bubble-menu/link-bubble-menu";
import { MeasuredContainer } from "./components/measured-container";
import { SectionTwo } from "./components/section/two";
import type { UseMinimalTiptapEditorProps } from "./hooks/use-minimal-tiptap";
import { useMinimalTiptapEditor } from "./hooks/use-minimal-tiptap";

export interface MinimalTiptapProps
	extends Omit<UseMinimalTiptapEditorProps, "onUpdate"> {
	value?: Content;
	onChange?: (value: Content) => void;
	className?: string;
	editorContentClassName?: string;
}

const Toolbar = ({ editor }: { editor: Editor }) => (
	<div className="shrink-0 overflow-x-auto border-t border-border p-2">
		<div className="flex w-max items-center gap-px">
			<SectionTwo
				editor={editor}
				activeActions={["bold", "italic", "underline", "strikethrough", "code"]}
				mainActionCount={5}
			/>
		</div>
	</div>
);

export const MinimalTiptapOne = React.forwardRef<
	HTMLDivElement,
	MinimalTiptapProps
>(({ value, onChange, className, editorContentClassName, ...props }, ref) => {
	const editor = useMinimalTiptapEditor({
		value,
		onUpdate: onChange,
		...props,
	});

	if (!editor) {
		return null;
	}

	return (
		<MeasuredContainer
			as="div"
			name="editor"
			ref={ref}
			className={cn(
				"flex h-auto min-h-72 w-full flex-col rounded-md border border-input shadow-sm focus-within:border-primary",
				className,
			)}
		>
			<EditorContent
				editor={editor}
				className={cn("minimal-tiptap-editor", editorContentClassName)}
			/>
			<Toolbar editor={editor} />
			<LinkBubbleMenu editor={editor} />
		</MeasuredContainer>
	);
});

MinimalTiptapOne.displayName = "MinimalTiptapOne";

export default MinimalTiptapOne;
