/**
 * 신청 리스트
 */

// 신청 상태 타입
export type ParticipantStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";
export type HostApplicationStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";

export const STATUS_MAP: Record<ParticipantStatus | HostApplicationStatus, string> = {
  PENDING: "승인대기",
  APPROVED: "승인완료",
  REJECTED: "반려",
  CANCELLED: "취소",
};

// Request DTO
export interface ClothingItemRequest {
  mainCategory: string;
  subCategory: string;
  description: string;
  imageUrls: string[];
}

// Response DTO
export interface ClothingItemResponse extends ClothingItemRequest {
  clothingNumber?: string;
}

// 신청 요청 바디
export interface PartyParticipantRequest {
  name: string;
  phone: string;
  email: string;

  clothingItems: ClothingItemRequest[];
  attendanceDate: string;
}

 // 교환 의류 관련
export interface MyTakenClothingResponse {
  voucherId: string;
  takenClothingNumber: string;
  originalClothingNumber: string;

  takenPartyId: string;
  takenPartyTitle: string;
  takenAt: string;

  category: string;
  mainCategory: string;
  subCategory: string;
  description: string;
  imageUrls: string[];
}

// 신청 상세 정보
export interface PartyParticipantResponse {
  id: string; // Participant ID
  partyId: string;
  partyTitle: string;
  address: string;
  addressDetail: string;
  userId: string;

  name: string;
  phone: string;
  email: string;

  clothingItems: ClothingItemResponse[];
  attendanceDate: string;

  status: ParticipantStatus;
  appliedAt: string;
  processedAt: string | null;

  qrCode: string | null;
  qrExpiresAt: string | null;
}

export interface HostApplicationResponse {
  id: string;
  isGroup: boolean;
  groupName: string;
  userId: string;

  name: string;
  phone: string;
  email: string;

  openAt: string;
  closeAt: string;
  address: string;
  addressDetail: string;

  maxChangeCnt: number;
  maxAttendeeCnt: number;

  partyTitle: string;
  partyDescription: string;
  deliverAddress: string;
  deliverAddressDetail: string;
  desiredDate: string;

  taxReceipt: boolean;
  taxEmail: string;

  status: HostApplicationStatus;
  processMemo: string;
  appliedAt: string;
  processedAt: string;

  xmap: number;
  ymap: number;
}
