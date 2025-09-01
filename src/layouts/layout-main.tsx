import { Outlet } from "react-router";

export function LayoutMain() {
  return (
    <div>
      <h2>Layout</h2>
      <Outlet />
    </div>
  );
}
