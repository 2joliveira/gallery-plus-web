import { Container, PhotoWidget } from "../components";
import type { Photo } from "../models/photo";

export function Home() {
  return (
    <Container>
      <div className="grid grid-cols-4 gap-9">
        <PhotoWidget
          photo={{
            id: "123",
            title: "Olá mundo!",
            imageId: "portrait-tower.png",
            albums: [
              { id: "321", title: "Album 1" },
              { id: "321", title: "Album 2" },
              { id: "321", title: "Album 3" },
            ],
          }}
        />
        <PhotoWidget
          photo={{
            id: "123",
            title: "Olá mundo!",
            imageId: "portrait-tower.png",
            albums: [
              { id: "321", title: "Album 1" },
              { id: "321", title: "Album 2" },
              { id: "321", title: "Album 3" },
            ],
          }}
        />
        <PhotoWidget
          photo={{
            id: "123",
            title: "Olá mundo!",
            imageId: "portrait-tower.png",
            albums: [
              { id: "321", title: "Album 1" },
              { id: "321", title: "Album 2" },
              { id: "321", title: "Album 3" },
            ],
          }}
        />
        <PhotoWidget photo={{} as Photo} loading />
      </div>
    </Container>
  );
}
