import { Link } from "react-router";
import cn from "classnames";
import {
  buttonTextVariants,
  buttonVariants,
  ImagePreview,
  Text,
} from "@/components";
import { Badge, Skeleton } from "@/components";
import type { PhotoResponse } from "../hooks/use-photos";

interface PhotoWidgetProps {
  photo: PhotoResponse;
  loading?: boolean;
  windowWidth: number;
}

export function PhotoWidget({ photo, loading, windowWidth }: PhotoWidgetProps) {
  return (
    <div className={cn("flex flex-col gap-4", windowWidth <= 398 && "w-full")}>
      {!loading ? (
        <ImagePreview
          src={photo.url}
          title={photo.title}
          imageClassName={cn("w-[10.875rem] h-[10.875rem]", windowWidth <= 398 && "w-full")}
        />
      ) : (
        <Skeleton className="w-[10.875rem] h-[10.875rem] rounded-lg" />
      )}

      <div className="flex flex-col gap-2">
        {!loading ? (
          <Text variant="paragraph-large" className="truncate">
            {photo.title}
          </Text>
        ) : (
          <Skeleton className="w-full h-6" />
        )}

        <div className="flex gap-1 min-h-[1.375rem]">
          {!loading ? (
            <>
              {photo.albums?.slice(0, 2).map((album) => (
                <Badge className="truncate" size="xs" key={album.id}>
                  {album.title}
                </Badge>
              ))}
              {photo.albums?.length > 2 && (
                <Badge size="xs">+{photo.albums.length - 2}</Badge>
              )}
            </>
          ) : (
            Array.from({ length: 2 }).map((_, index) => (
              <Skeleton
                key={`album-loading-${index}`}
                className="w-full h-4 rounded-sm"
              />
            ))
          )}
        </div>
      </div>

      {!loading ? (
        <Link
          className={buttonVariants({
            variant: "secondary",
            className: "px-2 py-2",
          })}
          to={`/photos/${photo.id}`}
        >
          <Text
            className={buttonTextVariants({ variant: "secondary", size: "sm" })}
          >
            Detalhes da imagem
          </Text>
        </Link>
      ) : (
        <Skeleton className="w-full h-10" />
      )}
    </div>
  );
}
