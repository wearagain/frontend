import RootLayout from "@/layouts/RootLayout";
import type { RouteObject } from "react-router-dom";
import PartyApplicationsPage from "@/pages/admin/party/PartyApplicationsPage.tsx";
import PartyApplicationDetailPage from "@/pages/admin/party/PartyApplicationDetailPage.tsx";
import PartyApplyDropdownContents from "@/components/common/header/DropdownMenu/PartyApplyDropdownContents.tsx";
import ApproveModal from "@/components/admin/party/applications/Modal/ApproveModal.tsx";
import RejectModal from "@/components/admin/party/applications/Modal/RejectModal.tsx";
import PartyManagePage from "@/pages/admin/party/PartyManagePage.tsx";
import PartyManageDetailPage from "@/pages/admin/party/PartyManageDetailPage.tsx";
import PartyOrdersPage from "@/pages/admin/party/PartyOrdersPage.tsx";
import PartyParticipantsPage from "@/pages/admin/party/PartyParticipantsPage.tsx";
import PartyDetailDropdownContents from "@/components/common/header/DropdownMenu/PartyDetailDropdownContents.tsx";
import PartyOrderDetailPage from "@/pages/admin/party/PartyOrderDetailPage.tsx";
import TrackingModal from "@/components/admin/party/orders/Modal/TrackingModal.tsx";
import PartyParticipantDetailPage from "@/pages/admin/party/PartyParticipantDetailPage.tsx";
import PartyParticipantDropdownContents
  from "@/components/common/header/DropdownMenu/PartyParticipantDropdownContents.tsx";

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
          path: "applications/:applicationId",
          element: <PartyApplicationDetailPage />,
          handle: {
            header: {
              type: "adminClose",
              showLabel: false,
              to: -1,
              children: <PartyApplyDropdownContents />,
            },
          },
        },
        {
          path: "applications/:applicationId/approve",
          element: <ApproveModal />,
          handle: {
            header: {
              type: "adminClose",
              showLabel: false,
              to: -1,
            },
          },
        },
        {
          path: "applications/:applicationId/reject",
          element: <RejectModal />,
          handle: {
            header: {
              type: "adminClose",
              showLabel: false,
              to: -1,
            },
          },
        },
        {
          path: "manage",
          element: <PartyManagePage />,
          handle: { header: { type: "adminBase", label: "파티 관리", showBack: true } },
        },
        {
          path: "manage/:partyId",
          element: <PartyManageDetailPage />,
          handle: {
            header: {
              type: "adminClose",
              showLabel: false,
              to: -1,
              children: <PartyDetailDropdownContents />,
            },
          },
        },
        {
          path: "orders",
          element: <PartyOrdersPage />,
          handle: { header: { type: "adminBase", label: "결제/배송 관리", showBack: true } },
        },
        {
          path: "orders/:applicationId",
          element: <PartyOrderDetailPage />,
          handle: {
            header: {
              type: "adminClose",
              showLabel: false,
              to: -1,
              children: <PartyDetailDropdownContents />,
            },
          },
        },
        {
          path: "orders/tracking",
          element: <TrackingModal />,
          handle: {
            header: {
              type: "adminClose",
              showLabel: false,
              to: -1,
            },
          },
        },
        {
          path: "manage/:partyId/participants",
          element: <PartyParticipantsPage />,
          handle: { header: { type: "adminBase", label: "참여 신청자 관리", showBack: true } },
        },
        {
          path: "manage/:partyId/participants/detail",
          element: <PartyParticipantDetailPage />,
          handle: {
            header: {
              type: "adminClose",
              showLabel: false,
              to: -1,
              children: <PartyParticipantDropdownContents />,
            },
          },
        },
      ],
    },
  ],
};

export default adminRoutes;
