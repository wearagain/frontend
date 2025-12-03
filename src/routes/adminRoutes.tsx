import RootLayout from "@/layouts/RootLayout";
import type { RouteObject } from "react-router-dom";
import AdminPartyPage from "@/pages/admin/party/AdminPartyPage.tsx";
import AdminPartyDetailPage from "@/pages/admin/party/AdminPartyDetailPage.tsx";
import PartyAdminDropdownContents from "@/components/common/header/DropdownMenu/PartyAdminDropdownContents.tsx";
import ApproveModal from "@/components/admin/party/Modal/ApproveModal.tsx";
import RejectModal from "@/components/admin/party/Modal/RejectModal.tsx";

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
      path: "party",
      element: <AdminPartyPage />,
      handle: { header: { type: "adminBase", label: "주최 신청 관리", showBack: true } },
    },
    {
      path: "party/:partyId",
      element: <AdminPartyDetailPage />,
      handle: {
        header: {
          type: "adminClose",
          showLabel: false,
          to: -1,
          children: <PartyAdminDropdownContents />,
        },
      },
      children: [
        { path: "approved", element: <ApproveModal /> },
        { path: "rejected", element: <RejectModal /> },
      ],
    },
  ],
};

export default adminRoutes;
