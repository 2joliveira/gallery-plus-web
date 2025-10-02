import { useState } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ButtonIcon, Container, InputText, Skeleton, Text } from "@/components";
import { useAlbum } from "@/contexts/albums/hooks/use-album";
import { useAlbumPhotos } from "@/contexts/albums/hooks/use-album-photos";
import { PhotoList } from "@/contexts/photos/components";
import {
  albumNewFormSchema,
  type AlbumNewFormSchema,
} from "@/contexts/albums/schema";
import PencilIcon from "@/assets/icons/pencil.svg?react";
import TrashIcon from "@/assets/icons/trash.svg?react";
import CheckIcon from "@/assets/icons/check.svg?react";
import XIcon from "@/assets/icons/x.svg?react";

interface AlbumUpdateFormSchema extends Omit<AlbumNewFormSchema, "photosIds"> {}

export function AlbumDetails() {
  const { id } = useParams();
  const { formState, handleSubmit, register, reset } =
    useForm<AlbumUpdateFormSchema>({
      resolver: zodResolver(albumNewFormSchema),
    });
  const { data, isLoading, updateAlbum, deleteAlbum } = useAlbum(id);
  const { photos, isLoadingPhotos, hasMore, page, setPage, total } =
    useAlbumPhotos(id);

  const [isEditing, setIsEditing] = useState(false);

  function handeEditAlbum() {
    setIsEditing(true);
  }

  function handeCancelEditAlbum() {
    setIsEditing(false);
    reset();
  }

  function handleUpdateSubmit(payload: AlbumUpdateFormSchema) {
    updateAlbum(payload);
    setIsEditing(false);
  }

  function handleDeleteAlbum() {
    deleteAlbum();
  }

  return (
    <Container>
      <header className="flex items-center justify-between mb-4">
        {!isLoading && !isEditing && (
          <Text as="h2" variant="heading-large">
            {data?.title}
          </Text>
        )}

        {!isLoading && isEditing && (
          <form
            onSubmit={handleSubmit(handleUpdateSubmit)}
            className="flex items-center gap-2"
          >
            <InputText
              placeholder="Digite o novo título"
              error={formState.errors.title?.message}
              {...register("title")}
            />

            <ButtonIcon
              type="button"
              variant="destructive"
              icon={XIcon}
              onClick={handeCancelEditAlbum}
            />
            <ButtonIcon type="submit" variant="secondary" icon={CheckIcon} />
          </form>
        )}

        {isLoading && !isEditing && <Skeleton className="w-48 h-8" />}

        {!isEditing && (
          <div className="flex items-center gap-2">
            <ButtonIcon
              variant="secondary"
              icon={PencilIcon}
              className="text-white"
              disabled={isLoading}
              onClick={handeEditAlbum}
            />

            <ButtonIcon
              variant="secondary"
              icon={TrashIcon}
              className="text-white"
              disabled={isLoading}
              onClick={handleDeleteAlbum}
            />
          </div>
        )}
      </header>

      <PhotoList
        photos={photos}
        isLoadingPhotos={isLoadingPhotos}
        hasMore={hasMore}
        total={total}
        page={page}
        setPage={setPage}
      />
    </Container>
  );
}
