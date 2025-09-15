import toast from "react-hot-toast";
import type { AlbumNewFormSchema } from "../schema";
import { api } from "@/utils/api";

export function useAlbum() {
  async function createAlbum(payload: AlbumNewFormSchema) {
    try {
      await api.post("albums", payload);

      toast.success("Albúm criado com sucesso!");
    } catch (err) {
      toast.error(`Erro ao criar álbum: ${err}`);
    }
  }

  return {
    createAlbum,
  };
}
