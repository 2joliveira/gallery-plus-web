import { Link } from "react-router";
import { buttonTextVariants, buttonVariants, Divider, Text } from "@/components";
import { Skeleton } from "@/components";
import type { AlbumResponse } from "../hooks/use-albums-photos";
import FileImageIcon from "@/assets/icons/image.svg?react";
import Icon from "@/components/icon";

interface AlbumWidgetProps {
  album: AlbumResponse;
  loading?: boolean;
}

export function AlbumWidget({ album, loading }: AlbumWidgetProps) {
  return (
    <div className="flex flex-col gap-4 p-4 border border-border-primary rounded-2xl ">
      {!loading ? (
        <div className="grid grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              className="flex items-center justify-center overflow-hidden"
              key={`photos-${index}`}
            >
              {album.photos[index]?.url ? (
                <img
                  key={`index-${index}`}
                  src={album.photos[index]?.url}
                  className="w-full h-24 object-cover"
                />
              ) : (
                <Icon
                  svg={FileImageIcon}
                  className="fill-accent-span w-24 h-24"
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <Skeleton className="w-20 h-20 rounded-lg" />
      )}
      
      <Divider />

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
