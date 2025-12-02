import RootLayout from "@/layouts/RootLayout";
import type { RouteObject } from "react-router-dom";
import AdminPartyPage from "@/pages/admin/community/AdminPartyPage.tsx";

const adminRoutes: RouteObject = {
  path: "/admin",
  element: <RootLayout />,
  handle: {
    header: {
      type: "base",
      label: "",
      showBack: false,
    },
  },
  children: [
    {
      // index: true,
      path: "party",
      element: <AdminPartyPage />,
      handle: { header: { type: "adminBase", label: "주최 신청 관리", showBack: true } },
    },
  ],
};

export default adminRoutes;
