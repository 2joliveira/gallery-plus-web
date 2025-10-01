import { AlbumsFilter } from "@/contexts/albums/components";
import { Container } from "../components";
import { PhotoList } from "../contexts/photos/components";

export function Home() {
  return (
    <Container>
      <AlbumsFilter />

      <PhotoList />
    </Container>
  );
}
