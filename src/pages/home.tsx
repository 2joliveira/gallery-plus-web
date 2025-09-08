import { AlbumsFilter } from "@/contexts/albums/components";
import { Container } from "../components";
import { PhotoList } from "../contexts/photos/components";

export function Home() {
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
      <PhotoList
        photos={[
          {
            id: "1",
            title: "Image 1",
            imageId: "portrait-tower.png",
            albums: [
              { id: "1", title: "Álbum 1" },
              { id: "2", title: "Álbum 2" },
              { id: "3", title: "Álbum 3" },
            ],
          },
          {
            id: "2",
            title: "Image 2",
            imageId: "portrait-tower.png",
            albums: [
              { id: "1", title: "Álbum 1" },
              { id: "2", title: "Álbum 2" },
              { id: "3", title: "Álbum 3" },
            ],
          },
          {
            id: "3",
            title: "Image 3",
            imageId: "portrait-tower.png",
            albums: [
              { id: "1", title: "Álbum 1" },
              { id: "2", title: "Álbum 2" },
              { id: "3", title: "Álbum 3" },
            ],
          },
        ]}
      />
    </Container>
  );
}
