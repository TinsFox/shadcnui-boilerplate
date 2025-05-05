import { toast } from "sonner";

interface CopyToClipboardOptions {
	value: string;
	info?: string;
}
/**
 * Copies the given text to the clipboard and shows a toast notification.
 *
 * @param {CopyToClipboardOptions} options - The options for copying to clipboard.
 * @param {string} options.value - The text to copy.
 * @param {string} [options.info] - Optional info message to display in the toast.
 * @throws Will throw an error if the Clipboard API is not available or if the text is empty.
 */
export function setClipboardText({
	value: text,
	info,
}: CopyToClipboardOptions) {
	if (!navigator.clipboard) {
		toast.error("Clipboard API not available");
		throw new Error("Clipboard API not available");
	}
	if (!text) {
		toast.error("Text is empty");
		throw new Error("Text is empty");
	}
	navigator.clipboard.writeText(text);
	toast.info(`${info ?? ""} copied to clipboard`);
}
