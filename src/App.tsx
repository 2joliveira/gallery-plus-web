import { useForm } from "react-hook-form";
import {
  Button,
  Container,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  ImageFilePreview,
  InputSingleFile,
  Text,
} from "./components";

export default function App() {
  const form = useForm();
  const file = form.watch("file");
  const fileSrc = file?.[0] ? URL.createObjectURL(file[0]) : undefined;

  return (
    <Container>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Abrir Modal</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>Teste dialog</DialogHeader>
            <DialogBody>
              <Text as="div">Teste conteúdo do dialog</Text>

              <InputSingleFile
                allowedExtensions={["png", "jpg", "jpeg", "webp"]}
                maxFileSizeMB={50}
                form={form}
                replaceBy={<ImageFilePreview src={fileSrc} alt="Imagem" />}
                {...form.register("file")}
              />
            </DialogBody>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Cancelar</Button>
              </DialogClose>
              <Button>Adicionar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Container>
  );
}
