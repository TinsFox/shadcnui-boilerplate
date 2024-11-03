import { useQuery } from "@tanstack/react-query"
import { albums } from "mock/albums"

export function useAlbums() {
  const { data } = useQuery({
    queryKey: ["albums"],
    queryFn: async () => albums,
  })

  return { data: { list: data } }
}
