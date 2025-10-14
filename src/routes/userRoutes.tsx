import RootLayout from "@/layouts/RootLayout";
import {
  CommunityPage,
  EcoReceiptPage,
  EmailSigninPage,
  HomePage,
  MyPage,
  PartyApplyPage,
  PartyDetailPage,
  PartyHostPage,
  PartyListPage,
  SigninMainPage,
  SignupEmailPage,
  SignupSocialPage,
  TicketPage,
} from "@/pages";
import type { RouteObject } from "react-router-dom";

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
      path: "signin",
      children: [
        { index: true, element: <SigninMainPage /> }, // /signin
        { path: "email", element: <EmailSigninPage /> }, // /signin/email
      ],
    },

    // 회원가입
    {
      path: "signup",
      children: [
        { path: "email", element: <SignupEmailPage /> }, // /signup/email
        { path: "social", element: <SignupSocialPage /> }, // /signup/social
      ],
    },

    // 메인
    { path: "home", element: <HomePage /> }, // /home

    // 환경영수증
    { path: "eco-receipt", element: <EcoReceiptPage /> }, // /eco-receipt

    // 커뮤니티
    { path: "community", element: <CommunityPage /> }, // /community

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
        { path: ":id/apply", element: <PartyApplyPage /> }, // /party/:id/apply?step=item|info|...
      ],
    },

    // 파티 주최
    { path: "host", element: <PartyHostPage /> }, // /host

    // 마이페이지
    { path: "mypage", element: <MyPage /> }, // /mypage
  ],
};

export default userRoutes;
