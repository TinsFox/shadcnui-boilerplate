import { Icons } from "./icons"

export function Fallback() {
  return (
    <div className="flex items-center text-sm text-muted-foreground">
      <Icons.spinner className="mr-2 size-4 animate-spin" />
      Loading...
    </div>
  )
}
