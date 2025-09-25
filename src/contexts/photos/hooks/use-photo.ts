import { api, fetcher } from "@/utils/api";
import type { PhotoNewFormSchema } from "../schema";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Photo } from "../models/photo";
import { useNavigate } from "react-router";
import { usePhotos } from "./use-photos";

interface PhotoDatailResponse extends Photo {
  url: string;
  nextPhotoId?: string;
  previousPhotoId?: string;
}

export function usePhoto(id?: string) {
  const navigate = useNavigate();
  const {
    page,
    filters: { albumId, q },
  } = usePhotos();
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

  async function deletePhoto(photoId: string) {
    try {
      await api.delete(`/photos/${photoId}`);

      toast.success("Foto deletada com sucesso!");

      queryClient.invalidateQueries({ queryKey: ["photos", page, albumId, q] });

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao deletar foto!");
    }
  }

  return {
    createPhoto,
    photo: data,
    nextPhotoId: data?.nextPhotoId,
    previousPhotoId: data?.previousPhotoId,
    isLoadingPhoto: isLoading,
    deletePhoto,
  };
}
