import { AlbumsFilter } from "@/contexts/albums/components";
import { Container } from "../components";
import { PhotoList } from "../contexts/photos/components";
import { usePhotos } from "@/contexts/photos/hooks/use-photos";

export function Home() {
  const { photos, isLoadingPhotos, hasMore, total, page, setPage } =
    usePhotos();

  return (
    <Container>
      <AlbumsFilter />

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
