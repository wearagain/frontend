import RootLayout from "@/layouts/RootLayout";
import type { RouteObject } from "react-router-dom";
import PartyApplicationsPage from "@/pages/admin/party/PartyApplicationsPage.tsx";
import PartyApplicationDetailPageTsx from "@/pages/admin/party/PartyApplicationDetailPage.tsx.tsx";
import PartyAdminDropdownContents from "@/components/common/header/DropdownMenu/PartyAdminDropdownContents.tsx";
import ApproveModal from "@/components/admin/party/Modal/ApproveModal.tsx";
import RejectModal from "@/components/admin/party/Modal/RejectModal.tsx";
import PartyManagePage from "@/pages/admin/party/PartyManagePage.tsx";
import PartyManageDetailPage from "@/pages/admin/party/PartyManageDetailPage.tsx";
import PartyOrdersPage from "@/pages/admin/party/PartyOrdersPage.tsx";
import PartyParticipantsPage from "@/pages/admin/party/PartyParticipantsPage.tsx";

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
      children: [
        {
          path: "applications",
          element: <PartyApplicationsPage />,
          handle: { header: { type: "adminBase", label: "주최 신청 관리", showBack: true } },
        },
        {
          path: "application/:partyId",
          element: <PartyApplicationDetailPageTsx />,
          handle: {
            header: {
              type: "adminClose",
              showLabel: false,
              to: -1,
              children: <PartyAdminDropdownContents />,
            },
          },
          children: [
            { path: "approve", element: <ApproveModal /> },
            { path: "reject", element: <RejectModal /> },
          ],
        },
        {
          path: "manage",
          element: <PartyManagePage />,
          handle: { header: { type: "adminBase", label: "주최 신청 관리", showBack: true } },
          children: [
            {
              path: "detail",
              element: <PartyManageDetailPage />,
              handle: { header: { type: "adminBase", label: "주최 신청 관리", showBack: true } },
            },
          ],
        },
        {
          path: "orders",
          element: <PartyOrdersPage />,
          handle: { header: { type: "adminBase", label: "주최 신청 관리", showBack: true } },
        },
        {
          path: "participants",
          element: <PartyParticipantsPage />,
          handle: { header: { type: "adminBase", label: "주최 신청 관리", showBack: true } },
        },
      ],
    },
  ],
};

export default adminRoutes;
