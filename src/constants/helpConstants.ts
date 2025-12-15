import type {inquiryType} from "@/types/help.ts";

export const INQUIRY_TYPE_MAP: Record<inquiryType, string> = {
  APPLICATION: "신청",
  PAYMENT: "결제",
  DELIVERY: "배송",
  ETC: "기타",
}

// 타입 한글 변환
export const getCategoryLabel = (type: string): string => {
  return INQUIRY_TYPE_MAP[type as inquiryType] || type;
};