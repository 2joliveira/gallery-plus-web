# Gallery Plus Web

Gallery Plus Web é uma aplicação moderna de galeria de fotos desenvolvida utilizando React + TypeScript, criada com Vite para desenvolvimento rápido, TanStack Query (React Query) para gerenciamento de dados assíncronos e nuqs para gerenciar o estado dos search params com uma tipagem segura.
O projeto oferece uma experiência responsiva e intuitiva para visualizar, buscar, filtrar, navegar e gerenciar fotos e álbuns, combinando performance, usabilidade e design contemporâneo.

## Funcionalidades

- Visualização de fotos
- Busca e filtro de fotos por nome e por álbum
- Paginação de fotos
- Criação de novos álbuns e upload de fotos
- Visualização de detalhes da foto
- Skeleton loading para melhor experiência
- Interface responsiva e moderna

## Tecnologias Utilizadas

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Query](https://tanstack.com/query/latest)
- [nuqs](https://github.com/47ng/nuqs) (gerenciamento de query string)
- [Tailwind CSS](https://tailwindcss.com/) (presumido pelo uso de classes utilitárias)

## Estrutura do Projeto

```
public/
  images/           # Imagens públicas
src/
  assets/           # Ícones e imagens internas
  components/       # Componentes reutilizáveis
  contexts/
    albums/         # Contexto e hooks de álbuns
    photos/         # Contexto e hooks de fotos
  layouts/          # Layouts de página
  pages/            # Páginas principais
  router/           # Rotas da aplicação
  utils/            # Funções utilitárias
```

## Como rodar o projeto

1. Instale as dependências:
   ```sh
   npm install
   # ou
   yarn
   ```
2. Rode o projeto em modo desenvolvimento:
   ```sh
   npm run dev
   # ou
   yarn dev
   ```
3. Acesse em [http://localhost:5173](http://localhost:5173) (ou porta configurada)

## Scripts Disponíveis

- `dev`: inicia o servidor de desenvolvimento
- `build`: gera a build de produção
- `preview`: visualiza a build de produção localmente
