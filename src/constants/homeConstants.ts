import type { PartyStatus } from "@/types/party.ts";
import type { NoticeCategory } from "@/types/notice.ts"

export const redirectBanner: { image: string; url: string }[] = [
  {
    image: "/images/redirect3.svg",
    url: "https://wearagain.org/index",
  },
  {
    image: "/images/redirect4.svg",
    url: "https://box.donus.org/box/wearagain/saveclothes?_ga=2.168483685.557985844.1678075479-710762688.1676980328",
  },
];

export const PartyStatusDescription: Record<PartyStatus, string> = {
  UPCOMING: "진행예정",
  ONGOING: "진행중",
  COMPLETED: "진행완료",
  CANCELLED: "취소",
};

export const NoticeCategoryDescription: Record<NoticeCategory, string> = {
  NOTICE: "공지",
  UPDATE: "업데이트",
};
