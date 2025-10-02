import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/utils/api";
import {
  createSerializer,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "nuqs";

const toSearchParams = createSerializer({
  page: parseAsInteger,
  albumId: parseAsString,
});

export function useAlbumPhotos(albumId: string | null = null) {
  const [page, setPage] = useQueryState("page", {
    defaultValue: 1,
    parse: Number,
    serialize: String,
  });

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["album", page, albumId],
    queryFn: () => fetcher(`/photos${toSearchParams({ page, albumId })}`),
  });

  return {
    photos: data?.photos ?? [],
    hasMore: data?.hasMore ?? false,
    total: data?.total ?? 0,
    isLoadingPhotos: isLoading,
    handling: isFetching,
    page,
    setPage,
  };
}
