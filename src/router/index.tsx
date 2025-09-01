import { BrowserRouter, Route, Routes } from "react-router";
import { LayoutMain } from "../layouts";
import { Home, PhotoDetails } from "../pages";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutMain />}>
          <Route index element={<Home />} />
          <Route path="/photos/:id" element={<PhotoDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
