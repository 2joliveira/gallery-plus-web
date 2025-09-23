import { api, fetcher } from "@/utils/api";
import type { PhotoNewFormSchema } from "../schema";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Photo } from "../models/photo";

interface PhotoDatailResponse extends Photo {
  url: string;
  nextPhotoId?: string;
  previousPhotoId?: string;
}

export function usePhoto(id?: string) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<PhotoDatailResponse>({
    queryKey: ["photo", id],
    queryFn: () => fetcher(`/photos/${id}`),
    enabled: !!id,
  });

  async function createPhoto(payload: PhotoNewFormSchema) {
    try {
      await api.post(
        `/photos`,
        { ...payload, file: payload.file[0] },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      queryClient.invalidateQueries({ queryKey: ["photos"] });

      toast.success("Foto salva com sucesso!");
    } catch (err) {
      toast.error(`Erro ao salvar foto: ${err}`);
      throw console.error(err);
    }
  }
  return {
    createPhoto,
    photo: data,
    nextPhotoId: data?.nextPhotoId,
    previousPhotoId: data?.previousPhotoId,
    isLoadingPhoto: isLoading,
  };
}
