import { Divider, InputCheckbox, Skeleton, Text } from "@/components";
import { usePhotoAlbums } from "@/contexts/photos/hooks/use-photo-albums";
import type { Photo } from "@/contexts/photos/models/photo";
import type { Album } from "../models/album";
import { useTransition } from "react";

interface AlbumsListSelectableProps {
  photo: Photo;
  albums: Album[];
  loading?: boolean;
}

export function AlbumsListSelectable({
  photo,
  albums,
  loading,
}: AlbumsListSelectableProps) {
  const { managePhotoOnAlbum } = usePhotoAlbums();
  const [isUpdatingPhoto, setisUpdatingphoto] = useTransition();

  function isChecked(albumId: string) {
    return photo?.albums?.some((album) => album.id === albumId);
  }

  function handlePhotoOnAlbums(albumId: string) {
    let albumsIds = [];

    if (isChecked(albumId)) {
      albumsIds = photo.albums
        .filter((album) => album.id !== albumId)
        .map((album) => album.id);
    } else {
      albumsIds = [...photo.albums.map((album) => album.id), albumId];
    }

    setisUpdatingphoto(async () => {
      await managePhotoOnAlbum(photo.id, albumsIds);
    });
  }

  return (
    <ul className="flex flex-col gap-4">
      {!loading &&
        albums.length > 0 &&
        albums.map((album, index) => (
          <li key={album.id}>
            <div className="flex items-center justify-between gap-1">
              <Text variant="paragraph-large" className="truncate">
                {album.title}
              </Text>

              <InputCheckbox
                defaultChecked={isChecked(album.id)}
                onClick={() => handlePhotoOnAlbums(album.id)}
                disabled={isUpdatingPhoto}
              />
            </div>

            {index !== albums.length - 1 && <Divider className="mt-4" />}
          </li>
        ))}

      {loading &&
        Array.from({ length: 5 }).map((_, index) => (
          <li key={`albums-list-${index}`}>
            <Skeleton className="h-[2.5rem]" />
          </li>
        ))}
    </ul>
  );
}
