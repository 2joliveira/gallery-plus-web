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

interface Response {
  photos: PhotoResponse[];
  hasMore: boolean;
}

const toSearchParams = createSerializer({
  page: parseAsInteger,
  albumId: parseAsString,
});

export function usePhotos() {
  const [pageParam, setPage] = useQueryState("page", {
    defaultValue: 1,
    parse: Number,
    serialize: String,
    shallow: false,
  });
  const [albumIdParam, setAlbumId] = useQueryState("albumId", {
    shallow: false,
  });

  const page = pageParam ?? 1;
  const albumId = albumIdParam ?? null;

  const { data, isFetching, isLoading } = useQuery<Response>({
    queryKey: ["photos", page, albumId],
    queryFn: () => fetcher(`/photos${toSearchParams({ page, albumId })}`),
  });

  return {
    photos: data?.photos ?? [],
    hasMore: data?.hasMore ?? false,
    isLoadingPhotos: isLoading,
    handling: isFetching,
    page,
    setPage,
    filters: {
      albumId,
      setAlbumId,
    },
  };
}
