import { Link, useLocation } from "react-router";
import cn from "classnames";
import { Container } from "./container";
import Logo from "../assets/images/galeria-plus-full-logo.svg?react";
import { Button } from "./button";
import { PhotosSearch } from "./photos-search";
import { Divider } from "./divider";
import { PhotoNewDialog } from "@/contexts/photos/components";
import { AlbumNewDialog } from "@/contexts/albums/components";

interface MainHeaderProps extends React.ComponentProps<"div"> {}

export function MainHeader({ className, ...props }: MainHeaderProps) {
  const { pathname } = useLocation();
  return (
    <Container
      as="header"
      className={cn(`flex justify-between items-center gap-10`, className)}
      {...props}
    >
      <Link to="/">
        <Logo className="h-5" />
      </Link>

      {pathname === "/" && (
        <>
          <PhotosSearch />
          <Divider orientation="vertical" className="h-10" />
        </>
      )}

      <div className="flex items-center gap-3">
        {pathname !== "/albums" ? (
          <>
            <PhotoNewDialog trigger={<Button>Nova foto</Button>} />
            <Button variant="secondary" type="button">
              <Link to="/albums">Álbuns</Link>
            </Button>
          </>
        ) : (
          <AlbumNewDialog
            trigger={<Button variant="secondary">Criar álbum</Button>}
          />
        )}
      </div>
    </Container>
  );
}
