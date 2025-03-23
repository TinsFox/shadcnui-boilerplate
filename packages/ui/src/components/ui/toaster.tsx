import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastTitle,
	ToastViewport,
	ToasterProviderPrimitive,
} from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

export function ToasterPrimitive() {
	const { toasts } = useToast();

	return (
		<ToasterProviderPrimitive>
			{toasts.map(({ id, title, description, action, ...props }) => (
				<Toast key={id} {...props}>
					<div className="grid gap-1">
						{title && <ToastTitle>{title}</ToastTitle>}
						{description && <ToastDescription>{description}</ToastDescription>}
					</div>
					{action}
					<ToastClose />
				</Toast>
			))}
			<ToastViewport />
		</ToasterProviderPrimitive>
	);
}
