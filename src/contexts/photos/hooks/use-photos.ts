import { useEffect, useState } from "react";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { fetcher } from "@/utils/api";
import type { Photo } from "../models/photo";

export interface PhotoResponse extends Photo {
  url: string;
}

interface Response {
  photos: PhotoResponse[];
  hasMore: boolean;
}

export function usePhotos() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const queryClient = useQueryClient();

  const fetchPhotos = async (currentPage: number) => {
    const response = await fetcher("/photos", {
      params: { page: currentPage, limit },
    });


    return {
      photos: response,
      hasMore: false,
    };
  };

  const { data, isFetching, isLoading, isPlaceholderData } = useQuery<Response>(
    {
      queryKey: ["photos", page],
      queryFn: () => fetchPhotos(page),
      placeholderData: keepPreviousData,
    }
  );

  useEffect(() => {
    if (!isPlaceholderData && data?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ["photos", page + 1],
        queryFn: () => fetchPhotos(page),
      });
    }
  }, [data, isPlaceholderData, page, queryClient]);

  return {
    photos: data?.photos ?? [],
    hasMore: data?.hasMore ?? false,
    isLoadingPhotos: isLoading,
    handling: isFetching,
    page,
    setPage,
    limit,
  };
}
