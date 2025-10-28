import { useEffect } from "react";
import { ensureCsrf } from "@/apis/axios-instance";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

export function AppInitializer() {
  useEffect(() => {
    ensureCsrf();
  }, []);

  return <RouterProvider router={router} />;
}
