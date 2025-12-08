import type { ApplicationStatus, DeliveryStatus } from "@/types/admin/party.ts";
import type { PartyAdminStatus } from "@/types/adminTypes.ts";

export const PartyDetailMap: Record<string, string> = {
  name: "주최자",
  groupName: "소속",
  phone: "연락처",
  email: "이메일",

  status: "상태",
  isGroup: "규모",
  dateFromTo: "날짜",
  timeFromTo: "시간",
  address: "장소",
  maxAttendeeCnt: "최대 참석자 수",

  // "status??",
  // "zip",
  deliverAddress: "주소",
  desiredDate: "희망 배송일",
  trackingNumber: "송장번호",
  taxReceipt: "세금계산서 발행",
  // taxId: "세금계산서 발행",
  taxEmail: "발행 이메일",
};

export const ApplicationStatusDescription: Record<ApplicationStatus, string> = {
  PENDING: "대기중",
  APPROVED: "승인됨",
  REJECTED: "거절됨",
  CANCELLED: "취소됨",
};

export const DeliveryStatusDescription: Record<DeliveryStatus, string> = {
  PENDING: "배송 대기",
  PREPARING: "배송 준비중",
  IN_TRANSIT: "배송중",
  DELIVERED: "배송 완료",
  RETURNED: "반송",
};

export const GROUP1_KEYS = ["name", "groupName", "phone", "email"] as const;

// TODO: key 재확인(party)
export const GROUP2_KEYS = [
  "status", //??
  "isGroup",
  "dateFromTo",
  "timeFromTo",
  "address",
  "maxAttendeeCnt",
] as const;

export const GROUP3_KEYS = [
  // "status??",
  // "zip",
  "deliverAddress",
  "desiredDate",
  "trackingNumber",
  "taxReceipt",
  "taxEmail",
] as const;

export const PartyStatusDescription: Record<PartyAdminStatus, string> = {
  ALL: "전체",
  UPCOMING: "진행예정",
  ONGOING: "진행중",
  COMPLETED: "진행완료",
  CANCELLED: "취소",
};