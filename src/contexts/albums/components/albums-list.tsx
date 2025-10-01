import { Button, Text } from "@/components";
import {
  useAlbumsPhotos,
  type AlbumResponse,
} from "../hooks/use-albums-photos";
import { AlbumWidget } from "./album-widget";

export function Albumslist() {
  const {
    albumsPhotos,
    isLoadingAlbumsPhotos,
    albumsPage,
    setAlbumsPage,
    hasMoreAlbums,
  } = useAlbumsPhotos();

  return (
    <div className="space-y-6">
      {!isLoadingAlbumsPhotos && albumsPhotos?.length > 0 && (
        <div className="grid grid-cols-2 gap-5">
          {albumsPhotos.map((album) => (
            <AlbumWidget
              key={album.id}
              album={album}
              loading={isLoadingAlbumsPhotos}
            />
          ))}
        </div>
      )}

      {isLoadingAlbumsPhotos && (
        <div className="grid grid-cols-2 gap-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <AlbumWidget
              key={`album-photo-${index}`}
              album={{} as AlbumResponse}
              loading={isLoadingAlbumsPhotos}
            />
          ))}
        </div>
      )}

      {!isLoadingAlbumsPhotos && albumsPhotos.length === 0 && (
        <div className="flex justify-center items-center h-full">
          <Text variant="paragraph-large">Nenhum álbum encontrado !</Text>
        </div>
      )}

      <div className="flex justify-center gap-4 items-center mt-6">
        <Button
          onClick={() => setAlbumsPage(albumsPage - 1)}
          disabled={albumsPage === 1}
        >
          Anterior
        </Button>
        <Text>Página {albumsPage}</Text>
        <Button
          onClick={() => setAlbumsPage(albumsPage + 1)}
          disabled={!hasMoreAlbums}
        >
          Próxima
        </Button>
      </div>
    </div>
  );
}
