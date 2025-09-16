import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { photoNewFormSchema, type PhotoNewFormSchema } from "../schema";
import { useEffect, useState, useTransition } from "react";
import { usePhoto } from "../hooks/use-photo";
import { useAlbums } from "@/contexts/albums/hooks/use-albums";

interface PhotoNewDialogProps {
  trigger: React.ReactNode;
}

export function PhotoNewDialog({ trigger }: PhotoNewDialogProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const { albums, isLoadingAlbums } = useAlbums();

  const form = useForm<PhotoNewFormSchema>({
    resolver: zodResolver(photoNewFormSchema),
  });

  const { createPhoto } = usePhoto();
  const [isCreatingPhoto, setIsCreatingPhoto] = useTransition();

  const file = form.watch("file");
  const fileSource = file?.[0] ? URL.createObjectURL(file[0]) : undefined;

  const albumsIds = form.watch("albumsIds");

  useEffect(() => {
    if (!modalOpen) form.reset();
  }, [modalOpen, form]);

  function handleSelectAlbum(albumId: string) {
    const albumsIds = form.getValues("albumsIds") || [];
    const albumsSet = new Set(albumsIds);

    if (albumsSet.has(albumId)) {
      albumsSet.delete(albumId);
    } else {
      albumsSet.add(albumId);
    }

    form.setValue("albumsIds", Array.from(albumsSet), {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }

  function handleSubmit(payload: PhotoNewFormSchema) {
    setIsCreatingPhoto(async () => {
      await createPhoto(payload);
      setModalOpen(false);
    });
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogHeader>Adicionar foto</DialogHeader>

          <DialogBody className="flex flex-col gap-5">
            <InputText
              placeholder="Adicione um título"
              maxLength={255}
              error={form.formState.errors.title?.message}
              {...form.register("title")}
            />

            <Alert>
              Tamanho máximo: 50MB
              <br />
              Você pode selecionar arquivo em PNG, JPG ou JPEG
            </Alert>

            <InputSingleFile
              form={form}
              allowedExtensions={["png", "jpg", "jpeg"]}
              maxFileSizeMB={50}
              replaceBy={
                <ImagePreview src={fileSource} className="w-full h-56" />
              }
              error={form.formState.errors.file?.message}
              {...form.register("file")}
            />

            <div className="space-y-3">
              <Text as="div" variant="label-small">
                Selecionar álbuns
              </Text>

              <div className="flex flex-wrap gap-3">
                {!isLoadingAlbums &&
                  albums.length > 0 &&
                  albums.map((album) => (
                    <Button
                      key={album.id}
                      type="button"
                      variant={
                        albumsIds?.includes(album.id) ? "primary" : "ghost"
                      }
                      size="sm"
                      className="truncate"
                      onClick={() => handleSelectAlbum(album.id)}
                    >
                      {album.title}
                    </Button>
                  ))}

                {isLoadingAlbums &&
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
              <Button variant="secondary" disabled={isCreatingPhoto}>
                Cancelar
              </Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={isCreatingPhoto}
              handling={isCreatingPhoto}
            >
              Adicionar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
