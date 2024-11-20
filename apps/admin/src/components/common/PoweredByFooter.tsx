import pkg from "@pkg"

import { cn } from "@/lib/utils"

import { Logo } from "../icons/logo"

export const PoweredByFooter = ({ className }: { className?: string }) => (
  <footer className={cn("center mt-12 flex gap-2", className)}>
    Powered by
    {" "}
    <Logo className="size-5" />
    {" "}
    <a
      href={pkg.homepage}
      className="cursor-pointer font-bold no-underline"
      target="_blank"
      rel="noreferrer"
    >
      {APP_NAME}
    </a>
  </footer>
)
