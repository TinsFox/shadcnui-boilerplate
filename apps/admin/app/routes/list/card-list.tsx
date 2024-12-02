import { useAlbums } from "@/hooks/query/use-album"
import type { IAlbum } from "@/schema/album"

import { AlbumCard } from "./table-list/components/album-card"

export default function CardListRoute() {
  const { data } = useAlbums()

  return (
    <div>
      <div className="grid flex-1 scroll-mt-20 grid-cols-2 items-start gap-10 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-5 xl:grid-cols-4 xl:gap-10 2xl:grid-cols-5 2xl:gap-5">
        {data?.list?.map((album: IAlbum) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </div>
  )
}
