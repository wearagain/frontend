import type { LucideIcon } from "lucide-react";
import {
  Home,
  ScanQrCode,
  QrCode,
  Ticket,
  Users,
  CalendarDays,
  ClipboardCheck,
  Leaf,
  Tag,
  NotebookText,
  RefreshCw,
  Mail,
  User,
  Headset,
  Megaphone,
  Truck,
  Notebook,
  CircleUserRound,
  Gem,
  BadgeCheck
} from "lucide-react";

export interface NavCategory {
  label: string;
  path?: string;
  icon?: LucideIcon;
  divider?: boolean;
  external?: boolean;
}

export const userMenu: NavCategory[] = [
  {
    label: "홈",
    icon: Home,
    path: "/",
    divider: true
  },
  {
    label: "티켓 스캔",
    icon: ScanQrCode,
    path: "/inspection-ticket",
  },
  {
    label: "파티 입장",
    icon: QrCode,
    path: "/qr?type=checkin"
  },
  {
    label: "교환 티켓",
    icon: Ticket,
    path: "/ticket"
  },
  {
    label: "파티 주최하기",
    icon: Users,
    path: "/host"
  },
  {
    label: "파티 참여하기",
    icon: CalendarDays,
    path: "/party"
  },
  {
    label: "파티 신청내역",
    icon: ClipboardCheck,
    path: "/party/apply",
    divider: true
  },
  {
    label: "환경영수증",
    icon: Leaf,
    path: "/impact/receipt"
  },
  {
    label: "GoodBye&Hello 태그",
    icon: Tag,
    path: "/impact/tag",
    divider: true
  },
  {
    label: "자유게시판",
    icon: NotebookText,
    path: "/community/board"
  },
  {
    label: "수선의류교환",
    icon: RefreshCw,
    path: "/community/exchange"
  },
  {
    label: "뉴스레터",
    icon: Mail,
    path: "https://page.stibee.com/archives/69943",
    external: true,
    divider: true
  },
  {
    label: "마이페이지",
    icon: User,
    path: "/mypage"
  },
  {
    label: "1대1 문의하기",
    icon: Headset,
    path: "/support/help",
    divider: true
  },
  {
    label: "후원하기",
    path: "https://box.donus.org/box/wearagain/saveclothes?_ga=2.168483685.557985844.1678075479-710762688.1676980328",
    external: true
  },
  {
    label: "공지사항",
    path: "/notice"
  },
  {
    label: "다시입다연구소 정책",
    path: "/policy"
  },
  {
    label: "환경설정",
    path: "/settings"
  },
  {
    label: "고객센터",
    path: "/support"
  }
];

export const adminMenu: NavCategory[] = [
  {
    label: "홈",
    icon: Home,
    path: "/",
    divider: true
  },
  {
    label: "티켓 스캔",
    icon: ScanQrCode,
    path: "/inspection-ticket",
  },
  {
    label: "파티 입장 스캔",
    icon: ScanQrCode,
    path: "/qr?type=scan"
  },
  {
    label: "파티 관리",
    icon: Users,
    path: "/admin/party/manage"
  },
  {
    label: "주최 관리",
    icon: ClipboardCheck,
    path: "/admin/party/applications"
  },
  {
    label: "결제 및 배송 관리",
    icon: Truck,
    path: "/admin/party/orders",
    divider: true
  },
  {
    label: "환경임팩트",
    icon: Leaf,
    path: "/admin/impact",
    divider: true
  },
  {
    label: "자유게시판 관리",
    icon: Notebook,
    path: "/admin/board"
  },
  {
    label: "수선의류교환 관리",
    icon: RefreshCw,
    path: "/admin/exchange",
    divider: true
  },
  {
    label: "회원 관리",
    icon: CircleUserRound,
    path: "/admin/users"
  },
  {
    label: "후원자 관리",
    icon: Gem,
    path: "/admin/donor"
  },
  {
    label: "수선예술가 관리",
    icon: BadgeCheck,
    path: "/admin/",
    divider: true
  },
  {
    label: "공지시항 관리",
    icon: Megaphone,
    path: "/admin/notice"
  },
  {
    label: "1대1 문의 관리",
    icon: Headset,
    path: "/admin/support",
    divider: true
  },
  {
    label: "다시입다연구소 정책",
    path: "/policy"
  },
  {
    label: "환경설정",
    path: "/settings"
  }
];