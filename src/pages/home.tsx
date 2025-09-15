import { AlbumsFilter } from "@/contexts/albums/components";
import { Container } from "../components";
import { PhotoList } from "../contexts/photos/components";
import { usePhotos } from "@/contexts/photos/hooks/use-photos";

export function Home() {
  const { photos, isLoadingPhotos } = usePhotos();

  return (
    <Container>
      <AlbumsFilter
        albums={[
          { id: "1", title: "Álbum 1" },
          { id: "2", title: "Álbum 2" },
          { id: "3", title: "Álbum 3" },
        ]}
        className="mb-9"
      />

      <PhotoList photos={photos} loading={isLoadingPhotos} />
    </Container>
  );
}
