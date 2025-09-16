import { BrowserRouter, Route, Routes } from "react-router";
import { LayoutMain } from "../layouts";
import { Home, PhotoDetails } from "../pages";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";

export function Router() {
  return (
    <NuqsAdapter>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutMain />}>
            <Route index element={<Home />} />
            <Route path="/photos/:id" element={<PhotoDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </NuqsAdapter>
  );
}
