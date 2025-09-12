import { api } from "@/utils/api";
import type { PhotoNewFormSchema } from "../schema";
import type { Photo } from "../models/photo";

export function usePhoto() {
  async function createPhoto(payload: PhotoNewFormSchema) {
    try {
      const { data: photo } = await api.post<Photo>("/photos", {
        title: payload.title,
      });

      await api.post(
        `/photo/${photo.id}/image`,
        { file: payload.file[0] },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (payload.albumsIds && payload.albumsIds.length > 0) {
        await api.put(`/photos/${photo.id}/albums`);
      }
    } catch (err) {
      throw console.error(err);
    }
  }
  return {
    createPhoto,
  };
}
