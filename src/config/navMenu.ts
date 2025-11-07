import type { LucideIcon } from "lucide-react";
import { QrCode, Leaf, Users, MessageSquare, User, HelpCircle } from "lucide-react";

export interface NavChild {
  label: string;
  path: string;
  icon?: LucideIcon;
  auth?: boolean;
}

export interface NavCategory {
  label: string;
  path?: string;
  icon?: LucideIcon;
  children?: NavChild[];
}

export const mainMenu: NavCategory[] = [
  {
    label: "QR",
    icon: QrCode,
    children: [
      { label: "주최 스캐너", path: "/qr?type=scan" },
      { label: "파티 입장", path: "/qr?type=checkin" },
      { label: "교환 티켓", path: "/qr" },
    ],
  },
  {
    label: "환경임팩트",
    icon: Leaf,
    children: [
      { label: "환경영수증", path: "/impact/receipt" },
      { label: "GoodBye&Hello태그", path: "/impact/tag" },
    ],
  },
  {
    label: "파티",
    icon: Users,
    children: [
      { label: "참여하기", path: "/party" },
      { label: "주최하기", path: "/host" },
      { label: "신청내역", path: "/party/apply" },
      { label: "과거 파티", path: "/party/history" },
    ],
  },
  {
    label: "커뮤니티",
    icon: MessageSquare,
    children: [
      { label: "자유게시판", path: "/community/board" },
      { label: "수선 의류 교환", path: "/community/exchange" },
    ],
  },
  {
    label: "마이페이지",
    path: "/mypage",
    icon: User,
  },
  {
    label: "고객지원",
    icon: HelpCircle,
    children: [
      { label: "공지사항", path: "/support/notice" },
      { label: "문의하기", path: "/support/inquiry" },
      { label: "설정", path: "/support/settings" },
    ],
  },
];
