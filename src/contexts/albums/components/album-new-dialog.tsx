import {
  Button,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  ImagePreview,
  InputText,
  Skeleton,
  Text,
} from "@/components";
import type { Photo } from "@/contexts/photos/models/photo";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import SelectCheckboxIlustration from "@/assets/images/select-checkbox.svg?react";

interface AlbumNewDialogProps {
  trigger: React.ReactNode;
}

export function AlbumNewDialog({ trigger }: AlbumNewDialogProps) {
  const photos: Photo[] = [
    {
      id: "1",
      title: "Image 1",
      imageId: "portrait-tower.png",
      albums: [
        { id: "1", title: "Álbum 1" },
        { id: "2", title: "Álbum 2" },
        { id: "3", title: "Álbum 3" },
      ],
    },
    {
      id: "2",
      title: "Image 2",
      imageId: "portrait-tower.png",
      albums: [
        { id: "1", title: "Álbum 1" },
        { id: "2", title: "Álbum 2" },
        { id: "3", title: "Álbum 3" },
      ],
    },
    {
      id: "3",
      title: "Image 3",
      imageId: "portrait-tower.png",
      albums: [
        { id: "1", title: "Álbum 1" },
        { id: "2", title: "Álbum 2" },
        { id: "3", title: "Álbum 3" },
      ],
    },
  ];
  
  const isLoading = false;

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>Criar álbum</DialogHeader>

        <DialogBody className="flex flex-col gap-5">
          <InputText placeholder="Adicione um título" />

          <div className="space-y-3">
            <Text as="div" variant="label-small">
              Fotos cadastradas
            </Text>

            {!isLoading && photos.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {photos.map((photo) => (
                  <ImagePreview
                    key={photo.id}
                    src={`/images/${photo.imageId}`}
                    title={photo.title}
                    className="w-20 h-20 rounded"
                  />
                ))}
              </div>
            )}

            {isLoading && (
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton
                    key={`photo-loading-${index}`}
                    className="w-20 h-20 rounded"
                  />
                ))}
              </div>
            )}

            {!isLoading && photos.length === 0 && (
              <div className="w-full flex flex-col justify-center items-center gap-3">
                <SelectCheckboxIlustration />

                <Text variant="paragraph-medium" className="text-center">
                  Nenhuma foto disponível para selção
                </Text>
              </div>
            )}
          </div>
        </DialogBody>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>

          <Button>Criar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
