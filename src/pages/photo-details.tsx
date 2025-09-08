import { Container, Skeleton, Text } from "@/components";
import { PhotosNavigator } from "@/contexts/photos/components";

export function PhotoDetails() {
  const isLoading = false;

  return (
    <Container>
      <header className="flex items-center justify-between gap-8 mb-8">
        {!isLoading ? (
          <Text variant="heading-large">photo.title</Text>
        ) : (
          <Skeleton className="w-48 h-8" />
        )}

        <PhotosNavigator />
      </header>
    </Container>
  );
}
