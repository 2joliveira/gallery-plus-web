import { api } from "@/utils/api";
import type { PhotoNewFormSchema } from "../schema";
import toast from "react-hot-toast";

export function usePhoto() {
  async function createPhoto(payload: PhotoNewFormSchema) {
    try {
      await api.post(
        `/photos`,
        { file: payload.file[0], title: payload.title },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

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
