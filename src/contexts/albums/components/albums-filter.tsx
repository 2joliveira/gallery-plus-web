import { Button, Skeleton, Text } from "@/components";
import cx from "classnames";
import { useAlbums } from "../hooks/use-albums";
import { usePhotos } from "@/contexts/photos/hooks/use-photos";

interface AlbumsFilterProps extends React.ComponentProps<"div"> {}

export function AlbumsFilter({ className, ...props }: AlbumsFilterProps) {
  const { albums, isLoadingAlbums } = useAlbums();
  const { filters } = usePhotos();

  return (
    <div
      className={cx("flex items-center gap-3.5 overflow-x-auto", className)}
      {...props}
    >
      <Text variant="heading-small">Álbuns</Text>
      <div className="flex gap-3">
        {!isLoadingAlbums ? (
          <>
            <Button
              variant={filters.albumId === null ? "primary" : "ghost"}
              size="sm"
              className="cursor-pointer"
              onClick={() => filters.setAlbumId(null)}
            >
              Todos
            </Button>
            {albums.map((album) => (
              <Button
                key={album.id}
                size="sm"
                className="cursor-pointer"
                variant={filters.albumId === album.id ? "primary" : "ghost"}
                onClick={() => filters.setAlbumId(album.id)}
              >
                {album.title}
              </Button>
            ))}
          </>
        ) : (
          Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={`album-button-loading-${index}`}
              className="w-28 h-7"
            />
          ))
        )}
      </div>
    </div>
  );
}
