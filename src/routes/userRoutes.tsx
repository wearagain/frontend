import RootLayout from "@/layouts/RootLayout";
import {
  EcoReceiptPage,
  HomePage,
  MyPage,
  ApplyCompletePage,
  ApplyListPage,
  ApplyDetailPage,
  PartyParticipatePage,
  PartyDetailPage,
  PartyHostPage,
  PartyListPage,
  ResetPasswordPage,
  SigninMainPage,
  SignupCompletePage,
  SignupEmailPage,
  SignupTermsPage,
  TicketPage,
  CommunityBoardPage,
  CommunityPostPage,
  BoardDetailPage,
  QrCheckinPage,
  ExchangePage,
  ExchangeListPage,
  ExchangeRequestPage,
  ClothDetailPage,
  RequestInfoPage,
  PartyHelpPage,
  ImpactReceiptPage,
  SettingsPage,
  UserProfilePage,
  InspectionTicketPage,
  PartyClothingListPage,
} from "@/pages";
import ChatPageWrapper from "@/pages/chat/ChatPageWrapper";
import PartyChatPageWrapper from "@/pages/chat/PartyChatPageWrapper";
import type { RouteObject } from "react-router-dom";

const userRoutes: RouteObject = {
  path: "/",
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
      index: true,
      element: <HomePage />,
      handle: {
        header: {
          type: "base",
        },
      },
    },

    // 메인
    {
      path: "home",
      element: <HomePage />,
      handle: { header: { type: "base" } },
    }, // /home

    // 로그인
    {
      path: "auth",
      children: [
        {
          path: "signin",
          element: <SigninMainPage />,
          handle: { header: { type: "close", to: "/home" } },
        }, // /auth/signin
        {
          path: "reset",
          element: <ResetPasswordPage />,
          handle: { header: { type: "base", label: "비밀번호 재설정", showBack: true } },
        }, // /auth/reset
      ],
    },

    // 회원가입
    {
      path: "signup",
      children: [
        {
          path: "email",
          element: <SignupEmailPage />,
          handle: { header: { type: "back" } },
        }, // /signup/email
        {
          path: "terms",
          element: <SignupTermsPage />,
          handle: { header: { type: "back" } },
        }, // /signup/terms
        {
          path: "complete",
          element: <SignupCompletePage />,
          handle: { header: { type: "close", onClose: () => window.history.back() } },
        }, // /signup/complete
      ],
    },

    // 환경영수증
    {
      path: "eco-receipt",
      element: <EcoReceiptPage />,
      handle: { header: { type: "base" } },
    }, // /eco-receipt

    // 커뮤니티
    {
      path: "community",
      children: [
        {
          path: "board",
          element: <CommunityBoardPage />,
          handle: { header: { type: "base", label: "커뮤니티", showBack: true } },
        },
        {
          path: "board/:boardId",
          element: <BoardDetailPage />,
          handle: { header: { type: "base", label: "커뮤니티", showBack: true } },
        },
        {
          path: "board/post",
          element: <CommunityPostPage />,
          handle: {
            header: { type: "close", label: "글쓰기", onClose: () => window.history.back() },
          },
        },
        {
          path: "exchange",
          element: <ExchangePage />,
          handle: {
            header: { type: "base", label: "수선의류 교환", showBack: true, to: "/home" },
          },
        },
        {
          path: "exchange/list",
          element: <ExchangeListPage />,
          handle: {
            header: {
              type: "base",
              label: "수선의류 교환",
              showBack: true,
              to: "/community/exchange",
            },
          },
        },
        {
          path: "exchange/list/:clothesId",
          element: <ClothDetailPage />,
          handle: {
            header: { type: "base", label: "수선의류명", showBack: true },
          },
        },
        {
          path: "exchange/:clothesId/request",
          element: <ExchangeRequestPage />,
          handle: {
            header: { type: "back", label: "교환하기" },
          },
        },
        {
          path: "exchange/:clothesId/request/info",
          element: <RequestInfoPage />,
          handle: {
            header: { type: "backClose", label: "신청내역", to: "/community/exchange" },
          },
        },
      ],
    }, // /community
    // 티켓
    {
      path: "ticket",
      element: <TicketPage />,
      handle: {
        header: { type: "backClose", label: "티켓", onClose: () => window.history.back() },
      },
    },

    // 파티 참여
    {
      path: "party",
      children: [
        {
          index: true,
          element: <PartyListPage />,
          handle: { header: { type: "base", label: "참여하기", showBack: true } },
        }, // /party
        {
          path: "help/:id",
          element: <PartyHelpPage />,
          handle: { header: { type: "base", label: "문의하기", showBack: true } },
        }, // /party/help/:id
        {
          path: "help/:id/complete",
          element: <ApplyCompletePage />,
          handle: { header: { type: "close", onClose: () => window.history.back() } },
        }, // /party/help/:id/complete
        {
          path: ":id",
          element: <PartyDetailPage />,
          handle: { header: { type: "base", label: "파티명", showBack: true } },
        }, // /party/:id
        {
          path: ":id/participate",
          element: <PartyParticipatePage />,
          handle: { header: { type: "guide", label: "신청하기" } },
        }, // /party/:id/apply
        {
          path: ":id/participate/complete",
          element: <ApplyCompletePage />,
          handle: { header: { type: "close", onClose: () => window.history.back() } },
        }, // /party/apply
        {
          path: "apply",
          element: <ApplyListPage />,
          handle: { header: { type: "base", label: "신청내역", showBack: true } },
        }, // /party/apply/
        {
          path: "apply/:id",
          element: <ApplyDetailPage />,
          handle: { header: { type: "base", label: "신청내역", showBack: true } },
        },
      ],
    },

    // 주최
    {
      path: "host",
      children: [
        {
          index: true,
          element: <PartyHostPage />,
          handle: { header: { type: "base", label: "주최하기", showBack: true } },
        }, // /host
        {
          path: "complete",
          element: <ApplyCompletePage />,
          handle: { header: { type: "close", onClose: () => window.history.back() } },
        }, // /host/complete
      ],
    },

    // 일반 채팅 - 리스트와 개별 채팅방
    {
      path: "chat",
      children: [
        {
          index: true,
          element: <ChatPageWrapper />,
          handle: { header: { type: "base", label: "", to: "/", showBack: true } },
        }, // /chat
        { path: ":roomId", element: <ChatPageWrapper />, handle: { header: { type: "none" } } }, // /chat/:roomId
      ],
    },

    // 파티 채팅 - 리스트와 개별 채팅방
    {
      path: "party-chat",
      children: [
        {
          index: true,
          element: <PartyChatPageWrapper />,
          handle: {
            header: { type: "base", label: "", to: "/party/apply?tab=host", showBack: true },
          },
        }, // /party-chat
        {
          path: ":roomId",
          element: <PartyChatPageWrapper />,
          handle: { header: { type: "none" } },
        }, // /party-chat/:roomId
      ],
    },

    // 마이페이지
    {
      path: "mypage",
      element: <MyPage />,
      handle: { header: { type: "base", label: "마이페이지", showBack: true } },
    }, // /mypage

    {
      path: "settings",
      children: [
        {
          index: true,
          element: <SettingsPage />,
          handle: { header: { type: "base", label: "환경설정", showBack: true } },
        },
        {
          path: "profile",
          element: <UserProfilePage />,
          handle: { header: { type: "back", label: "프로필", showBack: true } },
        },
      ], // /editProfile
    }, // /mypage

    // QR 체크인/스캔
    {
      path: "qr",
      element: <QrCheckinPage />,
      handle: { header: { type: "close", to: "/home" } },
    }, // /qr?type=checkin or /qr?type=scan

    // Impact
    {
      path: "impact",
      children: [
        {
          path: "receipt",
          element: <ImpactReceiptPage />,
          handle: {
            header: { type: "base", label: "환경영수증", showBack: true },
          },
        },
      ],
    }, // /impact/receipt

    // Inspection Ticket
    {
      path: "inspection-ticket",
      children: [
        {
          index: true,
          element: <InspectionTicketPage />,
          handle: {
            header: { type: "base", label: "의류추적", showBack: true, to: "/" },
          },
        },
        {
          path: ":partyId",
          element: <PartyClothingListPage />,
          handle: {
            header: { type: "base", label: "파티명", showBack: true },
          },
        },
      ],
    }, // /inspection-ticket, /inspection-ticket/:partyId
  ],
};

export default userRoutes;
