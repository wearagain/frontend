import { useEffect } from "react";
import { getPing } from "@/apis/axios-instance";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

export function AppInitializer() {
  useEffect(() => {
    getPing();
  }, []);

  return <RouterProvider router={router} />;
}
