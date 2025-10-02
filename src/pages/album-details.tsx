import { ButtonIcon, Container, Skeleton, Text } from "@/components";
import { useParams } from "react-router";
import { useAlbum } from "@/contexts/albums/hooks/use-album";
import { useAlbumPhotos } from "@/contexts/albums/hooks/use-album-photos";
import PencilIcon from "@/assets/icons/pencil.svg?react";
import TrashIcon from "@/assets/icons/trash.svg?react";
import { PhotoList } from "@/contexts/photos/components";

export function AlbumDetails() {
  const { id } = useParams();
  const { data, isLoading } = useAlbum(id);
  const { photos, isLoadingPhotos, hasMore, page, setPage, total } =
    useAlbumPhotos(id);


  return (
    <Container>
      <header className="flex items-center justify-between mb-4">
        {!isLoading ? (
          <Text as="h2" variant="heading-large">
            {data?.title}
          </Text>
        ) : (
          <Skeleton className="w-48 h-8" />
        )}

        <div className="flex items-center gap-2">
          <ButtonIcon
            variant="secondary"
            icon={PencilIcon}
            className="text-white"
            disabled={isLoading}
          />

          <ButtonIcon
            variant="secondary"
            icon={TrashIcon}
            className="text-white"
            disabled={isLoading}
          />
        </div>
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
