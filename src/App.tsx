import { useForm } from "react-hook-form";
import { Container, InputSingleFile } from "./components";

export default function App() {
  const form = useForm();
  return (
    <Container>
      Initial Commit
			<InputSingleFile form={form} {...form.register('file')} />
    </Container>
  );
}
