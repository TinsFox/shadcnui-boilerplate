import { Button } from "./ui/button";
import type { ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";
import { ClipboardIcon, CheckIcon } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

interface CopyButtonProps extends ButtonProps {
  value: string

}
export function CopyButton({
  value,
  className,
  size = "icon",
  variant = "ghost",

  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <Button
      size="icon"
      variant={variant}
      className={cn(
        "relative z-10 h-6 w-6 text-zinc-5 [&_svg]:h-3 [&_svg]:w-3",
        className
      )}
      onClick={() => {
        if (!navigator.clipboard) {
          toast.error("Clipboard API not available");
          throw new Error("Clipboard API not available");
        }
        if (!value) {
          toast.error("Text is empty");
          throw new Error("Text is empty");
        }
        navigator.clipboard.writeText(value);
        setHasCopied(true)
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
    </Button>
  )
}
