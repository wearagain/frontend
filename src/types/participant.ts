import type { PartyStatus } from "./party";

// 참가 신청 상태
export type ParticipantStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";

// 의류 아이템
export interface ClothingItem {
  clothingNumber: string;
  mainCategory: string;
  subCategory: string;
  description: string;
  imageUrls: string[];
}

// 내 참가 신청 정보
export interface MyParticipant {
  id: string;
  partyId: string;
  partyTitle?: string;
  partyAddress?: string;
  partyOpenAt?: string;
  userId: string;
  name: string;
  phone: string;
  email: string;
  clothingItems: ClothingItem[];
  attendanceDate: string;
  status: ParticipantStatus;
  appliedAt: string;
  processedAt: string | null;
  qrCode: string;
  qrExpiresAt: string;
}

// API 쿼리 파라미터
export interface MyParticipantsQuery {
  partyStatus?: PartyStatus;
  participantStatus?: ParticipantStatus;
}

