import { createBrowserRouter } from "react-router-dom";
import userRoutes from "./userRoutes";
import adminRoutes from "./adminRoutes";
import { NotFound } from "@/pages";

export const router = createBrowserRouter([
  userRoutes,
  adminRoutes,
  {
    path: "*",
    element: <NotFound />,
  },
]);
