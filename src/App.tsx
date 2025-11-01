import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";
import { AppInitializer } from "@/AppInitializer";

export function App() {
  return (
    <>
      {/* <AppInitializer /> */}
      <RouterProvider router={router} />
    </>
  );
}
