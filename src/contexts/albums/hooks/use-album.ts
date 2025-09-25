import toast from "react-hot-toast";
import type { AlbumNewFormSchema } from "../schema";
import { api } from "@/utils/api";
import { useQueryClient } from "@tanstack/react-query";
import { usePhotos } from "@/contexts/photos/hooks/use-photos";

export function useAlbum() {
  const queryClient = useQueryClient();
  const {
    page,
    filters: { albumId },
  } = usePhotos();

  async function createAlbum(payload: AlbumNewFormSchema) {
    try {
      await api.post("albums", payload);

      queryClient.invalidateQueries({ queryKey: ["albums"] });
      queryClient.invalidateQueries({ queryKey: ["photos", page, albumId] });

      toast.success("Albúm criado com sucesso!");
    } catch (err) {
      toast.error(`Erro ao criar álbum: ${err}`);
    }
  }

  return {
    createAlbum,
  };
}
