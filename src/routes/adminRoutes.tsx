import RootLayout from "@/layouts/RootLayout";
import type { RouteObject } from "react-router-dom";

const adminRoutes: RouteObject = {
  path: "/",
  element: <RootLayout />,
  children: [],
};

export default adminRoutes;
