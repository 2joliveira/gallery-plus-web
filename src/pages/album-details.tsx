import { ButtonIcon, Container, Skeleton, Text } from "@/components";
import PencilIcon from "@/assets/icons/pencil.svg?react";
import TrashIcon from "@/assets/icons/trash.svg?react";
import { useAlbum } from "@/contexts/albums/hooks/use-album";

export function AlbumDetails() {
  const { data } = useAlbum();
  const isLoading = false
  return (
    <Container>
      <header className="flex items-center justify-between">
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
    </Container>
  );
}
