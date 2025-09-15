import { PhotoWidget } from "./photo-widget";
import { Text, Skeleton } from "@/components";
import type { PhotoResponse } from "../hooks/use-photos";

interface PhotoListProps {
  photos: PhotoResponse[];
  loading?: boolean;
}

export function PhotoList({ photos, loading }: PhotoListProps) {
  return (
    <div className="space-y-6">
      <Text
        as="div"
        variant="paragraph-large"
        className="flex items-center justify-end gap-1 text-accent-span"
      >
        Total:{" "}
        {!loading ? (
          <div>{photos.length}</div>
        ) : (
          <Skeleton
            className="w-6 h-6"
          />
        )}
      </Text>

      {!loading && photos?.length > 0 && (
        <div className="grid grid-cols-5 gap-9">
          {photos.map((photo) => (
            <PhotoWidget key={photo.id} photo={photo} />
          ))}
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-5 gap-9">
          {Array.from({ length: 10 }).map((_, index) => (
            <PhotoWidget
              key={`photo-loading-${index}`}
              photo={{} as PhotoResponse}
              loading
            />
          ))}
        </div>
      )}

      {!loading && photos.length === 0 && (
        <div className="flex justify-center items-center h-full">
          <Text variant="paragraph-large">Nenhuma foto encontrada !</Text>
        </div>
      )}
    </div>
  );
}
