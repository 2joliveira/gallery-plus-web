import { Link } from "react-router";
import { buttonTextVariants, buttonVariants, Text } from "@/components";
import { Skeleton } from "@/components";
import type { AlbumResponse } from "../hooks/use-albums-photos";

interface AlbumWidgetProps {
  album: AlbumResponse;
  loading?: boolean;
}

export function AlbumWidget({ album, loading }: AlbumWidgetProps) {
  return (
    <div className="flex flex-col gap-4">
      {!loading ? (
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <img
              key={`index-${index}`}
              src={album.photos[index]?.url}
              className="w-20 h-20"
            />
          ))}
        </div>
      ) : (
        <Skeleton className="w-20 h-20 rounded-lg" />
      )}

      <div className="flex flex-col gap-2">
        {!loading ? (
          <Text variant="paragraph-large" className="truncate">
            {album.title}
          </Text>
        ) : (
          <Skeleton className="w-full h-6" />
        )}
      </div>

      {!loading ? (
        <Link
          className={buttonVariants({
            variant: "secondary",
            className: "px-2 py-2",
          })}
          to={`/albums/${album.id}`}
        >
          <Text
            className={buttonTextVariants({ variant: "secondary", size: "sm" })}
          >
            Detalhes do Álbum
          </Text>
        </Link>
      ) : (
        <Skeleton className="w-full h-10" />
      )}
    </div>
  );
}
