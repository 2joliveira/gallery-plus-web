import { Button, Container, ImagePreview, Skeleton, Text } from "@/components";
import { AlbumsListSelectable } from "@/contexts/albums/components";
import { useAlbums } from "@/contexts/albums/hooks/use-albums";
import { PhotosNavigator } from "@/contexts/photos/components";
import { usePhoto } from "@/contexts/photos/hooks/use-photo";
import { useTransition } from "react";
import { useCallback } from "react";
import { useParams } from "react-router";

export function PhotoDetails() {
  const { id } = useParams();
  const { photo, isLoadingPhoto, nextPhotoId, previousPhotoId, deletePhoto } =
    usePhoto(id);
  const { albums, isLoadingAlbums } = useAlbums();
  const [isDeletingPhoto, setIsDeletingPhoto] = useTransition();

  function handleDeletephoto() {
    setIsDeletingPhoto(async () => {
      deletePhoto(photo!.imageId);
    });
  }

  const RenderAlbumsList = useCallback(() => {
    if (!photo) return;

    return (
      <AlbumsListSelectable
        photo={photo}
        albums={albums}
        loading={isLoadingAlbums}
      />
    );
  }, [albums, isLoadingAlbums, photo]);

  return (
    <Container>
      <header className="flex items-center justify-between gap-8 mb-8">
        {!isLoadingPhoto ? (
          <Text as="h2" variant="heading-large">
            {photo?.title}
          </Text>
        ) : (
          <Skeleton className="w-48 h-8" />
        )}

        <PhotosNavigator
          nextPhotoId={nextPhotoId}
          previousPhotoid={previousPhotoId}
          loading={isLoadingPhoto}
        />
      </header>

      <div className="grid grid-cols-[21rem_1fr] gap-24">
        <div className="space-y-3">
          {!isLoadingPhoto ? (
            <ImagePreview
              src={photo?.url}
              title={photo?.title}
              imageClassName="h-[21rem]"
            />
          ) : (
            <Skeleton className="h-[21rem]" />
          )}

          {!isLoadingPhoto ? (
            <Button
              onClick={handleDeletephoto}
              variant="destructive"
              handling={isDeletingPhoto}
            >
              Excluir
            </Button>
          ) : (
            <Skeleton className="w-20 h-10" />
          )}
        </div>

        {photo && (
          <div className="py-3">
            <Text as="h3" variant="heading-medium" className="mb-6">
              Álbuns
            </Text>

            <RenderAlbumsList />
          </div>
        )}
      </div>
    </Container>
  );
}
