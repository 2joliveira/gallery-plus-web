import { Outlet } from "react-router";
import { MainHeader } from "../components";
import { MainContent } from "../components/main-content";

export function LayoutMain() {
  return (
    <>
      <MainHeader className="mt-9" />
      <MainContent>
        <Outlet />
      </MainContent>
    </>
  );
}
