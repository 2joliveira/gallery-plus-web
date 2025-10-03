import {
  createSerializer,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "nuqs";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/utils/api";
import type { Photo } from "../models/photo";

export interface PhotoResponse extends Photo {
  url: string;
}

export interface PhotosResponse {
  photos: PhotoResponse[];
  hasMore: boolean;
  total: number;
}

const toSearchParams = createSerializer({
  page: parseAsInteger,
  albumId: parseAsString,
  q: parseAsString,
});

export function usePhotos(selectedAlbumId?: string) {
  const [page, setPage] = useQueryState("page", {
    defaultValue: 1,
    parse: Number,
    serialize: String,
  });
  const [albumId, setAlbumId] = useQueryState("albumId", {
    defaultValue: selectedAlbumId ?? null,
    parse: String,
    serialize: String,
  });
  const [q, setQ] = useQueryState("q");

  const { data, isFetching, isLoading } = useQuery<PhotosResponse>({
    queryKey: ["photos", page, albumId, q],
    queryFn: () => fetcher(`/photos${toSearchParams({ page, albumId, q })}`),
    staleTime: 10000,
  });

  return {
    photos: data?.photos ?? [],
    hasMore: data?.hasMore ?? false,
    total: data?.total ?? 0,
    isLoadingPhotos: isLoading,
    handling: isFetching,
    page,
    setPage,
    filters: {
      albumId,
      setAlbumId,
      q,
      setQ,
    },
  };
}
