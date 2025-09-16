import { Button, Skeleton, Text } from "@/components";
import cx from "classnames";
import { useAlbums } from "../hooks/use-albums";

interface AlbumsFilterProps extends React.ComponentProps<"div"> {}

export function AlbumsFilter({ className, ...props }: AlbumsFilterProps) {
  const { albums, isLoadingAlbums } = useAlbums();

  return (
    <div
      className={cx("flex items-center gap-3.5 overflow-x-auto", className)}
      {...props}
    >
      <Text variant="heading-small">Álbuns</Text>
      <div className="flex gap-3">
        {!isLoadingAlbums ? (
          <>
            <Button variant="primary" size="sm" className="cursor-pointer">
              Todos
            </Button>
            {albums.map((album) => (
              <Button
                key={album.id}
                variant="ghost"
                size="sm"
                className="cursor-pointer"
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
