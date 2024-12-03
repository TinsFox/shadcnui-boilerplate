import { useAlbums } from "@/hooks/query/use-album"
import type { IAlbum } from "@/schema/album"

import { AlbumCard } from "./table-list/components/album-card"

export function Component() {
  const { data } = useAlbums()

  return (
    <div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
          {data?.list?.map((album: IAlbum) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </div>
    </div>
  )
}
