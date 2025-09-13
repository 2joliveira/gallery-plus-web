import { api } from "@/utils/api";
import type { PhotoNewFormSchema } from "../schema";

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
    } catch (err) {
      throw console.error(err);
    }
  }
  return {
    createPhoto,
  };
}
