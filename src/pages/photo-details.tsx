import { Button, Container, ImagePreview, Skeleton, Text } from "@/components";
import { AlbumsListSelectable } from "@/contexts/albums/components";
import { useAlbums } from "@/contexts/albums/hooks/use-albums";
import { PhotosNavigator } from "@/contexts/photos/components";
import type { Photo } from "@/contexts/photos/models/photo";

export function PhotoDetails() {
  const { albums, isLoadingAlbums } = useAlbums();
  
  const isLoading = false;
  const photo = {
    id: "1",
    title: "Image 1",
    imageId: "portrait-tower.png",
    albums: [
      { id: "1", title: "Álbum 1" },
      { id: "2", title: "Álbum 2" },
      { id: "3", title: "Álbum 3" },
    ],
  } as Photo;

  return (
    <Container>
      <header className="flex items-center justify-between gap-8 mb-8">
        {!isLoading ? (
          <Text as="h2" variant="heading-large">
            photo.title
          </Text>
        ) : (
          <Skeleton className="w-48 h-8" />
        )}

        <PhotosNavigator loading={isLoading} />
      </header>

      <div className="grid grid-cols-[21rem_1fr] gap-24">
        <div className="space-y-3">
          {!isLoading ? (
            <ImagePreview
              src={`/images/${photo?.imageId}`}
              title={photo.title}
              imageClassName="h-[21rem]"
            />
          ) : (
            <Skeleton className="h-[21rem]" />
          )}

          {!isLoading ? (
            <Button variant="destructive">Excluir</Button>
          ) : (
            <Skeleton className="w-20 h-10" />
          )}
        </div>

        <div className="py-3">
          <Text as="h3" variant="heading-medium" className="mb-6">
            Álbuns
          </Text>

          <AlbumsListSelectable
            photo={photo}
            albums={albums}
            loading={isLoadingAlbums}
          />
        </div>
      </div>
    </Container>
  );
}
