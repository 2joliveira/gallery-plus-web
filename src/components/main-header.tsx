import { Link, useLocation } from "react-router";
import cn from "classnames";
import { Container } from "./container";
import Logo from "../assets/images/galeria-plus-full-logo.svg?react";
import { Button } from "./button";
import { PhotosSearch } from "./photos-search";
import { Divider } from "./divider";
import { PhotoNewDialog } from "@/contexts/photos/components";
import { AlbumNewDialog } from "@/contexts/albums/components";
import { useWindowWidth } from "@/utils/windowWidth";

interface MainHeaderProps extends React.ComponentProps<"div"> {}

export function MainHeader({ className, ...props }: MainHeaderProps) {
  const { pathname } = useLocation();
  const { ref, windowWidth } = useWindowWidth();

  return (
    <Container
      ref={ref}
      as="header"
      className={cn(
        `flex flex-col sm:flex-row justify-between items-center gap-5`,
        className
      )}
      {...props}
    >
      <Link to="/">
        <Logo className="h-5" />
      </Link>

      {pathname === "/" && (
        <>
          <PhotosSearch />
          {windowWidth > 650 && (
            <Divider orientation="vertical" className="h-10" />
          )}
        </>
      )}

      <div className="flex w-full sm:w-60 items-center gap-3">
        {pathname !== "/albums" ? (
          <>
            <PhotoNewDialog
              trigger={<Button className="w-full">Nova foto</Button>}
            />
            <Button className="w-full" variant="secondary" type="button">
              <Link to="/albums">Álbuns</Link>
            </Button>
          </>
        ) : (
          <AlbumNewDialog
            trigger={
              <Button className="w-full" variant="secondary">
                Criar álbum
              </Button>
            }
          />
        )}
      </div>
    </Container>
  );
}
