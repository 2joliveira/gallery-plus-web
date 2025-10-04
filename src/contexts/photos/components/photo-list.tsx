import { PhotoWidget } from "./photo-widget";
import { Text, Skeleton, Button } from "@/components";
import { type PhotoResponse } from "../hooks/use-photos";
import { useWindowWidth } from "@/utils/windowWidth";

interface PhotoListProps {
  photos: PhotoResponse[];
  isLoadingPhotos: boolean;
  hasMore: boolean;
  total: number;
  page: number;
  setPage: (page: number) => void;
}

export function PhotoList({
  photos,
  isLoadingPhotos,
  hasMore,
  total,
  page,
  setPage,
}: PhotoListProps) {
  const { ref, windowWidth } = useWindowWidth();

  return (
    <div ref={ref} className="space-y-6 w-full">
      <Text
        as="div"
        variant="paragraph-large"
        className="flex items-center justify-end gap-1 text-accent-span"
      >
        Total:{" "}
        {!isLoadingPhotos ? (
          <div>{total}</div>
        ) : (
          <Skeleton className="w-6 h-6" />
        )}
      </Text>

      {!isLoadingPhotos && photos?.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-5">
          {photos.map((photo) => (
            <PhotoWidget
              key={photo.id}
              photo={photo}
              windowWidth={windowWidth}
            />
          ))}
        </div>
      )}

      {isLoadingPhotos && (
        <div className="flex flex-wrap items-center justify-center gap-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <PhotoWidget
              key={`photo-loading-${index}`}
              photo={{} as PhotoResponse}
              loading
              windowWidth={windowWidth}
            />
          ))}
        </div>
      )}

      {!isLoadingPhotos && photos.length === 0 && (
        <div className="flex justify-center items-center h-full">
          <Text variant="paragraph-large">Nenhuma foto encontrada !</Text>
        </div>
      )}

      <div className="flex justify-center gap-4 items-center mt-6">
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Anterior
        </Button>
        <Text>Página {page}</Text>
        <Button onClick={() => setPage(page + 1)} disabled={!hasMore}>
          Próxima
        </Button>
      </div>
    </div>
  );
}
