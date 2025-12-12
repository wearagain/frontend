import type { ApplicationStatus, DeliveryStatus } from "@/types/admin/party.ts";
import type { PartyStatus } from "@/types/party.ts";

export const PartyDetailMap: Record<string, string> = {
  name: "주최자",
  groupName: "소속",
  phone: "연락처",
  email: "이메일",

  isGroup: "규모",
  dateFromTo: "날짜",
  timeFromTo: "시간",
  address: "장소",
  maxAttendeeCnt: "최대 참석자 수",
  currentAttendeeCnt: "참여 신청자",
  maxChangeCnt: "최대 의류 수량",
  partyDescription: "소개",

  deliveryStatus: "상태",
  deliverAddress: "주소",
  desiredDate: "희망 배송일",
  trackingNumber: "송장번호",
  taxReceipt: "세금계산서 발행",
  taxId: "사업자번호",
  taxEmail: "발행 이메일",
};

export const ApplicationStatusDescription: Record<ApplicationStatus, string> = {
  PENDING: "승인대기",
  APPROVED: "승인",
  REJECTED: "반려",
  CANCELLED: "취소",
};

export const DeliveryStatusDescription: Record<DeliveryStatus, string> = {
  PENDING: "결제전",
  PREPARING: "상품준비중",
  IN_TRANSIT: "배송중",
  DELIVERED: "배송완료",
  RETURNED: "반송",
};

export const GROUP1_KEYS = ["name", "groupName", "phone", "email"] as const;

export const SINGLE_KEYS = ["name", "phone", "email"] as const;


export const GROUP2_KEYS = [
  "isGroup",
  "dateFromTo",
  "timeFromTo",
  "address",
  "maxAttendeeCnt",
  "currentAttendeeCnt",
  "maxChangeCnt",
  "partyDescription",
] as const;

export const GROUP3_KEYS = [
  "deliveryStatus",
  "deliverAddress",
  "desiredDate",
  "trackingNumber",
  "taxReceipt",
  "taxId",
  "taxEmail",
] as const;

export const PartyStatusDescription: Record<PartyStatus, string> = {
  UPCOMING: "진행예정",
  ONGOING: "진행중",
  COMPLETED: "진행완료",
  CANCELLED: "취소",
};

export const CHANGEABLE_PARTY_STATUS = ["UPCOMING", "ONGOING"];

export const SIDE_BUTTON_TEXT: Record<string, string> = {
  currentAttendeeCnt: "참여자 보기",
  deliverAddress: "주소 복사",
  taxReceipt: "발행 처리",
  taxId: "복사",
};

