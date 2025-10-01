import { BrowserRouter, Route, Routes } from "react-router";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { AlbumDetails, Albums, Home, PhotoDetails } from "../pages";
import { LayoutMain } from "../layouts";

export function Router() {
  return (
    <NuqsAdapter>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutMain />}>
            <Route index element={<Home />} />
            <Route path="/photos/:id" element={<PhotoDetails />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/albums/:id" element={<AlbumDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </NuqsAdapter>
  );
}
