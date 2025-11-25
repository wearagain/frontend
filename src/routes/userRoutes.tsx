import RootLayout from "@/layouts/RootLayout";
import {
  EcoReceiptPage,
  HomePage,
  MyPage,
  ApplyCompletePage,
  ApplyListPage,
  ApplyDetailPage,
  PartyApplyPage,
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
  ExchangePage,
  ExchangeListPage,
} from "@/pages";
import type { RouteObject } from "react-router-dom";
import ClothDetailPage from "@/pages/community/exchange/ClothDetailPage.tsx";

const userRoutes: RouteObject = {
  path: "/",
  element: <RootLayout />,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    // 로그인
    {
      path: "auth",
      children: [
        { path: "signin", element: <SigninMainPage /> }, // /auth/signin
        { path: "reset", element: <ResetPasswordPage /> }, // /auth/reset
      ],
    },

    // 회원가입
    {
      path: "signup",
      children: [
        // 일반
        { path: "email", element: <SignupEmailPage /> }, // /signup/email

        // 공통
        { path: "terms", element: <SignupTermsPage /> }, // /signup/terms
        { path: "complete", element: <SignupCompletePage /> }, // /signup/complete
      ],
    },

    // 메인
    { path: "home", element: <HomePage /> }, // /home

    // 환경영수증
    { path: "eco-receipt", element: <EcoReceiptPage /> }, // /eco-receipt

    // 커뮤니티
    {
      path: "community",
      children: [
        { path: "board", element: <CommunityBoardPage /> },
        { path: "board/:boardId", element: <BoardDetailPage /> },
        { path: "board/post", element: <CommunityPostPage /> },

        { path: "exchange", element: <ExchangePage /> }, // /community/exchange
        { path: "exchange/list", element: <ExchangeListPage /> }, // /community/exchange/list
        { path: "exchange/list/:clothesId", element: <ClothDetailPage /> }, // /community/exchange/list
      ],
    }, // /community

    // QR 및 티켓
    {
      path: "ticket",
      element: <TicketPage />,
    },
    // 파티 참여
    {
      path: "party",
      children: [
        { index: true, element: <PartyListPage /> }, // /party
        { path: ":id", element: <PartyDetailPage /> }, // /party/:id
        { path: ":id/apply", element: <PartyApplyPage /> }, // /party/:id/apply
        { path: ":id/apply/complete", element: <ApplyCompletePage /> }, // /party/:id/apply/complete
        { path: "apply", element: <ApplyListPage /> }, // /party/apply
        { path: "apply/:id", element: <ApplyDetailPage /> }, // /party/apply/:id
      ],
    },

    // 파티 주최
    { path: "host", element: <PartyHostPage /> }, // /host

    // 마이페이지
    { path: "mypage", element: <MyPage /> }, // /mypage
  ],
};

export default userRoutes;
