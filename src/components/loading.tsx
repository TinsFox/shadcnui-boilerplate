import { Icons } from "./icons"

export function Loading() {
  return (
    <div className="flex items-center justify-center text-sm text-muted-foreground">
      <div className="flex items-center justify-center">
        <Icons.spinner className="mr-2 size-4 animate-spin" />
        <span>Loading...</span>
      </div>
    </div>
  )
}
