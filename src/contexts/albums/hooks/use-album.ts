import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePhotos } from "@/contexts/photos/hooks/use-photos";
import { api, fetcher } from "@/utils/api";
import type { AlbumNewFormSchema } from "../schema";
import { useAlbumsPhotos } from "./use-albums-photos";

export function useAlbum(id?: string) {
  const queryClient = useQueryClient();
  const {
    page,
    filters: { albumId },
  } = usePhotos();
  const { albumsPage } = useAlbumsPhotos();

  const { data, isLoading } = useQuery({
    queryKey: ["album", id],
    queryFn: () => fetcher(`/albums/${id}`),
    enabled: !!id,
  });

  async function createAlbum(payload: AlbumNewFormSchema) {
    try {
      await api.post("albums", payload);

      queryClient.invalidateQueries({ queryKey: ["albums"] });
      queryClient.invalidateQueries({ queryKey: ["photos", page, albumId] });
      queryClient.invalidateQueries({
        queryKey: ["albums_photos", albumsPage],
      });

      toast.success("Albúm criado com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error('Erro ao criar álbum!');
    }
  }

  async function updateAlbum(payload: Partial<AlbumNewFormSchema>) {
    try {
      await api.put(`albums/${id}`, payload);

      queryClient.invalidateQueries({ queryKey: ["album", id] });

      toast.success("Albúm atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error('Erro ao atualizar álbum!');
    }
  }

  return {
    data,
    isLoading,
    createAlbum,
    updateAlbum,
  };
}
