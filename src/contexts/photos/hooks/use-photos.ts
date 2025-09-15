import { fetcher } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import type { Photo } from "../models/photo";

export interface PhotoResponse extends Photo {
  url: string;
}

export function usePhotos() {
  const { data, isLoading } = useQuery<PhotoResponse[]>({
    queryKey: ["photos"],
    queryFn: () => fetcher("/photos"),
  });

  return {
    photos: data || [],
    isLoadingPhotos: isLoading,
  };
}
