import { Container, InputText } from "./components";
import SearchIcon from "./assets/icons/search.svg?react"

export default function App() {
	return (
		<Container>
			Initial Commit

			<InputText icon={SearchIcon} placeholder="Buscar Fotos" />
		</Container>
	);
}
