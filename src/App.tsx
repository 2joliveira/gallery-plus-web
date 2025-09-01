import { useForm } from "react-hook-form";
import { Container, ImageFilePreview, InputSingleFile } from "./components";

export default function App() {
  const form = useForm();
  const file = form.watch("file");
  const fileResource = file?.[0] ? URL.createObjectURL(file[0]) : undefined;

  return (
    <Container>
      Initial Commit
      <InputSingleFile
        form={form}
        {...form.register("file")}
        allowedExtensions={["png", "jpg", "jpeg", "webp"]}
        maxFileSizeMB={50}
        replaceBy={<ImageFilePreview src={fileResource} alt="Imagem test" />}
      />
    </Container>
  );
}
