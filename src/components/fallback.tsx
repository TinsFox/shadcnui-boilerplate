import { Icons } from './icons'

export function Fallback() {
  return (
    <div className="flex items-center text-sm text-muted-foreground">
      <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
      Loading...
    </div>
  )
}
