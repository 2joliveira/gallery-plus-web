import { Outlet } from "react-router";
import { MainHeader } from "../components";

export function LayoutMain() {
  return (
    <>
      <MainHeader className="mt-9" />
      <Outlet />
    </>
  );
}
