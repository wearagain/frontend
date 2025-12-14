import type { NavCategory } from "@/config/navMenu.ts";
import {
  Heart,
  ThumbsUp,
  ClipboardCheck,
  ClockFading,
  MessageSquareText,
  NotebookText,
  RefreshCw,
  Gem,
  Star,
} from "lucide-react";

export type MenuGroup = {
  title: string;
  items: NavCategory[];
};

export const myMenuGroups: MenuGroup[] = [
  {
    title: "파티",
    items: [
      { label: "파티 신청 내역", icon: ClipboardCheck, path: "/party/apply" },
      { label: "과거 파티", icon: ClockFading },
    ],
  },
  {
    title: "커뮤니티",
    items: [
      { label: "내가 쓴 글", icon: NotebookText },
      { label: "내가 쓴 댓글", icon: MessageSquareText },
      { label: "좋아요 한 글", icon: ThumbsUp },
    ],
  },
  {
    title: "수선의류교환",
    items: [
      { label: "수선의류교환 신청 내역", icon: RefreshCw },
      { label: "찜한 상품", icon: Heart },
    ],
  },
  {
    title: "후원",
    items: [
      { label: "후원자 인증", icon: Gem },
      {
        label: "후원하기",
        icon: Star,
        path: "https://box.donus.org/box/wearagain/saveclothes?_ga=2.168483685.557985844.1678075479-710762688.1676980328",
        external: true,
      },
    ],
  },
];
