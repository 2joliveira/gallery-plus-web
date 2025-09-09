import {
  Alert,
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  ImagePreview,
  InputSingleFile,
  InputText,
  Skeleton,
  Text,
} from "@/components";
import type { Album } from "@/contexts/albums/models/album";
import { useForm } from "react-hook-form";

interface PhotoNewDialogProps {
  trigger: React.ReactNode;
  loading?: boolean;
}

export function PhotoNewDialog({ trigger, loading }: PhotoNewDialogProps) {
  const form = useForm();

  const albums: Album[] = [
    { id: "1", title: "Álbum 1" },
    { id: "2", title: "Álbum 2" },
    { id: "3", title: "Álbum 3" },
  ];
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>Adicionar foto</DialogHeader>

        <DialogBody className="flex flex-col gap-5">
          <InputText placeholder="Adicione um título" maxLength={255} />

          <Alert>
            Tamanho máximo: 50MB
            <br />
            Você pode selecionar arquivo em PNG, JPG ou JPEG
          </Alert>

          <InputSingleFile
            form={form}
            allowedExtensions={["png", "jpg", "jpeg"]}
            maxFileSizeMB={50}
            replaceBy={<ImagePreview className="w-full h-56" />}
          />

          <div className="space-y-3">
            <Text as="div" variant="label-small">Selecionar álbuns</Text>

            <div className="flex flex-wrap gap-3">
              {!loading &&
                albums.length > 0 &&
                albums.map((album) => (
                  <Button
                    key={album.id}
                    variant="ghost"
                    size="sm"
                    className="truncate"
                  >
                    {album.title}
                  </Button>
                ))}

              {loading &&
                Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton
                    key={`album-loading-${index}`}
                    className="w-20 h-7"
                  />
                ))}
            </div>
          </div>
        </DialogBody>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>

          <Button>Adicionar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
