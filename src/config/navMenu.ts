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
  Headset
} from "lucide-react";

export interface NavCategory {
  label: string;
  path?: string;
  icon?: LucideIcon;
  divider?: boolean;
  host?: boolean;
  external?: boolean;
}

export const mainMenu: NavCategory[] = [
  {
    label: "홈",
    icon: Home,
    path: "/",
    divider: true
  },
  {
    label: "QR 스캔",
    icon: ScanQrCode,
    path: "/qr?type=scan",
    host: true
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