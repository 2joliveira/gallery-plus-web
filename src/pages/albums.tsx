import { Container, Text } from "@/components";
import { Albumslist } from "@/contexts/albums/components";

export function Albums() {
  return (
    <Container>
      <Text as="h2" variant="heading-large" className="mb-6">
        Álbuns
      </Text>

      <Albumslist />
    </Container>
  );
}
