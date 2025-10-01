import { Select, Skeleton } from "@/components";
import cx from "classnames";
import { useAlbums } from "../hooks/use-albums";
import { usePhotos } from "@/contexts/photos/hooks/use-photos";
import { useState } from "react";

interface AlbumsFilterProps extends React.ComponentProps<"div"> {}

export function AlbumsFilter({ className, ...props }: AlbumsFilterProps) {
  const { albums, isLoadingAlbums } = useAlbums();
  const { filters, setPage } = usePhotos();
  const [selectedValue, setSelectedValue] = useState("null");

  const parsedAlbums = albums.map((album) => ({
    value: album.id,
    label: album.title,
  }));

  function onChangeValue(value: string) {
    setSelectedValue(value);
    setPage(1)
    filters.setAlbumId(value === "all" ? null : value);
  }

  return (
    <div
      className={cx("flex items-center gap-3.5 overflow-x-auto", className)}
      {...props}
    >
      {!isLoadingAlbums ? (
        <Select
          value={
            parsedAlbums.find((album) => album.value === selectedValue)
              ?.label || "Álbuns"
          }
          options={[{ label: "Álbuns", value: "all" }, ...parsedAlbums]}
          onChange={onChangeValue}
        />
      ) : (
        <Skeleton key={`album-select-loading`} className="w-28 h-7" />
      )}
    </div>
  );
}
