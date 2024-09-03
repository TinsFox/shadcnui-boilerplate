import { format } from "date-fns"
import { CheckIcon, ClipboardIcon, Share, TrendingDown, TrendingUp } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import * as React from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import type { IAlbum } from "@/models/album"

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
        "group relative flex max-w-xs flex-col overflow-hidden rounded-xl border shadow transition-all duration-200 ease-in-out",
        className,
      )}
      {...prop}
    >
      <div className={cn("relative flex items-center  justify-end gap-2 border-b bg-card px-3 py-2.5 text-card-foreground")}>
        <div className="flex items-center gap-1.5 pl-1 text-[13px] text-muted-foreground [&>svg]:size-[0.9rem]">
          {album.title}
        </div>
        <div className="invisible ml-auto flex items-center gap-2 transition-all duration-300 group-hover:visible">
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
      <div className="relative  [&>div]:rounded-none [&>div]:border-none [&>div]:shadow-none">
        <Card>
          <CardHeader>
            <CardTitle>{album.title}</CardTitle>
            <CardDescription>
              {album.slogan}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <img className="h-48 w-full rounded-md object-cover transition-all" src={album.cover} />
          </CardContent>
          <CardFooter>
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
