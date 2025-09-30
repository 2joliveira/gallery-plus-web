import { useQuery } from "@tanstack/react-query";
import type { Album } from "../models/album";
import { fetcher } from "@/utils/api";
import { createSerializer, parseAsInteger, useQueryState } from "nuqs";
import type { PhotoResponse } from "@/contexts/photos/hooks/use-photos";

export interface AlbumResponse extends Album {
  photos: PhotoResponse[];
}

interface AlbumsResponse {
  albums: AlbumResponse[];
  hasMore: boolean;
}

const toSearchParams = createSerializer({
  pageAlbums: parseAsInteger,
});

export function useAlbumsPhotos() {
  const [pageAlbums, setPageAlbums] = useQueryState("pageAlbums", {
    defaultValue: 1,
    parse: Number,
    serialize: String,
  });

  const {
    data: dataAlbumsPhotos,
    isLoading: isLoadingAlbumsPhotos,
  } = useQuery<AlbumsResponse>({
    queryKey: ["albums_photos", pageAlbums],
    queryFn: () => fetcher(`/albums/photos${toSearchParams({ pageAlbums })}`),
    staleTime: 10000,
  });

  return {
    albumsPhotos: dataAlbumsPhotos?.albums || [],
    hasMoreAlbums: dataAlbumsPhotos?.hasMore,
    isLoadingAlbumsPhotos,
    albumsPage: pageAlbums,
    setAlbumsPage: setPageAlbums,
  };
}
