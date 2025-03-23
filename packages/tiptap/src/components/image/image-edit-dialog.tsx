import { ImageIcon } from "@radix-ui/react-icons";
import type { Editor } from "@tiptap/react";
import type { VariantProps } from "class-variance-authority";
import { useState } from "react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import type { toggleVariants } from "@/components/ui/toggle";

import { ToolbarButton } from "../toolbar-button";
import { ImageEditBlock } from "./image-edit-block";

interface ImageEditDialogProps extends VariantProps<typeof toggleVariants> {
	editor: Editor;
}

const ImageEditDialog = ({ editor, size, variant }: ImageEditDialogProps) => {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<ToolbarButton
					isActive={editor.isActive("image")}
					tooltip="Image"
					aria-label="Image"
					size={size}
					variant={variant}
				>
					<ImageIcon className="size-5" />
				</ToolbarButton>
			</DialogTrigger>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>Select image</DialogTitle>
					<DialogDescription className="sr-only">
						Upload an image from your computer
					</DialogDescription>
				</DialogHeader>
				<ImageEditBlock editor={editor} close={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	);
};

export { ImageEditDialog };
