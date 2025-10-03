import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  ButtonIcon,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  InputText,
  Skeleton,
  Text,
} from "@/components";
import { PhotoSelectable } from "@/contexts/photos/components";
import { useAlbum } from "../hooks/use-album";
import { albumNewFormSchema, type AlbumNewFormSchema } from "../schema";
import ChevronRightIcon from "@/assets/icons/chevron-right.svg?react";
import ChevronLeftIcon from "@/assets/icons/chevron-left.svg?react";
import SelectCheckboxIlustration from "@/assets/images/select-checkbox.svg?react";
import { usePhotos } from "@/contexts/photos/hooks/use-photos";

interface AlbumNewDialogProps {
  trigger: React.ReactNode;
}

export function AlbumNewDialog({ trigger }: AlbumNewDialogProps) {
  const { createAlbum } = useAlbum();
  const [isCreatingAlbum, setIsCreatingAlbum] = useTransition();
  const { photos, isLoadingPhotos, setPage, hasMore, page } = usePhotos();
  const [modalOpen, setModalOpen] = useState(false);
  const form = useForm<AlbumNewFormSchema>({
    resolver: zodResolver(albumNewFormSchema),
  });

  useEffect(() => {
    if (!modalOpen) {
      form.reset();
      setPage(1);
    }
  }, [modalOpen, form, setPage]);

  function handleTogglePhoto(selected: boolean, photoId: string) {
    const photosIds = form.getValues("photosIds") || [];
    let currentValues = [];

    if (selected) {
      currentValues = [...photosIds, photoId];
    } else {
      currentValues = photosIds.filter((id) => id !== photoId);
    }

    form.setValue("photosIds", currentValues);
  }

  function handleSubmit(payload: AlbumNewFormSchema) {
    setIsCreatingAlbum(async () => {
      createAlbum(payload);
      setModalOpen(false);
    });
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogHeader>Criar álbum</DialogHeader>

          <DialogBody className="flex flex-col gap-5">
            <InputText
              placeholder="Adicione um título"
              error={form.formState.errors.title?.message}
              {...form.register("title")}
            />

            <div className="flex flex-col space-y-3">
              <Text as="div" variant="label-small">
                Fotos cadastradas
              </Text>

              {!isLoadingPhotos && photos.length > 0 && (
                <div className="flex items-center justify-between space-x-1">
                  <ButtonIcon
                    type="button"
                    variant="secondary"
                    icon={ChevronLeftIcon}
                    className="w-7 p-0 h-45"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  />

                  <div className="flex flex-wrap gap-1 items-center justify-center">
                    {photos.map((photo) => (
                      <PhotoSelectable
                        key={photo.id}
                        src={photo.url}
                        title={photo.title}
                        imageClassName="w-19 h-19"
                        selected={form
                          .getValues("photosIds")
                          ?.includes(photo.id)}
                        onSelectimage={(selected) =>
                          handleTogglePhoto(selected, photo.id)
                        }
                      />
                    ))}
                  </div>

                  <ButtonIcon
                    type="button"
                    variant="secondary"
                    icon={ChevronRightIcon}
                    className="w-7 p-0 h-45"
                    onClick={() => setPage(page + 1)}
                    disabled={!hasMore}
                  />
                </div>
              )}

              {isLoadingPhotos && (
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton
                      key={`photo-loading-${index}`}
                      className="w-20 h-20 rounded-lg"
                    />
                  ))}
                </div>
              )}

              {!isLoadingPhotos && photos.length === 0 && (
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
              <Button variant="secondary" disabled={isCreatingAlbum}>
                Cancelar
              </Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={isCreatingAlbum}
              handling={isCreatingAlbum}
            >
              Criar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
