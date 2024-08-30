import { cn } from "@/lib/utils"

interface TailwindIndicatorProps {
  className?: string
  style?: React.CSSProperties
}

export function TailwindIndicator(props: TailwindIndicatorProps) {
  const { className, style } = props
  return (
    <div className={cn("z-50 flex size-6 items-center justify-center p-3 font-mono text-xs", className)} style={style}>
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block lg:hidden">md</div>
      <div className="hidden lg:block xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
  )
}
