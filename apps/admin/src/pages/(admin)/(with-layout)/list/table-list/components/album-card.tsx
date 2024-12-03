import { Button } from "@repo/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/card"
import { Separator } from "@repo/ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "@repo/ui/tooltip"
import { format } from "date-fns"
import { CheckIcon, ClipboardIcon, Share, TrendingDown, TrendingUp } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import * as React from "react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import type { IAlbum } from "@/schema/album"

export interface AlbumCardProps extends React.HTMLAttributes<HTMLDivElement> {
  album: IAlbum
}

export function AlbumCard(props: AlbumCardProps) {
  const { className, album, ...prop } = props
  const [hasCopied, setHasCopied] = React.useState(false)
  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-xl border shadow transition-all duration-200 ease-in-out hover:shadow-lg",
        className,
      )}
      {...prop}
    >
      <div className={cn("relative flex items-center justify-between gap-2 border-b bg-card p-3 text-card-foreground")}>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground truncate">
          {album.title}
        </div>
        <div className="flex items-center gap-2 sm:invisible sm:group-hover:visible">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className={cn(
                  className,
                )}
                onClick={() => {
                  navigator.clipboard.writeText(album.title)
                  toast.success("Copied!")
                }}
              >
                <span className="sr-only">Copy</span>
                {hasCopied ? <CheckIcon /> : <ClipboardIcon className="size-3.5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-black text-white">Copy Album Name</TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="mx-0 hidden h-4 md:flex" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className={cn(
                  className,
                )}
              >
                <span className="sr-only">Share</span>
                <Share className="size-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="rounded-md border bg-card text-card-foreground shadow">
              <QRCodeSVG
                value={album.url}
                title={album.title}
                size={128}
                bgColor="#ffffff"
                fgColor="#000000"
                level="L"
                marginSize={0}
              />
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="flex-grow [&>div]:rounded-none [&>div]:border-none [&>div]:shadow-none">
        <Card className="h-full">
          <CardHeader className="space-y-2 p-4 py-2">
            <CardTitle className="line-clamp-1 text-base sm:text-lg">{album.title}</CardTitle>
            <CardDescription className="line-clamp-2 text-sm">
              {album.slogan}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <img
              className="aspect-video w-full rounded-md object-cover transition-all hover:scale-[1.02]"
              src={album.coverUrl}
              alt={album.title}
            />
          </CardContent>
          <CardFooter className="p-4">
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Trending
                  {" "}
                  {album.digitalDownloads}
                  {" "}
                  this month
                  {
                    album.digitalDownloads > 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />
                  }
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  {format(new Date(album.updatedAt), "MM/dd/yyyy")}
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
