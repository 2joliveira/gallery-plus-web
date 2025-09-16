import { api } from "@/utils/api";
import type { PhotoNewFormSchema } from "../schema";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export function usePhoto() {
  const queryClient = useQueryClient();
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
  };
}
