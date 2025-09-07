import { Container } from "../components";
import { PhotoList } from "../contexts/photos/components";

export function Home() {
  return (
    <Container>
      <PhotoList
        photos={[
          
        ]}
        loading
      />
    </Container>
  );
}
